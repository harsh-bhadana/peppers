"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ 
             duration: 0.8, 
             repeat: Infinity, 
             repeatType: "reverse", 
             ease: "easeInOut" 
           }}
           className="relative flex items-center justify-center font-black"
        >
          <span className="text-6xl md:text-8xl text-white tracking-tighter uppercase">
            Pizz<span className="text-primary-red">A</span>
          </span>
        </motion.div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "circInOut" 
          }}
          className="h-[2px] bg-primary-red/50 w-full"
        />
        
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 animate-pulse">
          Establishing Alliance...
        </p>
      </div>
    </div>
  );
}
