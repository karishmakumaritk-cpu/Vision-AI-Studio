import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black">AI Automation SaaS for Growing Businesses</motion.h1>
        <p className="mx-auto mt-5 max-w-2xl text-slate-400">Launch workflows, AI copilots, billing and analytics in one platform.</p>
      </section>
    </div>
  );
}
