import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import gsap from 'gsap';

// --- Data ---
const avatars = [
  "https://framerusercontent.com/images/xjBP37MgaLIT2MdXe0Kl896XmbM.png?width=80&height=80",
  "https://framerusercontent.com/images/V6kvRnK4tvwVKtnM3SDW7g4T9I.png?width=80&height=80",
  "https://framerusercontent.com/images/8Y1Vd6ysDPyE3ONSfgw125SCPw.png?width=80&height=80",
  "https://framerusercontent.com/images/qL5xOqMFC6yF35qSRHaAWJGZQKU.png?width=80&height=80",
  "https://framerusercontent.com/images/G8RDO1PQndTWIrwwR6NkSGjho.png?width=80&height=80"
];

const logos = [
  { src: "https://framerusercontent.com/images/4I0nUFgLGKqAqwEE0S5l6yrCXzQ.svg?width=132&height=35", width: 132, height: 35 },
  { src: "https://framerusercontent.com/images/K7N7aNahky7BhBGyGdXp7oSDc.svg?width=100&height=51", width: 100, height: 51 },
  { src: "https://framerusercontent.com/images/UsU6TSwGi1GYzawTJkBdu5BNeqg.svg?width=105&height=40", width: 105, height: 40 },
  { src: "https://framerusercontent.com/images/Qifbcz2UjIveHTCuImUZcqT9kZg.svg?width=140&height=30", width: 140, height: 30 },
  { src: "https://framerusercontent.com/images/6QEz8kJbwqWFzbNDcgcMwaBk7Jk.svg?width=176&height=40", width: 176, height: 40 }
];

// --- Animated Text Component (Character-by-character GSAP) ---
const AnimatedText = ({ 
  text, 
  className = "",
  startDelay = 0
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    gsap.fromTo(chars, 
      { opacity: 0, y: 10 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.4,
        stagger: 0.02,
        delay: startDelay,
        ease: "power2.out"
      }
    );
  }, [isInView, startDelay]);

  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span 
              key={`${wordIndex}-${charIndex}`}
              className="char inline-block"
              style={{ willChange: 'transform' }}
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

// --- Avatar Stack (5 overlapping circles with white border) ---
const AvatarStack = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center"
    >
      {avatars.map((src, index) => (
        <div
          key={index}
          className="relative w-10 h-10 rounded-full overflow-hidden border border-white"
          style={{
            marginLeft: index > 0 ? '-12px' : '0',
            zIndex: avatars.length - index
          }}
        >
          <img 
            src={src} 
            alt="" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  );
};

// --- Star Rating (5 orange stars) ---
const StarRating = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center gap-0.5"
    >
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          fill="#ff6a00" 
          stroke="#ff6a00" 
          strokeWidth={1.5}
        />
      ))}
    </motion.div>
  );
};

// --- Infinite Logo Ticker ---
const LogoTicker = () => {
  const tickerRef = useRef(null);

  // Duplicate logos enough times for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <div 
      className="relative w-full overflow-hidden py-4"
      style={{
        maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)',
        WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0) 100%)'
      }}
    >
      <motion.ul
        ref={tickerRef}
        className="flex items-center gap-[52px] will-change-transform"
        animate={{ x: [0, -50 * logos.length * 3] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
          }
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <li key={index} className="flex-shrink-0">
            <div 
              className="flex items-center justify-center"
              style={{ width: logo.width, height: Math.max(logo.height, 40) }}
            >
              <img 
                src={logo.src} 
                alt="" 
                className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

// --- Main Partners Section ---
const PartnersSection = () => {
  return (
    <section 
      id="partners" 
      className="w-full bg-white py-11 px-4 md:px-8 lg:px-16"
      style={{ paddingLeft: '22px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Rating Wrapper - Flex row with avatars, stars, rating, and trust text */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          {/* Images wrapper - Avatar stack */}
          <AvatarStack />
          
          {/* Text wrapper */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Rating wrapper */}
            <div className="flex items-center gap-3">
              <StarRating />
              <AnimatedText 
                text="4.9/5 rating"
                className="text-sm font-medium text-gray-500"
                startDelay={0.3}
              />
            </div>
            
            {/* Trust text */}
            <AnimatedText 
              text="Trusted by 1k+ businesses"
              className="text-sm font-medium text-black"
              startDelay={0.5}
            />
          </div>
        </div>
        
        {/* Desktop Ticker - Infinite scrolling logos */}
        <LogoTicker />
      </div>
    </section>
  );
};

export default PartnersSection;