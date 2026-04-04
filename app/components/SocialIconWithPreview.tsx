"use client";

import { useState } from "react";

interface SocialIconWithPreviewProps {
  icon: React.ReactNode;
  href: string;
  className?: string;
  brandColor?: string; // Tailwind class like "hover:text-[#1877F2]"
  glowColor?: string;  // Hex or rgba for the drop-shadow
}

export default function SocialIconWithPreview({ 
  icon, 
  href, 
  className,
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
    </div>
  );
}
