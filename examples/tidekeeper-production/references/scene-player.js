/* Tidekeeper 0.3 — shared state/recipe for browser and frame-driven film.
   Original candidate art. Cutout poses, not skeletal animation. */
import {uiCss, gameMarkup, createState, act} from './ui-kit.js';

const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>{v=clamp(v);return v*v*(3-2*v);};
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const durations={repairing:2600,lighting:2800,arriving:3800};
export const phaseNames={ruined:'旧灯房',repairing:'修缮栈桥',day:'重新开门',lighting:'点亮归航灯',dusk:'灯光就位',arriving:'第一艘归船',complete:'欢迎回家'};
export function createProductionState(){return {...createState(),phase:'ruined',rewarded:false,sceneTime:0};}
export function productionAct(state,action,value){
  if(action==='reset')return createProductionState();
  if(action==='finish'){
    if(!durations[state.phase])return state;
    return {...state,phase:{repairing:'day',lighting:'dusk',arriving:'complete'}[state.phase],sceneTime:0};
  }
  if(action==='light')return state.phase==='day'&&state.done?{...state,phase:'lighting',sceneTime:0,map:true}:state;
  if(action==='sail')return state.phase==='dusk'?{...state,phase:'arriving',sceneTime:0,map:true}:state;
  if(action==='claim')return state.phase==='complete'&&!state.rewarded?{...state,rewarded:true,coins:state.coins+50,notice:'归航礼物 +50 贝壳金币'}:state;
  const next=act(state,action,value);
  if(action==='repair'&&!state.repairDone&&next.repairDone)return {...next,phase:'repairing',map:true,sceneTime:0};
  if(action==='deliver'&&!state.done&&next.done&&state.phase==='day')return {...next,phase:'lighting',map:true,sceneTime:0};
  return next;
}

export const productionCss=uiCss+`
.tp-map{position:absolute;inset:0;z-index:6;background:#259caf;overflow:hidden;color:#fff4d8}.tp-canvas{position:absolute;width:900px;height:1600px;transform:scale(.4333333333);transform-origin:top left}.tp-layer{position:absolute;object-fit:fill;pointer-events:none}.tp-shade{position:absolute;inset:0;background:linear-gradient(#13454c55,transparent 22%,transparent 70%,#123e51);pointer-events:none}.tp-map .tk-close{z-index:3}.tp-title{position:absolute;right:16px;top:20px;text-align:right;text-shadow:0 2px 2px #143d4e;font-weight:900;font-size:20px}.tp-title small{display:block;font-size:10px;letter-spacing:2px;opacity:.86;margin-top:3px}.tp-chapter{position:absolute;left:18px;right:18px;bottom:213px;display:flex;gap:7px;align-items:center}.tp-chapter span{flex:1;border-radius:8px;background:#143d4a80;padding:6px 0;text-align:center;font-size:11px;font-weight:800;border:1px solid #d7eee533}.tp-chapter .current{background:#ffe2a2;color:#476653;border-color:#fff8d9;box-shadow:0 2px #826849}.tp-card{position:absolute;left:14px;right:14px;bottom:30px;min-height:169px;border:3px solid #fffbdf;border-radius:21px;background:linear-gradient(#fff9e6,#eedeaf);box-shadow:0 5px #798260,0 9px 16px #163f4d44;color:#355c5a;padding:16px 17px 16px 105px}.tp-card .portrait{position:absolute;width:115px;height:172px;object-fit:contain;left:-8px;bottom:8px;filter:drop-shadow(0 3px 1px #856e3430)}.tp-card h2{font-size:19px;margin:0 0 8px;color:#346c64}.tp-card p{font-size:12px;line-height:1.55;margin:0 0 13px;min-height:38px}.tp-card .tk-action{height:34px;font-size:14px}.tp-progress{height:8px;margin:8px 0 11px;border-radius:10px;background:#b8cbb1;overflow:hidden}.tp-progress i{display:block;height:100%;background:linear-gradient(90deg,#77bd77,#edc254);border-radius:10px}.tp-skip{border:0;background:transparent;color:#536e62;font-size:11px;text-decoration:underline;margin-top:8px;padding:3px}.tp-light{position:absolute;border-radius:50%;background:radial-gradient(ellipse,#ffe7a19c,transparent 70%);mix-blend-mode:screen;pointer-events:none}.tp-fx{position:absolute;inset:0;width:900px;height:1600px;pointer-events:none}.tp-credit{position:absolute;bottom:8px;left:0;right:0;text-align:center;font-size:9px;opacity:.8}.tp-reward{position:absolute;left:118px;top:160px;display:flex;align-items:center;gap:6px;color:#fff6ca;font-size:29px;font-weight:900;text-shadow:0 3px #37655e}.tp-reward img{width:51px;height:51px}.tp-map button:disabled{opacity:.76}
@media(prefers-reduced-motion:reduce){.tp-layer{will-change:auto}}
`;

