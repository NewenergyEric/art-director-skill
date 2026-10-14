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
    'landing.en.html',
    'landing.zh.html',
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
    check('manifest describes the complete 24-second workflow',
          manifest.get('schema_version') == '3.0'
          and manifest.get('readme_duration_seconds') == 24
          and manifest.get('master_duration_seconds') == 24
          and manifest.get('readme_preview') == 'depth-preview'
          and manifest.get('visual_system') == 'One team, one visual memory.')

    for item in manifest['assets']:
        path = ROOT / item['path']
        check(item['path'] + ': matches recorded bytes and digest',
              path.is_file() and path.stat().st_size == item['bytes']
              and hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256'])

    check('English README compatibility copy stays synchronized with the default',
          (ROOT / 'README.en.md').read_bytes() == (ROOT / 'README.md').read_bytes())
    for lang, readme in [('en', 'README.md'), ('en', 'README.en.md'), ('zh', 'README.zh.md')]:
        text = (ROOT / readme).read_text(encoding='utf-8')
        images = re.findall(r'<img\b[^>]*src="([^"]+)"', text)
        gifs = [urlsplit(src).path for src in images if urlsplit(src).path.endswith('.gif')]
        check(readme + ': one canonical repository-hosted GIF',
              gifs == [f'assets/readme/depth-preview-{lang}.gif'])
        check(readme + ': one introduction instead of competing web interfaces',
              ('docs/landing.html' if lang == 'en' else 'docs/landing.zh.html') in text
              and not any(name in text for name in ('workbench.html', 'showcase.html', 'call-flow.html', 'team-production.html')))
        expected_claim = '一个团队/项目，一份视觉记忆。' if lang == 'zh' else 'One team, one visual memory.'
        for folder, page in [('tidekeeper-playable', 'play'), ('duskwood-watch', 'index')]:
            expected_game = f'docs/assets/{folder}/{page}' + ('.en.html' if lang == 'en' else '.html')
            check(readme + ': game entry matches language: ' + folder,
                  expected_game + ')' in text and (ROOT / expected_game).is_file())
        check(readme + ': uses the shared core claim', expected_claim in text)
        check(readme + ': contains no legacy public media reference',
              not any(name in text for name in LEGACY_MEDIA) and '70 秒' not in text and '70-second' not in text)
        map_path = f'docs/assets/workflow/workflow-{lang}.png'
        check(readme + ': ends with the shared four-role diagram',
              text.rstrip().endswith(map_path + ')') and (ROOT / map_path).is_file())

        gif = ROOT / f'assets/readme/depth-preview-{lang}.gif'
        data = gif.read_bytes()
        check(lang + ': canonical GIF is valid, 800 px wide, and under 6 MiB',
              data[:6] in (b'GIF89a', b'GIF87a')
              and struct.unpack_from('<H', data, 6)[0] == 800
              and gif.stat().st_size <= 6 * MIB)
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
        if name in ('landing.html', 'landing.en.html', 'landing.zh.html'):
            check(name + ': loads the shared visual-memory stylesheet', 'assets/visual-memory.css' in text)
            lang = 'zh' if name == 'landing.zh.html' else 'en'
            for folder, page in [('tidekeeper-playable', 'play'), ('duskwood-watch', 'index')]:
                expected_game = f'assets/{folder}/{page}' + ('.en.html' if lang == 'en' else '.html')
                check(name + ': game entry matches language: ' + folder,
                      f'href="{expected_game}"' in text)
            check(name + ': player and captions match its language',
                  f'depth-showcase-{lang}.mp4' in text
                  and f'workflow-{lang}.vtt' in text
                  and f'srclang="{lang}"' in text)
            check(name + ': shared interactions and a language switch',
                  'assets/introduction.js' in text and 'data-language-link' in text
                  and 'hreflang="en"' in text and 'hreflang="zh-CN"' in text)
            sections = re.findall(r'<section\b[^>]*\bid="([^"]+)"', text)
            check(name + ': related-role diagram is the final section',
                  sections[-1:] == ['ecosystem'] and 'class="role-mobile"' in text)
            check(name + ': four real companion Skill links',
                  all('https://github.com/NewenergyEric/' + repo in text for repo in (
                      'game-market-intelligence', 'game-reverse-analyst',
                      'game-production-manager', 'art-director-skill')))
        else:
            redirect = re.search(r'http-equiv="refresh" content="0; url=([^"]+)"', text)
            check(name + ': redirects to the unified introduction',
                  bool(redirect) and redirect[1].startswith('landing.html#'))
            if redirect:
                anchor = urlsplit(redirect[1]).fragment
                landing_source = (ROOT / 'docs/landing.html').read_text(encoding='utf-8')
                check(name + ': redirect anchor exists', f'id="{anchor}"' in landing_source)
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
    check('shared stylesheet preserves the public palette and readable alternatives',
          all(token in stylesheet for token in ('#001f3f', '#007d86', '#92e4da',
                                                'prefers-reduced-motion', ':focus-visible')))
    landing = (ROOT / 'docs/landing.html').read_text(encoding='utf-8')
    chinese_landing = (ROOT / 'docs/landing.zh.html').read_text(encoding='utf-8')
    check('English default and complete Chinese alternate declare their languages',
          '<html lang="en">' in landing and '<html lang="zh-CN">' in chinese_landing)
    check('English page compatibility copy stays synchronized with the default',
          (ROOT / 'docs/landing.en.html').read_bytes() == (ROOT / 'docs/landing.html').read_bytes())
    check('language links open the opposite edition',
          'data-language-link href="landing.zh.html"' in landing
          and 'data-language-link href="landing.html"' in chinese_landing)
    check('language editions keep the same section and control IDs',
          set(re.findall(r'\bid="([^"]+)"', landing))
          == set(re.findall(r'\bid="([^"]+)"', chinese_landing)))
    ids = re.findall(r'\bid="([^"]+)"', landing)
    check('introduction IDs are unique', len(ids) == len(set(ids)))
    for anchor in re.findall(r'href="#([^"]+)"', landing):
        check('introduction anchor: ' + anchor, anchor in ids)
    for source in re.findall(r'data-copy="([^"]+)"', landing):
        check('copy button has a source: ' + source, source in ids)
    videos = re.findall(r'<video\b[^>]*>', landing)
    check('one optional film, native controls, captions and a text alternative',
          len(videos) == 1 and 'controls' in videos[0]
          and 'preload="none"' in videos[0] and 'autoplay' not in videos[0]
          and 'kind="captions"' in landing and 'class="transcript"' in landing)
    chapters = [float(value) for value in re.findall(r'data-seek="([^"]+)"', landing)]
    check('five navigable chapters cover the workflow in sequence',
          len(chapters) == 5 and chapters == sorted(chapters)
          and chapters[0] == 0 and 14 <= chapters[-1] < 24)
    check('both caption editions cover the complete 24-second story',
          all('00:24.000' in (ROOT / f'docs/assets/motion/workflow-{lang}.vtt').read_text(encoding='utf-8')
              for lang in ('en', 'zh')))
    motion_source = (ROOT / 'motion/src/GameCampaign.tsx').read_text(encoding='utf-8')
    check('public source keeps the requested Chinese and English claims',
          '一个团队/项目，' in motion_source and '一份视觉记忆。' in motion_source
          and 'One team,' in motion_source and 'one visual memory.' in motion_source)
    claim_corpus = public_text + motion_source + (ROOT / 'README.en.md').read_text(encoding='utf-8')
    check('English core claim keeps the fixed comma punctuation',
          'One team. One visual memory.' not in claim_corpus
          and 'ONE TEAM. ONE VISUAL MEMORY.' not in claim_corpus)
    workflow = (ROOT / '.github/workflows/ci.yml').read_text(encoding='utf-8')
    check('CI renders only current visual-memory compositions',
          'DepthShowcaseZH' in workflow and 'DepthPreviewEN' in workflow
          and all(legacy not in workflow for legacy in ('ArtDirectorZH', 'ArtDirectorEN', 'QuickPreview')))

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
            check(video.name + ': H.264, 1280x720, 30 fps, 24 seconds',
                  stream['codec_name'] == 'h264'
                  and stream['avg_frame_rate'] == '30/1'
                  and (stream['width'], stream['height']) == (1280, 720)
                  and abs(float(video_probe['format']['duration']) - 24) < .1)
            gif_probe = json.loads(subprocess.check_output([
                'ffprobe', '-v', 'error', '-select_streams', 'v:0',
                '-show_entries', 'stream=avg_frame_rate,width:format=duration',
                '-of', 'json', str(ROOT / f'assets/readme/depth-preview-{lang}.gif')], text=True))
            gif_stream = gif_probe['streams'][0]
            check(lang + ': README GIF is 800 px and includes the full 24 seconds',
                  gif_stream['width'] == 800
                  and abs(float(gif_probe['format']['duration']) - 24) < .1)

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
