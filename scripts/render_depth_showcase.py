"""Render the canonical visual-memory presentation for README and Pages."""
import hashlib
import json
import argparse
import os
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / 'motion/public'


def run(command: list[str]) -> None:
    print('+', ' '.join(command), flush=True)
    subprocess.run(command, cwd=ROOT, check=True)


def executable(name: str) -> str:
    found = shutil.which(name)
    if found is None:
        raise SystemExit(f'Required executable not found: {name}')
    return found


def detect_browser(explicit: str | None) -> str | None:
    if explicit:
        path = Path(explicit).expanduser().resolve()
        if not path.is_file():
            raise SystemExit(f'Browser executable does not exist: {path}')
        return str(path)
    configured = os.environ.get('REMOTION_BROWSER_EXECUTABLE')
    if configured:
        return detect_browser(configured)
    if os.name != 'nt':
        return None
    candidates = [
        Path(os.environ.get('PROGRAMFILES', '')) / 'Google/Chrome/Application/chrome.exe',
        Path(os.environ.get('LOCALAPPDATA', '')) / 'Google/Chrome/Application/chrome.exe',
        Path(os.environ.get('PROGRAMFILES(X86)', '')) / 'Microsoft/Edge/Application/msedge.exe',
    ]
    return next((str(path) for path in candidates if path.is_file()), None)


def gif(ffmpeg: str, source: Path, output: Path, fps: int, *, width: int,
        max_colors: int, dither: str) -> None:
    filter_complex = (
        f'fps={fps},scale={width}:-2:flags=lanczos,split[s0][s1];'
        f'[s0]palettegen=max_colors={max_colors}:stats_mode={"full" if dither == "none" else "diff"}[p];'
        f'[s1][p]paletteuse=dither={dither}:diff_mode=rectangle'
    )
    run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(source),
         '-filter_complex', filter_complex, '-loop', '0', str(output)])


