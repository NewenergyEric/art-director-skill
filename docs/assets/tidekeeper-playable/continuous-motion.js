/* Same-source 2D cutout motion. Three masters, no generated in-between frames or 3D rig. */
(function(root){
 'use strict';
 const BASE='art/actions-v062/', cache={}, images={};
 const DEG=Math.PI/180, clamp=x=>Math.max(0,Math.min(1,x)), ease=x=>{x=clamp(x);return x*x*(3-2*x)};
 const mix=(a,b,t)=>a+(b-a)*ease(t), rotate=(p,c,a)=>[c[0]+Math.cos(a)*(p[0]-c[0])-Math.sin(a)*(p[1]-c[1]),c[1]+Math.sin(a)*(p[0]-c[0])+Math.cos(a)*(p[1]-c[1])];
 const defs={
  repair:{size:[400,600],master:'repair-master.png',clean:'repair-clean.png',elbow:[134,399],grip:[196,469],skin:true,
   arm:[[115,375],[149,375],[162,404],[182,429],[210,448],[225,456],[232,467],[225,481],[214,486],[191,484],[178,475],[173,453],[153,432],[135,418],[122,404],[116,390]],
   tool:[[159,450],[179,450],[219,461],[238,463],[239,461],[255,459],[271,466],[272,501],[264,515],[239,517],[231,506],[233,486],[206,481],[181,474],[160,472]],
   meshBox:[108,378,180,421],fixedBox:[0,0,400,378],rigidBox:[0,421,400,179],blend:p=>ease((p[1]-378)/43)},
  beckon:{size:[400,600],master:'beckon-master.png',elbow:[109,225],grip:[64,172],skin:true,
   arm:[[19,131],[89,131],[94,188],[113,207],[126,215],[138,224],[134,232],[117,239],[103,244],[85,224],[71,201],[31,189],[19,168]],
   meshBox:[101,195,137,248],fixedBox:[137,0,263,600],rigidBox:[0,0,101,600],blend:p=>ease((137-p[0])/36)},
  ignition:{size:[500,600],master:'lamp-master.png',clean:'lamp-clean.png',elbow:[119,251],grip:[218,255],skin:true,
   arm:[[92,222],[120,222],[126,234],[155,242],[190,247],[208,241],[221,243],[231,249],[233,255],[227,265],[220,272],[209,273],[198,267],[157,266],[120,263],[105,257],[96,243]],
   patch:[[103,234],[140,234],[150,220],[349,220],[349,332],[140,332],[140,267],[103,267]],
   meshBox:[105,216,148,280],fixedBox:[0,0,105,600],rigidBox:[148,0,352,600],blend:p=>ease((p[0]-105)/43),
   rod:[[307,302],[309,298],[338,274],[343,274],[344,278],[313,305]],
   holder:[[288,315],[296,312],[296,304],[301,300],[312,300],[323,306],[323,316],[333,319],[329,324],[292,325],[286,322]]}
 };
 function canvas(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c}
 function polygon(ctx,pts){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.closePath()}
 function clipped(im,size,pts){const c=canvas(...size),g=c.getContext('2d');g.save();polygon(g,pts);g.clip();g.drawImage(im,0,0,...size);g.restore();return c}
 function skinOnly(c){const g=c.getContext('2d'),im=g.getImageData(0,0,c.width,c.height),p=im.data;for(let i=0;i<p.length;i+=4)if(!(p[i]>100&&p[i]>p[i+1]*1.15&&p[i+1]>p[i+2]*1.12))p[i+3]=0;g.putImageData(im,0,0);return c}
 function woodOnly(c){const g=c.getContext('2d'),im=g.getImageData(0,0,c.width,c.height),p=im.data;for(let i=0;i<p.length;i+=4)if(!(p[i]>70&&p[i]>p[i+1]*1.08&&p[i+1]>p[i+2]*1.08&&!(p[i]>225&&p[i]-p[i+1]>70)))p[i+3]=0;g.putImageData(im,0,0);return c}
 function prepare(name){const d=defs[name],im=images[d.master],c=canvas(...d.size),g=c.getContext('2d');g.drawImage(im,0,0,...d.size);
  const arm=name==='repair'?skinOnly(clipped(im,d.size,d.arm)):clipped(im,d.size,d.arm);if(d.tool)arm.getContext('2d').drawImage(woodOnly(clipped(im,d.size,d.tool)),0,0);
  if(d.clean){g.clearRect(0,0,...d.size);g.drawImage(images[d.clean],0,0,...d.size)}
  else {g.clearRect(0,100,100,115);g.save();polygon(g,d.arm);g.clip();g.clearRect(0,0,...d.size);g.restore()}
  const result={body:c,arm};for(const [key,box] of [['fixed',d.fixedBox],['rigid',d.rigidBox]]){const layer=canvas(...d.size),lc=layer.getContext('2d');lc.save();lc.beginPath();lc.rect(...box);lc.clip();lc.drawImage(arm,0,0);lc.restore();result[key]=layer}
  if(name==='ignition'){result.rod=clipped(im,d.size,d.rod);result.holder=clipped(im,d.size,d.holder)}
  cache[name]=result;
 }
 const ready=Promise.all(['repair-master.png','repair-clean.png','beckon-master.png','lamp-master.png','lamp-clean.png'].map(async file=>{const im=new Image();im.src=BASE+file;await im.decode();images[file]=im})).then(async()=>{const im=new Image();im.src='art/expansion/oil-2.png';await im.decode();images.oil=im;Object.keys(defs).forEach(prepare);return true});
 function curve(t,points){if(t<=points[0][0])return points[0][1];for(let i=1;i<points.length;i++){if(t<=points[i][0])return mix(points[i-1][1],points[i][1],(t-points[i-1][0])/(points[i][0]-points[i-1][0]))}return points.at(-1)[1]}
 function rigid(ctx,im,pivot,target,angle=0,scale=1){ctx.save();ctx.translate(...target);ctx.rotate(angle);ctx.scale(scale,scale);ctx.drawImage(im,-pivot[0],-pivot[1]);ctx.restore()}
 function forearm(ctx,name,target){const d=defs[name],e=d.elbow,old=Math.hypot(d.grip[0]-e[0],d.grip[1]-e[1]),len=Math.hypot(target[0]-e[0],target[1]-e[1]),a=Math.atan2(target[1]-e[1],target[0]-e[0])-Math.atan2(d.grip[1]-e[1],d.grip[0]-e[0]);
  mesh(ctx,name,a,len/old);return {rotation:a,axialScale:len/old};
 }
 function triangle(ctx,im,s,q){const [a,b,c]=s,[u,v,w]=q,den=(b[0]-a[0])*(c[1]-a[1])-(c[0]-a[0])*(b[1]-a[1]);
  const A=((v[0]-u[0])*(c[1]-a[1])-(w[0]-u[0])*(b[1]-a[1]))/den,B=((v[1]-u[1])*(c[1]-a[1])-(w[1]-u[1])*(b[1]-a[1]))/den,C=((w[0]-u[0])*(b[0]-a[0])-(v[0]-u[0])*(c[0]-a[0]))/den,D=((w[1]-u[1])*(b[0]-a[0])-(v[1]-u[1])*(c[0]-a[0]))/den;
  const center=[(u[0]+v[0]+w[0])/3,(u[1]+v[1]+w[1])/3],expanded=q.map(p=>{const l=Math.hypot(p[0]-center[0],p[1]-center[1]);return[p[0]+(p[0]-center[0])*.85/l,p[1]+(p[1]-center[1])*.85/l]});ctx.save();polygon(ctx,expanded);ctx.clip();ctx.transform(A,B,C,D,u[0]-A*a[0]-C*a[1],u[1]-B*a[0]-D*a[1]);ctx.drawImage(im,0,0);ctx.restore();
 }
 function mesh(ctx,name,a,scale=1){const d=defs[name],b=d.meshBox,e=d.elbow,im=cache[name].arm;
  ctx.drawImage(cache[name].fixed,0,0);rigid(ctx,cache[name].rigid,e,e,a,scale);
  const warp=p=>{const w=d.blend(p),r=rotate(p,e,a*w);return[e[0]+(r[0]-e[0])*(1+(scale-1)*w),e[1]+(r[1]-e[1])*(1+(scale-1)*w)]};
  for(let y=b[1];y<b[3];y+=8)for(let x=b[0];x<b[2];x+=8){const s=[[x,y],[Math.min(x+8,b[2]),y],[Math.min(x+8,b[2]),Math.min(y+8,b[3])],[x,Math.min(y+8,b[3])]],q=s.map(warp);triangle(ctx,im,[s[0],s[1],s[2]],[q[0],q[1],q[2]]);triangle(ctx,im,[s[0],s[2],s[3]],[q[0],q[2],q[3]])}
 }
 function flame(ctx,p,t,r=5){ctx.save();ctx.translate(...p);ctx.fillStyle='#f6b941';ctx.beginPath();ctx.moveTo(0,-r*2);ctx.quadraticCurveTo(r*1.4,-r*.2,r*.7,r*.5);ctx.quadraticCurveTo(0,r*1.6,-r*.65,r*.4);ctx.quadraticCurveTo(-r,-r*.4,0,-r*2);ctx.fill();ctx.fillStyle='#fff3b2';ctx.beginPath();ctx.ellipse(0,0,r*.35,r*.7,0,0,Math.PI*2);ctx.fill();ctx.restore()}
 function ignitionPose(time){const t=Math.max(0,Math.min(3200,time)),d=defs.ignition;
  const pour=curve(t,[[0,0],[300,0],[650,13],[950,13],[1200,0]])*DEG;
  const jug={box:[191,194,130,130],pivot:[315,217],rotation:pour,owner:t<1200?'right-hand':'table'};
  const hold=[218,245],pickup=[119+99.08*Math.cos(30.84*DEG),251+99.08*Math.sin(30.84*DEG)],lamp=[347,235];let hand;
  if(t<1200)hand=rotate(hold,jug.pivot,pour);
  else if(t<1450){const a=mix(-3.47,30.84,(t-1200)/250)*DEG;hand=[d.elbow[0]+99.08*Math.cos(a),d.elbow[1]+99.08*Math.sin(a)]}
  else if(t<2050){const a=mix(30.84,0,(t-1550)/500)*DEG;hand=[d.elbow[0]+99.08*Math.cos(a),d.elbow[1]+99.08*Math.sin(a)]}
  else if(t<2300)hand=[218.08,251];
  else if(t<2800){const a=mix(0,30.84,(t-2300)/500)*DEG;hand=[d.elbow[0]+99.08*Math.cos(a),d.elbow[1]+99.08*Math.sin(a)]}
  else if(t<3000)hand=[...pickup];
  else {const a=mix(30.84,-3.47,(t-3000)/200)*DEG;hand=[d.elbow[0]+99.08*Math.cos(a),d.elbow[1]+99.08*Math.sin(a)]}
  const held=t>=1450&&t<3000,grip=held?hand:[...pickup];
  const restAngle=-35*DEG,contactAngle=Math.atan2(235-251,347-218.08);
  const rodAngle=t<1550?restAngle:t<2050?mix(restAngle,contactAngle,(t-1550)/500):t<2300?contactAngle:t<2800?mix(contactAngle,restAngle,(t-2300)/500):restAngle;
  const tip=[grip[0]+130*Math.cos(rodAngle),grip[1]+130*Math.sin(rodAngle)];
  return {time:t,hand,jug,rod:{grip,angle:rodAngle,tip,length:130,owner:held?'right-hand':'holder'},lamp,lit:t>=2050,stream:t>=650&&t<=950,pickup,axialScale:Math.hypot(hand[0]-119,hand[1]-251)/Math.hypot(99,4)};
 }
 function pose(name,time){if(name==='ignition')return ignitionPose(time);if(name==='repair'){const t=Math.min(2400,Math.max(0,time)),phase=t===2400?1200:t%1200,angle=curve(phase,[[0,-20],[100,-20],[330,-60],[430,-60],[530,0],[610,0],[760,-20],[1200,-20]])*DEG;return {time,angle,elbow:defs.repair.elbow,hand:rotate(defs.repair.grip,defs.repair.elbow,angle),toolOwner:'right-hand',toolScale:1}}
  const t=Math.max(0,Math.min(4200,time)),envelope=ease(t/350)*ease((4200-t)/500),angle=Math.sin(t/1400*Math.PI*2)*10*DEG*envelope;return {time,angle,elbow:defs.beckon.elbow,hand:rotate(defs.beckon.grip,defs.beckon.elbow,angle),toolOwner:'none',toolScale:1};
 }
 function draw(ctx,name,time,box){if(!cache[name])return false;const d=defs[name],p=pose(name,time),c=cache[name];ctx.save();ctx.translate(box[0],box[1]);ctx.scale(box[2]/d.size[0],box[3]/d.size[1]);ctx.drawImage(c.body,0,0);
  if(name==='repair'||name==='beckon')mesh(ctx,name,p.angle);
  else {
   // Holder and taper remain present at every phase; hand ownership changes only at contact.
   rigid(ctx,c.holder,[307,320],[187,320],0,.7);
   ctx.save();ctx.translate(...p.jug.pivot);ctx.rotate(p.jug.rotation);ctx.drawImage(images.oil,p.jug.box[0]-p.jug.pivot[0],p.jug.box[1]-p.jug.pivot[1],p.jug.box[2],p.jug.box[3]);ctx.restore();
   const sourceGrip=[310,300],sourceTip=[342,276],sourceAngle=Math.atan2(-24,32),sourceLen=40;
   ctx.save();ctx.translate(...p.rod.grip);ctx.rotate(p.rod.angle);ctx.scale(130/sourceLen,1);ctx.rotate(-sourceAngle);ctx.drawImage(c.rod,-sourceGrip[0],-sourceGrip[1]);ctx.restore();
   flame(ctx,p.rod.tip,time,3.5);
   const arm=forearm(ctx,'ignition',p.hand);
   if(p.stream){ctx.save();ctx.strokeStyle='#d5a544';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(315,217);ctx.quadraticCurveTo(339,209,347,235);ctx.stroke();ctx.restore()}
   if(p.lit){ctx.save();const glow=ctx.createRadialGradient(410,250,0,410,250,50);glow.addColorStop(0,'rgba(255,232,136,.8)');glow.addColorStop(1,'rgba(255,198,62,0)');ctx.fillStyle=glow;ctx.fillRect(350,190,120,120);flame(ctx,p.lamp,time,4);ctx.restore()}
  }
  ctx.restore();return true;
 }
 root.TidekeeperMotion={ready,draw,pose,definitions:defs,metadata:{kind:'same-source 2D cutout',newPaintedAnimationFrames:0,masters:3,sourceTool:'existing oil-2.png',threeD:false},getSourceCanvas:name=>cache[name]?.body,getLayer:(name,layer)=>cache[name]?.[layer]};
})(window);
