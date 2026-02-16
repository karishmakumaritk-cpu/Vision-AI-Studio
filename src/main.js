const RAW_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '/api';
const HEALTH_PATHS = ['/health', '/'];

const app = document.querySelector('#app');

app.innerHTML = `
  <h1>Vision AI Studio</h1>
  <p>
    Frontend + backend connection verify ho raha hai. Agar Render free tier sleep me ho,
    first response me delay aa sakta hai.
  </p>

  <div class="status" id="status-box">
    <strong>Status:</strong> <span id="status-text">Checking backend...</span>
  </div>

  <p><strong>API Base:</strong> <code id="backend-url"></code></p>

  <details>
    <summary>Troubleshooting (Vercel stuck on one page)</summary>
    <ul>
      <li>Vercel env var set karo (optional): <code>VITE_BACKEND_URL</code></li>
      <li>Best: frontend se <code>/api</code call karo (Vercel rewrite enabled)</li>
      <li>Render backend me <code>/health</code route return hona chahiye</li>
      <li>Agar blank ho, browser console me network errors check karo</li>
    </ul>
  </details>

  <pre id="response-preview" class="response">Waiting for response preview...</pre>
`;

const statusText = document.querySelector('#status-text');
const statusBox = document.querySelector('#status-box');
const backendUrlEl = document.querySelector('#backend-url');
const preview = document.querySelector('#response-preview');
backendUrlEl.textContent = RAW_BACKEND_URL;

const trimSlash = (value) => value.replace(/\/$/, '');

async function tryFetch(path) {
  const endpoint = `${trimSlash(RAW_BACKEND_URL)}${path}`;
  const startedAt = Date.now();
  const response = await fetch(endpoint, { method: 'GET' });
  const tookMs = Date.now() - startedAt;
  const body = await response.text();
  return { endpoint, response, tookMs, body };
}

async function checkBackend() {
  for (const path of HEALTH_PATHS) {
    try {
      const { endpoint, response, tookMs, body } = await tryFetch(path);

      if (!response.ok) {
        statusText.textContent = `Reachable but ${response.status} on ${path} (${tookMs}ms)`;
        statusBox.className = 'status warn';
        preview.textContent = `Endpoint: ${endpoint}\nStatus: ${response.status}\n\n${body.slice(0, 800)}`;
        continue;
      }

      statusText.textContent = `Backend connected ✅ (${tookMs}ms via ${path})`;
      statusBox.className = 'status ok';
      preview.textContent = `Endpoint: ${endpoint}\nStatus: ${response.status}\n\n${body.slice(0, 800)}`;
      return;
    } catch (error) {
      statusText.textContent = `Request failed on ${path}: ${error?.message || 'Unknown error'}`;
      statusBox.className = 'status err';
      preview.textContent = String(error?.stack || error?.message || error);
    }
  }
}

checkBackend();
