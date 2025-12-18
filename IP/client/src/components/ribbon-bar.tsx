import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { fetchCollectionsWithImages, ShopifyCollection } from "@/lib/shopify";

interface RibbonCategory {
  name: string;
  link: string;
  handle: string;
  fallbackImage: string;
}

const categoryConfig: RibbonCategory[] = [
  {
    name: "Men",
    link: "/collections/men",
    handle: "men",
    fallbackImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Women",
    link: "/collections/women",
    handle: "women",
    fallbackImage: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Active",
    link: "/collections/active",
    handle: "active",
    fallbackImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Beauty",
    link: "/collections/beauty",
    handle: "beauty",
    fallbackImage: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Scents",
    link: "/collections/scents",
    handle: "scents",
    fallbackImage: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Gifts",
    link: "/collections/gifts",
    handle: "gifts",
    fallbackImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80"
  }
];

export function RibbonBar() {
  const [location] = useLocation();
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

  return (
    <div id="category-ribbon" className="relative z-40 bg-[#F5F5F7] py-6">
      <div 
        ref={scrollRef}
        className="flex md:hidden gap-5 overflow-x-auto snap-x snap-mandatory px-4 pb-2"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categoryConfig.map((category) => {
          const isActive = location === category.link || location.startsWith(category.link + "/");
          const imageSrc = getCollectionImage(category.handle, category.fallbackImage);
          
          return (
            <Link
              key={category.name}
              href={category.link}
            >
              <div className="flex-none flex flex-col items-center gap-2 cursor-pointer group snap-start">
                <div className={`w-[72px] h-[72px] rounded-full overflow-hidden transition-all duration-300 shadow-sm ring-2 ${
                  isActive 
                    ? "ring-[#D4AF37] scale-105" 
                    : "ring-neutral-200 group-hover:ring-[#D4AF37] group-hover:scale-105"
                }`}>
                  <img
                    src={imageSrc}
                    alt={category.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isLoading ? "opacity-50" : "opacity-100"
                    }`}
                    loading="lazy"
                  />
                </div>
                <span className={`text-[10px] tracking-wide font-medium transition-colors duration-300 whitespace-nowrap ${
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-[#1D1D1F]/70 group-hover:text-[#D4AF37]"
                }`}>
                  {category.name}
                </span>
              </div>
            </Link>
          );
        })}
        <div className="flex-none w-4" />
      </div>

      <div className="hidden md:flex items-center justify-center gap-6 px-4 max-w-7xl mx-auto">
        {categoryConfig.map((category) => {
          const isActive = location === category.link || location.startsWith(category.link + "/");
          const imageSrc = getCollectionImage(category.handle, category.fallbackImage);
          
          return (
            <Link
              key={category.name}
              href={category.link}
            >
              <div className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className={`w-[100px] h-[140px] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm ${
                  isActive 
                    ? "ring-2 ring-[#D4AF37] scale-105" 
                    : "group-hover:scale-105 group-hover:shadow-lg"
                }`}>
                  <img
                    src={imageSrc}
                    alt={category.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isLoading ? "opacity-50" : "opacity-100"
                    }`}
                    loading="lazy"
                  />
                </div>
                <span className={`text-sm tracking-wide font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-[#1D1D1F]/70 group-hover:text-[#D4AF37]"
                }`}>
                  {category.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
