# Playwright Concepts

## Fundamentals

- `browser` is the top-level runtime. It starts a browser process.
- `browserContext` is an isolated session. It has its own cookies, storage, permissions, and viewport state.
- `page` is a tab inside a context.
- Playwright Test creates a fresh context for each test by default, which is the main isolation boundary.

## Architecture and runtime model

The test runner process coordinates the test files.
The browser process runs Chromium.
The Playwright driver communicates with the browser using the browser protocol and isolates each test by creating a new context.

That means a failing test should not leak state into the next test unless you explicitly share state yourself.

## Setup and configuration

- `baseURL` lets you use relative URLs like `page.goto('/locators')`.
- `headless` is the default for CI.
- `retries` help stabilize flaky failures in CI without hiding them locally.
- `trace`, `video`, and `screenshot` settings give you diagnostics when tests fail.
- `timeout` controls the test deadline.
- `expect.timeout` controls how long Playwright waits for assertions.

## Locators

Prefer:

- `getByRole`
- `getByLabel`
- `getByPlaceholder`
- `getByText`
- `getByTestId`

Only fall back to CSS when you do not have a better semantic locator.

## Waiting

Prefer auto-waiting and assertions over manual sleeps.
Use explicit waits only when the test needs a specific network or browser state.

## Debugging

- Run with `--debug` for step-by-step debugging.
- Use `test.only` locally to isolate one test.
- Use `page.pause()` when you need to inspect the browser interactively.
- Open traces with `npx playwright show-trace <trace.zip>`.
