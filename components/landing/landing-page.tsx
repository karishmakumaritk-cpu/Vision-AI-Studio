import Image from 'next/image';
import Link from 'next/link';

const features = [
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
];

const plans = [
  { name: 'Free', price: '$0', desc: '20 prompts/day • Basic tools' },
  { name: 'Pro', price: '$29', desc: '500 prompts/month • Advanced workflows' },
  { name: 'Premium', price: '$99', desc: 'Unlimited usage • Priority support' }
];

const faqs = [
  {
    q: 'Can I use Google login and email/password together?',
    a: 'Yes. NextAuth supports both providers and keeps sessions secure via JWT strategy.'
  },
  {
    q: 'How are plan limits enforced?',
    a: 'Each AI request checks your daily/monthly usage against the plan limit before generating output.'
  },
  {
    q: 'Is this deployable now?',
    a: 'Yes. It is structured for Vercel + Postgres (Railway/Supabase) and Stripe webhook integration.'
  }
];

const imageCards = [
  {
    src: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
    alt: 'AI engineering workspace with glowing screens',
    caption: 'AI-first workflows'
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Business analytics charts on laptop',
    caption: 'Growth analytics'
  },
  {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    alt: 'Team collaborating on product strategy',
    caption: 'Execution team'
  }
];

export function LandingPage() {
  return (
    <div className="container-shell py-8 md:py-10">
      <header className="glass-nav flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-tight">Vision AI Studio</h1>
        <div className="space-x-3 text-sm">
          <Link href="/signin" className="text-slate-300 hover:text-white">Login</Link>
          <Link href="/signup" className="rounded-md bg-indigo-600 px-3 py-2 font-medium hover:bg-indigo-500">Get Started</Link>
        </div>
      </header>

      <section className="hero-animated relative mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-8 md:p-14">
        <div className="hero-glow" />
        <p className="inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
          Production-ready AI SaaS Platform
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Build a modern AI SaaS business with auth, billing, dashboard, and automation built in.
        </h2>
        <p className="mt-4 max-w-2xl text-slate-300">
          Inspired by Tixu.ai style execution — but engineered as a scalable Next.js + Prisma application with real subscription and admin foundations.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/signup" className="rounded-md bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500">Start Free Trial</Link>
          <Link href="/dashboard" className="rounded-md border border-slate-700 px-4 py-2 text-slate-200 hover:border-slate-500">View Dashboard</Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {imageCards.map((item, idx) => (
          <article key={item.caption} className="image-card card p-2" style={{ animationDelay: `${idx * 120}ms` }}>
            <div className="relative h-44 overflow-hidden rounded-lg">
              <Image src={item.src} alt={item.alt} fill className="object-cover" unoptimized />
            </div>
            <p className="px-2 py-2 text-sm text-slate-300">{item.caption}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {features.map((item, idx) => (
          <article key={item.title} className="card feature-pop p-5" style={{ animationDelay: `${idx * 80}ms` }}>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
          </article>
        ))}
      </section>

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

      <footer className="mt-12 border-t border-slate-800 py-6 text-sm text-slate-400">
        © {new Date().getFullYear()} Vision AI Studio · Terms · Privacy · Contact · Docs
      </footer>
    </div>
  );
}
