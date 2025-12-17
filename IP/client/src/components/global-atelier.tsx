import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
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

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3">Global Inspiration</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
            World of ZENTRIX
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
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
                  <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer">
                    <img
                      src={imageSrc}
                      alt={location.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                        isLoading ? "opacity-50" : "opacity-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-6">
                      <p className="text-white/60 text-[10px] md:text-xs tracking-[0.2em] uppercase mb-1 transition-colors duration-300 group-hover:text-[#D4AF37]">
                        {location.country}
                      </p>
                      <h3 className="text-white text-sm md:text-xl font-semibold tracking-tight mb-1 md:mb-2 transition-colors duration-300 group-hover:text-[#D4AF37]">
                        {location.name}
                      </h3>
                      <p className="text-white/70 text-[10px] md:text-xs leading-relaxed line-clamp-2 hidden md:block">
                        {location.description}
                      </p>
                      <span className="inline-flex items-center text-white text-[10px] md:text-sm font-medium mt-2 transition-colors duration-300 group-hover:text-[#D4AF37]">
                        Explore
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
