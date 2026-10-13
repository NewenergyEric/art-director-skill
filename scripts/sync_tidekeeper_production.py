"""Rebuild this repository's candidate fixture and synchronize public derivatives.

This is an explicit fixture-authoring operation, not automatic baseline migration.
The built pack destination must be new. Production scripts never call this helper.
"""
from pathlib import Path
import argparse, hashlib, json, shutil, subprocess, sys

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--pack-out', type=Path, required=True)
    args = parser.parse_args()
    source = ROOT / 'examples/tidekeeper-production'
    if args.pack_out.exists(): parser.error('Choose a new pack output directory')
    # Match this repository's .gitattributes before pinning byte hashes on Windows.
    for path in source.rglob('*'):
        if path.is_file() and path.suffix in ('.md', '.json', '.js', '.html', '.txt', '.yaml', '.py'):
            raw = path.read_bytes()
            if b'\r\n' in raw: path.write_bytes(raw.replace(b'\r\n', b'\n'))
    for command in (['render', str(source)], ['build', str(source), '--out', str(args.pack_out)]):
        result = subprocess.run([sys.executable, str(ROOT / 'scripts/style_pack.py'), *command], capture_output=True, text=True, encoding='utf-8')
        if result.returncode: raise SystemExit(result.stdout + result.stderr)
    manifest = json.loads((args.pack_out / 'manifest.json').read_text(encoding='utf-8'))
    plan_path = source / 'production-plan.json'
    plan = json.loads(plan_path.read_text(encoding='utf-8'))
    recipe = json.loads((source / 'references/scene-recipes.json').read_text(encoding='utf-8'))
    plan['scenes'] = recipe['scenes']
    plan['assets'] = [recipe['assets'].get(asset['id'], asset) for asset in plan['assets']]
    plan['pack'] = {**manifest['pack'], 'manifest_sha256': hashlib.sha256((args.pack_out / 'manifest.json').read_bytes()).hexdigest()}
    plan_path.write_text(json.dumps(plan, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
    for folder in ('docs/assets/tidekeeper-production', 'motion/public/tidekeeper-production'):
        destination = ROOT / folder; destination.mkdir(parents=True, exist_ok=True)
        files = {a['path'] for a in plan['assets'] if a['kind'] in ('image', 'runtime', 'font')}
        files.add('references/OFL.txt')
        for relative in files: shutil.copy2(source / relative, destination / Path(relative).name)
    print(json.dumps({'ok': True, 'version': manifest['pack']['version'], 'fingerprint': manifest['pack']['fingerprint']}))


if __name__ == '__main__': main()
