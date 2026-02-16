const nodemailer = require('nodemailer');

// Create email transporter
let transporter;

try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
} catch (error) {
  console.warn('⚠️  Email configuration not set. Email notifications will not work.');
}

// Send welcome email with trial details
exports.sendWelcomeEmail = async (email, name, trialEnd) => {
  try {
    if (!transporter) {
      console.warn('Email transporter not configured');
      return;
    }

    const mailOptions = {
      from: `"HerBalance AI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '🎉 Welcome to HerBalance AI - Your 7-Day Trial Starts Now!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 10px; }
            .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin-top: 20px; }
            .button { background: #8b5cf6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; margin-top: 20px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Welcome to HerBalance AI!</h1>
              <p>Your AI Automation Journey Starts Now</p>
            </div>
            
            <div class="content">
              <h2>Hi ${name}! 👋</h2>
              
              <p>Welcome to HerBalance AI Studio! We're excited to help you automate and grow your business with AI.</p>
              
              <h3>✨ Your 7-Day Free Trial is Active</h3>
              <ul>
                <li><strong>Trial Ends:</strong> ${new Date(trialEnd).toLocaleDateString()}</li>
                <li><strong>Full Access:</strong> All features unlocked</li>
                <li><strong>Support:</strong> 24/7 AI assistance</li>
              </ul>
              
              <h3>🎯 What's Next?</h3>
              <ol>
                <li>Check your dashboard for demo automations</li>
                <li>Explore sample data and analytics</li>
                <li>Test AI chatbot, voice agents & more</li>
                <li>Customize workflows for your business</li>
              </ol>
              
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" class="button">Go to Dashboard →</a>
              
              <p style="margin-top: 30px;">Need help? Reply to this email or chat with our AI assistant on the website.</p>
            </div>
            
            <div class="footer">
              <p>© 2026 HerBalance AI Studio | AI that works while you live</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to: ${email}`);
  } catch (error) {
    console.error('❌ Send welcome email error:', error.message);
  }
};

// Send trial expiry notification
exports.sendTrialExpiryEmail = async (email, name) => {
  try {
    if (!transporter) {
      console.warn('Email transporter not configured');
      return;
    }

    const mailOptions = {
      from: `"HerBalance AI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '⏰ Your HerBalance AI Trial Has Ended',
      html: `
        <!DOCTYPE html>
        <html>
        <body>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Hi ${name},</h2>
            
            <p>Your 7-day free trial of HerBalance AI has ended.</p>
            
            <p>We hope you enjoyed exploring how AI can automate and grow your business!</p>
            
            <h3>🎁 Special Offer: 20% OFF Your First Month</h3>
            <p>Upgrade now and continue automating your success!</p>
            
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/pricing" style="background: #8b5cf6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; margin: 20px 0;">
              Upgrade Now →
            </a>
            
            <p>Questions? We're here to help!</p>
            
            <p>Best regards,<br>HerBalance AI Team</p>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Trial expiry email sent to: ${email}`);
  } catch (error) {
    console.error('❌ Send trial expiry email error:', error.message);
  }
};
