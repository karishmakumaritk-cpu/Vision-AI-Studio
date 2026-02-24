const supabase = require('../config/supabase');
const { sendEmail, sendWhatsApp } = require('../services/notification.service');

exports.submitAutomationRequest = async (req, res) => {
  try {
    const { name, email, phone, automation_category, business_type, description, estimated_price } = req.body;
    const userId = req.user?.userId || null;

    const { data, error } = await supabase.from('automation_requests').insert([{ user_id: userId, automation_category, business_type, description, estimated_price }]).select().single();
    if (error) throw error;

    await sendEmail({ to: 'karishmakumaritk@gmail.com', subject: `New Request: ${automation_category}`, body: `${name} (${email}, ${phone})\n${description}\nEstimated: ₹${estimated_price}` });
    await sendWhatsApp('+919818691915', `New request: ${automation_category} by ${name}. Estimated ₹${estimated_price}`);

    res.json({ success: true, data, message: 'Request submitted successfully' });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message || 'Failed to submit request' });
  }
};

exports.getMyRequests = async (req, res) => {
  const { data, error } = await supabase.from('automation_requests').select('*').eq('user_id', req.user.userId).order('created_at', { ascending: false });
  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
};
