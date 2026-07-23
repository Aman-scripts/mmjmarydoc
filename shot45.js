const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  const targetY = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('h2')).filter(e => e.textContent.includes('Hear From'));
    const visible = els.filter(e => {
      const sec = e.closest('section');
      return sec && getComputedStyle(sec).display !== 'none';
    });
    const target = visible[0] || els[0];
    const rect = target.getBoundingClientRect();
    return rect.top + window.scrollY - window.innerHeight * 0.88 - 5;
  });

  await page.evaluate((y) => window.scrollTo(0, y), targetY);
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'C:/Users/khush/AppData/Local/Temp/claude/c--Users-khush-OneDrive-Desktop-marrie-dock/169ec61c-610a-4153-86b6-f3aac2f55201/scratchpad/scrollfloat-before.png' });

  await page.evaluate((y) => window.scrollTo(0, y + 60), targetY);
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'C:/Users/khush/AppData/Local/Temp/claude/c--Users-khush-OneDrive-Desktop-marrie-dock/169ec61c-610a-4153-86b6-f3aac2f55201/scratchpad/scrollfloat-mid.png' });

  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/khush/AppData/Local/Temp/claude/c--Users-khush-OneDrive-Desktop-marrie-dock/169ec61c-610a-4153-86b6-f3aac2f55201/scratchpad/scrollfloat-after.png' });

  console.log('errors:', errors);
  await browser.close();
})();
