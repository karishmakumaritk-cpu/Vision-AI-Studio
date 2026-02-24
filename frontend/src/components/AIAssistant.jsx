import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader, Sparkles } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hi! I'm your AI assistant. I can help you with:

• Browse 24 automation categories
• Calculate pricing estimates
• Explain how automations work
• Connect you with Karishma
• Guide you through the process

What can I help you with today?`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const quickActions = [
    '🎯 Show me lead automation',
    '💰 Estimate pricing',
    '📞 How to contact Karishma?',
    '🤖 What automations are available?'
  ];

  const handleSend = async (text = input) => {
    if (!text.trim() || loading) return;
    const userMessage = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/ai/chat`, { message: userMessage, context: 'automation_marketplace' });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.data.reply }]);
    } catch (error) {
      // Fallback local response
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I could not reach the AI service. Try the Request form.' }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.05 }} style={{ position: 'fixed', right: 18, bottom: 18, width: 56, height: 56, borderRadius: 999, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', border: 'none', color: '#fff', zIndex: 50 }}>
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} style={{ position: 'fixed', right: 18, bottom: 88, width: 360, height: 520, background: '#071128', borderRadius: 12, overflow: 'hidden', zIndex: 50 }}>
            <div style={{ padding: 12, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', color: '#fff', display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles /></div>
              <div style={{ fontWeight: 700 }}>AI Assistant</div>
            </div>

            <div style={{ padding: 12, height: 'calc(100% - 120px)', overflow: 'auto' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                  <div style={{ maxWidth: '80%', padding: 8, borderRadius: 12, background: msg.role === 'user' ? 'linear-gradient(90deg,#7c3aed,#06b6d4)' : 'rgba(255,255,255,0.04)', color: msg.role === 'user' ? '#fff' : '#e5e7eb' }}>
                    <div style={{ whiteSpace: 'pre-line' }}>{msg.content}</div>
                  </div>
                </div>
              ))}

              {loading && <div style={{ padding: 8, borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}><Loader /></div>}
              <div ref={messagesEndRef} />
            </div>

            <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 8 }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Ask me anything..." style={{ flex: 1, padding: 8, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }} />
              <button onClick={() => handleSend()} disabled={loading || !input.trim()} style={{ padding: '8px 12px', borderRadius: 8, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', color: '#fff', border: 'none' }}><Send /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
