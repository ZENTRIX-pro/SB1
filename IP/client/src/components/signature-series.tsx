import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fetchCollectionByHandle, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import { ProductSkeleton } from "@/components/product-skeleton";

interface SignatureSeriesProps {
  videoUrl?: string;
  showVideoBackground?: boolean;
}

export function SignatureSeries({ 
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-luxury-watch-close-up-3752-large.mp4",
  showVideoBackground = false 
}: SignatureSeriesProps) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: signatureProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.SIGNATURE);
        setProducts(signatureProducts);
      } catch (error) {
        console.error("Error loading signature products:", error);
        setProducts([]);
      }
      setIsLoading(false);
    };
    loadProducts();
  }, []);
  
  const signatureProducts = products;

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
                Iconic pieces defined by precision and luxury
              </p>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
                The Signature Series
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (signatureProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {showVideoBackground && videoUrl && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-10"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white" />
        </div>
      )}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Iconic pieces defined by precision and luxury
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
              The Signature Series
            </h2>
          </div>
          <Link href="/collections/signature">
            <span className="text-sm text-black font-medium hover:text-neutral-600 transition-colors cursor-pointer">
              View All →
            </span>
          </Link>
        </motion.div>

        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 -mx-4 px-4">
          {signatureProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group flex-none snap-start"
              style={{ width: 'calc(75% - 8px)' }}
            >
              <Link href={`/product/${product.handle}`}>
                <div className="cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-2xl mb-4">
                    <img
                      src={product.images[0]?.src || "https://placehold.co/400x500?text=No+Image"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-semibold">
                        Signature
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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

        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {signatureProducts.map((product, idx) => (
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
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 rounded-2xl mb-4">
                    <img
                      src={product.images[0]?.src || "https://placehold.co/400x500?text=No+Image"}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500 text-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-semibold">
                        Signature
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
