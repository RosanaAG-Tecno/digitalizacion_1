/* Guías animadas independientes, compatibles con GitHub Pages sin conexión. */
const guides={
 archivos:[
 ['Abre el Explorador','Pulsa Windows + E o busca el icono de carpeta.','📁 Explorador de archivos'],
 ['Entra en Documentos','Selecciona Documentos en el panel lateral.','Este equipo › Documentos'],
 ['Crea una carpeta','Pulsa Nuevo → Carpeta. Escribe Curso 26-27.','＋ Nuevo → Carpeta · Curso 26-27'],
 ['Crea una subcarpeta','Entra en Curso 26-27 y crea Digitalización.','📁 Curso 26-27 › 📁 Digitalización'],
 ['Guarda tu documento','En Word usa Archivo → Guardar como y elige la carpeta creada.','💾 Practica_01.docx']
 ],
 onedrive:[
 ['Abre OneDrive','Entra en Microsoft 365 con tu cuenta educativa y abre OneDrive.','☁ OneDrive · Mis archivos'],
 ['Crea la carpeta del curso','Pulsa Nuevo (o Agregar nuevo) → Carpeta y escribe Curso 26-27.','＋ Nuevo → Carpeta'],
 ['Crea otra carpeta dentro','Abre Curso 26-27 y crea Digitalización.','📁 Curso 26-27 › 📁 Digitalización'],
 ['Carga el documento','Abre Digitalización, pulsa Cargar → Archivos y elige Practica_01.docx.','↑ Cargar → Archivos'],
 ['Comprueba el resultado','Verifica que Practica_01.docx aparece en la carpeta y puede abrirse.','☁ 📄 Practica_01.docx']
 ]
};
const guideType=document.body.dataset.page==='archivos.html'?'archivos':'onedrive';
let guideIndex=0,guideTimer=null;
function guideRender(){const items=guides[guideType],s=items[guideIndex];const $=id=>document.getElementById(id);$('guideCount').textContent=String(guideIndex+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');$('guideStep').textContent='Paso '+(guideIndex+1)+' de '+items.length;$('guideTitle').textContent=s[0];$('guideText').textContent=s[1];$('guideFrame').innerHTML='';let top=document.createElement('div');top.className='demo-visual-title';top.textContent=guideType==='archivos'?'Explorador de archivos · ejemplo visual':'OneDrive · ejemplo visual';let visual=document.createElement('div');visual.style.cssText='background:#f5fbff;padding:45px 15px;min-height:170px;display:grid;place-items:center;text-align:center';let item=document.createElement('strong');item.className='demo-glow';item.textContent=s[2];item.style.cssText='font-size:15px;padding:13px;';visual.append(item);$('guideFrame').append(top,visual);$('guideBar').style.width=(guideIndex+1)*100/items.length+'%';$('guideBack').disabled=guideIndex===0;$('guideNext').disabled=guideIndex===items.length-1;}
function guideMove(n){guideIndex=Math.max(0,Math.min(guides[guideType].length-1,guideIndex+n));guideRender()}
function guidePause(){if(guideTimer)clearInterval(guideTimer);guideTimer=null;document.getElementById('guidePlay').textContent='▶ Reproducir'}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('guideBack').onclick=()=>guideMove(-1);document.getElementById('guideNext').onclick=()=>guideMove(1);document.getElementById('guidePlay').onclick=()=>{if(guideTimer)return guidePause();if(guideIndex===guides[guideType].length-1)guideIndex=0;guideRender();document.getElementById('guidePlay').textContent='⏸ Pausar';guideTimer=setInterval(()=>{if(guideIndex>=guides[guideType].length-1)return guidePause();guideMove(1)},2800)};guideRender()});
