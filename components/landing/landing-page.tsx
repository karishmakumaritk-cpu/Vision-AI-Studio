import Link from 'next/link';

const features = [
  'AI content + marketing generation',
  'Prompt history and workspace',
  'Stripe subscription billing',
  'Admin controls and usage analytics'
];

const plans = [
  { name: 'Free', price: '$0', desc: '20 prompts per day' },
  { name: 'Pro', price: '$29', desc: '500 prompts per month' },
  { name: 'Premium', price: '$99', desc: 'Unlimited generation' }
];

export function LandingPage() {
  return (
    <div className="container-shell py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Vision AI Studio</h1>
        <div className="space-x-3 text-sm">
          <Link href="/signin">Login</Link>
          <Link href="/signup" className="rounded-md bg-indigo-600 px-3 py-2">Get Started</Link>
        </div>
      </header>

      <section className="py-16 text-center">
        <h2 className="text-4xl font-semibold">Build startup-grade AI workflows in minutes</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">A production-ready AI SaaS platform inspired by Tixu.ai with auth, billing, prompt management, and admin tools.</p>
        <Link href="/signup" className="mt-6 inline-block rounded-md bg-indigo-600 px-4 py-2">Start Free Trial</Link>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {features.map((item) => <div key={item} className="card p-4">{item}</div>)}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="card p-5">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-2 text-3xl">{plan.price}</p>
            <p className="mt-2 text-sm text-slate-400">{plan.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="card p-4"><h3 className="font-semibold">Testimonials</h3><p className="mt-2 text-slate-400">“We scaled lead response 10x using Vision AI Studio.”</p></div>
        <div className="card p-4"><h3 className="font-semibold">FAQ</h3><p className="mt-2 text-slate-400">Supports Google OAuth, credentials auth, Stripe billing, and OpenAI tools.</p></div>
      </section>

      <footer className="mt-12 border-t border-slate-800 py-6 text-sm text-slate-400">© {new Date().getFullYear()} Vision AI Studio · Terms · Privacy · Contact</footer>
    </div>
  );
}
