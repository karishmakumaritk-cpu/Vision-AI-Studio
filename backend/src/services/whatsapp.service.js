const axios = require('axios');

exports.sendWhatsAppNotification = async (customerData) => {
  const { name, automation, estimatedPrice } = customerData;

  const message = `🚀 New Automation Request\n\nCustomer: ${name}\nAutomation: ${automation}\nEstimated: ₹${estimatedPrice}\n\nCheck email for full details.`;

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
  const to = process.env.NOTIFY_WHATSAPP_TO || 'whatsapp:+919818691915';

  if (!sid || !token) {
    console.warn('Twilio creds missing, skipping WhatsApp send.');
    return;
  }

  await axios.post(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    new URLSearchParams({
      From: from,
      To: to,
      Body: message
    }),
    {
      auth: { username: sid, password: token },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );
};
