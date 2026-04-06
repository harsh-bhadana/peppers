"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

const menuItems: MenuItem[] = [
  // --- Pizzas ---
  {
    id: 1,
    name: "Misty Truffle",
    description: "Wild mushrooms, white truffle oil, mozzarella, and fresh thyme on our signature sourdough.",
    price: "₹599",
    category: "Pizza",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: 2,
    name: "Peri-Peri Paneer",
    description: "Chunky paneer cubes, smoky peri-peri glaze, roasted peppers, and caramelized onions.",
    price: "₹549",
    category: "Pizza",
    image: "/assets/menu/pizza_menu_3.png"
  },
  {
    id: 3,
    name: "Smoky BBQ Chicken",
    description: "Tender grilled chicken, smoky BBQ sauce, caramelised onions, and jalapeños on a crispy thin crust.",
    price: "₹629",
    category: "Pizza",
    image: "/assets/menu/pizza_menu_1.png"
  },
  {
    id: 4,
    name: "Margherita Supreme",
    description: "San Marzano tomatoes, fresh buffalo mozzarella, extra virgin olive oil, and hand-torn basil.",
    price: "₹449",
    category: "Pizza",
    image: "/assets/menu/pizza_menu_3.png"
  },
  // --- Burgers ---
  {
    id: 5,
    name: "Planet Alliance",
    description: "Thick plant-based patty, melting vegan cheese, avocado, and fresh sprouts on a charcoal bun.",
    price: "₹649",
    category: "Burgers",
    image: "/assets/menu/burger_menu_3.png"
  },
  {
    id: 6,
    name: "Double Smash",
    description: "Two smashed beef patties, American cheese, caramelised onions, house pickles, and secret sauce.",
    price: "₹699",
    category: "Burgers",
    image: "/assets/menu/burger_menu_3.png"
  },
  {
    id: 7,
    name: "Crispy Chicken King",
    description: "Buttermilk fried chicken thigh, sriracha mayo, coleslaw, and pickled cucumber on a brioche bun.",
    price: "₹579",
    category: "Burgers",
    image: "/assets/menu/burger_menu_3.png"
  },
  {
    id: 8,
    name: "Mushroom Meltdown",
    description: "Sautéed portobello mushrooms, Swiss cheese, garlic aioli, and rocket on a sesame seed bun.",
    price: "₹529",
    category: "Burgers",
    image: "/assets/menu/burger_menu_3.png"
  },
  // --- Sides ---
  {
    id: 9,
    name: "Truffle Parm Fries",
    description: "Hand-cut fries tossed in truffle salt, aged parmesan, and fresh garden parsley.",
    price: "₹299",
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: 10,
    name: "Loaded Nachos",
    description: "Crispy corn tortillas piled with jalapeños, salsa, sour cream, melted cheddar, and guacamole.",
    price: "₹349",
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: 11,
    name: "Garlic Bread Royale",
    description: "Thick-cut sourdough toasted with house garlic butter, mozzarella, and fresh herbs.",
    price: "₹249",
    category: "Sides",
    image: "/assets/menu/side_menu_1.png"
  },
  // --- Drinks ---
  {
    id: 12,
    name: "Mango Jaljeera",
    description: "Chilled raw mango cooler with roasted cumin, black salt, and fresh mint — a desi summertime classic.",
    price: "₹149",
    category: "Drinks",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: 13,
    name: "Activated Charcoal Lemonade",
    description: "Fresh lemon, activated charcoal, ginger syrup, and sparkling water — dark, refreshing, dramatic.",
    price: "₹199",
    category: "Drinks",
    image: "/assets/menu/side_menu_1.png"
  },
  {
    id: 14,
    name: "Masala Cold Coffee",
    description: "Cold brewed coffee shaken with cardamom, cinnamon, and condensed milk over crushed ice.",
    price: "₹179",
    category: "Drinks",
    image: "/assets/menu/side_menu_1.png"
  },
];

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const priceNum = parseFloat(item.price.replace("₹", "").replace(/,/g, ""));
    addToCart({
      id: item.id.toString(),
      name: item.name,
      price: priceNum,
      image: item.image,
    });
  };

  return (
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
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
          {item.category}
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
              {item.price}
            </span>
          </div>
          <p className="text-sm text-white/50 leading-relaxed uppercase tracking-wider font-medium mb-8 line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleAddToCart}
          className="mt-auto w-full bg-white text-black py-4 rounded-xl font-black uppercase text-xs tracking-[0.2em] transition-all hover:bg-primary-red hover:text-white group-hover:shadow-[0_0_20px_rgba(255,59,48,0.3)]"
        >
          Add To Alliance
        </button>
      </div>
    </motion.div>
  );
}

export { menuItems };
