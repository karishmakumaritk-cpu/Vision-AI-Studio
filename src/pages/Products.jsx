import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
    {
      name: 'AI WhatsApp Sales Bot',
      price: '1,999',
      period: 'month',
      features: [
        'Automated replies to customer messages',
        'Order taking and processing',
        'Payment link generation',
        'Product catalog integration',
        'Basic analytics dashboard',
        'WhatsApp Business API integration',
      ],
      popular: false,
    },
    {
      name: 'AI Voice Support Agent',
      price: '3,999',
      period: 'month',
      features: [
        '24/7 incoming call handling',
        'Intelligent complaint resolution',
        'Lead qualification and transfer',
        'Call recordings and transcripts',
        'Multi-language support (3 languages)',
        'Advanced analytics and reporting',
        'Integration with CRM',
      ],
      popular: true,
    },
    {
      name: 'Instagram Reel AI Kit',
      price: '999',
      period: 'one-time',
      features: [
        '100+ AI-generated reel ideas',
        'Script templates for different niches',
        'AI caption writer with hashtags',
        'Posting schedule planner',
        'Trend analysis tool',
        'Free updates for 1 year',
      ],
      popular: false,
    },
    {
      name: 'Business Automation Starter Pack',
      price: '4,999',
      period: 'one-time',
      features: [
        'Lead to sale workflow automation',
        'Email marketing automation',
        'WhatsApp follow-up sequences',
        'Basic CRM setup',
        'Landing page with lead capture',
        '1 month support included',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Ready-to-Use <span className="text-primary-600">AI Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start automating your business today with our plug-and-play AI solutions
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} delay={idx * 0.1} />
          ))}
        </div>

        {/* Custom Solutions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-12 text-center shadow-xl"
        >
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Need Something Custom?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team can build tailored AI solutions designed specifically for your business needs and workflow
          </p>
          
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-glow-lg hover:scale-105 transition-all"
          >
            Request Custom Quote →
          </Link>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-3xl font-black text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'How quickly can I get started?',
                a: 'Most products can be set up within 24-48 hours after purchase.',
              },
              {
                q: 'Do I need technical knowledge?',
                a: 'No! We handle all the technical setup. You just need to provide your business details.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, monthly subscriptions can be canceled anytime with no penalty.',
              },
              {
                q: 'Do you provide training?',
                a: 'Yes, we provide complete training and documentation for all products.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Products;
