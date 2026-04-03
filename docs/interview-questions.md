# Playwright Interview Questions

## 1. What is a browser context?

A browser context is an isolated session similar to an incognito window. It has separate cookies, storage, and permissions, so tests can run without leaking state into each other.

## 2. Why use locators instead of element handles?

Locators re-resolve and auto-wait. That makes them safer and more resilient than grabbing a one-time element reference.

## 3. What is the default isolation model in Playwright Test?

Each test gets its own browser context by default. That keeps localStorage, sessionStorage, cookies, and page state isolated.

## 4. When should you use explicit waits?

Use them when the test needs a concrete browser or network event, such as waiting for a response, waiting for a load state, or waiting for a disappearing spinner. Avoid `waitForTimeout`.

## 5. What belongs in a Page Object Model?

Selectors, actions, and domain-specific assertions that would otherwise be repeated across tests.

## 6. When should you use `request.newContext()`?

Use it for API setup, seeding, verification, and cleanup that should be isolated from the browser session.
