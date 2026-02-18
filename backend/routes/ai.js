const express = require('express');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Optional auth: if token exists, attach user; if not, continue as guest.
router.use(async (req, _res, next) => {
  if (!req.headers.authorization) return next();
  return authenticate(req, _res, next);
});

router.post('/chat', async (req, res) => {
  try {
    const message = String(req.body?.message || '').trim();
    if (!message) {
      return res.status(400).json({ success: false, error: 'message is required' });
    }

    const lower = message.toLowerCase();
    let reply = 'Thanks for your message. Our team will help you set up the right automation workflow.';

    if (lower.includes('instagram')) reply = 'Instagram Growth automation can create content ideas, hashtags, and DM follow-ups.';
    else if (lower.includes('whatsapp')) reply = 'WhatsApp automation handles instant replies, order updates, and booking confirmations.';
    else if (lower.includes('voice') || lower.includes('call')) reply = 'AI Voice Assistant can answer calls, qualify leads, and schedule appointments.';
    else if (lower.includes('email')) reply = 'Email automation can sort inbox, auto-reply, and run follow-up sequences.';
    else if (lower.includes('price') || lower.includes('plan')) reply = 'Plans are Starter ₹1499, Growth ₹3999, Pro ₹7999 with a 24-hour trial.';

    return res.json({
      success: true,
      data: {
        reply,
        user: req.user ? { id: req.user.id, email: req.user.email } : null,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'AI chat failed' });
  }
});

module.exports = router;
