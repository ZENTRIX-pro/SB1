import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCollectionsWithImages, ShopifyCollection } from "@/lib/shopify";

interface GridCard {
  title: string;
  subtitle: string;
  handle: string;
  href: string;
  fallbackImage: string;
}

const gridCardConfig: GridCard[] = [
  {
    title: "Men's Collection",
    subtitle: "Refined Elegance",
    handle: "men",
    fallbackImage: "https://images.unsplash.com/photo-1594938298603-c8148c472997?auto=format&fit=crop&w=600&q=80",
    href: "/collections/men"
  },
  {
    title: "Women's Collection",
    subtitle: "Timeless Beauty",
    handle: "women",
    fallbackImage: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=600&q=80",
    href: "/collections/women"
  },
  {
    title: "Beauty & Care",
    subtitle: "Radiant Glow",
    handle: "beauty",
    fallbackImage: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=600&q=80",
    href: "/collections/beauty"
  },
  {
    title: "Tech Lifestyle",
    subtitle: "Innovation Meets Luxury",
    handle: "tech",
    fallbackImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    href: "/collections/tech"
  }
];

export function EssentialsGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const data = await fetchCollectionsWithImages();
        setCollections(data);
      } catch (error) {
        console.error("Error loading collections:", error);
      }
    };
    loadCollections();
  }, []);

  const getCollectionImage = (handle: string, fallback: string): string => {
    const collection = collections.find(c => c.handle === handle);
    return collection?.image?.src || fallback;
  };

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
        className="flex flex-row gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory px-4 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex-none w-4 md:w-[calc((100vw-1280px)/2+16px)]" />
        {gridCardConfig.map((card, index) => {
          const imageSrc = getCollectionImage(card.handle, card.fallbackImage);
          
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-none min-w-[160px] w-[45vw] md:w-[calc((100%-32px)/4)] snap-start"
            >
              <Link href={card.href}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer">
                  <img
                    src={imageSrc}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <p className="text-white/70 text-xs tracking-[0.15em] uppercase mb-1 md:mb-2">
                      {card.subtitle}
                    </p>
                    <h3 className="text-white text-lg md:text-2xl font-semibold tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
        <div className="flex-none w-4 md:w-[calc((100vw-1280px)/2+16px)]" />
      </div>
    </section>
  );
}
