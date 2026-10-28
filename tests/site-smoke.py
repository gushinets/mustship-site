from html.parser import HTMLParser
from hashlib import sha256
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
import re

root = Path(__file__).resolve().parents[1]


class Page(HTMLParser):
    ids = set()
    links = []
    files = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        if tag == "a" and "href" in attrs:
            self.links.append(attrs["href"])
        if tag in ("link", "script", "img"):
            self.files.append(attrs.get("src") or attrs.get("href"))


page = Page()
page.feed((root / "index.html").read_text(encoding="utf-8"))
assert {"main", "services", "projects", "process", "team", "contact", "project-panel", "image-dialog"} <= page.ids
assert "mailto:MustShip.gushinets@gmail.com" in page.links
for link in page.links:
    if link.startswith("#"):
        assert link[1:] in page.ids, f"broken anchor: {link}"
for name in page.files:
    assert name, "missing resource URL"
    resource = urlsplit(name)
    assert (root / resource.path).is_file(), f"missing resource: {name}"
    if resource.path == "styles.css":
        version = sha256((root / resource.path).read_text(encoding="utf-8").encode("utf-8")).hexdigest()[:12]
        assert parse_qs(resource.query).get("v") == [version], "update styles.css?v= to the first 12 SHA256 characters"
for css in (root / "styles.css", root / "projects.css", root / "assets/fonts.css"):
    for reference in re.findall(r"""url\((?:'[^']*'|"[^"]*"|[^)]*)\)""", css.read_text(encoding="utf-8")):
        resource = reference[4:-1].strip("'\" ")
        if not resource.startswith(("data:", "#")):
            assert (css.parent / resource).is_file(), f"missing CSS resource: {resource}"
html = (root / "index.html").read_text(encoding="utf-8")
assert html.index('role="tablist"') < html.index('id="project-panel"'), "project tabs must precede the panel"
assert len(re.findall(r'role="tab"', html)) == 6, "expected six project tabs"
for label in ("Работа с голосом", "Поиск и анализ данных", "Анализ по критериям", "Создание промптов", "Улучшение промптов", "Проверка решений в 3D"):
    assert f'>{label}</span>' in html, f"missing approved project label: {label}"
assert len(re.findall(r'class="project-icon"', html)) == 6, "expected six pencil project icons"
assert 'id="screen-zoom"' in html, "missing zoom control above the screenshot"
assert 'id="project-type"' not in html and 'id="project-disclosure"' not in html, "removed project notes must stay removed"
assert 'id="project-details"' in html and '<details' not in html, "full project descriptions must be visible"
assert 'id="project-dialog"' not in html, "old project modal must be removed"
assert 'Это прототип' not in html, "prototype contact must not be published"
for resource in ("projects.css", "projects.js", "app.js"):
    version = sha256((root / resource).read_bytes()).hexdigest()[:12]
    assert f'{resource}?v={version}' in html, f"update cached resource version: {resource}"
for filename in re.findall(r"\['([^']+\.png)',", (root / "projects.js").read_text(encoding="utf-8")):
    assert (root / "assets/projects" / filename).is_file(), f"missing gallery image: {filename}"
for control in ("discuss", "discuss-other"):
    assert re.search(r'<a\b[^>]*id="' + control + r'"[^>]*href="#contact"', html), f"missing contact path: {control}"
print("site-smoke: PASS")
