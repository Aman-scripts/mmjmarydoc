const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome-stable' });

  
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/claude-1000/-home-aman-Desktop-mmjmarydoc/5af0ae25-4b8c-4c8c-82f8-4494806b89ee/scratchpad/desktop-hero.png' });

    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.35));
    await page.waitForTimeout(800);
    await page.screenshot({ path: '/tmp/claude-1000/-home-aman-Desktop-mmjmarydoc/5af0ae25-4b8c-4c8c-82f8-4494806b89ee/scratchpad/desktop-stats.png' });
    await page.close();
  }

  
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: '/tmp/claude-1000/-home-aman-Desktop-mmjmarydoc/5af0ae25-4b8c-4c8c-82f8-4494806b89ee/scratchpad/mobile-hero.png' });

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.3));
    await page.waitForTimeout(800);
    await page.screenshot({ path: '/tmp/claude-1000/-home-aman-Desktop-mmjmarydoc/5af0ae25-4b8c-4c8c-82f8-4494806b89ee/scratchpad/mobile-stats.png' });
    await page.close();
  }

  await browser.close();
})();
