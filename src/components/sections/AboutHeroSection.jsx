import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

// --- Animated Text Component (Character-by-character reveal with 3D rotation) ---
const AnimatedText = ({ 
  text, 
  className = "",
  staggerDelay = 0.03,
  startDelay = 0
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { 
        opacity: 0, 
        y: 20,
        rotateX: -90
      },
      { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: staggerDelay,
        delay: startDelay,
        ease: "power3.out"
      }
    );
  }, [isInView, staggerDelay, startDelay]);

  // Split text into words and characters, preserving spaces
  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span 
              key={`${wordIndex}-${charIndex}`}
              className="char inline-block"
              style={{ 
                willChange: 'transform',
                transformStyle: 'preserve-3d'
              }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="char inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </div>
  );
};

// --- Section Tag Component (Transparent badge with blur) ---
const SectionTag = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
    >
      <div className="bg-white rounded-full px-3 py-1">
        <span className="text-xs font-medium text-black">About</span>
      </div>
      <span className="text-sm font-medium text-white/90">Know about Wearix</span>
    </motion.div>
  );
};

// --- Hero Section ---
const HeroSection = () => {
  const sectionRef = useRef(null);

  return (
    <header 
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image - Full bleed, object-fit cover */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://framerusercontent.com/images/wX2ONi3VmPlzsnApW0bSgrCBFE8.png?width=1024&height=1024"
          alt="Three people in trench coats walk past a neon storefront."
          className="w-full h-full object-cover object-center"
          style={{ display: 'block' }}
        />
      </div>

      {/* Overlay - Dark gradient for text readability */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)' 
        }}
      />

      {/* Mask - Subtle vignette effect */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ 
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.3)'
        }}
      />

      {/* Content Container - Centered */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-16 py-24">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          
          {/* Section Tag - Transparent with blur */}
          <SectionTag />

          {/* Heading - GSAP character animation with 3D rotateX */}
          <div className="overflow-hidden">
            <AnimatedText 
              text="Timeless design, modern wearability"
              className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-tight"
              staggerDelay={0.04}
              startDelay={0.3}
            />
          </div>

          {/* Description - GSAP character animation */}
          <div className="max-w-2xl">
            <AnimatedText 
              text="We focus on creating essential garments that remain relevant, functional, and refined across seasons."
              className="text-base md:text-lg text-white/80 leading-relaxed"
              staggerDelay={0.015}
              startDelay={0.8}
            />
          </div>

          {/* Buttons Wrapper */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 justify-center mt-4"
          >
            {/* White button - Browse collections */}
            <motion.a
              href="./shop"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[15px] font-medium tracking-tight hover:bg-gray-100 transition-colors"
            >
              <span>Browse collections</span>
              <ArrowRight size={16} strokeWidth={2} />
            </motion.a>
            
            {/* Transparent button - About us with backdrop blur */}
            <motion.a
              href="./about"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 backdrop-blur-sm text-white px-6 py-3 rounded-full text-[15px] font-medium tracking-tight border border-white/30 hover:bg-white/10 transition-colors"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            >
              <span>About us</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;