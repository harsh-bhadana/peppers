"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { Pizza } from "lucide-react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    // Check if device is touch-capable or screen is small
    const checkTouch = () => {
      // Only disable cursor on small screens (mobile/tablet)
      // This is the most reliable way to match "mobile view"
      setIsTouchDevice(window.innerWidth < 768);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible || isTouchDevice) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: mouseX,
        y: mouseY,
        translateX: "-30%", // Offset slightly to align the tip which is rotated
        translateY: "-10%", // Tip is at the top, so bring the icon down
        pointerEvents: "none",
        zIndex: 9999,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary-red/40 blur-xl rounded-full scale-150" />
        
        {/* Pizza Icon */}
        <Pizza 
          className="text-primary-red w-8 h-8 drop-shadow-[0_0_10px_rgba(255,59,48,0.5)] rotate-[225deg]" 
          strokeWidth={2.5}
        />
      </div>
    </motion.div>
  );
}
