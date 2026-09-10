import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
await mkdir('review-artifacts', { recursive: true });
for (const width of [1440, 1024, 768, 390, 320]) {
  for (const theme of ['light', 'dark']) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      colorScheme: theme,
      reducedMotion: 'reduce',
    });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator('img').all()) {
      if (await img.isVisible()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((element) => element.decode());
      }
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `review-artifacts/${width}-${theme}-hero.png` });
    await page.screenshot({ path: `review-artifacts/${width}-${theme}.png`, fullPage: true });
    const result = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      theme: document.documentElement.dataset.theme,
      brokenImages: [...document.images]
        .filter((img) => img.getClientRects().length && (!img.complete || !img.naturalWidth))
        .map((img) => img.src),
    }));
    console.log(JSON.stringify({ ...result, errors }));
    await page.close();
  }
}
await browser.close();
