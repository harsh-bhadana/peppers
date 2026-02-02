"use client";

import { motion } from "framer-motion";

export default function StoreMap() {
  // A stylized abstract map using SVG
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-zinc-950 -z-10 pointer-events-none">
      <div className="absolute inset-0 opacity-20">
        {/* Abstract World Grid */}
        <div className="h-full w-full bg-[radial-gradient(#ff3b30_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="relative h-full w-full flex items-center justify-center opacity-40">
        <div className="text-center w-full h-full p-24">
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black uppercase tracking-[0.1em] text-white/[0.03] select-none pointer-events-none">
            Alliance
          </h2>
          
          {/* Mock Markers */}
          <div className="relative h-full w-full max-w-7xl mx-auto">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: i * 0.05, 
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: Math.random() * 5
                }}
                className="absolute"
                style={{
                  left: `${Math.random() * 90 + 5}%`,
                  top: `${Math.random() * 90 + 5}%`
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-red shadow-[0_0_15px_rgba(255,59,48,0.8)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
}
