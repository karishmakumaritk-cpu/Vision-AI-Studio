const nodemailer = require('nodemailer');

function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });
}

exports.sendAutomationRequestEmail = async ({ name, email, phone, automation, description, estimatedPrice }) => {
  const transporter = getTransporter();
  if (!transporter) {
    return { skipped: true, reason: 'Missing Gmail credentials' };
  }

  const html = `
    <h2>🚀 New Automation Request</h2>
    <p><strong>Customer:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Automation:</strong> ${automation}</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Estimated Price:</strong> ₹${estimatedPrice}</p>
  `;

  await transporter.sendMail({
    from: `"Vision AI Studio" <${process.env.GMAIL_USER}>`,
    to: 'karishmakumaritk@gmail.com',
    subject: `New Request: ${automation}`,
    html
  });

  return { success: true };
};
