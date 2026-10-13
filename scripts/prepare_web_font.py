"""Subset an OFL-licensed Noto Sans SC font for this public presentation.

Requires fonttools[woff]; it is not a dependency of the core Skill.
Obtain the input from https://github.com/google/fonts/tree/main/ofl/notosanssc.
Keep docs/assets/fonts/OFL.txt with the generated web font.
"""
import argparse
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    parser.add_argument('--production', action='store_true', help='Also refresh the continuous-scene fixture font')
    args = parser.parse_args()
    text = ''.join(path.read_text(encoding='utf-8') for path in (ROOT / 'docs').glob('*.html'))
    text += ''.join(path.read_text(encoding='utf-8') for path in (ROOT / 'motion/src').glob('*.tsx'))
    text += ''.join(path.read_text(encoding='utf-8') for path in (ROOT / 'examples/tidekeeper-production/references').glob('*.js'))
    text += ''.join(chr(code) for code in range(32, 127))
    font = TTFont(args.source)
    options = subset.Options()
    options.layout_features = ['*']
    job = subset.Subsetter(options=options)
    job.populate(text=text)
    job.subset(font)
    font.flavor = 'woff2'
    destination = ROOT / 'docs/assets/fonts/noto-sans-sc-subset.woff2'
    font.save(destination)
    render_font = ROOT / 'motion/public/fonts/field-sans.woff2'
    render_font.write_bytes(destination.read_bytes())
    if args.production:
        (ROOT / 'examples/tidekeeper-production/references/tide-sans.woff2').write_bytes(destination.read_bytes())
    print(f'{destination.relative_to(ROOT)}: {destination.stat().st_size} bytes')

if __name__ == '__main__':
    main()
