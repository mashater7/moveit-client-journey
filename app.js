'use strict';

const journeys = {
  small: [
    { question: '«Вы поможете перевезти наш небольшой офис?»', goal: 'Узнать в предложении свою задачу. Понять, что здесь можно заказать и перевозку, и подготовку вещей.', screen: 'На первом экране — офисные переезды по Москве и области, состав работ и один заметный переход к расчёту.', title: 'Офисные переезды по Москве и области', body: 'Перечень основных работ: перевозка, упаковка, разборка и сборка мебели.', outcome: 'Клиент понимает профиль компании и остаётся на странице.' },
    { question: '«Вы уже делали что-то похожее?»', goal: 'Убедиться, что за предложением стоит реальная команда и опыт работы с офисным имуществом.', screen: 'Показываем кейсы с задачами и процессом, фото упаковки, маркировки и сборки. Дополняем примерами небольших офисов.', title: 'Примеры выполненных работ', body: 'Описание выполненных работ с архивами, мебелью и техникой.', outcome: 'Клиент видит доказательства компетенции, а не только большие имена.' },
    { question: '«Как понять, во сколько это обойдётся?»', goal: 'Получить ориентир по модели расчёта и увидеть, какие работы и материалы считаются отдельно.', screen: 'Для небольших объёмов объясняем почасовую оплату и минимум 4 часа. После уточнения тарифов показываем пример сметы и доплаты.', title: 'Понятная почасовая модель', body: 'Основные составляющие: машина, специалисты и время. Отдельно — упаковка, доставка материалов и дополнительные работы.', outcome: 'Клиент понимает принцип цены. Спорные ставки не превращаются в обещание.' },
    { question: '«Что подготовить мне, а что сделаете вы?»', goal: 'Разделить обязанности и убрать тревогу о забытых вещах, мебели и упаковке.', screen: 'Показываем этапы: согласуем объём → подготовим упаковку → разберём и промаркируем → перевезём → соберём и уберём упаковочный мусор.', title: 'Порядок работ и обязанности сторон', body: 'Состав работ и подготовка со стороны заказчика. Отключение техники и серверов выполняет клиент.', outcome: 'Понятно, где заканчивается работа компании и начинается подготовка клиента.' },
    { question: '«Можно просто рассказать, что нам нужно?»', goal: 'Описать задачу без сложной анкеты и обязательной точной описи на старте.', screen: 'Четыре коротких шага: масштаб → маршрут и дата → услуги → проверка запроса. Контакт запрашиваем после контекста.', title: 'Короткая форма запроса', body: 'Сколько рабочих мест? Откуда и куда? Что нужно сделать? Детали уточнит логист.', outcome: 'В запросе есть исходные данные, с которых логист сможет начать обсуждение.' },
    { question: '«Я оставил запрос. Что теперь?»', goal: 'Знать, что заявка принята, кто продолжит разговор и что ещё нужно уточнить.', screen: 'Предлагаем экран подтверждения со сводкой, контактом логиста и следующим действием. Срок ответа согласуем с командой.', title: 'Подтверждение запроса и связь с логистом', body: 'Объяснение того, как логист уточняет объём и условия перед согласованием работ и расчёта.', outcome: 'Пользователь не остаётся с безличным «Спасибо» и неизвестным ожиданием.' }
  ],
  large: [
    { question: '«Есть ли опыт переездов такого масштаба?»', goal: 'Сразу увидеть специализацию на корпоративных объектах и способность работать с большим объёмом.', screen: 'На первом экране — корпоративные переезды, комплекс работ и переход к обсуждению объекта. Опыт крупных проектов виден сразу.', title: 'Организация корпоративных переездов', body: 'Офисы, подразделения, архивы и имущество организаций. На странице объясняем состав работ и порядок оценки объекта.', outcome: 'Посетитель понимает, что компания работает с корпоративными объектами, и может посмотреть примеры проектов.' },
    { question: '«Какой сопоставимый опыт у вас есть?»', goal: 'Найти доказательства работы с крупными офисами, учреждениями и сложной координацией.', screen: 'Раскрываем кейсы М.Видео, Мосинжпроекта и Главархива. Для каждого нужны реальные объёмы, ограничения, этапы и результат.', title: 'Опыт крупных объектов', body: 'В портфолио — штаб-квартира М.Видео в Сколково и работа с документацией Главархива Москвы.', outcome: 'Клиент получает аргументы для внутреннего обсуждения и выбора подрядчика.' },
    { question: '«Как получить смету, с которой можно работать?»', goal: 'Понять состав оценки и подготовить данные для закупки или согласования бюджета.', screen: 'Крупные переезды оцениваются индивидуально после выезда. Объясняем, что войдёт в смету, как учтём упаковку, доступ и тяжёлые предметы.', title: 'Индивидуальная смета после осмотра', body: 'Объём имущества, условия доступа, этапность и дополнительные работы. Все составляющие обсуждаем до переезда.', outcome: 'Клиент понимает, почему точную стоимость крупного проекта нельзя назвать одним числом.' },
    { question: '«Как согласовать людей, имущество и сроки?»', goal: 'Увидеть управляемый процесс и границы ответственности каждой стороны.', screen: 'Предлагаем раскрыть обследование, план этапов, маркировку по подразделениям, координацию и приёмку. Работу бригадира согласуем под объект.', title: 'Планирование и этапы переезда', body: 'Порядок согласования этапов, имущества и доступа. Подключение IT-инфраструктуры выполняет команда клиента.', outcome: 'Сайт показывает организацию работ, не обещая неподтверждённое отсутствие простоя.' },
    { question: '«Что вам нужно для начала обсуждения?»', goal: 'Передать достаточно контекста для первого разговора без составления полного технического задания.', screen: 'Указываем масштаб, маршрут, дату и состав услуг. В рабочей версии можно добавить необязательное приложение ТЗ или описи.', title: 'Исходные данные об объекте', body: 'Основные услуги, масштаб и особенности объекта. Подробности уточняются в разговоре с логистом.', outcome: 'Логист получает данные для первого разговора. Возможность приложить техническое задание можно добавить позже.' },
    { question: '«Как перейти от заявки к предложению?»', goal: 'Понимать следующий этап закупки и ответственного за обсуждение объекта.', screen: 'Предлагаем: подтверждение → разговор с логистом → согласование осмотра → смета и документы. Без выдуманного срока подготовки КП.', title: 'Порядок подготовки сметы', body: 'Последовательность: уточнение задачи, осмотр, расчёт с согласованным составом работ.', outcome: 'Посетителю понятны порядок обсуждения объекта и подготовки расчёта.' }
  ]
};

