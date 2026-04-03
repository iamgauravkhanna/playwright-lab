const http = require('node:http');
const { URL } = require('node:url');

const port = 4173;
const todos = [{ id: 1, title: 'Learn Playwright locators' }];
let nextTodoId = 2;

function htmlPage({ title, body, script = '' }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f7f7fb;
        --card: #ffffff;
        --text: #172033;
        --muted: #5a6478;
        --border: #d9deea;
        --accent: #2155d6;
        --success: #0f8a5f;
        --warning: #b35c00;
        font-family: Inter, system-ui, sans-serif;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: linear-gradient(180deg, #f7f7fb 0%, #eef3ff 100%);
        color: var(--text);
      }
      .shell {
        max-width: 1100px;
        margin: 0 auto;
        padding: 24px;
      }
      .nav {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 24px;
      }
      .nav a {
        color: var(--accent);
        text-decoration: none;
        font-weight: 600;
      }
      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 16px 40px rgba(17, 24, 39, 0.06);
        margin-bottom: 16px;
      }
      .grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      }
      .stack > * + * {
        margin-top: 12px;
      }
      button, input, select, textarea {
        font: inherit;
      }
      button {
        border: 0;
        background: var(--accent);
        color: white;
        border-radius: 10px;
        padding: 10px 14px;
        cursor: pointer;
      }
      input, select, textarea {
        width: 100%;
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 10px 12px;
        background: white;
      }
      .chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        border-radius: 999px;
        background: #edf2ff;
        color: #17348c;
        font-size: 14px;
      }
      .chip.success { background: #e7f7f0; color: var(--success); }
      .chip.warning { background: #fff3e6; color: var(--warning); }
      .muted { color: var(--muted); }
      .spacer {
        height: 840px;
        border-radius: 12px;
        border: 1px dashed var(--border);
        display: grid;
        place-items: center;
        color: var(--muted);
      }
      .dropzone {
        min-height: 84px;
        border: 2px dashed var(--border);
        border-radius: 12px;
        display: grid;
        place-items: center;
      }
      .draggable {
        width: 120px;
        padding: 12px;
        border-radius: 12px;
        background: #dbe8ff;
        color: #17348c;
        text-align: center;
        cursor: grab;
      }
      .toast {
        display: inline-block;
        padding: 10px 14px;
        border-radius: 12px;
        background: #f1f5ff;
        color: #17348c;
      }
      .hidden {
        display: none;
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <nav class="nav" aria-label="Learning lab navigation">
        <a href="/">Fundamentals</a>
        <a href="/locators">Locators</a>
        <a href="/actions">Actions</a>
        <a href="/assertions">Assertions</a>
        <a href="/waits">Waits</a>
        <a href="/pom">POM</a>
        <a href="/fixtures">Fixtures</a>
        <a href="/debugging">Debugging</a>
        <a href="/interview">Interview</a>
      </nav>
      ${body}
    </div>
    <script>
      ${script}
    </script>
  </body>
</html>`;
}

function renderHome() {
  return htmlPage({
    title: 'Playwright Fundamentals',
    body: `
      <main class="grid">
        <section class="card stack">
          <h1>Playwright fundamentals</h1>
          <p class="muted">This lab runs on a local demo server so every example stays deterministic.</p>
          <p data-testid="context-note" class="chip">Browser context ready</p>
          <button id="count-button" type="button">Increment counter</button>
          <p id="count-result">Count: 0</p>
          <p id="storage-result" class="muted">Local storage value: not set</p>
        </section>
      </main>
    `,
    script: `
      const countButton = document.querySelector('#count-button');
      const countResult = document.querySelector('#count-result');
      const storageResult = document.querySelector('#storage-result');
      const stored = localStorage.getItem('lab-visit');
      storageResult.textContent = 'Local storage value: ' + (stored ?? 'not set');
      let count = 0;
      countButton.addEventListener('click', () => {
        count += 1;
        countResult.textContent = 'Count: ' + count;
      });
    `,
  });
}

function renderLocators() {
  return htmlPage({
    title: 'Locators and Selectors',
    body: `
      <main class="grid">
        <section class="card stack">
          <h1>Locators and selectors</h1>
          <button type="button" aria-label="Save profile">Save profile</button>
          <label for="email">Email address</label>
          <input id="email" name="email" type="email" placeholder="name@example.com" />
          <input id="search" type="search" placeholder="Search docs" />
          <p>Playwright makes browser automation reliable.</p>
          <p data-testid="status-pill" class="chip success">Ready</p>
          <div class="fallback-chip chip warning">Fallback CSS locator</div>
        </section>
      </main>
    `,
  });
}

function renderActions() {
  return htmlPage({
    title: 'Actions and Interactions',
    body: `
      <main class="grid">
        <section class="card stack">
          <h1>Actions and interactions</h1>
          <label for="name">Name</label>
          <input id="name" name="name" placeholder="Type your name" />

          <label for="notes">Notes</label>
          <textarea id="notes" placeholder="Type some notes"></textarea>

          <label for="priority">Priority</label>
          <select id="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label><input id="subscribe" type="checkbox" /> Subscribe to updates</label>

          <button id="click-me" type="button">Click me</button>
          <p id="click-count">Clicks: 0</p>
          <p id="typed-value">Typed: </p>
          <p id="selected-value">Selected: low</p>
          <p id="subscribed-value">Subscribed: no</p>
          <p id="hover-state">Hover state: idle</p>
          <p id="press-state">Pressed: none</p>
          <p id="file-name">File: none</p>
          <p id="drop-state">Drop target: waiting</p>
          <label for="upload">Upload a file</label>
          <input id="upload" type="file" />

          <div class="grid" style="grid-template-columns: 1fr 1fr;">
            <div id="drag-item" class="draggable" draggable="true">Drag me</div>
            <div id="drop-target" class="dropzone">Drop here</div>
          </div>

          <div id="hover-target" class="chip">Hover target</div>
          <input id="key-input" placeholder="Press a key and hit Enter" />
          <div class="spacer">Scroll down to the bottom to test scroll behavior</div>
          <button id="bottom-button" type="button">Bottom action</button>
        </section>
      </main>
    `,
    script: `
      const clickButton = document.querySelector('#click-me');
      const clickCount = document.querySelector('#click-count');
      const nameInput = document.querySelector('#name');
      const notesInput = document.querySelector('#notes');
      const priority = document.querySelector('#priority');
      const subscribe = document.querySelector('#subscribe');
      const typedValue = document.querySelector('#typed-value');
      const selectedValue = document.querySelector('#selected-value');
      const subscribedValue = document.querySelector('#subscribed-value');
      const hoverTarget = document.querySelector('#hover-target');
      const hoverState = document.querySelector('#hover-state');
      const keyInput = document.querySelector('#key-input');
      const pressState = document.querySelector('#press-state');
      const upload = document.querySelector('#upload');
      const fileName = document.querySelector('#file-name');
      const dragItem = document.querySelector('#drag-item');
      const dropTarget = document.querySelector('#drop-target');
      const dropState = document.querySelector('#drop-state');
      const bottomButton = document.querySelector('#bottom-button');

      let clicks = 0;
      clickButton.addEventListener('click', () => {
        clicks += 1;
        clickCount.textContent = 'Clicks: ' + clicks;
      });
      nameInput.addEventListener('input', () => {
        typedValue.textContent = 'Typed: ' + nameInput.value;
      });
      notesInput.addEventListener('input', () => {
        typedValue.textContent = 'Typed: ' + notesInput.value;
      });
      priority.addEventListener('change', () => {
        selectedValue.textContent = 'Selected: ' + priority.value;
      });
      subscribe.addEventListener('change', () => {
        subscribedValue.textContent = 'Subscribed: ' + (subscribe.checked ? 'yes' : 'no');
      });
      hoverTarget.addEventListener('mouseenter', () => {
        hoverState.textContent = 'Hover state: active';
      });
      hoverTarget.addEventListener('mouseleave', () => {
        hoverState.textContent = 'Hover state: idle';
      });
      keyInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          pressState.textContent = 'Pressed: Enter';
        }
      });
      upload.addEventListener('change', () => {
        fileName.textContent = 'File: ' + (upload.files?.[0]?.name ?? 'none');
      });
      dragItem.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', 'drag-item');
      });
      dropTarget.addEventListener('dragover', (event) => event.preventDefault());
      dropTarget.addEventListener('drop', (event) => {
        event.preventDefault();
        dropState.textContent = 'Drop target: received ' + event.dataTransfer.getData('text/plain');
      });
      bottomButton.addEventListener('click', () => {
        bottomButton.textContent = 'Clicked at bottom';
      });
    `,
  });
}

function renderAssertions() {
  return htmlPage({
    title: 'Assertions',
    body: `
      <main class="grid">
        <section class="card stack">
          <h1>Assertions</h1>
          <p id="headline">Assertions make the intent explicit.</p>
          <p id="value">Status: ready</p>
          <ul id="task-list">
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
          <button id="details-button" type="button">Show details</button>
          <p id="details" class="hidden">Details panel</p>
        </section>
      </main>
    `,
    script: `
      const detailsButton = document.querySelector('#details-button');
      const details = document.querySelector('#details');
      detailsButton.addEventListener('click', () => {
        details.classList.remove('hidden');
        history.pushState({}, '', '/assertions?view=details');
      });
    `,
  });
}

function renderWaits() {
  return htmlPage({
    title: 'Auto-waiting and waits',
    body: `
      <main class="grid">
        <section class="card stack">
          <h1>Auto-waiting and waits</h1>
          <p class="muted">The page fetches data and reveals UI after a short delay.</p>
          <button id="load-button" type="button">Load panel</button>
          <div id="spinner" class="chip warning">Loading...</div>
          <div id="delayed-panel" class="hidden" data-testid="delayed-panel">Panel ready</div>
          <p id="network-status">Network: idle</p>
          <button id="fetch-button" type="button">Fetch status</button>
          <p id="response-status">Response: none</p>
        </section>
      </main>
    `,
    script: `
      const spinner = document.querySelector('#spinner');
      const delayedPanel = document.querySelector('#delayed-panel');
      const loadButton = document.querySelector('#load-button');
      const networkStatus = document.querySelector('#network-status');
      const fetchButton = document.querySelector('#fetch-button');
      const responseStatus = document.querySelector('#response-status');

      const startLoad = () => {
        networkStatus.textContent = 'Network: loading';
        setTimeout(() => {
          spinner.classList.add('hidden');
          delayedPanel.classList.remove('hidden');
          networkStatus.textContent = 'Network: loaded';
        }, 600);
      };

      loadButton.addEventListener('click', startLoad);
      fetchButton.addEventListener('click', async () => {
        const response = await fetch('/api/status');
        const json = await response.json();
        responseStatus.textContent = 'Response: ' + json.status;
      });
      startLoad();
    `,
  });
}

function renderPom() {
  return htmlPage({
    title: 'Page Object Model',
    body: `
      <main class="grid">
        <section class="card stack">
          <h1>Page Object Model</h1>
          <form id="login-form">
            <label for="username">Username</label>
            <input id="username" name="username" placeholder="ada" />
            <label for="password">Password</label>
            <input id="password" name="password" type="password" placeholder="secret" />
            <button id="sign-in" type="submit">Sign in</button>
          </form>
          <p id="welcome">Signed out</p>
          <label for="new-item">New item</label>
          <input id="new-item" placeholder="Add a todo" />
          <button id="add-item" type="button">Add item</button>
          <ul id="todo-list">
            <li>Review POM methods</li>
          </ul>
        </section>
      </main>
    `,
    script: `
      const loginForm = document.querySelector('#login-form');
      const username = document.querySelector('#username');
      const welcome = document.querySelector('#welcome');
      const newItem = document.querySelector('#new-item');
      const addItem = document.querySelector('#add-item');
      const todoList = document.querySelector('#todo-list');

      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        welcome.textContent = 'Signed in as ' + username.value;
      });
      addItem.addEventListener('click', () => {
        const item = document.createElement('li');
        item.textContent = newItem.value;
        todoList.appendChild(item);
        newItem.value = '';
      });
    `,
  });
}

function renderFixtures() {
  return htmlPage({
    title: 'Fixtures and Hooks',
    body: `
      <main class="grid">
        <section class="card stack">
          <h1>Fixtures and hooks</h1>
          <p id="session-greeting">Anonymous session</p>
          <p id="seed-state">Seed state: empty</p>
          <button id="load-seed" type="button">Load seeded data</button>
        </section>
      </main>
    `,
    script: `
      const sessionGreeting = document.querySelector('#session-greeting');
      const seedState = document.querySelector('#seed-state');
      const loadSeed = document.querySelector('#load-seed');
      const cookie = document.cookie.split('; ').find((item) => item.startsWith('lab_user='));
      if (cookie) {
        sessionGreeting.textContent = 'Signed in as ' + decodeURIComponent(cookie.split('=')[1]);
      }
      loadSeed.addEventListener('click', () => {
        seedState.textContent = 'Seed state: ready';
      });
    `,
  });
}

function renderDebugging() {
  return htmlPage({
    title: 'Screenshots and Debugging',
    body: `
      <main class="grid">
        <section class="card stack">
          <h1>Screenshots, video, trace, and debugging</h1>
          <p id="debug-text">Use Playwright options to capture diagnostics on failure.</p>
          <button id="snapshot-button" type="button">Take note</button>
          <p id="snapshot-result">Snapshot: none</p>
        </section>
      </main>
    `,
    script: `
      const snapshotButton = document.querySelector('#snapshot-button');
      const snapshotResult = document.querySelector('#snapshot-result');
      snapshotButton.addEventListener('click', () => {
        snapshotResult.textContent = 'Snapshot: captured';
      });
    `,
  });
}

function renderInterview() {
  return htmlPage({
    title: 'Interview Prep',
    body: `
      <main class="grid">
        <section class="card stack">
          <h1>Interview prep quiz</h1>
          <article class="card" data-testid="quiz-card">
            <h2>What is a browser context?</h2>
            <p>An isolated incognito-like session with separate storage, cookies, and permissions.</p>
          </article>
          <article class="card" data-testid="quiz-card">
            <h2>Why prefer locators over element handles?</h2>
            <p>Locators re-resolve and auto-wait, which makes tests more resilient.</p>
          </article>
          <article class="card" data-testid="quiz-card">
            <h2>When should you use request.newContext()?</h2>
            <p>Use it for isolated API setup, verification, and seeding independent of the browser.</p>
          </article>
        </section>
      </main>
    `,
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);

  if (url.pathname === '/api/status') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify({ status: 'ok', timestamp: '2026-04-02T00:00:00.000Z' }),
    );
    return;
  }

  if (url.pathname === '/api/todos' && req.method === 'GET') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ items: todos }));
    return;
  }

  if (url.pathname === '/api/todos' && req.method === 'POST') {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
    }
    const parsed = body ? JSON.parse(body) : {};
    const created = { id: nextTodoId++, title: String(parsed.title ?? '') };
    todos.push(created);
    res.writeHead(201, { 'content-type': 'application/json' });
    res.end(JSON.stringify(created));
    return;
  }

  if (url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(renderHome());
    return;
  }

  if (url.pathname === '/locators') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(renderLocators());
    return;
  }

  if (url.pathname === '/actions') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(renderActions());
    return;
  }

  if (url.pathname === '/assertions') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(renderAssertions());
    return;
  }

  if (url.pathname === '/waits') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(renderWaits());
    return;
  }

  if (url.pathname === '/pom') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(renderPom());
    return;
  }

  if (url.pathname === '/fixtures') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(renderFixtures());
    return;
  }

  if (url.pathname === '/debugging') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(renderDebugging());
    return;
  }

  if (url.pathname === '/interview') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(renderInterview());
    return;
  }

  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.listen(port, '127.0.0.1', () => {
  process.stdout.write(`Demo server running at http://127.0.0.1:${port}\n`);
});
