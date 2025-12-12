import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    title: "Define Your Legacy",
    subtitle: "The pinnacle of modern luxury.",
    link: "/collections/signature",
    buttonText: "Explore Signature"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop",
    title: "Smart Living",
    subtitle: "Technology meets elegance.",
    link: "/collections/tech",
    buttonText: "Shop Innovation"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop",
    title: "Curated from the World",
    subtitle: "Global artisanship rooted in tradition.",
    link: "/collections/heritage",
    buttonText: "Discover Heritage"
  }
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[currentSlide];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const textVariants = {
    enter: { opacity: 0, y: 40 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  return (
    <section className="relative h-[55vh] md:h-[75vh] md:max-h-[700px] w-full overflow-hidden bg-black" data-testid="hero-section">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide}`}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.p
                className="text-white/70 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-light"
                data-testid="text-hero-subtitle"
              >
                {slide.subtitle}
              </motion.p>
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-8"
                data-testid="text-hero-title"
              >
                {slide.title}
              </motion.h1>
              <Link href={slide.link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm tracking-widest uppercase rounded-full transition-all hover:bg-white/20"
                  data-testid="button-hero-cta"
                >
                  {slide.buttonText}
                </motion.button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-y-0 left-4 md:left-8 z-30 flex items-center">
        <motion.button
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 transition-all hover:bg-white/20"
          data-testid="button-prev-slide"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </motion.button>
      </div>
      <div className="absolute inset-y-0 right-4 md:right-8 z-30 flex items-center">
        <motion.button
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 transition-all hover:bg-white/20"
          data-testid="button-next-slide"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </motion.button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className="relative w-12 h-1 rounded-full overflow-hidden bg-white/30"
            whileHover={{ scale: 1.1 }}
            data-testid={`button-slide-${index}`}
          >
            {index === currentSlide && (
              <motion.div
                layoutId="activeSlide"
                className="absolute inset-0 bg-white"
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
