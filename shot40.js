const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const texts = ['Three Simple Steps', 'Four things', 'Get Started in Just a', 'STANDARDS', 'Hear From'];
  for (const t of texts) {
    const el = await page.locator(`text=${t}`).first();
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    // scroll a bit further to trigger the scrub animation partway
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(600);
    const safeName = t.replace(/[^a-z0-9]/gi, '_');
    await page.screenshot({ path: `C:/Users/khush/AppData/Local/Temp/claude/c--Users-khush-OneDrive-Desktop-marrie-dock/169ec61c-610a-4153-86b6-f3aac2f55201/scratchpad/sf_${safeName}.png` });
  }

  console.log('errors:', errors);
  await browser.close();
})();
