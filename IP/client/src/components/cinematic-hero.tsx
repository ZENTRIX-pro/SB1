import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";

interface CinematicHeroProps {
  videoUrl?: string;
  title?: string;
  subtitle?: string;
}

export function CinematicHero({ 
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-luxury-fashion-runway-show-4655-large.mp4",
  title = "The Future of Luxury",
  subtitle = "Define Your Legacy"
}: CinematicHeroProps) {
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs md:text-sm tracking-[0.4em] text-white/60 uppercase mb-4"
        >
          {subtitle}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-white mb-8"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link
            href="/collections/tech"
            className="inline-block px-8 py-3 border border-white/30 text-white text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore
          </Link>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
