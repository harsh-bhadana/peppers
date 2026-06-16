"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ChefHat,
  Bike,
  PartyPopper,
  ArrowLeft,
  MapPin,
  Receipt,
  Package,
  Star,
  Phone,
  X,
  MessageSquare,
  Sparkles
} from "lucide-react";

type OrderStage = "confirmed" | "preparing" | "rider_assigned" | "out_for_delivery" | "delivered";

const MOCK_ORDER = {
  orderId: "PEP-2026-9481",
  items: [
    {
      id: "p7-medium-crust",
      menuItemId: "p7",
      name: "Farmfresh Pizza",
      price: 343,
      quantity: 1,
      image: "/assets/menu/pizza_menu_1.png",
      customizations: [{ label: "Size: Medium", price: 0 }, { label: "Crust: Thin & Crispy", price: 0 }]
    },
    {
      id: "pa3-default",
      menuItemId: "pa3",
      name: "Mix Sauce Pasta",
      price: 119,
      quantity: 1,
      image: "/assets/menu/side_menu_1.png",
      customizations: []
    },
    {
      id: "s7-default",
      menuItemId: "s7",
      name: "Chocolava Cake",
      price: 85,
      quantity: 2,
      image: "/assets/menu/chocolava_cake.png",
      customizations: []
    }
  ],
  subtotal: 632,
  tax: 31.6,
  deliveryFee: 40,
  total: 703.6,
  mode: "delivery",
  customer: {
    name: "Lord Aryan Kapoor",
    phone: "9876543210",
    email: "aryan@alliance.com"
  },
  address: {
    street: "Nelson Mandela Road, Vasant Kunj",
    apartment: "Flat 403, Block B",
    landmark: "Opposite Promenade Mall",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110076"
  },
  payment: {
    method: "upi",
    status: "Paid"
  },
  createdAt: new Date().toISOString()
};

