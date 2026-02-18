const express = require('express');
const authenticate = require('../middleware/authenticate');
const supabase = require('../config/supabase');

const router = express.Router();

// Optional auth
router.use(async (req, _res, next) => {
  if (!req.headers.authorization) return next();
  return authenticate(req, _res, next);
});

router.post('/email-query', async (req, res) => {
  try {
    const { name, email, message, user_id } = req.body;
    if (!email || !message) {
      return res.status(400).json({ success: false, error: 'email and message are required' });
    }

    const payload = {
      user_id: req.user?.id || user_id || null,
      name: name || req.user?.full_name || null,
      email,
      query_type: 'email_form',
      message,
      status: 'new'
    };

    const { data, error } = await supabase
      .from('support_queries')
      .insert([payload])
      .select('*')
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message: 'Support query submitted. We will respond within 24 hours.',
      data
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || 'Failed to submit support query' });
  }
});

module.exports = router;
