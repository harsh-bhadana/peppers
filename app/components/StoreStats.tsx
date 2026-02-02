import { motion, useMotionValue, useTransform, useInView, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Extract number and suffix (like +, K, %, .)
  const numericMatch = value.match(/(\d+\.?\d*)/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const suffix = value.replace(/(\d+\.?\d*)/, "");
  const isFloat = value.includes(".");

  const count = useMotionValue(0);
  const displayValue = useTransform(count, (latest) => {
    if (isFloat) {
      return latest.toFixed(1) + suffix;
    }
    return Math.floor(latest).toLocaleString() + suffix;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: 5.5,
        ease: [0.16, 1, 0.3, 1], // Smooth premium ease
      });
      return controls.stop;
    }
  }, [isInView, count, numericValue]);

  return (
    <motion.div ref={ref} className={className}>
      {displayValue}
    </motion.div>
  );
}

const stats = [
  { label: "Alliance Units", value: "100+", sub: "Across NCR" },
  { label: "Our Customers", value: "80K+", sub: "Loyal & Growing" },
  { label: "Super Delivery", value: "30", unit: "MINS", sub: "Average Time" },
  { label: "Highest Rated", value: "4.9", sub: "Pizza Chain 2026" },
  { label: "Monthly Pizzas", value: "250K+", sub: "Freshly Baked" },
  { label: "Growth Rate", value: "25%", sub: "Year over Year" },
  { label: "Coverage", value: "12+", sub: "NCR Districts" },
  { label: "Active Riders", value: "1.2K+", sub: "Ready to Serve" },
];

export default function StoreStats() {
  return (
    <div className="grid grid-cols-2 gap-4 flex-1">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative flex flex-col justify-center p-6 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm transition-all hover:border-primary-red/30 group"
        >
          <div className="text-xs font-black uppercase tracking-widest text-primary-red mb-2">{stat.label}</div>
          <div className="flex items-baseline gap-1">
            <Counter 
              value={stat.value} 
              className="text-4xl font-black text-white tracking-tighter group-hover:text-primary-red transition-colors" 
            />
            {stat.unit && <span className="text-[10px] font-black text-white/40">{stat.unit}</span>}
          </div>
          <div className="mt-2 text-[10px] font-medium uppercase tracking-widest text-white/40">{stat.sub}</div>
          
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/10 rounded-tr-2xl group-hover:border-primary-red/50 transition-colors" />
        </motion.div>
      ))}
    </div>
  );
}
