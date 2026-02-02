"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuItemCard, { menuItems } from "../components/MenuItemCard";

const categories = ["All", "Pizza", "Burgers", "Sides"];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = menuItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <main className="min-h-screen bg-black pt-40 pb-32 px-6 md:px-12">
      <div className="container mx-auto">
        {/* Header Section */}
        <header className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xs font-black uppercase tracking-[0.5em] text-primary-red mb-4"
            >
              Crafted For The Alliance
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white"
            >
              The <span className="text-primary-red">Menu</span>
            </motion.h1>
          </motion.div>
        </header>

        {/* Content Reveal Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        >
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === category
                    ? "bg-primary-red border-primary-red text-white shadow-[0_0_20px_rgba(255,59,48,0.4)] scale-105"
                    : "bg-transparent border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Disclaimer */}
        <footer className="mt-32 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
            Ingredients Sourced From The Finest Brothers Across The Kingdom
          </p>
        </footer>
      </div>
    </main>
  );
}
