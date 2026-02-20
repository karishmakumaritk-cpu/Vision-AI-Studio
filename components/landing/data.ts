export const features = [
  {
    title: 'AI Content + Marketing',
    desc: 'Generate ad copy, product messaging, and campaign hooks across channels in seconds.'
  },
  {
    title: 'Prompt Workspace',
    desc: 'Keep your best prompts organized with history, copy, and delete controls.'
  },
  {
    title: 'Subscription Billing',
    desc: 'Upgrade seamlessly with Stripe-powered plans and webhook-based subscription sync.'
  },
  {
    title: 'Admin Oversight',
    desc: 'Monitor users, plans, and prompt usage from a dedicated admin control surface.'
  }
] as const;

export const plans = [
  { name: 'Free', price: '$0', desc: '20 prompts/day • Basic tools' },
  { name: 'Pro', price: '$29', desc: '500 prompts/month • Advanced workflows' },
  { name: 'Premium', price: '$99', desc: 'Unlimited usage • Priority support' }
] as const;

export const faqs = [
  {
    q: 'Can I use Google login and email/password together?',
    a: 'Yes. NextAuth supports both providers and keeps sessions secure via JWT strategy.'
  },
  {
    q: 'How are plan limits enforced?',
    a: 'Each AI request checks your daily/monthly usage against plan limits before generating output.'
  },
  {
    q: 'Is this deployable now?',
    a: 'Yes. It is structured for Vercel + Postgres (Railway/Supabase) and Stripe webhook integration.'
  }
] as const;

export const gallery = [
  { src: '/images/ai-workflows.svg', alt: 'AI workflow automation illustration', caption: 'AI-first workflows' },
  { src: '/images/growth-analytics.svg', alt: 'Growth analytics dashboard illustration', caption: 'Growth analytics' },
  { src: '/images/execution-team.svg', alt: 'Execution team collaboration illustration', caption: 'Execution team' }
] as const;
