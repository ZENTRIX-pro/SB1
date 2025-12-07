import { motion } from "framer-motion";
import { SimpleProductCard } from "@/components/simple-product-card";
import { getNewArrivals } from "@/lib/data";

export function NewArrivals() {
  const newArrivals = getNewArrivals();

  return (
    <section className="py-12 px-4 md:px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
            Just Dropped
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
            New Arrivals
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.slice(0, 8).map((product, idx) => (
            <SimpleProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
