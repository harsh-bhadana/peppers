"use client";

import { motion } from "framer-motion";

export default function AboutMotto() {
  return (
    <section className="py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Decorative Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-red/10 rounded-full blur-[120px] -z-10" />
        
        <h2 className="text-xs font-black uppercase tracking-[1em] text-primary-red mb-8">Our Credo</h2>
        
        <div className="relative">
          <h3 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-none">
            One Slice,<br />
            <span className="text-primary-red">One Alliance</span>
          </h3>
          
          {/* Animated underlines/accents */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-primary-red mt-8 mx-auto shadow-[0_0_20px_rgba(255,59,48,0.5)]"
          />
        </div>

        <p className="mt-12 text-lg md:text-2xl text-white/60 font-medium uppercase tracking-[0.3em] max-w-3xl mx-auto leading-relaxed">
          More than just pizza. It's a bond forged in heat, flavor, and the shared spirit of the Delhi NCR streets.
        </p>
      </motion.div>
    </section>
  );
}
