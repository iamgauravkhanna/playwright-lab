import { expect, test } from '@playwright/test';

test('locators: prefer semantic locators over CSS', async ({ page }) => {
  await page.goto('/locators');

  await expect(
    page.getByRole('button', { name: 'Save profile' }),
  ).toBeVisible();
  await page.getByLabel('Email address').fill('ada@example.com');
  await expect(page.getByLabel('Email address')).toHaveValue('ada@example.com');

  await page.getByPlaceholder('Search docs').fill('locators');
  await expect(page.getByPlaceholder('Search docs')).toHaveValue('locators');

  await expect(
    page.getByText('Playwright makes browser automation reliable.'),
  ).toBeVisible();
  await expect(page.getByTestId('status-pill')).toHaveText('Ready');

  // CSS is a fallback, not the first choice.
  await expect(page.locator('.fallback-chip')).toHaveText(
    'Fallback CSS locator',
  );
});
