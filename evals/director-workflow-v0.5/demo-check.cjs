// Offline source, path and page-function checks; not browser visual QA.
// Private audit vocabulary is supplied only through PUBLIC_DEMO_RESTRICTED_PATTERNS.
'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm'),crypto=require('crypto');
const root=path.resolve(__dirname,'../..');process.chdir(root);
const digest=x=>crypto.createHash('sha256').update(x).digest('hex');
const fileNames=['docs/workbench.html','docs/call-flow.html','docs/member-workbench.html','docs/team-production.html'];
const sources=Object.fromEntries(fileNames.map(file=>[file,fs.readFileSync(file,'utf8')]));
const scriptFor=file=>sources[file].match(/<script>([\s\S]*?)<\/script>/)[1];
const checks=[],allPaths=new Set(),collectedMarkup=[];
function check(name,pass){checks.push({name,pass:Boolean(pass)});if(!pass)process.exitCode=1;}
const policyText=process.env.PUBLIC_DEMO_RESTRICTED_PATTERNS||'[]',restricted=JSON.parse(policyText);
if(!Array.isArray(restricted)||restricted.some(x=>typeof x!=='string'||!x))throw Error('Invalid audit vocabulary.');
const sensitive=text=>restricted.some(x=>text.toLowerCase().includes(x.toLowerCase()));
check('restricted vocabulary supplied without embedding it in public files',restricted.length>0);
function environment(file='workbench.html'){
 const map=new Map(),events={},location={href:'file:///X:/ArtDirectorDemo/docs/'+file,hash:''};
 const get=id=>{if(!map.has(id))map.set(id,{
  id,value:'',innerHTML:'',textContent:'',hidden:false,disabled:false,open:false,checked:false,attrs:{},events:{},dataset:{},style:{},
  setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,v){this.events[k]=v;},focus(){document.activeElement=this;},
  matches(){return true;},closest(){return this;},select(){},remove(){},scrollIntoView(){},
  classList:{add(){},remove(){},toggle(){}}
 });return map.get(id);};
 const buttons=[];
 for(const project of ['game','campaign'])buttons.push({...get('project-'+project),dataset:{project}});
 for(const role of ['director','member'])buttons.push({...get('role-'+role),dataset:{role}});
 const document={activeElement:null,getElementById:get,
  querySelectorAll(selector){if(selector==='[data-project]')return buttons.filter(b=>b.dataset.project);if(selector==='[data-role]')return buttons.filter(b=>b.dataset.role);return[];},
  querySelector(){return get('query-selector');},addEventListener(k,v){events[k]=v;},createElement(){return get('created');},body:{appendChild(){}},execCommand(){return false;}
 };
 const window={location,isSecureContext:false,addEventListener(){},matchMedia(){return{matches:false};}};
 const context={document,window,location,history:{replaceState(_a,_b,hash){location.hash=hash;}},navigator:{},URL,setTimeout(){return 1;},clearTimeout(){}};
 vm.createContext(context);return{context,get,map,events,buttons,value:expression=>vm.runInContext(expression,context)};
}
function collect(html,base='docs/workbench.html'){
 collectedMarkup.push(html);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const target=match[1];if(target.startsWith('#')||target.startsWith('data:')||target.includes('$'+'{'))continue;
  if(/^[a-z]+:/i.test(target))continue;
  const clean=target.split('#')[0].split('?')[0];if(!clean)continue;
  allPaths.add(path.relative(root,path.resolve(root,path.dirname(base),clean)).replaceAll('\\','/'));
 }
}
for(const file of fileNames){
 new vm.Script(scriptFor(file));check(file+': JavaScript parses',true);
 const html=sources[file].split('<script>')[0],ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 check(file+': static IDs unique',new Set(ids).size===ids.length);
 check(file+': no restricted text in visible or hidden data',!sensitive(sources[file]));
 check(file+': no external script, style, or image dependency',!/<(?:script|link|img)\b[^>]+(?:src|href)="https?:\/\//i.test(sources[file]));collect(html,file);
}
const wb=environment();vm.runInContext(scriptFor('docs/workbench.html'),wb.context);
const value=wb.value,get=wb.get;
check('director intake is default; single-task example is secondary',value("state.role==='director'&&state.stage===0&&state.project==='game'")&&sources['docs/workbench.html'].includes('href="member-workbench.html"'));
check('six complete lifecycle stages are represented',value('STAGES.length')===6);
check('first screen includes concrete positioning and gaps',get('stage-content').innerHTML.includes('Agent 整理出的项目定位草案')&&get('stage-content').innerHTML.includes('目标与阅读顺序')&&get('stage-content').innerHTML.includes('会影响下一步的缺口'));
check('initial HTML does not masquerade as a live production app',sources['docs/workbench.html'].includes('按钮不执行审批或生产')&&sources['docs/workbench.html'].includes('页面选项只演示编排'));
check('all six retained candidate boards render',value('GALLERY.length')===6&&(get('gallery').innerHTML.match(/<figure /g)||[]).length===6);
check('gallery keeps independent project boundaries',sources['docs/workbench.html'].includes('每张属于独立项目，不与其他项目自动共享视觉规则'));
get('director-intent').value='';check('empty director decision is not fabricated',!wb.context.draftDecision()&&value('state.intentDraft')===null);
get('director-intent').value='先验证 UI 与棋盘放在一起的阅读层级。';
check('director can form a specific local decision draft',wb.context.draftDecision()&&value("state.intentDraft.includes('阅读层级')"));
get('director-intent').value='<img src=x onerror=alert(1)>';wb.context.draftDecision();
check('director draft text is escaped',get('draft-status').innerHTML.includes('&lt;img')&&!get('draft-status').innerHTML.includes('<img src=x'));
wb.context.goStage(2);check('sample roles are not treated as a universal fixed count',get('stage-content').innerHTML.includes('数量不是跨项目标准'));
value('state.checks=[0,1,2,3,4];state.reviewSeen=true');wb.context.render();
check('all selected review topics still do not grant approval',get('stage-content').innerHTML.includes('结果仍是待评审')&&get('stage-content').innerHTML.includes('勾选不改变任何批准状态'));
wb.context.goStage(3);
check('self-contained five guides and three scripts are described',get('stage-content').innerHTML.includes('00-index.md')&&get('stage-content').innerHTML.includes('04-reference-guide.md')&&get('stage-content').innerHTML.includes('style_pack.py')&&get('stage-content').innerHTML.includes('project_runtime.py')&&get('stage-content').innerHTML.includes('team_batch.py'));
check('receiving a package requires init before workspace start',get('stage-content').innerHTML.includes('init 建立成员工作区')&&get('stage-content').innerHTML.includes('运行 start'));
check('package remains a clearly marked draft',get('stage-content').innerHTML.includes('候选包 · 未正式批准'));
wb.context.switchRole('member');check('member entry reaches production without repeating full setup',value("state.role==='member'&&state.stage===4"));
get('member-request').value='';check('empty member task is rejected',!wb.context.preparePreview()&&value('state.preview')===null);
get('member-request').value='<script>alert(1)</script>做一组按钮';
check('exploration preview is available',wb.context.preparePreview());
check('task preview escapes user text',get('task-preview').innerHTML.includes('&lt;script&gt;')&&!get('task-preview').innerHTML.includes('<script>'));
check('preview freezes project version and family identifier',value("state.preview.version==='0.5.0'&&state.preview.family.includes('match-tiles')"));
value("state.mode='production'");get('member-request').value='正式批量制作棋子';
check('draft production preview is blocked',!wb.context.preparePreview()&&value('state.preview.blocked')&&get('task-preview').innerHTML.includes('正式批量暂不能放行'));
wb.context.chooseFamily('ui');check('changing family clears previous task preview',value('state.preview')===null);
get('member-request').value='保留这条定制任务';
wb.events.click({target:{closest(){return {dataset:{mode:'exploration'}};}}});
check('mode change preserves member task text',value("state.memberDraft==='保留这条定制任务'")&&get('stage-content').innerHTML.includes('保留这条定制任务'));
check('UI state and engineering requirements are visible',get('stage-content').innerHTML.includes('真实文案'));
wb.context.switchProject('campaign');
check('project switch keeps role but clears decisions and previews',value("state.project==='campaign'&&state.role==='member'&&state.stage===4&&state.preview===null&&state.intentDraft===null"));
check('campaign can select independent UI family',wb.context.chooseFamily('ui')&&value("family().familyId==='action-controls'"));
wb.context.goStage(0);
check('campaign does not invent product imagery or facts',get('stage-content').innerHTML.includes('商品身份母版待提供')&&!get('stage-content').innerHTML.includes('<img')&&get('stage-content').innerHTML.includes('真实价格'));
check('unknown project selection cannot mutate state',!wb.context.switchProject('missing')&&value("state.project==='campaign'"));
wb.context.goStage(5);get('benefit').value='';get('feasibility').value='';get('adoption').value='';
check('incomplete creative adoption remains undecided',!wb.context.draftProposal()&&value('state.proposal')===null);
get('benefit').value='candidate';get('feasibility').value='limited';get('adoption').value='family';
check('complete choices form a proposal, not approval',wb.context.draftProposal()&&value("state.proposal.status==='proposal_preview'&&current().version==='0.5.0'")&&get('proposal-result').innerHTML.includes('没有写入审批或发布记录'));
get('issue-kind').value='version';wb.events.change({target:get('issue-kind')});
check('quality issue selection updates remediation',value("state.issue==='version'")&&get('issue-detail').innerHTML.includes('新任务读取已启用版本'));
check('unknown checks and actual team metrics remain unresolved',get('stage-content').innerHTML.includes('待实测')&&get('stage-content').innerHTML.includes('0</b><span>本例正式资产交付'));
wb.context.goStage(0);let prevented=false;get('stage-tabs').events.keydown({key:'End',preventDefault(){prevented=true;}});
check('keyboard End navigates to last lifecycle stage',prevented&&value('state.stage')===5);
get('stage-tabs').events.keydown({key:'Home',preventDefault(){}});check('keyboard Home returns to intake',value('state.stage')===0);
get('stage-tabs').events.keydown({key:'ArrowLeft',preventDefault(){}});check('keyboard tab navigation wraps',value('state.stage')===5);
get('reset-demo').events.click();
check('reset restores director-first state without persistent storage',value("state.project==='game'&&state.stage===0&&state.family==='tile'&&state.proposal===null")&&!/fetch\(|XMLHttpRequest|localStorage|sessionStorage/.test(scriptFor('docs/workbench.html')));
check('reduced motion and narrow viewport rules exist',sources['docs/workbench.html'].includes('prefers-reduced-motion:reduce')&&sources['docs/workbench.html'].includes('@media(max-width:640px)'));
for(const project of ['game','campaign']){
 wb.context.switchProject(project);
 const source=JSON.parse(fs.readFileSync(project==='game'?'examples/harbor-studio-draft/style-pack.json':'examples/campaign-studio-draft/style-pack.json','utf8')),model=value('current()');
 check(project+': displayed family identifiers match actual project',source.direction.families.length===model.families.length&&source.direction.families.every(f=>model.families.some(item=>item.id===f.category&&item.familyId===f.id)));
 check(project+': displayed sample responsibilities match actual project',source.direction.exemplars.length===model.samples.length&&source.direction.exemplars.every(e=>model.samples.some(item=>item[0]===e.name&&item[1]===e.purpose)));
 for(let stage=0;stage<6;stage++){
  wb.context.goStage(stage);check(project+': stage '+(stage+1)+' renders substantial content',get('stage-content').innerHTML.length>1000);
  for(const pair of value('stageFiles()'))allPaths.add(pair[1]);collect(get('stage-content').innerHTML);collect(get('stage-paths').innerHTML);
  if(stage===1||stage===4)for(const f of model.families){wb.context.chooseFamily(f.id);collect(get('stage-content').innerHTML);collect(get('stage-paths').innerHTML);}
 }
 for(const pair of model.files)allPaths.add(pair[1]);if(model.board)allPaths.add(model.board);
}
collect(get('gallery').innerHTML);
const relocated=environment();relocated.context.window.location.href='file:///D:/Moved%20Studio/docs/workbench.html';vm.runInContext(scriptFor('docs/workbench.html'),relocated.context);
check('full paths follow relocated offline package',relocated.value('ROOT')==='D:\\Moved Studio');
const flow=environment('call-flow.html');vm.runInContext(scriptFor('docs/call-flow.html'),flow.context);
check('call map starts with professional director intake',flow.value("currentView==='director'&&selected==='d1'"));
check('call map lead describes director system building, not outfit play',sources['docs/call-flow.html'].includes('主美建体系，成员按体系生产。')&&!sources['docs/call-flow.html'].split('<script>')[0].includes('换装'));
const nodes=flow.value('nodes'),views=flow.value('views');
check('all call map transitions resolve',Object.values(nodes).every(n=>nodes[n.next]&&(!n.nextView||views[n.nextView])));
check('call map preserves director/member/team/campaign paths',Object.keys(views).sort().join(',')==='campaign,director,production,team');
check('call map director covers family and sample gates',nodes.d3.title.includes('家族')&&nodes.d4.title.includes('样板')&&nodes.d5.output.includes('分发'));
check('call map uses family CLI and portable init semantics',nodes.d3.command.includes('--family FAMILY_ID')&&nodes.d6.command.includes('init --pack .'));
check('call map production expands beyond outfit tasks',nodes.p2.files.some(f=>f.path.includes('game-ui-first'))&&nodes.p4.files.some(f=>f.path.includes('game-character-first'))&&nodes.p5.files.some(f=>f.path.includes('game-motion-first')));
for(const [id,node] of Object.entries(nodes)){flow.context.selectNode(id,false);collect(flow.get('detail-body').innerHTML,'docs/call-flow.html');node.files.forEach(f=>allPaths.add(f.path));}
for(const view of Object.keys(views)){flow.context.renderView(view,undefined,false);collect(flow.get('route-extras').innerHTML,'docs/call-flow.html');}
check('path inspector opens actual artifacts',flow.get('detail-body').innerHTML.includes('href="../'));
check('retained member page identifies itself as a secondary example',sources['docs/member-workbench.html'].includes('这是单件任务与探索的补充示例')&&sources['docs/member-workbench.html'].includes('打开主美建项与团队流水线'));
const member=environment('member-workbench.html');vm.runInContext(scriptFor('docs/member-workbench.html'),member.context);
check('retained single-task page still initializes its public example',member.value("state.scene==='mira'&&state.role==='member'"));
member.context.switchScene('campaign');check('retained single-task page can still switch to campaign',member.value("state.scene==='campaign'"));
for(const list of Object.values(member.value('DATA.paths')))for(const pair of list)allPaths.add(pair[1]);allPaths.add(member.value('REFERENCE_BOARD'));

const team={};vm.createContext(team);const teamScript=scriptFor('docs/team-production.html');
vm.runInContext(teamScript.slice(0,teamScript.indexOf('const esc='))+';globalThis.model={DATA,SCENES,DURATION};',team);
check('original team animation keeps seven lines and fifty planned assets',team.model.DATA.lanes.length===7&&team.model.DATA.lanes.reduce((n,x)=>n+x.count,0)===50);
check('team animation still reports zero actual art deliveries',team.model.DATA.evidence.actualDeliveries===0);
team.model.DATA.files.forEach(pair=>allPaths.add(pair[1]));allPaths.add(team.model.DATA.referenceBoard);team.model.SCENES.forEach(scene=>allPaths.add(scene.file));
const manifest=JSON.parse(fs.readFileSync('docs/assets/public-gallery/manifest.json','utf8'));
check('six gallery files preserve verified original bytes and dimensions',manifest.items.length===6&&manifest.items.every(item=>{const data=fs.readFileSync(item.path);allPaths.add(item.path);return digest(data)===item.sha256&&data.readUInt32BE(16)===item.width&&data.readUInt32BE(20)===item.height;}));
check('all rendered content remains free of restricted tokens',collectedMarkup.every(text=>!sensitive(text)));
const allowed=['references/','scripts/','templates/','docs/assets/public-gallery/','examples/harbor-studio-draft/','examples/harbor-studio-workspace/','examples/campaign-studio-draft/','examples/campaign-studio-workspace/','examples/pop-borough-draft/','examples/moss-harbor-draft/','examples/mira-public-draft/','examples/mira-public-workspace/','examples/campaign-kit-draft/','examples/campaign-public-workspace/','evals/public-demo/','evals/team-production/','evals/director-workflow-v0.5/'];
const allowedExact=new Set([...fileNames,'SKILL.md','docs/director-workflow-v0.5.md','docs/requirements-coverage.md','docs/team-production-storyboard.md']);
const pathChecks=[...allPaths].sort().map(file=>({path:file,allowed:!file.includes('..')&&!path.isAbsolute(file)&&(allowedExact.has(file)||allowed.some(prefix=>file.startsWith(prefix))),exists:fs.existsSync(path.resolve(root,file))}));
check('all linked artifacts stay inside public source roots',pathChecks.every(x=>x.allowed));
check('all linked artifacts actually exist',pathChecks.every(x=>x.exists));
check('linked path names have no restricted case tokens',pathChecks.every(x=>!sensitive(x.path)));
const readable=pathChecks.filter(x=>x.exists&&/\.(md|json|py|cjs)$/.test(x.path));
check('linked text files have no restricted case tokens',readable.every(x=>!sensitive(fs.readFileSync(x.path,'utf8'))));
const report={
 schema_version:'1.0',checked_at:new Date().toISOString(),command:'node evals/director-workflow-v0.5/demo-check.cjs',
 script:{path:'evals/director-workflow-v0.5/demo-check.cjs',sha256:digest(fs.readFileSync(__filename))},
 checked_files:fileNames.map(file=>({path:file,sha256:digest(fs.readFileSync(file)),bytes:fs.statSync(file).size})),
 result:{passed:checks.filter(x=>x.pass).length,failed:checks.filter(x=>!x.pass).length,total:checks.length,paths:pathChecks.length,missing:pathChecks.filter(x=>!x.exists).length},
 checks,public_paths:pathChecks,restricted_scan:{performed:restricted.length>0,policy_sha256:digest(policyText),source:'Ephemeral process environment; vocabulary excluded from this public report.'},
 method:'Static HTML/JavaScript, actual page functions and selected event handlers in Node VM with minimal DOM mock.',
 browser_visual_validation:{performed:false,reason:'Prior browser URL policy prevented access. No browser retry or alternate route was used.'},
 limitations:['No rendered pixel or responsive visual acceptance.','No full browser event/accessibility or clipboard permission audit.','No real artwork generation, design-software operation, approval or team effectiveness claim.']
};
fs.writeFileSync(path.join(__dirname,'demo-check.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({report:'evals/director-workflow-v0.5/demo-check.json',...report.result,failed:checks.filter(x=>!x.pass).map(x=>x.name),missing:pathChecks.filter(x=>!x.exists).map(x=>x.path)},null,2));
