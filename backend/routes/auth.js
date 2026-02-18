const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

const otpStore = new Map();
const OTP_TTL_MS = 5 * 60 * 1000;

function signToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

async function latestSubscription(userId) {
  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

async function ensureTrialSubscription(userId) {
  const existing = await latestSubscription(userId);
  if (existing) return existing;

  const trialStart = new Date();
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 1);

  const { data, error } = await supabase
    .from('subscriptions')
    .insert([{
      user_id: userId,
      plan_name: 'trial',
      status: 'trial',
      trial_start: trialStart.toISOString(),
      trial_end: trialEnd.toISOString()
    }])
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

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
      .select('id,email,full_name,phone')
      .single();
    if (userError) throw userError;

    const subscription = await ensureTrialSubscription(newUser.id);
    const token = signToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'Account created! Your 1-day trial is now active.',
      data: { token, user: newUser, subscription }
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

    const isValid = await bcrypt.compare(password, user.password_hash || '');
    if (!isValid) return res.status(401).json({ success: false, error: 'Invalid email or password' });

    const subscription = await ensureTrialSubscription(user.id);
    const token = signToken(user);

    return res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email, full_name: user.full_name, phone: user.phone || null },
        subscription
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || 'Login failed' });
  }
});

router.post('/request-otp', async (req, res) => {
  try {
    const { method, email, phone } = req.body;
    if (!['email', 'phone'].includes(method)) {
      return res.status(400).json({ success: false, error: 'method must be email or phone' });
    }

    const target = method === 'email' ? email : phone;
    if (!target) return res.status(400).json({ success: false, error: `${method} is required` });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    otpStore.set(`${method}:${target}`, { otp, expiresAt: Date.now() + OTP_TTL_MS });

    return res.json({
      success: true,
      message: `OTP generated for ${method}.`,
      // Dev helper until SMS/Email provider is plugged in.
      dev_otp: otp,
      expires_in_seconds: OTP_TTL_MS / 1000
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to generate OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { method, email, phone, otp, full_name, plan } = req.body;
    if (!['email', 'phone'].includes(method)) {
      return res.status(400).json({ success: false, error: 'method must be email or phone' });
    }

    const target = method === 'email' ? email : phone;
    if (!target || !otp) return res.status(400).json({ success: false, error: 'target and otp are required' });

    const key = `${method}:${target}`;
    const entry = otpStore.get(key);
    if (!entry || entry.expiresAt < Date.now() || entry.otp !== String(otp)) {
      return res.status(401).json({ success: false, error: 'Invalid or expired OTP' });
    }
    otpStore.delete(key);

    let user = null;
    if (method === 'email') {
      const { data } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
      user = data;
    } else {
      const { data } = await supabase.from('users').select('*').eq('phone', phone).maybeSingle();
      user = data;
    }

    if (!user) {
      const emailValue = method === 'email' ? email : `phone_${String(phone).replace(/\D/g, '')}@vision-ai-studio.local`;
      const passwordHash = await bcrypt.hash(`otp_${Date.now()}`, 12);
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([{
          email: emailValue,
          password_hash: passwordHash,
          full_name: full_name || 'New User',
          phone: method === 'phone' ? phone : null,
          business_type: 'General',
          role: 'user'
        }])
        .select('*')
        .single();

      if (error) throw error;
      user = newUser;

      if (plan && ['starter', 'growth', 'pro'].includes(plan)) {
        await supabase.from('subscriptions').insert([{
          user_id: user.id,
          plan_name: plan,
          status: 'trial',
          trial_start: new Date().toISOString(),
          trial_end: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }]);
      }
    }

    const subscription = await ensureTrialSubscription(user.id);
    const token = signToken(user);

    return res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email, full_name: user.full_name, phone: user.phone || null },
        subscription
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || 'OTP verification failed' });
  }
});

router.post('/google', async (req, res) => {
  return res.status(501).json({
    success: false,
    error: 'Google OAuth not configured yet. Add GOOGLE_CLIENT_ID/SECRET and callback route to enable it.'
  });
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const subscription = await latestSubscription(req.user.id);
    res.json({ success: true, data: { user: req.user, subscription } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Unable to load profile' });
  }
});

module.exports = router;
