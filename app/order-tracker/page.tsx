"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, ChefHat, Bike, PartyPopper, ArrowLeft } from "lucide-react";
import { useDelivery, OrderStage } from "../context/DeliveryContext";
import { useCart } from "../context/CartContext";

const STAGES: {
  id: OrderStage;
  label: string;
  sublabel: string;
  Icon: React.ElementType;
  color: string;
}[] = [
  {
    id: "confirmed",
    label: "Order Confirmed",
    sublabel: "Your order has been received by our kitchen.",
    Icon: CheckCircle2,
    color: "#22c55e",
  },
  {
    id: "preparing",
    label: "Preparing",
    sublabel: "Our chefs are crafting your meal with love.",
    Icon: ChefHat,
    color: "#f59e0b",
  },
  {
    id: "out_for_delivery",
    label: "Out for Delivery",
    sublabel: "Your rider is on the way. Hold tight!",
    Icon: Bike,
    color: "#3b82f6",
  },
  {
    id: "delivered",
    label: "Delivered!",
    sublabel: "Enjoy your feast. Thank you for ordering from Pepper's!",
    Icon: PartyPopper,
    color: "#ff3b30",
  },
];

const STAGE_IDS = STAGES.map((s) => s.id) as OrderStage[];

export default function OrderTrackerPage() {
  const router = useRouter();
  const { orderStage, setOrderStage, mode } = useDelivery();
  const { items } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance through stages
  useEffect(() => {
    setOrderStage("confirmed");
    setCurrentIndex(0);
  }, [setOrderStage]);

  useEffect(() => {
    if (currentIndex >= STAGE_IDS.length - 1) return;
    const timer = setTimeout(() => {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      setOrderStage(STAGE_IDS[next]);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentIndex, setOrderStage]);

  const currentStageData = STAGES[currentIndex];
  const isDelivery = mode === "delivery";

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-32 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${currentStageData.color}15 0%, transparent 70%)`,
          transition: "background 1s ease",
        }}
      />

      <div className="w-full max-w-lg relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.push("/menu")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-colors mb-16"
        >
          <ArrowLeft size={14} />
          Back to Menu
        </button>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-primary-red mb-3">
            {isDelivery ? "🛵 Live Order Tracking" : "🏪 Pickup Status"}
          </p>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Your <span className="text-primary-red">Order</span>
          </h1>
          {items.length > 0 && (
            <p className="mt-3 text-sm text-white/40 font-bold">
              {items.length} item{items.length > 1 ? "s" : ""} •{" "}
              ₹{items.reduce((t, i) => t + i.price * i.quantity, 0).toFixed(0)}
            </p>
          )}
        </div>

        {/* Stage Progress */}
        <div className="relative flex flex-col gap-0">
          {STAGES.map((stage, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;

            // Hide "Out for Delivery" step if pickup mode
            if (stage.id === "out_for_delivery" && !isDelivery) return null;

            return (
              <div key={stage.id} className="flex gap-5">
                {/* Icon + connecting line */}
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isCurrent ? [1, 1.1, 1] : 1,
                      borderColor: isCompleted || isCurrent ? stage.color : "rgba(255,255,255,0.1)",
                      backgroundColor: isCompleted
                        ? stage.color + "33"
                        : isCurrent
                        ? stage.color + "22"
                        : "transparent",
                    }}
                    transition={{
                      scale: { repeat: isCurrent ? Infinity : 0, duration: 2, ease: "easeInOut" },
                      borderColor: { duration: 0.5 },
                      backgroundColor: { duration: 0.5 },
                    }}
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  >
                    <stage.Icon
                      size={20}
                      style={{
                        color: isCompleted || isCurrent ? stage.color : "rgba(255,255,255,0.2)",
                        transition: "color 0.5s",
                      }}
                    />
                  </motion.div>
                  {/* Connecting line (not for last item) */}
                  {index < STAGES.filter(s => isDelivery || s.id !== "out_for_delivery").length - 1 && (
                    <div className="w-px flex-1 my-1 relative overflow-hidden" style={{ minHeight: 32 }}>
                      <div className="absolute inset-0 bg-white/10" />
                      <motion.div
                        className="absolute top-0 left-0 w-full"
                        style={{ backgroundColor: stage.color }}
                        initial={{ height: "0%" }}
                        animate={{ height: isCompleted ? "100%" : "0%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="pb-10 pt-2 flex-1">
                  <motion.h3
                    animate={{
                      color: isCurrent ? "#fff" : isCompleted ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)",
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-base font-black uppercase tracking-wider"
                  >
                    {stage.label}
                  </motion.h3>
                  <AnimatePresence>
                    {isCurrent && (
                      <motion.p
                        key={stage.id + "-sub"}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-white/50 font-medium mt-1 leading-relaxed"
                      >
                        {stage.sublabel}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivered CTA */}
        <AnimatePresence>
          {currentStageData.id === "delivered" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4"
            >
              <button
                onClick={() => router.push("/menu")}
                className="w-full h-14 bg-primary-red hover:bg-white hover:text-black text-white text-sm font-black tracking-widest uppercase transition-colors duration-300"
              >
                Order Again 🌶
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
