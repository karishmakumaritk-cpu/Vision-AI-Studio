'use client';

const plans = [
  { name: 'FREE', desc: 'Basic usage, capped daily', icon: '🌱', color: 'from-slate-700/30 to-slate-800/20' },
  { name: 'PRO', desc: 'For solo founders and creators', icon: '⚡', color: 'from-indigo-600/20 to-violet-600/10' },
  { name: 'PREMIUM', desc: 'Unlimited + priority processing', icon: '💎', color: 'from-amber-600/15 to-orange-600/10' },
] as const;

export function BillingCards() {
  const createCheckout = async (plan: 'PRO' | 'PREMIUM') => {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan })
    });
    const data = await response.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your subscription plan.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map(({ name, desc, icon, color }) => (
          <div key={name} className={`card bg-gradient-to-br p-5 ${color}`}>
            <div className="mb-3 text-2xl">{icon}</div>
            <h2 className="text-base font-bold text-white">{name}</h2>
            <p className="mt-1.5 text-sm text-slate-400">{desc}</p>
            {name !== 'FREE' && (
              <button
                onClick={() => createCheckout(name)}
                className="btn-primary mt-4 justify-center py-2.5 text-xs"
              >
                Upgrade to {name}
              </button>
            )}
            {name === 'FREE' && (
              <span className="mt-4 inline-block rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-500">Current base plan</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
