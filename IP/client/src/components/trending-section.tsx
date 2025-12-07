import { Link } from "wouter";
import { motion } from "framer-motion";
import { products } from "@/lib/data";

const trendingProducts = products.slice(0, 3);

export function TrendingSection() {
  return (
    <section className="py-12 px-4 md:px-6 bg-neutral-50">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Best Sellers
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
              Trending Now
            </h2>
          </div>
          <Link href="/category/all">
            <span className="text-sm text-black font-medium hover:text-neutral-600 transition-colors cursor-pointer">
              View All →
            </span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group"
            >
              <Link href={`/product/${product.id}`}>
                <div className="cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-2xl mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-black text-white text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-medium">
                        #{idx + 1} Trending
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-black mb-1 group-hover:text-neutral-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-neutral-500">
                    ${product.price.toLocaleString()}
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
