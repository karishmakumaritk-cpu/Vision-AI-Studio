const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, full_name, phone, business_type } = req.body;
    if (!email || !password || !full_name) {
      return res.status(400).json({ success: false, error: 'Email, password, and full_name are required' });
    }

    const { data: existingUser } = await supabase.from('users').select('id').eq('email', email).maybeSingle();
    if (existingUser) return res.status(400).json({ success: false, error: 'Email already registered. Please login.' });

    const passwordHash = await bcrypt.hash(password, 12);
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert([{ email, password_hash: passwordHash, full_name, phone, business_type, role: 'user' }])
      .select('id,email,full_name')
      .single();
    if (userError) throw userError;

    const trialStart = new Date();
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 1);

    const { error: subError } = await supabase.from('subscriptions').insert([{
      user_id: newUser.id,
      plan_name: 'trial',
      status: 'trial',
      trial_start: trialStart.toISOString(),
      trial_end: trialEnd.toISOString()
    }]);
    if (subError) throw subError;

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      success: true,
      message: 'Account created! Your 1-day trial is now active.',
      data: { token, user: newUser, subscription: { plan: 'trial', status: 'trial', trial_end: trialEnd.toISOString(), hours_remaining: 24 } }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password required' });

    const { data: user } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
    if (!user) return res.status(401).json({ success: false, error: 'Invalid email or password' });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ success: false, error: 'Invalid email or password' });

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email, full_name: user.full_name },
        subscription: subscription || { plan_name: 'none', status: 'expired' }
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || 'Login failed' });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    res.json({ success: true, data: { user: req.user, subscription } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unable to load profile' });
  }
});

module.exports = router;
