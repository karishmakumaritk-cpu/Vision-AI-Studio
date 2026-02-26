-- ============================================
-- VISION AI STUDIO — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                 TEXT,
  email                TEXT UNIQUE NOT NULL,
  password_hash        TEXT,
  role                 TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'worker')),
  trial_start          TIMESTAMPTZ,
  trial_end            TIMESTAMPTZ,
  subscription_status  TEXT NOT NULL DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'expired')),
  avatar_url           TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- WORKFLOWS TABLE
CREATE TABLE IF NOT EXISTS workflows (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workflow_type  TEXT NOT NULL,
  description    TEXT,
  requirements   JSONB DEFAULT '{}',
  status         TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'building', 'completed', 'cancelled')),
  price          INTEGER DEFAULT 999,
  worker_id      UUID REFERENCES users(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workflow_id      UUID REFERENCES workflows(id),
  amount           INTEGER NOT NULL,
  currency         TEXT NOT NULL DEFAULT 'INR',
  payment_provider TEXT NOT NULL DEFAULT 'upi' CHECK (payment_provider IN ('upi', 'stripe', 'razorpay')),
  payment_status   TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id   TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT,
  email            TEXT NOT NULL,
  service_interest TEXT,
  message          TEXT,
  status           TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS conversations (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  messages   JSONB NOT NULL DEFAULT '[]',
  workflow_id UUID REFERENCES workflows(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can read/update own data
CREATE POLICY "users_own" ON users FOR ALL USING (auth.uid()::text = id::text);

-- Service role bypasses all RLS (used by our server-side code)
-- No additional policy needed — service key bypasses RLS

-- Seed admin user (optional — change email/password after setup)
-- INSERT INTO users (name, email, role) VALUES ('Karishma Admin', 'admin@visionaistudio.in', 'admin');
