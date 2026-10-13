/* Original Tidekeeper UI first article. Editable HTML/CSS, no dependencies.
   Study parameters, not approved production specifications. */
export const uiCss = `
*{box-sizing:border-box}body{margin:0;background:#183e45;font-family:'TideSans','Microsoft YaHei',sans-serif;color:#214c50}button{font:inherit;cursor:pointer}button:focus-visible{outline:3px solid #ffb347;outline-offset:3px}.tk{position:relative;width:390px;height:844px;overflow:hidden;margin:auto;background:linear-gradient(#98dce1,#d8eee1 53%,#e1d3ac)}.tk button{touch-action:manipulation}.tk-top{height:63px;padding:13px 15px;display:flex;align-items:center;gap:10px;background:linear-gradient(#368b93,#26737a);border-bottom:3px solid #175b67;box-shadow:0 2px 0 #92d9d7;color:white}.tk-level{width:40px;height:40px;display:grid;place-items:center;border:3px solid #ffd16b;background:#40999c;border-radius:13px;font-size:19px;font-weight:900;box-shadow:0 3px 0 #1e5665}.tk-wallet{display:flex;gap:8px;flex:1}.tk-resource{display:flex;align-items:center;gap:6px;flex:1;height:30px;padding:3px 9px;background:#f9f4dc;color:#24494e;border-radius:16px;border:2px solid #e5c46d;box-shadow:0 2px 0 #194f5b;font-size:14px;font-weight:850}.tk-energy{color:#b06412;font-size:21px}.tk-coin{border:2px solid #d59528;background:#ffd86a;border-radius:50%;width:19px;height:19px;display:inline-grid;place-items:center;color:#a8761e;font-size:12px}.tk-heading{height:36px;display:flex;align-items:center;justify-content:space-between;padding:5px 19px;font-size:12px;color:#377278}.tk-heading strong{font-size:15px;letter-spacing:1px}.tk-order{height:139px;margin:0 14px 13px;position:relative;background:#fff7df;border:3px solid #fffef0;border-radius:23px;box-shadow:0 4px 0 #8faea0,0 5px 13px #0e626226;display:flex;align-items:center;padding:8px 13px 8px 85px}.tk-avatar{position:absolute;left:-8px;bottom:0;width:110px;height:150px;overflow:hidden;border-radius:0 0 0 22px}.tk-avatar img{position:absolute;width:142px;height:213px;max-width:none;left:-10px;top:0;object-fit:contain}.tk-order-main{width:100%;display:flex;align-items:center;gap:8px}.tk-order-copy{flex:1;min-width:0}.tk-order h1{font-size:16px;line-height:1.4;margin:0 0 4px;font-weight:850}.tk-order p{font-size:11px;line-height:1.5;margin:0 0 6px;color:#587168}.tk-order-target{width:61px;flex-shrink:0;display:grid;justify-items:center;font-size:11px;gap:3px}.tk-order-target img{width:58px;height:58px;object-fit:contain}.tk-action{display:block;width:100%;height:33px;border:2px solid #f9d36b;border-radius:12px;background:linear-gradient(#ffd672,#f8b94e);box-shadow:0 3px 0 #c88729;color:#664413;font-size:13px;font-weight:850}.tk-action:disabled{cursor:default;background:#d4dfd1;border-color:#e6ece0;color:#516756;box-shadow:0 3px 0 #a0b49f}.tk-action:active:not(:disabled){transform:translateY(2px);box-shadow:0 1px 0 #c88729}.tk-board-shell{margin:0 13px;padding:8px;background:#478e8f;border-radius:19px;border:3px solid #e8f7de;box-shadow:0 5px 0 #286773,0 7px 15px #23586233}.tk-board{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}.tk-cell{position:relative;border:0;border-radius:7px;aspect-ratio:1;padding:0;background:#cce9dc;box-shadow:inset 0 1px 1px #f5ffe9;color:#3b706a}.tk-cell:nth-child(even){background:#bce0d3}.tk-cell img{display:block;width:100%;height:100%;object-fit:contain;pointer-events:none}.tk-cell.selected{background:#fff1ab;outline:3px solid #ffa936;z-index:1}.tk-cell.locked{background:#9fc4b4;box-shadow:inset 0 0 6px #678f7740;font-size:17px;color:#6f9683;cursor:default}.tk-cell .badge{position:absolute;right:-2px;bottom:-4px;min-width:14px;height:16px;border-radius:8px;background:#ffe178;border:1px solid #cfaa48;font-size:10px;color:#715115;font-weight:900;line-height:14px}.tk-info{height:74px;text-align:center;padding:17px 20px 7px}.tk-info strong{font-size:15px;display:block;margin-bottom:6px}.tk-info p{font-size:12px;margin:0;color:#4b766b}.tk-bottom{display:flex;align-items:center;justify-content:center;gap:35px;padding:10px 20px;border-top:2px solid #fff7d1;background:linear-gradient(#f5e8c5,#e4cc93);height:85px}.tk-bottom button{width:70px;border:0;background:transparent;color:#6d7058;font-size:12px;font-weight:750;padding:0}.tk-bottom .active{color:#1b656d}.tk-nav-icon{display:block;width:49px;height:38px;border-radius:12px;margin:0 auto 5px;background:#fff1c9;border:2px solid #c5b277;font-size:24px;box-shadow:0 2px 0 #b5a168}.active .tk-nav-icon{background:#7cc9bf;border-color:#e8ffd9;color:#1c6668}.tk-note{position:absolute;bottom:8px;left:0;right:0;text-align:center;font-size:10px;color:#59776c}.tk-restoration{position:absolute;inset:0;background:#3d969c;z-index:5}.tk-restoration .map{width:100%;height:100%;object-fit:cover;object-position:57% center}.tk-dialogue{position:absolute;left:16px;right:16px;bottom:39px;padding:22px 22px 22px 103px;min-height:155px;border-radius:24px;border:4px solid #fff8d8;background:#fff1ca;box-shadow:0 5px 0 #6e986b}.tk-dialogue .person{position:absolute;left:-27px;bottom:7px;width:166px;height:250px;object-fit:contain}.tk-dialogue h2{font-size:19px;margin:0 0 8px}.tk-dialogue p{font-size:13px;line-height:1.6;margin:0 0 10px}.tk-close{position:absolute;top:18px;left:15px;padding:8px 13px;border-radius:13px;border:3px solid #fff1c9;background:#38868b;color:white;font-weight:800}.tk-completed{background:#76bca5;color:#174c43;border-color:#e9f7c9;box-shadow:0 3px 0 #548c75}
`;
export const initialBoard = () => {
  const board = Array(56).fill(null);
  [0,1,3,8,9,16,24].forEach(i=>board[i]=1);
  [5,12,17].forEach(i=>board[i]=2);
  board[21]='producer';
  for(let i=42;i<56;i++)board[i]='locked';
  return board;
};
const text = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function gameMarkup(state, base='') {
  const src=name=>text(base+name);
  const target=state.target??2;
  const ready=state.board.includes(target)&&!state.done;
  const names=['','口袋油灯','手提风灯','圆镜探照灯','小小航标灯'];
  const item=level=>`<img src="${src(`lamp-l${level}.png`)}" alt="${names[level]}">`;
  return `<section class="tk" aria-label="潮灯小镇界面试作">
    <div class="tk-top"><span class="tk-level">3</span><div class="tk-wallet"><span class="tk-resource"><b class="tk-energy">ϟ</b> ${state.energy??20}/30</span><span class="tk-resource"><i class="tk-coin">●</i> ${state.coins??120}</span></div><span aria-label="设置">⚙</span></div>
    <div class="tk-heading"><strong>潮灯小镇</strong><span>灯房的第一束光</span></div>
    <div class="tk-order"><div class="tk-avatar"><img src="${src('character-base.png')}" alt="灯匠阿澜"></div><div class="tk-order-main"><div class="tk-order-copy"><h1>${text(state.title??'给旧灯房送一盏灯')}</h1><p>${state.done?'灯已送到，去看看焕新的灯房。':'阿澜在等你。把相同的灯合在一起吧。'}</p><button class="tk-action ${state.done?'tk-completed':''}" data-action="deliver" ${!ready&&!state.done?'disabled':''}>${state.done?'查看灯房 ✓':ready?'交付 · +30 金币':'还差一盏灯'}</button></div><div class="tk-order-target">${item(target)}<span>${state.done?'已交付 ✓':`${ready?1:0} / 1`}</span></div></div></div>
    <div class="tk-board-shell"><div class="tk-board" role="group" aria-label="合成棋盘">${state.board.map((level,i)=>`<button class="tk-cell ${level==='locked'?'locked':''} ${state.selected===i?'selected':''}" data-cell="${i}" ${level==='locked'?'disabled':''} aria-label="${i+1}号格：${level==='locked'?'尚未开放':level==='producer'?'灯匠工作箱':names[level]||'空格'}">${typeof level==='number'?item(level):level==='producer'?`<img src="${src('producer.png')}" alt="灯匠工作箱"><span class="badge">ϟ</span>`:level==='locked'?'◆':''}</button>`).join('')}</div></div>
    <div class="tk-info" aria-live="polite"><strong>${text(state.notice??'把两盏相同的灯合在一起')}</strong><p>点工作箱取灯 · 点选两件同级物品合成</p></div>
    <div class="tk-bottom"><button data-action="map"><span class="tk-nav-icon">⌂</span>小镇</button><button class="active" data-action="board"><span class="tk-nav-icon">✦</span>合成</button><button data-action="reset"><span class="tk-nav-icon">↺</span>重新试做</button></div><span class="tk-note">原创美术与交互试作 · 规则和数值用于本次验证</span>
    ${state.map?`<div class="tk-restoration"><img class="map" src="${src(state.done?(state.afterMap||'workshop-before.jpg'):'workshop-before.jpg')}" alt="${state.done&&state.afterMap?'修复后的灯房':'等待修复的灯房'}"><button class="tk-close" data-action="board">← 返回棋盘</button><div class="tk-dialogue"><img class="person" src="${src(state.done?(state.afterCharacter||'character-base.png'):'character-base.png')}" alt="阿澜"><h2>${state.done?'第一盏灯，送到了！':'这间灯房，还能修好。'}</h2><p>${state.done?(state.afterMap?'木板补好了，窗也打开了。灯房终于有了暖光。':'谢谢你把第一盏灯送来。我们离重新开门又近了一步。'):'先合出订单需要的灯，再回小镇看看。'}</p><button class="tk-action" data-action="board">${state.done?'继续合成':'去做订单'}</button></div></div>`:''}
  </section>`;
}
export function mountGame(root, options={}) {
  let state={board:initialBoard(),energy:20,coins:120,selected:null,target:options.target??2,maxLevel:options.maxLevel??2,title:options.title,afterMap:options.afterMap,afterCharacter:options.afterCharacter,done:false};
  if(options.board)state.board=[...options.board];
  function draw(){root.innerHTML=gameMarkup(state,options.base??'');}
  root.addEventListener('click',event=>{
    const button=event.target.closest('button'); if(!button||button.disabled)return;
    const action=button.dataset.action;
    if(action==='reset'){state={...state,board:initialBoard(),energy:20,coins:120,selected:null,done:false,map:false,notice:null};if(options.board)state.board=[...options.board];}
    if(action==='map')state.map=true;
    if(action==='board')state.map=false;
    if(action==='deliver'){
      const slot=state.board.indexOf(state.target);
      if(state.done)state.map=true;
      else if(slot>=0){state.board[slot]=null;state.done=true;state.coins+=30;state.notice='订单完成，灯房有了第一束光';}
    }
    if(button.dataset.cell!==undefined){
      const i=Number(button.dataset.cell), current=state.board[i];
      if(current==='producer'){
        const slot=state.board.indexOf(null);
        if(slot<0)state.notice='棋盘满了，先合成腾出空位';
        else if(state.energy<1)state.notice='体力用完了，可以重新试做';
        else{state.board[slot]=1;state.energy--;state.notice='获得一盏口袋油灯';}
        state.selected=null;
      }else if(state.selected!==null&&state.selected!==i){
        const previous=state.board[state.selected];
        if(current===null){state.board[i]=previous;state.board[state.selected]=null;state.selected=null;state.notice='已移动物品';}
        else if(typeof current==='number'&&previous===current&&current<state.maxLevel){state.board[i]=current+1;state.board[state.selected]=null;state.selected=null;state.notice='合成成功！看看订单还需要什么';}
        else{state.selected=typeof current==='number'?i:null;state.notice=current>=state.maxLevel?'已到本次试作的最高等级':'请选择两件相同等级的物品';}
      }else state.selected=typeof current==='number'?i:null;
    }
    draw();
  });draw();return ()=>state;
}
