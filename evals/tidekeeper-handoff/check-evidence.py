"""Check that the public candidate ZIP, recorded evidence and source agree."""
from pathlib import Path
import hashlib,json,zipfile
ROOT=Path(__file__).resolve().parents[2]
source=ROOT/'examples/tidekeeper-handoff'
public=ROOT/'docs/assets/tidekeeper'
record=json.loads((public/'production-records.json').read_text(encoding='utf-8'))
verification=json.loads((ROOT/'evals/tidekeeper-handoff/verification.json').read_text(encoding='utf-8'))
with zipfile.ZipFile(public/'tidekeeper-0.2.1-candidate.zip') as archive:
    assert archive.testzip() is None
    data=json.loads(archive.read('style-pack.json'))
    assert data==json.loads((source/'style-pack.json').read_text(encoding='utf-8'))
    manifest=json.loads(archive.read('manifest.json'))
    assert manifest['pack']['fingerprint']==record['final_pack']['fingerprint']==verification['pack']['fingerprint']
    for item in data['references']:
        assert archive.read(item['path'])==(source/item['path']).read_bytes(),item['path']
    for name in ('ui-kit.js','tide-sans.woff2'):
        assert archive.read('references/'+name)==(public/name).read_bytes(),name
for item in record['final_files']:
    content=(public/item['file']).read_bytes()
    assert len(content)==item['bytes'] and hashlib.sha256(content).hexdigest()==item['sha256'],item['file']
print('PASS: source, public candidate ZIP, UI dependencies, fingerprints and recorded exports agree.')
