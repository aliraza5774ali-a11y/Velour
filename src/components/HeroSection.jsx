import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ─── Data ─────────────────────────────────────────────────────────────────────

const SLIDES = [
  { url: "https://framerusercontent.com/images/g813yVl0fq2gEobS7kOZx537SY.jpg", label: "Arctic"  },
  { url: "https://framerusercontent.com/images/Or4CSjqekPU2Ug6V0zSDTbgtg.jpg",  label: "Urban"   },
  { url: "https://framerusercontent.com/images/YI6OX1Ix0QFPJHufS272fscYaI.jpg",  label: "Latest"  },
  { url: "https://framerusercontent.com/images/HaLbFMQL3UBYnLDE5V1KjUjLbU.jpg",  label: "Premium" },
  { url: "https://framerusercontent.com/images/UqbagK5Zf6G91yyijIvdScOQDI.png",  label: "Casual"  },
];

const STATS = [
  { num: "12+",  label: "Collections"    },
  { num: "340",  label: "Pieces"         },
  { num: "Free", label: "Shipping $150+" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowIcon() {
  return (
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"
      viewBox="0 0 24 24"
      className="transition-transform duration-250 group-hover:translate-x-1">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

// ─── DotNav ───────────────────────────────────────────────────────────────────

function DotNav({ total, current, onGoTo }) {
  return (
    <div className="flex items-center gap-[10px]">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onGoTo(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="relative flex items-center justify-center p-1 cursor-pointer bg-transparent border-none"
        >
          <span
            className="block rounded-full transition-all duration-400"
            style={{
              width:  i === current ? '22px' : '5px',
              height: '5px',
              background: i === current ? '#c9a96e' : 'rgba(255,255,255,0.28)',
            }}
          />
        </button>
      ))}
    </div>
  );
}

// ─── ArchPreview ──────────────────────────────────────────────────────────────

function ArchPreview({ containerRef, slides, current, onGoTo }) {
  const positions = [
    { x: -260, y: 80,  scale: 0.65, zIndex: 5  },
    { x: -170, y: 35,  scale: 0.78, zIndex: 10 },
    { x: -85,  y: 0,   scale: 0.90, zIndex: 20 },
    { x:  0,   y: -16, scale: 1.12, zIndex: 100 },
    { x:  85,  y: 0,   scale: 0.90, zIndex: 20 },
    { x:  170, y: 35,  scale: 0.78, zIndex: 10 },
    { x:  260, y: 80,  scale: 0.65, zIndex: 5  },
  ];

  return (
    <div
      ref={containerRef}
      className="absolute bottom-[88px] left-1/2 -translate-x-1/2 z-10"
      style={{ width: '640px', height: '160px', perspective: '800px' }}
    >
      {slides.map((slide, i) => {
        const posIndex = (i - current + slides.length) % slides.length;
        if (posIndex >= positions.length) return null;
        const pos = positions[posIndex];
        const isActive = i === current;

        return (
          <div
            key={i}
            onClick={() => onGoTo(i)}
            className="absolute cursor-pointer"
            style={{
              left: '50%',
              top: '50%',
              width: '118px',
              height: '78px',
              marginLeft: '-59px',
              marginTop: '-39px',
              zIndex: isActive ? 100 : pos.zIndex,
              transform: `translateX(${pos.x}px) translateY(${pos.y}px) scale(${pos.scale})`,
              transition: 'transform 0.5s cubic-bezier(0.33,1,0.68,1), opacity 0.5s ease',
              opacity: isActive ? 1 : 0.85,
            }}
          >
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                width: '100%',
                height: '100%',
                boxShadow: isActive
                  ? '0 20px 60px rgba(0,0,0,0.75)'
                  : '0 8px 24px rgba(0,0,0,0.5)',
                border: isActive
                  ? '1.5px solid rgba(201,169,110,0.6)'
                  : '1px solid rgba(255,255,255,0.08)',
                background: '#111',
              }}
            >
              <img
                src={slide.url}
                alt={slide.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-[6px]">
                <span className={`text-[8px] font-semibold tracking-[0.1em] uppercase ${
                  isActive ? 'text-[#c9a96e]' : 'text-white/60'
                }`}>
                  {slide.label}
                </span>
              </div>
              {isActive && (
                <div
                  className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[14px] h-[2px] rounded-full"
                  style={{ background: '#c9a96e' }}
                />
              )}
              {!isActive && (
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(0,0,0,0.35)' }}
                >
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                    <path d="M0 0l10 6-10 6V0z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Root HeroSection ─────────────────────────────────────────────────────────

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const heroRef          = useRef(null);
  const contentRef       = useRef(null);
  const hl1Ref           = useRef(null);
  const hl2Ref           = useRef(null);
  const hl3Ref           = useRef(null);
  const bodyRef          = useRef(null);
  const btnsRef          = useRef(null);
  const tagRef           = useRef(null);
  const scanlineRef      = useRef(null);
  const archContainerRef = useRef(null);
  const containerRefs    = useRef([]);
  const imgRefs          = useRef([]);

  const timerRef    = useRef(null);
  const isAnimating = useRef(false);
  const currentRef  = useRef(0);

  const nextIndex = (n) => (n + 1) % SLIDES.length;

  // ── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(tagRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.3)
      .to(hl1Ref.current,  { y: '0%',   duration: 0.9, ease: 'expo.out' },          0.5)
      .to(hl2Ref.current,  { y: '0%',   duration: 0.9, ease: 'expo.out' },          0.65)
      .to(hl3Ref.current,  { y: '0%',   duration: 0.9, ease: 'expo.out' },          0.78)
      .to(bodyRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.9)
      .to(btnsRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.05);

    gsap.set(scanlineRef.current, { y: '-100%', opacity: 1 });
    gsap.to(scanlineRef.current, {
      y: '1200%', duration: 1.2, ease: 'power2.inOut', delay: 0.2,
      onComplete: () => gsap.set(scanlineRef.current, { opacity: 0 }),
    });

    startTimer();
    return () => clearTimeout(timerRef.current);
  }, []);

  // ── Slide transition — z-depth from back ──────────────────────────────────
  const goTo = (n) => {
    const cur = currentRef.current;
    if (n === cur || isAnimating.current) return;
    isAnimating.current = true;
    clearTimeout(timerRef.current);

    currentRef.current = n;
    setCurrent(n);

    gsap.set(scanlineRef.current, { y: '-100%', opacity: 0.7 });
    gsap.to(scanlineRef.current, { y: '1200%', duration: 0.9, ease: 'power2.inOut' });

    const prevEl = containerRefs.current[cur];
    const nextEl = containerRefs.current[n];

    gsap.set(nextEl, { opacity: 1, scale: 0.5, z: -1000, filter: 'blur(10px)' });
    gsap.set(prevEl, { scale: 1, z: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(prevEl, { opacity: 0, scale: 1, z: 0 });
        isAnimating.current = false;
        startTimer();
      },
    });

    tl.to(nextEl, {
        scale: 1.15, z: 0, filter: 'blur(0px)',
        duration: 1.3, ease: 'expo.out',
      }, 0)
      .to(nextEl, { scale: 1, duration: 0.6, ease: 'power2.out' }, 0.9)
      .to(prevEl, {
        opacity: 0, scale: 0.92, z: 200,
        duration: 1.1, ease: 'power2.inOut',
      }, 0);

    const textEls = [hl1Ref.current, hl2Ref.current, hl3Ref.current, bodyRef.current];
    gsap.to(textEls, { opacity: 0.3, duration: 0.12, stagger: 0.04, ease: 'power1.in' });
    gsap.to(textEls, { opacity: 1,   duration: 0.5,  delay: 0.25, stagger: 0.05, ease: 'power2.out' });
    gsap.fromTo(
      [hl1Ref.current, hl2Ref.current, hl3Ref.current],
      { y: 8 },
      { y: 0, duration: 0.6, delay: 0.18, stagger: 0.07, ease: 'power3.out' }
    );
  };

  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      goTo(nextIndex(currentRef.current));
    }, 5000);
  };

  // ── Mouse parallax ────────────────────────────────────────────────────────
  const onMouseMove = (e) => {
    const r = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    const activeImg = imgRefs.current[currentRef.current];
    if (activeImg) gsap.to(activeImg, { x: x * 18, y: y * 10, duration: 1.2, ease: 'power2.out' });
    gsap.to(contentRef.current, { x: x * -8, y: y * -5, duration: 1.4, ease: 'power2.out' });
  };

  const onMouseLeave = () => {
    const activeImg = imgRefs.current[currentRef.current];
    if (activeImg) gsap.to(activeImg, { x: 0, y: 0, duration: 1.5, ease: 'power3.out' });
    gsap.to(contentRef.current, { x: 0, y: 0, duration: 1.5, ease: 'power3.out' });
  };

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-[#0a0a0a]"
      style={{ paddingTop: '104px', perspective: '1200px' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Full-bleed slides ── */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { containerRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0, transform: 'scale(1.08)' }}
          >
            <img
              ref={(el) => { imgRefs.current[i] = el; }}
              src={slide.url}
              alt={slide.label}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(110deg,rgba(10,10,10,0.88) 0%,rgba(10,10,10,0.3) 60%,rgba(10,10,10,0.08) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(0deg,rgba(10,10,10,0.80) 0%,transparent 50%)'
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }} />
      </div>

      {/* ── Scanline ── */}
      {/* <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-px z-20 pointer-events-none"
        style={{
          top: '50%',
          background: 'linear-gradient(90deg,transparent 0%,rgba(201,169,110,0.6) 40%,rgba(201,169,110,0.9) 50%,rgba(201,169,110,0.6) 60%,transparent 100%)',
        }}
      /> */}

      {/* ── Left content ── */}
      <div ref={contentRef} className="relative z-10 w-full max-w-[680px] px-20">
        {/* <div
          ref={tagRef}
          className="flex items-center gap-[10px] mb-9"
          style={{ opacity: 0, transform: 'translateY(12px)' }}
        >
          <span className="w-7 h-px bg-[#c9a96e]" />
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#c9a96e] font-semibold">
            AW 2025 Collection
          </span>
          <span className="text-[10px] tracking-[0.1em] text-white/30 ml-auto">
            {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div> */}

        {/* <div className="mb-2">
          <div className="overflow-hidden">
            <span ref={hl1Ref}
              className="block font-['Playfair_Display'] text-[clamp(44px,5.5vw,76px)] font-bold leading-[1.02] text-white"
              style={{ transform: 'translateY(110%)' }}>
              Premium wear
            </span>
          </div>
          <div className="overflow-hidden">
            <span ref={hl2Ref}
              className="block font-['Playfair_Display'] text-[clamp(44px,5.5vw,76px)] font-bold leading-[1.02] text-white"
              style={{ transform: 'translateY(110%)' }}>
              for <em className="not-italic text-[#c9a96e]">modern</em>
            </span>
          </div>
          <div className="overflow-hidden">
            <span ref={hl3Ref}
              className="block font-['Playfair_Display'] text-[clamp(44px,5.5vw,76px)] font-bold leading-[1.02] tracking-[0.02em]"
              style={{ transform: 'translateY(110%)', color: 'rgba(255,255,255,0.18)' }}>
              living.
            </span>
          </div>
        </div> */}

        {/* <p
          ref={bodyRef}
          className="text-[14px] text-white/50 leading-[1.8] max-w-[360px] mb-10 font-normal"
          style={{ opacity: 0, transform: 'translateY(10px)' }}
        >
          Discover our new range of soft clothes made for your daily look — crafted from the finest natural fabrics.
        </p> */}

        {/* <div
          ref={btnsRef}
          className="flex items-center gap-3"
          style={{ opacity: 0, transform: 'translateY(10px)' }}
        >
          <button className="group h-[46px] px-7 bg-white text-[#0a0a0a] text-[11px] font-bold tracking-[0.1em] uppercase border-none rounded-full cursor-pointer inline-flex items-center gap-2 transition-all duration-250 hover:bg-[#f0ece6] hover:-translate-y-0.5">
            Explore collection <ArrowIcon />
          </button>
          <button className="h-[46px] px-7 bg-transparent text-white text-[11px] font-semibold tracking-[0.1em] uppercase border border-white/[0.18] rounded-full cursor-pointer transition-all duration-250 hover:border-white/50 hover:bg-white/[0.06]">
            Our story
          </button>
        </div> */}
      </div>

      {/* ── Slide counter top-right ── */}
      {/* <div className="absolute top-9 right-8 z-10 flex items-center gap-2 text-[11px] text-white/30 tracking-[0.1em]">
        <span className="text-white text-[14px] font-semibold">{String(current + 1).padStart(2, '0')}</span>
        <span className="w-6 h-px bg-white/20" />
        <span>{String(SLIDES.length).padStart(2, '0')}</span>
      </div> */}

      {/* ── Arch thumbnail preview ── */}
      <ArchPreview
        containerRef={archContainerRef}
        slides={SLIDES}
        current={current}
        onGoTo={goTo}
      />

      {/* ── Bottom bar: stats + dot nav ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-14 z-10 flex items-center px-20 border-t border-white/[0.06]"
        style={{ justifyContent: 'space-between' }}
      >
        <div className="flex items-center gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-8">
              <div className="flex items-baseline gap-[6px]">
                <span className="text-[18px] font-bold text-white tracking-[-0.01em]">{s.num}</span>
                <span className="text-[9px] tracking-[0.14em] uppercase text-white/30 font-medium">{s.label}</span>
              </div>
              {i < STATS.length - 1 && <span className="w-px h-5 bg-white/10" />}
            </div>
          ))}
        </div>

        <DotNav total={SLIDES.length} current={current} onGoTo={goTo} />
      </div>
    </div>
  );
}