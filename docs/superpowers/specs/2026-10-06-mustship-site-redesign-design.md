# mustShip site redesign — design specification

Date: 2026-10-06

## Goal

Update the existing one-page mustShip website so that within 30–60 seconds a visitor understands:

1. mustShip is a real small team.
2. The team builds digital products and AI automation.
3. There are real completed projects.
4. Natalia handles client communication; Mikhail leads technical implementation.
5. A visitor can quickly contact the team about a concrete task.

The redesign must keep the current dark theme, green accent, typography, minimal visual style, and one-page structure.

## Constraints

- No paid services.
- No fabricated testimonials, clients, numbers, claims, prices, or logos.
- No large technology wall, blog, extra pages, or complex animation.
- No fake product screenshots.
- Use only real project screenshots when a suitable real image exists.
- Keep the site lightweight and static for GitHub Pages.
- Keep desktop, tablet, and 360–430 px mobile layouts usable.

## Global visual direction

Retain:
- dark background;
- lime-green accent;
- current typography and spacing language;
- rounded cards and subtle borders;
- restrained technical/product aesthetic.

Shift emphasis from “technical landing page” to “real team + real products + clear delivery process”.

## Header / hero

Top eyebrow:
**Разработка продуктов • AI-автоматизация**

Main headline:
**Идея должна дойти до релиза.**

Hero text:
**mustShip — небольшая команда разработки цифровых продуктов. Превращаем идеи и ручные бизнес-процессы в работающие web-сервисы, внутренние инструменты, интеграции и MVP.**

Buttons:
- **Обсудить задачу**
- **Посмотреть проекты**

### Hero process panel

Keep the current terminal/panel visual treatment but remove fake-code styling.

Content:

**Задача**
↓
**Минимальный рабочий объём**
↓
**Разработка**
↓
**Рабочий результат**

This panel should read as a process, not code.

## Section: Что делаем

Heading:
**Что делаем**

Subheading:
**Берём конкретную бизнес-задачу или идею продукта и доводим её до работающего решения без лишней сложности.**

Cards:

### Проверить идею продукта
Собираем минимальную рабочую версию web-сервиса или MVP, чтобы проверить идею без долгой и дорогой разработки.

Tags:
Web • MVP • Full-stack

### Убрать ручную работу
Автоматизируем обработку документов, заявок, сообщений, классификацию, подготовку ответов и другие повторяющиеся процессы с помощью AI.

Tags:
AI • LLM API • Automation

### Сделать внутренний инструмент
Создаём небольшие рабочие системы для сотрудников и руководителей: обработка информации, контроль процессов, базы знаний и внутренние сервисы.

Tags:
Internal tools • B2B

### Связать существующие сервисы
Соединяем Telegram, базы данных, внешние сервисы и API в единый рабочий сценарий.

Tags:
API • Telegram • Integrations

## Section: Наши проекты:

Projects must become visually more prominent than ordinary service cards.

Each project card structure:
1. purpose / client-problem heading;
2. product name;
3. short description;
4. tags;
5. link when available;
6. real screenshot when a suitable real product screenshot exists.

Do not invent screenshots. If no suitable real screenshot is available, render a strong text-first card without one.

### Контроль изменений требований
Product: **ScopeCreepGuard**

Description:
Веб-сервис, который сравнивает новый запрос клиента с согласованным объёмом проекта, объясняет расхождения и готовит черновик ответа.

Tags:
Web • AI

Link:
GitHub ↗
https://github.com/gushinets/ScopeCreepGuard

### Подготовка заданий для AI
Product: **PromptEngineerBot**

Description:
Telegram-помощник, который превращает короткий текстовый или голосовой запрос в более подробное и структурированное задание для AI.

Tags:
Telegram • AI

Link:
GitHub ↗
https://github.com/gushinets/PromptEngineerBot

### Работа с AI-запросами в браузере
Product: **PromptOptimizer**

Description:
Браузерное расширение для улучшения, сохранения и повторного использования AI-запросов прямо во время работы.

Tags:
Browser Extension • AI

