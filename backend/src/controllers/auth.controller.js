const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const { validateEmail, validatePassword } = require('../utils/helpers');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, business_name, business_type } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, error: 'Name, email, password required' });
    if (!validateEmail(email) || !validatePassword(password)) return res.status(400).json({ success: false, error: 'Invalid email or weak password' });

    const { data: existing } = await supabase.from('users').select('id').eq('email', email.toLowerCase()).maybeSingle();
    if (existing) return res.status(400).json({ success: false, error: 'Email already registered' });

    const password_hash = await bcrypt.hash(password, 12);
    const { data: user, error } = await supabase.from('users').insert([{ name, email: email.toLowerCase(), password_hash, phone, business_name, business_type, role: 'user' }]).select().single();
    if (error) throw error;

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } } });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message || 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data: user } = await supabase.from('users').select('*').eq('email', email.toLowerCase()).maybeSingle();
    if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } } });
  } catch {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};

exports.me = async (req, res) => {
  const { data: user } = await supabase.from('users').select('id,name,email,role,phone,business_name,business_type,created_at').eq('id', req.user.userId).single();
  res.json({ success: true, data: { user } });
};

exports.refreshToken = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET, { ignoreExpiration: true });
    const token = jwt.sign({ userId: decoded.userId, email: decoded.email, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, data: { token } });
  } catch {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};
