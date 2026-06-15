import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Crown, Clock, Heart, Shirt, Scissors, Sparkles, 
  Box, Layers, Zap, Palette, Diamond, Star, 
  CheckCircle, Shield, ArrowRight, Infinity
} from 'lucide-react';

// --- Types ---
// interface CardData {
//   id: number;
//   title: string;
//   description: string;
//   image1: string;
//   image2: string;
//   image1Alt: string;
//   image2Alt: string;
//   tags: { label: string; icon: React.ReactNode }[];
// }

// --- Data (Exact from original) ---
const cardsData = [
  {
    id: 1,
    title: "Everyday Comfort",
    description: "Designed to feel natural on the body throughout long, active days.",
    image1: "https://framerusercontent.com/images/a7qNl1CXTOrgB91iOnO8iwyMrI.jpeg?width=600&height=600",
    image2: "https://framerusercontent.com/images/ybJODTv9BV3Z7bMYd6a6bclh6Sg.jpeg?width=600&height=600",
    image1Alt: "Green hoodie",
    image2Alt: "Minimalist hoodie",
    tags: [
      { label: "All-day wear", icon: <Clock size={14} strokeWidth={2} /> },
      { label: "Comfort", icon: <Heart size={14} strokeWidth={2} /> },
      { label: "Relaxed fit", icon: <Shirt size={14} strokeWidth={1.8} /> }
    ]
  },
  {
    id: 2,
    title: "Modern Silhouettes",
    description: "Contemporary shapes balance structure & ease for confident everyday styling.",
    image1: "https://framerusercontent.com/images/JBfpcQ5zwrSJimngcpAyoOiP1Hk.png?width=420&height=600",
    image2: "https://framerusercontent.com/images/ATHsoTzpbKxwwKkISL2Qfi2BQ2U.jpeg?width=420&height=600",
    image1Alt: "Futuristic fashion pose",
    image2Alt: "Cyberpunk Fashion pose",
    tags: [
      { label: "Balanced fit", icon: <Scissors size={14} strokeWidth={2} /> },
      { label: "Modern", icon: <Sparkles size={14} strokeWidth={2} /> },
      { label: "Structured", icon: <Box size={14} strokeWidth={1.8} /> }
    ]
  },
  {
    id: 3,
    title: "Effortless Styling",
    description: "Pieces work together naturally, making daily outfit choices simple & intuitive.",
    image1: "https://framerusercontent.com/images/h5mjcigkuGzHUrDKNZj4VOiAg.jpeg?width=343&height=600",
    image2: "https://framerusercontent.com/images/3pzhLnz4BOm15P19zWPl47fJ0Mo.jpeg?width=343&height=600",
    image1Alt: "White sweatshirt on clothesline",
    image2Alt: "White sweatshirt on clothesline",
    tags: [
      { label: "Versatile", icon: <Layers size={14} strokeWidth={2} /> },
      { label: "Easy to style", icon: <Zap size={14} strokeWidth={2} /> },
      { label: "Layered", icon: <Palette size={14} strokeWidth={1.8} /> }
    ]
  },
  {
    id: 4,
    title: "Daily Essentials",
    description: "Core clothing pieces designed for frequent wear across modern everyday routines.",
    image1: "https://framerusercontent.com/images/o8BbZ7Bmf99hekDMhLBtBkxBoY.jpeg?width=400&height=354",
    image2: "https://framerusercontent.com/images/8QML9c7jvYYPpGGvtSi9MmQBLg.jpeg?width=400&height=404",
    image1Alt: "Minimalist fashion look",
    image2Alt: "Woman in minimalist setting",
    tags: [
      { label: "Core pieces", icon: <Diamond size={14} strokeWidth={2} /> },
      { label: "Everyday", icon: <Star size={14} strokeWidth={2} /> },
      { label: "Wearable", icon: <CheckCircle size={14} strokeWidth={1.8} /> }
    ]
  },
  {
    id: 5,
    title: "Wearable Design",
    description: "Design decisions focused on comfort, fit, and real-life wearability.",
    image1: "https://framerusercontent.com/images/PHhxud3IFjLeAUBKSfIjoU.jpg?width=768&height=1152",
    image2: "https://framerusercontent.com/images/hpBEL1qSUqtuE2iSr01qaWoVTJM.png?width=478&height=512",
    image1Alt: "Bold fashion portrait",
    image2Alt: "Bold fashion portrait",
    tags: [
      { label: "Practical", icon: <Shield size={14} strokeWidth={2} /> },
      { label: "Functional", icon: <ArrowRight size={14} strokeWidth={2} /> },
      { label: "Adaptable", icon: <Infinity size={14} strokeWidth={1.8} /> }
    ]
  },
  {
    id: 6,
    title: "Clean Aesthetic",
    description: "Designed to feel natural on the body throughout long, active days.",
    image1: "https://framerusercontent.com/images/IWKuR2oZjCwRSiCZeEvdAMXZEg.jpeg?width=600&height=600",
    image2: "https://framerusercontent.com/images/ywPSLgFGyM72gZm0DNOvWwaoyHQ.jpeg?width=600&height=600",
    image1Alt: "Minimalist fashion",
    image2Alt: "Minimalist beige sweatshirt",
    tags: [
      { label: "Clean lines", icon: <Scissors size={14} strokeWidth={2} /> },
      { label: "Minimal", icon: <Box size={14} strokeWidth={2} /> },
      { label: "Timeless", icon: <Clock size={14} strokeWidth={1.8} /> }
    ]
  }
];

