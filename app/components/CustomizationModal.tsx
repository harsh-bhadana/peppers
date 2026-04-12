"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import { useCart, Customization } from "../context/CartContext";

// ─── Add-on definitions ───────────────────────────────────────────────────────

type AddOnOption = { id: string; label: string; price: number };

const CRUST_OPTIONS: AddOnOption[] = [
  { id: "thin",        label: "Thin & Crispy",   price: 0   },
  { id: "thick",       label: "Thick Crust",      price: 30  },
  { id: "stuffed",     label: "Cheese Stuffed",   price: 80  },
  { id: "sourdough",   label: "Sourdough",        price: 50  },
];

const CHEESE_OPTIONS: AddOnOption[] = [
  { id: "none",        label: "No Extra Cheese",  price: 0   },
  { id: "mozzarella",  label: "+ Mozzarella",     price: 40  },
  { id: "cheddar",     label: "+ Cheddar",        price: 40  },
  { id: "double",      label: "Double Cheese ✦",  price: 70  },
];

const SPICE_OPTIONS: AddOnOption[] = [
  { id: "mild",        label: "Mild",             price: 0   },
  { id: "medium",      label: "Medium 🌶",        price: 0   },
  { id: "hot",         label: "Hot 🌶🌶",         price: 0   },
  { id: "inferno",     label: "Inferno 🌶🌶🌶",   price: 0   },
];

const EXTRA_TOPPINGS: AddOnOption[] = [
  { id: "mushrooms",   label: "Mushrooms",        price: 30  },
  { id: "jalapeños",   label: "Jalapeños",        price: 25  },
  { id: "olives",      label: "Black Olives",     price: 25  },
  { id: "corn",        label: "Sweet Corn",       price: 20  },
  { id: "chicken",     label: "Grilled Chicken",  price: 60  },
  { id: "paneer",      label: "Paneer",           price: 50  },
];

// ─── Sub-component: Option pill ───────────────────────────────────────────────

