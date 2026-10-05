from pathlib import Path

html = Path("index.html").read_text(encoding="utf-8")
required = [
    "Разработка продуктов • AI-автоматизация",
    "Идея должна дойти до релиза.",
    "Задача",
    "Минимальный рабочий объём",
    "Разработка",
    "Рабочий результат",
    "Проверить идею продукта",
    "Убрать ручную работу",
    "Сделать внутренний инструмент",
    "Связать существующие сервисы",
    "Контроль изменений требований",
    "ScopeCreepGuard",
    "Подготовка заданий для AI",
    "PromptEngineerBot",
    "Работа с AI-запросами в браузере",
    "PromptOptimizer",
    "Поиск информации в базе резюме",
    "CV_screener",
    "Перевод разговора в реальном времени",
    "Live Translator",
    "Работа с заказчиком",
    "Техническая реализация",
    "MustShip.gushinets@gmail.com",
    "mailto:MustShip.gushinets@gmail.com",
    'src="assets/natalia-gushinets.webp"',
    'src="assets/mikhail-gushinets.webp"',
]
for item in required:
    assert item in html, f"missing required content: {item}"

forbidden = [
    "style.gushinets@gmail.com",
    "mustShip = true",
    "Задача клиента → Наталья → Михаил → Рабочий результат",
    "Web-сервисы и MVP</h3>",
    "Как работаем",
    '<section id="workflow">',
]
for item in forbidden:
    assert item not in html, f"stale content remains: {ite}"

assert "@media" in html, "responsive CSS missing"
assert "overflow-wrap" in html or "word-break" in html, "email wrapping safeguard missing"
print("site-smoke: PASS")
