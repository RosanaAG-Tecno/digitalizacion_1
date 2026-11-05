
let stage=0;
function winHit(s){
  let pop=q('#winPopup');
  pop.hidden=true;
  const messages={
    papelera:'La Papelera guarda temporalmente los archivos eliminados.',
    explorador:'El Explorador de archivos permite entrar en Documentos y organizar carpetas.',
    word:'Word es un procesador de textos.',
    inicio:'Inicio permite abrir aplicaciones y acceder a opciones de Windows.',
    buscar:'Buscar encuentra aplicaciones, documentos y configuraciones.'
  };
  q('#winFeedback').textContent=messages[s]||'';
  if(s==='inicio'){
    pop.hidden=false;
    pop.innerHTML='<b>⊞ Menú Inicio</b><p>Aplicaciones ancladas</p><button onclick="winHit(\'word\')">▤ Word</button> <button onclick="winHit(\'explorador\')">📁 Explorador</button>'
  }
  if(s==='buscar'){
    pop.hidden=false;
    pop.innerHTML='<label for="winSearch"><b>Buscar aplicaciones</b></label><input id="winSearch" placeholder="Escribe una aplicación..." autocomplete="off"><div id="searchRes"></div>';
    q('#winSearch').focus();
    q('#winSearch').oninput=(e)=>{
      let ok=e.target.value.trim().toLowerCase().includes('word');
      q('#searchRes').innerHTML=ok?'<button onclick="winFound()">▤ Word — Abrir</button>':'<p class="sm">Escribe el nombre del programa.</p>'
    }
  }
}
function winFound(){
  q('#winPopup').hidden=true;
  q('#winFeedback').textContent='✓ Has encontrado Word utilizando la búsqueda de Windows.';
  fb('winChallenge','¡Muy bien! Has buscado y abierto Word en la simulación.',true);
  completed('winsearch')
}
function checkWin(){
  let s=q('input[name="winQ"]:checked');
  let ok=s?.value==='b';
  fb('winCheck',ok?'Correcto. La barra de tareas permite ver y cambiar entre aplicaciones abiertas.':'Revisa la pantalla: la barra de tareas suele estar en la parte inferior.',ok);
  if(ok)completed('winquestion')
}

const winDemo=[
  {
    title:'Reconoce el escritorio y sus iconos',
    text:'Primero identifica el escritorio, que es el espacio de trabajo. En él puedes tener iconos como Papelera, Explorador o Word.',
    step:'desktop'
  },
  {
    title:'Localiza la barra de tareas y el botón Inicio',
    text:'La barra de tareas suele estar en la parte inferior. Desde el botón Inicio accedes a aplicaciones y opciones de Windows.',
    step:'taskbar'
  },
  {
    title:'Usa la búsqueda para encontrar un programa',
    text:'Pulsa Buscar en la barra de tareas y escribe Word en el cuadro de búsqueda para localizar el programa rápidamente.',
    step:'search'
  },
  {
    title:'Abre Word desde los resultados',
    text:'Cuando aparezca Word en los resultados, selecciónalo para abrirlo. Después repite tú mismo los pasos en la práctica.',
    step:'result'
  }
];
let winDemoIndex=0,winDemoTimer=null;

function desktopScene(step){
  return `
  <div class="demo-visual-title">Windows · ejemplo visual</div>
  <div class="wdemo-scene">
    <div class="wdemo-wallpaper"></div>
    <div class="wdemo-icons ${step==='desktop' ? 'focus-icons' : ''}">
      <div class="wdemo-icon ${step==='desktop' ? 'focus-ring' : ''}"><span>🗑️</span><small>Papelera</small></div>
      <div class="wdemo-icon ${step==='desktop' ? 'focus-ring' : ''}"><span>📁</span><small>Explorador</small></div>
      <div class="wdemo-icon ${step==='desktop' ? 'focus-ring' : ''}"><span>📝</span><small>Word</small></div>
    </div>
    <div class="wdemo-taskbar ${step==='taskbar' ? 'focus-ring' : ''}">
      <button class="wdemo-btn ${step==='taskbar' ? 'focus-ring-inner' : ''}">⊞</button>
      <button class="wdemo-btn ${step==='search' ? 'focus-ring-inner' : ''}">🔎 Buscar</button>
      <button class="wdemo-btn">📁</button>
      <button class="wdemo-btn">📝</button>
      <div class="wdemo-clock">Wi‑Fi&nbsp;&nbsp;🔊&nbsp;&nbsp;17:30</div>
    </div>
    ${(step==='search' || step==='result') ? `
      <div class="wdemo-searchpanel ${step==='search' ? 'focus-ring' : ''}">
        <div class="wdemo-searchhead">🔎 Buscar en Windows</div>
        <div class="wdemo-searchbox">Word</div>
        <div class="wdemo-result ${step==='result' ? 'focus-ring' : ''}">
          <div><strong>📝 Word</strong><br><small>Aplicación</small></div>
          <span class="wdemo-open">Abrir</span>
        </div>
      </div>` : ''}
    <div class="wdemo-label">
      ${step==='desktop' ? 'Escritorio con iconos' : step==='taskbar' ? 'Barra de tareas e Inicio' : step==='search' ? 'Búsqueda de programas' : 'Resultado: abrir Word'}
    </div>
  </div>`;
}

function winDemoRender(){
  let s=winDemo[winDemoIndex];
  q('#winDemoCount').textContent=String(winDemoIndex+1).padStart(2,'0')+' / 04';
  q('#winDemoStep').textContent='Paso '+(winDemoIndex+1)+' de 4';
  q('#winDemoTitle').textContent=s.title;
  q('#winDemoText').textContent=s.text;
  q('#winDemoFrame').innerHTML=desktopScene(s.step);
  q('#winDemoBar').style.width=100*(winDemoIndex+1)/4+'%';
  q('#winDemoBack').disabled=winDemoIndex===0;
  q('#winDemoNext').disabled=winDemoIndex===3;
}
function winDemoStepMove(n){winDemoIndex=Math.max(0,Math.min(3,winDemoIndex+n));winDemoRender()}
function winDemoPause(){if(winDemoTimer)clearInterval(winDemoTimer);winDemoTimer=null;q('#winDemoPlay').textContent='▶ Reproducir'}
document.addEventListener('DOMContentLoaded',()=>{
  q('#winDemoBack').onclick=()=>winDemoStepMove(-1);
  q('#winDemoNext').onclick=()=>winDemoStepMove(1);
  q('#winDemoPlay').onclick=()=>{
    if(winDemoTimer)return winDemoPause();
    if(winDemoIndex===3)winDemoIndex=0;
    winDemoRender();
    q('#winDemoPlay').textContent='⏸ Pausar';
    winDemoTimer=setInterval(()=>{if(winDemoIndex===3)return winDemoPause();winDemoStepMove(1)},3200)
  };
  winDemoRender()
});
