import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-eyebrow">
        <span className="live-dot" />
        Production-ready AI SaaS Platform
      </div>

      <h1 className="hero-title">
        Build Your AI Business
        <br />
        <span className="gtext">Faster Than Ever</span>
      </h1>

      <p className="hero-sub">
        Inspired by Tixu.ai-style execution — engineered as a scalable Next.js&nbsp;+&nbsp;Prisma
        application with real subscription and admin foundations.
      </p>

      <div className="hero-cta flex gap-4 justify-center flex-wrap">
        <Link href="/signup" className="btn-primary btn-xl"><span>Start Free Trial</span></Link>
        <Link href="/dashboard" className="btn-ghost btn-xl">View Dashboard</Link>
      </div>

      <div className="hero-stats">
        <div className="hstat">
          <div className="hstat-n">500+</div>
          <div className="hstat-l">AI Prompts / Month</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">3</div>
          <div className="hstat-l">Subscription Plans</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">99.9%</div>
          <div className="hstat-l">Uptime SLA</div>
        </div>
        <div className="hstat">
          <div className="hstat-n">24/7</div>
          <div className="hstat-l">AI Assistance</div>
        </div>
      </div>
    </section>
  );
}
