"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CreditCardFormProps {
  number: string;
  setNumber: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  expiry: string;
  setExpiry: (val: string) => void;
  cvv: string;
  setCvv: (val: string) => void;
}

export default function CreditCardForm({
  number,
  setNumber,
  name,
  setName,
  expiry,
  setExpiry,
  cvv,
  setCvv,
}: CreditCardFormProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardType, setCardType] = useState<"visa" | "mastercard" | "amex" | "generic">("generic");

  useEffect(() => {
    // Basic card type detection
    const cleanNumber = number.replace(/\D/g, "");
    if (cleanNumber.startsWith("4")) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(cleanNumber)) {
      setCardType("mastercard");
    } else if (/^3[47]/.test(cleanNumber)) {
      setCardType("amex");
    } else {
      setCardType("generic");
    }
  }, [number]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const clean = value.replace(/\D/g, "");
    if (clean.length >= 2) {
      return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
    }
    return clean;
  };

  const getCardLogo = () => {
    switch (cardType) {
      case "visa":
        return <span className="italic font-black text-white text-2xl tracking-tight">VISA</span>;
      case "mastercard":
        return (
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-red-500 opacity-90" />
            <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-90" />
          </div>
        );
      case "amex":
        return <span className="font-extrabold text-[#0070d2] bg-white px-2 py-0.5 rounded text-sm tracking-tighter">AMEX</span>;
      default:
        return <span className="text-[10px] tracking-widest font-black uppercase text-white/40">ALLIANCE CARD</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-sm mx-auto w-full">
      {/* Visual Card Representation */}
      <div className="relative w-full aspect-[1.586/1] [perspective:1000px] cursor-default select-none">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full h-full relative [transform-style:preserve-3d] rounded-2xl border border-white/10 shadow-[0_15px_40px_rgba(255,59,48,0.15)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 overflow-hidden"
        >
          {/* Card Front */}
          <div className="absolute inset-0 w-full h-full p-6 flex flex-col justify-between [backface-visibility:hidden] z-10">
            {/* Background elements */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-red/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start relative z-10">
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary-red">Alliance Shield</span>
                <span className="text-xs font-bold text-white/50">Premium Vault Card</span>
              </div>
              <div className="h-8 flex items-center">{getCardLogo()}</div>
            </div>

            {/* Chip */}
            <div className="w-10 h-8 rounded-md bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 border border-yellow-400/30 shadow-inner relative z-10">
              <div className="absolute inset-x-2 inset-y-1 border border-yellow-200/20 rounded opacity-60" />
            </div>

            {/* Card Number */}
            <div className="text-xl md:text-2xl font-mono tracking-[0.15em] text-white/90 font-bold my-2 relative z-10">
              {number || "•••• •••• •••• ••••"}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end relative z-10">
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-0.5">Card Holder</span>
                <span className="text-xs font-black uppercase tracking-wider text-white truncate max-w-[200px]">
                  {name || "YOUR NAME"}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-0.5">Expires</span>
                <span className="text-xs font-mono font-black text-white">{expiry || "MM/YY"}</span>
              </div>
            </div>
          </div>

          {/* Card Back */}
          <div
            className="absolute inset-0 w-full h-full py-6 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Magnetic Strip */}
            <div className="w-full h-10 bg-black mt-2" />

            {/* Signature Area + CVV */}
            <div className="px-6 flex items-center justify-between gap-4 mt-2">
              <div className="flex-1 h-8 bg-white/10 rounded border border-white/5 relative">
                {/* Visual lines for signature */}
                <div className="absolute inset-y-0 left-2 right-2 flex flex-col justify-center gap-1 opacity-20">
                  <div className="h-px bg-white w-full" />
                  <div className="h-px bg-white w-3/4" />
                  <div className="h-px bg-white w-5/6" />
                </div>
              </div>
              <div className="flex flex-col items-end flex-shrink-0">
                <span className="text-[8px] font-black uppercase tracking-widest text-white/40 mb-1">CVV</span>
                <div className="bg-white text-zinc-950 font-mono font-bold px-3 py-1 rounded text-sm w-12 text-center h-7 flex items-center justify-center shadow-md">
                  {cvv || "•••"}
                </div>
              </div>
            </div>

            {/* Back Footer */}
            <div className="px-6 text-[8px] font-medium uppercase tracking-[0.2em] text-white/20 text-center leading-relaxed">
              Issued under authorization of Peppers Pizza Outposts. <br />
              Keep secure. For use only in the Alliance Kingdom.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Input Fields */}
      <div className="space-y-4">
        {/* Card Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">Card Number</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={19}
            value={number}
            onChange={(e) => setNumber(formatCardNumber(e.target.value))}
            placeholder="4111 2222 3333 4444"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
          />
        </div>

        {/* Cardholder Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">Cardholder Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
          />
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">Expiry Date</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.22em] text-white/40">CVV</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
              onFocus={() => setIsFlipped(true)}
              onBlur={() => setIsFlipped(false)}
              placeholder="123"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder:text-white/20 outline-none focus:border-primary-red/60 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
