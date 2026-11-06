'use strict';

let persona = 'small';
let stage = 0;
let visited = new Set([0]);
let completed = false;
const panel = document.querySelector('#stage-panel');
const stations = document.querySelector('.stations');
const safe = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icons = [
  '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.1M10 6.5h.1"/>',
  '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9"/>',
  '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h3"/>',
  '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m4 17 5-5 4 4 3-3 5 4"/><circle cx="16" cy="9" r="1.5"/>',
  '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="10" cy="18" r="2"/>',
  '<path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/>',
  '<path d="M20 11c0 5-4 8-9 8H4l1-4c-1-1-2-3-2-4 0-5 4-8 9-8s8 3 8 8Z"/><path d="M8 10h8M8 14h5"/>'
];

function drawRoute() {
  const buttons = [...stations.querySelectorAll('button')];
  const columns = stations.clientWidth > 650 ? 4 : 2;
  stations.style.gridTemplateColumns = `repeat(${columns},minmax(0,1fr))`;
  buttons.forEach((button,index)=>{
    const row = Math.floor(index/columns);
    button.style.gridRow = row+1;
    button.style.gridColumn = row%2===0 ? index%columns+1 : columns-index%columns;
  });
  const map = document.querySelector('.route-map');
  const svg = document.querySelector('.route-lines');
  const bounds = map.getBoundingClientRect();
  svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
  svg.querySelectorAll('.route-segment,.route-line').forEach(path=>path.remove());
  buttons.slice(0,-1).forEach((button,index)=>{
    const a = button.getBoundingClientRect();
    const b = buttons[index+1].getBoundingClientRect();
    let x1=a.left-bounds.left+a.width/2, y1=a.top-bounds.top+a.height/2;
    let x2=b.left-bounds.left+b.width/2, y2=b.top-bounds.top+b.height/2;
    if(Math.abs(y1-y2)<5) {
      const direction=x2>x1?1:-1;
      x1+=direction*(a.width/2+3);x2-=direction*(b.width/2+7);
    } else {y1+=a.height/2+3;y2-=b.height/2+7;}
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',`M${x1} ${y1} L${x2} ${y2}`);
    path.setAttribute('class','route-segment');
    path.setAttribute('marker-end','url(#route-arrow)');
    svg.append(path);
  });
}

function renderStage() {
  const data=audienceData[persona].stages[stage];
  const preview=routePreviews[persona][stage];
  document.querySelectorAll('[data-stage]').forEach((button,index)=>{
    button.setAttribute('aria-selected',String(index===stage));
    button.tabIndex=index===stage?0:-1;
    button.classList.toggle('visited',visited.has(index)&&index!==stage);
    button.querySelector('.station-state').textContent=visited.has(index)&&index!==stage?'✓':'';
  });
  panel.setAttribute('aria-labelledby',`stage-tab-${stage}`);
  document.querySelector('#route-position').textContent=data.label;
  document.querySelector('#route-back').disabled=stage===0;
  panel.innerHTML=`<div class="walkthrough-screen"><div class="preview-toolbar"><strong>Move IT</strong><span>Пример блока вашего сайта</span></div><div class="preview-page"><p class="preview-context">${persona==='small'?'Небольшой офис':'Крупный объект'}</p><h3>${safe(data.title)}</h3><ul class="preview-points">${preview.points.map(point=>`<li>${safe(point)}</li>`).join('')}</ul><button class="button preview-next" type="button" id="route-next">${safe(completed&&stage===7?'Посмотреть дальнейшие шаги':preview.action)} <span aria-hidden="true">→</span></button>${completed?'<p class="route-complete" role="status">Пример маршрута пройден. Дальше — общение с вашей командой.</p>':''}</div></div>
    <aside class="walkthrough-reason"><span class="mini-label">Что думает посетитель</span><p class="visitor-thought">${safe(data.objection)}</p><h4>Что разбираем этим блоком</h4><p>${safe(preview.explanation)}</p><details class="stage-more"><summary>Подробнее об этом блоке</summary><div class="stage-explanation"><div><span class="mini-label">Что предлагаем показать</span><p>${safe(data.show)}</p></div><div><span class="mini-label">Что у вас уже есть и что уточнить</span><p>${safe(data.evidence)}</p></div><div><span class="mini-label">Следующий вопрос посетителя</span><p>${safe(data.next)}</p></div></div></details></aside>`;
  const previous=document.createElement('button');
  previous.type='button';previous.className='button preview-back';previous.textContent='Назад';previous.setAttribute('aria-label','Предыдущий экран');previous.disabled=stage===0;
  previous.addEventListener('click',()=>{if(stage>0){stage--;renderStage();panel.scrollIntoView({block:'start'});}});
  document.querySelector('#route-next').before(previous);
  document.querySelector('#route-next').addEventListener('click',event=>{
    if(preview.form&&!completed) document.dispatchEvent(new CustomEvent('moveit-open-quiz',{detail:{opener:event.currentTarget}}));
    else if(stage<7) {visited.add(stage);stage++;visited.add(stage);renderStage();document.querySelector('#route-next').focus({preventScroll:true});}
    else {completed=true;renderStage();document.querySelector('#after-request').scrollIntoView({block:'start'});}
  });
}

