import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import AIAssistant from '../components/AIAssistant';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <Navbar />
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full mb-6"><Sparkles className="w-4 h-4 text-purple-400" /><span className="text-sm text-purple-300">AI Automation Marketplace</span></div>
            <h1 className="text-5xl lg:text-7xl font-black mb-6">Transform Business with <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI Automation</span></h1>
            <p className="text-gray-400 text-lg mb-8">24 ready categories + custom projects. Quote instantly, track progress in dashboard.</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/automations" className="bg-gradient-to-r from-purple-600 to-cyan-600 px-7 py-3 rounded-full font-bold inline-flex items-center gap-2">Explore Automations <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/request" className="bg-white/10 border border-white/20 px-7 py-3 rounded-full font-bold">Request Custom</Link>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> n8n expert implementation</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> WhatsApp + Email notifications</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> Transparent pricing and tracking</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-black mb-1">Karishma Kumari</h3>
            <p className="text-purple-300 mb-4">AI Automation Specialist</p>
            <p className="text-gray-400 mb-4">Custom workflow design using n8n, AI APIs, CRM, WhatsApp and voice channels.</p>
            <a href="mailto:karishmakumaritk@gmail.com" className="block text-purple-300">📧 karishmakumaritk@gmail.com</a>
            <a href="https://wa.me/919818691915" target="_blank" rel="noreferrer" className="block text-green-300 mt-1">📱 +91 98186 91915</a>
          </motion.div>
        </div>
      </section>
      <AIAssistant />
    </div>
  );
}
