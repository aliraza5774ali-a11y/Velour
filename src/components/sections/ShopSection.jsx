
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';

// ─── Product Data ─────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "Textured Knitted Shirt",
    price: 59.00,
    originalPrice: 79.00,
    category: "men",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/dfydRQ0hineaQjqYigxtJ3UUI.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/lvt1WlyrgirePb8z3BSlF9OY.jpg?width=600&height=900",
    href: "./shop/textured-knitted-shirt"
  },
  {
    id: 2,
    name: "Structured Trench Coat",
    price: 210.00,
    originalPrice: 280.00,
    category: "men",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/5KzsTe2EnPlNeHEEFMr7iGl8Q.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/eY6Dmvy1WrbgKmBxjcRhwuXCs.jpg?width=600&height=900",
    href: "./shop/structured-trench-coat"
  },
  {
    id: 3,
    name: "Heavyweight Oversized Hoodie",
    price: 85.00,
    originalPrice: 110.00,
    category: "men",
    badge: "Best seller",
    badgeType: "bestseller",
    image1: "https://framerusercontent.com/images/XHQtokxpBrRieMyXVFgUTB7KS0.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/GTy2Bbh36uTYPS8F34SC1dV1cI.jpg?width=600&height=900",
    href: "./shop/heavyweight-oversized-hoodie"
  },
  {
    id: 4,
    name: "Mini Denim Overalls",
    price: 45.00,
    originalPrice: 60.00,
    category: "children",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/cUK0QrnnYh9fZ9CgITBVrpOVqbc.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/XKBImpA6SUFBTNUtQrmzAkMmj0.jpg?width=600&height=900",
    href: "./shop/mini-denim-overalls"
  },
  {
    id: 5,
    name: "Riviera Collar Shirt",
    price: 45.00,
    originalPrice: 60.00,
    category: "men",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/GfaKKpFbbr7OaFyCvPWaUE9M.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/kanGnrYimBokWcnvmRshQIhToM.jpg?width=600&height=900",
    href: "./shop/riviera-collar-shirt"
  },
  {
    id: 6,
    name: "Patterned Knit Sweater",
    price: 45.00,
    originalPrice: 90.00,
    category: "women",
    badge: "Best seller",
    badgeType: "bestseller",
    image1: "https://framerusercontent.com/images/5n60PDud9wC2hKZ67RqkdLdEnOM.png?width=600&height=800",
    image2: "https://framerusercontent.com/images/Dh3OA7nlrSTKU7GkFh7IpzC704M.png?width=600&height=800",
    href: "./shop/patterned-knit-sweater"
  },
  {
    id: 7,
    name: "Stretch Jersey Tee",
    price: 65.00,
    originalPrice: 95.00,
    category: "men",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/srFy8sCNq5IkDCNHign0ZVGFg.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/m7vGnEDcM9ENme6wUOVRTjDCo.jpg?width=600&height=900",
    href: "./shop/stretch-jersey-tee"
  },
  {
    id: 8,
    name: "Urban Utility Cargo",
    price: 90.00,
    originalPrice: 120.00,
    category: "men",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/WOb9Yp9Wh2uVGLxsCjRDhswPSk.png?width=600&height=700",
    image2: "https://framerusercontent.com/images/5kuNHZXwFk1bRFFCgtwzxcvg.png?width=600&height=600",
    href: "./shop/urban-utility-cargo"
  },
  {
    id: 9,
    name: "Classic Boxy Tee",
    price: 35.00,
    originalPrice: 45.00,
    category: "men",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/7ubgMQu9djFMVIvDIXChqxrUQcQ.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/eZoLuRRyYkwjVZaofIyewyScswc.jpg?width=600&height=900",
    href: "./shop/classic-boxy-tee"
  },
  {
    id: 10,
    name: "Quilted Bomber Jacket",
    price: 145.00,
    originalPrice: 180.00,
    category: "women",
    badge: "Best seller",
    badgeType: "bestseller",
    image1: "https://framerusercontent.com/images/wtLmzE2wAi9yJrXcWCnR857MSwQ.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/UBz7Wqq5xr8G3Dd1Gqsc3otaozI.webp?width=600&height=900",
    href: "./shop/quilted-bomber-jacket"
  },
  {
    id: 11,
    name: "Pleated Smart Trousers",
    price: 76.00,
    originalPrice: 100.00,
    category: "men",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/IEfg9X5HmPz0q0vEgmXVpAGMTT8.png?width=600&height=900",
    image2: "https://framerusercontent.com/images/dw0YCuifIa91zywXckPrBHJmk.webp?width=600&height=900",
    href: "./shop/pleated-smart-trousers"
  },
  {
    id: 12,
    name: "French Terry Shorts",
    price: 40.00,
    originalPrice: 55.00,
    category: "men",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/nCWS7ZqkJVj2BcbIcUsLXJyqDw.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/7J7eSRwqb6hQlWc1WH1nwv01II.webp?width=600&height=900",
    href: "./shop/french-terry-shorts"
  },
  {
    id: 13,
    name: "Relaxed Tapered Chinos",
    price: 65.00,
    originalPrice: 80.00,
    category: "men",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/THn1NjXFwjPh3Ajy1FKR7oTjeg.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/LvEon9zPQUG7aIBRaGJKca677s.jpg?width=600&height=900",
    href: "./shop/relaxed-tapered-chinos"
  },
  {
    id: 14,
    name: "Hooded Puffer Vest",
    price: 45.00,
    originalPrice: 75.00,
    category: "women",
    badge: "Best seller",
    badgeType: "bestseller",
    image1: "https://framerusercontent.com/images/XlozFfsresg9IzMgSZFB3KFT1lg.png?width=600&height=700",
    image2: "https://framerusercontent.com/images/VelxipZlAypDaKEGR9UWVL51G0.png?width=600&height=700",
    href: "./shop/hooded-puffer-vest"
  },
  {
    id: 15,
    name: "V-Neck Satin Cami",
    price: 65.00,
    originalPrice: 90.00,
    category: "women",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/NMhqS5KLNF9CvhAGAMKgjg9vlRI.png?width=600&height=700",
    image2: "https://framerusercontent.com/images/Dtyqi5aiUjHF5XUXmjf8MMxG3l8.png?width=600&height=700",
    href: "./shop/v-neck-satin-cami"
  },
  {
    id: 16,
    name: "Vegan Leather Leggings",
    price: 75.00,
    originalPrice: 99.00,
    category: "women",
    badge: "Best seller",
    badgeType: "bestseller",
    image1: "https://framerusercontent.com/images/ycSkGEOzXXNIxBrt6AdcjgVnQgE.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/7zAqtP593wdouaqYoeCcOQ86zM.jpg?width=600&height=900",
    href: "./shop/vegan-leather-leggings"
  },
  {
    id: 17,
    name: "Ribbed Knit Midi",
    price: 95.00,
    originalPrice: 125.00,
    category: "women",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/k6NfKWjk6lwvBolOwhZnCJefQf8.png?width=600&height=600",
    image2: "https://framerusercontent.com/images/JEW217EDs5BciD7V70HzZsMMmo.jpg?width=600&height=900",
    href: "./shop/ribbed-knit-midi"
  },
  {
    id: 18,
    name: "Cropped Boxy Blazer",
    price: 130.00,
    originalPrice: 175.00,
    category: "women",
    badge: "Best seller",
    badgeType: "bestseller",
    image1: "https://framerusercontent.com/images/okk2lkiJuugsHxV1sOdrhb14.jpg?width=600&height=900",
    image2: "https://framerusercontent.com/images/Yg7heWlymsUl0XNuDnDMxv1ndQ.jpg?width=600&height=900",
    href: "./shop/cropped-boxy-blazer"
  },
  {
    id: 19,
    name: "High Waisted Palazzo",
    price: 85.00,
    originalPrice: 110.00,
    category: "women",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/FrA5bSsrmynLt6GrVugUXMlc.png?width=600&height=600",
    image2: "https://framerusercontent.com/images/wWTguaGHI6EENzduLYEvPq7xVs.png?width=600&height=800",
    href: "./shop/high-waisted-palazzo"
  },
  {
    id: 20,
    name: "Silk Slip Dress",
    price: 120.00,
    originalPrice: 160.00,
    category: "women",
    badge: "New",
    badgeType: "new",
    image1: "https://framerusercontent.com/images/PDtETHYXl4xYc9YmOm3BoCWo.png?width=600&height=600",
    image2: "https://framerusercontent.com/images/iOnE7MkZLh1IZqj9HZpECdgQXE.jpg?width=600&height=900",
    href: "./shop/silk-slip-dress"
  }
];

