import { test as base, expect } from '@playwright/test';
import { LabPage } from '../pages/lab-page';

type LabFixtures = {
  labPage: LabPage;
};

export const test = base.extend<LabFixtures>({
  labPage: async ({ page }, use) => {
    const labPage = new LabPage(page);
    await labPage.goto();
    await use(labPage);
  },
});

export { expect };
