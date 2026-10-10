"""Render the bilingual Remotion film and derive release-ready MP4/GIF assets."""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile


ROOT = Path(__file__).resolve().parents[1]
ENTRY = ROOT / "motion" / "src" / "index.ts"
PUBLIC_DIR = ROOT / "motion" / "public"
TIMELINE = json.loads((ROOT / "motion/src/timeline.json").read_text(encoding="utf-8"))
FPS = TIMELINE["fps"]
MASTER_FRAMES = TIMELINE["masterFrames"]
PREVIEW_FRAMES = TIMELINE["previewFrames"]
MASTER_SECONDS = MASTER_FRAMES / FPS

CLIPS = {c["file"]: (c["from"] / FPS, c["duration"] / FPS) for c in TIMELINE["clips"]}


def run(command: list[str]) -> None:
    print("+", " ".join(command), flush=True)
    subprocess.run(command, cwd=ROOT, check=True)


def executable(name: str) -> str:
    found = shutil.which(name)
    if found is None:
        raise SystemExit(f"Required executable not found: {name}")
    return found


def detect_browser(explicit: str | None) -> str | None:
    if explicit:
        path = Path(explicit).expanduser().resolve()
        if not path.is_file():
            raise SystemExit(f"Browser executable does not exist: {path}")
        return str(path)

    configured = os.environ.get("REMOTION_BROWSER_EXECUTABLE")
    if configured:
        return detect_browser(configured)

    if os.name != "nt":
        return None

    candidates = [
        Path(os.environ.get("PROGRAMFILES", "")) / "Google/Chrome/Application/chrome.exe",
        Path(os.environ.get("LOCALAPPDATA", "")) / "Google/Chrome/Application/chrome.exe",
        Path(os.environ.get("PROGRAMFILES(X86)", "")) / "Microsoft/Edge/Application/msedge.exe",
    ]
    for candidate in candidates:
        if candidate.is_file():
            return str(candidate)
    return None


def render_silent(language: str, output: Path, browser: str | None, ffmpeg: str,
                  *, quick: bool = False) -> None:
    npx = executable("npx.cmd" if os.name == "nt" else "npx")
    composition = "ArtDirectorZH" if language == "zh" else "ArtDirectorEN"
    if quick:
        composition = "QuickPreviewZH" if language == "zh" else "QuickPreviewEN"
    props = output.parent / f"render-props-{language}.json"
    props.write_text(json.dumps({"language": language,
                                "localFonts": (PUBLIC_DIR / "render-fonts/yahei-regular.ttf").is_file()}),
                     encoding="utf-8")
    expected_prefix = f"render-frames-{language}-"
    frames_dir = Path(tempfile.mkdtemp(prefix=expected_prefix, dir=output.parent))
    if not frames_dir.name.startswith(expected_prefix) or ROOT not in frames_dir.resolve().parents:
        raise SystemExit(f"Unsafe render-frame directory: {frames_dir}")
    command = [
        npx,
        "remotion",
        "render",
        str(ENTRY),
        composition,
        str(frames_dir),
        f"--public-dir={PUBLIC_DIR}",
        "--sequence",
        "--image-format=jpeg",
        "--jpeg-quality=95",
        "--image-sequence-pattern=frame-[frame].jpeg",
        "--concurrency=4",
        "--overwrite",
        f"--props={props}",
    ]
    if browser:
        command.extend([f"--browser-executable={browser}", "--chrome-mode=chrome-for-testing"])
    try:
        run(command)
        digits = len(str((PREVIEW_FRAMES if quick else MASTER_FRAMES) - 1))
        run([
            ffmpeg,
            "-hide_banner",
            "-loglevel",
            "error",
            "-y",
            "-framerate",
            str(FPS),
            "-start_number",
            "0",
            "-i",
            str(frames_dir / f"frame-%0{digits}d.jpeg"),
            "-c:v",
            "libx264",
            "-preset",
            "slow",
            "-crf",
            "26",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            str(output),
        ])
    finally:
        if frames_dir.exists() and frames_dir.name.startswith(expected_prefix) and ROOT in frames_dir.resolve().parents:
            shutil.rmtree(frames_dir)


