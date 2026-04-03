import { writeFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

test('actions: click, fill, type, select, check, hover, press, upload, drag, scroll', async ({
  page,
}, testInfo) => {
  await page.goto('/actions');

  await page.getByRole('button', { name: 'Click me' }).click();
  await expect(page.locator('#click-count')).toHaveText('Clicks: 1');

  await page.getByLabel('Name').fill('Ada');
  await expect(page.locator('#typed-value')).toHaveText('Typed: Ada');

  await page.getByLabel('Notes').type('typed notes');
  await expect(page.locator('#typed-value')).toHaveText('Typed: typed notes');

  await page.getByLabel('Priority').selectOption('high');
  await expect(page.locator('#selected-value')).toHaveText('Selected: high');

  await page.getByLabel('Subscribe to updates').check();
  await expect(page.locator('#subscribed-value')).toHaveText('Subscribed: yes');
  await page.getByLabel('Subscribe to updates').uncheck();
  await expect(page.locator('#subscribed-value')).toHaveText('Subscribed: no');

  await page.getByText('Hover target').hover();
  await expect(page.locator('#hover-state')).toHaveText('Hover state: active');

  await page.getByPlaceholder('Press a key and hit Enter').fill('enter');
  await page.getByPlaceholder('Press a key and hit Enter').press('Enter');
  await expect(page.locator('#press-state')).toHaveText('Pressed: Enter');

  const filePath = testInfo.outputPath('playwright-lab.txt');
  writeFileSync(filePath, 'playwright lab');
  await page.getByLabel('Upload a file').setInputFiles(filePath);
  await expect(page.locator('#file-name')).toHaveText(
    'File: playwright-lab.txt',
  );

  await page.locator('#drag-item').dragTo(page.locator('#drop-target'));
  await expect(page.locator('#drop-state')).toContainText('received drag-item');

  await page.locator('#bottom-button').scrollIntoViewIfNeeded();
  await page.locator('#bottom-button').click();
  await expect(page.locator('#bottom-button')).toHaveText('Clicked at bottom');
});
