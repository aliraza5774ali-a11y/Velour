

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Icons ───────────────────────────────────────────────────────

const SparkleIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L14.09 8.26L20 9.27L15.5 13.14L16.82 19L12 16.18L7.18 19L8.5 13.14L4 9.27L9.91 8.26L12 2Z" />
  </svg>
);

const StarIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L14.09 8.26L20 9.27L15.5 13.14L16.82 19L12 16.18L7.18 19L8.5 13.14L4 9.27L9.91 8.26L12 2Z" />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────

const reviews = [
  {
    quote:
      'I appreciate the structured design of the new coats. The silhouette is professional and very clean. It provides a sophisticated look for my meetings. A true staple piece. Highly recommend this.',
    name: "Michael Ross",
    role: "Architecture Lead",
    avatar:
      "https://framerusercontent.com/images/lLhGu8DamwcMTpVyrwLb7fyLTU8.png?width=512&height=512",
    logo: "https://framerusercontent.com/images/DYCoyDe8REkqHEgecYVsQLUGfg.svg?width=260&height=40",
    rating: 4.9,
    reviewCount: "25k+",
    companyLogos: [
      "https://framerusercontent.com/images/JYIP0HLZZxRd5iwMgkfmFfUMAA.svg?width=260&height=40",
      "https://framerusercontent.com/images/jJeX9lBksyAiRkW6RsfnlDJ4D4.svg?width=259&height=39",
      "https://framerusercontent.com/images/f8csSGuYaUBfDwfLFOysGffSY.svg?width=260&height=40",
      "https://framerusercontent.com/images/HAfe1jEmy3pyzyc9lampV2qADY.svg?width=260&height=40",
      "https://framerusercontent.com/images/wRlrimJ4E2TwwPjr7c6qTp19d3c.svg?width=260&height=40",
    ],
  },
  {
    quote:
      "The quality of the fabric is exceptional. Every piece feels luxurious and the fit is perfect. I've received countless compliments at work. This brand truly understands modern professional wear.",
    name: "Sarah Chen",
    role: "Design Director",
    avatar:
      "https://framerusercontent.com/images/lLhGu8DamwcMTpVyrwLb7fyLTU8.png?width=512&height=512",
    logo: "https://framerusercontent.com/images/jJeX9lBksyAiRkW6RsfnlDJ4D4.svg?width=260&height=40",
    rating: 5.0,
    reviewCount: "25k+",
    companyLogos: [
      "https://framerusercontent.com/images/JYIP0HLZZxRd5iwMgkfmFfUMAA.svg?width=260&height=40",
      "https://framerusercontent.com/images/jJeX9lBksyAiRkW6RsfnlDJ4D4.svg?width=259&height=39",
      "https://framerusercontent.com/images/f8csSGuYaUBfDwfLFOysGffSY.svg?width=260&height=40",
      "https://framerusercontent.com/images/HAfe1jEmy3pyzyc9lampV2qADY.svg?width=260&height=40",
      "https://framerusercontent.com/images/wRlrimJ4E2TwwPjr7c6qTp19d3c.svg?width=260&height=40",
    ],
  },
  {
    quote:
      "I've been shopping here for years and the consistency in quality never disappoints. The attention to detail in every stitch shows their commitment to excellence. Worth every penny.",
    name: "James Wilson",
    role: "Creative Lead",
    avatar:
      "https://framerusercontent.com/images/lLhGu8DamwcMTpVyrwLb7fyLTU8.png?width=512&height=512",
    logo: "https://framerusercontent.com/images/f8csSGuYaUBfDwfLFOysGffSY.svg?width=260&height=40",
    rating: 4.8,
    reviewCount: "25k+",
    companyLogos: [
      "https://framerusercontent.com/images/JYIP0HLZZxRd5iwMgkfmFfUMAA.svg?width=260&height=40",
      "https://framerusercontent.com/images/jJeX9lBksyAiRkW6RsfnlDJ4D4.svg?width=259&height=39",
      "https://framerusercontent.com/images/f8csSGuYaUBfDwfLFOysGffSY.svg?width=260&height=40",
      "https://framerusercontent.com/images/HAfe1jEmy3pyzyc9lampV2qADY.svg?width=260&height=40",
      "https://framerusercontent.com/images/wRlrimJ4E2TwwPjr7c6qTp19d3c.svg?width=260&height=40",
    ],
  },
];

// ─── Sub-Components ────────────────────────────────────────────

function SectionBadge() {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
        <SparkleIcon className="h-3 w-3 text-white" />
      </div>
      <span className="text-xs font-medium tracking-tight text-black">
        Customer reviews
      </span>
    </div>
  );
}

function TestimonialCard({
  review,
  isActive,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      transition={{ duration: 0.4 }}
      className="w-full rounded-xl bg-white p-6 sm:p-8"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo */}
      <div className="mb-6 h-8 w-32">
        <img
          src={review.logo}
          alt="Company logo"
          className="h-full w-full object-contain object-left"
        />
      </div>

      {/* Quote */}
      <p className="mb-8 text-base leading-relaxed text-black/80 sm:text-lg">
        {review.quote}
      </p>

      {/* Profile Info */}
      <div className="mb-8 flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full">
          <img
            src={review.avatar}
            alt={review.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-black">{review.name}</p>
          <p className="text-xs text-black/60">{review.role}</p>
        </div>
      </div>

      {/* Company Logos */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {review.companyLogos.map((logo, i) => (
          <div
            key={i}
            className={`flex h-10 items-center justify-center rounded-lg px-3 ${
              i === review.companyLogos.length - 1
                ? "bg-black"
                : "bg-[#ececea]"
            }`}
          >
            <img
              src={logo}
              alt=""
              className="h-4 w-auto object-contain"
              style={{
                filter: i === review.companyLogos.length - 1 ? "invert(1)" : "none",
              }}
            />
          </div>
        ))}
      </div>

      {/* Rating */}
      <div className="inline-flex items-center gap-2 rounded-full bg-[#f8f8f8] px-4 py-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className="h-4 w-4"
              style={{ color: "rgb(255, 106, 0)" }}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-black">
          {review.rating}/5 from {review.reviewCount} reviews
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Section ────────────────────────────────────────────────

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="reviews" className="w-full bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <motion.div
          className="mb-10 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionBadge />
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            The voice of quality
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-black/70">
            Experience the difference through the words of customers who value
            premium fabrics and timeless design.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={activeIndex}
              review={reviews[activeIndex]}
              isActive={true}
            />
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? "24px" : "8px",
                  backgroundColor:
                    i === activeIndex ? "rgb(0, 0, 0)" : "rgba(0, 0, 0, 0.2)",
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}