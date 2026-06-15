
import React, { useState } from "react";
import { motion } from "framer-motion";

// ─── Product Data ────────────────────────────────────────────────

const products = [
  {
    name: "Heavyweight Oversized Hoodie",
    price: "$85.00",
    originalPrice: "$110.00",
    href: "./shop/heavyweight-oversized-hoodie",
    image1: "https://framerusercontent.com/images/XHQtokxpBrRieMyXVFgUTB7KS0.jpg?width=800&height=1200",
    image2: "https://framerusercontent.com/images/GTy2Bbh36uTYPS8F34SC1dV1cI.jpg?width=800&height=1200",
  },
  {
    name: "Patterned Knit Sweater",
    price: "$45.00",
    originalPrice: "$90.00",
    href: "./shop/patterned-knit-sweater",
    image1: "https://framerusercontent.com/images/5n60PDud9wC2hKZ67RqkdLdEnOM.png?width=800&height=1200",
    image2: "https://framerusercontent.com/images/Dh3OA7nlrSTKU7GkFh7IpzC704M.png?width=800&height=1200",
  },
  {
    name: "Quilted Bomber Jacket",
    price: "$145.00",
    originalPrice: "$180.00",
    href: "./shop/quilted-bomber-jacket",
    image1: "https://framerusercontent.com/images/wtLmzE2wAi9yJrXcWCnR857MSwQ.jpg?width=800&height=1200",
    image2: "https://framerusercontent.com/images/UBz7Wqq5xr8G3Dd1Gqsc3otaozI.webp?width=800&height=1200",
  },
  {
    name: "Hooded Puffer Vest",
    price: "$45.00",
    originalPrice: "$75.00",
    href: "./shop/hooded-puffer-vest",
    image1: "https://framerusercontent.com/images/XlozFfsresg9IzMgSZFB3KFT1lg.png?width=800&height=1200",
    image2: "https://framerusercontent.com/images/VelxipZlAypDaKEGR9UWVL51G0.png?width=800&height=1200",
  },
  {
    name: "Vegan Leather Leggings",
    price: "$75.00",
    originalPrice: "$99.00",
    href: "./shop/vegan-leather-leggings",
    image1: "https://framerusercontent.com/images/ycSkGEOzXXNIxBrt6AdcjgVnQgE.jpg?width=800&height=1200",
    image2: "https://framerusercontent.com/images/7zAqtP593wdouaqYoeCcOQ86zM.jpg?width=800&height=1200",
  },
  {
    name: "Cropped Boxy Blazer",
    price: "$130.00",
    originalPrice: "$175.00",
    href: "./shop/cropped-boxy-blazer",
    image1: "https://framerusercontent.com/images/okk2lkiJuugsHxV1sOdrhb14.jpg?width=800&height=1200",
    image2: "https://framerusercontent.com/images/Yg7heWlymsUl0XNuDnDMxv1ndQ.jpg?width=800&height=1200",
  },
];

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

const ArrowIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7" />
    <path d="M7 7H17V17" />
  </svg>
);

// ─── Sub-Components ────────────────────────────────────────────

function BestSellerBadge({ text }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 shadow-sm">
      <SparkleIcon className="h-3.5 w-3.5 text-white" />
      <span className="text-xs font-medium tracking-tight text-white">
        {text}
      </span>
    </div>
  );
}

function ColorSwatch({
  image,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`h-[30px] w-[30px] overflow-hidden rounded-full p-[1px] transition-all duration-200 ${
        active
          ? "border border-black"
          : "border border-black/10 hover:border-black/30"
      }`}
    >
      <div className="h-full w-full overflow-hidden rounded-full bg-[#ececea]">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </button>
  );
}

function ProductCard({
  product,
  index,
}) {
  const [hovered, setHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(1);

  return (
    <motion.a
      href={product.href}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block w-full cursor-pointer"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-[#ececea]">
        {/* Image 1 */}
        <motion.img
          src={product.image1}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ opacity: activeImage === 1 ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />
        {/* Image 2 */}
        <motion.img
          src={product.image2}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ opacity: activeImage === 2 ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />

        {/* Best Seller Badge */}
        <div className="absolute left-3 top-3">
          <BestSellerBadge text="Best seller" />
        </div>

        {/* Arrow Button (hover) */}
        <motion.div
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.25 }}
        >
          <ArrowIcon className="h-4 w-4 text-black" />
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[15px] font-medium tracking-tight text-black">
            {product.name}
          </h3>
          <div className="mt-0.5 flex items-center gap-2">
            <span className="text-[15px] font-semibold text-black">
              {product.price}
            </span>
            <span className="text-[15px] text-black/40 line-through">
              {product.originalPrice}
            </span>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <ColorSwatch
            image={product.image1}
            active={activeImage === 1}
            onClick={() => setActiveImage(1)}
          />
          <ColorSwatch
            image={product.image2}
            active={activeImage === 2}
            onClick={() => setActiveImage(2)}
          />
        </div>
      </div>
    </motion.a>
  );
}

// ─── Main Section ────────────────────────────────────────────────

export default function BestSellersSection() {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            {/* Badge - Black bg with white icon */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black">
                <SparkleIcon className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-medium tracking-tight text-black">
                Best sellers
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              Our signature best selling pieces
            </h2>
          </div>

          {/* CTA Button */}
          <a
            href="./shop"
            className="group relative overflow-hidden rounded-full bg-black px-6 py-3 text-[15px] font-medium text-white transition-all hover:bg-black/90"
          >
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:-translate-x-1">
              See all collections
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-[15px] font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
              <span className="translate-x-4">See all collections</span>
            </span>
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}