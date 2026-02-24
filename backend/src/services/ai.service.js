let client = null;

function ensureClient() {
  if (client) return client;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const { OpenAI } = require('openai');
  client = new OpenAI({ apiKey });
  return client;
}

async function generateFromPrompt(prompt, opts = {}) {
  const c = ensureClient();
  if (!c) throw new Error('OPENAI_API_KEY is not configured on server');
  const model = opts.model || 'gpt-4o-mini';
  const completion = await c.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: opts.max_tokens || 256,
  });
  return completion.choices?.[0]?.message?.content || '';
}

module.exports = { generateFromPrompt };
