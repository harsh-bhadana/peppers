"use client";

import { motion } from "framer-motion";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";
import OfficeMap from "../components/OfficeMap";

export default function ContactPage() {
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
              Establish Connection
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white"
            >
              Contact <span className="text-primary-red">Us</span>
            </motion.h1>
          </motion.div>
        </header>

        {/* Content Reveal Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        >
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-stretch">
            <div className="flex flex-col gap-12">
              <div>
                <p className="text-lg text-white/60 font-medium uppercase tracking-[0.2em] mb-12 max-w-xl">
                  Ready to join the alliance? Reach out for franchises, queries, or just to talk pizza.
                </p>
                <ContactInfo />
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>

          {/* Map Section */}
          <section>
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary-red mb-2">Our Territory</h2>
              <div className="h-[1px] w-24 bg-primary-red mb-6 mx-auto md:mx-0" />
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Main <span className="text-primary-red">Office</span> HQ</h3>
            </div>
            
            <OfficeMap />
          </section>

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
