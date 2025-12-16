import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { ShopifyProduct, buildCheckoutUrl } from "@/lib/shopify";
import { Footer } from "@/components/footer";
import { ProductSkeleton } from "@/components/product-skeleton";
import { useCurrency } from "@/lib/currency-context";

interface StoryLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  products: ShopifyProduct[];
  isLoading: boolean;
  accentColor?: string;
}

export function StoryLayout({
  title,
  subtitle,
  description,
  heroImage,
  products,
  isLoading,
  accentColor = "amber",
}: StoryLayoutProps) {
  const { formatPrice } = useCurrency();
  
  const handleBuyNow = (product: ShopifyProduct) => {
    const variant = product.variants[0];
    if (variant) {
      const checkoutUrl = buildCheckoutUrl(variant.id, 1);
      window.location.href = checkoutUrl;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/70 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light">
              {subtitle}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              {description}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-6 left-4 md:left-8 z-20"
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer text-sm backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <ChevronLeft className="w-4 h-4" />
              Back to Home
            </span>
          </Link>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
              The Collection
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-black">
              Curated For You
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg">
                No products found in this collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
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
                      </div>
                      <h3 className="font-medium text-black mb-1 group-hover:text-neutral-600 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-neutral-500">
                        {formatPrice(product.variants[0]?.price.amount || "0", product.variants[0]?.price.currencyCode)}
                      </p>
                    </div>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBuyNow(product)}
                    className="w-full mt-3 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
                  >
                    Buy Now
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
