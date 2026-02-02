"use client";

export default function GoogleStoresMap() {
  // Using a premium dark-themed Google Maps embed centered on the Alliance's territory (India Hub)
  // This provides a real-world perspective to complement the stylized territory map.
  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-white/5 bg-zinc-950 shadow-2xl">
      <div className="h-[500px] w-full relative group overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Peppers%20Pizza,Delhi,India&t=&z=10&ie=UTF8&iwloc=B&output=embed"
          className="border-0 w-full h-full grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 scale-[1.01]"
        ></iframe>
        
        {/* Subtle overlay to enhance the premium feel */}
        <div className="absolute inset-0 pointer-events-none bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
      </div>
    </section>
  );
}
