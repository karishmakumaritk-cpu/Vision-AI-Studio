import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

const automationCategories = [
  {
    id: 'lead-conversion',
    name: 'AI Lead Conversion Engine',
    category: 'Business Automation',
    emoji: '🎯',
    description: 'Incoming leads → qualification → auto follow-up via WhatsApp + Email + CRM',
    price: { min: 15000, max: 35000 },
    delivery: '7-10 days',
    features: ['Lead qualification', 'WhatsApp integration', 'CRM sync', 'Auto follow-up']
  },
  {
    id: 'customer-support',
    name: 'AI Customer Support Brain',
    category: 'Business Automation',
    emoji: '🤖',
    description: 'Multi-channel support automation',
    price: { min: 20000, max: 45000 },
    delivery: '10-14 days'
  },
  {
    id: 'export-import',
    name: 'AI Export-Import Manager',
    category: 'International Trade',
    emoji: '🌍',
    description: 'Documentation, customs, pricing, logistics',
    price: { min: 30000, max: 60000 },
    delivery: '14-21 days',
    features: ['Documentation', 'Customs', 'Pricing calc', 'Logistics']
  }
];

const categories = ['All', 'Business Automation', 'Knowledge Tools', 'Content Creation', 
  'E-commerce', 'Healthcare', 'Real Estate', 'Finance', 'Analytics', 
  'Developer Tools', 'Future Tech', 'Career', 'International Trade'];

export default function Automations() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAutomations = automationCategories.filter(auto => {
    const matchesCategory = selectedCategory === 'All' || auto.category === selectedCategory;
    const matchesSearch = auto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auto.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen" style={{ paddingTop: 96, background: '#0A0A0A', color: '#fff' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 style={{ fontSize: 40, margin: 0 }}>
            <span style={{ background: 'linear-gradient(90deg,#a78bfa,#06b6d4)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              24 AI Automations
            </span>
          </h1>
          <p style={{ color: '#94a3b8' }}>Choose from ready-to-build solutions or request a custom automation</p>
        </motion.div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search automations..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: 999, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }} />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 12 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: '8px 16px', borderRadius: 999, background: selectedCategory === cat ? 'linear-gradient(90deg,#7c3aed,#06b6d4)' : 'rgba(255,255,255,0.03)', color: selectedCategory === cat ? '#fff' : '#cbd5e1', border: 'none' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', marginBottom: 20 }}>
          Showing {filteredAutomations.length} automation{filteredAutomations.length !== 1 ? 's' : ''}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={selectedCategory + searchQuery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16 }}>
            {filteredAutomations.map((auto, index) => (
              <motion.div key={auto.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.02 }} style={{ background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 12 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>{auto.emoji}</div>
                <div style={{ display: 'inline-block', marginBottom: 8, padding: '4px 10px', borderRadius: 999, background: 'rgba(124,58,237,0.08)', color: '#c4b5fd', fontSize: 12 }}>{auto.category}</div>
                <h3 style={{ margin: '8px 0' }}>{auto.name}</h3>
                <p style={{ color: '#9ca3af', fontSize: 14 }}>{auto.description}</p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, marginTop: 12 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: 12 }}>Price Range</div>
                      <div style={{ fontWeight: 800 }}>₹{(auto.price.min/1000).toFixed(0)}K - ₹{(auto.price.max/1000).toFixed(0)}K</div>
                    </div>
                    <div>
                      <div style={{ color:'#9ca3af', fontSize: 12 }}>Delivery</div>
                      <div style={{ color: '#06b6d4', fontWeight: 600 }}>{auto.delivery}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <Link to={`/request?automation=${auto.id}`}><button style={{ width: '100%', padding: '10px 12px', borderRadius: 10, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', color: '#fff', border: 'none', fontWeight: 700 }}>Request This <ArrowRight style={{ marginLeft: 8 }} /></button></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredAutomations.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 48 }}>🔍</div>
            <h3>No automations found</h3>
            <p style={{ color: '#94a3b8' }}>Try a different search or category</p>
            <Link to="/request"><button style={{ marginTop: 12, padding: '10px 16px', borderRadius: 999, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', color: '#fff' }}>Request Custom Automation</button></Link>
          </div>
        )}
      </div>
    </div>
  );
}
