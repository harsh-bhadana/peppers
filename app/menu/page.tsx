"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuItemCard, { menuItems } from "../components/MenuItemCard";

const categories = ["All", "Pizza", "Burgers", "Pasta", "Sides", "Combos", "Drinks"];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = menuItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  // Group items by category and subcategory
  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category;
    const subcategory = item.subcategory || "Main";
    if (!acc[category]) acc[category] = {};
    if (!acc[category][subcategory]) acc[category][subcategory] = [];
    acc[category][subcategory].push(item);
    return acc;
  }, {} as Record<string, Record<string, typeof menuItems>>);

  const activeCategories = activeCategory === "All" ? categories.filter(c => c !== "All") : [activeCategory];

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
              Fueling The Alliance
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

        {/* Category Filter */}
        <div className="sticky top-24 z-50 flex flex-wrap items-center justify-center gap-4 mb-20 bg-black/40 backdrop-blur-xl py-6 rounded-3xl border border-white/5 px-6">
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

        {/* Menu Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-32"
        >
          {activeCategories.map((categoryName) => (
            groupedItems[categoryName] && (
              <section key={categoryName} className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-8 mb-12">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/10">
                    {categoryName}
                  </h2>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                {/* Subcategories */}
                <div className="space-y-24">
                  {Object.entries(groupedItems[categoryName]).map(([subName, items]) => (
                    <div key={subName}>
                      {subName !== "Main" && (
                        <div className="mb-8 flex items-center gap-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-red" />
                          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/40">
                            {subName}
                          </h3>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                          {items.map((item) => (
                            <MenuItemCard key={item.id} item={item} />
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          ))}
        </motion.div>

        {/* Disclaimer */}
        <footer className="mt-40 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 max-w-2xl mx-auto leading-relaxed">
            Ingredients sourced from the finest brothers across the kingdom. <br />
            Prices are subject to alliance tax and environmental preservation fees.
          </p>
        </footer>
      </div>
    </main>
  );
}
