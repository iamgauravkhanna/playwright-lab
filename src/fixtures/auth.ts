import { type Page, test as base, expect } from '@playwright/test';

type AuthFixtures = {
  signedInPage: Page;
};

export const test = base.extend<AuthFixtures>({
  signedInPage: async ({ page, context }, use) => {
    await context.addCookies([
      {
        name: 'lab_user',
        value: 'Ada Lovelace',
        url: 'http://127.0.0.1:4173',
      },
    ]);
    await page.goto('/fixtures');
    await use(page);
  },
});

export { expect };
