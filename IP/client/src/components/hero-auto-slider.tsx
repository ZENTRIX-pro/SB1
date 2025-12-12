import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import menImage from "@assets/generated_images/men_category_jacket_image.png";
import womenImage from "@assets/generated_images/women_category_dress_image.png";
import techImage from "@assets/generated_images/premium_tech_gadgets_collection.png";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  href: string;
  cta: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Men's Collection",
    subtitle: "Refined Elegance for the Modern Gentleman",
    image: menImage,
    href: "/collections/men",
    cta: "Shop Men"
  },
  {
    id: 2,
    title: "Women's Collection",
    subtitle: "Timeless Beauty, Contemporary Design",
    image: womenImage,
    href: "/collections/women",
    cta: "Shop Women"
  },
  {
    id: 3,
    title: "Tech Lifestyle",
    subtitle: "Innovation Meets Luxury",
    image: techImage,
    href: "/collections/tech",
    cta: "Explore Tech"
  }
];

export function HeroAutoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-[#F5F5F7]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-lg"
            >
              <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-4">
                {slides[currentSlide].subtitle}
              </p>
              <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 tracking-tight">
                {slides[currentSlide].title}
              </h1>
              <Link href={slides[currentSlide].href}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-[#1D1D1F] text-sm font-semibold tracking-wide rounded-full hover:bg-white/90 transition-colors"
                >
                  {slides[currentSlide].cta}
                </motion.button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? "w-8 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}
