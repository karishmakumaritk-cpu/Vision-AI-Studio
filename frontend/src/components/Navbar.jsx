import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const isAuthenticated = !!user;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Automations', path: '/automations' },
    { name: 'Request Custom', path: '/request' },
    ...(isAuthenticated ? [{ name: 'Dashboard', path: '/dashboard' }] : [])
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <div className="text-lg font-black text-white">Vision AI Studio</div>
              <div className="text-xs text-gray-500 -mt-1">by Karishma Kumari</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`font-semibold transition-colors relative group ${isActive(link.path) ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}>
                {link.name}
                {isActive(link.path) && <motion.div layoutId="activeNav" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500" />}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard"><button className="text-sm text-gray-400 hover:text-white transition">Hi, {user?.name}</button></Link>
            ) : (
              <>
                <Link to="/login"><button className="text-gray-400 hover:text-white font-semibold transition">Login</button></Link>
                <Link to="/signup"><button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-2.5 rounded-full font-bold">Sign Up</button></Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-lg transition">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`block py-2 font-semibold ${isActive(link.path) ? 'text-purple-400' : 'text-gray-400'}`}>
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
