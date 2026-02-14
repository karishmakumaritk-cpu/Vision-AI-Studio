import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Bot } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 pt-32 pb-20 lg:pt-40 lg:pb-32">
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-200 rounded-full blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-200 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-gray-700">AI-Powered Business Growth</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6"
            >
              Build Your Business on{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Autopilot
              </span>{' '}
              with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed"
            >
              Websites, Automation, AI Chatbots & Voice Agents — custom-built to grow your brand 24×7
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/contact" className="btn-primary group">
                🚀 Book Free AI Consultation
                <Zap className="inline-block ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
              <Link to="/products" className="btn-secondary group">
                🤖 Try Live AI Demo
                <Bot className="inline-block ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-12 flex items-center gap-8 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-2 border-white"
                    ></div>
                  ))}
                </div>
                <span className="font-semibold">150+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★★★★★</span>
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Replace with actual image from Unsplash */}
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                alt="AI Automation Dashboard"
                className="w-full rounded-2xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Revenue</div>
                    <div className="text-lg font-bold text-gray-900">+245%</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Time Saved</div>
                    <div className="text-lg font-bold text-gray-900">120 hrs/mo</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl blur-3xl opacity-30 -z-10 transform scale-105"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
