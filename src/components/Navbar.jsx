import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-purple to-primary-blue flex items-center justify-center text-white font-bold">HB</div>
            <span className="font-semibold text-lg">HerBalance AI</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/services" className="text-gray-700 hover:text-gray-900">Services</NavLink>
            <NavLink to="/products" className="text-gray-700 hover:text-gray-900">Products</NavLink>
            <NavLink to="/services" className="text-gray-700 hover:text-gray-900">Pricing</NavLink>
            <NavLink to="/contact" className="text-gray-700 hover:text-gray-900">Contact</NavLink>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:inline text-gray-700 hover:text-gray-900">Login</button>
          <Link to="/contact" className="hidden md:inline-block">
            <button className="px-6 py-2.5 rounded-full text-white font-semibold" style={{ background: 'linear-gradient(90deg,var(--primary-purple),var(--primary-blue))', boxShadow: '0 8px 28px rgba(139,92,246,0.18)' }}>
              Get Started
            </button>
          </Link>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2 rounded-md">
              {open ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="md:hidden bg-white border-t">
            <div className="px-6 py-4 flex flex-col gap-3">
              <Link to="/services" onClick={() => setOpen(false)}>Services</Link>
              <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
              <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 inline-block px-4 py-2 rounded-md bg-gradient-to-r from-primary-purple to-primary-blue text-white text-center">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