function OptionPill({
  option,
  selected,
  onToggle,
}: {
  option: AddOnOption;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all duration-200 ${
        selected
          ? "bg-primary-red/20 border-primary-red text-white"
          : "bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white"
      }`}
    >
      {selected && <Check size={11} className="text-primary-red flex-shrink-0" />}
      <span>{option.label}</span>
      {option.price > 0 && (
        <span className={`ml-auto pl-2 ${selected ? "text-primary-red" : "text-white/30"}`}>
          +₹{option.price}
        </span>
      )}
    </button>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-3">
      {children}
    </p>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export interface MenuItemForModal {
  id: string;
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

export default function CustomizationModal({
  item,
  onClose,
}: {
  item: MenuItemForModal;
  onClose: () => void;
}) {
  const { addToCart } = useCart();

  // Determine available sizes
  const availableSizes = useMemo(() => {
    const sizes: { id: string; label: string; price: number }[] = [];
    if (item.prices.small) sizes.push({ id: "small", label: "Small", price: item.prices.small });
    if (item.prices.medium) sizes.push({ id: "medium", label: "Medium", price: item.prices.medium });
    if (item.prices.large) sizes.push({ id: "large", label: "Large", price: item.prices.large });
    if (item.prices.default) sizes.push({ id: "default", label: "Standard", price: item.prices.default });
    return sizes;
  }, [item.prices]);

  const [selectedSize, setSelectedSize] = useState(availableSizes[0]?.id || "default");
  const [crust, setCrust] = useState("thin");
  const [cheese, setCheese] = useState("none");
  const [spice, setSpice] = useState("mild");
  const [toppings, setToppings] = useState<Set<string>>(new Set());

  // Dynamic topping price based on size
  const toppingUnitPrice = useMemo(() => {
    if (selectedSize === "large") return 60;
    if (selectedSize === "medium") return 50;
    return 30; // small or default
  }, [selectedSize]);

  const basePrice = availableSizes.find(s => s.id === selectedSize)?.price || 0;

  const toggleTopping = (id: string) => {
    setToppings((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Computed add-on price
  const addOnTotal = useMemo(() => {
    const crustPrice = CRUST_OPTIONS.find(o => o.id === crust)?.price ?? 0;
    const cheesePrice = CHEESE_OPTIONS.find(o => o.id === cheese)?.price ?? 0;
    const toppingPrice = toppings.size * toppingUnitPrice;
    return crustPrice + cheesePrice + toppingPrice;
  }, [crust, cheese, toppings, toppingUnitPrice]);

  const totalPrice = basePrice + addOnTotal;

  // Determine if pizza (crust applies)
  const isPizza = item.category === "Pizza";

  const handleAddToCart = () => {
    const customizations: Customization[] = [];

    // Size customization
    const sizeLabel = availableSizes.find(s => s.id === selectedSize)?.label;
    if (sizeLabel && sizeLabel !== "Standard") {
      customizations.push({ label: `Size: ${sizeLabel}`, price: 0 });
    }

    if (isPizza) {
      const crustLabel = CRUST_OPTIONS.find(o => o.id === crust)!;
      if (crustLabel.price > 0 || crust !== "thin") {
        customizations.push({ label: `Crust: ${crustLabel.label}`, price: crustLabel.price });
      }
    }

    const cheeseOpt = CHEESE_OPTIONS.find(o => o.id === cheese)!;
    if (cheese !== "none") {
      customizations.push({ label: cheeseOpt.label, price: cheeseOpt.price });
    }

    const spiceOpt = SPICE_OPTIONS.find(o => o.id === spice)!;
    customizations.push({ label: `Spice: ${spiceOpt.label}`, price: 0 });

    [...toppings].forEach(tId => {
      const tLabel = EXTRA_TOPPINGS.find(o => o.id === tId)?.label || tId;
      customizations.push({ label: tLabel, price: toppingUnitPrice });
    });

    const fingerprint = [
      selectedSize,
      isPizza ? crust : "",
      cheese,
      spice,
      [...toppings].sort().join("+"),
    ].join("|");

    addToCart({
      id: `${item.id}-${fingerprint}`,
      menuItemId: item.id,
      name: item.name,
      price: totalPrice,
      image: item.image,
      customizations,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-end md:items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[90vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Hero image */}
          <div className="relative h-52 flex-shrink-0">
            <Image src={item.image} alt={item.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/70 hover:text-white transition"
            >
              <X size={16} />
            </button>

            <div className="absolute bottom-4 left-6 right-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-red mb-1">
                {item.category} {item.subcategory ? `· ${item.subcategory}` : ""}
              </p>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white leading-none">
                {item.name}
              </h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 no-scrollbar">
            <p className="text-xs text-white/40 leading-relaxed font-medium uppercase tracking-wider">
              {item.description || "Freshly prepared with premium ingredients for the ultimate taste."}
            </p>

            {/* Size Selection */}
            {availableSizes.length > 1 && (
              <div>
                <SectionLabel>Select Size</SectionLabel>
                <div className="grid grid-cols-3 gap-2">
                  {availableSizes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSize(s.id)}
                      className={`px-3 py-3 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${
                        selectedSize === s.id
                          ? "bg-primary-red border-primary-red text-white"
                          : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isPizza && item.id.startsWith("p") && !item.subcategory?.includes("Topping") && (
              <>
                <div>
                  <SectionLabel>Crust Type</SectionLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {CRUST_OPTIONS.map((o) => (
                      <OptionPill
                        key={o.id}
                        option={o}
                        selected={crust === o.id}
                        onToggle={() => setCrust(o.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionLabel>Extra Toppings (₹{toppingUnitPrice} each)</SectionLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {EXTRA_TOPPINGS.map((o) => (
                      <OptionPill
                        key={o.id}
                        option={{ ...o, price: toppingUnitPrice }}
                        selected={toppings.has(o.id)}
                        onToggle={() => toggleTopping(o.id)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {item.isCustomizable !== false && (
              <>
                <div>
                  <SectionLabel>Extra Cheese</SectionLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {CHEESE_OPTIONS.map((o) => (
                      <OptionPill
                        key={o.id}
                        option={o}
                        selected={cheese === o.id}
                        onToggle={() => setCheese(o.id)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <SectionLabel>Spice Level</SectionLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {SPICE_OPTIONS.map((o) => (
                      <OptionPill
                        key={o.id}
                        option={o}
                        selected={spice === o.id}
                        onToggle={() => setSpice(o.id)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex-shrink-0 px-6 py-5 border-t border-white/5 bg-black/40 backdrop-blur">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Total</p>
                <motion.p
                  key={totalPrice}
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-black text-white"
                >
                  ₹{totalPrice}
                  {addOnTotal > 0 && (
                    <span className="text-xs text-primary-red ml-2 font-bold">
                      +₹{addOnTotal} add-ons
                    </span>
                  )}
                </motion.p>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full h-13 py-4 flex items-center justify-center gap-3 bg-primary-red hover:bg-white hover:text-black text-white text-sm font-black tracking-widest uppercase transition-colors duration-300 rounded-xl shadow-[0_10px_30px_rgba(255,59,48,0.2)]"
            >
              <ShoppingBag size={16} />
              Add to Alliance
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
