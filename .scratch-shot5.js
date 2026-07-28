const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome-stable' });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('div')).filter(el => {
      const bg = getComputedStyle(el).background || '';
      return bg.includes('146, 106, 54') || bg.includes('146,106,54');
    });
    return els.map(el => ({ cls: el.className.slice(0,40), top: el.getBoundingClientRect().top + window.scrollY, h: el.getBoundingClientRect().height }));
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
