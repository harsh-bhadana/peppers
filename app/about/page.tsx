"use client";

import { motion } from "framer-motion";
import AboutMotto from "../components/AboutMotto";
import AboutMilestones from "../components/AboutMilestones";
import AboutTeam from "../components/AboutTeam";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-32 px-6 md:px-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section (Menu Style) */}
        <header className="mb-24 text-center">
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
              Our Essence
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white"
            >
              About <span className="text-primary-red">Us</span>
            </motion.h1>
          </motion.div>
        </header>

        {/* Content segments with staggered entry */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        >
          {/* Motto Section */}
          <AboutMotto />

          {/* Milestones Section */}
          <AboutMilestones />

          {/* Team Section */}
          <AboutTeam />

          {/* Footer Accent */}
          <footer className="mt-32 text-center border-t border-white/5 pt-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
              Peppers Pizza Alliance Kingdom © 2026
            </p>
          </footer>
        </motion.div>
      </div>
    </main>
  );
}
