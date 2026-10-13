"""Portable asset-batch checks and Compositor v11 image-layer export.

No generation, artistic approval or native-application acceptance is implied.
Only build requires Pillow. All destinations must be new directories.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
from pathlib import Path, PurePosixPath
import re
import shutil
import sys
import tempfile
import uuid

MAX_BYTES = 512 * 1024 * 1024
MAX_PIXELS = 100_000_000
ID = re.compile(r"^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}$")
HASH = re.compile(r"^[0-9a-f]{64}$")


def digest(path):
    with path.open('rb') as stream:
        result = hashlib.sha256()
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            result.update(block)
    return result.hexdigest()


def read(path):
    if path.stat().st_size > 4 * 1024 * 1024:
        raise ValueError('JSON exceeds 4 MiB')
    return json.loads(path.read_text(encoding='utf-8'), parse_constant=lambda v: (_ for _ in ()).throw(ValueError('Non-finite JSON number')))


def write(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + '\n', encoding='utf-8', newline='\n')


def safe(root, relative):
    if not isinstance(relative, str) or not relative or '\\' in relative or ':' in relative:
        raise ValueError('Invalid relative path')
    parts = PurePosixPath(relative)
    if parts.is_absolute() or any(p in ('..', '.') for p in relative.split('/')) or '' in relative.split('/'):
        raise ValueError('Path must stay inside its package')
    target = root
    for component in parts.parts:
        target = target / component
        if target.is_symlink():
            raise ValueError('Symlinks are not supported')
    if root.resolve() not in target.resolve().parents:
        raise ValueError('Path escapes package')
    if target.is_file() and target.stat().st_size > MAX_BYTES:
        raise ValueError('Asset exceeds 512 MiB')
    return target


def identifier(value):
    if not isinstance(value, str) or not ID.fullmatch(value):
        raise ValueError('Invalid ID: ' + str(value))
    return value


def number(value, low, high):
    return isinstance(value, (int, float)) and not isinstance(value, bool) and math.isfinite(value) and low <= value <= high


def inspect(plan_path, pack, allow_candidate=False):
    plan, manifest = read(plan_path), read(safe(pack, 'manifest.json'))
    errors, warnings = [], []
    def fail(message): errors.append(message)
    if plan.get('schema_version') != '1.0':
        raise ValueError('Unsupported production-plan schema')
    identifier(plan.get('batch_id'))
    frozen = plan.get('pack', {})
    if frozen.get('manifest_sha256') != digest(pack / 'manifest.json'):
        fail('Pack manifest hash changed; rebase through a new candidate, not an in-place edit')
    for key in ('id', 'version', 'fingerprint'):
        if not frozen.get(key) or frozen[key] != manifest.get('pack', {}).get(key):
            fail('Wrong pack ' + key)
    if manifest.get('pack', {}).get('status') != 'approved':
        warnings.append('Project baseline is a candidate, not an approved release')
        if not allow_candidate: fail('Candidate project requires --allow-candidate')
    declared = manifest.get('files')
    if not isinstance(declared, dict) or 'style-pack.json' not in declared:
        raise ValueError('Incomplete project manifest')
    bad_paths = set()
    for relative, sha in declared.items():
        path = safe(pack, relative)
        if not isinstance(sha, str) or not HASH.fullmatch(sha) or not path.is_file() or digest(path) != sha:
            bad_paths.add(relative)
            fail('Missing or changed pack file: ' + relative)
    actual = set()
    for path in pack.rglob('*'):
        if path.is_symlink(): raise ValueError('Symlink in project pack')
        if path.is_file(): actual.add(path.relative_to(pack).as_posix())
    for relative in sorted(actual - set(declared) - {'manifest.json'}):
        fail('Unlisted pack file: ' + relative)
    style = read(pack / 'style-pack.json')
    rules = {r['id'] for r in style.get('rules', [])}
    rejected_paths = {r['path'] for r in style.get('references', []) if r.get('status') == 'rejected'}
    assets = plan.get('assets', [])
    if not isinstance(assets, list) or not assets or len(assets) > 10000:
        raise ValueError('Assets must be a nonempty list, at most 10000 entries')
    by_id, states = {}, {}
    for asset in assets:
        aid = identifier(asset.get('id'))
        if aid in by_id: raise ValueError('Duplicate asset ID: ' + aid)
        by_id[aid] = asset
        path = safe(pack, asset['path'])
        state = 'reusable'
        if asset['path'] in rejected_paths:
            fail('Project reference is rejected: ' + aid); state = 'rejected'
        if asset['path'] not in declared:
            fail('Asset absent from frozen pack: ' + aid); state = 'missing'
        elif asset['path'] in bad_paths:
            state = 'missing' if not path.is_file() else 'changed'
        if asset.get('kind') not in ('image', 'font', 'runtime', 'record'):
            fail('Invalid asset kind: ' + aid)
        if asset.get('status') not in ('approved', 'candidate', 'rejected'):
            fail('Invalid review status: ' + aid)
        if asset.get('status') == 'rejected':
            fail('Rejected asset: ' + aid); state = 'rejected'
        if asset.get('status') == 'candidate':
            if not allow_candidate: fail('Candidate requires --allow-candidate: ' + aid)
            warnings.append('Candidate, not director-approved: ' + aid)
        if asset.get('status') == 'approved':
            approval = asset.get('approval_path')
            if not approval or approval not in declared or approval in bad_paths:
                fail('Approved asset needs intact decision evidence: ' + aid)
        task = asset.get('task', {})
        if not isinstance(task.get('rules', []), list) or any(r not in rules for r in task.get('rules', [])):
            fail('Unknown project rule: ' + aid)
        if task.get('prompt_record') and task['prompt_record'] not in declared:
            fail('Prompt record missing from pack: ' + aid)
        states[aid] = state
    visiting, ordered = set(), []
    def visit(aid):
        if aid not in by_id: raise ValueError('Unknown dependency: ' + str(aid))
        if aid in visiting: raise ValueError('Cyclic asset dependency: ' + aid)
        if aid in ordered: return
        visiting.add(aid)
        deps = by_id[aid].get('depends_on', [])
        if not isinstance(deps, list): raise ValueError('Dependencies must be a list')
        for dep in deps: visit(dep)
        visiting.remove(aid); ordered.append(aid)
        if states[aid] == 'reusable' and any(states[d] != 'reusable' for d in deps):
            states[aid] = 'blocked-by-input'
    for aid in by_id: visit(aid)
    scenes = plan.get('scenes', [])
    if not isinstance(scenes, list) or not scenes: raise ValueError('No scene recipes')
    seen = set()
    for scene in scenes:
        sid = identifier(scene.get('id'))
        if sid in seen: raise ValueError('Duplicate scene ID: ' + sid)
        seen.add(sid)
        if not all(isinstance(scene.get(k), int) and not isinstance(scene[k], bool) and 1 <= scene[k] <= 30000 for k in ('width', 'height')):
            raise ValueError('Invalid scene dimensions')
        if scene['width'] * scene['height'] > MAX_PIXELS: raise ValueError('Scene exceeds pixel budget')
        layers, lids = scene.get('layers'), set()
        if not isinstance(layers, list) or not 1 <= len(layers) <= 10000: raise ValueError('Invalid layer count')
        for layer in layers:
            lid = identifier(layer.get('id'))
            if lid in lids: raise ValueError('Duplicate layer ID')
            lids.add(lid)
            if layer.get('asset') not in by_id or by_id[layer['asset']]['kind'] != 'image':
                raise ValueError('Layer requires an image asset')
            box = layer.get('box')
            if not isinstance(box, list) or len(box) != 4 or not all(number(v, -30000, 30000) for v in box[:2]) or not all(number(v, 1, 30000) for v in box[2:]):
                raise ValueError('Invalid layer box')
            if not number(layer.get('opacity', 1), 0, 1) or not number(layer.get('rotation', 0), -360, 360):
                raise ValueError('Invalid opacity or rotation')
            if box[2] * box[3] > MAX_PIXELS: raise ValueError('Layer surface exceeds pixel budget')
            if any(not isinstance(layer.get(k, False), bool) for k in ('flipX', 'flipY')): raise ValueError('Invalid flip')
    report = {'ok': not errors, 'pack': frozen, 'errors': errors, 'warnings': warnings,
              'order': ordered, 'asset_states': states, 'scenes': len(scenes),
              'artistic_approval': 'not_inferred', 'native_compositor_open': 'not_tested'}
    return plan, manifest, report


def new_destination(out, *sources):
    out = out.resolve()
    if out.exists(): raise ValueError('Output exists; choose a new directory')
    for source in sources:
        source = source.resolve()
        if out == source or source in out.parents: raise ValueError('Output must be outside inputs')
    out.parent.mkdir(parents=True, exist_ok=True)
    return out


def export_comp(scene, assets, pack, destination, namespace):
    from PIL import Image
    (destination / 'images').mkdir(parents=True)
    docid = uuid.uuid5(uuid.NAMESPACE_URL, namespace + '/' + scene['id'])
    layers, pixels = [], 0
    for layer in scene['layers']:
        source = safe(pack, assets[layer['asset']]['path'])
        lid = str(uuid.uuid5(docid, layer['id'])).upper()
        with Image.open(source) as opened:
            pixels += opened.width * opened.height
            if pixels > MAX_PIXELS: raise ValueError('Layer pixel budget exceeded')
            opened.convert('RGBA').save(destination / 'images' / (lid + '.png'), optimize=True)
        x, y, w, h = layer['box']
        layers.append({'id': lid, 'name': layer['id'], 'imageFile': lid + '.png',
                       'isVisible': True, 'isGroup': False, 'opacity': layer.get('opacity', 1), 'blendMode': 'Normal',
                       'transform': {'origin': [x, y], 'size': [w, h], 'rotation': layer.get('rotation', 0),
                                     'flipX': layer.get('flipX', False), 'flipY': layer.get('flipY', False), 'sampling': 'High quality'}})
    manifest = {'format': 'com.compositor.project', 'version': 11, 'documentID': str(docid).upper(),
                'width': scene['width'], 'height': scene['height'], 'resolution': 72,
                'colorSpace': 'sRGB', 'activeLayerID': layers[-1]['id'], 'layers': layers}
    pending = destination / '.manifest.json.tmp'
    write(pending, manifest)
    if pending.stat().st_size > 4 * 1024 * 1024: raise ValueError('Compositor manifest exceeds 4 MiB')
    pending.replace(destination / 'manifest.json')


def build(plan_path, pack, out, allow_candidate):
    plan, manifest, report = inspect(plan_path, pack, allow_candidate)
    if not report['ok']: raise ValueError('; '.join(report['errors']))
    from PIL import Image
    assets = {a['id']: a for a in plan['assets']}
    for asset in assets.values():
        if asset['kind'] != 'image': continue
        with Image.open(safe(pack, asset['path'])) as img:
            img.verify()
        with Image.open(safe(pack, asset['path'])) as img:
            if img.width * img.height > MAX_PIXELS: raise ValueError('Image pixel budget exceeded')
            if asset.get('pixels') and list(img.size) != asset['pixels']: raise ValueError('Wrong pixel dimensions: ' + asset['id'])
            if asset.get('alpha') and ('A' not in img.getbands() or img.getchannel('A').getextrema()[0] != 0):
                raise ValueError('Missing transparent background: ' + asset['id'])
    out = new_destination(out, pack)
    with tempfile.TemporaryDirectory(prefix='.production-', dir=out.parent) as temp:
        staged = Path(temp) / 'delivery'; staged.mkdir()
        shutil.copytree(pack, staged / 'pack')
        shutil.copyfile(plan_path, staged / 'production-plan.json')
        write(staged / 'scene-recipes.json', {'schema_version': '1.0', 'pack': plan['pack'], 'assets': assets, 'scenes': plan['scenes']})
        for scene in plan['scenes']:
            export_comp(scene, assets, staged / 'pack', staged / 'compositor' / (scene['id'] + '.comp'), plan['pack']['fingerprint'])
        # Detect a source change that happened between the preflight and copying.
        for relative, sha in manifest['files'].items():
            if digest(safe(staged / 'pack', relative)) != sha: raise ValueError('Source changed during copy')
        if digest(staged / 'pack/manifest.json') != plan['pack']['manifest_sha256']: raise ValueError('Manifest changed during copy')
        files = {p.relative_to(staged).as_posix(): digest(p) for p in sorted(staged.rglob('*')) if p.is_file()}
        write(staged / 'receipt.json', {'schema_version': '1.0', 'batch_id': plan['batch_id'], 'pack': plan['pack'],
              'files': files, 'checks': report, 'compositor': {'format_version': 11, 'native_open': 'not_tested', 'animation': 'external-runtime'}})
        if not verify(staged)['ok']: raise ValueError('Delivery verification failed')
        staged.rename(out)
    return {'ok': True, 'files': len(files), 'scenes': len(plan['scenes']), 'candidate': bool(report['warnings']), 'native_open': 'not_tested'}


def verify(root):
    receipt = read(safe(root, 'receipt.json'))
    files = receipt.get('files')
    if not isinstance(files, dict) or not files: raise ValueError('Invalid receipt')
    errors = []
    for relative, sha in files.items():
        p = safe(root, relative)
        if not isinstance(sha, str) or not HASH.fullmatch(sha) or not p.is_file() or digest(p) != sha:
            errors.append('Missing or changed: ' + relative)
    actual = set()
    for p in root.rglob('*'):
        if p.is_symlink(): raise ValueError('Symlink in delivery')
        if p.is_file(): actual.add(p.relative_to(root).as_posix())
    errors += ['Unlisted: ' + p for p in sorted(actual - set(files) - {'receipt.json'})]
    return {'ok': not errors, 'errors': errors, 'files': len(files), 'native_open': 'not_tested'}


def tasks(plan_path, pack, out):
    plan, manifest, report = inspect(plan_path, pack, True)
    out = new_destination(out, pack)
    with tempfile.TemporaryDirectory(prefix='.tasks-', dir=out.parent) as temp:
        staged = Path(temp) / 'tasks'; staged.mkdir()
        for asset in plan['assets']:
            write(staged / (asset['id'] + '.json'), {'pack': plan['pack'], 'asset': asset,
                  'state': report['asset_states'][asset['id']], 'source_sha256': manifest['files'].get(asset['path']),
                  'instruction': 'Read project rules and actual input images; generate only if missing or revision is requested. No generation has been run by this command.'})
        write(staged / 'index.json', report)
        staged.rename(out)
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=('check', 'tasks', 'build', 'verify'))
    parser.add_argument('source', type=Path)
    parser.add_argument('--pack', type=Path)
    parser.add_argument('--out', type=Path)
    parser.add_argument('--allow-candidate', action='store_true')
    args = parser.parse_args()
    try:
        if args.command == 'verify': result = verify(args.source.resolve())
        else:
            if not args.pack: parser.error('--pack is required')
            if args.command == 'check': result = inspect(args.source, args.pack.resolve(), args.allow_candidate)[2]
            else:
                if not args.out: parser.error('--out is required')
                result = tasks(args.source, args.pack.resolve(), args.out) if args.command == 'tasks' else build(args.source, args.pack.resolve(), args.out, args.allow_candidate)
        print(json.dumps(result, ensure_ascii=True, indent=2)); return 0 if result['ok'] else 1
    except (ValueError, OSError, KeyError, TypeError, ImportError) as exc:
        print(json.dumps({'ok': False, 'error': str(exc)}, ensure_ascii=True)); return 1


if __name__ == '__main__':
    sys.exit(main())