def make_score(ffmpeg: str, output: Path) -> None:
    def delay(old_ms: int) -> int:
        old_frame = old_ms * FPS / 1000
        for (old_start, start), (old_end, end) in zip(TIMELINE["beats"], TIMELINE["beats"][1:]):
            if old_start <= old_frame <= old_end:
                return round((start + (old_frame - old_start) * (end - start) / (old_end - old_start)) * 1000 / FPS)
        raise ValueError("Sound cue falls outside the film")

    cues = [delay(ms) for ms in (3600, 11200, 18200, 26400, 9200, 13200, 17200, 22400, 27800)]
    filter_complex = (
        "[0:a]volume=0.018,lowpass=f=180,afade=t=in:d=1.5,afade=t=out:st=68:d=2[bed];"
        "[1:a]volume=0.0035,lowpass=f=900,highpass=f=90,afade=t=in:d=2,afade=t=out:st=68:d=2[air];"
        "[2:a]volume=0.055,afade=t=out:st=0.04:d=0.10,asplit=4[c1][c2][c3][c4];"
        f"[c1]adelay={cues[0]}|{cues[0]}[c1d];[c2]adelay={cues[1]}|{cues[1]}[c2d];"
        f"[c3]adelay={cues[2]}|{cues[2]}[c3d];[c4]adelay={cues[3]}|{cues[3]}[c4d];"
        "[3:a]volume=0.035,afade=t=out:st=0.025:d=0.06,asplit=5[k1][k2][k3][k4][k5];"
        f"[k1]adelay={cues[4]}|{cues[4]}[k1d];[k2]adelay={cues[5]}|{cues[5]}[k2d];"
        f"[k3]adelay={cues[6]}|{cues[6]}[k3d];[k4]adelay={cues[7]}|{cues[7]}[k4d];"
        f"[k5]adelay={cues[8]}|{cues[8]}[k5d];"
        "[bed][air][c1d][c2d][c3d][c4d][k1d][k2d][k3d][k4d][k5d]"
        "amix=inputs=11:duration=longest:normalize=0,alimiter=limit=.72[out]"
    )
    run([
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-f",
        "lavfi",
        "-i",
        "sine=frequency=55:sample_rate=48000:duration=70",
        "-f",
        "lavfi",
        "-i",
        "anoisesrc=color=pink:sample_rate=48000:duration=70",
        "-f",
        "lavfi",
        "-i",
        "sine=frequency=392:sample_rate=48000:duration=0.14",
        "-f",
        "lavfi",
        "-i",
        "sine=frequency=880:sample_rate=48000:duration=0.09",
        "-filter_complex",
        filter_complex,
        "-map",
        "[out]",
        "-c:a",
        "pcm_s16le",
        str(output),
    ])


def mux(ffmpeg: str, video: Path, score: Path, output: Path) -> None:
    run([
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-i",
        str(video),
        "-i",
        str(score),
        "-map",
        "0:v:0",
        "-map",
        "1:a:0",
        "-c:v",
        "libx264",
        "-vf",
        "scale=1100:-2:flags=lanczos",
        "-crf",
        "26",
        "-preset",
        "slow",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-b:a",
        "96k",
        "-shortest",
        "-movflags",
        "+faststart",
        str(output),
    ])


def gif(ffmpeg: str, source: Path, output: Path, fps: int, start: float | None = None,
        duration: float | None = None, width: int = 800, max_colors: int = 64) -> None:
    command = [ffmpeg, "-hide_banner", "-loglevel", "error", "-y"]
    if start is not None:
        command.extend(["-ss", f"{start:.3f}"])
    command.extend(["-i", str(source)])
    if duration is not None:
        command.extend(["-t", f"{duration:.3f}"])
    command.extend([
        "-filter_complex",
        (
            f"fps={fps},scale={width}:-2:flags=lanczos,split[s0][s1];"
            f"[s0]palettegen=max_colors={max_colors}:stats_mode=diff[p];"
            "[s1][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle"
        ),
        "-loop",
        "0",
        str(output),
    ])
    run(command)


