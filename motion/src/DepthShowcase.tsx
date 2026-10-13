import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {FieldFonts, fieldFont} from './RenderFonts';
import {TidekeeperUI} from './TidekeeperUI';

export const DEPTH_FRAMES=720;
type Language='zh'|'en';
const C={ink:'#173f48',teal:'#187d88',mint:'#99e2cd',cream:'#fff4d8',coral:'#f17f63'};
const ease=(v:number)=>{const x=Math.max(0,Math.min(1,v));return x*x*(3-2*x)};
const p=(f:number,s:number,d=24)=>ease((f-s)/d);
const say=(l:Language,zh:string,en:string)=>l==='zh'?zh:en;
const stops=[0,120,240,360,510,630,720];
function Art({name,style={}}:{name:string;style?:React.CSSProperties}){return <Img src={staticFile('tidekeeper/'+name)} style={{objectFit:'contain',...style}}/>}
function Scene({f,i,children}:{f:number;i:number;children:React.ReactNode}){const a=(i===0?1:p(f,stops[i]-5,10))*(i===5?1:1-p(f,stops[i+1]-5,10));return a? <AbsoluteFill style={{opacity:a,overflow:'hidden'}}>{children}</AbsoluteFill>:null}
function Tag({children,light=false}:{children:React.ReactNode;light?:boolean}){return <div style={{fontSize:17,fontWeight:780,letterSpacing:1.5,color:light?C.cream:C.teal}}>{children}</div>}
function Heading({children,style={}}:{children:React.ReactNode;style?:React.CSSProperties}){return <div style={{fontSize:66,fontWeight:900,lineHeight:1.13,letterSpacing:-2,...style}}>{children}</div>}
function Foot({children,light=false}:{children:React.ReactNode;light?:boolean}){return <div style={{position:'absolute',bottom:42,left:52,fontSize:23,fontWeight:650,color:light?C.cream:C.ink}}>{children}</div>}
function Opening({f,l}:{f:number;l:Language}){return <>
 <Art name="workshop-after.jpg" style={{width:1280,height:720,objectFit:'cover',transform:'scale('+ (1.03-.03*p(f,0,35))+')'}}/>
 <AbsoluteFill style={{background:'linear-gradient(90deg,#103f50dc,#17495290 48%,transparent)'}}/>
 <div style={{position:'absolute',left:52,top:131,color:C.cream,transform:'rotate(-2deg)'}}><Tag light>{say(l,'主美定下的，就让团队接得住。','LET THE TEAM CARRY YOUR DIRECTION.')}</Tag><Heading style={{fontSize:l==='zh'?83:81,marginTop:27}}>{say(l,'一个团队/项目，','One team,')}<br/><span style={{color:'#ffe29c'}}>{say(l,'一份视觉记忆。','one visual memory.')}</span></Heading><p style={{fontSize:25,lineHeight:1.5,marginTop:30,maxWidth:660}}>{say(l,'角色、场景、UI、合成链。每次交付都有共同依据。','Characters, environments, UI and item chains. A shared basis for every delivery.')}</p></div>
 <Art name="character-wave.png" style={{position:'absolute',right:24,bottom:-35,width:340,height:550,transform:'translateX('+((1-p(f,0,35))*24)+'px)'}}/>
 </>}
