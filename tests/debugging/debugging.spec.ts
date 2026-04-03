import { writeFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

test('debugging: capture a screenshot and lean on config-based diagnostics', async ({
  page,
}, testInfo) => {
  await page.goto('/debugging');
  await page.getByRole('button', { name: 'Take note' }).click();
  await expect(page.locator('#snapshot-result')).toHaveText(
    'Snapshot: captured',
  );

  const screenshotPath = testInfo.outputPath('debugging-page.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });

  writeFileSync(
    testInfo.outputPath('trace-note.txt'),
    'Trace is captured by playwright.config.ts on first retry.',
  );
});
