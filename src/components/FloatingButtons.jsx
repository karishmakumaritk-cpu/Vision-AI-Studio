import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-green-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-glow-lg transition-all"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-primary-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-glow-lg transition-all"
        title="Call Us"
      >
        <Phone className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default FloatingButtons;
