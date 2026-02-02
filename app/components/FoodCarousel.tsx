"use client";

import Image from "next/image";

const pizzaImages = [
  "/assets/menu/pizza_1.png",
  "/assets/menu/pizza_2.png",
  "/assets/menu/pizza_3.png",
  "/assets/menu/pizza_1.png",
  "/assets/menu/pizza_2.png",
];

const burgerImages = [
  "/assets/menu/burger_1.png",
  "/assets/menu/burger_2.png",
  "/assets/menu/burger_3.png",
  "/assets/menu/burger_1.png",
  "/assets/menu/burger_2.png",
];

const friesImages = [
  "/assets/menu/fries_1.png",
  "/assets/menu/fries_2.png",
  "/assets/menu/fries_3.png",
  "/assets/menu/fries_1.png",
  "/assets/menu/fries_2.png",
];

export default function FoodCarousel() {
  const MarqueeRow = ({
    images,
    direction,
  }: {
    images: string[];
    direction: "left" | "right";
  }) => (
    <div className="flex w-full overflow-hidden whitespace-nowrap py-4">
      <div
        className={`flex w-max gap-6 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
      >
        {[...images, ...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative h-[250px] w-[calc(100vw/4.5)] flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 transition-all duration-500 hover:scale-105 hover:border-primary-red/30"
          >
            <Image src={src} alt="Food Image" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-black py-24">
      <div className="container mx-auto mb-16 px-6">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary-red">
          Always Fresh
        </h2>
        <div className="mt-2 h-px w-24 bg-primary-red" />
        <h3 className="mt-4 text-4xl font-black uppercase tracking-tighter text-white md:text-6xl">
          The Alliance Menu
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        <MarqueeRow
          images={[...pizzaImages, ...burgerImages.slice(0, 2)]}
          direction="left"
        />
        <MarqueeRow
          images={[...friesImages, ...burgerImages.slice(2)]}
          direction="right"
        />
      </div>
    </section>
  );
}
