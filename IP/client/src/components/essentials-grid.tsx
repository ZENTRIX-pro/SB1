import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import menImage from "@assets/generated_images/men_category_jacket_image.png";
import womenImage from "@assets/generated_images/women_category_dress_image.png";
import techImage from "@assets/generated_images/premium_tech_gadgets_collection.png";

interface GridCard {
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

const gridCards: GridCard[] = [
  {
    title: "Men's Collection",
    subtitle: "Refined Elegance",
    image: menImage,
    href: "/collections/men"
  },
  {
    title: "Women's Collection",
    subtitle: "Timeless Beauty",
    image: womenImage,
    href: "/collections/women"
  },
  {
    title: "Tech Lifestyle",
    subtitle: "Innovation Meets Luxury",
    image: techImage,
    href: "/collections/tech"
  }
];

export function EssentialsGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div className="text-center md:text-left flex-1">
            <p className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3">Curated For You</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
              The Essentials
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#1D1D1F]/10 flex items-center justify-center text-[#1D1D1F]/60 hover:bg-[#1D1D1F] hover:text-white transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#1D1D1F]/10 flex items-center justify-center text-[#1D1D1F]/60 hover:bg-[#1D1D1F] hover:text-white transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="flex flex-row gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-4 pb-4 [&::-webkit-scrollbar]:hidden scrollbar-hide"
      >
        <div className="flex-none w-4 md:w-[calc((100vw-1280px)/2+16px)]" />
        {gridCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-none min-w-[85vw] md:min-w-[400px] snap-center"
          >
            <Link href={card.href}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer bg-white shadow-sm">
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-white/70 text-xs tracking-[0.15em] uppercase mb-2">
                    {card.subtitle}
                  </p>
                  <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                    {card.title}
                  </h3>
                </div>
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-300" />
              </div>
            </Link>
          </motion.div>
        ))}
        <div className="flex-none w-4 md:w-[calc((100vw-1280px)/2+16px)]" />
      </div>
    </section>
  );
}
