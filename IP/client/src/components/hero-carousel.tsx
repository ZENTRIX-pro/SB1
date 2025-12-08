import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data";

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="pt-16 pb-6 px-4 md:px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="md:hidden">
          <div
            className="relative overflow-hidden rounded-2xl h-[55vh]"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Link href={heroSlides[currentIndex].link}>
                  <div className="relative w-full h-full cursor-pointer">
                    <img
                      src={heroSlides[currentIndex].image}
                      alt={heroSlides[currentIndex].title}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
                    <div className="absolute bottom-6 left-4 right-4">
                      <p className="text-xs text-white/80 uppercase tracking-wider mb-1">
                        {heroSlides[currentIndex].subtitle}
                      </p>
                      <h2 className="text-2xl font-semibold text-white mb-3">
                        {heroSlides[currentIndex].title}
                      </h2>
                      <span className="inline-block px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full">
                        {heroSlides[currentIndex].cta}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-4">
          {heroSlides.slice(0, 2).map((slide, idx) => (
            <Link key={slide.id} href={slide.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs text-white/80 uppercase tracking-wider mb-1">
                    {slide.subtitle}
                  </p>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {slide.title}
                  </h2>
                  <span className="text-sm text-white/90 group-hover:text-white transition-colors">
                    {slide.cta} →
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
