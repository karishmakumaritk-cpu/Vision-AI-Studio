import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader, Sparkles } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: `👋 Hi! I can help with automations, pricing, and contact.` }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const getFallbackResponse = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes('price')) return '💰 Pricing: simple ₹8K-15K, medium ₹15K-30K, high ₹30K-60K.';
    if (lower.includes('contact') || lower.includes('karishma')) return '📧 karishmakumaritk@gmail.com • 📱 +91 98186 91915';
    return 'I can explain categories, estimate pricing, and guide your request form.';
  };

  const handleSend = async (text = input) => {
    const msg = text.trim();
    if (!msg || loading) return;
    setInput('');
    setMessages((p) => [...p, { role: 'user', content: msg }]);
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/ai/chat`, { message: msg, context: 'automation_marketplace' });
      setMessages((p) => [...p, { role: 'assistant', content: res.data?.data?.reply || getFallbackResponse(msg) }]);
    } catch {
      setMessages((p) => [...p, { role: 'assistant', content: getFallbackResponse(msg) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center">
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[540px] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-cyan-600 p-4 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-white" />
              <h3 className="font-bold text-white">AI Assistant</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${m.role === 'user' ? 'bg-gradient-to-r from-purple-600 to-cyan-600' : 'bg-white/5 border border-white/10'} max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line`}>{m.content}</div>
                </div>
              ))}
              {loading && <Loader className="w-5 h-5 animate-spin text-purple-400" />}
              <div ref={endRef} />
            </div>
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask me anything..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm" />
              <button onClick={() => handleSend()} disabled={loading || !input.trim()} className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center disabled:opacity-50"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
