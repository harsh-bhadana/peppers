"use client";

import { motion } from "framer-motion";
import { Store, Rocket, Trophy, Globe } from "lucide-react";
import PizzaA from "./PizzaA";

const milestones = [
  {
    year: "2024",
    title: "The First Spark",
    desc: "First flagship store opened in Connaught Place, setting the tone for the Alliance.",
    icon: <Store className="w-6 h-6" />,
    coord: "JANUARY",
    color: "#ff3b30"
  },
  {
    year: "2024",
    title: "Digital Forge",
    desc: "Launch of the Peppers Pizza mobile platform, bringing the heat to your doorstep in 30 mins.",
    icon: <Rocket className="w-6 h-6" />,
    coord: "JUNE",
    color: "#3B82F6"
  },
  {
    year: "2025",
    title: "Golden Jubilee",
    desc: "Successfully crossed the 50-store milestone across Delhi NCR, becoming a household name.",
    icon: <Trophy className="w-6 h-6" />,
    coord: "DECEMBER",
    color: "#F59E0B"
  },
  {
    year: "2026",
    title: "Total Dominance",
    desc: "Expanding to 100+ units, solidifying our position as the kingdom's favorite pizza network.",
    icon: <Globe className="w-6 h-6" />,
    coord: "CURRENT",
    color: "#10B981"
  }
];

export default function AboutMilestones() {
  return (
    <section className="py-32 px-6 bg-transparent">
      <div className="container mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary-red mb-4">Our History</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">Chronicle Of <span className="text-primary-red">Growth</span></h3>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

          <div className="space-y-24">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Year Bubble */}
                <div className="flex-1 md:text-right w-full md:w-auto">
                  <div className={`inline-block px-6 py-2 rounded-full border border-white/10 bg-black text-xs font-black tracking-widest text-primary-red mb-4 shadow-[0_0_20px_rgba(255,59,48,0.1)] ${i % 2 === 1 ? 'md:mr-auto' : ''}`}>
                    {milestone.coord} {milestone.year}
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-black border-4 border-zinc-900 flex items-center justify-center text-white shadow-2xl group transition-transform hover:scale-110" style={{ borderColor: milestone.color }}>
                  <div className="absolute inset-0 bg-current opacity-5 rounded-full blur-xl animate-pulse" style={{ color: milestone.color }} />
                  {milestone.icon}
                </div>

                {/* Content Card */}
                <div className="flex-1 w-full md:w-auto">
                  <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-xl hover:border-primary-red/30 transition-all duration-500 group">
                    <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-primary-red transition-colors">{milestone.title}</h4>
                    <p className="text-white/60 text-sm font-medium leading-relaxed uppercase tracking-wider">{milestone.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
