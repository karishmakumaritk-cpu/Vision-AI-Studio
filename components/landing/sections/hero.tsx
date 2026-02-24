import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="hero-animated relative mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-8 md:p-14">
      <div className="hero-glow" />
      <p className="inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
        Production-ready AI SaaS Platform
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
        Build a modern AI SaaS business with auth, billing, dashboard, and automation built in.
      </h2>
      <p className="mt-4 max-w-2xl text-slate-300">
        Inspired by Tixu.ai-style execution — engineered as a scalable Next.js + Prisma application with real subscription and admin foundations.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/signup" className="rounded-md bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500">Start Free Trial</Link>
        <Link href="/dashboard" className="rounded-md border border-slate-700 px-4 py-2 text-slate-200 hover:border-slate-500">View Dashboard</Link>
      </div>
    </section>
  );
}
