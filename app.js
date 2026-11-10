(()=>{
const $=s=>document.querySelector(s),LS='peanut_cloud_v1';
const E={google:'https://www.google.com/search?q=%s',duckduckgo:'https://duckduckgo.com/?q=%s',bing:'https://www.bing.com/search?q=%s',brave:'https://search.brave.com/search?q=%s',startpage:'https://www.startpage.com/do/search?q=%s'};
const F={Pacifico:'cursive',Caveat:'cursive',Lobster:'cursive','Permanent Marker':'cursive',Inter:'sans-serif','Space Grotesk':'sans-serif',Fraunces:'serif','JetBrains Mono':'monospace',System:'sans-serif'};
const D={name:'Peanut_Cloud',fontLogo:'Pacifico',fontUi:'System',accent:'#e8b04a',bg:'#101010',card:'#1a1a1a',text:'#f2f2f2',cols:4,tile:88,radius:6,bgimg:'',dim:60,blur:0,engine:'google',custom:'',newtab:false,hint:true,clock:false,labels:true,css:'',
apps:[['YouTube','https://youtube.com'],['GitHub','https://github.com'],['Discord','https://discord.com'],['TikTok','https://tiktok.com'],['Google','https://google.com'],['Twitter/X','https://x.com'],['Roblox','https://roblox.com'],['GeForce NOW','https://play.geforcenow.com'],['Movies','https://www.justwatch.com','🎬'],['Games','https://store.steampowered.com','🎮'],['AI','https://claude.ai','✨'],['Music','https://open.spotify.com','🎵']].map(([name,url,icon='' ])=>({name,url,icon}))};
let C;try{C={...D,...JSON.parse(localStorage.getItem(LS)||'{}')}}catch{C={...D}}
let editing=false,clk;
const save=()=>{try{localStorage.setItem(LS,JSON.stringify(C))}catch{}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const norm=u=>/^[a-z][a-z0-9+.-]*:\/\//i.test(u)?u:'https://'+u;
const go=u=>{u=norm(u);C.newtab?window.open(u,'_blank','noopener'):location.href=u};
const eng=()=>(C.engine==='custom'&&C.custom.includes('%s'))?C.custom:E[C.engine]||E.google;
const dlg=$('#dlg'),open=h=>{dlg.innerHTML=h;if(!dlg.open)dlg.showModal()};
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});

function apply(){
  const r=document.documentElement.style,set=(k,v)=>r.setProperty(k,v);
  set('--accent',C.accent);set('--bg',C.bg);set('--card',C.card);set('--text',C.text);
  set('--radius',C.radius+'px');set('--cols',C.cols);set('--tile',C.tile);
  set('--dim',C.bgimg?C.dim/100:0);set('--blur',C.blur+'px');
  set('--logo',`'${C.fontLogo}',${F[C.fontLogo]||'cursive'}`);
  set('--ui',C.fontUi==='System'?'system-ui,sans-serif':`'${C.fontUi}',${F[C.fontUi]||'sans-serif'}`);
  const fams=[C.fontLogo,C.fontUi].filter(f=>f!=='System').map(f=>'family='+f.replace(/ /g,'+')).join('&');
  let l=$('#gf');if(fams){if(!l){l=document.createElement('link');l.id='gf';l.rel='stylesheet';document.head.append(l)}l.href='https://fonts.googleapis.com/css2?'+fams+'&display=swap'}
  $('#bg').style.backgroundImage=C.bgimg?`url("${C.bgimg.replace(/"/g,'%22')}")`:'none';
  $('#logo').textContent=C.name;document.title=C.name;
  $('#hint').hidden=!C.hint;$('#ucss').textContent=C.css;
  document.body.classList.toggle('nolabels',!C.labels);
  clearInterval(clk);const c=$('#clock');c.hidden=!C.clock;
  if(C.clock){const t=()=>c.textContent=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});t();clk=setInterval(t,1000)}
}
function icon(a){
  if(/^(https?:|data:)/.test(a.icon))return`<img alt="" src="${esc(a.icon)}">`;
  if(a.icon)return esc(a.icon);
  let h='';try{h=new URL(norm(a.url)).hostname}catch{}
  return`<img alt="" src="https://www.google.com/s2/favicons?domain=${esc(h)}&sz=64">`;
}
function grid(){
  const g=$('#grid');g.innerHTML='';let from=null;
  C.apps.forEach((a,i)=>{
    const t=document.createElement('a');t.className='tile';t.href=norm(a.url);t.draggable=editing;
    t.innerHTML=`<i>${icon(a)}</i><span>${esc(a.name)}</span>`;
    t.querySelector('img')?.addEventListener('error',e=>e.target.replaceWith((a.name[0]||'?').toUpperCase()));
    t.onclick=e=>{if(!editing){if(e.ctrlKey||e.metaKey||e.shiftKey)return;e.preventDefault();go(a.url)}else{e.preventDefault();appDlg(i)}};
    t.ondragstart=()=>from=i;t.ondragover=e=>e.preventDefault();
    t.ondrop=e=>{e.preventDefault();if(from!==null&&from!==i){C.apps.splice(i,0,C.apps.splice(from,1)[0]);save();grid()}};
    g.append(t);
  });
  if(editing){const b=document.createElement('button');b.className='tile add';b.textContent='+';b.setAttribute('aria-label','Add app');b.onclick=()=>appDlg(-1);g.append(b)}
}
function appDlg(i){
  const a=C.apps[i]||{name:'',url:'',icon:''};
  open(`<h2>${i<0?'Add quick app':'Edit quick app'}</h2>
  <label>Name<input type="text" id="an" value="${esc(a.name)}"></label>
  <label>URL<input type="text" id="au" value="${esc(a.url)}" placeholder="example.com"></label>
  <label>Icon (emoji or image URL)<input type="text" id="ai" value="${esc(a.icon)}" placeholder="blank = site favicon"></label>
  <div class="row"><button class="pri" id="as">Save</button>${i>=0?'<button id="ad">Delete</button>':''}<button id="ax">Cancel</button></div>`);
  $('#as').onclick=()=>{const n={name:$('#an').value.trim()||'App',url:$('#au').value.trim()||'example.com',icon:$('#ai').value.trim()};i<0?C.apps.push(n):C.apps[i]=n;save();grid();dlg.close()};
  if(i>=0)$('#ad').onclick=()=>{C.apps.splice(i,1);save();grid();dlg.close()};
  $('#ax').onclick=()=>dlg.close();
}
const S=[['Identity'],['Site name','name','text'],['Logo font','fontLogo','sel',Object.keys(F)],['Interface font','fontUi','sel',Object.keys(F)],
['Colors'],['Accent','accent','color'],['Background','bg','color'],['Tiles','card','color'],['Text','text','color'],
['Layout'],['Columns','cols','range',[2,8,1]],['Tile size','tile','range',[64,160,2]],['Corner radius','radius','range',[0,24,1]],['Show tile labels','labels','check'],
['Background image'],['Image URL','bgimg','text'],['Dim','dim','range',[0,90,1]],['Blur','blur','range',[0,20,1]],
['Search'],['Engine','engine','sel',[...Object.keys(E),'custom']],['Custom URL (use %s for the query)','custom','text'],
['Behaviour'],['Open links in a new tab','newtab','check'],['Show shortcut hint','hint','check'],['Show clock','clock','check'],
['Advanced'],['Custom CSS','css','area']];
function sets(){
  open('<h2>Settings</h2>'+S.map(([l,k,t,o])=>{
    if(!k)return`<h3>${l}</h3>`;
    const v=esc(C[k]);let f;
    if(t==='sel')f=`<select data-k="${k}">${o.map(x=>`<option${x===C[k]?' selected':''}>${x}</option>`).join('')}</select>`;
    else if(t==='range')f=`<input type="range" data-k="${k}" min="${o[0]}" max="${o[1]}" step="${o[2]}" value="${v}">`;
    else if(t==='check')f=`<input type="checkbox" data-k="${k}"${C[k]?' checked':''}>`;
    else if(t==='area')return`<label class="col">${l}<textarea data-k="${k}" spellcheck="false">${v}</textarea></label>`;
    else f=`<input type="${t}" data-k="${k}" value="${v}">`;
    return`<label>${l}${f}</label>`}).join('')+
  `<h3>Backup</h3><div class="row"><button id="ex">Export</button><button id="im">Import</button><button id="rs">Reset all</button><button class="pri" id="cl">Done</button></div><input type="file" id="fi" accept=".json" hidden>`);
  $('#cl').onclick=()=>dlg.close();
  $('#ex').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(C,null,2)],{type:'application/json'}));a.download='peanut_cloud_settings.json';a.click()};
  $('#im').onclick=()=>$('#fi').click();
  $('#fi').onchange=e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{try{C={...D,...JSON.parse(t)};save();apply();grid();sets()}catch{alert('That file is not a valid settings export.')}})};
  $('#rs').onclick=()=>{if(confirm('Reset all settings and apps to defaults?')){C={...D};save();apply();grid();sets()}};
}
dlg.addEventListener('input',e=>{const k=e.target.dataset.k;if(!k)return;
  const t=e.target.type;C[k]=t==='checkbox'?e.target.checked:t==='range'?Number(e.target.value):e.target.value;save();apply()});
