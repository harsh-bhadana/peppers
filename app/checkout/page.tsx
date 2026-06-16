"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useDelivery } from "../context/DeliveryContext";
import CreditCardForm from "../components/CreditCardForm";
import UPIDialog from "../components/UPIDialog";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  MapPin,
  CreditCard,
  ShoppingBag,
  Clock,
  ShieldCheck,
  Check,
  Info,
  Loader2,
  Smartphone,
} from "lucide-react";

const OUTPOSTS = [
  { id: "cp", name: "Connaught Place Citadel (HQ)", address: "H-Block, Connaught Place, New Delhi" },
  { id: "cyberhub", name: "Gurugram Cyber Hub Keep", address: "Building 10C, Cyber Hub, Gurugram" },
  { id: "sec62", name: "Noida Sector 62 Outpost", address: "Stellar IT Park, Sector 62, Noida" },
  { id: "saket", name: "Saket Palace", address: "MGF Metropolitan Mall, Saket, New Delhi" },
];

const PICKUP_TIMES = [
  { id: "now", label: "Now (15 mins prep)" },
  { id: "30m", label: "In 30 minutes" },
  { id: "1h", label: "In 1 hour" },
  { id: "2h", label: "In 2 hours" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const { mode, pincode } = useDelivery();

  // Redirect if cart is empty on mount
  useEffect(() => {
    if (items.length === 0) {
      router.replace("/menu");
    }
  }, [items, router]);

  // Stepper state
  const [currentStep, setCurrentStep] = useState(1);

  // Form states: Personal details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Form states: Delivery Address
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("Delhi NCR");
  const [state, setState] = useState("Delhi");

  // Form states: Pickup Address
  const [selectedOutpost, setSelectedOutpost] = useState("cp");
  const [pickupTime, setPickupTime] = useState("now");

  // Form states: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card" | "upi">("cod");

  // Credit Card States
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // UI state
  const [isUPIOpen, setIsUPIOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Computations
  const gst = cartTotal * 0.05; // 5% GST
  const deliveryFee = mode === "delivery" ? 40 : 0;
  const grandTotal = cartTotal + gst + deliveryFee;

  // Validation functions
  const validateDetails = () => {
    return name.trim().length >= 3 && phone.replace(/\D/g, "").length === 10;
  };

  const validateAddress = () => {
    if (mode === "pickup") {
      return selectedOutpost !== "";
    }
    return street.trim().length >= 5 && pincode.length === 6;
  };

  const validateCard = () => {
    const cleanNum = cardNumber.replace(/\s/g, "");
    return (
      cleanNum.length >= 15 &&
      cardName.trim().length >= 3 &&
      cardExpiry.length === 5 &&
      cardCvv.length >= 3
    );
  };

  const nextStep = () => {
    if (currentStep === 1 && validateDetails()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateAddress()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((c) => c - 1);
    }
  };

  const handlePlaceOrder = (simulatedPaymentMethod = paymentMethod, status = "Pending") => {
    setIsPlacingOrder(true);

    setTimeout(() => {
      const orderId = `PEP-${Date.now().toString().slice(-6)}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      const orderDetails = {
        orderId,
        items,
        subtotal: cartTotal,
        tax: gst,
        deliveryFee,
        total: grandTotal,
        mode,
        customer: { name, phone, email },
        address:
          mode === "delivery"
            ? {
                street,
                apartment,
                landmark,
                city,
                state,
                pincode,
              }
            : null,
        pickupOutpost:
          mode === "pickup"
            ? OUTPOSTS.find((o) => o.id === selectedOutpost)
            : null,
        pickupTime: mode === "pickup" ? pickupTime : null,
        payment: {
          method: simulatedPaymentMethod,
          status: status,
        },
        createdAt: new Date().toISOString(),
      };

      // Store active order and clear cart
      localStorage.setItem("peppers-active-order", JSON.stringify(orderDetails));
      clearCart();
      setIsPlacingOrder(false);
      router.push("/order-tracker");
    }, 1500);
  };

  const handleUPISuccess = () => {
    setIsUPIOpen(false);
    handlePlaceOrder("upi", "Paid");
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "upi") {
      setIsUPIOpen(true);
    } else if (paymentMethod === "card") {
      if (validateCard()) {
        handlePlaceOrder("card", "Paid");
      }
    } else {
      handlePlaceOrder("cod", "Unpaid");
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 size={36} className="animate-spin text-primary-red" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-40 pb-32 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => router.push("/menu")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Back to Menu
        </button>

        <header className="mb-16">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-primary-red mb-3">
            Peppers Alliance Gate
          </p>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
            Secure <span className="text-primary-red">Checkout</span>
          </h1>
        </header>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border border-white/5 bg-zinc-900/20 backdrop-blur-md rounded-2xl p-4">
              {[
                { step: 1, label: "Details", Icon: User },
                { step: 2, label: mode === "delivery" ? "Delivery" : "Pickup Store", Icon: MapPin },
                { step: 3, label: "Payment", Icon: CreditCard },
              ].map((s) => {
                const isActive = currentStep === s.step;
                const isCompleted = currentStep > s.step;

                return (
                  <div key={s.step} className="flex items-center gap-2.5 px-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all ${
                        isActive
                          ? "bg-primary-red text-white scale-110 shadow-[0_0_15px_rgba(255,59,48,0.3)]"
                          : isCompleted
                          ? "bg-green-500/20 border border-green-500 text-green-500"
                          : "bg-white/5 border border-white/10 text-white/40"
                      }`}
                    >
                      {isCompleted ? <Check size={12} /> : s.step}
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest hidden sm:inline transition-colors ${
                        isActive ? "text-white" : isCompleted ? "text-green-500" : "text-white/40"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Steps Container */}
            <form onSubmit={handleSubmitCheckout}>
              <AnimatePresence mode="wait">
                {/* STEP 1: PERSONAL DETAILS */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="border border-white/5 bg-zinc-900/10 backdrop-blur-xl p-8 rounded-3xl space-y-6"
                  >
                    <div className="border-b border-white/5 pb-4">
                      <h2 className="text-xl font-black uppercase tracking-wider text-white">
                        Personal Details
                      </h2>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-wider mt-1">
                        Identify your alliance contract
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Lord/Lady Name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                            Phone Number
                          </label>
                          <div className="flex">
                            <span className="bg-white/5 border border-r-0 border-white/10 rounded-l-xl px-3 py-3.5 text-sm font-bold text-white/50 flex items-center">
                              +91
                            </span>
                            <input
                              type="tel"
                              required
                              pattern="[0-9]{10}"
                              maxLength={10}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                              placeholder="9876543210"
                              className="flex-1 bg-white/5 border border-white/10 rounded-r-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="parchment@alliance.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateDetails()}
                      className="w-full h-12 bg-primary-red hover:bg-white hover:text-black text-white text-xs font-black tracking-widest uppercase transition-colors duration-300 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue to Outpost Info
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: DELIVERY ADDRESS OR PICKUP STORE */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="border border-white/5 bg-zinc-900/10 backdrop-blur-xl p-8 rounded-3xl space-y-6"
                  >
                    {mode === "delivery" ? (
                      <>
                        <div className="border-b border-white/5 pb-4">
                          <h2 className="text-xl font-black uppercase tracking-wider text-white">
                            Delivery Address
                          </h2>
                          <p className="text-xs text-white/40 font-bold uppercase tracking-wider mt-1">
                            Specify where the riders should deploy
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                                Flat / House / Office No.
                              </label>
                              <input
                                type="text"
                                required
                                value={apartment}
                                onChange={(e) => setApartment(e.target.value)}
                                placeholder="E.g. Flat 403, 4th Floor"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                                Pincode (Verified)
                              </label>
                              <input
                                type="text"
                                disabled
                                value={pincode}
                                className="w-full bg-white/5 border border-white/5 opacity-60 rounded-xl px-4 py-3.5 text-sm font-bold text-white outline-none cursor-not-allowed"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                              Street Name / Colony
                            </label>
                            <input
                              type="text"
                              required
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                              placeholder="E.g. Nelson Mandela Road, Vasant Kunj"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                              Landmark
                            </label>
                            <input
                              type="text"
                              value={landmark}
                              onChange={(e) => setLandmark(e.target.value)}
                              placeholder="E.g. Opposite Promenade Mall"
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                                City
                              </label>
                              <input
                                type="text"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-white outline-none focus:border-primary-red/60 transition-colors"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">
                                State
                              </label>
                              <input
                                type="text"
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm font-bold text-white outline-none focus:border-primary-red/60 transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="border-b border-white/5 pb-4">
                          <h2 className="text-xl font-black uppercase tracking-wider text-white">
                            Select Pickup Outpost
                          </h2>
                          <p className="text-xs text-white/40 font-bold uppercase tracking-wider mt-1">
                            Choose which fortress outpost to visit
                          </p>
                        </div>

                        <div className="space-y-6">
                          <div className="grid grid-cols-1 gap-3">
                            {OUTPOSTS.map((outpost) => (
                              <button
                                key={outpost.id}
                                type="button"
                                onClick={() => setSelectedOutpost(outpost.id)}
                                className={`p-4 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                                  selectedOutpost === outpost.id
                                    ? "bg-primary-red/20 border-primary-red shadow-lg"
                                    : "bg-white/5 border-white/10 hover:border-white/20"
                                }`}
                              >
                                <span className="text-sm font-black text-white">{outpost.name}</span>
                                <span className="text-xs text-white/50">{outpost.address}</span>
                              </button>
                            ))}
                          </div>

                          <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                              <Clock size={12} />
                              Pickup Time
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {PICKUP_TIMES.map((time) => (
                                <button
                                  key={time.id}
                                  type="button"
                                  onClick={() => setPickupTime(time.id)}
                                  className={`px-3 py-2.5 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-colors ${
                                    pickupTime === time.id
                                      ? "bg-primary-red border-primary-red text-white"
                                      : "bg-white/5 border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                                  }`}
                                >
                                  {time.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 h-12 bg-transparent border border-white/10 hover:border-white/30 text-white text-xs font-black tracking-widest uppercase transition-colors duration-300 rounded-xl"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!validateAddress()}
                        className="flex-[2] h-12 bg-primary-red hover:bg-white hover:text-black text-white text-xs font-black tracking-widest uppercase transition-colors duration-300 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PAYMENT METHOD */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="border border-white/5 bg-zinc-900/10 backdrop-blur-xl p-8 rounded-3xl space-y-6"
                  >
                    <div className="border-b border-white/5 pb-4">
                      <h2 className="text-xl font-black uppercase tracking-wider text-white">
                        Choose Payment Method
                      </h2>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-wider mt-1">
                        Settle your dues to start baking
                      </p>
                    </div>

                    {/* Method Selector */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "cod", label: mode === "delivery" ? "Cash" : "At Outpost", sub: "Pay on delivery" },
                        { id: "upi", label: "UPI Pay", sub: "Scan QR code" },
                        { id: "card", label: "Credit Card", sub: "Visa / Master" },
                      ].map((pay) => (
                        <button
                          key={pay.id}
                          type="button"
                          onClick={() => setPaymentMethod(pay.id as any)}
                          className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition-all ${
                            paymentMethod === pay.id
                              ? "bg-primary-red/20 border-primary-red text-white"
                              : "bg-white/5 border-white/10 text-white/40 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          <span className="text-xs font-black uppercase tracking-wider">{pay.label}</span>
                          <span className="text-[8px] font-medium tracking-wide opacity-50 hidden sm:inline">
                            {pay.sub}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Sub-form based on selection */}
                    <div className="py-2">
                      {paymentMethod === "cod" && (
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center space-y-3 max-w-sm mx-auto">
                          <Info size={24} className="text-primary-red mx-auto animate-pulse" />
                          <p className="text-xs font-black uppercase tracking-widest text-white">
                            {mode === "delivery" ? "Cash On Delivery" : "Pay at Outpost"}
                          </p>
                          <p className="text-[10px] text-white/50 font-medium leading-relaxed">
                            No immediate transaction required. The messengers will collect your payment of{" "}
                            <span className="text-white font-bold">₹{grandTotal.toFixed(0)}</span> in cash at your gates. Please prepare exact change if possible.
                          </p>
                        </div>
                      )}

                      {paymentMethod === "upi" && (
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center space-y-3 max-w-sm mx-auto">
                          <Smartphone size={24} className="text-primary-red mx-auto animate-pulse" />
                          <p className="text-xs font-black uppercase tracking-widest text-white">
                            UPI Instant Payment
                          </p>
                          <p className="text-[10px] text-white/50 font-medium leading-relaxed mb-4">
                            We will generate a dynamic secure QR code linked to the Peppers Treasury. After clicking "Place Order", scan and complete the transaction.
                          </p>
                          <button
                            type="button"
                            onClick={() => setIsUPIOpen(true)}
                            className="w-full py-3 bg-white text-zinc-950 hover:bg-primary-red hover:text-white font-black text-xs uppercase tracking-widest transition-colors duration-300 rounded-xl"
                          >
                            Open QR Gate & Pay
                          </button>
                        </div>
                      )}

                      {paymentMethod === "card" && (
                        <CreditCardForm
                          number={cardNumber}
                          setNumber={setCardNumber}
                          name={cardName}
                          setName={setCardName}
                          expiry={cardExpiry}
                          setExpiry={setCardExpiry}
                          cvv={cardCvv}
                          setCvv={setCardCvv}
                        />
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 h-12 bg-transparent border border-white/10 hover:border-white/30 text-white text-xs font-black tracking-widest uppercase transition-colors duration-300 rounded-xl"
                      >
                        Back
                      </button>
                      {paymentMethod !== "upi" && (
                        <button
                          type="submit"
                          disabled={
                            isPlacingOrder ||
                            (paymentMethod === "card" && !validateCard())
                          }
                          className="flex-[2] h-12 bg-primary-red hover:bg-white hover:text-black text-white text-xs font-black tracking-widest uppercase transition-colors duration-300 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isPlacingOrder ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              Forging Seal...
                            </>
                          ) : (
                            `Place Order • ₹${grandTotal.toFixed(0)}`
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-5 border border-white/5 bg-zinc-950 rounded-3xl p-8 sticky top-36">
            <h2 className="text-xl font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <ShoppingBag size={18} className="text-primary-red" />
              Order Summary
            </h2>

            {/* Items scroll */}
            <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 mb-6 no-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-white/5 pb-4">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-900 border border-white/5">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-black uppercase tracking-wide truncate text-white">
                        {item.name}
                      </h3>
                      <span className="text-xs font-black text-white/80 ml-2">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
                        Qty: {item.quantity}
                      </span>
                      {item.customizations && item.customizations.length > 0 && (
                        <div className="flex flex-wrap gap-1 max-w-[150px] justify-end">
                          {item.customizations.map((c, i) => (
                            <span
                              key={i}
                              className="text-[8px] font-black uppercase tracking-wide bg-white/5 border border-white/10 text-white/40 px-1 rounded-sm"
                            >
                              {c.label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Billing Details */}
            <div className="space-y-3 text-xs border-b border-white/5 pb-6">
              <div className="flex justify-between font-bold text-white/60">
                <span className="uppercase tracking-wide">Subtotal</span>
                <span>₹{cartTotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-white/60">
                <span className="uppercase tracking-wide">Taxes & Charges (GST 5%)</span>
                <span>₹{gst.toFixed(0)}</span>
              </div>
              {mode === "delivery" && (
                <div className="flex justify-between font-bold text-white/60">
                  <span className="uppercase tracking-wide">Delivery Messengers</span>
                  <span>₹{deliveryFee.toFixed(0)}</span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="flex justify-between items-baseline pt-6 mb-6">
              <span className="text-sm font-black uppercase tracking-wider text-white">Total due</span>
              <span className="text-3xl font-black text-primary-red">
                ₹{grandTotal.toFixed(0)}
              </span>
            </div>

            {/* Protection Badge */}
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
              <ShieldCheck size={20} className="text-primary-red" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wider text-white">
                  Alliance Encryption
                </p>
                <p className="text-[8px] font-bold text-white/40 uppercase tracking-wide mt-0.5 leading-relaxed">
                  Baking coordinates & scrolls are safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UPI Dialog overlay */}
      <UPIDialog
        isOpen={isUPIOpen}
        onClose={() => setIsUPIOpen(false)}
        onSuccess={handleUPISuccess}
        amount={grandTotal}
      />
    </main>
  );
}
