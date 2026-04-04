"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Instagram, Facebook, Smartphone } from "lucide-react";
import SocialIconWithPreview from "./SocialIconWithPreview";
import AnimatedAppIcon from "./AnimatedAppIcon";

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
  </svg>
);

export default function Footer() {
  const [hoveredAppStore, setHoveredAppStore] = useState<string | null>(null);

  return (
    <footer className="w-full bg-black py-16 text-white/60">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-12 border-t border-white/5 pt-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group flex items-center gap-2">
              <Image
                src="/assets/shared/logo.png"
                alt="Peppers Logo"
                width={400}
                height={150}
                className="h-24 w-auto transition-all duration-500 scale-150 origin-left"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              Crafting premium pizza experiences with a brothers&apos; alliance. 
              Quality ingredients, bold flavors, refined artistry.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-white">Experience</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/" className="transition-colors hover:text-primary-red">Home</Link></li>
              <li><Link href="/stores" className="transition-colors hover:text-primary-red">Stores</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-primary-red">About Us</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-primary-red">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-white">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="#" className="transition-colors hover:text-primary-red">Privacy Policy</Link></li>
              <li><Link href="#" className="transition-colors hover:text-primary-red">Terms of Service</Link></li>
              <li><Link href="#" className="transition-colors hover:text-primary-red">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Socials & Apps */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-white">Join the Alliance</h4>
            <div className="flex gap-4">
              <SocialIconWithPreview 
                icon={<Instagram size={18} />} 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 transition-all duration-300"
                brandColor="text-[#E4405F] border-[#E4405F]/50"
                glowColor="rgba(228, 64, 95, 0.4)"
              />
              <SocialIconWithPreview 
                icon={<XIcon size={16} />} 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 transition-all duration-300"
                brandColor="text-white border-white/50"
                glowColor="rgba(255, 255, 255, 0.4)"
              />
              <SocialIconWithPreview 
                icon={<Facebook size={18} />} 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 transition-all duration-300"
                brandColor="text-[#1877F2] border-[#1877F2]/50"
                glowColor="rgba(24, 119, 242, 0.4)"
              />
            </div>

            {/* App Store Links */}
            <div className="flex flex-col gap-3 mt-2">
              <Link 
                href="#" 
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary-red/50 transition-all group overflow-hidden relative"
                onMouseEnter={() => setHoveredAppStore('apple')}
                onMouseLeave={() => setHoveredAppStore(null)}
              >
                <AnimatedAppIcon type="apple" isHovered={hoveredAppStore === 'apple'} />
                <div className="flex flex-col relative z-10">
                  <span className="text-[8px] uppercase font-bold text-white/40 group-hover:text-primary-red/80 transition-colors">Download on the</span>
                  <span className="text-[10px] uppercase font-black text-white group-hover:text-primary-red transition-colors">App Store</span>
                </div>
              </Link>
              <Link 
                href="#" 
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary-red/50 transition-all group overflow-hidden relative"
                onMouseEnter={() => setHoveredAppStore('android')}
                onMouseLeave={() => setHoveredAppStore(null)}
              >
                <AnimatedAppIcon type="android" isHovered={hoveredAppStore === 'android'} />
                <div className="flex flex-col relative z-10">
                  <span className="text-[8px] uppercase font-bold text-white/40 group-hover:text-primary-red/80 transition-colors">Get it on</span>
                  <span className="text-[10px] uppercase font-black text-white group-hover:text-primary-red transition-colors">Google Play</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-[0.2em] md:flex-row">
          <p>© 2026 pepper&apos;s Pizza - A Brothers Alliance. All Rights Reserved.</p>
          <p className="flex items-center gap-2">
            Designed for <span className="text-primary-red">Premium</span> Performance
          </p>
        </div>
      </div>
    </footer>
  );
}
