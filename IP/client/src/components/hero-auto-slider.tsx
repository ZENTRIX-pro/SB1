import { motion } from "framer-motion";
import { Link } from "wouter";

export function HeroAutoSlider() {
  return (
    <section className="relative h-[100vh] w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-elegant-woman-in-silk-dress-4713-large.mp4" 
          type="video/mp4" 
        />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center px-4"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-[0.15em] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            DEFINE YOUR LEGACY
          </motion.h1>
          <motion.p 
            className="text-white/70 text-lg md:text-xl tracking-[0.2em] uppercase mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Silent luxury for the modern soul.
          </motion.p>
          <Link href="/collections/new-arrivals">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.95)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-white text-[#1D1D1F] text-sm font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Explore New Arrivals
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
