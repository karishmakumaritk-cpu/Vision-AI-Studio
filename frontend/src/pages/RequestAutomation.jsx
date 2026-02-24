import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Send, Loader, CheckCircle, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function RequestAutomation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedAutomation = searchParams.get('automation');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business_type: '',
    automation_category: preselectedAutomation || '',
    description: '',
    budget: '',
    timeline: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  const businessTypes = [
    'E-commerce', 'Service Business', 'Agency', 'Clinic/Hospital',
    'Restaurant', 'Real Estate', 'Education', 'Salon/Spa',
    'Consulting', 'Manufacturing', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateEstimatedPrice = () => {
    const basePrice = 15000;
    let multiplier = 1;
    if (formData.description.toLowerCase().includes('voice')) multiplier += 0.8;
    if (formData.description.toLowerCase().includes('ai')) multiplier += 0.5;
    if (formData.description.toLowerCase().includes('whatsapp')) multiplier += 0.3;
    if (formData.description.toLowerCase().includes('crm')) multiplier += 0.4;
    return Math.round(basePrice * multiplier);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const price = calculateEstimatedPrice();
    setEstimatedPrice(price);

    try {
      const res = await axios.post(`${API_URL}/automation/request`, {
        ...formData,
        estimated_price: price
      });

      if (res.data.success) {
        setSubmitted(true);
        toast.success('Request sent! Check your email for confirmation.');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 640, textAlign: 'center' }}>
          <div style={{ width: 96, height: 96, margin: '0 auto 24px', borderRadius: 999, background: 'linear-gradient(90deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle style={{ width: 48, height: 48, color: '#fff' }} />
          </div>
          <h2 style={{ fontSize: 32 }}>Request Received!</h2>
          <p style={{ color: '#94a3b8' }}>I'll review your requirements and get back to you within 24 hours with a detailed quote.</p>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: 20, borderRadius: 12, marginTop: 20 }}>
            <div style={{ color: '#9ca3af', fontSize: 14 }}>Estimated Price</div>
            <div style={{ fontSize: 36, fontWeight: 800, background: 'linear-gradient(90deg,#a78bfa,#06b6d4)', WebkitBackgroundClip: 'text', color: 'transparent' }}>₹{estimatedPrice?.toLocaleString()}</div>
            <p style={{ color: '#9ca3baf' }}>This is a preliminary estimate. Final price will be confirmed after detailed discussion.</p>
          </div>

          <div style={{ marginTop: 20 }}>
            <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 16px', borderRadius: 10, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', color: '#fff', border: 'none', marginRight: 8 }}>Go to Dashboard</button>
            <button onClick={() => { setSubmitted(false); setFormData({ name:'', email:'', phone:'', business_type:'', automation_category:'', description:'', budget:'', timeline:'' }); }} style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', color: '#fff', border: '1px solid rgba(255,255,255,0.06)' }}>Submit Another Request</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: 96, background: '#0A0A0A', color: '#fff' }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 style={{ fontSize: 36 }}>Request Custom Automation</h1>
          <p style={{ color: '#94a3b8' }}>Fill out the form below. I'll review and send you a detailed quote within 24 hours.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'rgba(255,255,255,0.03)', padding: 20, borderRadius: 12 }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: '#9ca3af' }}>Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#9ca3af' }}>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: '#9ca3af' }}>Phone Number (WhatsApp) *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#9ca3af' }}>Business Type *</label>
                <select name="business_type" value={formData.business_type} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 8, background: '#071128', border: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>
                  <option value="">Select business type</option>
                  {businessTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, color: '#9ca3af' }}>What automation do you need? *</label>
              <input type="text" name="automation_category" value={formData.automation_category} onChange={handleChange} required placeholder="E.g., Lead conversion automation, WhatsApp bot, etc." />
            </div>

            <div>
              <label style={{ fontSize: 13, color: '#9ca3af' }}>Describe your requirements in detail *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows={6} placeholder="Tell me exactly what you need." />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: '#9ca3af' }}>Budget Range (Optional)</label>
                <input type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="E.g., ₹15,000 - ₹30,000" />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#9ca3af' }}>When do you need this? (Optional)</label>
                <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} placeholder="E.g., ASAP, 2 weeks, 1 month" />
              </div>
            </div>

            <div style={{ background: 'linear-gradient(90deg, rgba(124,58,237,0.06), rgba(6,182,212,0.04))', padding: 12, borderRadius: 12 }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <Phone style={{ color: '#a78bfa' }} />
                <div>
                  <div style={{ color: '#a78bfa', fontWeight: 700 }}>What happens next?</div>
                  <ul style={{ color: '#9ca3baf', marginTop: 6 }}>
                    <li>✓ You'll receive an email confirmation instantly</li>
                    <li>✓ I'll review your requirements (within 24 hours)</li>
                    <li>✓ You'll get a WhatsApp message with detailed quote</li>
                    <li>✓ We discuss and finalize the scope</li>
                    <li>✓ I build your automation in n8n</li>
                    <li>✓ You track progress in your dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ padding: 12, borderRadius: 10, background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', color: '#fff', fontWeight: 700 }}>
              {loading ? 'Sending your request...' : 'Submit Request'}
            </button>
          </form>
        </motion.div>

        <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: 18 }}>
          <p>Prefer to discuss directly?</p>
          <div>
            <a href="mailto:karishmakumaritk@gmail.com" style={{ marginRight: 12, color: '#a78bfa' }}>📧 karishmakumaritk@gmail.com</a>
            <a href="https://wa.me/919818691915" target="_blank" rel="noreferrer" style={{ color: '#10b981' }}>📱 +91 98186 91915</a>
          </div>
        </div>
      </div>
    </div>
  );
}
