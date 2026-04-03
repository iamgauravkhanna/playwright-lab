import { expect, test } from '@playwright/test';
import { expectStatusBadge } from '../../src/utils/assertions';

test('assertions: readable expectations on locators and URLs', async ({
  page,
}) => {
  await page.goto('/assertions');

  await expect(page.locator('#headline')).toBeVisible();
  await expect(page.locator('#headline')).toHaveText(
    'Assertions make the intent explicit.',
  );
  await expect(page.locator('#value')).toHaveText('Status: ready');
  await expect(page.locator('#task-list li')).toHaveCount(3);

  await page.getByRole('button', { name: 'Show details' }).click();
  await expect(page).toHaveURL(/\/assertions\?view=details$/);
  await expect(page.locator('#details')).toBeVisible();

  // Soft assertions let you collect multiple checks before the test fails.
  await expect.soft(page.getByText('One')).toBeVisible();
  await expect.soft(page.getByText('Two')).toBeVisible();
  await expect.soft(page.getByText('Three')).toBeVisible();

  await page.goto('/actions');
  await page.getByLabel('Name').fill('Grace');
  await expect(page.getByLabel('Name')).toHaveValue('Grace');

  await expectStatusBadge(page.locator('#selected-value'), 'Selected: low');
});