function effectMarkup(phase,t,boatBox=[70,990]){
  const repair=phase==='repairing',lit=['lighting','dusk','arriving','complete'].includes(phase),sailing=phase==='arriving',arrived=phase==='complete';
  let fx='';
  if(repair){const cycle=(t%650)/650;fx+=Array.from({length:8},(_,i)=>{const a=i*2.4;return `<ellipse cx="${443+Math.cos(a)*cycle*70}" cy="${849-60*cycle+Math.sin(a)*20}" rx="${8+cycle*16}" ry="${5+cycle*9}" fill="${i%2?'#f4dbad':'#c69f77'}" opacity="${.6*(1-cycle)}"/>`;}).join('');}
  if(sailing||arrived){const k=sailing?ease(t/durations.arriving):1,x=-390+(boatBox[0]+390)*k,y=1450+(boatBox[1]-1450)*k;fx+=`<g transform="translate(${x+220} ${y+170}) rotate(22)" opacity="${sailing?.65:.35}"><ellipse rx="170" ry="38" fill="#7bddd966"/><path d="M-165 0Q-140 43 35 48M-150 18Q-100 66 45 62" fill="none" stroke="#dbf9de" stroke-width="6"/></g>`;}
  if(lit)for(let i=0;i<9;i++){const y=1255+(i%3)*74,x=80+(i*137)%750;fx+=`<path d="M${x} ${y}h${12+(i%3)*10}" stroke="#cff5d4" stroke-width="3" stroke-linecap="round" opacity="${.16+.2*(.5+.5*Math.sin(t/700+i))}"/>`;}
  return `<svg class="tp-fx" viewBox="0 0 900 1600" aria-hidden="true">${fx}</svg>`;
}

export function sceneMarkup(state,recipe,base='',time=state.sceneTime||0){
  const phase=state.phase, key={ruined:'ruined',repairing:'repair',day:'day',lighting:'dusk',dusk:'dusk',arriving:'arrival',complete:'arrival'}[phase];
  const current=recipe.scenes.find(s=>s.id===key),prev=recipe.scenes.find(s=>s.id==='day');
  const assetUrl=id=>base+recipe.assets[id].path.split('/').pop();
  const render=(layer)=>{
    let [x,y,w,h]=layer.box,alpha=layer.opacity??1,rotation=layer.rotation??0;
    if(layer.id==='boat'&&phase==='arriving'){const k=ease(time/durations.arriving);x=-390+(x+390)*k;y=1450+(y-1450)*k;}
    if(layer.id==='alan'&&phase==='repairing'){const hit=Math.sin(time/650*Math.PI*2);y+=Math.max(0,hit)*6;rotation+=Math.max(0,hit)*1.2;}
    if(layer.id==='background'&&phase==='lighting')alpha=ease(time/durations.lighting);
    return `<img class="tp-layer" data-layer="${esc(layer.id)}" src="${esc(assetUrl(layer.asset))}" alt="" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;opacity:${alpha};transform:rotate(${rotation}deg) scale(${layer.flipX?-1:1},${layer.flipY?-1:1})">`;
  };
  let art=phase==='lighting'?render({...prev.layers[0],id:'day-underlay'}):'';
  // The wake is below the boat; dust is over the contact point.
  for(const layer of current.layers){if(layer.id==='boat')art+=effectMarkup(phase,time,layer.box);art+=render(layer);}
  if(!current.layers.some(l=>l.id==='boat'))art+=effectMarkup(phase,time);
  if(['lighting','dusk','arriving','complete'].includes(phase))art+=`<div class="tp-light" style="left:464px;top:447px;width:175px;height:170px;opacity:${phase==='lighting'?ease(time/1800):.65}"></div>`;
  return `<div class="tp-canvas" aria-label="${phaseNames[phase]}">${art}</div>`;
}

