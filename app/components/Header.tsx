"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Menu, X, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import SocialIconWithPreview from "./SocialIconWithPreview";
import { useCart } from "../context/CartContext";

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const { itemCount, setIsCartOpen } = useCart();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Stores", href: "/stores" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const headerVariants = {
    top: { 
      height: "96px", 
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderColor: "rgba(255, 255, 255, 0)"
    },
    scrolled: { 
      height: "72px", 
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      borderColor: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)"
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 1.1,
      rotateX: -10,
      y: 20
    },
    open: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        ease: [0.16, 1, 0.3, 1] as any
      }
    }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.header 
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={headerVariants}
      className="fixed top-0 z-50 w-full transition-colors duration-500 border-b flex items-center"
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex-1">
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              animate={{ scale: isScrolled ? 0.85 : 1 }}
              className="origin-left transition-all duration-500"
            >
              <Image
                src="/assets/shared/logo.png"
                alt="Peppers Logo"
                width={500}
                height={180}
                className="h-24 w-auto transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-125 origin-left"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden flex-1 justify-center md:flex relative">
          <ul className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredLink === link.href;

              return (
                <li 
                  key={link.href} 
                  className="relative px-4 py-2"
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link 
                    href={link.href} 
                    className={`relative z-10 transition-colors duration-500 ${
                      isActive ? "text-primary-red" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>

                  {/* Sliding Pill Indicator */}
                  <AnimatePresence>
                    {(isHovered || (isActive && !hoveredLink)) && (
                      <motion.div
                        layoutId="nav-pill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                        className={`absolute inset-0 z-0 rounded-full ${
                          isActive && !hoveredLink ? "bg-primary-red/10 border border-primary-red/20 shadow-[0_0_15px_rgba(255,59,48,0.1)]" : "bg-white/5 border border-white/5"
                        }`}
                      />
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions & Social Media - Desktop */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-6">
          <Link href="/menu" className="relative group overflow-hidden px-6 py-2 border border-primary-red/50 hover:border-primary-red text-primary-red transition-all duration-300">
            <span className="relative z-10 text-[10px] font-black tracking-widest uppercase">Order Now</span>
            <div className="absolute inset-0 bg-primary-red/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>

          {/* Cart Icon with Pulse */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative group p-2 text-white/60 hover:text-primary-red transition-colors"
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-primary-red text-white text-[8px] font-black flex items-center justify-center rounded-full shadow-[0_0_10px_#ff3b30]"
              >
                {itemCount}
              </motion.span>
            )}
          </button>

          <div className="w-px h-6 bg-white/10 mx-2" />

          <div className="flex items-center gap-4">
            <SocialIconWithPreview 
              icon={<Instagram size={18} />} 
              previewImage="/assets/shared/ig_preview.png" 
              href="#" 
              label="Instagram"
              position="bottom"
              brandColor="hover:text-[#E4405F]"
              glowColor="rgba(228, 64, 95, 0.6)"
            />
            <SocialIconWithPreview 
              icon={<XIcon size={16} />} 
              previewImage="/assets/shared/tw_preview.png" 
              href="#" 
              label="X"
              position="bottom"
              brandColor="hover:text-white"
              glowColor="rgba(255, 255, 255, 0.6)"
            />
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center z-[60] gap-4">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white/60"
          >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-primary-red text-white text-[8px] font-black flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{ perspective: "1000px" }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col h-full justify-center px-10">
              <nav>
                <ul className="flex flex-col gap-6">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li 
                        key={link.href}
                        variants={linkVariants}
                      >
                        <Link 
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`text-5xl font-black uppercase tracking-tighter transition-all ${
                            isActive ? "text-primary-red" : "text-white hover:text-primary-red"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                variants={linkVariants}
                className="mt-16"
              >
                <Link
                  href="/menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center py-5 bg-primary-red text-white text-sm font-black tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-500 rounded-xl"
                >
                  Start Your Order
                </Link>
              </motion.div>

              <motion.div 
                variants={linkVariants}
                className="mt-16 flex gap-10 items-center justify-center"
              >
                <a href="#" className="text-white/40 hover:text-[#E4405F] transition-colors"><Instagram size={28} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><XIcon size={24} /></a>
                <a href="#" className="text-white/40 hover:text-[#1877F2] transition-colors"><Facebook size={28} /></a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
