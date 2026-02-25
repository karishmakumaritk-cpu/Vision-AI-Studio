import { faqs } from '@/components/landing/data';

export function SocialProofSection() {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-2">
      <article className="card p-5">
        <h3 className="text-lg font-semibold">What our clients say</h3>
        <p className="mt-3 text-slate-300">
          &ldquo;Karishma built our WhatsApp lead automation in just 24 hours. Our conversion rate doubled in the first week!&rdquo;
        </p>
        <p className="mt-3 text-sm text-slate-500">— Export Business Owner, Delhi</p>
        <p className="mt-4 text-slate-300">
          &ldquo;The Export Docs AI saved us hours of manual work every day. Highly recommend Vision AI Studio.&rdquo;
        </p>
        <p className="mt-3 text-sm text-slate-500">— Freight Forwarder, Mumbai</p>
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
