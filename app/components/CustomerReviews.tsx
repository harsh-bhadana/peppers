"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Aryan Kapoor",
    rating: 5,
    text: "The best pizza alliance in the kingdom. The crust is artistry, the toppings are a revolution. A must-visit for every true pizza lover.",
    role: "Pizza Connoisseur",
    date: "Jan 2026"
  },
  {
    name: "Ananya Sharma",
    rating: 5,
    text: "Fastest delivery in Noida! The pizza arrived piping hot and the quality was top-notch. Love the artisan vibes of the whole brand.",
    role: "Graphic Designer",
    date: "Dec 2025"
  },
  {
    name: "Ishaan Gupta",
    rating: 5,
    text: "That Peri Peri Chicken is a game changer. Peppers Pizza has definitely set a new standard for Delhi NCR. The UI/UX of their portal is fire too!",
    role: "Tech Lead",
    date: "Feb 2026"
  },
  {
    name: "Meera Reddy",
    rating: 5,
    text: "Authentic, premium, and absolutely delicious. The attention to detail in every slice is evident. Proud member of the Alliance!",
    role: "Artist",
    date: "Jan 2026"
  }
];

export default function CustomerReviews() {
  return (
    <section className="bg-black py-32 px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs font-black uppercase tracking-[0.5em] text-primary-red mb-4">Voices Of The Alliance</h2>
            <div className="h-px w-24 bg-primary-red mx-auto mb-8" />
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
              Customer <span className="text-primary-red">Reviews</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl flex flex-col h-full hover:border-primary-red/30 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-primary-red/10 transition-colors duration-500" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, starI) => (
                  <Star key={starI} className="w-3 h-3 fill-primary-red text-primary-red" />
                ))}
              </div>

              <p className="text-sm font-medium text-white/70 italic leading-relaxed mb-8 flex-grow">
                "{review.text}"
              </p>

              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="font-black uppercase tracking-tighter text-white text-lg">{review.name}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary-red">{review.role}</span>
                  <span className="text-[10px] font-bold text-white/20">{review.date}</span>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-white/10 rounded-tr-[2.5rem] group-hover:border-primary-red/50 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
