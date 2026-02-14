import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Globe, Zap, Bot, Phone, Instagram, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      icon: Globe,
      title: 'AI-Powered Websites',
      description: 'Smart websites that talk, sell & support automatically.',
      features: [
        'AI chatbot integration',
        'Lead capture system',
        'Email + WhatsApp automation',
        'Admin dashboard',
      ],
    },
    {
      icon: Zap,
      title: 'Business Automation',
      description: 'Convert every enquiry into a paying customer.',
      features: [
        'Lead follow-ups',
        'Abandoned cart recovery',
        'Customer complaint handling',
        'Order updates',
      ],
    },
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: 'Website, WhatsApp & Instagram bots that reply like humans.',
      features: [
        'FAQs automation',
        'Sales assistance',
        '24/7 Support',
        'Appointment booking',
      ],
    },
    {
      icon: Phone,
      title: 'AI Voice Agents',
      description: 'Never miss a call again.',
      features: [
        'Incoming call handling',
        'Appointment booking',
        'Order status updates',
        'Complaint escalation',
      ],
    },
    {
      icon: Instagram,
      title: 'Instagram Growth',
      description: 'Content + reach + consistency — automated.',
      features: [
        'Reel ideas generation',
        'Caption writing',
        'Hashtag research',
        'DM automation',
      ],
    },
  ];

  const products = [
    {
      name: 'AI WhatsApp Sales Bot',
      price: '1,999',
      period: 'month',
      features: [
        'Auto replies to messages',
        'Order taking & processing',
        'Payment link generation',
        'Basic analytics',
      ],
      popular: false,
    },
    {
      name: 'AI Voice Support Agent',
      price: '3,999',
      period: 'month',
      features: [
        'Incoming call handling',
        'Complaint resolution',
        'Lead transfer to sales',
        'Call recordings & analytics',
        'Multi-language support',
      ],
      popular: true,
    },
    {
      name: 'Instagram Reel AI Kit',
      price: '999',
      period: 'one-time',
      features: [
        'AI reel ideas generator',
        'Script templates',
        'Caption writer',
        'Posting reminders',
      ],
      popular: false,
    },
  ];

  const whyChooseUs = [
    {
      title: 'Built by Real AI Experts',
      description: 'Not templates — every solution is custom-coded for your specific needs.',
      icon: '🎯',
    },
    {
      title: 'Designed for Indian Businesses',
      description: 'Understanding of local market, languages, and business practices.',
      icon: '🇮🇳',
    },
    {
      title: 'Female-First Empathy + Logic',
      description: 'Unique perspective combining technical excellence with human understanding.',
      icon: '💜',
    },
    {
      title: 'Saves Time, Money & Mental Load',
      description: 'Automation that actually works, reducing your daily workload by 70%.',
      icon: '⚡',
    },
  ];

  const stats = [
    { number: '150+', label: 'Happy Clients' },
    { number: '500+', label: 'Projects Delivered' },
    { number: '24/7', label: 'AI Support' },
    { number: '99%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <Hero />      {/* Stats */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Automate & Grow
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From websites to voice agents — we build AI solutions that work while you sleep
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why Choose <span className="text-primary-600">HerBalance AI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another AI agency — we're your growth partners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex gap-6"
              >
                <div className="text-5xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Image Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Professional woman working"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-sm text-gray-600 italic">
                  "HerBalance AI transformed our business overnight!"
                </p>
                <p className="text-xs text-gray-500 mt-2">— Priya S., E-commerce Owner</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Female-Led, Expert-Built, Results-Driven
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                As a woman in tech, I understand the unique challenges of running a business. That's why every AI solution we build combines technical excellence with real-world empathy.
              </p>
              <ul className="space-y-4">
                {[
                  'Custom AI models trained on your specific data',
                  'Seamless integration with existing tools',
                  'Ongoing support and optimization',
                  'ROI-focused implementation strategy',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products/Pricing */}
      <section className="section bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Ready-to-Use AI Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start automating today with our plug-and-play AI solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, idx) => (
              <ProductCard key={idx} {...product} delay={idx * 0.1} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-6">
              Need something custom? We build tailored AI solutions too.
            </p>
            
            <Link
              to="/contact"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg border-2 border-primary-200 hover:border-primary-300 hover:shadow-lg transition-all"
            >
              Talk to an Expert →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Book a free consultation and discover how AI can 10x your growth
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              
              <Link
                to="/contact"
                className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                🚀 Book Free Consultation
              </Link>
              
              <Link
                to="/products"
                className="bg-transparent text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-primary-600 transition-all"
              >
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
