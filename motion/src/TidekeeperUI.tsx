import React, {useEffect, useRef, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import {gameMarkup, createState, act, uiCss} from '../../examples/tidekeeper-handoff/references/ui-kit.js';

// Presentation-only localization; the frozen prototype and its state model are
// left intact. Longer messages come first so short labels do not split them.
const englishCopy: [string,string][] = [
  ['点两件同级物品合成；完成两张订单修复灯房。','Merge matching items to complete both orders.'],
  ['点击取出灯具或木料，每次消耗 1 点体力。','Tap for lamps or timber. Costs 1 energy.'],
  ['选中，再点同级物品；也可以拖动合成。','Select two matching items to merge.'],
  ['交给奈莉，解开一排旧货箱。','Deliver to Neri to clear the crates.'],
  ['两张订单完成，灯房可以开门了！','Both orders complete. The workshop is ready.'],
  ['原创交互试作 · 数值为示例 · 非已上线游戏','Original playable art prototype'],
  ['奈莉 · 修好栈桥','Neri'],['阿澜 · 点亮灯房','Alan'],
  ['栈桥需要新木料','New timber'],['第一盏归航灯','Harbor light'],
  ['灯匠工作箱','Lampmaker kit'],['口袋油灯','Pocket lamp'],['手提风灯','Hurricane lamp'],
  ['圆镜探照灯','Searchlight'],['小小航标灯','Harbor beacon'],['整捆木料','Timber bundle'],
  ['修缮木板','Wood plank'],['缠网的旧货箱','Sealed crate'],['材料已备齐','Ready to deliver'],
  ['合成成功','Merged'],['最高等级','Max level'],['继续合成','Keep merging'],
  ['重新试做','Restart'],['去看看','View'],['交付','Deliver'],['小镇','Town'],['合成','Merge'],['灯匠','Maker'],
];

export function TidekeeperUI({stage='director',language='zh'}:{stage?:'director'|'missing'|'ready'|'done'|'map';language?:'en'|'zh'}) {
  const root=useRef<HTMLDivElement>(null);
  const [handle]=useState(()=>delayRender('Tidekeeper native UI images and type'));
  let state=createState({target:4,title:'第一盏归航灯'});
  if(['ready','done','map'].includes(stage)){state=act(state,'cell',5);state=act(state,'cell',12);}
  if(stage==='done'||stage==='map'){state=act(state,'deliver');state=act(state,'repair');}
  if(stage==='map')state=act(state,'map');
  // Video time is frame-driven; the interactive prototype keeps its CSS feedback.
  state.flash=null;
  useEffect(()=>{Promise.all([
    ...Array.from(root.current?.querySelectorAll('img')??[]).map(img=>img.complete&&img.naturalWidth?Promise.resolve():new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(new Error('Missing UI asset '+img.src));})),
    document.fonts.ready,
  ]).then(()=>continueRender(handle)).catch(cancelRender);},[handle]);
  let markup=gameMarkup(state,staticFile('tidekeeper/'));
  if(language==='en')for(const [source,target] of englishCopy)markup=markup.split(source).join(target);
  return <AbsoluteFill><style>{`@font-face{font-family:TideSans;src:url('${staticFile('tidekeeper/tide-sans.woff2')}');font-weight:100 900}${uiCss}${language==='en'?'.tk-order-copy h1,.tk-order-copy h2{font-size:12px}.tk-name{font-size:11px}.tk-action{font-size:12px}.tk-info p{font-size:11px}.tk-note{font-size:9px}':''}`}</style><div ref={root} dangerouslySetInnerHTML={{__html:markup}}/></AbsoluteFill>;
}
