import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { useShopify } from "@/lib/shopify-context";
import { categories } from "@/lib/data";
import { Footer } from "@/components/footer";
import { ProductSkeleton } from "@/components/product-skeleton";

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const { products, isLoading } = useShopify();
  
  const category = categories.find((c) => c.slug === slug);
  
  const categoryProducts = slug === "all" 
    ? products 
    : products.filter((p) => {
        const productType = p.productType?.toLowerCase() || "";
        const tags = p.tags.map((t) => t.toLowerCase());
        const title = p.title.toLowerCase();
        
        const categoryMappings: Record<string, string[]> = {
          "men": ["men", "mens", "men's", "male", "man"],
          "women": ["women", "womens", "women's", "female", "woman", "ladies"],
          "mens-footwear": ["men", "mens", "footwear", "shoes", "sneakers", "boots"],
          "womens-footwear": ["women", "womens", "footwear", "shoes", "heels", "boots"],
          "jewelry": ["jewelry", "jewellery", "ring", "necklace", "bracelet", "earring"],
          "leather": ["leather", "bag", "wallet", "tote", "backpack", "carry"],
          "tech": ["tech", "technology", "gadget", "smart", "electronic"],
        };
        
        const searchTerms = categoryMappings[slug || ""] || [slug || ""];
        
        return searchTerms.some((term) => 
          productType.includes(term) || 
          tags.some((tag) => tag.includes(term)) ||
          title.includes(term)
        );
      });

  if (isLoading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-14 bg-white min-h-screen"
      >
        <section className="relative h-[40vh] min-h-[280px] overflow-hidden bg-neutral-100 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 z-10" />
        </section>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12">
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

  if (!category && slug !== "all") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-black mb-4">Category not found</h1>
          <Link href="/">
            <span className="text-blue-600 hover:underline cursor-pointer">Return home</span>
          </Link>
        </div>
      </div>
    );
  }

  const displayProducts = categoryProducts;
  const categoryTitle = category?.name || "All Products";
  const categoryDescription = category?.description || "Browse our complete collection";
  const categoryImage = category?.image || products[0]?.images[0]?.src;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-14 bg-white"
      data-testid={`page-category-${slug}`}
    >
      <section className="relative h-[40vh] min-h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 z-10" />
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-2"
            >
              {categoryTitle.replace("ZENTRIX ", "").replace("Z-", "")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-white/80 text-sm md:text-base"
            >
              {categoryDescription}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
        <Link href="/">
          <span className="inline-flex items-center gap-1.5 text-blue-600 text-sm hover:underline cursor-pointer" data-testid="link-back-home">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </span>
        </Link>
      </div>

      <section className="pb-16" data-testid="products-grid-section">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <p className="text-neutral-500 text-sm">
              {displayProducts.length} {displayProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {displayProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-500 text-lg mb-4">No products found in this category</p>
              <Link href="/category/all">
                <span className="text-blue-600 hover:underline cursor-pointer">Browse all products</span>
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide scroll-smooth snap-x">
              {displayProducts.map((product, idx) => (
                <motion.div 
                  key={product.id} 
                  className="flex-shrink-0 w-[200px] snap-start group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <Link href={`/product/${product.handle}`}>
                    <div className="cursor-pointer">
                      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-xl mb-3">
                        <img
                          src={product.images[0]?.src || "https://placehold.co/400x500?text=No+Image"}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-sm font-medium text-black mb-1 group-hover:text-neutral-600 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        ${parseFloat(product.variants[0]?.price.amount || "0").toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="group"
              >
                <Link href={`/product/${product.handle}`}>
                  <div className="cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-xl mb-3">
                      <img
                        src={product.images[0]?.src || "https://placehold.co/400x500?text=No+Image"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-black mb-1 group-hover:text-neutral-600 transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      ${parseFloat(product.variants[0]?.price.amount || "0").toLocaleString()}
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
