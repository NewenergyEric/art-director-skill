"""Render the spatial presentation while retaining the readable introduction."""
import hashlib
import json
import argparse
from pathlib import Path
import shutil
import tempfile

from render_motion_assets import ROOT, PUBLIC_DIR, detect_browser, executable, gif, run, still

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--preview-only', action='store_true')
    args = parser.parse_args()
    output = ROOT / 'motion/out/depth-20261010'
    output.mkdir(parents=True, exist_ok=True)
    web = ROOT / 'docs/assets/motion'
    ffmpeg = executable('ffmpeg')
    npx = executable('npx.cmd' if __import__('os').name == 'nt' else 'npx')
    browser = detect_browser(None)
    for lang in ('zh', 'en'):
        props = output / f'props-{lang}.json'
        props.write_text(json.dumps({'language': lang, 'localFonts': (PUBLIC_DIR / 'render-fonts/yahei-regular.ttf').is_file()}), encoding='utf-8')
        video = web / f'depth-showcase-{lang}.mp4'
        preview = output / f'depth-preview-{lang}.mp4'
        for composition, target in [('DepthShowcase', video), ('DepthPreview', preview)]:
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
        gif(ffmpeg, preview, ROOT / f'assets/readme/depth-preview-{lang}.gif', 20,
            width=960, max_colors=96)
        still(ffmpeg, video, web / f'depth-showcase-{lang}.jpg', at=2.5)
        shutil.copy2(web / f'depth-showcase-{lang}.jpg', ROOT / f'assets/readme/depth-preview-{lang}.jpg')
    for source, name in [('studio/asset-system-board.png', 'game'), ('styles/comic-board.png', 'comic'), ('styles/traditional-board.png', 'traditional')]:
        run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(PUBLIC_DIR / source),
             '-vf', 'scale=680:-2:flags=lanczos', '-c:v', 'libwebp', '-quality', '82', str(web / f'depth-{name}.webp')])
    manifest_path = web / 'manifest.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    manifest['depth_showcase'] = {'duration_seconds': 18, 'fps': 30, 'preview_seconds': 6, 'preview_fps': 20, 'preview_width': 960}
    files = [*web.glob('*'), *(ROOT / 'assets/readme').glob('quick-preview-*'), *(ROOT / 'assets/readme').glob('depth-preview-*')]
    manifest['assets'] = [{'path': p.relative_to(ROOT).as_posix(), 'bytes': p.stat().st_size,
                           'sha256': hashlib.sha256(p.read_bytes()).hexdigest()}
                          for p in sorted(files) if p.suffix in ('.mp4', '.gif', '.jpg', '.webp', '.vtt')]
    manifest_path.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8', newline='\n')
    print('Spatial presentation rendered; readable films retained.')

if __name__ == '__main__':
    main()
