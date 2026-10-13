import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {FieldFonts, fieldFont} from './RenderFonts';
import {TidekeeperUI} from './TidekeeperUI';
import {GameCampaign, CampaignCover} from './GameCampaign';

export const DEPTH_FRAMES = 720;
type Language = 'zh' | 'en';
const C = {ink: '#173f48', teal: '#187d88', cream: '#fff4d8'};
function Art({name, style = {}}: {name: string; style?: React.CSSProperties}) {
  return <Img src={staticFile('tidekeeper/' + name)} style={{objectFit: 'contain', ...style}}/>;
}
function Tag({children}: {children: React.ReactNode}) {
  return <div style={{fontSize: 17, fontWeight: 780, letterSpacing: 1.5, color: C.teal}}>{children}</div>;
}
function Heading({children, style = {}}: {children: React.ReactNode; style?: React.CSSProperties}) {
  return <div style={{fontSize: 66, fontWeight: 900, lineHeight: 1.13, letterSpacing: -2, ...style}}>{children}</div>;
}

// Keep composition IDs stable for README assets and CI; new public art shares one source.
export function DepthShowcase({language = 'zh'}: {language?: Language; preview?: boolean}) {
  return <GameCampaign language={language}/>;
}
export function DepthSocialPreview() {return <CampaignCover/>;}

// Prior technical contact sheets remain reproducible as historical evidence.
export function GameArtProof(){return <AbsoluteFill style={{fontFamily:fieldFont,color:C.ink,background:C.cream,padding:38}}><FieldFonts/><h1 style={{fontSize:31,margin:'0 0 13px'}}>同一组实际 PNG / 小尺寸与透明背景检查</h1><p style={{fontSize:17,margin:'0 0 17px'}}>46 / 64 / 96 px · 原创候选 · 浏览器合成检查，不代替主美批准</p>{['#173f48','#e2efe6'].map(bg=><div key={bg} style={{display:'flex',justifyContent:'space-around',alignItems:'center',background:bg,padding:19,marginBottom:14}}>{[1,2,3,4].map(n=><div key={n} style={{display:'flex',gap:5,alignItems:'center'}}>{[46,64,96].map(s=><Art key={s} name={'lamp-l'+n+'.png'} style={{width:s,height:s}}/>)}</div>)}</div>)}<div style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginTop:16}}>{['wood-l1.png','wood-l2.png','producer.png','coin.png','energy.png','locked.png'].map(name=><Art key={name} name={name} style={{width:144,height:144}}/>)}</div><p style={{fontSize:20}}>素材用于生产器、订单、奖励与锁定状态；不是为填满画面临时拼贴。</p></AbsoluteFill>}
export function TidekeeperOverview(){return <AbsoluteFill style={{fontFamily:fieldFont,background:C.cream,color:C.ink}}><FieldFonts/><div style={{position:'absolute',left:45,top:39}}><Tag>潮灯小镇 / 一份视觉记忆的交接自测</Tag><Heading style={{fontSize:52,marginTop:18}}>角色、场景、UI、合成链。<br/>放在一起，才算接得住。</Heading></div><Art name="workshop-after.jpg" style={{position:'absolute',left:36,top:225,width:756,height:425,borderRadius:20}}/><Art name="character-wave.png" style={{position:'absolute',left:7,top:386,width:225,height:361}}/><div style={{position:'absolute',left:238,top:621,display:'flex'}}>{[1,2,3,4].map(n=><Art key={n} name={'lamp-l'+n+'.png'} style={{width:139,height:139}}/>)}</div><div style={{position:'absolute',right:34,top:31,width:390,height:844,transform:'scale(.84)',transformOrigin:'top right',borderRadius:20,overflow:'hidden'}}><TidekeeperUI stage="ready"/></div><div style={{position:'absolute',left:45,bottom:27,fontSize:16}}>实际新输出与可操作 UI · 0.2.0 接包续作 → 0.2.1 补齐界面与竖屏要求 · 候选自测</div></AbsoluteFill>}
