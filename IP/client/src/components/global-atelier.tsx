import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { fetchCollectionsWithImages, ShopifyCollection } from "@/lib/shopify";

import nordicImage from "@assets/generated_images/nordic_minimalist_interior_design.png";
import italianImage from "@assets/generated_images/italian_leather_texture_close-up.png";
import japaneseImage from "@assets/generated_images/japanese_zen_garden_ceramics.png";
import indianImage from "@assets/generated_images/indian_silk_ornate_pattern.png";

interface AtelierLocation {
  id: string;
  name: string;
  country: string;
  description: string;
  href: string;
  collectionHandle: string;
  fallbackImage: string;
}

const locationConfig: AtelierLocation[] = [
  {
    id: "sweden",
    name: "Nordic Zen",
    country: "Sweden",
    description: "Minimalist design philosophy meets premium craftsmanship",
    href: "/collections/nordic-zen",
    collectionHandle: "nordic-zen",
    fallbackImage: nordicImage
  },
  {
    id: "italy",
    name: "Italian Classico",
    country: "Italy",
    description: "Heritage luxury with timeless Mediterranean elegance",
    href: "/collections/italian-classico",
    collectionHandle: "italian-classico",
    fallbackImage: italianImage
  },
  {
    id: "japan",
    name: "Eastern Soul",
    country: "Japan",
    description: "Where ancient tradition meets cutting-edge innovation",
    href: "/collections/eastern-soul",
    collectionHandle: "eastern-soul",
    fallbackImage: japaneseImage
  },
  {
    id: "india",
    name: "Royal Heritage",
    country: "India",
    description: "Opulent craftsmanship inspired by centuries of artistry",
    href: "/collections/heritage",
    collectionHandle: "heritage",
    fallbackImage: indianImage
  }
];

export function GlobalAtelier() {
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const data = await fetchCollectionsWithImages();
        setCollections(data);
      } catch (error) {
        console.error("Error loading collections:", error);
      }
      setIsLoading(false);
    };
    loadCollections();
  }, []);

  const getCollectionImage = (handle: string, fallback: string): string => {
    const collection = collections.find(c => c.handle === handle);
    return collection?.image?.src || fallback;
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div className="text-center md:text-left flex-1">
            <p className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3">Global Inspiration</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
              World of ZENTRIX
            </h2>
          </div>
          <div className="flex md:hidden gap-2">
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
        className="md:hidden flex flex-row flex-nowrap gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {locationConfig.map((location, index) => {
          const imageSrc = getCollectionImage(location.collectionHandle, location.fallbackImage);
          
          return (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-none min-w-[160px] w-[45vw] md:w-[380px] snap-start"
            >
              <Link href={location.href}>
                <div className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]" style={{ maxHeight: 'calc(45vw * 1.33)' }}>
                  <img
                    src={imageSrc}
                    alt={location.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      isLoading ? "opacity-50" : "opacity-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase mb-1 transition-colors duration-300 group-hover:text-[#D4AF37]">
                      {location.country}
                    </p>
                    <h3 className="text-white text-base font-semibold tracking-tight mb-1 transition-colors duration-300 group-hover:text-[#D4AF37]">
                      {location.name}
                    </h3>
                    <span className="inline-flex items-center text-white text-xs font-medium mt-1 transition-colors duration-300 group-hover:text-[#D4AF37]">
                      Explore
                      <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
        <div className="flex-none w-4" />
      </div>

      <div className="hidden md:grid max-w-7xl mx-auto px-4 grid-cols-4 gap-6">
        {locationConfig.map((location, index) => {
          const imageSrc = getCollectionImage(location.collectionHandle, location.fallbackImage);
          
          return (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={location.href}>
                <div className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] md:h-[600px] md:aspect-auto">
                  <img
                    src={imageSrc}
                    alt={location.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      isLoading ? "opacity-50" : "opacity-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-1 transition-colors duration-300 group-hover:text-[#D4AF37]">
                      {location.country}
                    </p>
                    <h3 className="text-white text-xl font-semibold tracking-tight mb-2 transition-colors duration-300 group-hover:text-[#D4AF37]">
                      {location.name}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                      {location.description}
                    </p>
                    <span className="inline-flex items-center text-white text-sm font-medium mt-2 transition-colors duration-300 group-hover:text-[#D4AF37]">
                      Explore
                      <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
