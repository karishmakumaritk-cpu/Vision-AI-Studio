const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || 'https://vision-ai-studio-backend.onrender.com';

const app = document.querySelector('#app');

app.innerHTML = `
  <h1>Vision AI Studio</h1>
  <p>
    Frontend ab backend health check karega. Agar pehli request slow ho, Render free tier
    sleep mode ki wajah se 30-60 sec lag sakte hain.
  </p>

  <div class="status" id="status-box">
    <strong>Status:</strong> <span id="status-text">Checking backend...</span>
  </div>

  <p><strong>Backend URL:</strong> <code id="backend-url"></code></p>

  <details>
    <summary>Deployment checklist (Vercel + Render)</summary>
    <ul>
      <li>Vercel env var set karo: <code>VITE_BACKEND_URL</code></li>
      <li>Render backend me CORS allow karo frontend origin ke liye</li>
      <li>Render start command confirm karo (e.g. <code>node server.js</code>)</li>
      <li>API root/health route se JSON ya text response return karo</li>
    </ul>
  </details>

  <p class="pill">Vercel + GitHub Pages + Render ready</p>
`;

const statusText = document.querySelector('#status-text');
const statusBox = document.querySelector('#status-box');
const backendUrlEl = document.querySelector('#backend-url');
backendUrlEl.textContent = BACKEND_URL;

async function checkBackend() {
  const startedAt = Date.now();

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'GET'
    });

    const tookMs = Date.now() - startedAt;

    if (!response.ok) {
      statusText.textContent = `Backend reachable but returned ${response.status} (${tookMs}ms)`;
      statusBox.classList.add('warn');
      return;
    }

    statusText.textContent = `Backend is reachable ✅ (${tookMs}ms)`;
    statusBox.classList.add('ok');
  } catch (error) {
    statusText.textContent = `Request failed: ${error?.message || 'Unknown error'}`;
    statusBox.classList.add('err');
  }
}

checkBackend();
