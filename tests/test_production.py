import copy
import importlib.util
import json
from pathlib import Path
import shutil
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('production', ROOT / 'skills/game-art-production/scripts/production.py')
prod = importlib.util.module_from_spec(spec); spec.loader.exec_module(prod)
try:
    from PIL import Image
except ImportError:
    Image = None


class ProductionTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='.tmp-style-pack-production-', dir=ROOT / 'tests')
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name); self.pack = self.root / 'pack'; self.pack.mkdir()
        (self.pack / 'references').mkdir()
        prod.write(self.pack / 'style-pack.json', {'rules': [{'id': 'FORM'}]})
        self.image = self.pack / 'references/art.png'
        if Image: Image.new('RGBA', (10, 12), (20, 100, 130, 0)).save(self.image)
        else: self.image.write_bytes(b'fixture')
        prod.write(self.pack / 'manifest.json', {'pack': {'id': 'test', 'version': '0.1', 'fingerprint': 'a'*64},
                  'files': {p.relative_to(self.pack).as_posix(): prod.digest(p) for p in self.pack.rglob('*') if p.is_file()}})
        manifest = prod.read(self.pack / 'manifest.json')
        self.plan = {'schema_version': '1.0', 'batch_id': 'test-batch', 'pack': {**manifest['pack'], 'manifest_sha256': prod.digest(self.pack / 'manifest.json')},
                     'assets': [{'id': 'art', 'path': 'references/art.png', 'kind': 'image', 'status': 'candidate', 'depends_on': [], 'pixels': [10,12], 'alpha': True, 'task': {'rules': ['FORM']}}],
                     'scenes': [{'id': 'day', 'width': 100, 'height': 120, 'layers': [{'id': 'background', 'asset': 'art', 'box': [2,3,50,60]}]}]}
        self.path = self.root / 'plan.json'; self.save()

    def save(self): prod.write(self.path, self.plan)
    def check(self, allow=True): self.save(); return prod.inspect(self.path, self.pack, allow)[2]

    def test_candidate_is_explicit(self):
        self.assertFalse(self.check(False)['ok']); self.assertTrue(self.check()['ok'])
        self.assertEqual(self.check()['native_compositor_open'], 'not_tested')

    def test_hash_drift_and_dependent_tasks(self):
        self.plan['assets'].append({'id': 'next', 'path': 'style-pack.json', 'kind': 'record', 'status': 'candidate', 'depends_on': ['art']})
        self.image.write_bytes(b'changed')
        report = self.check(); self.assertFalse(report['ok']); self.assertEqual(report['asset_states']['art'], 'changed'); self.assertEqual(report['asset_states']['next'], 'blocked-by-input')
        result = prod.tasks(self.path, self.pack, self.root / 'tasks'); self.assertFalse(result['ok']); self.assertTrue((self.root / 'tasks/art.json').exists())

    def test_missing_asset_is_visible(self):
        self.image.unlink(); self.assertEqual(self.check()['asset_states']['art'], 'missing')

    def test_new_manifest_cannot_silently_rebase(self):
        m=prod.read(self.pack/'manifest.json');m['pack']['version']='0.2';prod.write(self.pack/'manifest.json',m)
        self.assertFalse(self.check()['ok'])

    def test_rejected_and_approval_evidence(self):
        for status in ('rejected', 'approved'):
            self.plan['assets'][0]['status']=status;self.assertFalse(self.check()['ok'])

    def test_duplicate_cycle_and_dangling_dependency(self):
        base=copy.deepcopy(self.plan)
        for dep in ('art','missing'):
            self.plan=copy.deepcopy(base);self.plan['assets'][0]['depends_on']=[dep]
            with self.assertRaises(ValueError):self.check()
        self.plan=base;self.plan['assets'].append(copy.deepcopy(self.plan['assets'][0]))
        with self.assertRaises(ValueError):self.check()

    def test_unsafe_paths_and_scene_ids(self):
        for path in ('../secret.png','C:/secret.png','/secret','references\\art.png','references/../art.png'):
            with self.assertRaises(ValueError):prod.safe(self.pack,path)
        self.plan['scenes'][0]['id']='../escape'
        with self.assertRaises(ValueError):self.check()

    def test_unknown_rules_and_unlisted_input(self):
        self.plan['assets'][0]['task']['rules']=['invented'];self.assertFalse(self.check()['ok'])
        self.plan['assets'][0]['task']['rules']=['FORM'];(self.pack/'surprise.txt').write_text('extra');self.assertFalse(self.check()['ok'])

    def test_limits_and_nonfinite_coordinates(self):
        for box in ([0,0,0,1],[0,0,30001,1],[0,0,float('nan'),1]):
            self.plan['scenes'][0]['layers'][0]['box']=box
            with self.assertRaises(ValueError):self.check()

    @unittest.skipUnless(Image, 'Pillow required for export')
    def test_portable_deterministic_compositor_delivery(self):
        first=self.root/'delivery';second=self.root/'again'
        self.assertTrue(prod.build(self.path,self.pack,first,True)['ok']);prod.build(self.path,self.pack,second,True)
        self.assertEqual(prod.read(first/'receipt.json')['files'],prod.read(second/'receipt.json')['files'])
        comp=first/'compositor/day.comp';m=prod.read(comp/'manifest.json');self.assertEqual(m['format'],'com.compositor.project');self.assertEqual(m['layers'][0]['transform']['origin'],[2,3])
        layer=m['layers'][0];self.assertEqual(layer['imageFile'],layer['id']+'.png');self.assertEqual(layer['id'],layer['id'].upper())
        with Image.open(comp/'images'/layer['imageFile']) as im:self.assertEqual(im.mode,'RGBA')
        moved=self.root/'received';shutil.move(str(first),moved);self.assertTrue(prod.verify(moved)['ok'])
        (moved/'compositor/day.comp/images'/layer['imageFile']).write_bytes(b'changed');self.assertFalse(prod.verify(moved)['ok'])

    @unittest.skipUnless(Image, 'Pillow required for export')
    def test_invalid_dimensions_and_alpha_leave_no_output(self):
        self.plan['assets'][0]['pixels']=[20,12];self.save()
        with self.assertRaises(ValueError):prod.build(self.path,self.pack,self.root/'bad',True)
        self.assertFalse((self.root/'bad').exists())
        self.plan['assets'][0]['pixels']=[10,12];self.save()
        Image.new('RGB',(10,12)).save(self.image)
        m=prod.read(self.pack/'manifest.json');m['files']['references/art.png']=prod.digest(self.image);prod.write(self.pack/'manifest.json',m);self.plan['pack']['manifest_sha256']=prod.digest(self.pack/'manifest.json');self.save()
        with self.assertRaises(ValueError):prod.build(self.path,self.pack,self.root/'bad',True)
        self.assertFalse((self.root/'bad').exists())

    @unittest.skipUnless(Image, 'Pillow required for export')
    def test_existing_output_preserved(self):
        out=self.root/'keep';out.mkdir();(out/'work.txt').write_text('user work')
        with self.assertRaises(ValueError):prod.build(self.path,self.pack,out,True)
        self.assertEqual((out/'work.txt').read_text(),'user work')


if __name__ == '__main__': unittest.main()
