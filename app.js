'use strict';

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

const dialog=document.querySelector('#quiz-dialog');
const content=document.querySelector('#quiz-content');
let quizStep=0;
let opener=null;
const answers={size:'До 30 рабочих мест',from:'',to:'',date:'',services:[]};
const services=['Перевозка имущества','Погрузка и выгрузка','Упаковка и маркировка','Разборка и сборка мебели','Работа с архивами','Такелаж тяжёлых предметов'];

function collectAnswers() {
  if(quizStep===0) answers.size=content.querySelector('input[name=size]:checked')?.value || answers.size;
  if(quizStep===1) {
    answers.from=content.querySelector('#from').value.trim();
    answers.to=content.querySelector('#to').value.trim();
    answers.date=content.querySelector('#date').value;
  }
  if(quizStep===2) answers.services=[...content.querySelectorAll('input[name=service]:checked')].map(input=>input.value);
}

function renderQuiz(focus=true) {
  document.querySelectorAll('.quiz-progress span').forEach((segment,index)=>segment.classList.toggle('filled',index<=quizStep));
  let heading,description,fields;
  if(quizStep===0) {
    heading='Какой офис переезжает?';
    description='Начнём с масштаба. Точный объём имущества можно уточнить позже.';
    fields=`<fieldset><legend>Количество рабочих мест</legend>${['До 30 рабочих мест','От 31 до 150 рабочих мест','Более 150 рабочих мест','Пока не знаю'].map(size=>`<label class="choice"><input type="radio" name="size" value="${size}" ${answers.size===size?'checked':''}>${size}</label>`).join('')}</fieldset>`;
  } else if(quizStep===1) {
    heading='Откуда и куда?';
    description='Для знакомства с формой можно указать условные адреса. Дату разрешается оставить открытой.';
    fields=`<div class="field"><label for="from">Откуда переезжаем</label><input id="from" name="from" autocomplete="off" maxlength="180" required value="${escapeHTML(answers.from)}" placeholder="Город, улица или бизнес-центр"></div><div class="field"><label for="to">Куда переезжаем</label><input id="to" name="to" autocomplete="off" maxlength="180" required value="${escapeHTML(answers.to)}" placeholder="Город, улица или бизнес-центр"></div><div class="field"><label for="date">Желаемая дата — необязательно</label><input type="date" id="date" name="date" value="${escapeHTML(answers.date)}"><p class="field-hint">В рабочей версии доступность даты подтвердит логист.</p></div>`;
  } else if(quizStep===2) {
    heading='Какие услуги нужны?';
    description='Выберите нужные услуги или оставьте выбор на обсуждение с логистом.';
    fields=`<fieldset><legend>Состав работ — можно выбрать несколько</legend>${services.map(service=>`<label class="choice"><input type="checkbox" name="service" value="${service}" ${answers.services.includes(service)?'checked':''}>${service}</label>`).join('')}</fieldset><p class="field-hint">Отключение и подключение техники — силами заказчика переезда. Хранение пока не включаем: собственного склада нет.</p>`;
  } else {
    heading='Сводка запроса';
    description='Так может выглядеть сводка для посетителя вашего сайта. В этом примере данные не отправляются.';
    const date=answers.date?new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${answers.date}T12:00:00Z`)):'Уточним при обсуждении';
    fields=`<dl class="summary-list"><div><dt>Масштаб</dt><dd>${escapeHTML(answers.size)}</dd></div><div><dt>Маршрут</dt><dd>${escapeHTML(answers.from)} → ${escapeHTML(answers.to)}</dd></div><div><dt>Дата</dt><dd>${escapeHTML(date)}</dd></div><div><dt>Работы</dt><dd>${answers.services.length?answers.services.map(escapeHTML).join(', '):'Обсудим с логистом'}</dd></div></dl><div class="summary-next"><strong>А что будет на рабочем сайте?</strong>После сводки — контакт и согласие на обработку данных. Затем логист уточнит задачу; для крупного объекта согласует осмотр. Срок ответа согласуем с вами перед запуском.</div>`;
  }
  content.innerHTML=`<p class="quiz-step-label">Шаг ${quizStep+1} из 4</p><h2 id="quiz-title" class="quiz-title" tabindex="-1">${heading}</h2><p class="quiz-description">${description}</p><form id="quiz-form"><div class="quiz-fields">${fields}</div><div class="quiz-actions">${quizStep>0?'<button type="button" id="quiz-back" class="button secondary">Назад</button>':'<span></span>'}<button type="${quizStep===3?'button':'submit'}" id="quiz-next" class="button primary">${quizStep===3?'Завершить демо':quizStep===2?'Посмотреть итог':'Далее'}</button></div></form>`;
  content.querySelector('#quiz-back')?.addEventListener('click',()=>{collectAnswers();quizStep--;renderQuiz()});
  if(quizStep===3) content.querySelector('#quiz-next').addEventListener('click',()=>{dialog.close();document.dispatchEvent(new CustomEvent('moveit-demo-complete'))});
  else content.querySelector('#quiz-form').addEventListener('submit',event=>{
    event.preventDefault();
    if(quizStep===1) {
      for(const id of ['from','to']) {
        const input=content.querySelector(`#${id}`);
        input.setCustomValidity(input.value.trim()?'':'Укажите город, улицу или название бизнес-центра.');
        if(!input.reportValidity()) return;
      }
    }
    collectAnswers();quizStep++;renderQuiz();
  });
  content.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>input.setCustomValidity('')));
  dialog.scrollTop=0;
  if(focus) content.querySelector('#quiz-title').focus({preventScroll:true});
}

function openQuiz(button) {opener=button;quizStep=0;renderQuiz(false);dialog.showModal();content.querySelector('#quiz-title').focus();}
document.querySelectorAll('[data-open-quiz]').forEach(button=>button.addEventListener('click',()=>openQuiz(button)));
document.addEventListener('moveit-open-quiz',event=>openQuiz(event.detail.opener));
document.querySelector('#close-quiz').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{collectAnswers();if(opener?.isConnected)opener.focus();else document.querySelector('#stage-panel')?.focus({preventScroll:true})});
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) dialog.close()}});
