import { motion } from 'framer-motion';
import { Clock, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrialBanner = ({ daysRemaining, trialEnd }) => {
  const isExpiringSoon = daysRemaining <= 3;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-2xl p-6 mb-6 relative overflow-hidden
        ${isExpiringSoon 
          ? 'bg-gradient-to-r from-red-500 to-orange-500' 
          : 'bg-gradient-to-r from-purple-600 to-pink-600'
        }
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="text-white">
            <h3 className="text-xl font-bold mb-1">
              {daysRemaining > 0 
                ? `${daysRemaining} Days Left in Your Free Trial` 
                : 'Your Trial Has Ended'
              }
            </h3>
            <p className="text-white/90 text-sm">
              {daysRemaining > 0
                ? `Trial ends on ${new Date(trialEnd).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}`
                : 'Upgrade now to continue using all features'
              }
            </p>
          </div>
        </div>

        {/* Right Side - CTA */}
        <Link
          to="/dashboard/billing"
          className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap"
        >
          <Zap className="w-5 h-5" />
          Upgrade Now
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Progress Bar */}
      {daysRemaining > 0 && (
        <div className="mt-4 relative">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(daysRemaining / 7) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-white rounded-full"
            ></motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TrialBanner;
