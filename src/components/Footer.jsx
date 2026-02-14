import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Services: [
      { name: 'AI Website Development', path: '/services' },
      { name: 'Business Automation', path: '/services' },
      { name: 'AI Chatbots', path: '/services' },
      { name: 'AI Voice Agents', path: '/services' },
      { name: 'Instagram Growth', path: '/services' },
    ],
    Products: [
      { name: 'WhatsApp Sales Bot', path: '/products' },
      { name: 'Voice Support Agent', path: '/products' },
      { name: 'Instagram Reel Kit', path: '/products' },
      { name: 'Automation Starter Pack', path: '/products' },
    ],
    Company: [
      { name: 'About Us', path: '/' },
      { name: 'Contact', path: '/contact' },
      { name: 'Blog', path: '/' },
      { name: 'Careers', path: '/' },
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/' },
      { name: 'Terms of Service', path: '/' },
      { name: 'Cookie Policy', path: '/' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-black">HerBalance AI</div>
                <div className="text-xs text-gray-400">AI that works while you live</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Empowering Indian businesses with AI automation. Built by experts, designed for growth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-lg mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-gray-400">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary-400" />
              <span>karishmakumaritk@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary-400" />
              <span>+91 98186 91915</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary-400" />
              <span>Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© 2026 HerBalance AI Studio. All rights reserved.</p>
          <p>Made with ❤️ for Indian Businesses</p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