// --- Badge Component (Exact recreation) ---
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
      <span className="text-sm font-medium text-black tracking-tight">What defines our wear</span>
    </motion.div>
  );
};

// --- Section Header (Exact recreation) ---
const SectionHeader = () => {
  return (
    <div className="flex flex-col items-center text-center gap-4 mb-16">
      <Badge />
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black tracking-tight leading-tight"
      >
        Where style meets ease
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-gray-500 text-lg max-w-xl leading-relaxed"
      >
        Thoughtful design blending modern style, comfort, and versatility for everyday living across lifestyles.
      </motion.p>
    </div>
  );
};

// --- Individual Card (Exact recreation with hover effects) ---
const StyleCard = ({ card, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-[20px] overflow-hidden cursor-pointer group"
      style={{
        boxShadow: hovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
      }}
    >
      {/* Images Wrapper - Exact recreation with rotated images */}
      <div className="relative h-[280px] overflow-hidden bg-gray-50">
        <div className="absolute inset-0 flex items-center justify-center gap-3 px-6">
          {/* Image 1 - rotated left (-10deg) */}
          <motion.div 
            className="relative w-[140px] h-[180px] rounded-2xl overflow-hidden border-2 border-white"
            animate={{ 
              rotate: hovered ? -12 : -10,
              scale: hovered ? 1.05 : 1,
              y: hovered ? -5 : 0
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              boxShadow: '0 1px 40px 0 rgba(0, 0, 0, 0.15)',
              zIndex: 2
            }}
          >
            <img 
              src={card.image1} 
              alt={card.image1Alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
          
          {/* Image 2 - rotated right (+10deg) */}
          <motion.div 
            className="relative w-[140px] h-[180px] rounded-2xl overflow-hidden border-2 border-white"
            animate={{ 
              rotate: hovered ? 12 : 10,
              scale: hovered ? 1.05 : 1,
              y: hovered ? -5 : 0
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              boxShadow: '0 1px 40px 0 rgba(0, 0, 0, 0.15)',
              zIndex: 1
            }}
          >
            <img 
              src={card.image2} 
              alt={card.image2Alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      {/* Content - Exact text styling */}
      <div className="p-6 pt-4">
        {/* Label & Description */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-black mb-2 tracking-tight">
            {card.title}
          </h3>
          <div className="w-full h-px bg-black/10 mb-3" />
          <p className="text-sm text-gray-500 leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Tags - Exact pill styling with icons */}
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{ 
                scale: hovered ? 1.05 : 1,
                backgroundColor: hovered ? '#f5f5f5' : '#eeeeee'
              }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-black"
              style={{ backgroundColor: '#eeeeee' }}
            >
              <span className="text-black/70">{tag.icon}</span>
              <span>{tag.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Section (Exact container structure) ---
const StylesWearSection = () => {
  return (
    <section id="styles" className="w-full bg-white py-24 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionHeader />
        
        {/* Grid 3x2 - Exact layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.map((card, index) => (
            <StyleCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StylesWearSection;