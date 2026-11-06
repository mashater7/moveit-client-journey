'use strict';

let persona = 'small';
let stage = 0;
const panel = document.querySelector('#stage-panel');
const stations = document.querySelector('.stations');
const safe = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function renderStage() {
  const stages = audienceData[persona].stages;
  const data = stages[stage];
  document.querySelectorAll('[data-stage]').forEach((button,index) => {
    button.setAttribute('aria-selected',String(index===stage));
    button.tabIndex = index===stage ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby',`stage-tab-${stage}`);
  panel.innerHTML = `<div class="stage-overline"><span>Вопрос посетителя</span><span>${String(stage+1).padStart(2,'0')} / ${String(stages.length).padStart(2,'0')}</span></div>
    <h3 class="stage-question">${safe(data.question)}</h3>
    <div class="objection"><strong>Какое возражение разбираем</strong><p>${safe(data.objection)}</p></div>
    <div class="block-example"><span class="mini-label">Блок сайта</span><h4>${safe(data.title)}</h4><p>${safe(data.block)}</p></div>
    <div class="stage-explanation"><div><span class="mini-label">Что в нём показываем</span><p>${safe(data.show)}</p></div>
    <div><span class="mini-label">На чём основан ответ</span><p>${safe(data.evidence)}</p></div>
    <div><span class="mini-label">Зачем нужен именно этот блок</span><p>${safe(data.body)}</p></div></div>
    <div class="stage-outcome"><strong>Куда человек идёт дальше</strong><p>${safe(data.next)}</p></div>`;
}

function renderStations() {
  const stages = audienceData[persona].stages;
  stations.innerHTML = stages.map((item,index)=>`<button type="button" id="stage-tab-${index}" role="tab" aria-selected="${index===stage}" aria-controls="stage-panel" data-stage="${index}" tabindex="${index===stage?0:-1}"><span>${String(index+1).padStart(2,'0')}</span>${safe(item.label)}</button>`).join('');
  const buttons = [...stations.querySelectorAll('button')];
  buttons.forEach((button,index)=>{
    button.addEventListener('click',()=>{stage=index;renderStage()});
    button.addEventListener('keydown',event=>{
      let next=index;
      if(['ArrowDown','ArrowRight'].includes(event.key)) next=(index+1)%stages.length;
      else if(['ArrowUp','ArrowLeft'].includes(event.key)) next=(index+stages.length-1)%stages.length;
      else if(event.key==='Home') next=0;
      else if(event.key==='End') next=stages.length-1;
      else return;
      event.preventDefault();stage=next;renderStage();buttons[next].focus();
    });
  });
}

function renderAudience() {
  const data=audienceData[persona];
  document.querySelectorAll('[data-persona]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.persona===persona)));
  document.querySelector('#persona-note').textContent=persona==='small'?'Сначала услуги и расчёт, затем похожий заказ и порядок работ.':'Сначала опыт и организация, затем подробный состав и оценка проекта.';
  document.querySelector('#audience-focus').innerHTML=`<h3>${safe(data.heading)}</h3><p class="audience-note">${safe(data.note)}</p><div class="audience-columns"><div><h4>Какие сильные стороны уже есть</h4><ul>${data.strengths.map(strength=>`<li>${safe(strength)}</li>`).join('')}</ul></div><div><h4>На чём делаем акцент</h4><p>${safe(data.emphasis)}</p></div></div><div class="audience-gap"><strong>Чего пока не хватает</strong><p>${safe(data.gap)}</p></div>`;
  document.querySelector('#after-request').innerHTML=`<h3>Что происходит после обращения</h3><p>Здесь заканчивается знакомство с сайтом и начинается работа с командой. Ниже — порядок, который предлагаем описать посетителю и подтвердить с компанией.</p><ol>${data.after.map(item=>`<li><strong>${safe(item[0])}</strong><p>${safe(item[1])}</p></li>`).join('')}</ol>`;
  renderStations();
  renderStage();
}

document.querySelectorAll('[data-persona]').forEach(button=>button.addEventListener('click',()=>{
  persona=button.dataset.persona;
  stage=0;
  renderAudience();
}));
renderAudience();
