"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      alert("Checkout simulation complete!");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="text-xl font-black uppercase tracking-widest text-white flex items-center gap-3">
                <ShoppingBag className="text-primary-red" size={24} />
                Your Alliance
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-white/50 hover:text-primary-red transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                  <ShoppingBag size={64} />
                  <p className="text-sm font-bold tracking-widest uppercase">Your alliance is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 relative group"
                  >
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute -top-2 -right-2 p-1.5 bg-zinc-900 border border-white/10 rounded-full text-white/50 hover:text-primary-red hover:border-primary-red opacity-0 group-hover:opacity-100 transition-all z-10"
                    >
                      <X size={14} />
                    </button>
                    {item.image && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-black/50">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="font-bold uppercase tracking-wider text-sm">{item.name}</h3>
                        <p className="text-primary-red font-black text-sm mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-black/50 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold uppercase tracking-widest text-white/60">Total</span>
                  <span className="text-2xl font-black text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full h-14 flex items-center justify-center bg-primary-red hover:bg-white hover:text-black text-white text-sm font-black tracking-widest uppercase transition-colors duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
