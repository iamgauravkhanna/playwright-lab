# Playwright Lab

This repository is a TypeScript Playwright learning lab with small runnable examples for the main interview topics:

- fundamentals
- architecture and runtime model
- setup and configuration
- locators and selectors
- user actions and interactions
- assertions
- auto-waiting and waits
- Page Object Model
- fixtures and hooks
- API testing with `request.newContext()`
- screenshots, video, tracing, and debugging
- interview questions and quiz examples

## Structure

- `tests/fundamentals/` - browser, context, and page isolation
- `tests/locators/` - semantic locator examples
- `tests/actions/` - user interactions
- `tests/assertions/` - assertion patterns
- `tests/waits/` - waiting strategies
- `tests/pom/` - page object usage
- `tests/fixtures/` - custom fixture examples
- `tests/api/` - API request context examples
- `tests/debugging/` - screenshots and debugging helpers
- `tests/interview/` - interview quiz checks
- `src/pages/` - reusable page objects
- `src/fixtures/` - custom fixtures
- `src/utils/` - small shared helpers
- `docs/` - concise concepts and interview notes

## Run

```bash
npm install
npm run install-playwright
npm run test
```

Useful commands:

```bash
npm run test:headed
npm run test:debug
npm run test:report
npm run typecheck
npm run lint
```

## Local demo server

The lab serves all examples from a local Playwright web server on `http://127.0.0.1:4173`.
That keeps the tests deterministic and CI-friendly.

## Learning path

1. Start with `tests/fundamentals/fundamentals.spec.ts`.
2. Move to `tests/locators/locators.spec.ts` and `tests/actions/actions.spec.ts`.
3. Read `docs/playwright-concepts.md`.
4. Run `tests/assertions/assertions.spec.ts` and `tests/waits/waits.spec.ts`.
5. Inspect the `src/pages/lab-page.ts` page object and `tests/pom/pom.spec.ts`.
6. Look at `src/fixtures/auth.ts` and `tests/fixtures/fixtures.spec.ts`.
7. Use `tests/api/api.spec.ts` for request-context API calls.
8. Finish with `tests/debugging/debugging.spec.ts` and `tests/interview/interview-quiz.spec.ts`.

## Test Note

This README was updated as a harmless change for a git push test.
