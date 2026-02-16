-- ============================================
-- HERBALANCE AI SAAS PLATFORM - DATABASE SCHEMA
-- ============================================
-- Copy this entire schema to Supabase SQL Editor to set up the database

-- ============================================
-- USERS TABLE (Main Customer Data)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  business_type VARCHAR(100),
  plan VARCHAR(50) DEFAULT 'free_trial',
  -- Plan values: free_trial, starter, pro, enterprise
  trial_start TIMESTAMP,
  trial_end TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  -- Status values: active, trial_expired, subscribed, cancelled
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- LEADS TABLE (Query Capture)
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  business_type VARCHAR(100),
  service_interest VARCHAR(100),
  -- Values: website, automation, chatbot, voice, instagram
  message TEXT,
  source VARCHAR(50) DEFAULT 'website',
  -- Values: website, chatbot, whatsapp
  status VARCHAR(50) DEFAULT 'new',
  -- Values: new, contacted, demo_sent, converted, lost
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- AUTOMATIONS TABLE (Assigned Workflows)
-- ============================================
CREATE TABLE IF NOT EXISTS automations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  automation_type VARCHAR(100) NOT NULL,
  -- Types: whatsapp_chatbot, voice_agent, instagram_automation, etc.
  workflow_id VARCHAR(255),
  -- n8n workflow ID
  config JSONB,
  -- Automation configuration and settings
  status VARCHAR(50) DEFAULT 'active',
  -- Values: active, paused, stopped
  usage_count INTEGER DEFAULT 0,
  usage_limit INTEGER DEFAULT 50,
  -- Trial limit
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- AUTOMATION_LOGS TABLE (Track Usage)
-- ============================================
CREATE TABLE IF NOT EXISTS automation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  automation_id UUID REFERENCES automations(id) ON DELETE CASCADE,
  action_type VARCHAR(100),
  -- Types: message_sent, call_handled, lead_captured
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- SUBSCRIPTIONS TABLE (Payment Tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR(50) NOT NULL,
  -- Plans: starter, pro, enterprise
  price DECIMAL(10, 2),
  billing_cycle VARCHAR(20) DEFAULT 'monthly',
  -- monthly, yearly
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  payment_status VARCHAR(50) DEFAULT 'pending',
  -- pending, paid, failed
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- DEMO_DATA TABLE (For Trial Users)
-- ============================================
CREATE TABLE IF NOT EXISTS demo_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  data_type VARCHAR(50),
  -- sample_leads, sample_analytics, sample_messages
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_user_id ON leads(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_automations_user ON automations(user_id);
CREATE INDEX IF NOT EXISTS idx_automations_status ON automations(status);
CREATE INDEX IF NOT EXISTS idx_automation_logs_user ON automation_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_automation_logs_automation ON automation_logs(automation_id);
CREATE INDEX IF NOT EXISTS idx_automation_logs_created_at ON automation_logs(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) Policies
-- ============================================
-- Note: RLS requires authentication. Configure based on your auth setup

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_data ENABLE ROW LEVEL SECURITY;

-- Users can only read their own data (if using Supabase auth)
-- Uncomment these after setting up authentication
/*
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can read own leads"
  ON leads FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can read own automations"
  ON automations FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can read own logs"
  ON automation_logs FOR SELECT
  USING (user_id = auth.uid());
*/

-- ============================================
-- FUNCTIONS (Optional - for advanced features)
-- ============================================

-- Function to increment automation usage
CREATE OR REPLACE FUNCTION increment_automation_usage(automation_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE automations
  SET usage_count = usage_count + 1
  WHERE id = automation_id;
END;
$$ LANGUAGE plpgsql;

-- Function to check trial expiry
CREATE OR REPLACE FUNCTION check_trial_status(user_id UUID)
RETURNS TABLE(is_expired BOOLEAN, days_remaining INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT
    NOW() > users.trial_end AS is_expired,
    EXTRACT(DAY FROM users.trial_end - NOW())::INTEGER AS days_remaining
  FROM users
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;
