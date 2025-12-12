import { motion } from "framer-motion";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/cinematic_luxury_fashion_hero.png";

export function HeroAutoSlider() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-[#F5F5F7]">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="ZENTRIX Luxury Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <p className="text-white/70 text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            The Future of Luxury
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-8">
            ZENTRIX
          </h1>
          <Link href="/collections/all">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-[#1D1D1F] text-sm font-semibold tracking-wide rounded-full hover:bg-white/90 transition-colors"
            >
              Shop Collection
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
