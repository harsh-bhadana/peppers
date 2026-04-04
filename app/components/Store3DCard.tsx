"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MapPin, Store as StoreIcon, ArrowRight } from "lucide-react";
import React, { useRef } from "react";

interface Store {
  id: number;
  name: string;
  location: string;
  date: string;
}

export default function Store3DCard({ store, index }: { store: Store; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, z: -100, rotateX: 20 }}
      whileInView={{ opacity: 1, z: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{ perspective: "1000px" }}
      className="group"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-64 w-full rounded-2xl border border-white/10 bg-zinc-900/40 p-8 backdrop-blur-xl transition-colors duration-500 hover:border-primary-red/50 hover:bg-zinc-900/60"
      >
        <div style={{ transform: "translateZ(50px)" }} className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-primary-red/10 border border-primary-red/20 text-primary-red">
                <StoreIcon size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                Unit #{store.id.toString().padStart(2, "0")}
              </span>
            </div>
            
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-primary-red transition-colors duration-300">
              {store.name}
            </h3>
            
            <div className="flex items-center gap-2 mt-2 text-white/50">
              <MapPin size={14} className="text-primary-red" />
              <span className="text-xs font-medium uppercase tracking-widest">{store.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Established</span>
              <span className="text-xs font-bold text-white uppercase">{store.date}</span>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-red group-hover:text-white transition-colors duration-300">
              Details <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-red/0 via-primary-red/0 to-primary-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
