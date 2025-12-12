import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";
import { PriceDisplay } from "./price-display";

interface SimpleProductCardProps {
  product: Product;
  index?: number;
}

export function SimpleProductCard({ product, index = 0 }: SimpleProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="cursor-pointer">
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800 rounded-xl mb-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.isNew && (
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#D4AF37] text-black text-[10px] font-medium rounded-full tracking-wide uppercase">
                New
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-white mb-1 group-hover:text-[#D4AF37] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <PriceDisplay price={product.price} className="text-sm text-white/60" />
        </div>
      </Link>
    </motion.div>
  );
}
