const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');
const { validateEmail, validatePassword } = require('../utils/helpers');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    if (!validateEmail(email) || !validatePassword(password)) return res.status(400).json({ success: false, error: 'Invalid email or weak password' });

    const password_hash = await bcrypt.hash(password, 12);
    const { data, error } = await supabase.from('users').insert([{ name, email: email.toLowerCase(), password_hash, role: 'user' }]).select().single();
    if (error) throw error;

    const token = jwt.sign({ userId: data.id, role: data.role, email: data.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, data: { token, user: { id: data.id, name: data.name, email: data.email, role: data.role } } });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data: user } = await supabase.from('users').select('*').eq('email', email.toLowerCase()).single();
    if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ success: false, error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } } });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

exports.me = async (req, res) => {
  const { data } = await supabase.from('users').select('id,name,email,role').eq('id', req.user.userId).single();
  res.json({ success: true, data: { user: data } });
};

exports.refreshToken = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET, { ignoreExpiration: true });
    const token = jwt.sign({ userId: decoded.userId, role: decoded.role, email: decoded.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, data: { token } });
  } catch { res.status(401).json({ success: false, error: 'Invalid token' }); }
};
