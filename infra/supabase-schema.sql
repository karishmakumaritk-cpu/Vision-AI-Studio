-- Supabase schema for Vision AI Studio (MVP)
-- Run this in Supabase SQL editor or via psql if self-hosted.

-- users table (Supabase Auth also manages users; this is for profile/role)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id text, -- link to auth user id if used
  name text,
  email text,
  role text default 'user',
  subscription_plan text,
  created_at timestamp with time zone default now()
);

-- projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  workflow_type text,
  requirements_json jsonb,
  status text default 'pending',
  deadline timestamptz,
  price numeric,
  created_at timestamptz default now()
);

-- messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  sender text,
  message text,
  timestamp timestamptz default now()
);

-- reviews
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  rating int,
  feedback text,
  created_at timestamptz default now()
);

-- workers
create table if not exists workers (
  id uuid primary key default gen_random_uuid(),
  name text,
  role text,
  assigned_projects jsonb,
  created_at timestamptz default now()
);

-- invoices
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id),
  amount numeric,
  currency text default 'INR',
  stripe_payment_id text,
  status text,
  created_at timestamptz default now()
);
