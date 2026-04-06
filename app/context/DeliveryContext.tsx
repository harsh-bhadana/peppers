"use client";

import React, { createContext, useContext, useState } from "react";

export type DeliveryMode = "delivery" | "pickup";
export type OrderStage =
  | null
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered";

type DeliveryContextType = {
  mode: DeliveryMode;
  setMode: (mode: DeliveryMode) => void;
  pincode: string;
  setPincode: (pincode: string) => void;
  isPincodeValid: boolean | null;
  setIsPincodeValid: (valid: boolean | null) => void;
  orderStage: OrderStage;
  setOrderStage: (stage: OrderStage) => void;
};

const DeliveryContext = createContext<DeliveryContextType | undefined>(
  undefined
);

// Major Indian city pincodes that are "serviceable"
const VALID_PINCODES = [
  "400001", "400002", "400003", "400051", "400076", // Mumbai
  "110001", "110002", "110003", "110051", "110092", // Delhi
  "560001", "560002", "560034", "560076", "560100", // Bengaluru
  "500001", "500002", "500032", "500081",            // Hyderabad
  "600001", "600002", "600028", "600100",            // Chennai
  "700001", "700002", "700019", "700064",            // Kolkata
  "411001", "411002", "411007", "411028",            // Pune
  "380001", "380006", "380015", "380052",            // Ahmedabad
  "302001", "302002", "302012", "302019",            // Jaipur
  "226001", "226010", "226020",                      // Lucknow
];

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<DeliveryMode>("delivery");
  const [pincode, setPincode] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState<boolean | null>(null);
  const [orderStage, setOrderStage] = useState<OrderStage>(null);

  return (
    <DeliveryContext.Provider
      value={{
        mode,
        setMode,
        pincode,
        setPincode,
        isPincodeValid,
        setIsPincodeValid,
        orderStage,
        setOrderStage,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error("useDelivery must be used within a DeliveryProvider");
  }
  return context;
}

export { VALID_PINCODES };
