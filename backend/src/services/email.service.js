const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_APP_PASSWORD || ''
  }
});

exports.sendAutomationRequest = async (customerData) => {
  const { name, email, phone, automation, description, estimatedPrice } = customerData;

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
    from: process.env.GMAIL_USER || 'no-reply@visionaistudio.com',
    to: process.env.NOTIFY_EMAIL || 'karishmakumaritk@gmail.com',
    subject: `New Request: ${automation} - ${name}`,
    html: emailHTML
  });

  return { success: true };
};
