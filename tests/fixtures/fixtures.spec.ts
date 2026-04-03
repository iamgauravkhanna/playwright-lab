import { expect, test } from '../../src/fixtures/auth';

test.describe('fixtures and hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fixtures');
  });

  test.afterEach(async ({ page }) => {
    await expect(page.getByText('Fixtures and hooks')).toBeVisible();
  });

  test('custom fixture centralizes session state', async ({ signedInPage }) => {
    await expect(
      signedInPage.getByText('Signed in as Ada Lovelace'),
    ).toBeVisible();
    await signedInPage
      .getByRole('button', { name: 'Load seeded data' })
      .click();
    await expect(signedInPage.locator('#seed-state')).toHaveText(
      'Seed state: ready',
    );
  });

  test('hooks provide repeatable setup around each test', async ({ page }) => {
    await expect(page.locator('#session-greeting')).toHaveText(
      'Anonymous session',
    );
  });
});
