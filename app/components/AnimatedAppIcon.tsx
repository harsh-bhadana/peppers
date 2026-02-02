"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone } from "lucide-react";

interface AnimatedAppIconProps {
  type: "apple" | "android";
  isHovered?: boolean;
}

const AppleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.14-1.05.08-2.32.84-3.03 1.98-.64 1.02-1.19 2.15-0.97 3.23 1.17.13 2.21-.6 2.93-2.07z"/>
  </svg>
);

const AndroidLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.0523-.5386.4158.4158 0 00-.5398-.0232l-2.0195 3.4975C15.8697 8.086 14.102 7.6 12 7.6c-2.102 0-3.8696.486-5.2672 1.22l-2.0195-3.4998a.417.417 0 00-.5398.0255.4194.4194 0 00-.0523.5386l1.9973 3.4569C2.7936 10.963 0 15.3553 0 20.457h24c0-5.1017-2.7936-9.494-6.1185-11.1356"/>
  </svg>
);

export default function AnimatedAppIcon({ type, isHovered = false }: AnimatedAppIconProps) {
  return (
    <div className="relative w-5 h-5 flex items-center justify-center text-white/40 group-hover:text-primary-red transition-colors">
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="phone"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Smartphone className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="brand"
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {type === "apple" ? <AppleLogo /> : <AndroidLogo />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
