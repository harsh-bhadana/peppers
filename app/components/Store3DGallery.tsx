"use client";

import { motion } from "framer-motion";
import Store3DCard from "./Store3DCard";

interface Store {
  id: number;
  name: string;
  location: string;
  date: string;
}

const stores: Store[] = [
  { id: 1, name: "Peppers Flagship", location: "Connaught Place, Delhi", date: "Jan 2024" },
  { id: 2, name: "Cyber Hub Alliance", location: "DLF Phase 3, Gurgaon", date: "Feb 2024" },
  { id: 3, name: "Spice District", location: "Sector 18, Noida", date: "Mar 2024" },
  { id: 4, name: "Red Heat Saket", location: "Select Citywalk, Delhi", date: "Apr 2024" },
  { id: 5, name: "Peppers Express", location: "Golf Course Road, Gurgaon", date: "May 2024" },
  ...Array.from({ length: 35 }, (_, i) => ({
    id: i + 6,
    name: `Peppers Unit #${i + 6}`,
    location: ["Hauz Khas", "Vasant Kunj", "Greater Kailash", "Dwarka", "Rohini", "Indirapuram", "Faridabad"][i % 7],
    date: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i % 7] + " 2024",
  })),
];

export default function Store3DGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-24">
      {stores.map((store, index) => (
        <Store3DCard key={store.id} store={store} index={index} />
      ))}
    </div>
  );
}
