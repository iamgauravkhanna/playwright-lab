import { expect, test } from '@playwright/test';
import { LabPage } from '../../src/pages/lab-page';

test('pom: page objects keep repeated selectors out of the test', async ({
  page,
}) => {
  const lab = new LabPage(page);

  await lab.goto();
  await lab.signIn('ada', 'secret');
  await lab.expectSignedInAs('ada');

  await lab.addTodo('Practice the POM');
  await expect(lab.todoItems).toHaveCount(2);
  await expect(lab.todoItems.nth(1)).toHaveText('Practice the POM');
});
