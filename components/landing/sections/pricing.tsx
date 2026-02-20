import Link from 'next/link';
import { plans } from '@/components/landing/data';

export function PricingSection() {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-3">
      {plans.map((plan, idx) => (
        <article key={plan.name} className="card plan-tilt p-5" style={{ animationDelay: `${idx * 100}ms` }}>
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="mt-2 text-3xl font-semibold">{plan.price}</p>
          <p className="mt-2 text-sm text-slate-400">{plan.desc}</p>
          <Link href="/dashboard/billing" className="mt-4 inline-block rounded-md bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700">Choose {plan.name}</Link>
        </article>
      ))}
    </section>
  );
}