function Direction({f,l}:{f:number;l:Language}){return <AbsoluteFill style={{background:C.cream,color:C.ink}}>
 <div style={{position:'absolute',left:52,top:68}}><Tag>{say(l,'01 / 主美建立规范','01 / DIRECTOR BUILDS THE BASELINE')}</Tag><Heading style={{fontSize:61,marginTop:20}}>{say(l,'把“这种感觉”，留下来。','Make the feeling repeatable.')}</Heading></div>
 <Art name="workshop-before.jpg" style={{position:'absolute',right:-25,top:243,width:775,height:436,objectFit:'cover',borderRadius:160,transform:'rotate(-5deg)'}}/>
 <Art name="character-base.png" style={{position:'absolute',left:16,top:219,width:245,height:418}}/>
 <div style={{position:'absolute',left:260,top:276,width:385,padding:'18px 25px',background:'#fffdf0eb',borderLeft:'5px solid '+C.coral,transform:'rotate(-2deg)',opacity:p(f,125,18)}}>
 <b style={{fontSize:28}}>{say(l,'先定共同语言','Define the shared language')}</b><p style={{fontSize:23,lineHeight:1.65,margin:'12px 0 0'}}>{say(l,'饱满体块 · 宽而柔的高光','Chunky shapes · soft broad highlights')}<br/>{say(l,'身份、用途和变化分开写','Separate identity, use and variation')}</p></div>
 <Art name="lamp-l1.png" style={{position:'absolute',left:287,top:441,width:159,height:159}}/><Art name="lamp-l2.png" style={{position:'absolute',left:436,top:439,width:178,height:178}}/>
 <Foot>{say(l,'规范 + 样板 + 字体与源码 → 一起装进项目包','Rules + samples + fonts and source → one project pack')}</Foot>
 </AbsoluteFill>}
function Members({f,l}:{f:number;l:Language}){return <AbsoluteFill style={{background:'#dceee1',color:C.ink}}>
 <Art name="workshop-after.jpg" style={{position:'absolute',right:-60,top:0,width:906,height:510,objectFit:'cover',opacity:.88}}/><AbsoluteFill style={{background:'linear-gradient(90deg,#dceee1,#dceee1ee 28%,transparent 68%)'}}/>
 <div style={{position:'absolute',left:52,top:75}}><Tag>{say(l,'02 / 成员拿包续作','02 / TEAMMATE CONTINUES FROM THE PACK')}</Tag><Heading style={{fontSize:61,marginTop:23}}>{say(l,'换一个人做，','A new pair of hands.')}<br/>{say(l,'还是同一个世界。','The same world.')}</Heading></div>
 <Art name="character-wave.png" style={{position:'absolute',left:94,bottom:-76,width:265,height:426,transform:'translateY('+((1-p(f,244,25))*35)+'px)'}}/>
 <div style={{position:'absolute',left:421,top:365,fontSize:24,fontWeight:800,padding:'8px 19px',borderRadius:7,background:C.cream,transform:'rotate(-3deg)'}}>{say(l,'新动作 / 修复状态 / L3 · L4','NEW POSE / RESTORED SCENE / L3 · L4')}</div>
 <Art name="lamp-l3.png" style={{position:'absolute',left:442,bottom:57,width:238,height:238,transform:'rotate('+(-7+7*p(f,259,25))+'deg)'}}/><Art name="lamp-l4.png" style={{position:'absolute',left:698,bottom:50,width:247,height:247}}/>
 <div style={{position:'absolute',right:44,bottom:91,width:250,fontSize:23,lineHeight:1.55}}>{say(l,'沿用同一版本，记录实际输入与新输出。','Use the same version. Record the inputs and the new work.')}</div>
 </AbsoluteFill>}
