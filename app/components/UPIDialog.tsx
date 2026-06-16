"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, Smartphone, ShieldCheck } from "lucide-react";

interface UPIDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
}

export default function UPIDialog({ isOpen, onClose, onSuccess, amount }: UPIDialogProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(300);
    setIsVerifying(false);
    setIsDone(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || timeLeft <= 0 || isVerifying || isDone) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft, isVerifying, isDone]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsDone(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-3xl p-8 shadow-2xl z-10 flex flex-col items-center text-center overflow-hidden"
        >
          {/* Top red glow accent */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary-red to-transparent" />
          <div className="absolute -top-24 w-48 h-48 bg-primary-red/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>

          {!isDone ? (
            <>
              {/* Header */}
              <div className="mb-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-primary-red/10 border border-primary-red/20 flex items-center justify-center text-primary-red mb-3">
                  <Smartphone size={24} className="animate-bounce" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-widest text-white">
                  UPI Treasury Gate
                </h2>
                <p className="text-xs text-white/40 font-bold uppercase tracking-wider mt-1">
                  Peppers Pizza Merchant
                </p>
              </div>

              {/* Amount */}
              <div className="mb-6 bg-white/5 border border-white/5 rounded-2xl px-6 py-3 w-full">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-0.5">
                  Amount Due
                </span>
                <span className="text-3xl font-black text-primary-red">
                  ₹{amount.toFixed(0)}
                </span>
              </div>

              {/* QR Code Container */}
              <div className="relative p-6 bg-white rounded-2xl mb-6 shadow-xl w-48 h-48 flex items-center justify-center">
                {/* Styled SVG QR Code */}
                <svg
                  width="140"
                  height="140"
                  viewBox="0 0 100 100"
                  className="text-zinc-950 fill-current"
                >
                  {/* Position detection boxes */}
                  <rect x="0" y="0" width="25" height="25" />
                  <rect x="2" y="2" width="21" height="21" fill="white" />
                  <rect x="6" y="6" width="13" height="13" />

                  <rect x="75" y="0" width="25" height="25" />
                  <rect x="77" y="2" width="21" height="21" fill="white" />
                  <rect x="81" y="6" width="13" height="13" />

                  <rect x="0" y="75" width="25" height="25" />
                  <rect x="2" y="77" width="21" height="21" fill="white" />
                  <rect x="6" y="81" width="13" height="13" />

                  {/* Random QR code blocks */}
                  <rect x="35" y="5" width="5" height="15" />
                  <rect x="45" y="0" width="10" height="5" />
                  <rect x="60" y="10" width="5" height="10" />
                  <rect x="30" y="25" width="15" height="5" />
                  <rect x="55" y="25" width="5" height="15" />
                  <rect x="65" y="20" width="10" height="5" />

                  <rect x="5" y="35" width="15" height="5" />
                  <rect x="0" y="45" width="5" height="10" />
                  <rect x="15" y="50" width="10" height="5" />
                  <rect x="10" y="60" width="5" height="10" />

                  <rect x="75" y="35" width="10" height="5" />
                  <rect x="90" y="45" width="10" height="10" />
                  <rect x="80" y="60" width="5" height="5" />

                  <rect x="35" y="45" width="30" height="30" fill="red" className="opacity-10" />
                  <rect x="40" y="40" width="5" height="15" />
                  <rect x="50" y="35" width="15" height="5" />
                  <rect x="60" y="45" width="5" height="10" />
                  <rect x="35" y="60" width="15" height="5" />
                  <rect x="55" y="55" width="10" height="5" />
                  <rect x="45" y="70" width="15" height="5" />

                  <rect x="35" y="80" width="5" height="15" />
                  <rect x="45" y="85" width="15" height="5" />
                  <rect x="65" y="80" width="5" height="10" />
                  <rect x="60" y="90" width="15" height="5" />
                  
                  {/* Central branding dot */}
                  <rect x="42" y="42" width="16" height="16" fill="white" rx="4" />
                  <circle cx="50" cy="50" r="5" fill="#ff3b30" />
                </svg>

                {/* Loading state overlay for QR */}
                {isVerifying && (
                  <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-white">
                    <Loader2 size={36} className="animate-spin text-primary-red mb-3" />
                    <span className="text-xs font-black uppercase tracking-widest text-white/60">
                      Verifying...
                    </span>
                  </div>
                )}
              </div>

              {/* Timer */}
              <div className="flex items-center gap-2 text-xs font-bold text-white/50 mb-8">
                <span>QR expires in:</span>
                <span className="font-mono text-primary-red font-black text-sm bg-white/5 px-2.5 py-1 rounded border border-white/5">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Actions */}
              <div className="w-full space-y-3">
                <button
                  onClick={handleSimulatePayment}
                  disabled={isVerifying}
                  className="w-full h-12 bg-primary-red hover:bg-white hover:text-black text-white text-xs font-black tracking-widest uppercase transition-colors duration-300 rounded-xl flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Checking Treasury...
                    </>
                  ) : (
                    "Simulate Payment Success"
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white/30">
                  <ShieldCheck size={11} className="text-green-500" />
                  Secure 256-bit encrypted channel
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-16 flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 mb-6">
                <CheckCircle size={48} className="animate-pulse" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-2">
                Treasury Cleared
              </h3>
              <p className="text-sm text-white/50 font-bold uppercase tracking-wider">
                Payment Received Successfully!
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
