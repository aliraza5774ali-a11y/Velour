import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, Infinity, Heart, Layers, Users } from 'lucide-react';

// --- Data (4 stat cards - exact from original) ---
const statCards = [
  {
    id: 1,
    image: "https://framerusercontent.com/images/pEBq80I4IeHuPWY6F4zlaCYPo.png?width=600&height=600",
    alt: "Blue T-shirt",
    icon: <Infinity size={20} strokeWidth={1.5} className="text-white" />,
    stat: "10M+",
    label: "Pieces worn daily"
  },
  {
    id: 2,
    image: "https://framerusercontent.com/images/gXeXEdJCGwcyaYKiWNSbF2Wf5Yg.jpeg?width=405&height=720",
    alt: "Woman in stylish dress",
    icon: <Heart size={20} strokeWidth={1.5} className="text-white" />,
    stat: "98%",
    label: "Customer Satisfaction"
  },
  {
    id: 3,
    image: "https://framerusercontent.com/images/nvGX8w2EmNhLJbIVjLMsGKTV4I.jpeg?width=640&height=640",
    alt: "Woman in black dress",
    icon: <Layers size={20} strokeWidth={1.5} className="text-white" />,
    stat: "300+",
    label: "Essential Styles"
  },
  {
    id: 4,
    image: "https://framerusercontent.com/images/k4gwIeU3rPPXIyxSMgWszrewfy8.png?width=600&height=452",
    alt: "Community of boys",
    icon: <Users size={20} strokeWidth={1.5} className="text-white" />,
    stat: "500K+",
    label: "Community worldwide"
  }
];

// --- Badge Component ---
const Badge = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100"
    >
      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
        <Crown size={14} className="text-white" strokeWidth={1.5} />
      </div>
      <span className="text-sm font-medium text-black tracking-tight">About Wearix</span>
    </motion.div>
  );
};

// --- Stat Card Component ---
const StatCard = ({ card, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative overflow-hidden rounded-xl group cursor-pointer"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={card.image} 
          alt={card.alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Mask - Gradient overlay with blur */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          backdropFilter: 'blur(9px)',
          background: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)',
          maskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 55.1351%, rgb(0, 0, 0) 100%)',
          WebkitMaskImage: 'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 55.1351%, rgb(0, 0, 0) 100%)'
        }}
      />

      {/* Content Wrapper - Bottom centered */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col items-center gap-3">
        {/* Icon wrapper - Blurred circle background */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ 
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)'
          }}
        >
          {card.icon}
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {card.stat}
          </h2>
          <p className="text-sm text-white/90 font-medium">
            {card.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main About Section ---
const AboutSection = () => {
  return (
    <section id="about" className="w-full bg-white py-24 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Text wrapper - Centered */}
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <Badge />
          
          <motion.h5 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-black tracking-tight leading-snug max-w-3xl"
          >
            More than fashion, Wearix is a commitment to intentional design. Our curated collections focus on sleek silhouettes, empowering your unique and personal journey with modern ease.
          </motion.h5>
        </div>

        {/* Grid 4x - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {statCards.map((card, index) => (
            <StatCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;