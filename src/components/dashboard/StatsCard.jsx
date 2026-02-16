import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, change, icon: Icon, color = 'primary', delay = 0 }) => {
  const isPositive = change >= 0;

  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-orange-500 to-orange-600',
    danger: 'from-red-500 to-red-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-black text-gray-900">{value}</h3>
        </div>
        <div
          className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center flex-shrink-0`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-gray-500">vs last week</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;
