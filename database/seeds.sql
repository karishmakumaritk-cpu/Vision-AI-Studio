INSERT INTO products (name, slug, description, price, billing_type, features) VALUES
('AI WhatsApp Sales Bot', 'whatsapp-bot', 'Automated WhatsApp bot for sales and support', 1999.00, 'monthly', '["Auto replies","Order capture","Payment links"]'::jsonb),
('AI Voice Support Agent', 'voice-agent', 'Intelligent voice assistant for support', 3999.00, 'monthly', '["Call handling","Complaint resolution"]'::jsonb),
('Instagram Reel AI Kit', 'instagram-kit', 'AI-powered Instagram content toolkit', 999.00, 'one-time', '["Reel ideas","Script generator"]'::jsonb),
('Business Automation Starter Pack', 'automation-pack', 'Complete business automation package', 4999.00, 'one-time', '["Lead capture","CRM workflow"]'::jsonb)
ON CONFLICT (slug) DO NOTHING;
