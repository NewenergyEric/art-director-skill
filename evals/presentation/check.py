"""Prevent the public presentation from regressing into large autoplay GIFs.

Python standard library only. --probe additionally verifies encoded media with ffprobe.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import struct
import subprocess
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[2]
MIB = 1024 * 1024

def atoms(data, start=0, end=None):
    end = len(data) if end is None else end
    while start + 8 <= end:
        size, kind = struct.unpack_from('>I4s', data, start)
        header = 8
        if size == 1:
            size = struct.unpack_from('>Q', data, start + 8)[0]
            header = 16
        elif size == 0:
            size = end - start
        if size < header or start + size > end:
            raise AssertionError('Invalid MP4 atom boundaries')
        yield kind, start, size, header
        start += size

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--probe', action='store_true')
    parser.add_argument('--out', type=Path)
    args = parser.parse_args()
    checks = []
    def check(name, ok):
        checks.append({'name': name, 'pass': bool(ok)})
    manifest = json.loads((ROOT / 'docs/assets/motion/manifest.json').read_text(encoding='utf-8'))
    for item in manifest['assets']:
        path = ROOT / item['path']
        check(item['path'] + ': matches recorded bytes and digest',
              path.is_file() and path.stat().st_size == item['bytes']
              and hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256'])
    for lang, name in [('zh', 'README.md'), ('en', 'README.en.md')]:
        text = (ROOT / name).read_text(encoding='utf-8')
        sources = re.findall(r'<img\b[^>]*src="([^"]+)"', text)
        gifs = [src for src in sources if src.endswith('.gif')]
        check(name + ': one repository-hosted preview GIF only',
              gifs == [f'assets/readme/quick-preview-{lang}.gif'])
        check(name + ': full film and all four clips remain discoverable',
              'landing.html#film' in text)
        path = ROOT / f'assets/readme/quick-preview-{lang}.gif'
        check(name + ': GIF under 2 MiB', path.stat().st_size <= 2 * MIB)
        check(name + ': valid GIF header', path.read_bytes()[:6] in (b'GIF89a', b'GIF87a'))
    for path in (ROOT / 'docs/assets/motion').glob('*.mp4'):
        limit = (5 if 'intro' in path.name else 1 if 'quick-preview' in path.name else 2) * MIB
        check(path.name + ': media byte budget', path.stat().st_size <= limit)
        boxes = {kind: start for kind, start, _, _ in atoms(path.read_bytes())}
        check(path.name + ': faststart metadata precedes video payload',
              b'moov' in boxes and b'mdat' in boxes and boxes[b'moov'] < boxes[b'mdat'])
        if args.probe:
            probe = json.loads(subprocess.check_output([
                'ffprobe', '-v', 'error', '-select_streams', 'v:0',
                '-show_entries', 'stream=codec_name,avg_frame_rate,width,height:format=duration',
                '-of', 'json', str(path)], text=True))
            stream = probe['streams'][0]
            check(path.name + ': H.264 at 30 fps',
                  stream['codec_name'] == 'h264' and stream['avg_frame_rate'] == '30/1')
            duration = float(probe['format']['duration'])
            expected = 30 if 'intro' in path.name else 6 if 'quick-preview' in path.name else None
            if expected:
                check(path.name + ': intended duration', abs(duration - expected) < .1)
    for lang in ('zh', 'en'):
        if args.probe:
            probe = json.loads(subprocess.check_output([
                'ffprobe', '-v', 'error', '-select_streams', 'v:0',
                '-show_entries', 'stream=avg_frame_rate:format=duration', '-of', 'json',
                str(ROOT / f'assets/readme/quick-preview-{lang}.gif')], text=True))
            check(lang + ': GIF is 20 fps and 6 seconds',
                  probe['streams'][0]['avg_frame_rate'] == '20/1'
                  and abs(float(probe['format']['duration']) - 6) < .1)
    for name in ('landing.html', 'workbench.html'):
        path = ROOT / 'docs' / name
        text = path.read_text(encoding='utf-8')
        check(name + ': self-hosted sans-serif fallback', 'assets/fonts/noto-sans-sc-subset.woff2' in text)
        for src in re.findall(r'(?:href|src|poster|data-src)="([^"]+)"', text.split('<script>')[0]):
            parsed = urlsplit(src)
            if parsed.scheme or not parsed.path:
                continue
            target = (path.parent / unquote(parsed.path)).resolve()
            check(name + ': local link ' + src, target.is_relative_to(ROOT) and target.is_file())
    text = (ROOT / 'docs/landing.html').read_text(encoding='utf-8')
    check('full films and clips do not preload or autoplay',
          all('preload="none"' in v and 'autoplay' not in v
              for v in re.findall(r'<video\b[^>]*>', text)))
    check('preview has reduced-motion, data-saving and visibility controls',
          all(token in text for token in ('prefers-reduced-motion', 'saveData', 'IntersectionObserver', 'visibilitychange')))
    check('public fonts are OFL; render-only proprietary fonts stay ignored',
          (ROOT / 'docs/assets/fonts/OFL.txt').is_file()
          and 'motion/public/render-fonts/' in (ROOT / '.gitignore').read_text(encoding='utf-8'))
    result = {'method': 'Media budgets, checksums, MP4 atoms, static local links; optional ffprobe. Browser behaviour is checked separately.',
              'passed': sum(c['pass'] for c in checks), 'total': len(checks),
              'failed': [c['name'] for c in checks if not c['pass']], 'checks': checks}
    if args.out:
        args.out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({key: result[key] for key in ('passed', 'total', 'failed')}, ensure_ascii=False))
    return bool(result['failed'])

if __name__ == '__main__':
    raise SystemExit(main())
