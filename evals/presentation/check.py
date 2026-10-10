"""Validate the canonical visual-memory presentation.

Python standard library only. ``--probe`` additionally verifies encoded media with
ffprobe when it is available on the publishing machine.
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
PUBLIC_PAGES = (
    'showcase.html',
    'landing.html',
    'workbench.html',
    'member-workbench.html',
    'call-flow.html',
    'team-production.html',
)
LEGACY_MEDIA = (
    'art-director-motion',
    'quick-preview',
    'art-director-intro',
    'style-directions',
    'template-switch',
    'team-pipeline',
    'review-lens',
)


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


def local_links(path, text):
    for src in re.findall(r'(?:href|src|poster|data-src)="([^"]+)"', text.split('<script>')[0]):
        parsed = urlsplit(src)
        if parsed.scheme or not parsed.path or parsed.path.startswith('#'):
            continue
        target = (path.parent / unquote(parsed.path)).resolve()
        yield src, target


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--probe', action='store_true')
    parser.add_argument('--out', type=Path)
    args = parser.parse_args()
    checks = []

    def check(name, ok):
        checks.append({'name': name, 'pass': bool(ok)})

    manifest = json.loads((ROOT / 'docs/assets/motion/manifest.json').read_text(encoding='utf-8'))
    check('manifest describes the canonical spatial system',
          manifest.get('schema_version') == '2.0'
          and manifest.get('readme_duration_seconds') == 6
          and manifest.get('master_duration_seconds') == 18
          and manifest.get('readme_preview') == 'depth-preview'
          and manifest.get('visual_system') == 'One team, one visual memory.')

    for item in manifest['assets']:
        path = ROOT / item['path']
        check(item['path'] + ': matches recorded bytes and digest',
              path.is_file() and path.stat().st_size == item['bytes']
              and hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256'])

    for lang, readme in [('zh', 'README.md'), ('en', 'README.en.md')]:
        text = (ROOT / readme).read_text(encoding='utf-8')
        images = re.findall(r'<img\b[^>]*src="([^"]+)"', text)
        gifs = [urlsplit(src).path for src in images if urlsplit(src).path.endswith('.gif')]
        check(readme + ': one canonical repository-hosted GIF',
              gifs == [f'assets/readme/depth-preview-{lang}.gif'])
        check(readme + ': product, director and engineering entrances are visible',
              all(link in text for link in ('docs/landing.html', 'docs/workbench.html', 'docs/call-flow.html')))
        expected_claim = '一个团队，一份视觉记忆。' if lang == 'zh' else 'One team. One visual memory.'
        check(readme + ': uses the shared core claim', expected_claim in text)
        check(readme + ': contains no legacy public media reference',
              not any(name in text for name in LEGACY_MEDIA) and '70 秒' not in text and '70-second' not in text)

        gif = ROOT / f'assets/readme/depth-preview-{lang}.gif'
        data = gif.read_bytes()
        check(lang + ': canonical GIF is valid, 800 px wide, and under 4 MiB',
              data[:6] in (b'GIF89a', b'GIF87a')
              and struct.unpack_from('<H', data, 6)[0] == 800
              and gif.stat().st_size <= 4 * MIB)
        poster = ROOT / f'assets/readme/depth-preview-{lang}.jpg'
        check(lang + ': reduced-motion poster exists and is non-empty',
              poster.is_file() and poster.stat().st_size > 10_000)

    old_gifs = [
        ROOT / f'assets/readme/{stem}-{lang}.gif'
        for stem in ('art-director-motion', 'quick-preview')
        for lang in ('zh', 'en')
    ]
    check('legacy README GIFs have been removed', not any(path.exists() for path in old_gifs))

    public_text = ''
    for name in PUBLIC_PAGES:
        path = ROOT / 'docs' / name
        text = path.read_text(encoding='utf-8')
        public_text += '\n' + text
        check(name + ': opts into the shared visual-memory system',
              'assets/visual-memory.css' in text and 'vm-page' in text)
        check(name + ': carries the visual-memory language',
              '视觉记忆' in text or 'VISUAL MEMORY' in text)
        for src, target in local_links(path, text):
            check(name + ': local link ' + src,
                  target.is_relative_to(ROOT) and target.is_file())

    check('public pages do not link legacy films or clips',
          not any(name in public_text for name in LEGACY_MEDIA)
          and '70 秒' not in public_text and '70-second' not in public_text)
    check('public videos are manual and lazy',
          all('preload="none"' in tag and 'autoplay' not in tag
              for tag in re.findall(r'<video\b[^>]*>', public_text)))

    stylesheet = (ROOT / 'docs/assets/visual-memory.css').read_text(encoding='utf-8')
    check('shared stylesheet self-hosts the licensed variable face',
          'noto-sans-sc-subset.woff2' in stylesheet and 'font-display: swap' in stylesheet)
    check('shared stylesheet defines the canonical palette and distinct layouts',
          all(token in stylesheet for token in (
              '#001f3f', '#007d86', '#92e4da',
              '.vm-workbench', '.vm-member', '.vm-call', '.vm-team')))
    check('public presentation reference fixes the shared claim and anti-template rule',
          all(token in (ROOT / 'references/public-presentation.md').read_text(encoding='utf-8')
              for token in ('一个团队，一份视觉记忆。', 'One team, one visual memory.', '四种构图，不复制同一模板')))

    showcase = (ROOT / 'docs/showcase.html').read_text(encoding='utf-8')
    check('live stage supports pause, reduced motion, Save-Data and visibility',
          all(token in showcase for token in (
              'prefers-reduced-motion', 'saveData', 'IntersectionObserver',
              'visibilitychange', 'animation-play-state:paused', 'aria-pressed')))
    landing = (ROOT / 'docs/landing.html').read_text(encoding='utf-8')
    check('product page has reduced-motion behaviour and one canonical film',
          'prefers-reduced-motion' in landing
          and len(re.findall(r'<source\s+src="assets/motion/depth-showcase-zh\.mp4', landing)) == 1
          and len(re.findall(r'<video\b', landing)) == 1)

    motion_source = (ROOT / 'motion/src/DepthShowcase.tsx').read_text(encoding='utf-8')
    check('motion source uses the exact shared claims',
          "'一个团队，'" in motion_source and '视觉记忆。' in motion_source
          and "'One team,'" in motion_source and 'visual memory.' in motion_source)

    for lang in ('zh', 'en'):
        video = ROOT / f'docs/assets/motion/depth-showcase-{lang}.mp4'
        check(video.name + ': under 5 MiB', video.stat().st_size <= 5 * MIB)
        boxes = {kind: start for kind, start, _, _ in atoms(video.read_bytes())}
        check(video.name + ': faststart metadata precedes video payload',
              b'moov' in boxes and b'mdat' in boxes and boxes[b'moov'] < boxes[b'mdat'])
        if args.probe:
            video_probe = json.loads(subprocess.check_output([
                'ffprobe', '-v', 'error', '-select_streams', 'v:0',
                '-show_entries', 'stream=codec_name,avg_frame_rate,width,height:format=duration',
                '-of', 'json', str(video)], text=True))
            stream = video_probe['streams'][0]
            check(video.name + ': H.264, 1280x720, 30 fps, 18 seconds',
                  stream['codec_name'] == 'h264'
                  and stream['avg_frame_rate'] == '30/1'
                  and (stream['width'], stream['height']) == (1280, 720)
                  and abs(float(video_probe['format']['duration']) - 18) < .1)
            gif_probe = json.loads(subprocess.check_output([
                'ffprobe', '-v', 'error', '-select_streams', 'v:0',
                '-show_entries', 'stream=avg_frame_rate,width:format=duration',
                '-of', 'json', str(ROOT / f'assets/readme/depth-preview-{lang}.gif')], text=True))
            gif_stream = gif_probe['streams'][0]
            check(lang + ': README GIF is 800 px, 20 fps, six seconds',
                  gif_stream['avg_frame_rate'] == '20/1'
                  and gif_stream['width'] == 800
                  and abs(float(gif_probe['format']['duration']) - 6) < .1)

    check('web and render share the same licensed font bytes',
          (ROOT / 'motion/public/fonts/OFL.txt').is_file()
          and (ROOT / 'motion/public/fonts/field-sans.woff2').read_bytes()
          == (ROOT / 'docs/assets/fonts/noto-sans-sc-subset.woff2').read_bytes())
    check('public fonts are OFL and render-only proprietary fonts stay ignored',
          (ROOT / 'docs/assets/fonts/OFL.txt').is_file()
          and 'motion/public/render-fonts/' in (ROOT / '.gitignore').read_text(encoding='utf-8'))

    result = {
        'method': 'Shared claim, public links, canonical media budgets and checksums; optional ffprobe.',
        'passed': sum(item['pass'] for item in checks),
        'total': len(checks),
        'failed': [item['name'] for item in checks if not item['pass']],
        'checks': checks,
    }
    if args.out:
        args.out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({key: result[key] for key in ('passed', 'total', 'failed')}, ensure_ascii=False))
    return bool(result['failed'])


if __name__ == '__main__':
    raise SystemExit(main())
