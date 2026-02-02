"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Pizza } from "lucide-react";
import { useState, useEffect } from "react";

const BurgerIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Top Bun */}
    <path d="M4 11a8 8 0 1 1 16 0" />
    {/* Lettuce layer */}
    <path d="M2 11h20M2 14h20" />
    {/* Bottom Bun */}
    <path d="M4 17h16a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-1" />
    {/* Sesame seeds (optional/tiny dots) */}
    <path d="M9 6h.01M13 5h.01M15 7h.01" />
  </svg>
);

const FriesIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Fry strips */}
    <path d="M6 10V3M10 10V1M14 10V2M18 10V5" />
    {/* Container */}
    <path d="M5 10h14l-2 11H7L5 10z" />
    <path d="M5 14h14" />
  </svg>
);

const infoItems = [
  {
    icon: <Mail className="w-6 h-6" />,
    hoverIcon: <Pizza className="w-6 h-6" />,
    label: "Email Us",
    value: "alliance@peppers.pizza",
    sub: "Direct line to the kitchen",
    color: "text-primary-red"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    hoverIcon: <BurgerIcon className="w-6 h-6" />,
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Hotline for the hungry",
    color: "text-blue-500"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    hoverIcon: <FriesIcon className="w-6 h-6" />,
    label: "Main Office",
    value: "Chapraula, Ghaziabad",
    sub: "The Heart of the Kingdom",
    color: "text-green-500"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    hoverIcon: <Pizza className="w-6 h-6" />,
    label: "Office Hours",
    value: "10:00 AM - 07:00 PM",
    sub: "Monday to Saturday",
    color: "text-amber-500"
  }
];

export default function ContactInfo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileLoop, setIsMobileLoop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let interval: NodeJS.Timeout;
    if (window.innerWidth < 768) {
      interval = setInterval(() => {
        setIsMobileLoop(prev => !prev);
      }, 3000); // Toggle every 3 seconds
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {infoItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          transition={{ delay: i * 0.1 }}
          className="relative flex flex-col p-8 rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-xl transition-all hover:border-primary-red/30 group overflow-hidden cursor-pointer"
        >
          {/* Background Glow */}
          <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 blur-3xl transition-all group-hover:opacity-20 ${item.color.replace('text-', 'bg-')}`} />
          
          <div className={`${item.color} mb-6 relative h-6 w-6`}>
            <AnimatePresence mode="wait">
              {(hoveredIndex === i || (isMobile && isMobileLoop)) ? (
                <motion.div
                  key="alternate"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.hoverIcon}
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-2">{item.label}</div>
          <div className="text-xl font-black text-white tracking-tight mb-2 group-hover:text-primary-red transition-colors">
            {item.value}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">
            {item.sub}
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/10 rounded-tr-3xl group-hover:border-primary-red/50 transition-colors" />
        </motion.div>
      ))}
    </div>
  );
}
