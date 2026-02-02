"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="bg-black/40 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-white/10 h-full">
      <div className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary-red mb-2">Query Form</h2>
        <div className="h-[1px] w-24 bg-primary-red mb-6" />
        <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Send A <span className="text-primary-red">Message</span></h3>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Full Name</label>
            <input 
              type="text" 
              placeholder="YOUR NAME"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-primary-red/50 transition-all font-black uppercase text-xs tracking-widest"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Email Address</label>
            <input 
              type="email" 
              placeholder="EMAIL@EXAMPLE.COM"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-primary-red/50 transition-all font-black uppercase text-xs tracking-widest"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Your Query</label>
          <textarea 
            rows={5}
            placeholder="TELL US WHAT'S ON YOUR MIND..."
            className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-6 py-6 text-white placeholder:text-white/10 focus:outline-none focus:border-primary-red/50 transition-all font-black uppercase text-xs tracking-widest resize-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary-red text-white font-black uppercase tracking-[0.3em] text-xs py-6 rounded-2xl hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(255,59,48,0.3)] group"
        >
          Dispatch Message
          <Send className="w-4 h-4 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </motion.button>
      </form>
    </div>
  );
}
