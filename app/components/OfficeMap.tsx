"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function OfficeMap() {
  return (
    <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden border border-white/10 bg-zinc-900 group">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Google Maps Embed */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Peppers%20Pizza,Chhapraula,Ghaziabad,Uttar%20Pradesh&t=&z=14&ie=UTF8&iwloc=B&output=embed"
          className="border-0 w-full h-full grayscale invert opacity-50 transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100"
        ></iframe>
      </div>

      {/* Office Marker */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-10 pointer-events-none"
      >
        <div className="relative flex flex-col items-center">
          {/* Ripple Effect */}
          <div className="absolute inset-0 bg-primary-red/20 rounded-full animate-ping" />
          
          <div className="w-16 h-16 bg-black border-4 border-primary-red rounded-full flex items-center justify-center relative z-20 shadow-[0_0_30px_rgba(255,59,48,0.5)] transform hover:scale-110 transition-transform cursor-pointer">
            <MapPin className="w-8 h-8 text-primary-red" />
          </div>

          <div className="mt-4 px-6 py-3 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl whitespace-nowrap shadow-2xl">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-red mb-1">MAIN OFFICE HQ</div>
            <div className="text-sm font-black uppercase tracking-tighter text-white">PEPPERS PIZZA, CHAPRAULA</div>
          </div>
        </div>
      </motion.div>

      {/* Map UI Elements */}
      <div className="absolute bottom-8 right-8 flex flex-col gap-4 z-20">
        <div className="p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-white/40 font-black text-[10px] tracking-widest">
          28.6273° N, 77.4525° E
        </div>
      </div>
    </div>
  );
}
