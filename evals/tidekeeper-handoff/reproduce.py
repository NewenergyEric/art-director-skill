"""Reproduce the portable-pack and task checks; does not generate or approve art."""
from pathlib import Path
import argparse, hashlib, json, shutil, subprocess, sys, zipfile
ROOT=Path(__file__).resolve().parents[2]

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out',type=Path,required=True)
    args=parser.parse_args();out=args.out.resolve()
    if out.exists():parser.error('Use a new output directory.')
    out.mkdir(parents=True);log=[]
    def run(script,*items,fail=False):
        p=subprocess.run([sys.executable,str(script),*map(str,items)],cwd=out,capture_output=True,text=True,encoding='utf-8')
        data=json.loads(p.stdout)
        assert (p.returncode!=0 if fail else p.returncode==0),(p.returncode,data)
        log.append({'tool':Path(script).name,'operation':str(items[0]),'exit_code':p.returncode,'expected_failure':fail,'ok':data.get('ok'),'error_codes':[x['code'] for x in data.get('errors',[])]})
        return data
    source=ROOT/'examples/tidekeeper-handoff';built=out/'built';received=out/'received';workspace=out/'member'
    run(ROOT/'scripts/style_pack.py','build',source,'--out',built)
    archive=out/'tidekeeper-0.2.1-candidate.zip'
    run(built/'scripts/style_pack.py','archive',built,'--out',archive)
    received.mkdir()
    with zipfile.ZipFile(archive) as z:z.extractall(received)
    run(received/'scripts/style_pack.py','verify',received)
    run(received/'scripts/project_runtime.py','init','--pack',received,'--out',workspace,'--allow-draft')
    request={'schema_version':'1.0','task_id':'TK-UI-RECHECK','category':'ui','family':'orders','subject':None,'request':'沿用新版游戏资产与竖屏规范，重查缺件、合成、交付、解锁和地图组合。','mode':'exploration','changes':{'order':'第一盏归航灯 / L4；木料 / W2','state':'缺件、可提交、交付与修复'},'exploration':{'slots':['order','state'],'candidates':1},'owner':{'id':'agent-member-self-test','kind':'internal'},'components':[{'category':'character','subject':'阿澜','family':'dialogue'},{'category':'environment','subject':'旧灯房','family':'workshop'},{'category':'prop','subject':None,'family':'light-chain'}]}
    request_path=workspace/'requests/TK-UI-RECHECK.json';request_path.write_text(json.dumps(request,ensure_ascii=False,indent=2),encoding='utf-8')
    run(workspace/'tools/project_runtime.py','start',workspace,'--request',request_path)
    guide=(received/'guides/03-delivery-review.md').read_text(encoding='utf-8')
    assert all(s in guide for s in ('裁切安全区','资源图标','实际新输出','交接自测'))
    rejected=run(received/'scripts/style_pack.py','build',received,'--out',out/'invalid-release','--release',fail=True)
    assert any(e['code'] in ('release_requirement','required_exemplar') for e in rejected['errors'])
    tampered=out/'tampered';shutil.copytree(received,tampered)
    with (tampered/'references/ui-kit.js').open('a',encoding='utf-8') as f:f.write('\n// tampered dependency\n')
    invalid=run(tampered/'scripts/style_pack.py','verify',tampered,fail=True)
    assert invalid.get('ok') is False
    manifest=json.loads((received/'manifest.json').read_text(encoding='utf-8'))
    result={'method':'One agent, relocated-directory self-test; no image generation and no human approval in this checker.','pack':manifest['pack'],'archive_sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'portable_review_method':True,'operations':log}
    (out/'verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'ok':True,'operations':len(log),'fingerprint':manifest['pack']['fingerprint']},ensure_ascii=True))
if __name__=='__main__':main()
