export const interviewQuestions = [
  {
    question: 'What is a browser context?',
    answer:
      'An isolated incognito-like session with separate storage, cookies, and permissions.',
  },
  {
    question: 'Why prefer locators over element handles?',
    answer:
      'Locators re-resolve and auto-wait, which makes tests more resilient.',
  },
  {
    question: 'When should you use request.newContext()?',
    answer:
      'Use it for isolated API setup, verification, and seeding independent of the browser.',
  },
] as const;
