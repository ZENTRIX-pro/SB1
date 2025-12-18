import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCollectionByHandle, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import { ProductSkeleton } from "@/components/product-skeleton";

export function NewArrivals() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: newProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.NEW);
        setProducts(newProducts);
      } catch (error) {
        console.error("Error loading new arrivals:", error);
        setProducts([]);
      }
      setIsLoading(false);
    };
    loadProducts();
  }, []);
  
  const displayProducts = products;

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
      <section className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div className="text-center md:text-left flex-1">
              <p className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3">
                Just Dropped
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-[0.1em]">
                New Arrivals
              </h2>
            </div>
          </div>
          <div className="flex flex-row gap-3 md:gap-6 overflow-hidden px-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex-none min-w-[160px] w-[45vw] md:w-[calc((100vw-1280px-48px)/4)]">
                <ProductSkeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div className="text-center md:text-left flex-1">
            <p className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3">
              Just Dropped
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-[0.1em]">
              New Arrivals
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

        <div 
          ref={scrollContainerRef}
          className="flex flex-row gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory px-0 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex-none w-4 md:w-[calc((100vw-1280px)/2+16px)]" />
          {displayProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.12, duration: 0.9, ease: "easeOut" }}
              className="group flex-none min-w-[160px] w-[45vw] md:w-[calc((100vw-1280px-48px)/4)] snap-start h-full flex flex-col"
            >
              <Link href={`/product/${product.handle}`}>
                <div className="cursor-pointer flex flex-col h-full">
                  <div className="relative flex-1 min-h-0 aspect-[3/4] overflow-hidden bg-neutral-50 rounded-2xl mb-3">
                    <img
                      src={product.images[0]?.src || "https://placehold.co/400x500?text=No+Image"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-black text-white text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-medium">
                        New
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-black mb-1 group-hover:text-neutral-600 transition-colors text-xs md:text-sm line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-neutral-500 text-xs md:text-sm">
                    ${parseFloat(product.variants[0]?.price.amount || "0").toLocaleString()}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
          <div className="flex-none w-4 md:w-[calc((100vw-1280px)/2+16px)]" />
        </div>
      </div>
    </section>
  );
}
