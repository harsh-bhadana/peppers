"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";

interface Stop {
  id: number;
  location: string;
  color: string;
}

const stops: Stop[] = [
  { id: 1, location: "Connaught Place", color: "#EF4444" },
  { id: 2, location: "Cyber Hub", color: "#3B82F6" },
  { id: 3, location: "Sector 18 Noida", color: "#10B981" },
  { id: 4, location: "Select Citywalk", color: "#F59E0B" },
  { id: 5, location: "Hauz Khas Village", color: "#8B5CF6" },
  { id: 6, location: "DLF Mall of India", color: "#EC4899" },
  { id: 7, location: "Vasant Kunj Hub", color: "#06B6D4" },
  { id: 8, location: "Greater Kailash", color: "#F97316" },
  { id: 9, location: "Aerocity Alliance", color: "#EF4444" },
  { id: 10, location: "Dwarka Unit", color: "#3B82F6" },
  { id: 11, location: "Rohini Express", color: "#10B981" },
  { id: 12, location: "Indirapuram", color: "#F59E0B" },
  { id: 13, location: "Faridabad Hub", color: "#8B5CF6" },
  { id: 14, location: "Janakpuri Town", color: "#EC4899" },
  { id: 15, location: "Pitampura", color: "#06B6D4" },
  { id: 16, location: "South Ex Alliance", color: "#F97316" },
  { id: 17, location: "Rajouri Garden", color: "#EF4444" },
  { id: 18, location: "Preet Vihar", color: "#3B82F6" },
  { id: 19, location: "Laxmi Nagar", color: "#10B981" },
  { id: 20, location: "Sohna Road", color: "#F59E0B" },
  { id: 21, location: "Golf Course Ext", color: "#8B5CF6" },
  { id: 22, location: "Noida Sector 62", color: "#EC4899" },
  { id: 23, location: "Noida Expressway", color: "#06B6D4" },
  { id: 24, location: "Ghitorni Hub", color: "#F97316" },
  { id: 25, location: "Chattarpur", color: "#EF4444" },
  { id: 26, location: "Mehrauli", color: "#3B82F6" },
  { id: 27, location: "Pacific Mall", color: "#10B981" },
  { id: 28, location: "MGF Metropolitan", color: "#F59E0B" },
  { id: 29, location: "Ambience Mall", color: "#8B5CF6" },
  { id: 30, location: "The Grand Final", color: "#EC4899" },
];

export default function JourneyRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      
      // If we're at the beginning and trying to scroll left, or at the end and trying to scroll right,
      // let the default behavior (page scroll) happen.
      const isAtStart = el.scrollLeft === 0;
      const isAtEnd = Math.abs(el.scrollWidth - el.clientWidth - el.scrollLeft) < 1;
      
      if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
        return;
      }

      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 2, // Multiply for faster scrolling
        behavior: "smooth"
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Unique sine wave parameters
  const getPos = (x: number) => {
    return 250 + Math.sin((x / 400) * Math.PI) * 120;
  };

  // Generate smooth path string
  const pathD = Array.from({ length: 301 }, (_, i) => {
    const x = i * 10;
    const y = getPos(x);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="relative w-full py-12">
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary-red">Our Journey</h2>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">The Winding <span className="text-primary-red">Path</span></h3>
        </div>
        <div className="text-right text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
          Scroll Horizontally To Explore
        </div>

      <div 
        ref={containerRef}
        className="w-full overflow-x-auto overflow-y-hidden no-scrollbar bg-black/40 backdrop-blur-xl border-y border-white/10"
      >
        <div className="relative w-[3000px] h-[500px]">
          {/* The Road SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 3000 500" fill="none" preserveAspectRatio="none">
            {/* Road Glow */}
            <path
              d={pathD}
              stroke="#ff3b30"
              strokeWidth="70"
              strokeLinecap="round"
              className="opacity-5 blur-2xl"
            />
            {/* Dark Asphalt road base */}
            <path
              d={pathD}
              stroke="#18181b"
              strokeWidth="60"
              strokeLinecap="round"
            />
            {/* Dashed line markers */}
            <path
              d={pathD}
              stroke="white"
              strokeWidth="2"
              strokeDasharray="10 15"
              strokeLinecap="round"
              className="opacity-20"
            />
          </svg>

          {/* Markers and Stops */}
          {stops.map((stop, index) => {
            const x = (index / (stops.length - 1)) * 3000;
            const y = getPos(x);
            const isTop = Math.cos((x / 400) * Math.PI) > 0; // Better alternation logic

            return (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05 }}
                className="absolute"
                style={{ left: `${x}px`, top: `${y}px` }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Vertical connector */}
                  <div 
                    className={`w-0.5 h-24 absolute ${isTop ? "bottom-full mb-0" : "top-full mt-0"}`}
                    style={{ 
                      backgroundColor: stop.color, 
                      opacity: 0.6,
                      height: '100px',
                      transform: isTop ? 'translateY(10px)' : 'translateY(-10px)'
                    }}
                  />
                  
                  {/* Circle marker */}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center border-4 bg-black text-white font-black text-xs relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-125 hover:z-20 cursor-help group"
                    style={{ borderColor: stop.color }}
                  >
                    {stop.id}
                  </div>

                  {/* Label */}
                  <div 
                    className={`absolute whitespace-nowrap px-4 py-3 rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-2xl transition-all ${
                      isTop ? "bottom-[140px]" : "top-[140px]"
                    }`}
                  >
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-red mb-1">Unit {stop.id}</div>
                    <div className="text-sm font-black uppercase tracking-tighter text-white">{stop.location}</div>
                    <div 
                      className="absolute left-1/2 -bottom-1 w-2 h-2 rotate-45 border-r border-b border-white/10 bg-black/90 -translate-x-1/2" 
                      style={{ display: isTop ? 'block' : 'none' }}
                    />
                    <div 
                      className="absolute left-1/2 -top-1 w-2 h-2 rotate-45 border-l border-t border-white/10 bg-black/90 -translate-x-1/2" 
                      style={{ display: isTop ? 'none' : 'block' }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 px-6">
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary-red shadow-[0_0_10px_#ff3b30]"
            style={{ scaleX, originX: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
