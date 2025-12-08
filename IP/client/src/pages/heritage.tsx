import { Link } from "wouter";
import { motion } from "framer-motion";
import { useShopify } from "@/lib/shopify-context";
import { ProductSkeleton } from "@/components/product-skeleton";
import { Footer } from "@/components/footer";
import { ChevronLeft } from "lucide-react";
import artisanCraftsmanshipImage from "@assets/generated_images/artisan_hands_weaving_luxury_fabric.png";

export default function Heritage() {
  const { products, isLoading } = useShopify();
  
  const heritageProducts = products.filter((p) =>
    p.tags.some((t) => t.toLowerCase() === "heritage")
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white min-h-screen"
    >
      <section className="bg-neutral-900 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <Link href="/">
              <span className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm mb-8">
                <ChevronLeft className="w-4 h-4" />
                Back to Home
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={artisanCraftsmanshipImage}
                  alt="Artisan Craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-400/15 rounded-full blur-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 text-center lg:text-left"
            >
              <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4 font-medium">
                Indian Heritage Collection
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-amber-400 mb-6 leading-tight" style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}>
                The Royal Weave
              </h1>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Centuries of Indian craftsmanship, woven into modern luxury. Each piece celebrates 
                the artistry of master weavers and goldsmiths, reimagined for the contemporary connoisseur.
              </p>

              <div className="mt-8 pt-8 border-t border-neutral-700 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-semibold text-amber-400" style={{ fontFamily: 'Cinzel, serif' }}>50+</p>
                  <p className="text-neutral-400 text-xs uppercase tracking-wider mt-1">Artisans</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-semibold text-amber-400" style={{ fontFamily: 'Cinzel, serif' }}>100%</p>
                  <p className="text-neutral-400 text-xs uppercase tracking-wider mt-1">Handcrafted</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-semibold text-amber-400" style={{ fontFamily: 'Cinzel, serif' }}>Ltd</p>
                  <p className="text-neutral-400 text-xs uppercase tracking-wider mt-1">Edition</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-widest text-amber-600 mb-2">
              Handcrafted Excellence
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
              Heritage Collection
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <ProductSkeleton key={idx} />
              ))}
            </div>
          ) : heritageProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-neutral-500 text-lg mb-4">
                No heritage items available at the moment.
              </p>
              <p className="text-neutral-400">
                Check back soon for our exclusive handcrafted pieces.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {heritageProducts.map((product, idx) => (
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
                          <span className="bg-amber-500 text-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold">
                            Heritage
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
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
          )}
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
