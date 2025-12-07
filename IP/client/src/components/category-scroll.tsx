import { Link } from "wouter";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";

export function CategoryScroll() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-2xl md:text-3xl font-semibold text-black mb-6"
        >
          Shop by Category
        </motion.h2>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-4 md:px-6 pb-4 min-w-max">
          {categories.map((category, idx) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="cursor-pointer group"
              >
                <div
                  className={`relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden ${
                    idx === 0 ? "ring-2 ring-black ring-offset-2" : ""
                  }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {idx === 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-black text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-medium">
                        New
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-medium text-sm md:text-base">
                      {category.name}
                    </p>
                    <p className="text-white/70 text-xs mt-0.5 line-clamp-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
