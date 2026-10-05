# mustShip Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the existing mustShip one-page GitHub Pages site so it presents a real two-person team, clear client problems, real shipped projects, a compact delivery process, and a direct contact path.

**Architecture:** Keep the existing static-site architecture: one `index.html` containing semantic HTML and CSS, plus a small `assets/` directory for approved portraits and any verified real product screenshots. No framework, JavaScript, analytics, backend, paid service, or additional page is introduced.

**Tech Stack:** HTML5, CSS, static image assets, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-06-mustship-site-redesign-design.md`

## Global Constraints

- Preserve the dark theme, lime-green accent, current typography, minimalist visual style, and one-page structure.
- Use no paid services.
- Do not add fabricated testimonials, client logos, numbers, experience claims, prices, or product metrics.
- Do not add fake product screenshots; only actual product imagery with clear provenance may be used.
- Use `MustShip.gushinets@gmail.com` as both visible contact email and `mailto:` target.
- Use Natalia's first supplied individual portrait and Mikhail's second supplied individual portrait; do not use the joint portrait in this version.
- Keep the site static and deployable on GitHub Pages.
- Mobile target widths: approximately 360, 390, and 430 px with no horizontal overflow.
- No complex animation, large technology wall, blog, or extra pages.

## Review Focus

- **Mobile overflow:** long project labels, email text, tags, and process steps must wrap without horizontal scrolling. Task 4 verifies 360/390/430 px.
- **Contact mismatch:** the visible email and `mailto:` target must both be `MustShip.gushinets@gmail.com`; no `style.gushinets@gmail.com` may remain. Task 3 static smoke test pins this.
- **Stale copy:** old fake-code hero copy, the old team flow, and old service-card copy must be absent. Task 3 static smoke test pins this.
- **Portrait cropping:** both individual portraits must remain recognizable and balanced at desktop and mobile sizes without distorting aspect ratio. Task 4 visual QA pins this.
- **Project-image provenance:** a project image may be added only when it can be traced to an actual product/repository/store listing; otherwise the card stays text-first. Task 2 records the source before adding any project image.

---

### Task 1: Prepare approved team portrait assets

**Files:**
- Create: `assets/natalia-gushinets.jpg`
- Create: `assets/mikhail-gushinets.jpg`
- Source: supplied conversation images `/mnt/data/1000027069.jpg` and `/mnt/data/1000027066.jpg`

**Interfaces:**
- Consumes: the two user-supplied individual portraits.
- Produces: optimized JPEG assets referenced by the team cards in `index.html`.

- [ ] **Step 1: Verify the supplied source files exist and inspect dimensions**

Run a local file inspection before modifying anything.

Expected: both source files are readable JPEG images.

- [ ] **Step 2: Produce web-sized portrait copies**

Create each output with a maximum useful dimension around 1600 px, preserve aspect ratio and natural appearance, strip unnecessary metadata, and avoid artificial retouching. Do not generate new faces or backgrounds.

Expected: each resulting JPEG is materially smaller than the source while remaining visually sharp at the team-card display size.

- [ ] **Step 3: Verify portrait assets**

Check dimensions, file size, and visually inspect each output.

Expected: both portraits open successfully; no distortion or accidental crop is baked into the file.

- [ ] **Step 4: Commit portrait assets**

Commit message:
`feat: add team portrait assets`

---

### Task 2: Verify and select real project imagery

**Files:**
- Optional Create: `assets/projects/<verified-image-name>.*`
- Modify later: `index.html` only for images that pass provenance review.

**Interfaces:**
- Consumes: public repositories/product pages for ScopeCreepGuard, PromptEngineerBot, PromptOptimizer, CV_screener, and Live Translator.
- Produces: zero or more verified project images with a documented source; absence of an image is an acceptable result.

- [ ] **Step 1: Inspect the known project repositories and public product listing for actual UI screenshots**

Known evidence already found during planning:
- ScopeCreepGuard repository contains icons/placeholders only; no obvious product screenshot.
- PromptEngineerBot repository contains no image assets.
- PromptTune contains `docs/design/popup-design-*.png` files, but these are design assets and must not be treated as actual product screenshots without independent confirmation.
- Live Translator repository contains app icons only.
- PromptOptimizer has a public Chrome Web Store listing and is the best candidate for a verifiable real screenshot.

- [ ] **Step 2: Accept or reject each candidate based on provenance**

Accept only an image that clearly shows the actual released/working product and whose source is the project's own repository or product listing.

Expected: uncertain design mockups are rejected; cards without verified imagery remain text-first.

- [ ] **Step 3: Optimize any accepted real screenshots**

Preserve the product UI exactly; only resize/compress for web delivery.

Expected: no invented UI, no altered copy, no generated substitute.

- [ ] **Step 4: Commit accepted screenshot assets, if any**

Commit message:
`feat: add verified project screenshots`

If none qualify, make no asset commit and proceed.

---

### Task 3: Rebuild the page content and visual hierarchy

**Files:**
- Modify: `index.html`
- Create: `tests/site-smoke.py`

**Interfaces:**
- Consumes: portrait assets from Task 1 and any accepted project imagery from Task 2.
- Produces: the complete redesigned one-page site and static content checks.

- [ ] **Step 1: Write a static smoke test that fails against the current page**

Create `tests/site-smoke.py` using Python standard library only.

Assertions must include:
- `Разработка продуктов • AI-автоматизация`
- `Идея должна дойти до релиза.`
- hero process text: `Задача`, `Минимальный рабочий объём`, `Разработка`, `Рабочий результат`
- new four service-card headings
- all five project purpose headings and product names
- `Как работаем`
- new two-person team subtitles
- `MustShip.gushinets@gmail.com`
- `mailto:MustShip.gushinets@gmail.com`
- absence of `style.gushinets@gmail.com`
- absence of `mustShip = true`
- absence of `Задача клиента → Наталья → Михаил → Рабочий результат` or its equivalent old flow markup.

- [ ] **Step 2: Run the smoke test and verify it fails**

Run:
`python3 tests/site-smoke.py`

Expected: FAIL because the current page does not yet contain all new required content.

- [ ] **Step 3: Update hero and process panel**

In `index.html`:
- keep main headline;
- use the approved hero paragraph exactly;
- keep two CTA buttons;
- replace fake-code content with the four-step process;
- preserve the technical-panel visual language without code imitation.

- [ ] **Step 4: Replace the four service cards**

Use the exact headings, descriptions, and tags from the spec, with client problem first and technology tags secondary.

- [ ] **Step 5: Rebuild project cards with stronger visual hierarchy**

For each project card:
1. purpose heading;
2. product name;
3. approved description;
4. tags;
5. verified link where available;
6. optional verified real screenshot only when Task 2 approved one.

Project cards must have more visual weight than service cards through spacing, border/background treatment, typography, and optional media — not fabricated metrics.

- [ ] **Step 6: Add the compact `Как работаем` section**

Render the five-step sequence:
`Задача → Определяем минимальный рабочий объём → Разрабатываем → Проверяем → Рабочий результат`

Add the exact supporting sentence from the spec. On narrow screens, steps must wrap or stack rather than shrink.

- [ ] **Step 7: Rebuild the team section**

Use two full cards:
- Natalia: portrait, `Работа с заказчиком`, approved description.
- Mikhail: portrait, `Техническая реализация`, approved description.

Remove the old team-flow strip completely. Use CSS `object-fit: cover` / `object-position` to harmonize crops without modifying faces.

- [ ] **Step 8: Update the contact section**

Keep the approved heading and sentence. Change the primary CTA label to `Написать нам`. Show `MustShip.gushinets@gmail.com` nearby and set both CTA and visible email link to `mailto:MustShip.gushinets@gmail.com`.

- [ ] **Step 9: Update navigation only as needed**

Keep the one-page navigation. Add a compact `Как работаем` link only if it remains visually balanced; otherwise retain the current four-link header and rely on document flow.

- [ ] **Step 10: Run the smoke test and verify it passes**

Run:
`python3 tests/site-smoke.py`

Expected: PASS with no assertion failures.

- [ ] **Step 11: Commit page redesign**

Commit message:
`feat: redesign mustShip landing page`

---

### Task 4: Responsive and visual verification

**Files:**
- Modify if required: `index.html`
- Modify if required: `tests/site-smoke.py`

**Interfaces:**
- Consumes: the redesigned site from Task 3.
- Produces: verified desktop/tablet/mobile layout ready for GitHub Pages.

- [ ] **Step 1: Serve the site locally**

Run a simple static HTTP server from the repository root.

Expected: `index.html` and assets load with HTTP 200.

- [ ] **Step 2: Verify desktop rendering**

Check a desktop viewport around 1440 px.

Expected:
- project section is visually strongest proof block;
- hero is balanced;
- team portraits have equal visual weight;
- no broken assets or links.

- [ ] **Step 3: Verify tablet rendering**

Check approximately 768–1024 px.

Expected:
- no cramped two-column copy;
- project media scales proportionally;
- team cards remain readable.

- [ ] **Step 4: Verify 360, 390, and 430 px mobile widths**

Expected at each width:
- main cards are one column;
- no horizontal overflow;
- CTA targets are comfortably tappable;
- process steps remain legible;
- portrait and project images scale without distortion;
- email wraps safely.

- [ ] **Step 5: Check all outbound links and contact links**

Verify:
- ScopeCreepGuard GitHub;
- PromptEngineerBot GitHub;
- PromptOptimizer Chrome Web Store;
- Live Translator GitHub;
- all contact links use the new email.

- [ ] **Step 6: Re-run static smoke test after any responsive fixes**

Run:
`python3 tests/site-smoke.py`

Expected: PASS.

- [ ] **Step 7: Commit responsive fixes if any**

Commit message:
`fix: polish responsive landing layout`

---

### Task 5: Integrate and verify the public site

**Files:**
- No new product files expected.

**Interfaces:**
- Consumes: all verified redesign commits.
- Produces: the updated public GitHub Pages site.

- [ ] **Step 1: Review the final diff against the approved spec**

Confirm every spec section maps to the resulting page and no prohibited content was introduced.

- [ ] **Step 2: Verify the GitHub Pages deployment source remains unchanged**

Expected: deployment still serves the repository's intended main/root static site; no paid feature or new service is enabled.

- [ ] **Step 3: Integrate the verified changes into `main`**

Use the repository's normal merge/update path only after local verification passes.

- [ ] **Step 4: Verify the public GitHub Pages URL after deployment**

Expected:
- page loads successfully;
- new copy is visible;
- portraits load;
- all links work;
- mobile layout remains intact.

- [ ] **Step 5: Report the exact public URL and any project cards intentionally left without screenshots**

Do not describe omitted screenshots as missing work when no verified real image exists; that is the required safe fallback.