function InGame({f,l}:{f:number;l:Language}){const stage=f<403?'missing':f<445?'ready':'done';return <AbsoluteFill style={{background:'#163f4c',color:C.cream}}>
 <div style={{position:'absolute',left:53,top:115,width:665}}><Tag light>{say(l,'03 / 放进真正的使用画面','03 / CHECK THE ACTUAL COMPOSITION')}</Tag><Heading style={{fontSize:67,marginTop:28}}>{say(l,'接得上，','Fits together.')}<br/><span style={{color:'#ffe197'}}>{say(l,'也要用得起来。','Works together.')}</span></Heading>
 <p style={{fontSize:27,lineHeight:1.65,maxWidth:560,marginTop:31}}>{say(l,'订单、图标、按钮和文字，','Orders, icons, buttons and type.')}<br/>{say(l,'都属于这款游戏。','All belong to this game.')}</p><div style={{fontSize:25,color:C.mint,marginTop:30}}>{say(l,stage==='missing'?'两件同级物品 → 合成':stage==='ready'?'订单已备齐 → 交付':'库存消耗 / 金币奖励 / 解锁区域',stage==='missing'?'MATCH TWO → MERGE':stage==='ready'?'ORDER READY → DELIVER':'INVENTORY / REWARD / UNLOCK')}</div></div>
 <div style={{position:'absolute',right:92,top:56,width:390,height:844,transform:'scale(.72)',transformOrigin:'top right',boxShadow:'0 16px 50px #001b2455',borderRadius:20,overflow:'hidden'}}><TidekeeperUI stage={stage}/>{f>=380&&f<403?<><style>{'.tk-cell[data-cell="5"] img{opacity:0}'}</style><Art name="lamp-l3.png" style={{position:'absolute',left:268,top:253+50*p(f,380,23),width:50,height:50,transform:'scale(1.12)',filter:'drop-shadow(0 4px 2px #214c5066)'}}/><div style={{position:'absolute',left:302,top:293+50*p(f,380,23),width:21,height:21,borderRadius:'50%',border:'3px solid white',background:'#ffffff66',boxShadow:'0 2px 4px #1236'}}/></>:null}{f>=445&&f<470?<Art name="coin.png" style={{position:'absolute',left:135+(140*p(f,445,25)),top:132-124*p(f,445,25),width:34,height:34,opacity:1-p(f,460,10)}}/>:null}</div>
 <Foot light>{say(l,'同一份 UI 源码驱动状态；原型美术验证，非已上线游戏。','Same UI source and state logic. An art prototype, not a shipped game.')}</Foot>
 </AbsoluteFill>}
function Review({f,l}:{f:number;l:Language}){const a=p(f,531,37);return <>
 <Art name="workshop-before.jpg" style={{width:1280,height:720,objectFit:'cover'}}/><div style={{position:'absolute',inset:0,clipPath:'inset(0 '+((1-a)*100)+'% 0 0)'}}><Art name="workshop-after.jpg" style={{width:1280,height:720,objectFit:'cover'}}/></div>
 <AbsoluteFill style={{background:'linear-gradient(0deg,#143c4bf2,transparent 77%)'}}/>
 <div style={{position:'absolute',left:52,bottom:95,color:C.cream}}><Tag light>{say(l,'04 / 对照、返修、回写规范','04 / COMPARE, REVISE, UPDATE THE PACK')}</Tag><Heading style={{marginTop:19,fontSize:60}}>{say(l,'同一座灯房，新的生活。','The same place. A new chapter.')}</Heading><p style={{fontSize:26,marginBottom:0}}>{say(l,'补木板 · 开窗 · 亮灯。共同问题，带回下一版。','Repair the deck. Open the shutters. Turn on the light.')}</p></div>
 <div style={{position:'absolute',top:67,right:42,color:C.ink,background:C.cream,padding:'10px 20px',fontSize:20,fontWeight:850,transform:'rotate(3deg)'}}>{say(l,'真实成员续作 / 前后对照','ACTUAL CONTINUATION / BEFORE & AFTER')}</div>
 </>}
function Closing({l}:{l:Language}){return <AbsoluteFill style={{background:C.cream,color:C.ink}}>
 <Art name="workshop-after.jpg" style={{position:'absolute',right:-50,top:0,width:890,height:720,objectFit:'cover',opacity:.5}}/><AbsoluteFill style={{background:'linear-gradient(90deg,#fff4d8,#fff4d8dd 49%,#fff4d820)'}}/>
 <div style={{position:'absolute',left:52,top:115}}><Tag>ART DIRECTOR / AGENT SKILL</Tag><Heading style={{fontSize:l==='zh'?76:71,marginTop:25}}>{say(l,'一个团队/项目，','One team,')}<br/><span style={{color:C.teal}}>{say(l,'一份视觉记忆。','one visual memory.')}</span></Heading><p style={{fontSize:27,lineHeight:1.6,marginTop:33}}>{say(l,'把主美的判断，带到每次交付。','Carry the direction into every delivery.')}<br/>{say(l,'装好，在你的 Agent 里开始。','Install. Start in your agent.')}</p></div>
 <Art name="character-wave.png" style={{position:'absolute',right:33,bottom:-28,width:315,height:505}}/>
 <Foot>{say(l,'中文为主 · 可打包分发 · 开源','CHINESE-FIRST · PORTABLE PROJECT PACKS · OPEN SOURCE')}</Foot>
 </AbsoluteFill>}
