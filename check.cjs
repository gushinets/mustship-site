async (page) => {
  const check = (ok, message) => { if (!ok) throw new Error(message); };
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 977, height: 1610 });
  await page.goto('http://127.0.0.1:4173/');
  await page.evaluate(() => document.fonts.ready);
  const layout = await page.evaluate(() => ({
    width: document.querySelector('.sheet').getBoundingClientRect().width,
    height: document.querySelector('.sheet').getBoundingClientRect().height,
    sections: [...document.querySelectorAll('main > section')].map((el) => Math.round(el.getBoundingClientRect().top)),
    anchors: [...document.querySelectorAll('a[href^="#"]')].every((a) => document.querySelector(a.getAttribute('href'))),
  }));
  check(Math.abs(layout.width - 977) < 1 && Math.abs(layout.height - 1610) < 2, 'Размер страницы отличается от макета');
  check(JSON.stringify(layout.sections) === JSON.stringify([76, 431, 745, 1204, 1453]), 'Секции сместились');
  check(layout.anchors, 'Найден неработающий якорь');
  check(await page.locator('.brand img').evaluate(image => image.complete && image.naturalWidth > 0), 'Логотип не загрузился');
  check(await page.locator('.hero-title, .services-title, .projects-title, .team-title, .contact-title, .hand-note').evaluateAll((elements) => elements.every((el) => el.textContent.trim() && getComputedStyle(el).backgroundImage === 'none')), 'Надписи должны отображаться текстом, без растрового фона');
  check(await page.locator('#process img.process-drawing').count() === 4 && await page.locator('#process img.process-drawing').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'В схеме процесса должны загрузиться четыре карандашные иллюстрации');
  check(await page.locator('.benefits svg, .service-heading svg, svg.service-drawing').count() === 14 && await page.locator('.benefits .art, .service-heading .art, .service-drawing.art').count() === 0, 'Иконки и рисунки услуг должны быть векторными');
  await page.screenshot({ path: 'output/playwright/desktop-977.png', fullPage: true, scale: 'css' });

  const cards = page.locator('[data-project]');
  check(await cards.count() === 5, 'Должно быть пять проектов');
  for (let i = 0; i < 5; i++) {
    const card = cards.nth(i);
    await card.click();
    check(await page.locator('#project-dialog').isVisible(), 'Описание проекта не открылось');
    check(await page.locator('#dialog-title').textContent() === await card.getAttribute('data-project'), 'Открыт другой проект');
    await page.keyboard.press('Escape');
    check(!await page.locator('#project-dialog').isVisible(), 'Escape не закрывает диалог');
    check(await card.evaluate((el) => document.activeElement === el), 'Фокус не вернулся к карточке');
  }
  await cards.first().click();
  await page.getByRole('button', { name: 'Закрыть описание проекта' }).click();
  check(!await page.locator('#project-dialog').isVisible(), 'Кнопка закрытия не работает');
  await page.getByRole('navigation').getByRole('link', { name: 'Контакты' }).click();
  check(new URL(page.url()).hash === '#contact', 'Навигация к контактам не работает');

  await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Скопировать email' }).click();
  await page.waitForFunction(() => document.querySelector('.toast').textContent === 'Email скопирован');
  check(await page.evaluate(() => navigator.clipboard.readText()) === 'MustShip.gushinets@gmail.com', 'В буфере другой email');
  await page.evaluate(() => { window.savedClipboardWrite = navigator.clipboard.writeText; navigator.clipboard.writeText = async () => { throw new Error('Permission denied'); }; });
  await page.getByRole('button', { name: 'Скопировать email' }).click();
  await page.waitForFunction(() => document.querySelector('.toast').textContent.includes('Email выделен'));
  check(await page.evaluate(() => window.getSelection().toString()) === 'MustShip.gushinets@gmail.com', 'Резервное выделение email не работает');
  await page.evaluate(() => { navigator.clipboard.writeText = window.savedClipboardWrite; window.getSelection().removeAllRanges(); });

  const sizes = [[320, 740], [360, 800], [375, 812], [390, 844], [430, 932], [521, 900], [600, 900], [768, 1024], [844, 390], [932, 430], [978, 775], [1320, 775], [1440, 900]];
  const responsive = [];
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height });
    await page.goto('http://127.0.0.1:4173/');
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    check(overflow <= 1, `Горизонтальное переполнение на ширине ${width}: ${overflow}`);
    check(await page.locator('.hero-title').isVisible(), `Пропал заголовок на ширине ${width}`);
    check(await page.locator('.service h3').evaluateAll(elements => elements.every(el => el.scrollWidth <= el.clientWidth + 1 && el.getBoundingClientRect().right <= el.closest('.service').getBoundingClientRect().right - 1)), `Заголовок выходит за карточку на ширине ${width}`);
    if (width <= 960) {
      const mobile = await page.evaluate(() => {
        const luminance = (color) => {
          const rgb = color.match(/[\d.]+/g).slice(0, 3).map((n) => { const c = Number(n) / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; });
          return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
        };
        const contrast = (text, background) => (Math.max(luminance(text), luminance(background)) + .05) / (Math.min(luminance(text), luminance(background)) + .05);
        const paper = getComputedStyle(document.body).backgroundColor;
        const cta = getComputedStyle(document.querySelector('.contact-cta'));
        return {
        heroFont: parseFloat(getComputedStyle(document.querySelector('.hero-copy')).fontSize),
        teamFont: parseFloat(getComputedStyle(document.querySelector('.member-copy')).fontSize),
        targets: [...document.querySelectorAll('.header a, .hero-actions a, .copy-email')].every((el) => { const r = el.getBoundingClientRect(); return r.width >= 43.5 && r.height >= 43.5; }),
        clipped: [...document.querySelectorAll('.hand-title, .service p, .service h3, .member h3, .member-copy, .email-strip')].filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.className),
        overlapping: [...document.querySelectorAll('.service')].some((el) => el.querySelector('p').getBoundingClientRect().bottom > el.querySelector('.service-drawing').getBoundingClientRect().top + 2),
        contrast: [...document.querySelectorAll('.service p, .member-copy, .team-intro, .contact-checklist ul, .skills')].every((el) => contrast(getComputedStyle(el).color, paper) >= 4.5) && contrast(cta.color, cta.backgroundColor) >= 4.5,
        };
      });
      check(mobile.heroFont >= 16 && mobile.teamFont >= 15, `Мелкий текст на ширине ${width}`);
      check(mobile.targets, `Слишком маленькая область нажатия на ширине ${width}`);
      check(mobile.contrast, `Недостаточный контраст текста на ширине ${width}`);
      check(mobile.clipped.length === 0 && !mobile.overlapping, `Обрезанный текст или наложение на ширине ${width}: ${mobile.clipped}`);
      await cards.nth(1).click();
      check(await page.locator('#project-dialog').isVisible(), `Диалог не открывается на ширине ${width}`);
      check(await page.locator('#project-dialog').evaluate((el) => el.scrollWidth <= el.clientWidth + 1), `Диалог переполнен на ширине ${width}`);
      await page.getByRole('button', { name: 'Закрыть описание проекта' }).click();
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    responsive.push({ width, height, overflow });
    if ([320, 390, 768, 1440].includes(width)) await page.screenshot({ path: `output/playwright/${width <= 960 ? 'mobile' : 'desktop'}-${width}.png`, fullPage: true, scale: 'css' });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4173/');
  await page.screenshot({ path: 'output/playwright/mobile-390-top.png', scale: 'css' });
  await page.getByRole('navigation').getByRole('link', { name: 'Услуги' }).click();
  await page.screenshot({ path: 'output/playwright/mobile-390-services.png', scale: 'css' });
  await page.getByRole('navigation').getByRole('link', { name: 'О нас' }).click();
  await page.screenshot({ path: 'output/playwright/mobile-390-team.png', scale: 'css' });
  await page.getByRole('navigation').getByRole('link', { name: 'Контакты' }).click();
  await page.screenshot({ path: 'output/playwright/mobile-390-contact.png', scale: 'css' });
  check(errors.length === 0, `Ошибки JavaScript: ${errors.join(', ')}`);
  await page.setViewportSize({ width: 977, height: 1610 });
  await page.goto('http://127.0.0.1:4173/');
  return { passed: true, layout, projects: 5, clipboard: 'copy and permission fallback passed', responsive, errors };
}
