export const features = [
  {
    title: '💬 Lead Automation',
    desc: 'WhatsApp AI qualifies leads, syncs to CRM and fires personalised follow-ups — hands-free.'
  },
  {
    title: '📦 Export Docs AI',
    desc: 'Auto-generate shipping bills, invoices, packing lists and HS-code lookups from a spreadsheet.'
  },
  {
    title: '🤖 AI Support Bot',
    desc: 'Deploy a trained WhatsApp / web chatbot that answers FAQs and escalates complex queries.'
  },
  {
    title: '🎙 Voice Agent',
    desc: 'Outbound AI calling agent that handles sales scripts, appointments and order confirmations.'
  },
  {
    title: '🛒 E-Commerce Suite',
    desc: 'Cart recovery, payment links, invoice generation and order confirmations — all on autopilot.'
  },
  {
    title: '📊 Data & Reports',
    desc: 'Auto-pull data from multiple sources, clean it, and email beautiful dashboards every morning.'
  }
] as const;

export const plans = [
  { name: 'Starter', price: '₹999', desc: '1 Workflow • 24h Delivery • 7-day Support • 1 Revision' },
  { name: 'Pro', price: '₹3,999', desc: '3 Workflows/month • Priority Support • Advanced Integrations • Unlimited Revisions' },
  { name: 'Enterprise', price: 'Custom', desc: 'Unlimited Workflows • White-label • Dedicated Worker • Custom Integrations' }
] as const;

export const faqs = [
  {
    q: 'How quickly will my workflow be delivered?',
    a: 'We deliver a working workflow demo within 24 hours. Request changes, then give final approval.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI (Paytm, PhonePe, GPay, BHIM). Pay securely and get instant confirmation.'
  },
  {
    q: 'What kind of businesses do you serve?',
    a: 'We work with exporters, SMBs, e-commerce stores, and agencies across India.'
  }
] as const;

export const gallery = [
  { src: '/images/ai-workflows.svg', alt: 'AI workflow automation illustration', caption: 'AI-first workflows' },
  { src: '/images/growth-analytics.svg', alt: 'Growth analytics dashboard illustration', caption: 'Growth analytics' },
  { src: '/images/execution-team.svg', alt: 'Execution team collaboration illustration', caption: 'Execution team' }
] as const;
