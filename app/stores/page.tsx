"use client";

import StoreMap from "../components/StoreMap";
import GoogleStoresMap from "../components/GoogleStoresMap";
import StoreTimeline from "../components/StoreTimeline";
import StoreStats, { Counter } from "../components/StoreStats";
import JourneyRoadmap from "../components/JourneyRoadmap";
import { motion } from "framer-motion";

export default function StoresPage() {
  return (
    <main className="relative min-h-screen bg-transparent pt-32 pb-24 px-6 md:px-12 text-white overflow-x-hidden">
      {/* Immersive Background */}
      <StoreMap />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-24 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 drop-shadow-2xl">
                The <span className="text-primary-red">Expansion</span>
              </h1>
              <p className="text-lg text-white/80 font-medium uppercase tracking-[0.3em]">
                Sequential Roadmap to Delhi NCR Dominance
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-right flex flex-col items-center md:items-end gap-2 text-white/60 bg-black/40 backdrop-blur-lg p-6 rounded-2xl border border-white/10"
            >
              <span className="text-sm tracking-widest uppercase">
                Est. January 2024
              </span>
              <div className="h-[1px] w-32 bg-primary-red" />
              <div className="flex items-baseline gap-2">
                <Counter 
                  value="40" 
                  className="text-4xl font-black text-white" 
                />
                <span className="text-sm font-medium text-white/40 tracking-widest">
                  STORES
                </span>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content Reveal Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        >
          {/* Territory Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32 items-stretch">
            <div className="flex flex-col gap-6">
              <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 h-full flex flex-col">
                <div className="mb-6 shrink-0">
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary-red mb-2">
                    Global Feed
                  </h2>
                  <div className="h-[1px] w-24 bg-primary-red" />
                </div>
                <div className="flex-1 min-h-0">
                  <GoogleStoresMap />
                </div>
              </div>
            </div>

            {/* Metrics Section */}
            <div className="flex flex-col gap-6">
              <div className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 h-full flex flex-col">
                <div className="mb-6 shrink-0">
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary-red mb-2">
                    Expansion Metrics
                  </h2>
                  <div className="h-[1px] w-24 bg-primary-red" />
                </div>
                <div className="flex-1 min-h-0">
                  <StoreStats />
                </div>
              </div>
            </div>
          </div>

          {/* Journey Roadmap Section */}
          <section className="mb-32">
            <JourneyRoadmap />
          </section>

          {/* Timeline Section */}
          <section className="bg-black/40 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10">
            <div className="mb-24 text-center">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary-red mb-2">
                Opening Sequence
              </h2>
              <div className="h-[1px] w-24 bg-primary-red mx-auto mb-6" />
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter shadow-black drop-shadow-2xl">
                Chronological Roadmap
              </h3>
            </div>

            <StoreTimeline />
          </section>
        </motion.div>
      </div>
    </main>
  );
}