export default function OrderTrackerPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Review Modal States
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const tags = ["Piping Hot", "Amazing Crust", "Fast Delivery", "Epic Taste", "Kind Rider", "Generous Toppings"];

  // Load order data on mount
  useEffect(() => {
    const saved = localStorage.getItem("peppers-active-order");
    if (saved) {
      try {
        setOrderData(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing active order", e);
        setOrderData(MOCK_ORDER);
      }
    } else {
      setOrderData(MOCK_ORDER);
    }
  }, []);

  const orderMode = orderData?.mode || "delivery";
  const isDelivery = orderMode === "delivery";

  // Dynamic Stages
  const stages = [
    {
      id: "confirmed" as OrderStage,
      label: "Order Confirmed",
      sublabel: "Your order has been received by our kitchen.",
      Icon: CheckCircle2,
      color: "#22c55e",
    },
    {
      id: "preparing" as OrderStage,
      label: "Preparing",
      sublabel: "Our chefs are crafting your meal with love.",
      Icon: ChefHat,
      color: "#f59e0b",
    },
    {
      id: "rider_assigned" as OrderStage,
      label: isDelivery ? "Messenger Dispatched" : "Feast Packed",
      sublabel: isDelivery
        ? "Alliance Rider Veer Singh (+91 99999 88888) is assigned."
        : "Kitchen staff is carrying out quality checks & packing.",
      Icon: Package,
      color: "#8b5cf6",
    },
    {
      id: "out_for_delivery" as OrderStage,
      label: isDelivery ? "Enroute" : "Ready for Pickup",
      sublabel: isDelivery
        ? "Your rider is on the way. Hold tight!"
        : "Your meal is hot and waiting at the selected outpost.",
      Icon: isDelivery ? Bike : MapPin,
      color: "#3b82f6",
    },
    {
      id: "delivered" as OrderStage,
      label: isDelivery ? "Delivered!" : "Picked Up!",
      sublabel: isDelivery
        ? "Enjoy your feast. Thank you for ordering from Pepper's!"
        : "Enjoy your feast. Thank you for visiting the outpost!",
      Icon: PartyPopper,
      color: "#ff3b30",
    },
  ];

  // Auto-advance through stages
  useEffect(() => {
    if (currentIndex >= stages.length - 1) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex, stages.length]);

  // Trigger Review Modal when order is delivered
  useEffect(() => {
    if (currentIndex === stages.length - 1) {
      const reviewTimer = setTimeout(() => {
        setShowReviewModal(true);
      }, 1500);
      return () => clearTimeout(reviewTimer);
    }
  }, [currentIndex, stages.length]);

  if (!orderData) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-red" />
      </main>
    );
  }

  const currentStage = stages[currentIndex];

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmittingReview(true);
    setTimeout(() => {
      setIsSubmittingReview(false);
      setReviewSubmitted(true);
      setTimeout(() => {
        setShowReviewModal(false);
      }, 1500);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-40 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${currentStage.color}15 0%, transparent 70%)`,
          transition: "background 1s ease",
        }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Back Button */}
        <button
          onClick={() => router.push("/menu")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Back to Menu
        </button>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Live Tracker progress */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-primary-red mb-3">
                {isDelivery ? "🛵 Live Delivery Quest" : "🏪 Outpost Collection"}
              </p>
              <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
                Track <span className="text-primary-red">Order</span>
              </h1>
              <p className="text-xs font-bold text-white/40 mt-1 uppercase tracking-widest">
                Order ID: #{orderData.orderId}
              </p>
            </div>

            {/* Stage Progress */}
            <div className="relative flex flex-col gap-0 border border-white/5 bg-zinc-900/10 backdrop-blur-xl p-8 rounded-3xl">
              {stages.map((stage, index) => {
                const isCompleted = index < currentIndex;
                const isCurrent = index === currentIndex;

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
                      {index < stages.length - 1 && (
                        <div className="w-px flex-1 my-1 relative overflow-hidden" style={{ minHeight: 45 }}>
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
                            className="text-xs text-white/50 font-bold uppercase tracking-wider mt-1 leading-relaxed"
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

            {/* Delivery Rider Assignment Details */}
            {isDelivery && currentIndex >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-white/5 bg-zinc-950 p-6 rounded-3xl flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar bubble */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center font-black text-white text-lg shadow-inner">
                    VS
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary-red">
                      Assigned Rider
                    </span>
                    <h4 className="text-sm font-black uppercase tracking-wide text-white mt-0.5">
                      Veer Singh
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1 text-white/50 text-[10px] font-bold">
                      <Star size={10} className="fill-primary-red text-primary-red" />
                      <span>4.9 (1.2K+ runs)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+919999988888"
                    onClick={(e) => e.preventDefault()}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Phone size={16} />
                  </a>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="h-11 px-4 rounded-xl bg-primary-red/10 hover:bg-primary-red/20 border border-primary-red/20 hover:border-primary-red/40 text-[10px] font-black uppercase tracking-wider text-primary-red transition-all"
                  >
                    Feast Feedback
                  </button>
                </div>
              </motion.div>
            )}

            {/* Delivered CTA */}
            <AnimatePresence>
              {currentStage.id === "delivered" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onClick={() => router.push("/menu")}
                    className="w-full h-14 bg-primary-red hover:bg-white hover:text-black text-white text-xs font-black tracking-widest uppercase transition-colors duration-300 rounded-2xl shadow-[0_10px_35px_rgba(255,59,48,0.2)]"
                  >
                    Forge Another Feast 🌶
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side: Order details scroll receipt */}
          <div className="lg:col-span-5 border border-white/5 bg-zinc-950 p-8 rounded-3xl space-y-6">
            <h2 className="text-xl font-black uppercase tracking-wider text-white border-b border-white/5 pb-4 flex items-center gap-2">
              <Receipt size={18} className="text-primary-red" />
              Scroll Details
            </h2>

            {/* Client information */}
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/30 block">
                  Contract Client
                </span>
                <span className="font-bold text-white text-sm uppercase">{orderData.customer.name}</span>
                <span className="block text-white/50 font-medium">{orderData.customer.phone}</span>
              </div>

              {isDelivery ? (
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/30 block">
                    Coordinates Address
                  </span>
                  <span className="font-medium text-white/80 block leading-relaxed">
                    {orderData.address.apartment}, {orderData.address.street}
                  </span>
                  {orderData.address.landmark && (
                    <span className="font-medium text-white/40 block">
                      Landmark: {orderData.address.landmark}
                    </span>
                  )}
                  <span className="font-bold text-white uppercase tracking-wider block mt-1">
                    {orderData.address.city} - {orderData.address.pincode}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/30 block">
                    Outpost Collection Point
                  </span>
                  <span className="font-bold text-white uppercase block">
                    {orderData.pickupOutpost?.name}
                  </span>
                  <span className="font-medium text-white/50 block">
                    {orderData.pickupOutpost?.address}
                  </span>
                  <span className="inline-block mt-2 px-2.5 py-1 bg-primary-red/10 border border-primary-red/20 rounded-md text-[9px] font-black uppercase text-primary-red">
                    Pickup: {stages[3].label === "Ready for Pickup" ? "Ready Now" : `Time: ${orderData.pickupTime === "now" ? "Immediate" : "Scheduled"}`}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/30 block">
                    Payment Method
                  </span>
                  <span className="font-bold text-white uppercase tracking-wider">
                    {orderData.payment.method === "cod"
                      ? isDelivery
                        ? "Cash on Delivery"
                        : "Pay at Outpost"
                      : orderData.payment.method.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/30 block">
                    Treasury Status
                  </span>
                  <span
                    className={`font-black uppercase tracking-wider ${
                      orderData.payment.status === "Paid" ? "text-green-500" : "text-yellow-500 animate-pulse"
                    }`}
                  >
                    {orderData.payment.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Items invoice list */}
            <div className="space-y-4 max-h-[200px] overflow-y-auto pr-1 no-scrollbar">
              {orderData.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-start text-xs">
                  <div className="min-w-0">
                    <span className="font-black uppercase tracking-wide text-white block">
                      {item.name} <span className="text-primary-red font-bold font-mono">x{item.quantity}</span>
                    </span>
                    {item.customizations && item.customizations.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.customizations.map((c: any, ci: number) => (
                          <span
                            key={ci}
                            className="text-[8px] font-bold uppercase tracking-wider bg-white/5 text-white/40 px-1 py-0.5 rounded-sm"
                          >
                            {c.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-white/80 ml-2">
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill breakdown */}
            <div className="space-y-2 border-t border-white/5 pt-4 text-xs">
              <div className="flex justify-between font-bold text-white/40">
                <span className="uppercase tracking-wide">Subtotal</span>
                <span>₹{orderData.subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-white/40">
                <span className="uppercase tracking-wide">GST Tax (5%)</span>
                <span>₹{orderData.tax.toFixed(0)}</span>
              </div>
              {orderData.deliveryFee > 0 && (
                <div className="flex justify-between font-bold text-white/40">
                  <span className="uppercase tracking-wide">Delivery fee</span>
                  <span>₹{orderData.deliveryFee.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-white/5">
                <span className="font-black uppercase tracking-wider text-white">Grand total</span>
                <span className="text-2xl font-black text-primary-red">
                  ₹{orderData.total.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Review Modal Overlay */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewModal(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl z-10 flex flex-col items-center text-center overflow-hidden"
            >
              {/* Top border red line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary-red to-transparent" />
              <div className="absolute -top-24 w-48 h-48 bg-primary-red/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>

              {!reviewSubmitted ? (
                <form onSubmit={handleReviewSubmit} className="w-full space-y-6">
                  {/* Header */}
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary-red/10 border border-primary-red/20 flex items-center justify-center text-primary-red mx-auto mb-4">
                      <Sparkles size={22} className="animate-pulse" />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-widest text-white">
                      Rate Your Feast
                    </h3>
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-wider mt-1">
                      Deliver your scroll to the Citadel
                    </p>
                  </div>

                  {/* Star Ratings */}
                  <div className="flex justify-center gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform active:scale-95 duration-100 p-1"
                      >
                        <Star
                          size={32}
                          className={`transition-all duration-200 ${
                            star <= (hoveredRating || rating)
                              ? "fill-primary-red text-primary-red scale-110 drop-shadow-[0_0_10px_#ff3b30]"
                              : "text-white/10 hover:text-white/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {/* Feedback Tags */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/30 block text-left">
                      Select Accolades
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {tags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleTagToggle(tag)}
                            className={`px-3.5 py-2 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                              isSelected
                                ? "bg-primary-red/25 border-primary-red text-white"
                                : "bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input field */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/30 flex items-center gap-1.5">
                      <MessageSquare size={11} />
                      Scroll Message
                    </label>
                    <textarea
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share details of your battle with hunger..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={rating === 0 || isSubmittingReview}
                    className="w-full h-12 bg-primary-red hover:bg-white hover:text-black text-white text-xs font-black tracking-widest uppercase transition-colors duration-300 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmittingReview ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        Sending Scroll...
                      </>
                    ) : (
                      "Send Review to Citadel"
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-12 flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 mb-6">
                    <CheckCircle2 size={48} className="animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">
                    Scroll Sent!
                  </h3>
                  <p className="text-[10px] text-white/50 font-black uppercase tracking-wider">
                    Thank you! Your feedback has entered our records.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

// Simple helper loader component
function Loader2({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`animate-spin ${className}`}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
