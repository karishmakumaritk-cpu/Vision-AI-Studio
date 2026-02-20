'use client';

const plans = [
  ['FREE', 'Basic usage, capped daily'],
  ['PRO', 'For solo founders and creators'],
  ['PREMIUM', 'Unlimited + priority processing']
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
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Billing</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map(([plan, desc]) => (
          <div key={plan} className="card p-4">
            <h2 className="text-lg font-medium">{plan}</h2>
            <p className="mt-2 text-sm text-slate-400">{desc}</p>
            {plan !== 'FREE' && <button onClick={() => createCheckout(plan)} className="mt-4 rounded-md bg-indigo-600 px-3 py-2 text-sm">Upgrade</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
