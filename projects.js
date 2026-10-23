(() => {
'use strict';
const projects = {
  cv: {
    name: 'CV Screener', type: 'Прототип', title: 'Найдите нужный опыт в резюме',
    situation: 'Откликов много. Чтобы найти конкретный опыт, приходится открывать документы и перечитывать их по одному.',
    input: 'Резюме и другие документы; вопрос о нужных сведениях.',
    output: 'Ответы и сравнение сведений со ссылками на источники. Уточняющий диалог и отчёт по документам.',
    check: 'Смотрите ответ вместе с исходным фрагментом резюме. Решение о найме остаётся за вашим специалистом.',
    application: 'Расскажите, в каких документах вы ищете ответы. Обсудим поиск по вашим материалам и выберем первый сценарий для запуска.',
    disclosure: 'Вымышленные резюме и сохранённые ответы модели.',
    screens: [['cv-search.png','Поиск','Вопрос по коллекции резюме и ответ со ссылками на источники.'],['cv-source.png','Источник','Сохранённый фрагмент резюме для проверки основания ответа.'],['cv-library.png','База документов','Библиотека документов в реальном интерфейсе прототипа.']],
  },
  scope: {
    name: 'ScopeCreepGuard', type: 'Собственная разработка', title: 'Отделяйте новые пожелания от согласованной работы',
    situation: '«Давайте ещё небольшую правку». Объём растёт, а договорённости о сроках и оплате остаются прежними.',
    input: 'Согласованный объём проекта и новая просьба клиента.',
    output: 'Разбор границ проекта, редактируемый ответ клиенту и документ о дополнительных работах.',
    check: 'Используйте разбор при согласовании допработ. Уточните оценку и отправьте клиенту подготовленный ответ.',
    application: 'Расскажите, как вы согласовываете изменения. Подберём сценарий, который поможет держать объём работ и договорённости под контролем.',
    disclosure: 'Вымышленный проект. Анализ, часы и суммы подготовлены для демонстрации.',
    screens: [['scope-current-analysis.png','Разбор','Новый интерфейс: запрос клиента, основания и пример разбора границ проекта.'],['scope-current-request.png','Условия','Исходные условия и согласованный объём проекта.'],['scope-current-reply.png','Ответ','Редактируемый ответ клиенту о дополнительных работах.'],['scope-current-change-order.png','Допработы','Пример оформления документа о дополнительных работах.']],
  },
  model: {
    name: 'Хозблок 3D', type: 'Внутренний проект', title: 'Проверьте размещение до закупки и монтажа',
    situation: 'На плане всё помещается. Но удобно ли будет пользоваться пространством и заедет ли автомобиль под навес?',
    input: 'Размеры объекта, план и согласованные исходные данные.',
    output: 'Интерактивная 3D-модель: виды снаружи и изнутри, проверка размещения, движение автомобиля и метки замечаний.',
    check: 'Откройте модель, осмотрите объект с разных сторон и отметьте, что нужно изменить до начала работ.',
    application: 'Расскажите, что нужно спланировать. Обсудим модель для одного объекта или инструмент для повторяющихся задач вашей компании.',
    disclosure: 'Эскизная модель внутреннего проекта. Замечания сохраняются локально и передаются файлом.',
    screens: [['model-outside.png','Снаружи','Реальный экран модели: общий вид и проверка заезда автомобиля.'],['model-inside.png','Внутри','Внутреннее пространство в интерактивной модели.']],
    demo: 'https://gushinets.github.io/hozblock-3d/?roof=mono', demoLabel: 'Открыть 3D-модель ↗',
  },
  translator: {
    name: 'Live Translator', type: 'Мобильное приложение', title: 'Разговаривайте на разных языках с одного телефона',
    situation: 'Нужно обсудить дело, а общего языка не хватает. Переключения между приложениями прерывают разговор.',
    input: 'Речь двух собеседников и выбранные языки.',
    output: 'Реплики, перевод и озвучка в одном мобильном web-интерфейсе. У каждого собеседника своя сторона экрана.',
    check: 'Говорите по очереди с одного телефона. Каждый видит свою сторону экрана и слышит перевод.',
    application: 'Расскажите, где вашей команде нужен перевод или работа с голосом. Обсудим сценарий, языки и связь с вашими сервисами.',
    disclosure: 'Реальный разговор с переводом и озвучкой. Верхняя часть экрана развёрнута к собеседнику.',
    screens: [['translator-playing.png','Перевод','Реальный интерфейс во время озвучивания перевода.'],['translator-speaking.png','Речь','Распознавание реплики первого собеседника.']],
    portrait: true, demo: 'https://livetranslator.anytoolai.store/', demoLabel: 'Открыть приложение ↗',
  },
  bot: {
    name: 'PromptEngineerBot', type: 'Telegram-бот', title: 'Превратите короткую идею в понятное задание для ИИ',
    situation: 'Вы знаете, что хотите получить, но ответ ИИ снова получается слишком общим. Важные условия приходится добавлять по очереди.',
    input: 'Описание задачи обычными словами в Telegram.',
    output: 'Уточнение контекста, цели и формата. Затем — структурированный промпт для дальнейшей работы.',
    check: 'Уточните детали в диалоге и используйте готовое задание в выбранной ИИ-модели.',
    application: 'Расскажите, какие задания ваша команда составляет регулярно. Обсудим помощника с вопросами и шаблонами под вашу работу.',
    disclosure: 'Схема диалога с подготовленными примерами ответов.',
    screens: [], demo: 'https://t.me/prmpt_improver_bot', demoLabel: 'Открыть бота ↗',
  },
  prompt: {
    name: 'PromptOptimizer', type: 'Браузерное расширение', title: 'Сохраняйте удачные промпты и используйте их снова',
    situation: 'Подходящая формулировка осталась в старой переписке. Для следующей похожей задачи запрос приходится собирать заново.',
    input: 'Короткий запрос, цель и контекст задачи.',
    output: 'Структурированный промпт и библиотека сохранённых вариантов в расширении браузера.',
    check: 'Редактируйте запрос под задачу и сохраняйте удачные варианты для следующего раза.',
    application: 'Расскажите, с какими промптами работает ваша команда. Обсудим общую библиотеку и шаблоны для повторяющихся задач.',
    disclosure: 'Демонстрация интерфейса с подготовленными ответами и тестовыми счётчиками.',
    screens: [['prompt-explanation.png','Результат','Улучшенный промпт и объяснение изменений в интерфейсе расширения.'],['prompt-task.png','Задача','Исходный запрос и выбор цели перед подготовкой промпта.'],['prompt-library.png','Библиотека','Сохранённые промпты для повторного использования.']],
  }
};
const root = document.querySelector('#projects');
const $ = (id) => root.querySelector('#' + id);
const tabs = [...root.querySelectorAll('[role="tab"]')];
let current = tabs[0].dataset.project;
let activeScreen = 0;
function showScreen(index) {
  activeScreen = index;
  const project = projects[current];
  const [file, , caption] = project.screens[index];
  $('project-image').src = 'assets/projects/' + file;
  $('project-image').alt = project.name + ': ' + caption;
  $('screen-caption').textContent = caption;
  root.querySelectorAll('.screen-step').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
}
function selectProject(key) {
  current = key;
  const project = projects[key];
  for (const field of ['name','title','type','situation','input','output','check','application','disclosure']) {
    $('project-' + field).textContent = project[field];
  }
  tabs.forEach((tab) => {
    const selected = tab.dataset.project === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  $('project-panel').setAttribute('aria-labelledby', 'tab-' + key);
  $('project-counter').textContent = (tabs.findIndex(tab => tab.dataset.project === key) + 1) + ' из 6';
  $('selection-status').textContent = 'Выбран проект ' + project.name;
  $('screen-steps').replaceChildren();
  $('screen-open').hidden = !project.screens.length;
  $('bot-scheme').hidden = !!project.screens.length;
  $('screen-open').classList.toggle('is-portrait', !!project.portrait);
  project.screens.forEach((screen, i) => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'screen-step'; button.textContent = screen[1];
    button.addEventListener('click', () => showScreen(i));
    $('screen-steps').append(button);
  });
  if (project.screens.length) showScreen(0);
  else $('screen-caption').textContent = 'Пример последовательности вопросов и результата. Схема сценария.';
  $('project-demo').hidden = !project.demo;
  if (project.demo) { $('project-demo').href = project.demo; $('project-demo').textContent = project.demoLabel; }
  else $('project-demo').removeAttribute('href');
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProject(tab.dataset.project));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectProject(tabs[next].dataset.project); tabs[next].focus();
    tabs[next].scrollIntoView({block:'nearest',inline:'nearest'});
  });
});
$('screen-open').addEventListener('click', () => {
  $('expanded-image').src = $('project-image').src;
  $('expanded-image').alt = $('project-image').alt;
  $('image-dialog-title').textContent = projects[current].name + ' — ' + projects[current].screens[activeScreen][1];
  $('expanded-disclosure').textContent = projects[current].disclosure;
  $('image-dialog').showModal();
});
root.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => $(button.dataset.close).close()));
root.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
}));
selectProject(current);
})();
