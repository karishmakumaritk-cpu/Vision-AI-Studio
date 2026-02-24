const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// GET /health
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// POST /api/auth/register
// TODO: implement Supabase service-side user creation using SUPABASE_SERVICE_ROLE_KEY in a follow-up PR
// TODO: add worker queues, admin panel, billing, and persistent DB changes in follow-up PRs
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: 'email and password are required' });
  }
  return res.json({ ok: true, message: 'register endpoint reached (placeholder)' });
});

// POST /api/ai/generate — lazy OpenAI initialization (client cached after first use)
let openaiClient = null;

app.post('/api/ai/generate', async (req, res) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }
  try {
    if (!openaiClient) {
      const { default: OpenAI } = await import('openai');
      openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    // TODO: replace placeholder with a real AI call in a follow-up PR
    // Example (commented to avoid accidental charges):
    // const result = await openaiClient.responses.create({ model: 'gpt-4o-mini', input: req.body.prompt });
    // return res.json({ ok: true, result: result.output_text });
    return res.json({ ok: true, message: 'AI generate endpoint reached (placeholder)', prompt: req.body.prompt });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Fallback 404
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));

module.exports = app;
