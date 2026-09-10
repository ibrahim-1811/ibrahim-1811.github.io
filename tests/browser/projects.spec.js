import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ILP_TITLE =
  'Outcome-Aware ILP for Explainable Grid-Aware Task Allocation in Multi-Robot Warehouse Systems';
const posterStub = readFileSync('public/images/projects/mrta-control.webp');
const trigger = (page, slug) => page.locator(`[data-project-trigger="${slug}"]`).first();

// Keep the suite offline and deterministic: stub YouTube thumbnails and the player.
test.beforeEach(async ({ page }) => {
  await page.route('https://i.ytimg.com/**', (route) =>
    route.fulfill({ body: posterStub, contentType: 'image/webp' }),
  );
  await page.route('https://www.youtube-nocookie.com/**', (route) =>
    route.fulfill({
      body: '<!doctype html><title>Player</title><p>Player</p>',
      contentType: 'text/html',
    }),
  );
});

test('a project card opens a large dialog that Escape closes, returning focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await trigger(page, 'simplr').click();
  const dialog = page.getByRole('dialog', { name: 'SIMPLR' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute('aria-modal', 'true');
  await expect(page).toHaveURL(/\?project=simplr$/);
  const box = await dialog.boundingBox();
  expect(box.width / 1440).toBeGreaterThan(0.8);
  expect(box.width / 1440).toBeLessThan(0.92);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe(
    'hidden',
  );
  expect(
    Number.parseFloat(
      await dialog.evaluate((element) => getComputedStyle(element).animationDuration),
    ),
  ).toBeLessThan(0.01);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger(page, 'simplr')).toBeFocused();
  await expect(page).not.toHaveURL(/project=/);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe(
    'hidden',
  );
});

test('keyboard users can reach, open, traverse and leave a project dialog', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page
    .getByRole('link', { name: /LinkedIn/ })
    .first()
    .focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(trigger(page, 'outcome-aware-ilp')).toBeFocused();
  const ring = await page
    .locator('#outcome-aware-ilp')
    .evaluate(
      (card) => `${getComputedStyle(card).outlineStyle} ${getComputedStyle(card).outlineWidth}`,
    );
  expect(ring).toBe('solid 3px');

  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: ILP_TITLE });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: ILP_TITLE })).toBeFocused();
  for (let step = 0; step < 14; step += 1) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  }
  const close = dialog.getByRole('button', { name: 'Close project details' });
  await close.focus();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: /Next project/ })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger(page, 'outcome-aware-ilp')).toBeFocused();
});

test('YouTube players are created only after Play, one at a time', async ({ page }) => {
  const playerRequests = [];
  page.on('request', (request) => {
    if (request.url().startsWith('https://www.youtube-nocookie.com/'))
      playerRequests.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('iframe')).toHaveCount(0);
  await trigger(page, 'autonomous-mobile-robot').click();
  const dialog = page.getByRole('dialog', { name: 'Autonomous Mobile Robot (AMR)' });
  await expect(dialog.getByRole('button', { name: /^Play video/ })).toHaveCount(3);
  await expect(dialog.locator('iframe')).toHaveCount(0);
  expect(playerRequests).toEqual([]);

  await dialog.getByRole('button', { name: 'Play video: Software stack in simulation' }).click();
  const player = dialog.locator('iframe');
  await expect(player).toHaveCount(1);
  await expect(player).toHaveAttribute('title', 'Software stack in simulation');
  await expect(player).toHaveAttribute(
    'src',
    /^https:\/\/www\.youtube-nocookie\.com\/embed\/AcolNEWpMdM\?autoplay=1/,
  );
  const { width, height } = await player.boundingBox();
  expect(Math.abs(width / height - 16 / 9)).toBeLessThan(0.02);

  await dialog.getByRole('button', { name: 'Play video: Autonomous frontier exploration' }).click();
  await expect(dialog.locator('iframe')).toHaveCount(1);
  await expect(dialog.locator('iframe')).toHaveAttribute(
    'title',
    'Autonomous frontier exploration',
  );
  expect(playerRequests).toHaveLength(2);
});

test('a failed thumbnail keeps the video frame stable and playable', async ({ page }) => {
  await page.unroute('https://i.ytimg.com/**');
  await page.route('https://i.ytimg.com/**', (route) => route.abort());
  await page.goto('/?project=robothon-2025');
  const dialog = page.getByRole('dialog', { name: 'Robothon 2025 Grand Challenge' });
  const play = dialog.getByRole('button', { name: 'Play video: Robothon 2025 — first trial run' });
  await expect(play).toBeVisible();
  const frame = await dialog.locator('.video-frame').first().boundingBox();
  expect(Math.abs(frame.width / frame.height - 16 / 9)).toBeLessThan(0.02);
  await expect(dialog.locator('.video-frame img')).toHaveCount(0);
});

test('on mobile the dialog is a near full-screen sheet with a reachable close button', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await trigger(page, 'outcome-aware-ilp').click();
  const dialog = page.getByRole('dialog', { name: ILP_TITLE });
  await expect(dialog).toBeVisible();
  const box = await dialog.boundingBox();
  expect(box.x).toBeLessThanOrEqual(1);
  expect(box.width).toBeGreaterThanOrEqual(388);
  expect(box.height).toBeGreaterThan(820);
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
  const close = dialog.getByRole('button', { name: 'Close project details' });
  const closeBox = await close.boundingBox();
  expect(closeBox.width).toBeGreaterThanOrEqual(40);
  expect(closeBox.height).toBeGreaterThanOrEqual(40);
  await dialog.evaluate((element) => element.scrollTo(0, element.scrollHeight));
  await expect(close).toBeInViewport();
  await close.click();
  await expect(dialog).toBeHidden();
  await expect(trigger(page, 'outcome-aware-ilp')).toBeFocused();
});

test('shared project links open directly and browser Back closes an opened dialog', async ({
  page,
}) => {
  await page.goto('/?project=intrinsic-ai-challenge');
  const intrinsic = page.getByRole('dialog', { name: 'Intrinsic AI for Industry Challenge' });
  await expect(intrinsic).toBeVisible();
  await expect(intrinsic.locator('.project-metrics')).toContainText('2,000');
  await expect(intrinsic.locator('.project-metrics')).toContainText('Successful demonstrations');
  await expect(intrinsic).not.toContainText(/\b157\b/);
  await intrinsic.getByRole('button', { name: 'Close project details' }).click();
  await expect(page).not.toHaveURL(/project=/);

  await trigger(page, 'robothon-2025').click();
  await expect(page).toHaveURL(/\?project=robothon-2025$/);
  await page.goBack();
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(trigger(page, 'robothon-2025')).toBeFocused();
});

for (const width of [1440, 390]) {
  for (const theme of ['light', 'dark']) {
    test(`${width}px ${theme}: project dialogs are accessible and contained`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      for (const slug of [
        'simplr',
        'outcome-aware-ilp',
        'invite-industrial-manipulation',
        'autonomous-mobile-robot',
        'garrulus-power-electronics',
        'multi-robot-task-distribution',
      ]) {
        await trigger(page, slug).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        const results = await new AxeBuilder({ page })
          .include('[role="dialog"]')
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        expect(results.violations, slug).toEqual([]);
        expect(
          await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth),
          slug,
        ).toBe(true);
        await page.keyboard.press('Escape');
        await expect(dialog).toBeHidden();
      }
      expect(errors).toEqual([]);
    });
  }
}
