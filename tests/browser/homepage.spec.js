import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const width of [1440, 1024, 768, 390, 320]) {
  for (const theme of ['light', 'dark']) {
    test(`${width}px ${theme}: responsive, accessible and free of runtime errors`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      for (const img of await page.locator('img').all()) {
        if (await img.isVisible()) {
          await img.scrollIntoViewIfNeeded();
          await expect(img).toHaveJSProperty('complete', true);
          expect(await img.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
        }
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const accessibility = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test('manual theme survives reload and takes priority over the OS', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBe('light');
});

test('bootstrap recovers from unavailable storage', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage disabled');
      },
    });
  });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('keyboard skip link and mobile menu manage focus and destinations', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  const menu = page.getByRole('button', { name: 'Open navigation' });
  await menu.focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: 'Work' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.press('Enter');
  await page
    .getByRole('navigation', { name: 'Mobile' })
    .getByRole('link', { name: 'Research' })
    .click();
  await expect(page).toHaveURL(/#research$/);
  await expect(page.locator('#research')).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  const headingTop = await page
    .locator('#research-heading')
    .evaluate((element) => element.getBoundingClientRect().top);
  const headerBottom = await page
    .locator('header')
    .evaluate((element) => element.getBoundingClientRect().bottom);
  expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
});

test('visible keyboard focus and reduced motion in both themes', async ({ page }) => {
  for (const theme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('button', { name: /Switch to/ })).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    const focus = await page.evaluate(() => {
      const style = getComputedStyle(document.activeElement);
      return {
        width: style.outlineWidth,
        style: style.outlineStyle,
        scroll: getComputedStyle(document.documentElement).scrollBehavior,
      };
    });
    expect(focus.width).toBe('3px');
    expect(focus.style).toBe('solid');
    expect(focus.scroll).toBe('auto');
  }
});

test('static assets, metadata and all in-page links survive production build', async ({
  page,
  request,
}) => {
  await page.goto('/');
  for (const link of await page.locator('a[href^="#"]').all()) {
    const href = await link.getAttribute('href');
    await expect(page.locator(href)).toHaveCount(1);
  }
  const cv = await request.get('/Mohammad_Memon_CV_2026.pdf');
  expect(cv.status()).toBe(200);
  expect(cv.headers()['content-type']).toContain('application/pdf');
  expect((await cv.body()).subarray(0, 5).toString()).toBe('%PDF-');
  expect((await (await request.get('/CNAME')).text()).trim()).toBe('mohammadmemon.com');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://mohammadmemon.com/',
  );
  const structured = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  expect(structured['@type']).toBe('Person');
  expect(structured.name).toBe('Mohammad Ibrahim Memon');
  expect(structured.telephone).toBeUndefined();
  expect(await page.locator('iframe, video').count()).toBe(0);
});

test('CV and contact remain available with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4174');
  await expect(page.getByRole('heading', { name: 'Mohammad Ibrahim Memon' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'download my CV' })).toHaveAttribute(
    'href',
    '/Mohammad_Memon_CV_2026.pdf',
  );
  await context.close();
});

test('applies the saved theme before the React bundle can execute', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'));
  await page.route('**/assets/*.js', (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('#root')).toBeEmpty();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.locator('html').evaluate((element) => element.style.colorScheme)).toBe('dark');
});

test('visible header labels match accessible names for voice control', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  const result = await new AxeBuilder({page}).include('header').withRules(['label-content-name-mismatch']).analyze();
  expect(result.violations).toEqual([]);
});