def still(ffmpeg: str, source: Path, output: Path, *, at: float) -> None:
    run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(at),
         '-i', str(source), '-frames:v', '1', str(output)])

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--language', choices=('both', 'zh', 'en'), default='both')
    parser.add_argument('--preview-only', action='store_true')
    parser.add_argument('--skip-render', action='store_true', help='Re-encode existing lossless preview intermediates')
    parser.add_argument('--social-only', action='store_true', help='Render only the social preview and refresh the manifest')
    parser.add_argument('--gifsicle', type=Path, help='Path to the gifsicle optimizer')
    args = parser.parse_args()
    vendor = ROOT / 'motion/out/gif-tools/node_modules/gifsicle/vendor'
    optimizer = str(args.gifsicle) if args.gifsicle else shutil.which('gifsicle')
    if not optimizer:
        optimizer = next((str(p) for p in (vendor / 'gifsicle.exe', vendor / 'gifsicle') if p.is_file()), None)
    if not optimizer:
        parser.error('Install gifsicle and supply --gifsicle; see motion/README.md')
    output = ROOT / 'motion/out/depth-20261010'
    output.mkdir(parents=True, exist_ok=True)
    web = ROOT / 'docs/assets/motion'
    ffmpeg = executable('ffmpeg')
    npx = executable('npx.cmd' if __import__('os').name == 'nt' else 'npx')
    browser = detect_browser(None)
    languages = ('zh', 'en') if args.language == 'both' else (args.language,)
    for lang in (() if args.social_only else languages):
        props = output / f'props-{lang}.json'
        props.write_text(json.dumps({'language': lang, 'localFonts': (PUBLIC_DIR / 'render-fonts/yahei-regular.ttf').is_file()}), encoding='utf-8')
        video = web / f'depth-showcase-{lang}.mp4'
        preview = output / f'depth-preview-{lang}.mp4'
        for composition, target in [('DepthShowcase', video), ('DepthPreview', preview)]:
            if args.skip_render:
                continue
            if args.preview_only and composition == 'DepthShowcase':
                continue
            is_preview = composition == 'DepthPreview'
            extension = 'png' if is_preview else 'jpeg'
            with tempfile.TemporaryDirectory(prefix='depth-frames-', dir=output) as frames:
                command = [npx, 'remotion', 'render', str(ROOT / 'motion/src/index.ts'),
                           composition + lang.upper(), frames,
                           f'--public-dir={PUBLIC_DIR}', '--sequence', f'--image-format={extension}',
                           f'--image-sequence-pattern=frame-[frame].{extension}',
                           '--concurrency=4', f'--props={props}']
                if not is_preview:
                    command += ['--jpeg-quality=95']
                if browser:
                    command += [f'--browser-executable={browser}', '--chrome-mode=chrome-for-testing']
                run(command)
                # Lossless intermediate avoids H.264 noise changing otherwise static GIF pixels.
                encoding = ['-c:v', 'libx264rgb', '-crf', '0', '-preset', 'fast'] if is_preview else ['-c:v', 'libx264', '-crf', '26', '-preset', 'slow', '-pix_fmt', 'yuv420p']
                run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-framerate', '30',
                     '-i', str(Path(frames) / f'frame-%03d.{extension}'), *encoding,
                     '-movflags', '+faststart', str(target)])
        # A complete six-second periodic orbit, with one stable caption.
        raw_gif = output / f'raw-preview-{lang}.gif'
        gif(ffmpeg, preview, raw_gif, 20, width=800, max_colors=64, dither='none')
        published_gif = ROOT / f'assets/readme/depth-preview-{lang}.gif'
        run([optimizer, '-O3', '--lossy=120', str(raw_gif), '-o', str(published_gif)])
        if published_gif.stat().st_size > 4 * 1024 * 1024:
            raise RuntimeError(f'{published_gif.name} exceeds the 4 MiB preview budget')
        still(ffmpeg, video, web / f'depth-showcase-{lang}.jpg', at=2.5)
        shutil.copy2(web / f'depth-showcase-{lang}.jpg', ROOT / f'assets/readme/depth-preview-{lang}.jpg')
    if not args.social_only:
        for source, name in [('studio/asset-system-board.png', 'game'), ('styles/comic-board.png', 'comic'), ('styles/traditional-board.png', 'traditional')]:
            run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(PUBLIC_DIR / source),
                 '-vf', 'scale=680:-2:flags=lanczos', '-c:v', 'libwebp', '-quality', '82', str(web / f'depth-{name}.webp')])
    social = ROOT / 'assets/readme/social-preview.png'
    social_command = [npx, 'remotion', 'still', str(ROOT / 'motion/src/index.ts'), 'SocialPreview', str(social),
                      f'--public-dir={PUBLIC_DIR}']
    if browser:
        social_command += [f'--browser-executable={browser}', '--chrome-mode=chrome-for-testing']
    run(social_command)
    manifest_path = web / 'manifest.json'
    manifest = {
        'schema_version': '2.0',
        'master_fps': 30,
        'readme_gif_fps': 20,
        'readme_duration_seconds': 6,
        'master_duration_seconds': 18,
        'readme_preview': 'depth-preview',
        'font': 'Noto Sans SC, OFL variable subset',
        'visual_system': 'One team, one visual memory.',
        'depth_showcase': {
            'duration_seconds': 18,
            'fps': 30,
            'preview_seconds': 6,
            'preview_fps': 20,
            'preview_width': 800,
            'gif_optimizer': 'gifsicle -O3 --lossy=120; 64 colors, no dithering',
        },
    }
    files = [
        *(web / f'depth-showcase-{lang}{suffix}' for lang in ('zh', 'en') for suffix in ('.mp4', '.jpg')),
        *(web / f'depth-{name}.webp' for name in ('game', 'comic', 'traditional')),
        *(ROOT / f'assets/readme/depth-preview-{lang}{suffix}' for lang in ('zh', 'en') for suffix in ('.gif', '.jpg')),
        social,
    ]
    manifest['assets'] = [{'path': p.relative_to(ROOT).as_posix(), 'bytes': p.stat().st_size,
                           'sha256': hashlib.sha256(p.read_bytes()).hexdigest()}
                          for p in sorted(files) if p.is_file()]
    manifest_path.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8', newline='\n')
    print('Canonical visual-memory presentation rendered.')

if __name__ == '__main__':
    main()
