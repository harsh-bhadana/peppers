"use client";

import { motion } from "framer-motion";

interface Store {
  id: number;
  name: string;
  location: string;
  date: string;
}

const stores: Store[] = [
  { id: 1, name: "Peppers Flagship", location: "Connaught Place, Delhi", date: "Jan 2024" },
  { id: 2, name: "Cyber Hub Alliance", location: "DLF Phase 3, Gurgaon", date: "Feb 2024" },
  { id: 3, name: "Spice District", location: "Sector 18, Noida", date: "Mar 2024" },
  { id: 4, name: "Red Heat Saket", location: "Select Citywalk, Delhi", date: "Apr 2024" },
  { id: 5, name: "Peppers Express", location: "Golf Course Road, Gurgaon", date: "May 2024" },
  // ... generating 35 more Delhi NCR stores
  ...Array.from({ length: 35 }, (_, i) => ({
    id: i + 6,
    name: `Peppers Unit #${i + 6}`,
    location: ["Hauz Khas", "Vasant Kunj", "Greater Kailash", "Dwarka", "Rohini", "Indirapuram", "Faridabad"][i % 7],
    date: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i % 7] + " 2024",
  })),
];

export default function StoreTimeline() {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary-red/50 before:to-transparent">
      {stores.map((store, index) => (
        <motion.div
          key={store.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-primary-red/20 bg-black text-primary-red shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
            <span className="text-xs font-black">{store.id}</span>
          </div>
          
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 group-hover:border-primary-red/30 group-hover:bg-zinc-900">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <div className="font-black text-white uppercase tracking-tighter text-lg">{store.name}</div>
              <time className="font-mono text-xs text-primary-red bg-primary-red/10 px-2 py-1 rounded-full">{store.date}</time>
            </div>
            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">{store.location}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
