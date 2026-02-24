import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const automationCategories = [
  { id: 'lead-conversion', name: 'AI Lead Conversion Engine', category: 'Business Automation', emoji: '🎯', description: 'Lead qualification + follow-up + CRM', price: { min: 15000, max: 35000 }, delivery: '7-10 days' },
  { id: 'customer-support', name: 'AI Customer Support Brain', category: 'Business Automation', emoji: '🤖', description: 'Auto replies, order tracking, escalation', price: { min: 20000, max: 45000 }, delivery: '10-14 days' },
  { id: 'voice-agent', name: 'AI Voice Appointment Agent', category: 'Business Automation', emoji: '📞', description: 'Call handling + calendar sync', price: { min: 25000, max: 50000 }, delivery: '14-21 days' },
  { id: 'business-consultant', name: 'AI Business Consultant', category: 'Knowledge Tools', emoji: '💡', description: 'AI roadmap for SMB growth', price: { min: 12000, max: 25000 }, delivery: '5-7 days' },
  { id: 'legal-docs', name: 'AI Legal Document Assistant', category: 'Knowledge Tools', emoji: '📜', description: 'NDA/contract generation', price: { min: 10000, max: 22000 }, delivery: '5-7 days' },
  { id: 'reel-script', name: 'AI Reel Script Generator', category: 'Content Creation', emoji: '🎬', description: 'Hooks, scripts, CTA, hashtags', price: { min: 8000, max: 18000 }, delivery: '3-5 days' },
  { id: 'youtube-automation', name: 'AI YouTube Automation Suite', category: 'Content Creation', emoji: '▶️', description: 'Topics + scripts + SEO', price: { min: 12000, max: 28000 }, delivery: '7-10 days' },
  { id: 'cart-recovery', name: 'AI Abandoned Cart Recovery', category: 'E-commerce', emoji: '🛒', description: 'SMS/WhatsApp recovery flows', price: { min: 18000, max: 35000 }, delivery: '7-10 days' },
  { id: 'dynamic-pricing', name: 'AI Dynamic Pricing Tool', category: 'E-commerce', emoji: '💲', description: 'Demand-based pricing engine', price: { min: 25000, max: 50000 }, delivery: '14-21 days' },
  { id: 'women-health', name: 'AI Women Health Assistant', category: 'Niche Tools', emoji: '🌸', description: 'Cycle + wellness support', price: { min: 20000, max: 40000 }, delivery: '14-21 days' },
  { id: 'real-estate', name: 'AI Real Estate Lead Manager', category: 'Niche Tools', emoji: '🏠', description: 'Lead filter + follow-up', price: { min: 18000, max: 38000 }, delivery: '10-14 days' },
  { id: 'loan-eligibility', name: 'AI Loan Eligibility Checker', category: 'Niche Tools', emoji: '🏦', description: 'Eligibility + docs workflow', price: { min: 15000, max: 30000 }, delivery: '7-10 days' },
  { id: 'sales-analytics', name: 'AI Sales Analytics Dashboard', category: 'Analytics', emoji: '📈', description: 'Realtime insights + recommendations', price: { min: 22000, max: 45000 }, delivery: '14-21 days' },
  { id: 'social-optimizer', name: 'AI Social Media Optimizer', category: 'Analytics', emoji: '📱', description: 'Performance analysis + suggestions', price: { min: 12000, max: 25000 }, delivery: '7-10 days' },
  { id: 'workflow-builder', name: 'AI No-Code Workflow Builder', category: 'Developer Tools', emoji: '⚙️', description: 'Workflow platform core', price: { min: 30000, max: 60000 }, delivery: '21-30 days' },
  { id: 'prompt-marketplace', name: 'AI Prompt Marketplace', category: 'Developer Tools', emoji: '🔮', description: 'Prompt buy/sell platform', price: { min: 25000, max: 50000 }, delivery: '14-21 days' },
  { id: 'voice-clone', name: 'AI Voice Clone (Indian Languages)', category: 'Future Tech', emoji: '🎙️', description: 'Voice clone infra', price: { min: 35000, max: 70000 }, delivery: '21-30 days' },
  { id: 'personal-assistant', name: 'AI Personal Assistant OS', category: 'Future Tech', emoji: '🧠', description: 'Business assistant OS', price: { min: 40000, max: 80000 }, delivery: '30+ days' },
  { id: 'automation-marketplace', name: 'AI Automation Marketplace', category: 'Future Tech', emoji: '🏪', description: 'Marketplace platform', price: { min: 50000, max: 100000 }, delivery: '30+ days' },
  { id: 'micro-saas-builder', name: 'AI Micro SaaS Builder', category: 'Future Tech', emoji: '🚀', description: 'Prompt-to-app pipeline', price: { min: 60000, max: 120000 }, delivery: '30+ days' },
  { id: 'job-automation', name: 'AI Job Application Automation', category: 'Career', emoji: '💼', description: 'Apply + optimize + track', price: { min: 10000, max: 20000 }, delivery: '5-7 days' },
  { id: 'export-import', name: 'AI Export-Import Manager', category: 'International Trade', emoji: '🌍', description: 'Docs + customs + ops', price: { min: 30000, max: 60000 }, delivery: '14-21 days' },
  { id: 'sales-closer', name: 'AI Sales Closer Bot', category: 'Business Automation', emoji: '💰', description: 'Objection handling + payment links', price: { min: 18000, max: 40000 }, delivery: '7-10 days' },
  { id: 'brand-manager', name: 'AI Personal Brand Manager', category: 'Content Creation', emoji: '✨', description: 'Calendar + captions + DM', price: { min: 15000, max: 32000 }, delivery: '10-14 days' }
];

const categories = ['All', ...new Set(automationCategories.map((a) => a.category))];

export default function Automations() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = automationCategories.filter((a) => (selectedCategory === 'All' || a.category === selectedCategory) && (a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.description.toLowerCase().includes(searchQuery.toLowerCase())));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20 px-6">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">24 AI Automations</h1>
          <p className="text-gray-400">Pick a ready category or request custom build.</p>
        </motion.div>

        <div className="mb-8 space-y-5">
          <div className="relative max-w-2xl mx-auto"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /><input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search automations..." className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3" /></div>
          <div className="flex flex-wrap gap-2 justify-center">{categories.map((c) => <button key={c} onClick={() => setSelectedCategory(c)} className={`px-4 py-1.5 rounded-full text-sm ${selectedCategory === c ? 'bg-gradient-to-r from-purple-600 to-cyan-600' : 'bg-white/5 text-gray-400'}`}>{c}</button>)}</div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((auto, i) => (
            <motion.div key={auto.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="text-4xl mb-3">{auto.emoji}</div>
              <div className="text-xs text-purple-300 mb-2">{auto.category}</div>
              <h3 className="text-lg font-bold mb-1">{auto.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{auto.description}</p>
              <div className="text-sm text-gray-300 mb-4">₹{(auto.price.min/1000).toFixed(0)}K - ₹{(auto.price.max/1000).toFixed(0)}K • {auto.delivery}</div>
              <Link to={`/request?automation=${auto.id}`} className="inline-flex items-center gap-2 text-cyan-300">Request This <ArrowRight className="w-4 h-4" /></Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
