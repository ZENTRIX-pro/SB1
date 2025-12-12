import { useParams } from "wouter";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { fetchCollectionByHandle, ShopifyProduct, ShopifyCollection, formatPrice } from "@/lib/shopify";
import { categories } from "@/lib/data";
import { Footer } from "@/components/footer";
import { ProductSkeleton } from "@/components/product-skeleton";

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collection, setCollection] = useState<ShopifyCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    const loadCollection = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const { collection: fetchedCollection, products: fetchedProducts } = await fetchCollectionByHandle(slug);
        setCollection(fetchedCollection);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(`Error loading collection ${slug}:`, error);
        setProducts([]);
        setCollection(null);
      }
      setIsLoading(false);
    };
    loadCollection();
  }, [slug]);
  
  const categoryProducts = products;

  if (isLoading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-14 bg-neutral-950 min-h-screen"
      >
        <section className="relative h-[40vh] min-h-[280px] overflow-hidden bg-neutral-900 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 z-10" />
        </section>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        </div>
        <Footer />
      </motion.main>
    );
  }

  if (!collection && !category && slug !== "all" && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 pt-14">
        <div className="text-center">
          <h1 className="text-2xl font-light text-white mb-4">Collection not found</h1>
          <Link href="/">
            <span className="text-[#D4AF37] hover:underline cursor-pointer">Return home</span>
          </Link>
        </div>
      </div>
    );
  }

  const displayProducts = categoryProducts;
  const categoryTitle = collection?.title || category?.name || slug?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "All Products";
  const categoryDescription = collection?.description || category?.description || "Browse our curated collection";
  const categoryImage = collection?.image?.src || category?.image || products[0]?.images[0]?.src;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-14 bg-neutral-950"
      data-testid={`page-category-${slug}`}
    >
      <section className="relative h-[40vh] min-h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 z-10" />
        {categoryImage && (
          <motion.img
            src={categoryImage}
            alt={categoryTitle}
            className="w-full h-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3"
            >
              Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl md:text-5xl font-light text-white tracking-wide mb-2"
            >
              {categoryTitle.replace("ZENTRIX ", "").replace("Z-", "")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-white/60 text-sm md:text-base"
            >
              {categoryDescription}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Link href="/">
          <span className="inline-flex items-center gap-1.5 text-[#D4AF37] text-sm hover:underline cursor-pointer" data-testid="link-back-home">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </span>
        </Link>
      </div>

      <section className="pb-16" data-testid="products-grid-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-white/50 text-sm">
              {displayProducts.length} {displayProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {displayProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/50 text-lg mb-4">No products found in this collection</p>
              <Link href="/collections/men">
                <span className="text-[#D4AF37] hover:underline cursor-pointer">Browse Men's Collection</span>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.05, 0.3), duration: 0.3 }}
                className="group"
              >
                <Link href={`/product/${product.handle}`}>
                  <div className="cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800 rounded-xl mb-2 md:mb-3">
                      <img
                        src={product.images[0]?.src || "https://placehold.co/400x500?text=No+Image"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-white mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/60">
                      {formatPrice(product.variants[0]?.price.amount || "0")}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
