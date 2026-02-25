import Link from 'next/link';
import { plans } from '@/components/landing/data';

export function PricingSection() {
  return (
    <section className="mt-10">
      <div className="mb-6 text-center">
        <span className="inline-block rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-indigo-300">Pricing</span>
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">Simple, Transparent Pricing</h2>
        <p className="mt-2 text-slate-400">Pay per project or subscribe monthly. No hidden costs.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan, idx) => (
          <article key={plan.name} className="card plan-tilt p-5" style={{ animationDelay: `${idx * 100}ms` }}>
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-2 text-3xl font-bold">{plan.price}</p>
            <p className="mt-2 text-sm text-slate-400">{plan.desc}</p>
            <Link href="https://wa.me/919818691915" target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500">
              {plan.price === 'Custom' ? 'Talk to Us' : 'Pay via UPI →'}
            </Link>
          </article>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-slate-500">
        ✓ UPI Verified Merchant &nbsp;·&nbsp; 24h Money Back Guarantee &nbsp;·&nbsp; 100% Secure
      </p>
    </section>
  );
}
