import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";
import { PriceDisplay } from "./price-display";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.2 }}
        className="group bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-[#D4AF37]/20 transition-colors"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-neutral-800 rounded-t-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#D4AF37] text-black text-[10px] font-medium rounded-full tracking-wide">
              NEW
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-white mb-1 truncate group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <PriceDisplay price={product.price} className="text-sm text-white/60" />
        </div>
      </motion.div>
    </Link>
  );
}
