import React,{useEffect,useRef,useState} from 'react';
import {AbsoluteFill,cancelRender,continueRender,delayRender,staticFile,useCurrentFrame} from 'remotion';
import {productionCss,productionMarkup,sceneMarkup,createProductionState} from '../../examples/tidekeeper-production/references/scene-player.js';
import recipe from '../../examples/tidekeeper-production/references/scene-recipes.json';
import {FieldFonts,fieldFont} from './RenderFonts';

export function ProductionFrame({phase='complete',time=0,game=false}:{phase?:string;time?:number;game?:boolean}){
 const ref=useRef<HTMLDivElement>(null),[handle]=useState(()=>delayRender('Production scene assets'));
 const state={...createProductionState(),phase,map:true,done:true,repairDone:true,coins:175};
 useEffect(()=>{Promise.all([...Array.from(ref.current?.querySelectorAll('img')??[]).map(img=>img.complete&&img.naturalWidth?Promise.resolve():new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=()=>reject(new Error('Production image missing: '+img.src));})),document.fonts.ready]).then(()=>continueRender(handle)).catch(cancelRender);},[handle,phase]);
 return <AbsoluteFill><style>{`@font-face{font-family:TideSans;src:url('${staticFile('tidekeeper-production/tide-sans.woff2')}');font-weight:100 900}${productionCss}${game?'':'.tp-canvas{transform:none}'}`}</style><div ref={ref} dangerouslySetInnerHTML={{__html:game?productionMarkup(state,recipe,staticFile('tidekeeper-production/'),time):sceneMarkup(state,recipe,staticFile('tidekeeper-production/'),time)}}/></AbsoluteFill>;
}

export function ProductionProof(){return <AbsoluteFill style={{background:'#fff4d8',color:'#173f48',fontFamily:fieldFont,padding:36}}><FieldFonts/><h1 style={{fontSize:43,margin:'0 0 8px'}}>同一个小镇，继续发生故事。</h1><p style={{fontSize:21,margin:'0 0 20px'}}>角色动作 · 修复与昼夜 · 归航和效果 · 同一份场景配方</p><div style={{display:'flex',gap:20}}>{[['repairing','01 修缮'],['lighting','02 点灯'],['complete','03 归航']].map(([phase,label])=><div key={phase} style={{width:390}}><div style={{position:'relative',height:455,overflow:'hidden',borderRadius:14}}><div style={{position:'absolute',top:-105,left:0,width:900,height:1600,transform:'scale(.433333)',transformOrigin:'top left'}}><ProductionFrame phase={phase} time={phase==='lighting'?2800:phase==='repairing'?850:3800}/></div></div><p style={{fontSize:25,fontWeight:800,margin:'14px 0 0'}}>{label}</p></div>)}</div><p style={{fontSize:17,marginTop:25}}>潮灯小镇 0.3.0 / 原创候选与交接自测 · 姿势插演，不是骨骼动画 · Compositor 原生打开待测</p></AbsoluteFill>}

export function ProductionSequence(){const f=useCurrentFrame();const phase=f<78?'repairing':f<162?'lighting':f<276?'arriving':'complete';const time=f<78?f/30*1000:f<162?(f-78)/30*1000:f<276?(f-162)/30*1000:3800;return <ProductionFrame phase={phase} time={time} game/>;}