function pal(){
  const cmds=[{n:'Open settings',r:sets},{n:'Toggle edit mode',r:toggleEdit},{n:'Add quick app',r:()=>appDlg(-1)},...Object.keys(E).map(k=>({n:'Search engine: '+k,r:()=>{C.engine=k;save()}}))];
  const all=[...C.apps.map(a=>({n:a.name,s:a.url,r:()=>go(a.url)})),...cmds.map(c=>({...c,s:'command'}))];
  open('<input type="search" id="pq" placeholder="Type a command, app or search…" autocomplete="off"><ul id="pl"></ul>');
  let list=[],sel=0;const pq=$('#pq'),pl=$('#pl');
  const draw=()=>{const q=pq.value.trim().toLowerCase();
    list=all.filter(x=>x.n.toLowerCase().includes(q));
    if(q)list.push({n:`Search the web for “${pq.value.trim()}”`,s:'',r:()=>go(eng().replace('%s',encodeURIComponent(pq.value.trim())))});
    sel=Math.min(sel,list.length-1);
    pl.innerHTML=list.map((x,i)=>`<li class="${i===sel?'on':''}" data-i="${i}"><span>${esc(x.n)}</span><small>${esc(x.s)}</small></li>`).join('')};
  const run=i=>{const x=list[i];if(!x)return;dlg.close();setTimeout(x.r,0)};
  pq.oninput=()=>{sel=0;draw()};
  pq.onkeydown=e=>{if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,list.length-1);draw()}
    else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);draw()}
    else if(e.key==='Enter')run(sel)};
  pl.onclick=e=>{const li=e.target.closest('li');if(li)run(+li.dataset.i)};
  draw();pq.focus();
}
function toggleEdit(){editing=!editing;document.body.classList.toggle('editing',editing);$('#edit').textContent=editing?'Done':'Edit';grid()}
$('#edit').onclick=toggleEdit;
$('#fs').onclick=e=>{e.preventDefault();sets()};
$('#fp').onclick=e=>{e.preventDefault();pal()};
$('#fc').onclick=e=>{e.preventDefault();open(`<h2>Credits</h2><p>${esc(C.name)} is a customizable start page. Layout inspired by fern. Site icons come from Google’s favicon service; fonts from Google Fonts.</p><div class="row"><button class="pri" onclick="dlg.close()">Close</button></div>`)};
$('#q').addEventListener('keydown',e=>{if(e.key!=='Enter')return;const v=e.target.value.trim();if(!v)return;
  go(/^https?:\/\//i.test(v)||/^[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(v)?v:eng().replace('%s',encodeURIComponent(v)))});
addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&['y','k'].includes(e.key.toLowerCase())){e.preventDefault();dlg.open?dlg.close():pal()}
  else if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&!dlg.open){e.preventDefault();$('#q').focus()}});
window.dlg=dlg;apply();grid();
})();
