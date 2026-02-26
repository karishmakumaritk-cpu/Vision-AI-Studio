import Link from 'next/link'

export default function PricingPage() {
  const plans = [
    { name: 'Starter', price: '₹999', per: '/project', desc: 'Perfect for single automation needs',
      features: ['1 Workflow', 'Basic AI Integration', '24h Delivery', '7-day Support', '1 Revision'],
      cta: 'Get Started', href: '/signup', featured: false },
    { name: 'Pro', price: '₹3,999', per: '/month', desc: 'For growing businesses',
      features: ['3 Workflows/month', 'Priority Support', 'Advanced Integrations', 'Unlimited Revisions', 'AI Voice Credits', 'Dashboard Access'],
      cta: 'Start Pro Plan', href: '/signup', featured: true },
    { name: 'Enterprise', price: 'Custom', per: '', desc: 'For agencies & large exporters',
      features: ['Unlimited Workflows', 'White-label Option', 'Dedicated Worker', 'Custom Integrations', 'SLA Guarantee'],
      cta: 'Contact Us', href: 'https://wa.me/919818691915', featured: false },
  ]

  return (
    <main className="min-h-screen bg-[#030309] text-white pt-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-400 text-lg">Pay per project or subscribe monthly. No hidden costs.</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.name}
              className={`rounded-2xl p-8 relative ${plan.featured
                ? 'bg-gradient-to-b from-brand-500/15 to-purple-500/10 border border-brand-500/40'
                : 'bg-white/[0.04] border border-white/[0.08]'}`}>
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full
                                bg-gradient-to-r from-brand-500 to-purple-500 text-white text-xs font-bold">
                  Most Popular
                </div>
              )}
              <div className="text-gray-400 text-sm font-medium mb-2">{plan.name}</div>
              <div className="text-4xl font-black mb-1">{plan.price}<span className="text-lg font-normal text-gray-400">{plan.per}</span></div>
              <p className="text-gray-500 text-sm mb-6 pb-6 border-b border-white/[0.08]">{plan.desc}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <span className="text-green-400 font-bold">✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href={plan.href}
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.featured
                  ? 'bg-gradient-to-r from-brand-500 to-purple-500 text-white hover:opacity-90'
                  : 'border border-white/10 text-white hover:bg-white/5'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">← Back to home</Link>
        </div>
      </div>
    </main>
  )
}
