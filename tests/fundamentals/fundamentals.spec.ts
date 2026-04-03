import { expect, test } from '@playwright/test';

test('fundamentals: browser, context, and page are isolated', async ({
  browser,
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Playwright Fundamentals');

  // The built-in `page` fixture already uses a fresh browser context for this test.
  // We also create manual contexts here to show the isolation boundary directly.
  const firstContext = await browser.newContext();
  const secondContext = await browser.newContext();
  try {
    const firstPage = await firstContext.newPage();
    await firstPage.goto('http://127.0.0.1:4173/');
    await firstPage.evaluate(() =>
      localStorage.setItem('lab-visit', 'first-context'),
    );

    const secondPage = await secondContext.newPage();
    await secondPage.goto('http://127.0.0.1:4173/');

    await expect(secondPage.locator('#storage-result')).toHaveText(
      'Local storage value: not set',
    );
  } finally {
    await firstContext.close();
    await secondContext.close();
  }
});

test('fundamentals: relative navigation uses baseURL', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('context-note')).toHaveText(
    'Browser context ready',
  );
  await page.getByRole('button', { name: 'Increment counter' }).click();
  await expect(page.locator('#count-result')).toHaveText('Count: 1');
});
