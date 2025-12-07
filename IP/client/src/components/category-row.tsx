import { Link } from "wouter";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";

export function CategoryRow() {
  return (
    <section className="py-8 px-4 md:px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-xl font-semibold text-black mb-4">
          Shop by Category
        </h2>

        <div className="md:hidden">
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide scroll-smooth snap-x snap-mandatory">
            {categories.map((category, idx) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex-shrink-0 snap-start w-32 cursor-pointer"
                >
                  <div className="w-32 h-32 bg-[#F5F5F7] rounded-2xl overflow-hidden flex items-center justify-center p-3 mb-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <p className="text-sm font-medium text-black text-center truncate">
                    {category.name.replace("ZENTRIX ", "").replace("Z-", "")}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, idx) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer group"
              >
                <div className="aspect-square bg-[#F5F5F7] rounded-2xl overflow-hidden flex items-center justify-center p-3 mb-2 group-hover:bg-neutral-200 transition-colors">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <p className="text-xs font-medium text-black text-center">
                  {category.name.replace("ZENTRIX ", "").replace("Z-", "")}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
