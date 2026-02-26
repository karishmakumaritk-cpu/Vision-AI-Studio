import { faqs } from '@/components/landing/data';

export function SocialProofSection() {
  return (
    <section className="mt-14 grid gap-6 md:grid-cols-2">
      <article className="card p-6">
        <span className="section-label mb-4 block w-fit">Client Reviews</span>
        <h3 className="text-lg font-bold text-white">What our clients say</h3>
        <blockquote className="mt-4 border-l-2 border-indigo-500/50 pl-4">
          <p className="text-sm leading-relaxed text-slate-300">
            &ldquo;Karishma built our WhatsApp lead automation in just 24 hours. Our conversion rate doubled in the first week!&rdquo;
          </p>
          <footer className="mt-2 text-xs font-medium text-slate-500">— Export Business Owner, Delhi</footer>
        </blockquote>
        <blockquote className="mt-5 border-l-2 border-violet-500/50 pl-4">
          <p className="text-sm leading-relaxed text-slate-300">
            &ldquo;The Export Docs AI saved us hours of manual work every day. Highly recommend Vision AI Studio.&rdquo;
          </p>
          <footer className="mt-2 text-xs font-medium text-slate-500">— Freight Forwarder, Mumbai</footer>
        </blockquote>
      </article>
      <article className="card p-6">
        <span className="section-label mb-4 block w-fit">FAQ</span>
        <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
        <div className="mt-4 space-y-5">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-slate-800/70 pb-4 last:border-0 last:pb-0">
              <p className="text-sm font-semibold text-slate-200">{faq.q}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{faq.a}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
