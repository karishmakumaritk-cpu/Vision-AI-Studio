import Link from 'next/link';
import { plans } from '@/components/landing/data';

export function PricingSection() {
  return (
    <section className="mt-14">
      <div className="mb-8 text-center">
        <span className="section-label">Pricing</span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Simple, Transparent Pricing</h2>
        <p className="mt-2 text-sm text-slate-500">Pay per project or subscribe monthly. No hidden costs.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan, idx) => {
          const isPro = plan.name === 'Pro';
          return (
            <article
              key={plan.name}
              className={`plan-tilt relative overflow-hidden p-6 ${
                isPro
                  ? 'rounded-2xl border-2 border-indigo-500/60 bg-gradient-to-b from-indigo-950/80 to-slate-900/90'
                  : 'card'
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {isPro && (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-600/5" />
                  <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-indigo-500/30">
                    Most Popular
                  </span>
                </>
              )}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="mt-2 text-4xl font-extrabold tracking-tight">{plan.price}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{plan.desc}</p>
              <Link
                href="https://wa.me/919818691915"
                target="_blank"
                rel="noreferrer"
                className={`mt-5 inline-flex w-full items-center justify-center rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                  isPro
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500'
                    : 'border border-slate-700 bg-slate-800/50 text-slate-200 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {plan.price === 'Custom' ? 'Talk to Us' : 'Pay via UPI →'}
              </Link>
            </article>
          );
        })}
      </div>
      <p className="mt-5 text-center text-xs text-slate-600">
        ✓ UPI Verified Merchant &nbsp;·&nbsp; 24h Money Back Guarantee &nbsp;·&nbsp; 100% Secure
      </p>
    </section>
  );
}
