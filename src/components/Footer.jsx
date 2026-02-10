import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

const footerLinks = {
  Services: [
    { label: 'AI Websites', href: '#' },
    { label: 'Business Automation', href: '#' },
    { label: 'AI Chatbots', href: '#' },
    { label: 'Voice Agents', href: '#' }
  ],
  Products: [
    { label: 'WhatsApp Bot', href: '#' },
    { label: 'Voice Support', href: '#' },
    { label: 'Instagram Kit', href: '#' },
    { label: 'Pricing', href: '#' }
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' }
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'API Docs', href: '#' }
  ]
};

const socialLinks = [
  { icon: '👍', label: 'Facebook', href: '#' },
  { icon: '📷', label: 'Instagram', href: '#' },
  { icon: '🔗', label: 'LinkedIn', href: '#' },
  { icon: '🐦', label: 'Twitter', href: '#' }
];

export default function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newsletter Section */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 p-8 rounded-3xl"
          style={{ background: 'rgba(255,74,0,0.1)', borderLeft: '4px solid var(--primary-orange)' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest AI automation insights delivered to your inbox</p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-orange transition-all"
              />
              <button className="px-6 py-3 rounded-full font-bold bg-primary-orange text-white hover:shadow-lg transition-all flex items-center gap-2">
                <HiArrowRight />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-purple to-primary-blue flex items-center justify-center text-white font-bold">
                HB
              </div>
              <span className="font-bold">HerBalance AI</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">AI that works while you live</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={reduce ? {} : { scale: 1.2 }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-purple transition-all"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© 2026 HerBalance AI Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
