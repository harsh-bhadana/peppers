"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SocialIconWithPreview from "./SocialIconWithPreview";

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Stores", href: "/stores" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%"
    },
    open: {
      opacity: 1,
      x: 0,
    }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1
      }
    })
  };

  return (
    <header className="absolute top-0 z-50 w-full bg-transparent">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex-1">
          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/assets/shared/logo.png"
              alt="Peppers Logo"
              width={500}
              height={180}
              className="h-28 w-auto transition-all duration-500 group-hover:opacity-80 scale-125 origin-left -translate-y-1"
            />
          </Link>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-10 text-[10px] font-black tracking-[0.3em] uppercase">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`transition-all duration-500 relative group py-2 ${
                      isActive 
                        ? "text-primary-red drop-shadow-[0_0_8px_rgba(255,59,48,0.8)]" 
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span 
                      className={`absolute -bottom-1 left-0 h-[2px] bg-primary-red transition-all duration-500 ${
                        isActive ? "w-full opacity-100 shadow-[0_0_10px_#ff3b30]" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"
                      }`} 
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center z-[60]">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-primary-red transition-colors"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Actions & Social Media - Desktop */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-6">
          <Link href="/menu" className="relative group overflow-hidden px-6 py-2 border border-primary-red/50 hover:border-primary-red text-primary-red transition-all duration-300">
            <span className="relative z-10 text-[10px] font-black tracking-widest uppercase">Order Now</span>
            <div className="absolute inset-0 bg-primary-red/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
          <div className="w-px h-6 bg-white/10" />
          <SocialIconWithPreview 
            icon={<Instagram size={20} />} 
            previewImage="/assets/shared/ig_preview.png" 
            href="#" 
            label="Instagram"
            position="bottom"
            brandColor="hover:text-[#E4405F]"
            glowColor="rgba(228, 64, 95, 0.6)"
          />
          <SocialIconWithPreview 
            icon={<XIcon size={18} />} 
            previewImage="/assets/shared/tw_preview.png" 
            href="#" 
            label="X"
            position="bottom"
            brandColor="hover:text-white"
            glowColor="rgba(255, 255, 255, 0.6)"
          />
          <SocialIconWithPreview 
            icon={<Facebook size={20} />} 
            previewImage="/assets/shared/fb_preview.png" 
            href="#" 
            label="Facebook"
            position="bottom"
            brandColor="hover:text-[#1877F2]"
            glowColor="rgba(24, 119, 242, 0.6)"
          />
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
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col h-full justify-center px-10">
              <nav>
                <ul className="flex flex-col gap-8">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.li 
                        key={link.href}
                        custom={i}
                        variants={linkVariants}
                      >
                        <Link 
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`text-4xl font-black uppercase tracking-tighter transition-all ${
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <Link
                  href="/menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center py-4 bg-primary-red text-white text-sm font-black tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Order Now
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-20 flex gap-8 items-center"
              >
                <a href="#" className="text-white/60 hover:text-[#E4405F] transition-colors"><Instagram size={24} /></a>
                <a href="#" className="text-white/60 hover:text-white transition-colors"><XIcon size={22} /></a>
                <a href="#" className="text-white/60 hover:text-[#1877F2] transition-colors"><Facebook size={24} /></a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
