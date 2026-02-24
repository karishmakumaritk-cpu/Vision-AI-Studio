const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'missing email or password' });
  // TODO: Implement Supabase server-side user creation using SUPABASE_SERVICE_ROLE_KEY
  return res.json({ ok: true, message: 'register endpoint reached (placeholder)' });
});

app.post('/api/ai/generate', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OpenAI API key not configured' });
  try {
    const { OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey });
    // TODO: Replace with actual prompt handling and model call. Example (commented):
    // const completion = await client.responses.create({ model: 'gpt-4o-mini', input: req.body.prompt || 'Hello' });
    // return res.json({ ok: true, completion: completion.output?.[0]?.content?.[0]?.text || completion });
    return res.json({ ok: true, message: 'OpenAI client initialized (placeholder)' });
  } catch (err) {
    console.error('OpenAI import or call failed', err);
    return res.status(500).json({ error: 'OpenAI client error' });
  }
});

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
