const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const automationController = require('./controllers/automation.controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/automation/request', automationController.submitAutomationRequest);

// Simple health endpoints used by smoke tests and uptime checks
app.get('/api', (_req, res) => res.json({ success: true, message: 'Vision AI Studio backend running' }));
app.get('/api/health', (_req, res) => res.json({ success: true, uptime_seconds: process.uptime() }));

// simple AI chat placeholder (replace with OpenAI call later)
app.post('/api/ai/chat', async (req, res) => {
  const { message } = req.body;
  let reply = 'I can help with automations, pricing and contact info. Ask me for details.';
  if (message?.toLowerCase().includes('price')) reply = 'Pricing guide: Simple 8-15K, Medium 15-30K, High 30-60K.';
  if (message?.toLowerCase().includes('contact')) reply = 'Email: karishmakumaritk@gmail.com — WhatsApp: +91 98186 91915';
  res.json({ success: true, data: { reply } });
});

// AI generate endpoint with lazy OpenAI initialization
app.post('/api/ai/generate', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ error: 'prompt is required and must be a non-empty string' });
  }
  try {
    const { OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt.trim() }],
      max_tokens: 256,
    });
    res.json({ success: true, data: { reply: completion.choices[0]?.message?.content } });
  } catch (err) {
    res.status(500).json({ error: err.message || 'AI generation failed' });
  }
});

// placeholder endpoint for auth register (backwards compatibility)
app.post('/api/auth/register', (req, res) => res.json({ success: true, message: 'Registration placeholder — use Supabase auth on the client.' }));

// placeholder endpoints used by frontend (projects and requests)
app.get('/api/projects', (req, res) => res.json({ success: true, data: [] }));
app.get('/api/automation/my-requests', (req, res) => res.json({ success: true, data: [] }));

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Backend listening on ${port}`));
