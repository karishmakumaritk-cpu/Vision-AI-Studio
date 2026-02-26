'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const workflows = [
  { icon: '🎯', name: 'Lead Automation', desc: 'WhatsApp + CRM auto-sync leads', price: '₹999', color: 'from-violet-500/20 to-purple-500/5', border: 'border-violet-500/25' },
  { icon: '📦', name: 'Export Documentation AI', desc: 'Invoice, HS Code, Packing List', price: '₹1,999', color: 'from-cyan-500/20 to-blue-500/5', border: 'border-cyan-500/25' },
  { icon: '🤖', name: 'AI Support Bot', desc: '24/7 intelligent chatbot + voice', price: '₹1,499', color: 'from-emerald-500/20 to-teal-500/5', border: 'border-emerald-500/25' },
  { icon: '💰', name: 'Sales Automation', desc: 'Cart recovery + payment links', price: '₹1,499', color: 'from-orange-500/20 to-amber-500/5', border: 'border-orange-500/25' },
  { icon: '🎬', name: 'Content Automation', desc: 'Reels, captions, auto DMs', price: '₹999', color: 'from-pink-500/20 to-rose-500/5', border: 'border-pink-500/25' },
  { icon: '🎙️', name: 'AI Voice Agent', desc: 'Call handling + follow-up bot', price: '₹4,999', color: 'from-indigo-500/20 to-blue-500/5', border: 'border-indigo-500/25' },
]

const quickReplies = ['Lead Automation', 'Pricing', 'Export Docs', 'How it works']

const AI_GREETING = 'Namaste! Main Vision AI hoon 🙏\n\nAapki business automation journey shuru karte hain. Kya chahiye?'

