import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, features, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className="card group cursor-pointer"
    >
      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-8 h-8 text-primary-600" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Learn More Link */}
      <div className="flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-3 transition-all">
        Learn More
        <ArrowRight className="w-5 h-5" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
