"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Misty Truffle",
    description: "Wild mushrooms, white truffle oil, mozzarella, and fresh thyme on our signature sourdough.",
    price: "$24",
    category: "Pizza",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: 2,
    name: "Peri-Peri Paneer",
    description: "Chunky paneer cubes, smoky peri-peri glaze, roasted peppers, and caramelized onions.",
    price: "$22",
    category: "Pizza",
    image: "/assets/menu/pizza_menu_3.png"
  },
  {
    id: 3,
    name: "Planet Alliance",
    description: "Thick plant-based patty, melting vegan cheese, avocado, and fresh sprouts on a charcoal bun.",
    price: "$26",
    category: "Burgers",
    image: "/assets/menu/burger_menu_3.png"
  },
  {
    id: 4,
    name: "Truffle Parm Fries",
    description: "Hand-cut fries tossed in truffle salt, aged parmesan, and fresh garden parsley.",
    price: "$12",
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  }
];

export default function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-xl transition-all duration-500 hover:border-primary-red/50 hover:shadow-2xl hover:shadow-primary-red/10"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
          {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-primary-red transition-colors">
            {item.name}
          </h3>
          <span className="text-xl font-black text-primary-red">
            {item.price}
          </span>
        </div>
        <p className="text-sm text-white/50 leading-relaxed uppercase tracking-wider font-medium mb-8">
          {item.description}
        </p>

        {/* Action Button */}
        <button className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all hover:bg-primary-red hover:text-white group-hover:shadow-[0_0_20px_rgba(255,59,48,0.3)]">
          Add To Alliance
        </button>
      </div>
    </motion.div>
  );
}

export { menuItems };
