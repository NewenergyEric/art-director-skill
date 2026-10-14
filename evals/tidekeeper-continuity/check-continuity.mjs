import assert from 'node:assert/strict';import fs from 'node:fs/promises';import path from 'node:path';
import{here,base,launch,monitor,fingerprints,saveJSON}from'./browser-helpers.mjs';
const b=await launch(),p=await b.newPage({viewport:{width:1440,height:850}}),errors=[];monitor(p,errors);
await p.goto(base.replace('play.html','motion-review.html'));await p.evaluate(()=>reviewReady);
const report=await p.evaluate(()=>{
 const M=TidekeeperMotion,areas={repair:{face:[178,226,65,60],clothes:[120,480,40,40],boot:[55,510,40,30]},beckon:{face:[165,114,45,45],clothes:[177,280,40,70],boots:[100,510,170,35]},ignition:{face:[110,95,50,45],clothes:[95,355,40,55],lampBase:[370,350,70,160]}};
 const result={invariants:{},seams:{},maxIgnitionForearmScaleError:0,paintedFrames:M.metadata.newPaintedAnimationFrames};
 const equal=(a,b)=>a.length===b.length&&a.every((v,i)=>v===b[i]);
 for(const name of ['repair','ignition','beckon']){
   const size=M.definitions[name].size,c=document.createElement('canvas');c.width=size[0];c.height=size[1];const g=c.getContext('2d');let baseData;
   const changed={};for(const k of Object.keys(areas[name]))changed[k]=[];
   for(let t=0;t<=5200;t+=50){g.clearRect(0,0,...size);M.draw(g,name,t,[0,0,...size]);const data=Object.fromEntries(Object.entries(areas[name]).map(([k,r])=>[k,Array.from(g.getImageData(...r).data)]));if(!baseData)baseData=data;
     for(const k in data)if(!equal(data[k],baseData[k]))changed[k].push(t);
     if(name==='ignition')result.maxIgnitionForearmScaleError=Math.max(result.maxIgnitionForearmScaleError,Math.abs(M.pose(name,t).axialScale-1));
   }result.invariants[name]={sampleCount:105,regions:areas[name],changed};
 }
 const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
 result.seams.repair=dist(M.pose('repair',1199.999).hand,M.pose('repair',1200).hand);
 result.seams.beckon=dist(M.pose('beckon',4200).hand,M.pose('beckon',0).hand);
 for(const t of [1200,1450,3000]){const a=M.pose('ignition',t-.001),z=M.pose('ignition',t);result.seams['ignition-'+t]={hand:dist(a.hand,z.hand),taper:dist(a.rod.grip,z.rod.grip),jugRotation:Math.abs(a.jug.rotation-z.jug.rotation)}}
 result.seams.ignitionReturn=dist(M.pose('ignition',0).hand,M.pose('ignition',3200).hand);
 result.wickContact=dist(M.pose('ignition',2050).rod.tip,[347,235]);
 return result;
});
for(const v of Object.values(report.invariants))for(const [part,changed]of Object.entries(v.changed))assert.equal(changed.length,0,part+' must remain pixel-identical across action');
assert.ok(report.maxIgnitionForearmScaleError<.025);assert.ok(report.wickContact<.2);assert.ok(report.seams.repair<.01);assert.ok(report.seams.beckon<.01);assert.ok(report.seams.ignitionReturn<.2);
for(const t of [1200,1450,3000]){const s=report.seams['ignition-'+t];assert.ok(s.hand<.3);assert.ok(s.taper<.3);assert.ok(s.jugRotation<.001)}assert.deepEqual(errors,[]);
await saveJSON('continuity-verification.json',{status:'passed',date:new Date().toISOString(),runtimeSha256:await fingerprints(),...report,errors,scope:'315 raster samples verify selected fixed regions and handoff coordinates. Supporting evidence; not automatic anatomical or natural-motion approval.'});
console.log(JSON.stringify({status:'passed',samples:315,seams:report.seams,maxScaleError:report.maxIgnitionForearmScaleError,wickContact:report.wickContact}));await b.close();
