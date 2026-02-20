import { faqs } from '@/components/landing/data';

export function SocialProofSection() {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-2">
      <article className="card p-5">
        <h3 className="text-lg font-semibold">What founders say</h3>
        <p className="mt-3 text-slate-300">
          “We shipped our AI product in weeks instead of months. Auth, billing, and prompt system were already production-ready.”
        </p>
        <p className="mt-3 text-sm text-slate-500">— SaaS Founder, GrowthOps Lab</p>
      </article>
      <article className="card p-5">
        <h3 className="text-lg font-semibold">FAQ</h3>
        <div className="mt-3 space-y-3">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <p className="font-medium text-slate-200">{faq.q}</p>
              <p className="text-sm text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
