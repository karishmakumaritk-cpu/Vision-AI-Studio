import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HiMessageSquare, HiPhone, HiCalendar } from 'react-icons/hi';

export default function Contact() {
  const reduce = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const contactMethods = [
    { icon: HiMessageSquare, label: 'AI Chatbot', value: '💬', desc: 'Instant answers 24/7' },
    { icon: HiPhone, label: 'Voice Call', value: '📞', desc: 'Speak with AI assistant' },
    { icon: HiCalendar, label: 'Book Meeting', value: '📅', desc: 'Schedule with founder' }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-black text-text-primary mb-4">
            Let's Build Together
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Get in touch with our team and let's discuss your automation needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact methods */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, x: -20 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-3xl p-8 md:p-10" style={{ background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-blue))' }}>
              <h2 className="text-3xl font-black text-white mb-2">Get in Touch</h2>
              <p className="text-white/80">Multiple ways to reach us for faster response</p>
            </div>

            {contactMethods.map((method, idx) => (
              <motion.button
                key={idx}
                whileHover={reduce ? {} : { scale: 1.02, boxShadow: '0 20px 40px rgba(139,92,246,0.15)' }}
                className="w-full bg-white rounded-2xl p-6 text-left border-2 border-gray-100 hover:border-primary-purple transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-purple/10 to-primary-blue/10 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-purple/20 group-hover:to-primary-blue/20 transition-all">
                    <span className="text-3xl">{method.value}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-text-primary">{method.label}</h3>
                    <p className="text-text-secondary">{method.desc}</p>
                  </div>
                </div>
              </motion.button>
            ))}

            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              whileHover={reduce ? {} : { scale: 1.02 }}
              className="block w-full bg-green-500 text-white rounded-2xl p-4 font-bold text-center hover:shadow-lg transition-all"
            >
              💬 Connect on WhatsApp
            </motion.a>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, x: 20 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-zap-card"
          >
            <h2 className="text-3xl font-black text-text-primary mb-6">Send us a Message</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for reaching out! We'll contact you soon.");
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:outline-none focus:ring-2 focus:ring-primary-purple/10 transition-all"
                  placeholder="Your name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:outline-none focus:ring-2 focus:ring-primary-purple/10 transition-all"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:outline-none focus:ring-2 focus:ring-primary-purple/10 transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Service Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:outline-none focus:ring-2 focus:ring-primary-purple/10 transition-all"
                >
                  <option>Select a service</option>
                  <option>AI Websites</option>
                  <option>Business Automation</option>
                  <option>AI Chatbots</option>
                  <option>Voice Agents</option>
                  <option>Instagram Automation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-purple focus:outline-none focus:ring-2 focus:ring-primary-purple/10 transition-all resize-none"
                  placeholder="Tell us about your needs..."
                />
              </div>

              <motion.button
                whileHover={reduce ? {} : { scale: 1.02 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-full font-bold text-lg text-white transition-all"
                style={{ background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-blue))' }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Floating chat widget */}
      <motion.div
        initial={reduce ? {} : { opacity: 0, y: 20 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="fixed right-6 bottom-6 w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-white text-2xl z-50 cursor-pointer"
        style={{ background: 'linear-gradient(135deg, var(--primary-purple), var(--primary-blue))' }}
        whileHover={reduce ? {} : { scale: 1.1 }}
      >
        💬
      </motion.div>
    </div>
  );
}
