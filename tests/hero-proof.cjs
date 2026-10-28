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
    ['scope', 'Проверка соответствия', '#projects'],
    ['bot', 'Диалоговые помощники', 'https://t.me/prmpt_improver_bot'],
    ['prompt', 'Текст и шаблоны', '#projects'],
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
      for (const width of [320, 390, 600, 720, 844, 1280, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        const layout = await page.evaluate(() => {
          const card = document.querySelector('.proof-card').getBoundingClientRect();
          const elements = [...document.querySelectorAll('.proof-thumb, .proof-copy h2, .proof-copy p, .proof-actions a')];
          return {
            overflow: document.documentElement.scrollWidth - innerWidth,
            inside: elements.every(el => {
              const r = el.getBoundingClientRect();
              return r.width > 0 && r.height > 0 && r.left >= card.left && r.right <= card.right + 1
                && r.top >= card.top && r.bottom <= card.bottom + 1 && el.scrollWidth <= el.clientWidth + 1;
            }),
          };
        });
        assert.ok(layout.overflow <= 1 && layout.inside, `${key}/${width}: clipped or overflowing hero`);
        results.push({ key, width, ...layout });
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
