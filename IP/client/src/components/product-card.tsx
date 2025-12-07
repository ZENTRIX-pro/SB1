import { Link } from "wouter";
import { motion } from "framer-motion";
import type { Product } from "@shared/schema";

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
        className="group bg-white rounded-2xl overflow-hidden cursor-pointer"
        data-testid={`card-product-${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-[#F5F5F7] rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-black text-white text-[10px] font-medium rounded-full tracking-wide">
              NEW
            </span>
          )}
        </div>

        <div className="pt-3 pb-1">
          <h3 className="text-sm font-medium text-black mb-0.5 truncate group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-500">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
