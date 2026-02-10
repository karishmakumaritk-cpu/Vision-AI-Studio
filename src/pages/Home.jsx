import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const servicesGrid = [
  { icon: '🌐', title: 'AI-Powered Websites', desc: 'Smart websites that talk, sell & support automatically' },
  { icon: '⚙️', title: 'Business Automation', desc: 'Leads, Sales & Support automation for Indian businesses' },
  { icon: '💬', title: 'AI Chatbots', desc: 'Website, WhatsApp & Instagram bots that reply like humans' },
  { icon: '📞', title: 'AI Voice Agents', desc: 'Calls, follow-ups & customer support automation' },
  { icon: '📱', title: 'Content & Reel Automation', desc: 'Reel ideas, captions & posting automation' }
];

const whyFeatures = [
  { title: 'Built by Real AI Expert', desc: 'Custom-coded solutions, not templates. Every feature designed for your business.' },
  { title: 'Designed for Indian Businesses', desc: 'Localized workflows, payment methods, language support, and market understanding.' },
  { title: 'Female-First Empathy + Logic', desc: 'Built with empathy for user needs and logic for business growth.' },
  { title: 'Saves Time, Money & Mental Load', desc: 'Focus on growth while AI handles repetitive tasks 24/7.' }
];

export default function Home() {
	const [demoOpen, setDemoOpen] = useState(false);
	const reduce = useReducedMotion();

	return (
		<div className="pt-28"> {/* account for fixed navbar */}
			<section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #fff 0%, #fbfbff 100%)', paddingTop: '120px', paddingBottom: '80px' }}>
				{/* abstract shapes */}
				<div className="absolute -right-40 -top-40 w-[600px] h-[600px] rounded-full bg-primary-purple opacity-10 blur-3xl pointer-events-none" />

				<div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
					{/* Left: text */}
					<div>
						<motion.h1 className="hero-title text-text-primary mb-6" initial={reduce ? {} : { opacity: 0, y: 30 }} animate={reduce ? {} : { opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
							Build Your Business on <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg,var(--primary-purple),var(--primary-blue))' }}>Autopilot</span> with AI
						</motion.h1>

						<motion.p className="text-xl text-text-secondary mb-8 max-w-xl" initial={reduce ? {} : { opacity: 0, y: 18 }} animate={reduce ? {} : { opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
							Websites, Automation, AI Chatbots & Voice Agents — custom-built to grow your brand 24×7
						</motion.p>

						<div className="flex flex-wrap gap-4">
							<motion.a href="/contact" id="book" whileHover={reduce ? {} : { scale: 1.03 }} whileTap={reduce ? {} : { scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
								<button className="px-8 py-4 rounded-full text-lg font-semibold text-white" style={{ background: 'linear-gradient(90deg,var(--primary-orange),#FF6B35)', boxShadow: '0 12px 40px rgba(255,74,0,0.14)' }}>
									🚀 Book Free AI Consultation
								</button>
							</motion.a>

							<motion.button whileHover={reduce ? {} : { scale: 1.03 }} whileTap={reduce ? {} : { scale: 0.98 }} className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-100 shadow" onClick={() => setDemoOpen(true)}>
								🤖 Try Live AI Demo
							</motion.button>
						</div>

						{/* trust badges placeholder */}
						<div className="flex items-center gap-6 mt-8 opacity-70">
							<div className="h-8 bg-white/0">Logo1</div>
							<div className="h-8 bg-white/0">Logo2</div>
							<div className="h-8 bg-white/0">Logo3</div>
						</div>
					</div>

					{/* Right: visual */}
					<motion.div initial={reduce ? {} : { opacity: 0, scale: 0.98 }} animate={reduce ? {} : { opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative">
						<div className="rounded-2xl shadow-zap-strong bg-white p-6" style={{ borderRadius: '24px' }}>
							<div className="h-80 flex items-center justify-center text-gray-400">Hero visual / product mockup</div>
						</div>
					</motion.div>
				</div>
			</section>

			<section className="mt-10">
				<h2 className="text-2xl font-semibold">What We Do</h2>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mt-4">
					<Card title="AI-Powered Websites">
						Smart websites that talk, sell & support automatically
					</Card>
					<Card title="Business Automation">
						Leads, Sales & Support automation for Indian businesses
					</Card>
					<Card title="AI Chatbots">
						Website, WhatsApp & Instagram bots that reply like humans
					</Card>
					<Card title="AI Voice Agents">
						Calls, follow-ups & customer support automation
					</Card>
					<Card title="Content & Reel Automation">
						Reel ideas, captions & posting automation
					</Card>
				</div>
			</section>

			<section className="mt-10">
				<h2 className="text-2xl font-semibold">Why HerBalance AI</h2>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-4">
					<Card title="Built by a real AI expert, not templates">
						Practical, custom solutions
					</Card>
					<Card title="Automation for Indian businesses">
						Localized workflows & integrations
					</Card>
					<Card title="Female-first empathy + logic">Designs with empathy</Card>
					<Card title="Saves time, money & mental load">
						Focus on growth, not chores
					</Card>
				</div>
			</section>

			<section className="py-24 bg-white">
				<div className="max-w-7xl mx-auto px-6">
					<motion.h2
						initial={reduce ? {} : { opacity: 0, y: 20 }}
						whileInView={reduce ? {} : { opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-5xl lg:text-6xl font-black text-center mb-4"
					>
						What We <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg,var(--primary-purple),var(--primary-blue))' }}>Do</span>
					</motion.h2>
					<p className="text-xl text-text-secondary text-center max-w-2xl mx-auto mb-16">
						Everything you need to automate, grow, and scale your business
					</p>

					<motion.div
						variants={reduce ? {} : {
							hidden: { opacity: 0 },
							show: { opacity: 1, transition: { staggerChildren: 0.1 } }
						}}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true, margin: '-100px' }}
						className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
					>
						{servicesGrid.map((service, idx) => (
							<motion.div
								key={idx}
								variants={reduce ? {} : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
								whileHover={reduce ? {} : { y: -4, boxShadow: '0 20px 40px rgba(16,24,40,0.1)' }}
								className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-purple/20 transition-all shadow-zap-card"
							>
								<div className="text-4xl mb-4">{service.icon}</div>
								<h3 className="font-bold text-lg mb-2 text-text-primary">{service.title}</h3>
								<p className="text-sm text-text-secondary">{service.desc}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			<section className="py-24 bg-bg-light">
				<div className="max-w-7xl mx-auto px-6">
					<motion.h2
						initial={reduce ? {} : { opacity: 0, y: 20 }}
						whileInView={reduce ? {} : { opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="text-5xl lg:text-6xl font-black text-center mb-16"
					>
						Why <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg,var(--primary-purple),var(--primary-blue))' }}>HerBalance AI</span>
					</motion.h2>

					<motion.div
						variants={reduce ? {} : {
							hidden: { opacity: 0 },
							show: { opacity: 1, transition: { staggerChildren: 0.12 } }
						}}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
					>
						{whyFeatures.map((feature, idx) => (
							<motion.div
								key={idx}
								variants={reduce ? {} : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
								whileHover={reduce ? {} : { y: -4 }}
								className="bg-white rounded-2xl p-8 border border-gray-100 shadow-zap-card"
							>
								<div className="w-12 h-12 bg-gradient-to-br from-primary-purple/20 to-primary-blue/20 rounded-xl flex items-center justify-center mb-4 text-2xl">
									✓
								</div>
								<h3 className="font-bold text-lg mb-2 text-text-primary">{feature.title}</h3>
								<p className="text-text-secondary">{feature.desc}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* Demo modal */}
			<AnimatePresence>
				{demoOpen && (
					<motion.div
						initial={reduce ? {} : { opacity: 0 }}
						animate={reduce ? {} : { opacity: 1 }}
						exit={reduce ? {} : { opacity: 0 }}
						className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
					>
						<motion.div
							initial={reduce ? {} : { y: 8, opacity: 0 }}
							animate={reduce ? {} : { y: 0, opacity: 1 }}
							exit={reduce ? {} : { y: 8, opacity: 0 }}
							className="bg-white rounded-2xl p-6 max-w-2xl w-full"
						>
							<div className="flex justify-between items-center">
								<h3 className="font-semibold">Live AI Demo</h3>
								<button onClick={() => setDemoOpen(false)} className="text-sm text-gray-500">Close</button>
							</div>
							<div className="mt-4 h-64 bg-gray-50 rounded-lg flex items-center justify-center">Interactive demo placeholder</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
