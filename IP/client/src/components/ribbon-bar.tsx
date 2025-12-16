import { useState, useEffect } from "react";
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
    name: "Tech",
    link: "/collections/tech",
    handle: "tech",
    fallbackImage: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Home",
    link: "/collections/home",
    handle: "home",
    fallbackImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Scents",
    link: "/collections/scents",
    handle: "scents",
    fallbackImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=300&q=80"
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
    <div id="category-ribbon" className="sticky top-14 z-40 bg-transparent">
      <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex items-center justify-start md:justify-center gap-6 md:gap-8 px-4 py-4 min-w-max max-w-7xl mx-auto">
          {categoryConfig.map((category) => {
            const isActive = location === category.link || location.startsWith(category.link + "/");
            const imageSrc = getCollectionImage(category.handle, category.fallbackImage);
            
            return (
              <Link
                key={category.name}
                href={category.link}
              >
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className={`w-[70px] h-[70px] md:w-20 md:h-20 rounded-full overflow-hidden transition-transform duration-300 ${
                    isActive 
                      ? "opacity-100 scale-105" 
                      : "group-hover:scale-110"
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
                  <span className={`text-xs tracking-wide font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[#1D1D1F]"
                      : "text-[#1D1D1F]/60 group-hover:text-[#1D1D1F]"
                  }`}>
                    {category.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
