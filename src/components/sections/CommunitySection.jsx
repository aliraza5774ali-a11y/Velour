import React, { useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

// --- Data ---
const carouselImages = [
  {
    id: 1,
    src: "https://framerusercontent.com/images/3BJsJKp6d3GMb73lMFLvun3bVxE.png?width=600&height=665",
    alt: "Woman in dark greenish dress",
    armAngle: 0
  },
  {
    id: 2,
    src: "https://framerusercontent.com/images/Q2qaxWvHcpcMDMRF6r6oA7jcK9Q.jpg?width=460&height=439",
    alt: "Kid sit on stole in stylish pose",
    armAngle: 30
  },
  {
    id: 3,
    src: "https://framerusercontent.com/images/jz6J8tN19rBotBJ08ib9LED2s8.png?width=450&height=600",
    alt: "Woman in white red dress",
    armAngle: 60
  },
  {
    id: 4,
    src: "https://framerusercontent.com/images/U7CtuDK0AXUNTwGdENumrlmdyk.png?width=483&height=512",
    alt: "Low angle shot of the man in white shirt",
    armAngle: 90
  },
  {
    id: 5,
    src: "https://framerusercontent.com/images/PhQ0ou5z6Mj6gzpcsLLi5rS6E0.png?width=310&height=389",
    alt: "Woman having dark glasses in grey dress",
    armAngle: 120
  },
  {
    id: 6,
    src: "https://framerusercontent.com/images/ftObEL64RY81LvY92K11dTejqZ4.png?width=338&height=469",
    alt: "Black jacket",
    armAngle: 150
  },
  {
    id: 7,
    src: "https://framerusercontent.com/images/IEB9QLOzy0qlnSdGfn5jQsBFFVo.png?width=600&height=600",
    alt: "Boy in black hoodie",
    armAngle: 180
  }
];

// Cylinder radius — how far cards sit from center axis
const RADIUS = 520;
const IMAGE_WIDTH = 240;
const IMAGE_HEIGHT = 310;

// --- Badge ---
const Badge = () => (
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
    <span className="text-sm font-medium text-black tracking-tight">Stay connected</span>
  </motion.div>
);

// --- Single card on the cylinder ---
// Each card is placed at armAngle around Y, then the card itself does NOT rotate
// extra — it stays facing the viewer. This matches the screenshot exactly.
const CarouselCard = ({ image }) => (
  <div
    className="absolute top-1/2 left-1/2"
    style={{
      // Position on the cylinder: rotate around Y then push out by radius
      transform: `
        translateX(-50%)
        translateY(-50%)
        rotateY(${image.armAngle}deg)
        translateZ(${RADIUS}px)
        rotateY(${-image.armAngle}deg)
      `,
      transformStyle: 'preserve-3d',
      width: `${IMAGE_WIDTH}px`,
      height: `${IMAGE_HEIGHT}px`,
    }}
  >
    <div
      className="w-full h-full rounded-[18px] overflow-hidden"
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
        background: '#f0eeeb',
      }}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />
    </div>
  </div>
);

// --- 3D Carousel ---
const Carousel3D = () => {
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  const isDragging = useRef(false);
  const lastX = useRef(0);
  const currentRotation = useRef(-95.6);
  const velocity = useRef(0);
  const rafId = useRef(null);
  const autoTween = useRef(null);
  const rotSet = useRef(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    rotSet.current = gsap.quickSetter(el, 'rotateY', 'deg');

    gsap.set(el, {
      rotateY: currentRotation.current,
      transformPerspective: 900,
      transformStyle: 'preserve-3d',
    });

    // Slow, gentle auto-spin
    autoTween.current = gsap.to(el, {
      rotateY: '+=360',
      duration: 45,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      autoTween.current?.kill();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const syncRotation = () => {
    if (carouselRef.current)
      currentRotation.current = gsap.getProperty(carouselRef.current, 'rotateY');
  };

  const stopInertia = () => {
    if (rafId.current) { cancelAnimationFrame(rafId.current); rafId.current = null; }
  };

  const startInertia = () => {
    stopInertia();
    const FRICTION = 0.935;
    const STOP = 0.06;

    const loop = () => {
      if (Math.abs(velocity.current) < STOP) {
        velocity.current = 0;
        const snap = Math.round(currentRotation.current / 30) * 30;
        gsap.to(carouselRef.current, {
          rotateY: snap,
          duration: 0.7,
          ease: 'power3.out',
          onUpdate: () => {
            currentRotation.current = gsap.getProperty(carouselRef.current, 'rotateY');
          },
          onComplete: () => {
            currentRotation.current = snap;
            autoTween.current?.play();
          },
        });
        return;
      }
      velocity.current *= FRICTION;
      currentRotation.current += velocity.current;
      rotSet.current(currentRotation.current);
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
  };

  const onDragStart = useCallback((clientX) => {
    isDragging.current = true;
    lastX.current = clientX;
    velocity.current = 0;
    stopInertia();
    syncRotation();
    autoTween.current?.pause();
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  }, []);

  const onDragMove = useCallback((clientX) => {
    if (!isDragging.current) return;
    const delta = clientX - lastX.current;
    const rotDelta = delta * 0.28;
    velocity.current = rotDelta;
    currentRotation.current += rotDelta;
    rotSet.current(currentRotation.current);
    lastX.current = clientX;
  }, []);

  const onDragEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
    startInertia();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] md:h-[540px] cursor-grab select-none touch-none overflow-hidden"
      style={{ perspective: '900px' }}
      onPointerDown={(e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        containerRef.current?.setPointerCapture(e.pointerId);
        onDragStart(e.clientX);
      }}
      onPointerMove={(e) => { if (isDragging.current) onDragMove(e.clientX); }}
      onPointerUp={onDragEnd}
      onPointerCancel={onDragEnd}
    >
      <div
        ref={carouselRef}
        className="absolute inset-0 w-full h-full"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {carouselImages.map((image) => (
          <CarouselCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

// --- Main Section ---
const CommunitySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="community"
      ref={sectionRef}
      className="w-full bg-[#f5f4f2] py-20 md:py-28 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center gap-5 mb-10">
          <Badge />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black tracking-tight leading-tight max-w-3xl"
          >
            See our community in modern silhouettes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 text-lg max-w-xl leading-relaxed"
          >
            Connect with us on social media for a daily dose of fresh style, featuring exclusive looks from our community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href="./shop"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-[15px] font-medium tracking-tight hover:bg-gray-900 transition-colors"
            >
              <span>See collections</span>
              <ArrowRight size={16} strokeWidth={2} />
            </motion.a>

            <motion.a
              href="./contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-[15px] font-medium tracking-tight border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span>Contact us</span>
            </motion.a>
          </motion.div>
        </div>

        {/* 3D Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Carousel3D />
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;