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
assert {"main", "services", "projects", "process", "team", "contact", "project-dialog"} <= page.ids
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
for css in (root / "styles.css", root / "assets/fonts.css"):
    for reference in re.findall(r"""url\((?:'[^']*'|"[^"]*"|[^)]*)\)""", css.read_text(encoding="utf-8")):
        resource = reference[4:-1].strip("'\" ")
        if not resource.startswith(("data:", "#")):
            assert (css.parent / resource).is_file(), f"missing CSS resource: {resource}"
print("site-smoke: PASS")
