import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="hero-animated relative mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-8 md:p-14">
      <div className="hero-glow" />
      <p className="inline-flex rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
        🇮🇳 India&apos;s #1 Export + AI Automation Platform
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
        Build Powerful AI Workflows <span className="text-indigo-400">In 24 Hours</span>
      </h2>
      <p className="mt-4 max-w-2xl text-slate-300">
        From Lead Automation to Export Documentation — Vision AI Studio designs, builds, and deploys custom AI workflows for your business. No code. No complexity. Pure results.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/signup" className="rounded-md bg-indigo-600 px-4 py-2 font-medium hover:bg-indigo-500">Start Your Workflow →</Link>
        <Link href="https://wa.me/919818691915" target="_blank" rel="noreferrer" className="rounded-md border border-slate-700 px-4 py-2 text-slate-200 hover:border-slate-500">WhatsApp Us</Link>
      </div>
      <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-400">
        <span><strong className="text-white">120+</strong> Workflows Built</span>
        <span><strong className="text-white">85+</strong> Happy Clients</span>
        <span><strong className="text-white">24h</strong> Delivery</span>
        <span><strong className="text-white">99%</strong> Satisfaction</span>
      </div>
    </section>
  );
}
