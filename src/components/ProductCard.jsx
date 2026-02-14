import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ProductCard = ({ name, price, period, features, popular, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className={`
        bg-white rounded-3xl p-8 border-2 transition-all
        ${popular 
          ? 'border-primary-500 scale-105 shadow-2xl relative' 
          : 'border-gray-200 shadow-lg'
        }
      `}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
            🔥 MOST POPULAR
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>

      <div className="mb-6">
        <span className="text-5xl font-black text-gray-900">₹{price}</span>
        <span className="text-gray-500 text-lg">/{period}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`
          w-full py-4 rounded-full font-bold text-lg transition-all
          ${popular
            ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-glow-lg hover:scale-105'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }
        `}
      >
        {popular ? 'Get Started Now' : 'Choose Plan'}
      </button>
    </motion.div>
  );
};

export default ProductCard;
