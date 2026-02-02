"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const team = [
  { name: "Vikram Singh", role: "Alliance Founder", specialty: "The Dough Architect", image: "/assets/about/team_member_1.png" },
  { name: "Zoya Khan", role: "Flavor Alchemist", specialty: "Sauce Secret Keeper", image: "/assets/about/team_member_2.png" },
  { name: "Rahul Malhotra", role: "Tech Commander", specialty: "Digital Operations", image: "/assets/about/team_member_3.png" }, // Swapped to match image order (man holding peel is likely tech/ops or just distinct) - actually let's stick to the generated logic approx. 3rd person is man holding peel.
  { name: "Aditya Verma", role: "Growth Sentinel", specialty: "Territory Expansion", image: "/assets/about/team_member_4.png" }
];

export default function AboutTeam() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <section className="py-32 px-6">
      <div className="container mx-auto">
        <div className="mb-24 text-center md:text-left">
          <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary-red mb-4">The Alliance</h2>
          <div className="h-px w-24 bg-primary-red mb-8 mx-auto md:mx-0" />
          <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">Brothers <span className="text-primary-red">Alliance</span></h3>
        </div>

        {/* Main Group Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[21/9] w-full mb-24 rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl shadow-primary-red/10"
        >
          {/* Base Image (Default) */}
          <Image
            src="/assets/about/brothers_alliance_team_v2.png"
            alt="The Brothers Alliance"
            fill
            className="object-cover z-0"
            priority
          />
          
          {/* Overlay Images for Each Member */}
          {team.map((member, i) => (
             <div 
               key={i}
               className={`absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none ${hoveredMember === i ? 'opacity-100' : 'opacity-0'}`}
             >
               <img
                 src={member.image}
                 alt={member.name}
                 className="object-cover w-full h-full"
               />
             </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 z-20" />
          
          <div className="absolute bottom-12 left-12 z-30">
            <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">Forged In Unity</h4>
            <p className="text-primary-red font-black uppercase tracking-widest text-xs mt-2">Established 2024 • Delhi NCR</p>
          </div>
        </motion.div>

        {/* Individual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredMember(i)}
              onMouseLeave={() => setHoveredMember(null)}
              className={`p-8 rounded-3xl border backdrop-blur-xl group hover:scale-105 transition-all duration-500 cursor-pointer ${
                hoveredMember === i 
                  ? "bg-zinc-900 border-primary-red shadow-2xl shadow-primary-red/20" 
                  : "bg-zinc-900/50 border-white/5 hover:border-primary-red/30"
              }`}
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-primary-red mb-4">{member.role}</div>
              <h5 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-primary-red transition-colors">{member.name}</h5>
              <div className={`h-px w-12 transition-all duration-500 mb-4 ${hoveredMember === i ? "bg-primary-red w-full" : "bg-white/10 group-hover:w-full"}`} />
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{member.specialty}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
