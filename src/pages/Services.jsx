import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi';

const servicesData = [
  {
    icon: '🌐',
    name: 'AI Website Development',
    description: 'Smart websites that talk, sell & support automatically',
    features: ['AI chatbot integration', 'Lead capture automation', 'Email + WhatsApp flows', 'Admin dashboard', 'Mobile responsive']
  },
  {
    icon: '⚙️',
    name: 'Business Automation',
    description: 'Convert every enquiry into a paying customer',
    features: ['Lead follow-ups', 'Abandoned cart recovery', 'Complaint handling', 'Order status updates', 'CRM integration']
  },
  {
    icon: '💬',
    name: 'AI Chatbots',
    description: 'Website, WhatsApp & Instagram bots that reply like humans',
    features: ['FAQ automation', 'Sales support', 'Customer support', 'Booking assistance', 'Lead qualification']
  },
  {
    icon: '📞',
    name: 'AI Voice Agents',
    description: 'Never miss a call again',
    features: ['Incoming call handling', 'Appointment booking', 'Order status queries', 'Complaint escalation', 'Lead transfer']
  },
  {
    icon: '📱',
    name: 'Instagram Growth Automation',
    description: 'Content + reach + consistency — automated',
    features: ['Reel ideas generation', 'Caption writing', 'Hashtag research', 'DM automation', 'Posting schedule']
  }
];

export default function Services() {
  const reduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-black text-text-primary mb-4">
            Our <span className="bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg,var(--primary-purple),var(--primary-blue))' }}>Services</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Everything you need to automate, grow, and scale your business with AI
          </p>
        </motion.div>

        <motion.div
          variants={reduce ? {} : container}
          initial="hidden"
          whileInView={reduce ? {} : 'show'}
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {servicesData.map((service, idx) => (
            <motion.div
              key={idx}
              variants={reduce ? {} : itemVariants}
              whileHover={reduce ? {} : { scale: 1.01, boxShadow: '0 25px 50px rgba(16,24,40,0.12)' }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 md:p-10 border-l-4 border-primary-purple shadow-zap-card hover:shadow-zap-strong transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-purple to-primary-blue rounded-2xl flex items-center justify-center flex-shrink-0 text-4xl">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-black text-text-primary mb-3">
                    {service.name}
                  </h3>
                  <p className="text-lg md:text-xl text-text-secondary mb-6 leading-relaxed max-w-2xl">
                    {service.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center gap-3">
                        <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={reduce ? {} : { gap: '0.75rem' }}
                    className="text-primary-purple font-semibold flex items-center gap-2 transition-all hover:opacity-80"
                  >
                    Learn More <HiArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
