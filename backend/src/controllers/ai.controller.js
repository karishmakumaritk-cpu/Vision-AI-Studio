const { callAI } = require('../services/ai.service');

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;
    const ai = await callAI({ prompt: `You are Vision AI Studio assistant. Keep concise. User: ${message}` });
    res.json({ success: true, data: { reply: ai.text } });
  } catch {
    res.status(500).json({ success: false, error: 'AI unavailable' });
  }
};
