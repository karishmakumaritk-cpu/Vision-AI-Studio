import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-16">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black max-w-3xl">AI Automation SaaS for modern businesses</motion.h1>
        <p className="mt-4 text-slate-400 max-w-2xl">Launch workflows, track usage, run AI tools, and monetize via subscriptions in one platform.</p>
      </main>
    </div>
  );
}
