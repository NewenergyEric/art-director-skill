import React, {useEffect, useRef, useState} from 'react';
import {AbsoluteFill, cancelRender, continueRender, delayRender, staticFile} from 'remotion';
import {gameMarkup, createState, act, uiCss} from '../../examples/tidekeeper-handoff/references/ui-kit.js';

export function TidekeeperUI({stage='director'}:{stage?:'director'|'missing'|'ready'|'done'|'map'}) {
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
  return <AbsoluteFill><style>{`@font-face{font-family:TideSans;src:url('${staticFile('tidekeeper/tide-sans.woff2')}');font-weight:100 900}${uiCss}`}</style><div ref={root} dangerouslySetInnerHTML={{__html:gameMarkup(state,staticFile('tidekeeper/'))}}/></AbsoluteFill>;
}
