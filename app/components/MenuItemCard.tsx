"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import CustomizationModal from "./CustomizationModal";

export interface MenuItem {
  id: string; // Changed to string for flexibility
  name: string;
  description?: string;
  prices: {
    small?: number;
    medium?: number;
    large?: number;
    default?: number;
  };
  category: string;
  subcategory?: string;
  image: string;
  isCustomizable?: boolean;
}

export const menuItems: MenuItem[] = [
  // --- Veg Pizza: Simply Veg ---
  {
    id: "p1",
    name: "Cheese Pizza",
    prices: { small: 105, medium: 219, large: 352 },
    category: "Pizza",
    subcategory: "Simply Veg",
    image: "/assets/menu/pizza_menu_1.png",
    isCustomizable: true
  },
  {
    id: "p2",
    name: "Cheese & Corn",
    prices: { small: 105, medium: 219, large: 352 },
    category: "Pizza",
    subcategory: "Simply Veg",
    image: "/assets/menu/pizza_menu_3.png",
    isCustomizable: true
  },
  {
    id: "p3",
    name: "Cheese & Onion",
    prices: { small: 105, medium: 219, large: 352 },
    category: "Pizza",
    subcategory: "Simply Veg",
    image: "/assets/menu/pizza_menu_1.png",
    isCustomizable: true
  },
  // --- Veg Pizza: Veg Delight ---
  {
    id: "p4",
    name: "Double Cheese Pizza",
    prices: { small: 142, medium: 265, large: 428 },
    category: "Pizza",
    subcategory: "Veg Delight",
    image: "/assets/menu/pizza_menu_3.png",
    isCustomizable: true
  },
  {
    id: "p5",
    name: "Garden Fresh",
    prices: { small: 142, medium: 265, large: 428 },
    category: "Pizza",
    subcategory: "Veg Delight",
    image: "/assets/menu/pizza_menu_1.png",
    isCustomizable: true
  },
  {
    id: "p6",
    name: "Cheese & Paneer",
    prices: { small: 142, medium: 265, large: 428 },
    category: "Pizza",
    subcategory: "Veg Delight",
    image: "/assets/menu/pizza_menu_3.png",
    isCustomizable: true
  },
  // --- Veg Pizza: Veg Treat ---
  {
    id: "p7",
    name: "Farmfresh",
    prices: { small: 190, medium: 343, large: 495 },
    category: "Pizza",
    subcategory: "Veg Treat",
    image: "/assets/menu/pizza_menu_1.png",
    isCustomizable: true
  },
  {
    id: "p8",
    name: "Country Feast",
    prices: { small: 190, medium: 343, large: 495 },
    category: "Pizza",
    subcategory: "Veg Treat",
    image: "/assets/menu/pizza_menu_3.png",
    isCustomizable: true
  },
  {
    id: "p9",
    name: "Spicy Tango Pizza",
    prices: { small: 190, medium: 343, large: 495 },
    category: "Pizza",
    subcategory: "Veg Treat",
    image: "/assets/menu/pizza_menu_1.png",
    isCustomizable: true
  },
  {
    id: "p10",
    name: "Wonder Pizza",
    prices: { small: 190, medium: 343, large: 495 },
    category: "Pizza",
    subcategory: "Veg Treat",
    image: "/assets/menu/pizza_menu_3.png",
    isCustomizable: true
  },
  // --- Veg Pizza: Veg Special ---
  {
    id: "p11",
    name: "Spicy Paneer",
    prices: { small: 219, medium: 380, large: 505 },
    category: "Pizza",
    subcategory: "Veg Special",
    image: "/assets/menu/pizza_menu_1.png",
    isCustomizable: true
  },
  {
    id: "p12",
    name: "Three Peppers",
    prices: { small: 219, medium: 380, large: 505 },
    category: "Pizza",
    subcategory: "Veg Special",
    image: "/assets/menu/pizza_menu_3.png",
    isCustomizable: true
  },
  {
    id: "p13",
    name: "Delicious Pizza",
    prices: { small: 219, medium: 380, large: 505 },
    category: "Pizza",
    subcategory: "Veg Special",
    image: "/assets/menu/pizza_menu_1.png",
    isCustomizable: true
  },
  {
    id: "p14",
    name: "Veggie Lovers",
    prices: { small: 219, medium: 380, large: 505 },
    category: "Pizza",
    subcategory: "Veg Special",
    image: "/assets/menu/pizza_menu_3.png",
    isCustomizable: true
  },
  {
    id: "p15",
    name: "Achari Pizza",
    prices: { small: 219, medium: 380, large: 505 },
    category: "Pizza",
    subcategory: "Veg Special",
    image: "/assets/menu/pizza_menu_1.png",
    isCustomizable: true
  },
  // --- Veg Feast & Specials ---
  {
    id: "p16",
    name: "Veg Feast Pizza",
    prices: { small: 248, medium: 400, large: 562 },
    category: "Pizza",
    description: "Classic veg supreme with all toppings.",
    image: "/assets/menu/pizza_menu_3.png",
    isCustomizable: true
  },
  {
    id: "p17",
    name: "Cloud One Pizza",
    prices: { small: 248, medium: 400, large: 562 },
    category: "Pizza",
    description: "Onion, Capsicum, Fresh Tomato, Jalapeno, Golden Corn, Paneer, Olive & Mushroom.",
    image: "/assets/menu/pizza_menu_1.png",
    isCustomizable: true
  },
  {
    id: "p18",
    name: "Chef's Veg Special Pizza",
    prices: { small: 248, medium: 400, large: 562 },
    category: "Pizza",
    description: "Red Paprika, Capsicum, Mushroom, Jalapeno, Paneer, Grilled Mushroom.",
    image: "/assets/menu/pizza_menu_3.png",
    isCustomizable: true
  },
  // --- Single/Double Topping ---
  {
    id: "p19",
    name: "Tomato Pizza",
    prices: { default: 62 },
    category: "Pizza",
    subcategory: "Single Topping",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: "p20",
    name: "Onion Pizza",
    prices: { default: 71 },
    category: "Pizza",
    subcategory: "Single Topping",
    image: "/assets/menu/pizza_menu_3.png"
  },
  {
    id: "p21",
    name: "Capsicum Pizza",
    prices: { default: 76 },
    category: "Pizza",
    subcategory: "Single Topping",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: "p22",
    name: "Corn Pizza",
    prices: { default: 76 },
    category: "Pizza",
    subcategory: "Single Topping",
    image: "/assets/menu/pizza_menu_3.png"
  },
  {
    id: "p23",
    name: "Onion & Capsicum",
    prices: { default: 105 },
    category: "Pizza",
    subcategory: "Double Topping",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: "p24",
    name: "Tomato & Corn",
    prices: { default: 105 },
    category: "Pizza",
    subcategory: "Double Topping",
    image: "/assets/menu/pizza_menu_3.png"
  },
  {
    id: "p25",
    name: "Jalapeno & Onion",
    prices: { default: 105 },
    category: "Pizza",
    subcategory: "Double Topping",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: "p26",
    name: "Onion & Paneer",
    prices: { default: 105 },
    category: "Pizza",
    subcategory: "Double Topping",
    image: "/assets/menu/pizza_menu_3.png"
  },
  // --- Burgers ---
  {
    id: "b1",
    name: "Potato Crispy Burger",
    prices: { default: 39 },
    category: "Burgers",
    image: "/assets/menu/potato_burger.png"
  },
  {
    id: "b2",
    name: "Cheese Burger",
    prices: { default: 52 },
    category: "Burgers",
    image: "/assets/menu/burger_menu_3.png"
  },
  {
    id: "b3",
    name: "Veg Delight Burger",
    prices: { default: 57 },
    category: "Burgers",
    image: "/assets/menu/burger_menu_3.png"
  },
  {
    id: "b4",
    name: "Achari Paneer Burger",
    prices: { default: 67 },
    category: "Burgers",
    image: "/assets/menu/burger_menu_3.png"
  },
  {
    id: "b5",
    name: "Pepper's Spl. Burger",
    prices: { default: 77 },
    category: "Burgers",
    image: "/assets/menu/burger_menu_3.png"
  },
  // --- Pasta ---
  {
    id: "pa1",
    name: "Veg Red Pasta",
    prices: { default: 95 },
    category: "Pasta",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: "pa2",
    name: "Veg White Pasta",
    prices: { default: 105 },
    category: "Pasta",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: "pa3",
    name: "Mix Sauce Pasta",
    prices: { default: 119 },
    category: "Pasta",
    image: "/assets/menu/side_menu_1.png"
  },
  // --- Sides ---
  {
    id: "s1",
    name: "Garlic Bread with Cheese Dip",
    prices: { default: 109 },
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: "s2",
    name: "Stuffed Garlic Bread",
    prices: { default: 129 },
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: "s3",
    name: "Veg Calzone Pocket",
    prices: { default: 109 },
    category: "Sides",
    image: "/assets/menu/veg_calzone.png"
  },
  {
    id: "s4",
    name: "Zingy Parcel",
    prices: { default: 39 },
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: "s5",
    name: "French Fries",
    prices: { default: 59 },
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: "s6",
    name: "Peri-Peri French Fries",
    prices: { default: 95 },
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: "s7",
    name: "Chocolava Cake",
    prices: { default: 85 },
    category: "Sides",
    image: "/assets/menu/chocolava_cake.png"
  },
  {
    id: "s8",
    name: "Cheese Dip",
    prices: { default: 30 },
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: "s9",
    name: "Jalapeno Dip",
    prices: { default: 20 },
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  // --- Combos ---
  {
    id: "c1",
    name: "Combo-1",
    prices: { default: 170 },
    category: "Combos",
    description: "Double Toppings Pizza with Extra Cheese + Cheese Burger + Cold Drinks (250ml)",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: "c2",
    name: "Combo-2",
    prices: { default: 315 },
    category: "Combos",
    description: "2 Double Topping Pizza with Extra Cheese + 2 Cheese Burger + Cold Drinks (500ml)",
    image: "/assets/menu/pizza_menu_3.png"
  },
  {
    id: "c3",
    name: "Family Combo",
    prices: { default: 560 },
    category: "Combos",
    description: "1 Medium Any Pizza + 1 Garlic Bread with Dip + 1 Parcel + 1 Chocolava Cake + Cold Drinks (500ml)",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: "c4",
    name: "Happy Family Combo",
    prices: { default: 760 },
    category: "Combos",
    description: "2 Medium Any Pizza + 1 Garlic Bread with Dip + 1 Parcel + 1 Chocolava Cake + Cold Drinks (500ml)",
    image: "/assets/menu/pizza_menu_3.png"
  },
  {
    id: "set1",
    name: "Set of 4 (Single Topping)",
    prices: { default: 270 },
    category: "Combos",
    description: "Small 4 PCs of Single Topping Pizza. Save ₹15/-",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: "set2",
    name: "Set of 4 (Double Topping)",
    prices: { default: 399 },
    category: "Combos",
    description: "Small 4 PCs of Double Topping Pizza. Save ₹25/-",
    image: "/assets/menu/pizza_menu_3.png"
  },
  // --- Drinks ---
  {
    id: "d1",
    name: "Cold Coffee",
    prices: { default: 99 },
    category: "Drinks",
    image: "/assets/menu/side_menu_1.png"
  },
];

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const [showModal, setShowModal] = useState(false);

  // Get display price (lowest available or default)
  const displayPrice = item.prices.default || item.prices.small;

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="group relative overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-xl transition-all duration-500 hover:border-primary-red/50 hover:shadow-2xl hover:shadow-primary-red/10 flex flex-col"
      >
        {/* Product Image */}
        <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

          {/* Category Tag */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 scale-90 origin-top-left">
            <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white w-fit">
              {item.category}
            </div>
            {item.subcategory && (
              <div className="bg-primary-red/80 backdrop-blur-md border border-primary-red/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white w-fit">
                {item.subcategory}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-1">
          <div className="flex flex-col flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white group-hover:text-primary-red transition-colors line-clamp-1">
                {item.name}
              </h3>
              <span className="text-xl font-black text-primary-red flex-shrink-0">
                ₹{displayPrice}
                {item.prices.small && <span className="text-[10px] ml-1 opacity-50">Onwards</span>}
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed uppercase tracking-wider font-medium mb-8 line-clamp-3">
              {item.description || "Freshly prepared with premium ingredients for the ultimate taste."}
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-auto w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all hover:bg-primary-red hover:text-white group-hover:shadow-[0_0_20px_rgba(255,59,48,0.3)]"
          >
            <SlidersHorizontal size={14} />
            {item.isCustomizable ? "Customise & Add" : "View & Add"}
          </button>
        </div>
      </motion.div>

      {/* Customization Modal */}
      {showModal && (
        <CustomizationModal item={item} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
