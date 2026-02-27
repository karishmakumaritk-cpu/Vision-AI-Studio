const nodemailer = require('nodemailer');

const GMAIL_USER = process.env.GMAIL_USER || '';
const GMAIL_PASS = process.env.GMAIL_APP_PASSWORD || '';

const transporter = GMAIL_USER && GMAIL_PASS
  ? nodemailer.createTransport({ service: 'gmail', auth: { user: GMAIL_USER, pass: GMAIL_PASS } })
  : null;

exports.sendAutomationRequest = async (customerData) => {
  const { name, email, phone, automation, description, estimatedPrice } = customerData;

  if (!transporter) {
    console.warn('Email not sent: GMAIL_USER / GMAIL_APP_PASSWORD env vars are not set.');
    return { success: false, skipped: true };
  }

  const emailHTML = `
    <h2>🚀 New Automation Request</h2>
    <p><strong>Customer:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Automation:</strong> ${automation}</p>
    <p><strong>Description:</strong></p>
    <p>${description}</p>
    <p><strong>Estimated Price:</strong> ₹${estimatedPrice}</p>
    <hr/>
    <p>Login to dashboard to respond</p>
  `;

  await transporter.sendMail({
    from: GMAIL_USER,
    to: process.env.NOTIFY_EMAIL || 'karishmakumaritk@gmail.com',
    subject: `New Request: ${automation} - ${name}`,
    html: emailHTML
  });

  return { success: true };
};