export function productionMarkup(state,recipe,base='',time=0){
  const board=gameMarkup({...state,map:false},base);
  if(!state.map)return board;
  const busy=!!durations[state.phase],canLight=state.phase==='day'&&state.done;
  const details={ruined:['先把栈桥修好吧。','奈莉需要一捆木料。合成棋盘上的木板，交付后一起动手。','去做木料订单','board'],repairing:['一块一块，修好它。','阿澜正在补上旧木板。原来的灯房和栈桥，慢慢回到生活里。','修缮中…','finish'],day:['小镇，重新开门。',state.done?'归航灯已经送到，让夜晚也有光。':'栈桥修好了。再合出一盏 L4 归航灯，让船找到回家的路。',canLight?'点亮归航灯':'去做灯具订单',canLight?'light':'board'],lighting:['把第一束光点亮。','窗里亮起暖光，海面渐暗。有人会循着这束光回来。','点灯中…','finish'],dusk:['灯光就位，等你归来。','向海面举起灯，叫回第一艘补给船。','招呼归船','sail'],arriving:['看，船回来了！','船上带着新木料和灯油。今晚的灯房，又有热闹的故事了。','正在靠岸…','finish'],complete:['欢迎回家。',state.rewarded?'新的材料，下次再继续。小镇记得每一次修缮。':'木料、灯光与归航，连成了小镇的第一段故事。',state.rewarded?'继续合成':'领取归航礼物 +50',state.rewarded?'board':'claim']}[state.phase];
  const chapter=['ruined','repairing'].includes(state.phase)?0:['day','lighting'].includes(state.phase)?1:2;
  const map=`<section class="tp-map" aria-label="小镇修缮故事">${sceneMarkup(state,recipe,base,time)}<div class="tp-shade"></div><button class="tk-close" data-action="board">← 合成</button><div class="tp-title">潮灯小镇<small>THE FIRST LIGHT</small></div><div class="tp-chapter">${['修缮栈桥','点亮灯房','归船靠岸'].map((n,i)=>`<span class="${i===chapter?'current':''}">${i<chapter?'✓ ':''}${n}</span>`).join('')}</div><div class="tp-card"><img class="portrait" src="${base}character-${state.phase==='ruined'?'base':'signal'}.png" alt="阿澜"><h2>${details[0]}</h2><p aria-live="polite">${details[1]}</p>${busy?`<div class="tp-progress" role="progressbar" aria-label="${phaseNames[state.phase]}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(clamp(time/durations[state.phase])*100)}"><i style="width:${clamp(time/durations[state.phase])*100}%"></i></div>`:''}<button class="tk-action" data-action="${details[3]}" ${busy?'disabled':''}>${details[2]}</button>${busy?'<button class="tp-skip" data-action="finish">跳过这段动作</button>':''}</div>${state.rewarded?`<div class="tp-reward"><img src="${base}coin.png" alt="贝壳金币">+50</div>`:''}<div class="tp-credit">原创候选 · 姿势插演与事件效果 · 非上线游戏</div></section>`;
  const opening=board.indexOf('>')+1;
  return board.slice(0,opening)+'<div inert aria-hidden="true">'+board.slice(opening,-10)+'</div>'+map+'</section>';
}

export function mountProduction(root,recipe,options={}){
  let state=createProductionState(),down=null,suppressClick=false,raf=0,last=performance.now(),disposed=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const draw=()=>{const focused=root.contains(document.activeElement),previous=document.activeElement?.dataset?.action,cell=document.activeElement?.dataset?.cell;root.innerHTML=productionMarkup(state,recipe,options.base||'',state.sceneTime);if(focused){const active=[...root.querySelectorAll('button:not([disabled])')].find(b=>!b.closest('[inert]')&&(previous!==undefined?b.dataset.action===previous:cell!==undefined&&b.dataset.cell===cell));(active||root.querySelector(state.map?'.tp-card .tk-action:not([disabled]),.tk-close':'[data-action="map"]'))?.focus({preventScroll:true});}};
  const dispatch=(action,value)=>{const old=state;state=productionAct(state,action,value);if(old.phase!==state.phase)last=performance.now();if(reduced&&durations[state.phase])state=productionAct(state,'finish');draw();};
  const click=e=>{if(suppressClick){suppressClick=false;return;}const b=e.target.closest('button');if(!b||b.disabled)return;dispatch(b.dataset.cell!==undefined?'cell':b.dataset.action,b.dataset.cell);};
  const pointerDown=e=>{const cell=e.target.closest('[data-cell]');if(cell&&!cell.disabled)down={i:Number(cell.dataset.cell),x:e.clientX,y:e.clientY};};
  const pointerUp=e=>{const cell=e.target.closest('[data-cell]');if(down&&cell&&!cell.disabled&&Number(cell.dataset.cell)!==down.i&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>10&&state.board[down.i]!==null&&state.board[down.i]!=='producer'){state={...state,selected:down.i};dispatch('cell',cell.dataset.cell);suppressClick=true;}down=null;};
  const tick=now=>{if(disposed)return;const delta=Math.min(80,Math.max(0,now-last));last=now;if(durations[state.phase]){state={...state,sceneTime:state.sceneTime+delta};if(state.sceneTime>=durations[state.phase]){state=productionAct(state,'finish');draw();}else if(state.map){const canvas=root.querySelector('.tp-canvas');if(canvas)canvas.outerHTML=sceneMarkup(state,recipe,options.base||'',state.sceneTime);const progress=root.querySelector('.tp-progress');if(progress){const value=clamp(state.sceneTime/durations[state.phase])*100;progress.setAttribute('aria-valuenow',Math.round(value));progress.firstElementChild.style.width=value+'%';}}}raf=requestAnimationFrame(tick);};
  root.addEventListener('click',click);root.addEventListener('pointerdown',pointerDown);root.addEventListener('pointerup',pointerUp);draw();raf=requestAnimationFrame(tick);
  return {getState:()=>state,dispose:()=>{disposed=true;cancelAnimationFrame(raf);root.removeEventListener('click',click);root.removeEventListener('pointerdown',pointerDown);root.removeEventListener('pointerup',pointerUp);}};
}
