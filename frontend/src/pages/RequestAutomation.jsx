import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, Loader, CheckCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function RequestAutomation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselected = searchParams.get('automation') || '';
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', business_type: '', automation_category: preselected, description: '', budget: '', timeline: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  const estimate = () => {
    let base = 15000;
    const d = formData.description.toLowerCase();
    if (d.includes('voice')) base += 10000;
    if (d.includes('ai')) base += 5000;
    if (d.includes('crm')) base += 4000;
    if (d.includes('integration')) base += 6000;
    return base;
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const price = estimate();
    setEstimatedPrice(price);
    try {
      const res = await axios.post(`${API_URL}/automation/request`, { ...formData, estimated_price: price });
      if (res.data.success) {
        setSubmitted(true);
        toast.success('Request submitted successfully');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="min-h-screen bg-[#0A0A0A] text-white grid place-items-center p-6">
      <div className="max-w-2xl text-center">
        <CheckCircle className="w-20 h-20 mx-auto text-green-400 mb-4" />
        <h2 className="text-4xl font-black mb-3">Request Received!</h2>
        <p className="text-gray-400 mb-5">We'll contact you within 24 hours.</p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <div className="text-gray-500 text-sm">Estimated Price</div>
          <div className="text-4xl font-black">₹{estimatedPrice?.toLocaleString()}</div>
        </div>
        <button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 rounded-full font-bold">Go to Dashboard</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20 px-6">
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Request Custom Automation</motion.h1>
        <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <input required placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-xl p-3" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input required type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl p-3" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <input required placeholder="Phone" className="bg-white/5 border border-white/10 rounded-xl p-3" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <input required placeholder="Business Type" className="bg-white/5 border border-white/10 rounded-xl p-3" value={formData.business_type} onChange={(e) => setFormData({ ...formData, business_type: e.target.value })} />
          </div>
          <input required placeholder="Automation Category" className="bg-white/5 border border-white/10 rounded-xl p-3 w-full" value={formData.automation_category} onChange={(e) => setFormData({ ...formData, automation_category: e.target.value })} />
          <textarea required rows={5} placeholder="Describe your requirement..." className="bg-white/5 border border-white/10 rounded-xl p-3 w-full" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <div className="grid md:grid-cols-2 gap-5">
            <input placeholder="Budget" className="bg-white/5 border border-white/10 rounded-xl p-3" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} />
            <input placeholder="Timeline" className="bg-white/5 border border-white/10 rounded-xl p-3" value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} />
          </div>
          <button disabled={loading} className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl py-3 font-bold flex items-center justify-center gap-2">{loading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}Submit Request</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