function renderStations() {
  stations.innerHTML=audienceData[persona].stages.map((item,index)=>`<button type="button" id="stage-tab-${index}" role="tab" aria-selected="${index===stage}" aria-controls="stage-panel" data-stage="${index}" tabindex="${index===stage?0:-1}"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[index]}</svg><span class="station-label">${safe(item.label)}</span><span class="station-state" aria-hidden="true"></span></button>`).join('');
  const buttons=[...stations.querySelectorAll('button')];
  buttons.forEach((button,index)=>{
    button.addEventListener('click',()=>{stage=index;visited.add(stage);renderStage();panel.scrollIntoView({block:'start'})});
    button.addEventListener('keydown',event=>{
      let next=index;
      if(['ArrowDown','ArrowRight'].includes(event.key)) next=(index+1)%buttons.length;
      else if(['ArrowUp','ArrowLeft'].includes(event.key)) next=(index+buttons.length-1)%buttons.length;
      else if(event.key==='Home') next=0;
      else if(event.key==='End') next=buttons.length-1;
      else return;
      event.preventDefault();stage=next;visited.add(stage);renderStage();buttons[next].focus();
    });
  });
  drawRoute();
}

function renderAudience() {
  const data=audienceData[persona];
  document.querySelectorAll('[data-persona]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.persona===persona)));
  document.querySelector('#persona-note').textContent=persona==='small'?'Акцент: нужные услуги, понятный расчёт и минимум подготовки.':'Акцент: сопоставимый опыт, план и ответственные за переезд.';
  document.querySelector('#audience-focus').innerHTML=`<details class="audience-expand"><summary>Ваши сильные стороны и акценты для этого сценария</summary><div class="audience-columns"><div><h4>Ваши сильные стороны</h4><ul>${data.strengths.map(strength=>`<li>${safe(strength)}</li>`).join('')}</ul></div><div><h4>На чём делаем акцент</h4><p>${safe(data.emphasis)}</p></div></div><div class="audience-gap"><strong>Что предлагаем подготовить вместе с вами</strong><p>${safe(data.gap)}</p></div></details>`;
  document.querySelector('#after-request').innerHTML=`<h3>Что происходит после обращения</h3><p>Следующие шаги уже с вашей командой. Нажмите на этап, чтобы посмотреть подробности.</p><div class="after-cards">${data.after.map(item=>`<details><summary>${safe(item[0])}<span aria-hidden="true">↗</span></summary><p>${safe(item[1])}</p></details>`).join('')}</div>`;
  renderStations();renderStage();
}

function restartRoute() {stage=0;visited=new Set([0]);completed=false;renderAudience();}
document.querySelectorAll('[data-persona]').forEach(button=>button.addEventListener('click',()=>{persona=button.dataset.persona;restartRoute()}));
document.querySelector('#route-back').addEventListener('click',()=>{if(stage>0){stage--;renderStage()}});
document.querySelector('#route-reset').addEventListener('click',restartRoute);
document.addEventListener('moveit-demo-complete',()=>{stage=7;visited.add(stage);completed=true;renderStage();requestAnimationFrame(()=>panel.scrollIntoView({block:'start'}))});
function revealBackground() {
  const target=document.getElementById(location.hash.slice(1));
  const details=target?.closest('.project-details');
  if(details){details.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}
}
document.querySelectorAll('.contents a').forEach(link=>link.addEventListener('click',()=>{
  const target=document.querySelector(link.getAttribute('href'));
  const details=target?.closest('.project-details');
  if(details) details.open=true;
}));
window.addEventListener('hashchange',revealBackground);
renderAudience();
new ResizeObserver(()=>requestAnimationFrame(drawRoute)).observe(stations);
revealBackground();
