const axios = require('axios');

exports.sendAutomationRequestWhatsApp = async ({ name, automation, estimatedPrice }) => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    return { skipped: true, reason: 'Missing Twilio credentials' };
  }

  const body = `🚀 New Automation Request\nCustomer: ${name}\nAutomation: ${automation}\nEstimated: ₹${estimatedPrice}`;
  const form = new URLSearchParams({
    From: 'whatsapp:+14155238886',
    To: 'whatsapp:+919818691915',
    Body: body
  });

  await axios.post(
    `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
    form,
    {
      auth: {
        username: process.env.TWILIO_ACCOUNT_SID,
        password: process.env.TWILIO_AUTH_TOKEN
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );

  return { success: true };
};
