import { motion } from "framer-motion";
import { Link } from "wouter";
import { cinematicHero } from "@/lib/data";
import { ChevronDown } from "lucide-react";

export function CinematicHero() {
  return (
    <section 
      className="relative h-[55vh] md:h-[75vh] md:max-h-[700px] w-full overflow-hidden bg-black" 
      data-testid="cinematic-hero-section"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
        <img
          src={cinematicHero.image}
          alt="ZENTRIX Luxury Fashion"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.p
              className="text-white/60 text-sm md:text-base tracking-[0.4em] uppercase mb-6 font-light"
              data-testid="text-cinematic-subtitle"
            >
              {cinematicHero.subtitle}
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative inline-block"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl -m-6 md:-m-10" />
            <h1
              className="relative text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight py-6 md:py-10 px-8 md:px-16"
              style={{ fontFamily: "'Inter', sans-serif" }}
              data-testid="text-cinematic-title"
            >
              <span className="italic font-light">Define</span> Your{" "}
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text">
                Future
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/category/men">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm tracking-[0.2em] uppercase rounded-full transition-all"
                data-testid="button-shop-men"
              >
                Shop Men
              </motion.button>
            </Link>
            <Link href="/category/women">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,1)", color: "rgba(0,0,0,1)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-white text-black text-sm tracking-[0.2em] uppercase rounded-full transition-all"
                data-testid="button-shop-women"
              >
                Shop Women
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
