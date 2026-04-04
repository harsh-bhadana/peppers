import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pepper's Pizza | A Brothers Alliance",
  description: "The finest crafted pizza from the Alliance Kingdom. Premium ingredients, masterful creation.",
  keywords: ["pizza", "alliance", "pepper's pizza", "brothers alliance", "premium pizza"],
};

import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${inter.variable} font-sans antialiased bg-black text-white`}
      >
        <CartProvider>
          <Header />
          <CartSidebar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
