import { Link } from "wouter";
import { motion } from "framer-motion";
import { useShopify } from "@/lib/shopify-context";
import { ProductSkeleton } from "@/components/product-skeleton";

export function NewArrivals() {
  const { products, isLoading } = useShopify();
  
  const newArrivals = products.filter((p) => 
    p.tags.some((t) => t.toLowerCase() === "new" || t.toLowerCase() === "new arrival")
  );
  
  const displayProducts = newArrivals.length > 0 ? newArrivals : products.slice(0, 8);

  if (isLoading) {
    return (
      <section className="py-12 px-4 md:px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                Just Dropped
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
                New Arrivals
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
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
    <section className="py-12 px-4 md:px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Just Dropped
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
              New Arrivals
            </h2>
          </div>
          <Link href="/category/all">
            <span className="text-sm text-black font-medium hover:text-neutral-600 transition-colors cursor-pointer">
              View All →
            </span>
          </Link>
        </motion.div>

        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 -mx-4 px-4">
          {displayProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group flex-none snap-start"
              style={{ width: 'calc(66.666% - 8px)' }}
            >
              <Link href={`/product/${product.handle}`}>
                <div className="cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50 rounded-2xl mb-3">
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

        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group"
            >
              <Link href={`/product/${product.handle}`}>
                <div className="cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50 rounded-2xl mb-3">
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
                  <h3 className="font-medium text-black mb-1 group-hover:text-neutral-600 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-neutral-500">
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
