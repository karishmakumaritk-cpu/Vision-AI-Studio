import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

const plansData = [
  {
    name: 'WhatsApp Sales Bot',
    price: 1999,
    period: 'month',
    popular: false,
    cta: 'Subscribe Now',
    features: ['Auto replies', 'Order taking', 'Payment links', '24/7 availability', 'Analytics dashboard']
  },
  {
    name: 'Voice Support Agent',
    price: 3999,
    period: 'month',
    popular: true,
    cta: 'Get Started',
    features: ['Incoming call handling', 'Complaint resolution', 'Lead transfer', 'Call recording', 'Real-time transcripts']
  },
  {
    name: 'Instagram Reel Kit',
    price: 999,
    period: 'one-time',
    popular: false,
    cta: 'Buy Now',
    features: ['Reel ideas (50+)', 'Scripts & captions', 'Hashtag research', 'Posting reminders', 'Trend analysis']
  },
  {
    name: 'Automation Starter Pack',
    price: 4999,
    period: 'one-time',
    popular: false,
    cta: 'Purchase',
    features: ['Lead→Sale workflow', 'Email + WhatsApp', 'CRM setup', 'Integration support', 'Training session']
  }
];

export default function Products() {
  const reduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-24 pb-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={reduce ? {} : { opacity: 0, y: 20 }} animate={reduce ? {} : { opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black text-text-primary mb-4">
            Simple, <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg,var(--primary-purple),var(--primary-blue))' }}>Transparent</span> Pricing
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Choose the perfect plan for your business. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <motion.div
          variants={reduce ? {} : container}
          initial="hidden"
          whileInView={reduce ? {} : 'show'}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {plansData.map((plan, idx) => (
            <motion.div
              key={idx}
              variants={reduce ? {} : itemVariants}
              whileHover={reduce ? {} : { y: -8 }}
              className={`relative rounded-3xl p-8 border-2 transition-all ${
                plan.popular
                  ? 'lg:scale-110 lg:z-10 border-primary-purple bg-white shadow-zap-strong'
                  : 'border-gray-200 bg-white shadow-zap-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <motion.div initial={reduce ? {} : { scale: 0 }} animate={reduce ? {} : { scale: 1 }} className="px-4 py-2 rounded-full text-sm font-bold text-white" style={{ background: 'linear-gradient(90deg,var(--primary-orange),#FF6B35)' }}>
                    🔥 MOST POPULAR
                  </motion.div>
                </div>
              )}

              <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
              <div className="mb-6 pb-6 border-b border-gray-200">
                <motion.div initial={reduce ? {} : { scale: 0.8, opacity: 0 }} whileInView={reduce ? {} : { scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200 }} className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-text-primary">₹{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm">/{plan.period}</span>
                </motion.div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center gap-3">
                    <HiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={reduce ? {} : { scale: 1.05 }}
                whileTap={reduce ? {} : { scale: 0.98 }}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                  plan.popular
                    ? 'text-white hover:shadow-lg'
                    : 'bg-gray-100 text-text-primary hover:bg-gray-200'
                }`}
                style={
                  plan.popular
                    ? { background: 'linear-gradient(135deg,var(--primary-purple),var(--primary-blue))' }
                    : {}
                }
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
