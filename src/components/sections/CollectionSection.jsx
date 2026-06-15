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

const TagIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2H2v10l10 10 10-10L12 2z" />
    <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// ─── Sub-Components ────────────────────────────────────────────

function SectionBadge() {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
        <SparkleIcon className="h-3 w-3 text-white" />
      </div>
      <span className="text-xs font-medium tracking-tight text-black">
        Our Collections
      </span>
    </div>
  );
}

function CategoryBadge({ tag, title }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-[5px]"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
    >
      <div className="rounded-full bg-black px-3 py-1">
        <span className="text-xs font-medium tracking-tight text-white">
          {tag}
        </span>
      </div>
      <span className="text-xs font-medium text-black">{title}</span>
    </div>
  );
}

function AnimatedButton({
  href,
  children,
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black px-6 py-3 text-[15px] font-medium text-white transition-all duration-300 hover:bg-black/90"
      style={{
        letterSpacing: "-0.035em",
        lineHeight: "1.55em",
      }}
    >
      <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-x-1">
        {children}
      </span>
      <span className="absolute inset-0 flex items-center justify-center text-[15px] font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span className="translate-x-4">{children}</span>
      </span>
    </a>
  );
}

function ImageCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[14px]">
      {/* Images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          alt="Collection"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Dot Indicators */}
      <div
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 backdrop-blur-[5px]"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="h-2 w-2 rounded-full transition-all duration-200"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              opacity: i === activeIndex ? 1 : 0.6,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function CollectionCard({
  collection,
  index,
}) {
  const isImageLeft = collection.layout === "image-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10 ${
        isImageLeft ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Image Carousel */}
      <div className="w-full lg:w-1/2">
        <ImageCarousel images={collection.images} />
      </div>

      {/* Text Content */}
      <div className="flex w-full flex-col gap-4 lg:w-1/2">
        {/* Category Badge */}
        <CategoryBadge tag={collection.tag} title={collection.title} />

        {/* Heading & Description */}
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
            {collection.heading}
          </h3>
          <p className="text-base leading-relaxed text-black/70">
            {collection.description}
          </p>
        </div>

        {/* Pricing Tag */}
        <div className="flex items-center gap-3 rounded-xl bg-[#f5f5f5] p-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black">
            <TagIcon className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="text-xs text-black/60">Pricing start from:</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-black">
                {collection.priceFrom}
              </span>
              <span
                className="h-px w-4 bg-black/20"
                style={{ transform: "rotate(-45deg)" }}
              />
              <span className="text-sm font-medium text-black">
                {collection.priceTo}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div>
          <AnimatedButton href={collection.href}>All collections</AnimatedButton>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────

const collections = [
  {
    tag: "New",
    title: "Mens's wear",
    heading: "Premium modern collection for men",
    description:
      "Upgrade your daily look with our crafted pieces made from the finest fabrics for lasting comfort and timeless style.",
    priceFrom: "$45.00",
    priceTo: "$180.00",
    href: "./shop",
    layout: "image-left",
    images: [
      "https://framerusercontent.com/images/Uv4VM4rvpvfRnmB5e1YXaDJXQ.png?width=800&height=900",
      "https://framerusercontent.com/images/DKGh82SyvtbMKZ4jbKtsf3cq42c.png?width=800&height=900",
      "https://framerusercontent.com/images/XY7DXjHvJ7qxI2SulzDqvBiRbvw.png?width=800&height=900",
      "https://framerusercontent.com/images/6nknFZTNUtU9BA1FnqLy7dPrtmE.png?width=800&height=900",
      "https://framerusercontent.com/images/FFAlreqmltBbtn7iNy9lIQTMI.png?width=800&height=900",
    ],
  },
  {
    tag: "New",
    title: "Women's wear",
    heading: "Modern daily wear for women",
    description:
      "Elevate your style with our signature soft pieces designed to make every single day feel truly fresh and special.",
    priceFrom: "$35.00",
    priceTo: "$150.00",
    href: "./shop",
    layout: "text-left",
    images: [
      "https://framerusercontent.com/images/0g1kqNpbGUbeCR7eDqHjDWiv4s.png?width=800&height=900",
      "https://framerusercontent.com/images/4zsYQkMwe0g61iw8T3MZGzvhak.png?width=800&height=900",
      "https://framerusercontent.com/images/imHLb05OBp3rVa7DL12JicfwlE.png?width=800&height=900",
      "https://framerusercontent.com/images/liIxg0opfCsW1pRixs56aS3Aj4.jpeg?width=800&height=900",
      "https://framerusercontent.com/images/VW4VJmmdCt9WP6FoBGWnqDq6VS8.png?width=800&height=900",
    ],
  },
  {
    tag: "2026",
    title: "Children's wear",
    heading: "Modern easy styles for children",
    description:
      "Provide your children with the best soft touch gear made for play & long lasting wear throughout every single busy day.",
    priceFrom: "$25.00",
    priceTo: "$90.00",
    href: "./shop",
    layout: "image-left",
    images: [
      "https://framerusercontent.com/images/MLJe7H4csZkBunu5nEk84enCjM.png?width=800&height=900",
      "https://framerusercontent.com/images/E6tqcNcNIbkMCzBYvnABQBtwcM.jpeg?width=800&height=900",
      "https://framerusercontent.com/images/FNS875X1XnR0GJd4UpTh1Zms.png?width=800&height=900",
      "https://framerusercontent.com/images/Mpbd0iQ2COOMJArbHqRZMQoFRA.png?width=800&height=900",
      "https://framerusercontent.com/images/cWQhDyWBhK2dbOvMbEutN5jO0s.png?width=800&height=900",
    ],
  },
];

// ─── Main Section ────────────────────────────────────────────────

export default function CollectionsSection() {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionBadge />
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              Modern collections defined by simplicity
            </h2>
          </div>

          {/* CTA Button */}
          <a
            href="./shop"
            className="group relative overflow-hidden rounded-full bg-black px-6 py-3 text-[15px] font-medium text-white transition-all hover:bg-black/90"
          >
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-x-1">
              Shop all items
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-[15px] font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
              <span className="translate-x-4">Shop all items</span>
            </span>
          </a>
        </div>

        {/* Collections */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.title}
              collection={collection}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}