function getAIReply(msg: string): string {
  const l = msg.toLowerCase()
  if (l.includes('lead') || l.includes('whatsapp') || l.includes('crm'))
    return 'Lead Automation ke liye:\n\n• WhatsApp se leads auto-capture\n• CRM mein auto-save\n• Follow-up sequence\n• Starting ₹999\n\nKaun sa platform use karte ho? 🎯'
  if (l.includes('export') || l.includes('invoice') || l.includes('hs code'))
    return 'Export Documentation AI:\n\n• Commercial Invoice auto-generate\n• HS Code finder\n• Packing List creator\n• COO / BL drafts\n\nKaun sa product export karte ho? 📦'
  if (l.includes('price') || l.includes('cost') || l.includes('kitna') || l.includes('₹') || l.includes('plan'))
    return 'Our Pricing:\n\n💎 Starter: ₹999/project\n⚡ Pro: ₹3,999/month\n🏢 Enterprise: Custom\n\nPro mein 3 workflows + priority support milti hai!\n\nKaunsa plan chahiye? 💳'
  if (l.includes('how') || l.includes('kaise') || l.includes('process') || l.includes('work'))
    return 'Process Simple Hai:\n\n1️⃣ Workflow select karo\n2️⃣ Requirements chat mein batao\n3️⃣ 24h mein demo ready\n4️⃣ UPI se payment karo\n5️⃣ Go Live! 🚀'
  if (l.includes('voice') || l.includes('call'))
    return 'AI Voice Agent:\n\n• Incoming calls handle karta hai\n• Lead info collect karta hai\n• Follow-up schedule karta hai\n• Hindi + English dono\n\nStarting ₹4,999 🎙️'
  return AI_GREETING
}

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'ai', text: AI_GREETING }])
  const [input, setInput] = useState('')
  const [c1, setC1] = useState(0)
  const [c2, setC2] = useState(0)
  const [visible, setVisible] = useState(false)
  const [typing, setTyping] = useState(false)
  const msgsEnd = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisible(true)
    let n1 = 0, n2 = 0
    const i1 = setInterval(() => { n1 += 5; setC1(Math.min(n1, 200)); if (n1 >= 200) clearInterval(i1) }, 20)
    const i2 = setInterval(() => { n2++; setC2(Math.min(n2, 50)); if (n2 >= 50) clearInterval(i2) }, 40)
    return () => { clearInterval(i1); clearInterval(i2) }
  }, [])

  useEffect(() => {
    msgsEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  function sendMsg(text?: string) {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMsgs(m => [...m, { from: 'user', text: msg }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, { from: 'ai', text: getAIReply(msg) }])
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#030309] text-white overflow-x-hidden">

      {/* ANIMATED BG */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[120px] animate-pulse"/>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-purple-500/6 rounded-full blur-[100px] animate-pulse" style={{animationDelay:'2s'}}/>
        <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[80px] animate-pulse" style={{animationDelay:'4s'}}/>
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(140,100,255,1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 bg-[#030309]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-bold text-white text-base">Vision AI Studio</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[['Workflows','#workflows'],['Process','#process'],['Pricing','#pricing']].map(([l,h]) => (
            <a key={l} href={h} className="text-gray-400 hover:text-white text-sm transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/signin" className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors hidden sm:block">Sign In</Link>
          <Link href="/signup" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-white text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-violet-500/25">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-36 pb-24 px-6 text-center max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold mb-8 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
            INDIA&apos;S #1 EXPORT + AI AUTOMATION PLATFORM
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.0] tracking-tight mb-6">
            Build Powerful<br/>
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI Workflows
            </span><br/>
            <span className="text-gray-400 font-light text-4xl md:text-5xl">In 24 Hours</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            From Lead Automation to Export Documentation — we build custom AI workflows for your business. No code. Pure results.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
            <Link href="/signup" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-lg hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-violet-500/30">
              Start Free Trial →
            </Link>
            <button onClick={() => setChatOpen(true)} className="px-8 py-4 rounded-2xl border border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-all flex items-center gap-2">
              <span>🤖</span> Talk to AI
            </button>
          </div>

          {/* STATS BAR */}
          <div className="inline-flex bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
            {[
              { val: `${c1}+`, label: 'Workflows Built' },
              { val: `${c2}+`, label: 'Happy Clients' },
              { val: '24h', label: 'Fast Delivery' },
              { val: '99%', label: 'Satisfaction' },
            ].map((s, i) => (
              <div key={s.label} className={`px-6 py-5 text-center ${i < 3 ? 'border-r border-white/[0.08]' : ''}`}>
                <div className="text-2xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{s.val}</div>
                <div className="text-xs text-gray-500 mt-1 font-medium whitespace-nowrap">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section id="workflows" className="relative z-10 py-20 px-6 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-full">What We Build</span>
            <h2 className="text-4xl font-black mt-5 mb-3">6 Powerful AI Workflows</h2>
            <p className="text-gray-400">Delivered in 24 hours. Fully customized for your business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {workflows.map((wf) => (
              <div key={wf.name} className={`bg-gradient-to-br ${wf.color} border ${wf.border} rounded-2xl p-6 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 group`}>
                <div className="text-4xl mb-4">{wf.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{wf.name}</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{wf.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-black text-base">From {wf.price}</span>
                  <Link href="/signup" className="px-4 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all group-hover:translate-x-1 transition-transform">
                    Request →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-full">The Process</span>
          <h2 className="text-4xl font-black mt-5 mb-14">From Idea to Live in 24 Hours</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { n: '01', t: 'Select', d: 'Choose workflow type' },
              { n: '02', t: 'Chat', d: 'AI collects requirements' },
              { n: '03', t: 'Build', d: '24h timer starts' },
              { n: '04', t: 'Review', d: 'Approve demo' },
              { n: '05', t: 'Go Live', d: 'Pay & activate' },
            ].map((s, i) => (
              <div key={s.n} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 hover:border-violet-500/30 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center font-black text-sm mx-auto mb-3 shadow-lg shadow-violet-500/25">{s.n}</div>
                <div className="font-bold text-sm mb-1">{s.t}</div>
                <div className="text-gray-500 text-xs">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 py-20 px-6 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 px-4 py-2 rounded-full">Pricing</span>
            <h2 className="text-4xl font-black mt-5 mb-3">Transparent Pricing</h2>
            <p className="text-gray-400">Pay per project or subscribe. No hidden costs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '₹999', per: '/project', desc: 'Single automation', features: ['1 Workflow','24h Delivery','7-day Support','1 Revision'], featured: false },
              { name: 'Pro', price: '₹3,999', per: '/month', desc: 'Growing businesses', features: ['3 Workflows/month','Priority Support','Unlimited Revisions','AI Voice Credits','Dashboard Access'], featured: true },
              { name: 'Enterprise', price: 'Custom', per: '', desc: 'Agencies & exporters', features: ['Unlimited Workflows','White-label Option','Dedicated Worker','Custom Integrations','SLA Guarantee'], featured: false },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl p-8 relative ${plan.featured ? 'bg-gradient-to-b from-violet-600/20 to-purple-500/10 border border-violet-500/40 shadow-2xl shadow-violet-500/10' : 'bg-white/[0.04] border border-white/[0.08]'}`}>
                {plan.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-500 text-white text-xs font-bold shadow-lg shadow-violet-500/30">Most Popular ⚡</div>}
                <div className="text-gray-400 text-sm font-medium mb-2">{plan.name}</div>
                <div className="text-4xl font-black mb-1">{plan.price}<span className="text-base font-normal text-gray-400">{plan.per}</span></div>
                <p className="text-gray-500 text-sm pb-5 mb-5 border-b border-white/[0.08]">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300"><span className="text-emerald-400 font-bold flex-shrink-0">✓</span>{f}</li>)}
                </ul>
                <Link href="/signup" className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${plan.featured ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white hover:opacity-90 shadow-lg shadow-violet-500/25' : 'border border-white/10 text-white hover:bg-white/5'}`}>
                  {plan.name === 'Enterprise' ? 'Contact Us →' : 'Get Started →'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative z-10 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Ready to Automate Your Business?</h2>
          <p className="text-gray-400 mb-8">Join 50+ businesses already using Vision AI Studio 🇮🇳</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-violet-500/30">
            Start Free Today →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="text-gray-400 text-sm">© 2026 Vision AI Studio · Built by Karishma Kumari 🇮🇳</span>
          </div>
          <a href="https://wa.me/919818691915" target="_blank" rel="noreferrer" className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors font-medium flex items-center gap-2">
            <span>💬</span> WhatsApp: 9818691915
          </a>
        </div>
      </footer>

      {/* CHAT FAB */}
      <button onClick={() => setChatOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-2xl shadow-violet-500/40 hover:scale-110 active:scale-95 transition-all">
        {chatOpen
          ? <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
          : <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M8 12h.01M12 12h.01M16 12h.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        }
        {!chatOpen && <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#030309] animate-pulse"/>}
      </button>

      {/* CHATBOX */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#0d0d1a] border border-violet-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/20" style={{animation:'chatSlide 0.3s ease'}}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-violet-600/20 to-purple-500/10 border-b border-white/[0.08]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-lg flex-shrink-0">🤖</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white">Vision AI Assistant</div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"/>
                Online · Typically replies instantly
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all">×</button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 h-64 overflow-y-auto" style={{scrollbarWidth:'thin',scrollbarColor:'rgba(139,92,246,0.3) transparent'}}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'ai' && <div className="w-6 h-6 rounded-full bg-violet-600/30 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">🤖</div>}
                <div className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                  m.from === 'user'
                    ? 'bg-violet-600/40 border border-violet-500/30 text-white rounded-br-sm'
                    : 'bg-white/[0.07] border border-white/[0.08] text-gray-200 rounded-bl-sm'
                }`}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6 rounded-full bg-violet-600/30 flex items-center justify-center text-xs flex-shrink-0">🤖</div>
                <div className="bg-white/[0.07] border border-white/[0.08] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                  {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{animationDelay:`${i*150}ms`}}/>)}
                </div>
              </div>
            )}
            <div ref={msgsEnd}/>
          </div>

          {/* Quick replies */}
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {quickReplies.map(q => (
              <button key={q} onClick={() => sendMsg(q)}
                className="px-3 py-1 rounded-full text-xs border border-violet-500/25 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 transition-all">
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 border-t border-white/[0.06]">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg() } }}
              placeholder="Type your question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-violet-500/50 transition-all"/>
            <button onClick={() => sendMsg()}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center flex-shrink-0 hover:opacity-90 active:scale-95 transition-all">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 rotate-90">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes chatSlide {
          from { opacity:0; transform:translateY(16px) scale(0.96); }
          to { opacity:1; transform:translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
