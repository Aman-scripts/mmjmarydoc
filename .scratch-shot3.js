const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome-stable' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const info = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('div,section')).filter(el => {
      const bg = getComputedStyle(el).background || '';
      return bg.includes('926A36') || bg.includes('146, 106, 54');
    });
    return els.map(el => ({ tag: el.tagName, cls: el.className.slice(0,60), top: el.getBoundingClientRect().top + window.scrollY, h: el.getBoundingClientRect().height }));
  });
  console.log(JSON.stringify(info, null, 2));
  console.log('doc height', await page.evaluate(() => document.body.scrollHeight));
  await browser.close();
})();
