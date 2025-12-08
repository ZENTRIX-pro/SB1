import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

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
    <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-black" data-testid="hero-section">
      {/* Background Image */}
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

      {/* Content */}
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
                  {slide.cta}
                </motion.button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
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

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {heroSlides.map((_, index) => (
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

      {/* Scroll Indicator */}
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
