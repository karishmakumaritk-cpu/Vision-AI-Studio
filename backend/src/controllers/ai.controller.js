const { callAI } = require('../services/ai.service');

const LOCAL_REPLIES = {
  price: 'Pricing guide: Simple 8–15K, Medium 15–30K, High 30–60K.',
  contact: 'Email: karishmakumaritk@gmail.com — WhatsApp: +91 98186 91915',
  default: 'I can help with automations, pricing and contact info. Ask me for details.'
};

function localFallback(message = '') {
  const lc = message.toLowerCase();
  if (lc.includes('price') || lc.includes('cost')) return LOCAL_REPLIES.price;
  if (lc.includes('contact') || lc.includes('email') || lc.includes('whatsapp')) return LOCAL_REPLIES.contact;
  return LOCAL_REPLIES.default;
}

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'message is required' });
    try {
      const ai = await callAI({ prompt: `You are Vision AI Studio assistant. Keep concise. User: ${message}` });
      return res.json({ success: true, data: { reply: ai.text } });
    } catch (aiErr) {
      console.warn('AI service unavailable, using local fallback:', aiErr.message);
      return res.json({ success: true, data: { reply: localFallback(message), fallback: true } });
    }
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

exports.generate = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    return res.status(400).json({ success: false, error: 'prompt is required and must be a non-empty string' });
  }
  try {
    const ai = await callAI({ prompt: prompt.trim(), max_tokens: 256 });
    res.json({ success: true, data: { reply: ai.text } });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message || 'AI generation failed' });
  }
};
