// Run with Playwright available in NODE_PATH and a local server on port 4194.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' });
  const output = process.env.TEST_OUTPUT_DIR || path.join(__dirname, '../output/playwright/hero-proof');
  fs.mkdirSync(output, { recursive: true });
  const url = process.env.SITE_URL || 'http://127.0.0.1:4194/';
  const cases = [
    ['translator', 'Работа с голосом', 'https://livetranslator.anytoolai.store/'],
    ['cv', 'Поиск и анализ данных', '#projects'],
    ['scope', 'Анализ по критериям', '#projects'],
    ['bot', 'Создание промптов', 'https://t.me/prmpt_improver_bot'],
    ['prompt', 'Улучшение промптов', '#projects'],
    ['model', 'Проверка решений в 3D', 'https://gushinets.github.io/hozblock-3d/?roof=mono'],
  ];
  const errors = [];
  const results = [];
  try {
    for (const [index, [key, title, href]] of cases.entries()) {
      const page = await browser.newPage({ viewport: { width: 844, height: 900 }, reducedMotion: 'reduce' });
      page.on('pageerror', error => errors.push(error.message));
      // Exercise both extremes of the random range as well as every middle slot.
      const random = index === 0 ? 0 : index === 5 ? 0.999999 : (index + 0.5) / 6;
      await page.addInitScript(value => { Math.random = () => value; }, random);
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('#proof-title').textContent(), title, `${key}: wrong hero title`);
      const primary = page.locator('.proof-action-primary');
      assert.equal(await primary.getAttribute('href'), href, `${key}: wrong destination`);
      assert.equal(await primary.getAttribute('target'), href.startsWith('#') ? null : '_blank');
      assert.equal(await page.locator('.proof-action-secondary').getAttribute('href'), '#projects');
      const image = page.locator('.proof-thumb');
      await image.evaluate(img => img.decode());
      assert.ok(await image.evaluate(img => img.naturalHeight / img.naturalWidth > 1.7), `${key}: preview must be a narrow vertical window`);
      assert.ok((await image.getAttribute('alt')).includes('иллюстрация'));
      assert.ok((await image.getAttribute('src')).endsWith(`/${key}-window.webp`));
      const viewports = [
        [320, 1000], [390, 844], [600, 1000], [720, 1000], [844, 900], [844, 572],
        [1024, 768], [1099, 572], [1100, 720], [1165, 572], [1200, 650], [1280, 450], [1280, 500], [1280, 650], [1280, 720], [1366, 650],
        [1440, 768], [1536, 864], [1920, 960],
      ];
      for (const [width, height] of viewports) {
        await page.setViewportSize({ width, height });
        const expectedArt = width < 1100 ? 'hero-laptop-mobile.webp' : 'hero-composition.webp';
        await page.waitForFunction(name => {
          const art = document.querySelector('.approved-art img');
          return art.complete && art.naturalWidth > 0 && new URL(art.currentSrc).pathname.endsWith(name);
        }, expectedArt);
        await page.locator('.approved-art img').evaluate(img => img.decode());
        // Measure after the resized viewport has reached the next painted layout.
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        await page.evaluate(() => window.scrollTo(0, 0));
        const layout = await page.evaluate(() => {
          const card = document.querySelector('.proof-card').getBoundingClientRect();
          const screen = document.querySelector('.hero-screen').getBoundingClientRect();
          const group = document.querySelector('.proof-group').getBoundingClientRect();
          const art = document.querySelector('.approved-art').getBoundingClientRect();
          const title = document.querySelector('.hero-title').getBoundingClientRect();
          const message = document.querySelector('.hero-message').getBoundingClientRect();
          const process = document.querySelector('.hero-process-mobile').getBoundingClientRect();
          const device = document.querySelector('.hero-art-window').getBoundingClientRect();
          const copy = document.querySelector('.hero-copy').getBoundingClientRect();
          const outcome = document.querySelector('.hero-outcome').getBoundingClientRect();
          const benefits = document.querySelector('.benefits').getBoundingClientRect();
          const label = document.querySelector('.proof-label').getBoundingClientRect();
          const hero = document.querySelector('.hero-stage').getBoundingClientRect();
          const elements = [...document.querySelectorAll('.proof-thumb, .proof-copy h2, .proof-copy p, .proof-actions a')]
            .filter(el => getComputedStyle(el).display !== 'none');
          return {
            overflow: document.documentElement.scrollWidth - innerWidth,
            firstScreen: scrollY === 0 && card.top >= 0 && card.bottom <= innerHeight - 10 &&
              label.bottom <= innerHeight - 10 &&
              document.querySelector('.hero-helper').getBoundingClientRect().bottom <= innerHeight - 10,
            insideLaptop: group.left >= screen.left - 1 && group.top >= screen.top - 1 &&
              group.right <= screen.right + 1 && group.bottom <= screen.bottom + 1 &&
              card.left >= screen.left && card.right <= screen.right + 1 &&
              card.top >= screen.top && card.bottom <= screen.bottom + 1,
            desktopPlacement: title.right <= art.left + art.width * .175 && message.right < screen.left,
            mobileSequence: title.bottom <= process.top + 1 && process.bottom <= device.top + 1 &&
              art.bottom <= label.top - 4 && label.bottom <= device.bottom + 1 &&
              device.bottom <= copy.top + 1 && outcome.bottom <= benefits.top + 1,
            mobileFocusOrder: card.bottom <= copy.top && !!(document.querySelector('.proof-action-primary')
              .compareDocumentPosition(document.querySelector('.hero-actions .primary')) & Node.DOCUMENT_POSITION_FOLLOWING),
            labelOutside: label.right <= screen.left - 4 || label.bottom <= screen.top - 4 || label.top >= art.bottom + 4,
            labelBelowRight: label.top >= art.bottom + 3 && label.right <= device.right + 1 &&
              label.left + label.width / 2 >= screen.left + screen.width / 2,
            contentInsideHero: message.bottom <= hero.bottom - 10 && card.bottom <= hero.bottom - 10,
            touchTargets: [...document.querySelectorAll('.proof-actions a')].every(el => el.getBoundingClientRect().height >= 44),
            inside: elements.every(el => {
              const r = el.getBoundingClientRect();
              return r.width > 0 && r.height > 0 && r.left >= card.left && r.right <= card.right + 1
                && r.top >= card.top && r.bottom <= card.bottom + 1 && el.scrollWidth <= el.clientWidth + 1;
            }),
          };
        });
        assert.ok(layout.overflow <= 1 && layout.inside && layout.insideLaptop && layout.touchTargets && layout.labelOutside && layout.labelBelowRight && layout.contentInsideHero,
          `${key}/${width}: clipped, overflowing or undersized laptop card: ${JSON.stringify(layout)}`);
        if (width < 1100) assert.ok(layout.mobileFocusOrder && layout.mobileSequence,
          `${key}/${width}: title/process/laptop/text/icons order must match keyboard order: ${JSON.stringify(layout)}`);
        if (width >= 1100) assert.ok(layout.desktopPlacement, `${key}/${width}: text must stay to the left of napkin/laptop`);
        if (width >= 1100 && height >= 572) {
          assert.ok(layout.firstScreen, `${key}/${width}x${height}: example and actions must fit in the first screen`);
        }
        results.push({ key, width, height, ...layout });
        if (index === 2 && width >= 1100) await page.screenshot({ path: path.join(output, `layout-${width}x${height}.png`) });
        if (index === 2 && [320, 390, 844].includes(width)) await page.locator('.hero-stage').screenshot({ path: path.join(output, `hero-${width}.png`) });
        if ([390, 844, 1440].includes(width)) await page.locator('.proof-group').screenshot({ path: path.join(output, `${key}-${width}.png`) });
      }
      if (href === '#projects') {
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        for (const width of [390, 844, 1440]) {
          await page.setViewportSize({ width, height: 1000 });
          await primary.click();
          assert.equal(new URL(page.url()).hash, '#projects');
          assert.equal(await page.locator(`#tab-${key}`).getAttribute('aria-selected'), 'true');
          await page.waitForFunction(id => document.activeElement.id === id, `tab-${key}`);
          await page.locator('#screen-zoom').click();
          assert.ok(await page.locator('#image-dialog').isVisible());
          await page.keyboard.press('Escape');
          assert.ok(await page.locator('#screen-zoom').evaluate(el => document.activeElement === el));
        }
      }
      await page.close();
    }
    const fallback = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await fallback.goto(url);
    assert.equal(await fallback.locator('#proof-title').textContent(), 'Работа с голосом');
    assert.equal(await fallback.locator('.proof-action-primary').getAttribute('href'), cases[0][2]);
    await fallback.close();
    assert.deepEqual(errors, []);
    fs.writeFileSync(path.join(output, 'verification.json'), JSON.stringify({ results, errors, fallback: 'PASS' }, null, 2));
    console.log(`hero-proof: PASS (${results.length} layouts, all six selections, links, nine mobile/tablet/desktop transitions with smooth scrolling, focus, zoom, no-JS fallback)`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
