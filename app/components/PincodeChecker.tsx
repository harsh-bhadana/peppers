"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useDelivery, VALID_PINCODES } from "../context/DeliveryContext";

export default function PincodeChecker() {
  const { pincode, setPincode, isPincodeValid, setIsPincodeValid } = useDelivery();
  const [isChecking, setIsChecking] = useState(false);
  const [inputValue, setInputValue] = useState(pincode);

  const handleCheck = async () => {
    if (inputValue.length !== 6) return;
    setIsChecking(true);
    setIsPincodeValid(null);

    // Simulate a network call
    await new Promise((r) => setTimeout(r, 1000));

    const valid = VALID_PINCODES.includes(inputValue);
    setPincode(inputValue);
    setIsPincodeValid(valid);
    setIsChecking(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCheck();
  };

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 flex items-center gap-2">
        <MapPin size={10} />
        Check Delivery Availability
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value.replace(/\D/g, ""));
            setIsPincodeValid(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter Pincode"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
        />
        <button
          onClick={handleCheck}
          disabled={inputValue.length !== 6 || isChecking}
          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-primary-red border border-white/10 hover:border-primary-red text-white text-xs font-black uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isChecking ? <Loader2 size={16} className="animate-spin" /> : "Check"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isPincodeValid === true && (
          <motion.div
            key="valid"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-2 text-green-400 text-xs font-bold"
          >
            <CheckCircle2 size={14} />
            Great! We deliver to <span className="text-white">{pincode}</span>
          </motion.div>
        )}
        {isPincodeValid === false && (
          <motion.div
            key="invalid"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-2 text-red-400 text-xs font-bold"
          >
            <XCircle size={14} />
            Sorry, we don&apos;t deliver to <span className="text-white">{inputValue}</span> yet
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