const tabs = [
  { id: "all", label: "All Products" },
  { id: "men", label: "Men's Wear" },
  { id: "women", label: "Women's Wear" },
  { id: "children", label: "Children's Wear" }
];

// ─── Components ───────────────────────────────────────────────

const Badge = ({ type, text }) => {
  const isNew = type === "new";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
        isNew
          ? "bg-white text-black"
          : "bg-black text-white"
      }`}
    >
      <Star size={12} fill="currentColor" />
      <span>{text}</span>
    </motion.div>
  );
};

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState(1);

  return (
    <motion.a
      href={product.href}
      className="group block w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] bg-[#ececea] rounded-xl overflow-hidden mb-3">
        {/* Image 1 (Default) */}
        <motion.img
          src={product.image1}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: activeImage === 1 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Image 2 (Hover) */}
        <motion.img
          src={product.image2}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: activeImage === 2 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge type={product.badgeType} text={product.badge} />
        </div>

        {/* Arrow Button (appears on hover) */}
        <motion.div
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.8,
            rotate: isHovered ? 0 : -45
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight size={14} className="text-black" />
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-black truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold text-black">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Thumbnail Swatches */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={(e) => { e.preventDefault(); setActiveImage(1); }}
            className={`w-8 h-8 rounded-full p-0.5 border transition-all duration-200 ${
              activeImage === 1 
                ? "border-black" 
                : "border-black/10 hover:border-black/30"
            }`}
          >
            <img
              src={product.image1}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); setActiveImage(2); }}
            className={`w-8 h-8 rounded-full p-0.5 border transition-all duration-200 ${
              activeImage === 2 
                ? "border-black" 
                : "border-black/10 hover:border-black/30"
            }`}
          >
            <img
              src={product.image2}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </motion.a>
  );
};

const TabPill = ({ tab, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${
        isActive ? "text-white" : "text-black hover:text-black/70"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-black rounded-full"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10">{tab.label}</span>
    </button>
  );
};

// ─── Main Shop Component ──────────────────────────────────────

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-[#ececea] rounded-full p-1 gap-1">
            {tabs.map((tab) => (
              <TabPill
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

