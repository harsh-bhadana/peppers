"use client";

import Image from "next/image";
import FoodCarousel from "./components/FoodCarousel";
import CustomerReviews from "./components/CustomerReviews";
import { motion, AnimatePresence } from "framer-motion";
import { Pizza } from "lucide-react";
import { useState, useEffect } from "react";

import AnimatedCharacter from "./components/AnimatedCharacter";

export default function Home() {
  return (
    <>
      <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/assets/home/heroVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 backdrop-brightness-75" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl font-black tracking-tighter uppercase sm:text-8xl md:text-9xl text-white hover:text-primary-red transition-colors duration-500 cursor-default select-none"
          >
            pepper&apos;s Pizz<AnimatedCharacter char="A" />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-4 text-lg font-medium tracking-[0.3em] uppercase text-white/80 animate-pulse"
          >
            A Brothers Alliance
          </motion.p>
        </div>
      </main>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
      >
        {/* Featured Section */}
        <section className="bg-black py-24 px-6 md:py-32">
          <div className="container mx-auto">
            <div className="mb-16 flex flex-col items-start gap-4">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary-red">
                Featured Artistry
              </h2>
              <div className="h-px w-24 bg-primary-red" />
              <h3 className="text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
                Visual Identity
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[3, 4, 5, 7].map((num) => (
                <div
                  key={num}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-white/5 bg-zinc-900 transition-all duration-700 hover:border-primary-red/50 hover:shadow-2xl hover:shadow-primary-red/20"
                >
                  <Image
                    src={`/assets/home/Peppers-Pizza-Graphics-January-${num}.png`}
                    alt={`Peppers Pizza Graphic ${num}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-xs font-black uppercase tracking-widest text-primary-red">
                      Collection 2026
                    </span>
                    <p className="text-sm font-bold text-white">
                      Graphic Edition #{num}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FoodCarousel />
        <CustomerReviews />
      </motion.div>
    </>
  );
}
