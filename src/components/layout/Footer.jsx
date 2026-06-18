import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

// --- Data ---
const quickLinks = [
  { label: 'Home', href: './' },
  { label: 'About', href: './about' },
  { label: 'Blog', href: './blog' },
  { label: 'Shop', href: './shop' },
  { label: 'Reviews', href: './#reviews' },
  { label: 'Styles', href: './#reviews' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Twitter', href: 'https://x.com' },
  { label: 'Youtube', href: 'https://youtube.com' },
];

const contactInfo = [
  { icon: <Mail size={16} strokeWidth={2} />, label: 'test@gmail.com', href: 'mailto:test@gmail.com' },
  { icon: <Phone size={16} strokeWidth={2} />, label: '+001 234 567 890', href: 'tel:+001 234 567 890' },
  { icon: <MapPin size={16} strokeWidth={2} />, label: 'London, England', href: 'https://www.google.com/maps/place/London,+England' },
];

// --- Newsletter Form ---
const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md"
    >
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        className="flex-1 px-6 py-3.5 rounded-full text-white placeholder:text-white/40 text-base font-normal tracking-tight outline-none border-none"
        style={{ 
          backgroundColor: '#1f1f1f',
          fontFamily: '"Inter Variable", "Inter Variable Placeholder", sans-serif',
          letterSpacing: '-0.02em',
          lineHeight: '1em'
        }}
        required
      />
      <button
        type="submit"
        className="px-6 py-3.5 rounded-full bg-white text-black text-base font-medium tracking-tight cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap"
        style={{ 
          fontFamily: 'Inter, "Inter Placeholder", sans-serif',
          letterSpacing: '-0.02em',
          lineHeight: '1em'
        }}
      >
        Subscribe
      </button>
    </form>
  );
};

// --- Footer Link Component ---
const FooterLink = ({ href, label }) => {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener' : undefined}
      className="text-white/60 hover:text-white transition-colors text-sm font-normal"
    >
      {label}
    </a>
  );
};

// --- Contact Item Component ---
const ContactItem = ({ icon, label, href }) => {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener' : undefined}
      className="flex items-center gap-3 group"
    >
      <div 
        className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15"
        style={{ 
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0)'
        }}
      >
        <span className="text-white">{icon}</span>
      </div>
      <span className="text-white/60 group-hover:text-white transition-colors text-sm">
        {label}
      </span>
    </a>
  );
};

// --- Main Footer Section ---
const FooterSection = () => {
  return (
    <footer 
      className="w-full py-16 md:py-24 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: '#000000' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12"
        >
          <h4 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            Subscribe to our news later
          </h4>
          <NewsletterForm />
        </motion.div>

        {/* Divider Line */}
        <div 
          className="w-full h-px mb-12"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
        />

        {/* Middle Section - Logo, Description, CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-12"
        >
          {/* Left - Logo & Description */}
          <div className="flex flex-col gap-6 max-w-sm">
            {/* Logo */}
            <a href="./" className="block">
              <img 
                src="https://framerusercontent.com/images/k3mQgskzRmcKKsc3Urx85y2azU.svg?width=67&height=23"
                alt="Wearix"
                className="h-6 w-auto"
                loading="lazy"
              />
            </a>
            
            <p className="text-white/80 text-sm leading-relaxed">
              A sophisticated e-commerce template designed for modern and minimalist brands.
            </p>
            
            {/* Contact Wearix Button */}
            <motion.a
              href="./contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[15px] font-medium tracking-tight hover:bg-gray-100 transition-colors self-start"
            >
              <span>Contact Wearix</span>
              <ArrowRight size={16} strokeWidth={2} />
            </motion.a>
          </div>

          {/* Right - Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-16">
            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h5 className="text-white font-medium text-sm mb-1">Quick Links</h5>
              <div className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <FooterLink key={link.label} href={link.href} label={link.label} />
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h5 className="text-white font-medium text-sm mb-1">Follow us:</h5>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <FooterLink key={link.label} href={link.href} label={link.label} />
                ))}
              </div>
            </div>

            {/* Get in Touch */}
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h5 className="text-white font-medium text-sm mb-1">Get in touch</h5>
              <div className="flex flex-col gap-3">
                {contactInfo.map((item) => (
                  <ContactItem 
                    key={item.label} 
                    icon={item.icon} 
                    label={item.label} 
                    href={item.href} 
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Logo - Centered */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center pt-8"
        >
          <a href="./" className="block">
            <img 
              src="https://framerusercontent.com/images/k3mQgskzRmcKKsc3Urx85y2azU.svg?width=67&height=23"
              alt="Wearix"
              className="h-6 w-auto opacity-40 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;