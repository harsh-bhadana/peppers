"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface SocialIconWithPreviewProps {
  icon: React.ReactNode;
  previewImage: string;
  href: string;
  label: string;
  className?: string;
  position?: "top" | "bottom";
  brandColor?: string; // Tailwind class like "hover:text-[#1877F2]"
  glowColor?: string;  // Hex or rgba for the drop-shadow
}

export default function SocialIconWithPreview({ 
  icon, 
  previewImage, 
  href, 
  label, 
  className,
  position = "top",
  brandColor,
  glowColor
}: SocialIconWithPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          filter: isHovered && glowColor ? `drop-shadow(0 0 8px ${glowColor})` : 'none'
        }}
        className={`${className || "text-white/40 transition-all duration-300 block"} ${isHovered ? brandColor : ""}`}
      >
        {icon}
      </a>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ 
              opacity: 0, 
              y: position === "top" ? -10 : 10, 
              scale: 0.9 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1 
            }}
            exit={{ 
              opacity: 0, 
              y: position === "top" ? -10 : 10, 
              scale: 0.9 
            }}
            className={`absolute ${position === "top" ? "bottom-full mb-6" : "top-full mt-6"} left-1/2 -translate-x-1/2 z-[9999] pointer-events-none`}
          >
            <div className="relative w-56 aspect-[9/16] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-zinc-900">
              <Image
                src={previewImage}
                alt={`${label} Preview`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs font-black uppercase tracking-widest text-white mb-0.5">{label}</div>
                <div className="text-[10px] font-bold text-white/60">@pepperspizza</div>
              </div>
            </div>
            {/* Arrow */}
            <div className={`absolute ${position === "top" ? "top-full -mt-2.5" : "bottom-full -mb-2.5"} left-1/2 -translate-x-1/2 w-5 h-5 bg-zinc-900 border-white/20 rotate-45 ${
              position === "top" ? "border-r border-b" : "border-l border-t"
            }`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
