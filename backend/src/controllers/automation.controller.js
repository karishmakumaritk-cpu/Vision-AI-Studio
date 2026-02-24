const supabase = require('../config/supabase');
const { sendAutomationRequest } = require('../services/email.service');
const { sendWhatsAppNotification } = require('../services/whatsapp.service');

exports.submitAutomationRequest = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      automation_category,
      business_type,
      description,
      estimated_price
    } = req.body;

    let requestRecord = null;
    if (supabase && process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
      const { data, error } = await supabase.from('automation_requests').insert([{
        user_id: null,
        automation_category,
        business_type,
        description,
        estimated_price
      }]).select().single();

      if (error) console.warn('Supabase insert error:', error);
      requestRecord = data;
    }

    await sendAutomationRequest({
      name, email, phone, automation: automation_category, description, estimatedPrice: estimated_price
    });

    await sendWhatsAppNotification({
      name, automation: automation_category, estimatedPrice: estimated_price
    });

    res.json({ success: true, message: 'Request submitted', data: requestRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to submit request' });
  }
};

exports.getMyRequests = async (req, res) => {
  const { data, error } = await supabase
    .from('automation_requests')
    .select('*')
    .eq('user_id', req.user.userId)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ success: false, error: error.message });
  res.json({ success: true, data });
};
