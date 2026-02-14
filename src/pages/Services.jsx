import { motion } from 'framer-motion';
import { Globe, Zap, Bot, Phone, Instagram, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Globe,
      name: 'AI Website Development',
      description: 'Smart websites that talk, sell & support automatically',
      features: [
        'AI chatbot integration for 24/7 customer support',
        'Advanced lead capture and qualification system',
        'Automated email + WhatsApp follow-up sequences',
        'Custom admin dashboard with analytics',
        'Mobile-responsive design',
        'SEO optimization included',
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    },
    {
      icon: Zap,
      name: 'Business Automation',
      description: 'Convert every enquiry into a paying customer',
      features: [
        'Automated lead follow-up sequences',
        'Abandoned cart recovery system',
        'Customer complaint handling workflow',
        'Order status updates via SMS/WhatsApp',
        'CRM integration (any platform)',
        'Custom workflow automation',
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    },
    {
      icon: Bot,
      name: 'AI Chatbots',
      description: 'Website, WhatsApp & Instagram bots that reply like humans',
      features: [
        'Natural language understanding (NLU)',
        'Multi-platform deployment (Web, WhatsApp, Instagram)',
        'FAQ automation with learning capability',
        'Sales assistance and product recommendations',
        'Appointment booking integration',
        'Multi-language support (Hindi, English, Regional)',
      ],
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    },
    {
      icon: Phone,
      name: 'AI Voice Agents',
      description: 'Never miss a call again — AI handles it all',
      features: [
        'Incoming call handling 24/7',
        'Appointment scheduling and confirmations',
        'Order status inquiries',
        'Complaint escalation to human agents',
        'Call recording and transcription',
        'Sentiment analysis and reporting',
      ],
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80',
    },
    {
      icon: Instagram,
      name: 'Instagram Growth Automation',
      description: 'Content + reach + consistency — fully automated',
      features: [
        'AI-powered reel ideas based on trends',
        'Caption writing with hashtag research',
        'Posting schedule optimization',
        'DM automation for engagement',
        'Comment response automation',
        'Analytics and growth tracking',
      ],
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Our <span className="text-primary-600">AI Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end AI solutions designed to automate, optimize, and accelerate your business growth
          </p>
        </motion.div>

        {/* Services */}
        <div className="space-y-16">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="rounded-2xl shadow-2xl w-full"
                  />
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <service.icon className="w-4 h-4" />
                  Service #{idx + 1}
                </div>

                <h2 className="text-4xl font-black text-gray-900 mb-4">{service.name}</h2>
                <p className="text-xl text-gray-600 mb-8">{service.description}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-glow-lg hover:scale-105 transition-all"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-black mb-4">Need a Custom Solution?</h2>
          <p className="text-xl mb-8 opacity-90">
            We build tailored AI systems for unique business needs
          </p>
          
          <Link
            to="/contact"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            Talk to an Expert →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
