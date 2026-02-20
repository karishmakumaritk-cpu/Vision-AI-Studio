const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.callAI = async ({ prompt, model = 'gpt-4o-mini', max_tokens = 200 }) => {
  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    max_tokens
  });
  return {
    text: completion.choices[0]?.message?.content || '',
    tokens: completion.usage?.total_tokens || 0,
    model: completion.model
  };
};
