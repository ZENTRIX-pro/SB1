import { motion } from "framer-motion";
import { Link } from "wouter";
import menGiftImage from "@assets/generated_images/luxury_wallet_product_shot.png";
import womenGiftImage from "@assets/generated_images/luxury_leather_bag_product.png";

export function GiftGuide() {
  return (
    <section className="py-24 md:py-32 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">The Art of Gifting</p>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide">
            Gift Guide
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/collections/men">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer">
                <img
                  src={menGiftImage}
                  alt="Gifts for Him"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">
                    Curated Selection
                  </p>
                  <h3 className="text-white text-3xl md:text-4xl font-light tracking-wide mb-4">
                    For Him
                  </h3>
                  <span className="inline-block px-6 py-2 border border-white/30 text-white text-sm tracking-[0.15em] uppercase group-hover:bg-white group-hover:text-black transition-all duration-300">
                    Explore
                  </span>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37]/20 rounded-2xl transition-colors duration-300" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/collections/jewelry">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer">
                <img
                  src={womenGiftImage}
                  alt="Gifts for Her"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">
                    Curated Selection
                  </p>
                  <h3 className="text-white text-3xl md:text-4xl font-light tracking-wide mb-4">
                    For Her
                  </h3>
                  <span className="inline-block px-6 py-2 border border-white/30 text-white text-sm tracking-[0.15em] uppercase group-hover:bg-white group-hover:text-black transition-all duration-300">
                    Explore
                  </span>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37]/20 rounded-2xl transition-colors duration-300" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
