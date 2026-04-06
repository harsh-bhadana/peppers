"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bike, Store } from "lucide-react";
import { useDelivery, DeliveryMode } from "../context/DeliveryContext";

const options: { id: DeliveryMode; label: string; Icon: React.ElementType }[] = [
  { id: "delivery", label: "Delivery", Icon: Bike },
  { id: "pickup",   label: "Pickup",   Icon: Store },
];

export default function DeliveryModeToggle() {
  const { mode, setMode, setIsPincodeValid, setPincode } = useDelivery();

  const handleSwitch = (next: DeliveryMode) => {
    setMode(next);
    // Reset pincode state when switching modes
    if (next === "pickup") {
      setIsPincodeValid(null);
      setPincode("");
    }
  };

  return (
    <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/10 w-full">
      {options.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => handleSwitch(id)}
          className="relative flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors duration-300 z-10"
          style={{ color: mode === id ? "#fff" : "rgba(255,255,255,0.35)" }}
        >
          {/* Sliding pill highlight */}
          {mode === id && (
            <motion.div
              layoutId="delivery-toggle-pill"
              className="absolute inset-0 rounded-xl bg-primary-red"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}
