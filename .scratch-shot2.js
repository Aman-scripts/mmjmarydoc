const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome-stable' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const el = await page.getByText('Find Care in').first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/claude-1000/-home-aman-Desktop-mmjmarydoc/5af0ae25-4b8c-4c8c-82f8-4494806b89ee/scratchpad/desktop-stats2.png' });
  await browser.close();
})();
