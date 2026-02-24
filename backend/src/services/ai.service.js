const OpenAI = require('openai');

const apiKey = process.env.OPENAI_API_KEY;
const client = apiKey ? new OpenAI({ apiKey }) : null;

exports.callAI = async ({ prompt, model = 'gpt-4o-mini', max_tokens = 200 }) => {
  if (!client) throw new Error('OPENAI_API_KEY is not configured');
  const completion = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens
  });
  return { text: completion.choices[0]?.message?.content || '', tokens: completion.usage?.total_tokens || 0 };
};