Link:
Chrome Web Store ↗
https://chromewebstore.google.com/detail/promptoptimizer/fbageijibmjblopdbgpdcpkojhnjjbpe

### Поиск информации в базе резюме
Product: **CV_screener**

Description:
Прототип системы, которая ищет профессиональный опыт в коллекции резюме и формирует ответ на основе найденной информации.

Tags:
RAG • Documents • AI

No public link unless a verified one is found.

### Перевод разговора в реальном времени
Product: **Live Translator**

Description:
Мобильное web-приложение для двустороннего перевода разговора на одном телефоне с realtime-аудио.

Tags:
Web • Realtime • AI • WebRTC

Link:
GitHub ↗
https://github.com/gushinets/live-translator

## Section: Как работаем

Place between projects and team.

Heading:
**Как работаем**

Compact process:
**Задача → Определяем минимальный рабочий объём → Разрабатываем → Проверяем → Рабочий результат**

Supporting text:
**Сначала определяем минимальный объём, который решает задачу. Не добавляем функции только потому, что их можно сделать.**

This section must remain compact and visually lighter than the projects section.

## Section: Команда

Remove the current flow:
**Задача клиента → Наталья → Михаил → Рабочий результат**

Use two full team cards with portrait areas.

### Наталья Гушинец
Subtitle:
**Работа с заказчиком**

Text:
**Первый контакт, уточнение задачи, организация проекта и коммуникация в процессе работы.**

Portrait:
Use the supplied dark-background individual portrait of Natalia (first supplied image).
Treatment:
- portrait crop;
- consistent rounded corners;
- no decorative effects;
- integrate naturally with dark theme;
- keep natural appearance.

### Михаил Гушинец
Subtitle:
**Техническая реализация**

Text:
**Оценка задачи, архитектура, разработка, тестирование и технические обсуждения.**

Portrait:
Use the supplied individual portrait of Mikhail (second supplied image).
Treatment:
- crop to match Natalia’s card proportions;
- visually reduce the bright background using layout/crop/overlay treatment only;
- keep natural appearance;
- match card size and visual weight with Natalia.

Do not use the third joint portrait in this version.

## Contact section

Heading:
**Есть задача, которую нужно довести до рабочего результата?**

Text:
**Опишите её в нескольких предложениях — начнём с минимального разумного объёма.**

Primary button:
**Написать нам**

Visible email:
**MustShip.gushinets@gmail.com**

Mail link:
**mailto:MustShip.gushinets@gmail.com**

Remove the old style.gushinets@gmail.com address.

## Responsive behavior

### Desktop
- project cards should be the strongest proof section;
- team portraits must have equal visual weight;
- process sections should remain compact.

### Tablet
- avoid cramped two-column text;
- cards may switch to one column when needed;
- project media must scale proportionally.

### Mobile 360–430 px
- all main cards in one column;
- no horizontal overflow;
- buttons at least comfortable tap size;
- process steps must wrap or stack rather than shrink excessively;
- project screenshots, if used, must scale to full card width;
- team portraits must remain readable without excessive vertical height.

## Implementation approach

Keep the site as a static HTML/CSS page in the existing repository.

Expected changes:
- update index.html structure and styles;
- add an assets/ directory for approved portrait images and any verified real project screenshots;
- preserve current GitHub Pages deployment model;
- do not add JavaScript unless strictly necessary (current design does not require it).

## Screenshot policy

Before adding project imagery:
1. inspect existing project repositories and public product pages for real screenshots;
2. use only assets that clearly show the actual product;
3. if provenance or suitability is uncertain, omit the image;
4. never generate a substitute screenshot.

## Verification

After implementation verify:
- desktop layout;
- tablet layout;
- mobile widths around 360, 390, and 430 px;
- no horizontal overflow;
- links point to the intended destinations;
- mailto uses MustShip.gushinets@gmail.com;
- no stale style.gushinets@gmail.com remains;
- no stale team flow remains;
- no fake-code hero copy remains;
- no fabricated proof or metrics were introduced.