def still(ffmpeg: str, source: Path, output: Path, at: float = 69.25) -> None:
    run([
        ffmpeg,
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-ss",
        str(at),
        "-i",
        str(source),
        "-frames:v",
        "1",
        str(output),
    ])


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--language", choices=("zh", "en", "both"), default="both")
    parser.add_argument("--out", type=Path, default=ROOT / "motion" / "out" / "readability-20261010")
    parser.add_argument("--browser", help="Chrome/Edge executable; also reads REMOTION_BROWSER_EXECUTABLE")
    parser.add_argument("--skip-render", action="store_true", help="Reuse existing *-silent.mp4 files")
    parser.add_argument("--skip-clip-gifs", action="store_true")
    parser.add_argument("--gif-fps", type=int, default=20)
    args = parser.parse_args()
    if not 16 <= args.gif_fps <= 30:
        parser.error("--gif-fps must be 16–30; low frame rates undermine motion readability")

    ffmpeg = executable("ffmpeg")
    browser = detect_browser(args.browser)
    output_dir = args.out.resolve()
    if ROOT not in output_dir.parents:
        parser.error("--out must stay inside this repository")
    output_dir.mkdir(parents=True, exist_ok=True)

    languages = ("zh", "en") if args.language == "both" else (args.language,)
    score = output_dir / "art-director-score.wav"
    if not score.exists():
        make_score(ffmpeg, score)

    for language in languages:
        silent = output_dir / f"art-director-hero-{language}-silent.mp4"
        final = output_dir / f"art-director-intro-{language}.mp4"
        if not args.skip_render:
            render_silent(language, silent, browser, ffmpeg)
        if not silent.is_file():
            raise SystemExit(f"Missing silent render: {silent}")
        mux(ffmpeg, silent, score, final)
        quick = output_dir / f"quick-preview-{language}.mp4"
        if not args.skip_render:
            render_silent(language, quick, browser, ffmpeg, quick=True)
        if not quick.is_file():
            raise SystemExit(f"Missing quick preview render: {quick}")
        readme = ROOT / "assets" / "readme"
        web = ROOT / "docs" / "assets" / "motion"
        web.mkdir(parents=True, exist_ok=True)
        gif(ffmpeg, quick, readme / f"quick-preview-{language}.gif", args.gif_fps,
            width=TIMELINE["readmeWidth"], max_colors=128)
        shutil.copy2(quick, web / f"quick-preview-{language}.mp4")
        still(ffmpeg, quick, readme / f"quick-preview-{language}.jpg", at=1.5)
        shutil.copy2(readme / f"quick-preview-{language}.jpg", web / f"quick-preview-{language}.jpg")
        shutil.copy2(final, web / final.name)
        for name, (clip_start, clip_duration) in CLIPS.items():
            if not args.skip_clip_gifs:
                gif(
                    ffmpeg,
                    final,
                    output_dir / f"{name}-{language}.gif",
                    16,
                    start=clip_start,
                    duration=clip_duration,
                    width=560,
                    max_colors=64,
                )
            # Browser playback uses hardware-decoded 30fps H.264, not GIFs.
            run([ffmpeg, "-hide_banner", "-loglevel", "error", "-y",
                 "-ss", str(clip_start), "-i", str(final), "-t", str(clip_duration),
                 "-an", "-c:v", "libx264", "-crf", "26", "-preset", "slow",
                 "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                 str(web / f"{name}-{language}.mp4")])
            still(ffmpeg, final, web / f"{name}-{language}.jpg", at=clip_start + .6)
        still(ffmpeg, final, web / f"intro-{language}.jpg", at=3)
        still(ffmpeg, final, ROOT / "assets" / "readme" / f"art-director-still-{language}.png")

    assets = [file for file in [*sorted((ROOT / "docs/assets/motion").glob('*')),
                               *sorted((ROOT / "assets/readme").glob('quick-preview-*'))]
              if file.suffix in ('.mp4', '.gif', '.jpg', '.vtt')]
    manifest = {"schema_version": "1.0", "master_fps": FPS,
                "readme_gif_fps": args.gif_fps, "readme_duration_seconds": PREVIEW_FRAMES / FPS, "master_duration_seconds": MASTER_SECONDS,
                "font": "Microsoft YaHei / SimHei (system; font files are not redistributed)",
                "assets": [{"path": file.relative_to(ROOT).as_posix(),
                            "bytes": file.stat().st_size,
                            "sha256": hashlib.sha256(file.read_bytes()).hexdigest()}
                           for file in assets if file.is_file()]}
    (ROOT / "docs/assets/motion/manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    print(f"Release media ready in {output_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
