"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pizza } from "lucide-react";

interface AnimatedCharacterProps {
  char: string;
  interval?: number;
  className?: string;
}

/**
 * AnimatedCharacter
 * A reusable component that toggles between a character and a pizza icon.
 * Designed for perfect alignment within large headings.
 */
export default function AnimatedCharacter({ 
  char, 
  interval = 4500, 
  className = "" 
}: AnimatedCharacterProps) {
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowIcon((prev) => !prev);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <span 
      className={`inline-grid align-top relative ${className}`}
      aria-hidden="true"
    >
      {/* Ghost Character: Keeps the space and baseline perfectly consistent */}
      <span className="col-start-1 row-start-1 opacity-0 pointer-events-none select-none invisible">
        {char}
      </span>
      
      <AnimatePresence mode="wait">
        {!showIcon ? (
          <motion.span
            key="text"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="col-start-1 row-start-1 flex items-center justify-center select-none"
          >
            {char}
          </motion.span>
        ) : (
          <motion.span
            key="icon"
            initial={{ opacity: 0, scale: 0.5, rotate: 225 }}
            animate={{ opacity: 1, scale: 1, rotate: 225 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 225 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="col-start-1 row-start-1 flex items-center justify-center text-primary-red select-none"
          >
            <Pizza 
              className="w-[0.85em] h-[0.85em] drop-shadow-[0_0_15px_rgba(255,59,48,0.5)] translate-y-[0.12em]" 
              strokeWidth={2.5} 
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
