import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCollectionByHandle, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import { ProductSkeleton } from "@/components/product-skeleton";

function formatDisplayPrice(amount: string): string {
  const price = parseFloat(amount);
  if (price > 500) {
    return `$${(price / 84).toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
}

export function TrendingSection() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: trendingProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.TRENDING);
        setProducts(trendingProducts);
      } catch (error) {
        console.error("Error loading trending products:", error);
        setProducts([]);
      }
      setIsLoading(false);
    };
    loadProducts();
  }, []);
  
  const trendingProducts = products;

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3">
                What's Hot
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
                Trending Now
              </h2>
            </div>
          </div>
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex-none min-w-[160px] w-[45vw] md:w-[380px]">
                <ProductSkeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (trendingProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3">What's Hot</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
              Trending Now
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
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
            <Link href="/collections/trending">
              <span className="text-sm text-[#1D1D1F] font-medium hover:underline transition-colors cursor-pointer">
                View All
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 md:gap-4 pb-4 px-4"
      >
        <div className="flex-none w-0 md:w-[calc((100vw-1280px)/2)]" />
        {trendingProducts.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="group flex-none snap-start min-w-[160px] w-[45vw] md:w-[380px]"
          >
            <Link href={`/product/${product.handle}`}>
              <div className="cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-white rounded-2xl mb-2 md:mb-4 shadow-sm" style={{ maxHeight: 'calc(45vw * 1.33)' }}>
                  <img
                    src={product.images[0]?.src || "https://placehold.co/400x500?text=No+Image"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-1">
                  <h3 className="font-medium text-[#1D1D1F] mb-1 group-hover:underline transition-colors text-xs md:text-sm line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-[#1D1D1F]/60 text-xs md:text-sm font-medium">
                    {formatDisplayPrice(product.variants[0]?.price.amount || "0")}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        <div className="flex-none w-4 md:w-[calc((100vw-1280px)/2)]" />
      </div>
    </section>
  );
}
