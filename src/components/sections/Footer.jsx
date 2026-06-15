import { motion } from "framer-motion";
import {  Mail, Phone, MapPin, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Images extracted from Framer HTML ───────────────────────────────────────

const CAROUSEL_IMAGES = [
  { src: "https://framerusercontent.com/images/3BJsJKp6d3GMb73lMFLvun3bVxE.png", alt: "Woman in dark greenish dress" },
  { src: "https://framerusercontent.com/images/Q2qaxWvHcpcMDMRF6r6oA7jcK9Q.jpg", alt: "Kid sit on stole in stylish pose" },
  { src: "https://framerusercontent.com/images/jz6J8tN19rBotBJ08ib9LED2s8.png",   alt: "Woman in white red dress" },
  { src: "https://framerusercontent.com/images/U7CtuDK0AXUNTwGdENumrlmdyk.png",   alt: "Low angle shot of the man in white shirt" },
  { src: "https://framerusercontent.com/images/PhQ0ou5z6Mj6gzpcsLLi5rS6E0.png",  alt: "Woman having dark glasses in grey dress" },
  { src: "https://framerusercontent.com/images/ftObEL64RY81LvY92K11dTejqZ4.png",  alt: "Black jacket" },
  { src: "https://framerusercontent.com/images/IEB9QLOzy0qlnSdGfn5jQsBFFVo.png",  alt: "Boy in black hoodie" },
];

const QUICK_LINKS = ["Home", "About", "Blog", "Shop", "Reviews", "Styles"];
const QUICK_HREFS = ["/", "/about", "/blog", "/shop", "/#reviews", "/#reviews"];

// const SOCIAL_LINKS = [
//   { label: "Instagram", href: "https://instagram.com",  Icon: Instagram },
//   { label: "Dribble",  href: "https://dribble.com",   Icon: Dribble  },
//   { label: "Facebook",  href: "https://facebook.com",   Icon: Facebook  },
//   { label: "Twitter",   href: "https://x.com",          Icon: Twitter   },
//   { label: "Youtube",   href: "https://youtube.com",    Icon: Youtube   },
// ];

const CONTACT_ITEMS = [
  { href: "mailto:test@gmail.com",   Icon: Mail,    label: "test@gmail.com"    },
  { href: "tel:+0012345678890",      Icon: Phone,   label: "+001 234 567 890"  },
  { href: "https://maps.google.com", Icon: MapPin,  label: "London, England"   },
];

// ─── 3-D Carousel ─────────────────────────────────────────────────────────────

const CARD_W  = 200;   // px — width of each card face
const CARD_H  = 280;   // px — height of each card face
const RADIUS  = 340;   // px — how far cards orbit from center

function Carousel3D() {
  const [angle, setAngle] = useState(0);
  const rafRef   = useRef(null);
  const lastRef  = useRef(null);
  const dragging = useRef(false);
  const startX   = useRef(0);
  const startA   = useRef(0);
  const velRef   = useRef(0);
  const prevX    = useRef(0);

  // Auto-rotate when idle
  useEffect(() => {
    let idle = true;
    const tick = (ts) => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = ts - lastRef.current;
      lastRef.current = ts;
      if (idle && !dragging.current) {
        setAngle(a => a + dt * 0.018); // deg per ms
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onPointerDown = (e) => {
      idle = false;
      dragging.current = true;
      startX.current = e.clientX ?? e.touches?.[0]?.clientX;
      startA.current = angle;
      prevX.current  = startX.current;
      velRef.current = 0;
    };
    const onPointerMove = (e) => {
      if (!dragging.current) return;
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      velRef.current = x - prevX.current;
      prevX.current  = x;
      const delta = (x - startX.current) * 0.25;
      setAngle(startA.current - delta);
    };
    const onPointerUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      // Momentum flick
      const flick = velRef.current * -0.4;
      setAngle(a => a + flick);
      setTimeout(() => { idle = true; }, 1200);
    };

    window.addEventListener("mousedown",   onPointerDown);
    window.addEventListener("mousemove",   onPointerMove);
    window.addEventListener("mouseup",     onPointerUp);
    window.addEventListener("touchstart",  onPointerDown, { passive: true });
    window.addEventListener("touchmove",   onPointerMove, { passive: true });
    window.addEventListener("touchend",    onPointerUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousedown",  onPointerDown);
      window.removeEventListener("mousemove",  onPointerMove);
      window.removeEventListener("mouseup",    onPointerUp);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove",  onPointerMove);
      window.removeEventListener("touchend",   onPointerUp);
    };
  }, []);

  const count = CAROUSEL_IMAGES.length;
  const step  = 360 / count;

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: CARD_W, height: CARD_H, perspective: 900, cursor: "grab" }}
    >
      <div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {CAROUSEL_IMAGES.map((img, i) => {
          const deg = step * i + angle;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                width:     CARD_W,
                height:    CARD_H,
                left:      0,
                top:       0,
                transform: `rotateY(${deg}deg) translateZ(${RADIUS}px)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                transition: "none",
              }}
            >
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  borderRadius: 20,
                  boxShadow: "0 12px 48px rgba(0,0,0,0.45)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Community Section ─────────────────────────────────────────────────────────

function CommunitySection() {
  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-black/[0.06]"
        >
          <span className="flex items-center justify-center w-6 h-6 bg-black rounded-full">
            <Star size={11} color="white" fill="white" />
          </span>
          <span className="text-[13px] font-medium text-black tracking-tight">Stay connected</span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-xl"
        >
          <h2 className="text-[clamp(28px,4vw,48px)] font-bold tracking-tight leading-[1.1] text-black mb-4">
            See our community in modern silhouettes
          </h2>
          <p className="text-[15px] text-black/60 leading-relaxed">
            Connect with us on social media for a daily dose of fresh style, featuring exclusive looks from our community.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <a
            href="/shop"
            className="h-[46px] px-7 bg-black text-white text-[13px] font-medium tracking-tight rounded-full inline-flex items-center hover:bg-black/85 transition-colors"
          >
            See collections
          </a>
          <a
            href="/contact"
            className="h-[46px] px-7 bg-white text-black text-[13px] font-medium tracking-tight rounded-full border border-black/15 inline-flex items-center hover:bg-black/[0.04] transition-colors"
          >
            Contact us
          </a>
        </motion.div>

        {/* 3-D Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full overflow-hidden"
          style={{ height: 360 }}
        >
          <Carousel3D />
        </motion.div>

      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

// function Footer() {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email) return;
//     setSubmitted(true);
//     setEmail("");
//     setTimeout(() => setSubmitted(false), 3000);
//   };

//   return (
//     <footer className="w-full bg-black text-white">
//       <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">

//         {/* Newsletter */}
//         <div className="mb-10">
//           <h4 className="text-[18px] font-semibold tracking-tight mb-5">
//             Subscribe to our news later
//           </h4>
//           <form onSubmit={handleSubmit} className="flex gap-3 max-w-[480px]">
//             <input
//               type="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="flex-1 px-6 py-3 rounded-full bg-[#1f1f1f] text-white placeholder-white/40 text-[15px] outline-none border border-transparent focus:border-white/20 transition-colors"
//             />
//             <button
//               type="submit"
//               className="px-6 py-3 rounded-full bg-white text-black text-[15px] font-medium whitespace-nowrap hover:bg-white/90 transition-colors"
//             >
//               {submitted ? "Done ✓" : "Subscribe"}
//             </button>
//           </form>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-white/15 mb-10" />

//         {/* Main footer grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

//           {/* Brand column */}
//           <div className="flex flex-col gap-5">
//             <img
//               src="https://framerusercontent.com/images/k3mQgskzRmcKKsc3Urx85y2azU.svg"
//               alt="Wearix"
//               className="h-6 w-auto object-contain object-left"
//             />
//             <p className="text-[14px] text-white/70 leading-relaxed max-w-[260px]">
//               A sophisticated e-commerce template designed for modern and minimalist brands.
//             </p>
//             <a
//               href="/contact"
//               className="self-start h-[40px] px-5 rounded-full bg-white text-black text-[13px] font-medium inline-flex items-center hover:bg-white/90 transition-colors"
//             >
//               Contact Wearix
//             </a>
//           </div>

//           {/* Quick links */}
//           <div>
//             <p className="text-[14px] font-semibold mb-4">Quick Links</p>
//             <ul className="flex flex-col gap-[10px]">
//               {QUICK_LINKS.map((label, i) => (
//                 <li key={label}>
//                   <a
//                     href={QUICK_HREFS[i]}
//                     className="text-[14px] text-white/60 hover:text-white transition-colors"
//                   >
//                     {label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Follow + Contact */}
//           <div className="flex flex-col gap-8">
//             {/* Social */}
//             <div>
//               <p className="text-[14px] font-semibold mb-4">Follow us:</p>
//               <ul className="flex flex-col gap-[10px]">
//                 {SOCIAL_LINKS.map(({ label, href, Icon }) => (
//                   <li key={label}>
//                     <a
//                       href={href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[14px] text-white/60 hover:text-white transition-colors"
//                     >
//                       {label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Get in touch */}
//             <div>
//               <p className="text-[14px] font-semibold mb-4">Get in touch</p>
//               <ul className="flex flex-col gap-3">
//                 {CONTACT_ITEMS.map(({ href, Icon, label }) => (
//                   <li key={label}>
//                     <a
//                       href={href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center gap-3 group"
//                     >
//                       <span
//                         className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 group-hover:border-white/40 transition-colors"
//                         style={{ backdropFilter: "blur(10px)" }}
//                       >
//                         <Icon size={14} color="white" />
//                       </span>
//                       <span className="text-[13px] text-white/60 group-hover:text-white transition-colors">
//                         {label}
//                       </span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Bottom row */}
//         <div className="flex items-center justify-between pt-6 border-t border-white/10">
//           <img
//             src="https://framerusercontent.com/images/k3mQgskzRmcKKsc3Urx85y2azU.svg"
//             alt="Wearix"
//             className="h-5 w-auto opacity-60"
//           />
//           <p className="text-[12px] text-white/30">
//             © {new Date().getFullYear()} Wearix. All rights reserved.
//           </p>
//         </div>

//       </div>
//     </footer>
//   );
// }

// ─── Export ───────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <CommunitySection />
      {/* <Footer /> */}
    </>
  );
}