export function DepthShowcase({language='zh'}:{language?:Language;preview?:boolean}){const f=useCurrentFrame();return <AbsoluteFill style={{fontFamily:fieldFont,background:C.cream}}><FieldFonts/><Scene f={f} i={0}><Opening f={f} l={language}/></Scene><Scene f={f} i={1}><Direction f={f} l={language}/></Scene><Scene f={f} i={2}><Members f={f} l={language}/></Scene><Scene f={f} i={3}><InGame f={f} l={language}/></Scene><Scene f={f} i={4}><Review f={f} l={language}/></Scene><Scene f={f} i={5}><Closing l={language}/></Scene><div style={{position:'absolute',top:19,left:27,fontSize:12,fontWeight:800,letterSpacing:2,color:f<117||f>355&&f<628?C.cream:C.teal}}>ART DIRECTOR / TIDEKEEPER</div><div style={{position:'absolute',left:0,bottom:0,width:(f+1)/720*100+'%',height:4,background:C.coral}}/></AbsoluteFill>}
export function DepthSocialPreview(){return <AbsoluteFill style={{fontFamily:fieldFont}}><FieldFonts/><Closing l="zh"/></AbsoluteFill>}
export function GameArtProof(){return <AbsoluteFill style={{fontFamily:fieldFont,color:C.ink,background:C.cream,padding:38}}><FieldFonts/><h1 style={{fontSize:31,margin:'0 0 13px'}}>同一组实际 PNG / 小尺寸与透明背景检查</h1><p style={{fontSize:17,margin:'0 0 17px'}}>46 / 64 / 96 px · 原创候选 · 浏览器合成检查，不代替主美批准</p>{['#173f48','#e2efe6'].map(bg=><div key={bg} style={{display:'flex',justifyContent:'space-around',alignItems:'center',background:bg,padding:19,marginBottom:14}}>{[1,2,3,4].map(n=><div key={n} style={{display:'flex',gap:5,alignItems:'center'}}>{[46,64,96].map(s=><Art key={s} name={'lamp-l'+n+'.png'} style={{width:s,height:s}}/>)}</div>)}</div>)}<div style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginTop:16}}>{['wood-l1.png','wood-l2.png','producer.png','coin.png','energy.png','locked.png'].map(name=><Art key={name} name={name} style={{width:144,height:144}}/>)}</div><p style={{fontSize:20}}>素材用于生产器、订单、奖励与锁定状态；不是为填满画面临时拼贴。</p></AbsoluteFill>}
export function TidekeeperOverview(){return <AbsoluteFill style={{fontFamily:fieldFont,background:C.cream,color:C.ink}}><FieldFonts/><div style={{position:'absolute',left:45,top:39}}><Tag>潮灯小镇 / 一份视觉记忆的交接自测</Tag><Heading style={{fontSize:52,marginTop:18}}>角色、场景、UI、合成链。<br/>放在一起，才算接得住。</Heading></div><Art name="workshop-after.jpg" style={{position:'absolute',left:36,top:225,width:756,height:425,borderRadius:20}}/><Art name="character-wave.png" style={{position:'absolute',left:7,top:386,width:225,height:361}}/><div style={{position:'absolute',left:238,top:621,display:'flex'}}>{[1,2,3,4].map(n=><Art key={n} name={'lamp-l'+n+'.png'} style={{width:139,height:139}}/>)}</div><div style={{position:'absolute',right:34,top:31,width:390,height:844,transform:'scale(.84)',transformOrigin:'top right',borderRadius:20,overflow:'hidden'}}><TidekeeperUI stage="ready"/></div><div style={{position:'absolute',left:45,bottom:27,fontSize:16}}>实际新输出与可操作 UI · 0.2.0 接包续作 → 0.2.1 补齐界面与竖屏要求 · 候选自测</div></AbsoluteFill>}
