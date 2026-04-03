import { expect, test } from '@playwright/test';
import { interviewQuestions } from '../../src/interview/questions';

test('interview quiz: verify the key topics are covered', async ({ page }) => {
  await page.goto('/interview');

  await expect(page.getByTestId('quiz-card')).toHaveCount(
    interviewQuestions.length,
  );
  await expect(
    page.getByRole('heading', { name: interviewQuestions[0].question }),
  ).toBeVisible();
  await expect(page.getByText(interviewQuestions[1].answer)).toBeVisible();
  await expect(page.getByText(interviewQuestions[2].question)).toBeVisible();
});