let persona = 'small';
let stage = 0;
const stageButtons = [...document.querySelectorAll('[data-stage]')];
const panel = document.querySelector('#stage-panel');
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function renderJourney() {
  const data = journeys[persona][stage];
  stageButtons.forEach((button,index) => {
    button.setAttribute('aria-selected',String(index===stage));
    button.tabIndex=index===stage?0:-1;
  });
  panel.setAttribute('aria-labelledby',`stage-tab-${stage}`);
  panel.innerHTML=`<div class="stage-overline"><span>Вопрос посетителя</span><span>0${stage+1} / 06</span></div><h3 class="stage-question">${data.question}</h3><div class="stage-explanation"><div><span class="mini-label">Что нужно понять посетителю</span><p>${data.goal}</p></div><div><span class="mini-label">Что предлагаем разместить на сайте</span><p>${data.screen}</p></div></div><div class="block-example"><span class="mini-label">Тема блока</span><h3>${data.title}</h3><p>${data.body}</p></div><div class="stage-outcome"><p><strong>Зачем этот этап:</strong> ${data.outcome}</p></div>`;
}

stageButtons.forEach((button,index) => {
  button.addEventListener('click',()=>{stage=index;renderJourney()});
  button.addEventListener('keydown',event=>{
    let next=index;
    if(['ArrowDown','ArrowRight'].includes(event.key)) next=(index+1)%6;
    else if(['ArrowUp','ArrowLeft'].includes(event.key)) next=(index+5)%6;
    else if(event.key==='Home') next=0;
    else if(event.key==='End') next=5;
    else return;
    event.preventDefault();stage=next;renderJourney();stageButtons[next].focus();
  });
});
document.querySelectorAll('[data-persona]').forEach(button=>button.addEventListener('click',()=>{
  persona=button.dataset.persona;
  document.querySelectorAll('[data-persona]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  document.querySelector('#persona-note').textContent=persona==='small'?'Нужны ориентир по цене и понятный состав работ.':'Нужны сопоставимый опыт, план проекта и индивидуальная смета.';
  renderJourney();
}));
renderJourney();

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
    fields=`<fieldset><legend>Состав работ — можно выбрать несколько</legend>${services.map(service=>`<label class="choice"><input type="checkbox" name="service" value="${service}" ${answers.services.includes(service)?'checked':''}>${service}</label>`).join('')}</fieldset><p class="field-hint">Отключение и подключение техники — силами клиента. Хранение пока не включаем: собственного склада нет.</p>`;
  } else {
    heading='Сводка запроса';
    description='Вот что увидит клиент перед передачей запроса. Здесь ничего не отправляется.';
    const date=answers.date?new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${answers.date}T12:00:00Z`)):'Уточним при обсуждении';
    fields=`<dl class="summary-list"><div><dt>Масштаб</dt><dd>${escapeHTML(answers.size)}</dd></div><div><dt>Маршрут</dt><dd>${escapeHTML(answers.from)} → ${escapeHTML(answers.to)}</dd></div><div><dt>Дата</dt><dd>${escapeHTML(date)}</dd></div><div><dt>Работы</dt><dd>${answers.services.length?answers.services.map(escapeHTML).join(', '):'Обсудим с логистом'}</dd></div></dl><div class="summary-next"><strong>А что будет на рабочем сайте?</strong>После сводки — контакт и согласие на обработку данных. Затем логист уточнит задачу; для крупного объекта согласует осмотр. Точный срок ответа закрепим перед запуском.</div>`;
  }
  content.innerHTML=`<p class="quiz-step-label">Шаг ${quizStep+1} из 4</p><h2 id="quiz-title" class="quiz-title" tabindex="-1">${heading}</h2><p class="quiz-description">${description}</p><form id="quiz-form"><div class="quiz-fields">${fields}</div><div class="quiz-actions">${quizStep>0?'<button type="button" id="quiz-back" class="button secondary">Назад</button>':'<span></span>'}<button type="${quizStep===3?'button':'submit'}" id="quiz-next" class="button primary">${quizStep===3?'Завершить демо':quizStep===2?'Посмотреть итог':'Далее'}</button></div></form>`;
  content.querySelector('#quiz-back')?.addEventListener('click',()=>{collectAnswers();quizStep--;renderQuiz()});
  if(quizStep===3) content.querySelector('#quiz-next').addEventListener('click',()=>dialog.close());
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

document.querySelectorAll('[data-open-quiz]').forEach(button=>button.addEventListener('click',()=>{
  opener=button;quizStep=0;renderQuiz(false);dialog.showModal();content.querySelector('#quiz-title').focus();
}));
document.querySelector('#close-quiz').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{collectAnswers();opener?.focus()});
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) dialog.close()}});
