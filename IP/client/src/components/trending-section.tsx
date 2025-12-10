import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCollectionByHandle, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import { ProductSkeleton } from "@/components/product-skeleton";

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
      <section className="py-12 bg-neutral-50">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                Best Sellers
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
                Trending Now
              </h2>
            </div>
          </div>
          <div className="flex gap-4 md:gap-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex-none w-[calc(66.666%-8px)] md:w-[280px]">
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
    <section className="py-12 bg-neutral-50">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Best Sellers
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
              Trending Now
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full bg-white hover:bg-neutral-100 transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full bg-white hover:bg-neutral-100 transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link href="/collections/trending">
              <span className="text-sm text-black font-medium hover:text-neutral-600 transition-colors cursor-pointer">
                View All →
              </span>
            </Link>
          </div>
        </motion.div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {trendingProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="group flex-none snap-start w-[calc(66.666%-8px)] md:w-[280px]"
            >
              <Link href={`/product/${product.handle}`}>
                <div className="cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-2xl mb-4">
                    <img
                      src={product.images[0]?.src || "https://placehold.co/400x500?text=No+Image"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-medium">
                        #{idx + 1} Trending
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-black mb-1 group-hover:text-neutral-600 transition-colors text-sm line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-neutral-500 text-sm">
                    ${parseFloat(product.variants[0]?.price.amount || "0").toLocaleString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
