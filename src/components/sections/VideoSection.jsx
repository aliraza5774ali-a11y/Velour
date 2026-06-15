import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// ─── Sub-Components ────────────────────────────────────────────

function BrandBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-[5px]"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
    >
      <div className="rounded-full bg-white px-3 py-1">
        <span className="text-xs font-medium tracking-tight text-black">
          Wearix
        </span>
      </div>
      <span className="text-xs font-medium text-white/90">Since 2014</span>
    </div>
  );
}

function AnimatedButton({
  href,
  variant,
  children,
}) {
  const isWhite = variant === "white";

  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-[15px] font-medium tracking-tight transition-all duration-300"
      style={{
        backgroundColor: isWhite
          ? "rgb(255, 255, 255)"
          : "rgba(255, 255, 255, 0.15)",
        backdropFilter: isWhite ? "none" : "blur(5px)",
        color: isWhite ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
        letterSpacing: "-0.035em",
        lineHeight: "1.55em",
      }}
    >
      <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-x-1">
        {children}
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"
        style={{
          color: isWhite ? "rgb(0, 0, 0)" : "rgb(255, 255, 255)",
        }}
      >
        <span className="translate-x-4">{children}</span>
      </span>
    </a>
  );
}

// ─── Main Section ────────────────────────────────────────────────

export default function VideoSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video plays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Video - Full Width */}
      <video
        ref={videoRef}
        src="https://framerusercontent.com/assets/tZkQWQqHkaDjOS2aRu06UvSAiY.mp4"
        loop
        preload="auto"
        poster="https://framerusercontent.com/images/UK7WDlVvUzol044n909Euv7v8.png?width=1024&height=1024"
        playsInline
        autoPlay
        muted
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "50% 50%" }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      />

      {/* Content - Centered on top of video */}
      <div className="relative z-10 mx-auto flex min-h-[600px] max-w-[1200px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 md:min-h-[700px] md:px-8 lg:min-h-[800px] lg:px-12">
        {/* Brand Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <BrandBadge />
        </motion.div>

        {/* Text Wrapper */}
        <motion.div
          className="mt-6 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ textWrap: "balance" }}
          >
            Defining modern style
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            A decade ago, we set out to redefine the modern silhouette. Today,
            we merge urban utility with high-end aesthetics in a resilient,
            beautiful collection.
          </p>
        </motion.div>

        {/* Buttons Wrapper */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatedButton href="./about" variant="white">
            More about us
          </AnimatedButton>
          <AnimatedButton href="./contact" variant="transparent">
            Contact us
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}