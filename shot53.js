const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 5955 - 300));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/khush/AppData/Local/Temp/claude/c--Users-khush-OneDrive-Desktop-marrie-dock/169ec61c-610a-4153-86b6-f3aac2f55201/scratchpad/features_heading2.png' });
  await browser.close();
})();
