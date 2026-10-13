"""Build from the received project, export layers, relocate and verify actual files."""
from pathlib import Path
import argparse, hashlib, importlib.util, json, shutil, subprocess, sys, zipfile
from PIL import Image

ROOT=Path(__file__).resolve().parents[2]


def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--out',type=Path,required=True);a=p.parse_args();out=a.out.resolve()
    if out.exists():p.error('Choose a new output directory')
    out.mkdir(parents=True)
    def run(script,*args,fail=False):
        result=subprocess.run([sys.executable,str(script),*map(str,args)],cwd=out,capture_output=True,text=True,encoding='utf-8')
        data=json.loads(result.stdout)
        if (result.returncode==0)==fail:raise AssertionError(data)
        return data
    pack=out/'pack'
    run(ROOT/'scripts/style_pack.py','build',ROOT/'examples/tidekeeper-production','--out',pack)
    archive=out/'tidekeeper-0.3.0-candidate.zip'
    run(pack/'scripts/style_pack.py','archive',pack,'--out',archive)
    received=out/'received';received.mkdir()
    with zipfile.ZipFile(archive) as z:z.extractall(received)
    run(received/'scripts/style_pack.py','verify',received)
    motion=run(received/'scripts/style_pack.py','brief',received,'--category','motion','--task','Continue the repair, lighting and arrival effects from this pack.')
    assert {'TK-STATE','TK-ACTION','TK-FX'}.issubset({rule['id'] for rule in motion['rules']})
    tool=ROOT/'skills/game-art-production/scripts/production.py';plan=ROOT/'examples/tidekeeper-production/production-plan.json'
    run(tool,'check',plan,'--pack',received,fail=True)
    checked=run(tool,'check',plan,'--pack',received,'--allow-candidate')
    run(tool,'tasks',plan,'--pack',received,'--out',out/'tasks')
    built=run(tool,'build',plan,'--pack',received,'--out',out/'delivery','--allow-candidate')
    moved=out/'relocated';shutil.move(str(out/'delivery'),moved)
    run(tool,'verify',moved)
    recipes=json.loads((moved/'scene-recipes.json').read_text(encoding='utf-8'))
    exports=[]
    for scene in recipes['scenes']:
        folder=moved/'compositor'/(scene['id']+'.comp');manifest=json.loads((folder/'manifest.json').read_text(encoding='utf-8'))
        assert manifest['format']=='com.compositor.project' and manifest['version']==11
        assert (manifest['width'],manifest['height'])==(scene['width'],scene['height'])
        assert [x['name'] for x in manifest['layers']]==[x['id'] for x in scene['layers']]
        for recipe,layer in zip(scene['layers'],manifest['layers']):
            assert layer['imageFile']==layer['id']+'.png' and layer['id']==layer['id'].upper()
            assert layer['transform']['origin']==recipe['box'][:2] and layer['transform']['size']==recipe['box'][2:]
            with Image.open(folder/'images'/layer['imageFile']) as im:assert im.mode=='RGBA';im.verify()
        exports.append({'scene':scene['id'],'layers':len(manifest['layers']),'rgba8':True,'recipe_placement':True})
    result={'method':'One-agent self-test, rebuilt and relocated received pack; file/schema and actual PNG decoding, not native Mac acceptance.',
            'pack':checked['pack'],'assets':len(checked['order']),'exports':exports,'files':built['files'],
            'director_approval':'pending','native_compositor_open':'not_tested','engine_and_device':'not_tested'}
    (out/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    with zipfile.ZipFile(out/'tidekeeper-production-0.3.0.zip','x',zipfile.ZIP_DEFLATED) as z:
        for source in sorted(moved.rglob('*')):
            if source.is_file():
                info=zipfile.ZipInfo(source.relative_to(moved).as_posix(),date_time=(1980,1,1,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;info.external_attr=0o100644<<16;z.writestr(info,source.read_bytes())
    # A modified layer must fail after relocation; original delivery stays intact.
    broken=out/'changed';shutil.copytree(moved,broken);next((broken/'compositor').rglob('*.png')).write_bytes(b'changed')
    run(tool,'verify',broken,fail=True)
    print(json.dumps({'ok':True,'assets':result['assets'],'scene_exports':len(exports),'files':built['files']}))


if __name__=='__main__':main()
