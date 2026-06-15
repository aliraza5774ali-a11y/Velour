import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, Clock, Calendar, ArrowRight } from 'lucide-react';

// --- Types ---
// interface BlogPost {
//   id: number;
//   tag: string;
//   title: string;
//   description?: string;
//   image: string;
//   imageAlt: string;
//   readTime: string;
//   date: string;
//   href: string;
//   featured?: boolean;
// }

// --- Data (Exact from original Framer HTML) ---
const blogPosts= [
  {
    id: 1,
    tag: "Style Guide",
    title: "How to master the art of minimal street style",
    description: "Build a timeless, comfortable wardrobe with high-quality fabrics, muted tones, and effortless oversized fits.",
    image: "https://framerusercontent.com/images/UVxenUklVk5C5hRgP2zTRqEdMPk.jpg?width=600&height=900",
    imageAlt: "Low angle shot of the woman in black dress",
    readTime: "8 min read",
    date: "Jan 29, 2026",
    href: "./blog/how-to-master-the-art-of-minimal-street-style",
    featured: true
  },
  {
    id: 2,
    tag: "Fashion Tips",
    title: "Elevate everyday outfits using modern minimalist styling",
    image: "https://framerusercontent.com/images/UdKyQkva2vLQZ0vNuYpmKAdtzw.png?width=400&height=437",
    imageAlt: "Woman in grey blazer",
    readTime: "8 min read",
    date: "12/30/25",
    href: "./blog/elevate-everyday-outfits-using-modern-minimalist-styling"
  },
  {
    id: 3,
    tag: "Style Guide",
    title: "Build a capsule wardrobe that works year round",
    image: "https://framerusercontent.com/images/v4WTQ9WoN7RxeC3vNiZP9SvQcQ.png?width=600&height=452",
    imageAlt: "Color shirts hanging on the wardrobe",
    readTime: "5 min read",
    date: "11/22/25",
    href: "./blog/build-a-capsule-wardrobe-that-works-year-round"
  }
];

// --- Badge Component (Exact recreation: White pill + black circle + Crown icon) ---
const Badge = () => {
  return (
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
      <span className="text-sm font-medium text-black tracking-tight">Wearix Voice</span>
    </motion.div>
  );
};

// --- Section Header (Exact: Badge + Heading + "Read all blogs" button) ---
const SectionHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
      <div className="flex flex-col gap-4">
        <Badge />
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black tracking-tight leading-tight"
        >
          Elevating your daily<br className="hidden md:block" /> style journey
        </motion.h2>
      </div>

      {/* Read all blogs button - Black pill with arrow */}
      <motion.a
        href="./blog"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-[15px] font-medium tracking-tight hover:bg-gray-900 transition-colors self-start md:self-auto shrink-0"
      >
        <span>Read all blogs</span>
        <ArrowRight size={16} strokeWidth={2} />
      </motion.a>
    </div>
  );
};

// --- Meta Info Component (Clock + divider + Calendar - Exact from original) ---
const MetaInfo = ({ readTime, date, variant = "dark" }) => {
  const textColor = variant === "dark" ? "text-black" : "text-black/70";
  const iconColor = variant === "dark" ? "text-black" : "text-black/70";

  return (
    <div className="flex items-center gap-3">
      {/* Time */}
      <div className={`flex items-center gap-1.5 ${textColor}`}>
        <Clock size={14} className={iconColor} strokeWidth={2.15} />
        <span className="text-sm font-medium">{readTime}</span>
      </div>

      {/* Divider line */}
      <div className="w-px h-4 bg-black/30" />

      {/* Date */}
      <div className={`flex items-center gap-1.5 ${textColor}`}>
        <Calendar size={14} className={iconColor} strokeWidth={2.15} />
        <span className="text-sm font-medium">{date}</span>
      </div>
    </div>
  );
};

// --- Featured Blog Card (Large, left side - Exact styling) ---
const FeaturedBlogCard = ({ post, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={post.href}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block rounded-xl overflow-hidden cursor-pointer h-full"
      style={{
        backgroundColor: '#ececea',
        boxShadow: hovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
      }}
    >
      {/* Image Wrapper - Exact height and object-position */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img 
            src={post.image} 
            alt={post.imageAlt}
            className="w-full h-full object-cover"
            style={{ objectPosition: '47.6% 0%' }}
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Text Content - Exact bg color #ececea */}
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          {/* Tag - White pill, rounded-full (70px radius) */}
          <div className="inline-flex self-start bg-white rounded-full px-3 py-1.5">
            <span className="text-xs font-medium text-black">{post.tag}</span>
          </div>

          {/* Heading wrapper */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl font-semibold text-black leading-tight tracking-tight">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {post.description}
            </p>
          </div>
        </div>

        {/* Meta info - Dark variant (black text) */}
        <MetaInfo readTime={post.readTime} date={post.date} variant="dark" />
      </div>
    </motion.a>
  );
};

// --- Small Blog Card (Right side, stacked - Exact styling) ---
const SmallBlogCard = ({ post, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={post.href}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group block rounded-xl overflow-hidden cursor-pointer"
      style={{
        backgroundColor: '#ececea',
        boxShadow: hovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
      }}
    >
      {/* Image Wrapper */}
      <div className="relative h-[200px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <img 
            src={post.image} 
            alt={post.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          {/* Tag */}
          <div className="inline-flex self-start bg-white rounded-full px-3 py-1.5">
            <span className="text-xs font-medium text-black">{post.tag}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-black leading-snug tracking-tight">
            {post.title}
          </h3>
        </div>

        {/* Meta info - Light variant (70% black) */}
        <MetaInfo readTime={post.readTime} date={post.date} variant="light" />
      </div>
    </motion.a>
  );
};

// --- Main Blog Section (Exact container structure) ---
const BlogSection = () => {
  const featuredPost = blogPosts.find(p => p.featured);
  const smallPosts = blogPosts.filter(p => !p.featured);

  return (
    <section id="blog" className="w-full bg-white py-24 md:py-32 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <SectionHeader />

        {/* Blog items wrapper - 2 column grid: featured left, stacked right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured post - Left column, spans full height */}
          {featuredPost && (
            <div className="lg:row-span-2">
              <FeaturedBlogCard post={featuredPost} index={0} />
            </div>
          )}

          {/* Small posts - Right column, stacked vertically */}
          <div className="flex flex-col gap-6">
            {smallPosts.map((post, index) => (
              <SmallBlogCard key={post.id} post={post} index={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;