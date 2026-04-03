import { expect, test } from '@playwright/test';

test('waits: rely on auto-waiting for UI changes', async ({ page }) => {
  await page.goto('/waits');

  await page.getByRole('button', { name: 'Load panel' }).click();
  await expect(page.getByTestId('delayed-panel')).toBeVisible();
});

test('waits: use explicit waits for response and load state changes', async ({
  page,
}) => {
  await page.goto('/waits');

  await page.waitForLoadState('domcontentloaded');
  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith('/api/status') && response.ok(),
  );
  await page.getByRole('button', { name: 'Fetch status' }).click();
  await responsePromise;
  await expect(page.locator('#response-status')).toHaveText('Response: ok');

  // `waitForSelector` is best reserved for cases where you need a specific DOM state.
  await page.waitForSelector('#spinner', { state: 'hidden' });
});
