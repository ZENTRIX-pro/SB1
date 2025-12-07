import { useState } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { categories, getProductsByCategory } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { CheckoutModal } from "@/components/checkout-modal";
import { Footer } from "@/components/footer";
import type { Product } from "@shared/schema";

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const products = getProductsByCategory(slug || "");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleBuyNow = (_product: Product) => {
    setCheckoutOpen(true);
  };

  if (!category) {
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

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-14 bg-white"
        data-testid={`page-category-${slug}`}
      >
        <section className="relative h-[40vh] min-h-[280px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 z-10" />
          <motion.img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center px-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-2"
              >
                {category.name.replace("ZENTRIX ", "").replace("Z-", "")}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-white/80 text-sm md:text-base"
              >
                {category.description}
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
                {products.length} {products.length === 1 ? "product" : "products"}
              </p>
            </div>

            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide scroll-smooth snap-x">
                {products.map((product, idx) => (
                  <div key={product.id} className="flex-shrink-0 w-[200px] snap-start">
                    <ProductCard product={product} index={idx} onBuyNow={handleBuyNow} />
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} onBuyNow={handleBuyNow} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </motion.main>

      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
