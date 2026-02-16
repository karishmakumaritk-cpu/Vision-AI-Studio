import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        business_type: '',
        service_interest: formData.service || '',
        message: formData.message,
      };

      const response = await fetch(`${apiUrl}/leads/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thanks for reaching out. We will contact you soon.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Failed to submit form. Please try again.',
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Unable to reach the server. Please try again shortly.',
      });
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Chat',
      description: 'Get instant responses',
      action: 'Chat Now',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with an expert',
      action: 'Call Now',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Calendar,
      title: 'Book Meeting',
      description: 'Schedule a consultation',
      action: 'Book Now',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Let's <span className="text-primary-600">Connect</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to automate your business? Get in touch and let's discuss how AI can transform your operations
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <button className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                {method.action} →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Main Contact Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl font-black mb-6">Get in Touch</h2>
            <p className="text-lg opacity-90 mb-8">
              We're here to help you transform your business with AI automation. Reach out through any of these channels.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Email</div>
                  <a href="mailto:karishmakumaritk@gmail.com" className="opacity-90 hover:opacity-100 transition-opacity">
                    karishmakumaritk@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Phone</div>
                  <a href="tel:+919818691915" className="opacity-90 hover:opacity-100 transition-opacity">
                    +91 98186 91915
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Location</div>
                  <p className="opacity-90">Delhi, India</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="text-sm opacity-90 mb-2">Business Hours</div>
              <div className="font-semibold">Mon - Sat: 9:00 AM - 7:00 PM IST</div>
              <div className="text-sm opacity-75 mt-1">AI Support: 24/7</div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  placeholder="+91 98765 43210"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Interest
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  disabled={loading}
                >
                  <option value="">Select a service</option>
                  <option value="website">AI Website Development</option>
                  <option value="automation">Business Automation</option>
                  <option value="chatbot">AI Chatbots</option>
                  <option value="voice">AI Voice Agents</option>
                  <option value="instagram">Instagram Growth</option>
                  <option value="custom">Custom Solution</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-glow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Send Message'}
                {!loading && <Send className="w-5 h-5" />}
              </button>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-center font-semibold ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-700 border-2 border-green-200'
                      : 'bg-red-50 text-red-700 border-2 border-red-200'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <p className="text-sm text-gray-500 text-center">
                {!submitStatus ? 'We typically respond within 24 hours' : 'Check your email for next steps'}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
