import { type Locator, expect } from '@playwright/test';

export async function expectStatusBadge(
  locator: Locator,
  expectedText: string,
) {
  await expect(locator).toHaveText(expectedText);
}
