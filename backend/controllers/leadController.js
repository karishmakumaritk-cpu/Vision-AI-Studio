const { randomUUID } = require('crypto');
const { sendWelcomeEmail } = require('../utils/email');
const { triggerN8nWorkflow } = require('../utils/n8n');
const store = require('../storage/inMemoryStore');

const { users, leads, automations, demoData } = store;

// Create New Lead
exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, business_type, service_interest, message } = req.body;

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email);

    let userId;
    let isNewUser = false;

    if (!existingUser) {
      // Create new user with 7-day trial
      const trialStart = new Date();
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 7);

      const newUser = {
        id: randomUUID(),
        name,
        email,
        phone: phone || null,
        business_type: business_type || null,
        plan: 'free_trial',
        trial_start: trialStart.toISOString(),
        trial_end: trialEnd.toISOString(),
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      users.push(newUser);

      userId = newUser.id;
      isNewUser = true;

      // Non-blocking side effects for demo environment
      sendWelcomeEmail(email, name, trialEnd).catch(() => {});
      triggerN8nWorkflow('trial-activation', {
        user_id: userId,
        email,
        name,
        trial_end: trialEnd.toISOString(),
      }).catch(() => {});

    } else {
      userId = existingUser.id;
    }

    // Create lead entry
    const lead = {
      id: randomUUID(),
      user_id: userId,
      name,
      email,
      phone: phone || null,
      business_type: business_type || null,
      service_interest: service_interest || null,
      message,
      source: 'website',
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    leads.push(lead);

    // Auto-assign automation based on service interest
    if (service_interest) {
      await autoAssignAutomation(userId, service_interest);
    }

    // Trigger lead capture workflow in n8n
    triggerN8nWorkflow('lead-capture', {
      lead_id: lead.id,
      user_id: userId,
      service_interest: service_interest || 'general',
      email,
      name,
    }).catch(() => {});

    res.status(201).json({
      success: true,
      message: isNewUser
        ? '🎉 Welcome! Check your email for trial access details.'
        : '✅ Your inquiry has been recorded. We\'ll be in touch soon!',
      data: {
        lead_id: lead.id,
        user_id: userId,
        trial_ends: isNewUser
          ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          : null,
        is_new_user: isNewUser
      }
    });

  } catch (error) {
    console.error('❌ Create lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lead',
      message: error.message
    });
  }
};

// Auto-assign automation workflow based on service
async function autoAssignAutomation(userId, serviceInterest) {
  try {
    const automationMap = {
      'website': 'ai_website_chatbot',
      'automation': 'business_automation',
      'chatbot': 'whatsapp_chatbot',
      'voice': 'ai_voice_agent',
      'instagram': 'instagram_automation',
      'custom': 'custom_automation'
    };

    const automationType = automationMap[serviceInterest] || 'basic_automation';

    // Create automation entry
    const data = {
      id: randomUUID(),
      user_id: userId,
      automation_type: automationType,
      status: 'active',
      usage_count: 0,
      usage_limit: 50,
      config: {
        demo_mode: true,
        service: serviceInterest,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    automations.push(data);

    // Generate demo data for this automation
    await generateDemoData(userId, automationType);

    console.log(`✅ Automation assigned: ${automationType}`);
    return data;
  } catch (error) {
    console.error('⚠️  Auto-assign automation error:', error.message);
    // Don't throw - automation assignment failure shouldn't block lead creation
  }
}

// Generate demo data for trial users
async function generateDemoData(userId, automationType) {
  try {
    const demoDataMap = {
      'whatsapp_chatbot': {
        sample_messages: [
          { from: 'Customer 1', message: 'What are your prices?', reply: 'Auto-replied with pricing', timestamp: new Date() },
          { from: 'Customer 2', message: 'Is this available?', reply: 'Auto-replied with availability', timestamp: new Date() }
        ],
        sample_analytics: {
          messages_handled: 45,
          response_time: '2.3 seconds',
          satisfaction_rate: '94%'
        }
      },
      'ai_voice_agent': {
        sample_calls: [
          { caller: '+91 98765 43210', duration: '3:24', status: 'Resolved', timestamp: new Date() },
          { caller: '+91 98765 43211', duration: '1:45', status: 'Transferred', timestamp: new Date() }
        ],
        sample_analytics: {
          calls_handled: 28,
          avg_duration: '2:45',
          resolution_rate: '89%'
        }
      },
      'instagram_automation': {
        sample_posts: [
          { type: 'Reel', caption: 'AI-generated caption here...', hashtags: '#business #growth #ai', engagement: '245 likes' },
          { type: 'Post', caption: 'Another AI caption...', hashtags: '#automation #saas', engagement: '189 likes' }
        ],
        sample_analytics: {
          posts_created: 12,
          engagement_rate: '8.4%',
          follower_growth: '+156'
        }
      },
      'ai_website_chatbot': {
        sample_conversations: [
          { visitor: 'Visitor 1', messages: ['Hi', 'Tell me about your services'], bot_reply: 'Welcome! How can I help?' },
          { visitor: 'Visitor 2', messages: ['Pricing?'], bot_reply: 'We have 3 plans available...' }
        ],
        sample_analytics: {
          conversations: 156,
          engagement_rate: '76%',
          conversion_rate: '12%'
        }
      }
    };

    const data = demoDataMap[automationType] || { message: 'Demo data generated' };

    demoData.push({
      id: randomUUID(),
      user_id: userId,
      data_type: automationType,
      data,
      created_at: new Date().toISOString(),
    });

    console.log(`✅ Demo data generated for: ${automationType}`);

  } catch (error) {
    console.error('⚠️  Generate demo data error:', error.message);
  }
}

// Get all leads (admin)
exports.getAllLeads = async (req, res) => {
  try {
    const data = [...leads].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get lead by ID
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = leads.find((lead) => lead.id === id);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update lead status
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'demo_sent', 'converted', 'lost'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Valid statuses: ${validStatuses.join(', ')}`
      });
    }

    const data = leads.find((lead) => lead.id === id);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    data.status = status;
    data.updated_at = new Date().toISOString();

    res.json({
      success: true,
      message: 'Lead status updated',
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
