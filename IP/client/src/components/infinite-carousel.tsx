import { useCallback, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { heroSlides } from "@/lib/data";

export function InfiniteCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emblaApi, startAutoplay]);

  return (
    <section className="pt-16 pb-8 bg-white overflow-hidden">
      <div className="px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-black text-center">
            Discover Luxury
          </h1>
        </motion.div>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-4">
            {heroSlides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex-none w-[90%] md:w-[38%] min-w-0"
              >
                <Link href={slide.link}>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group cursor-pointer">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-xs text-white/80 uppercase tracking-[0.2em] mb-2 font-medium">
                        {slide.subtitle}
                      </p>
                      <h2 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-3">
                        {slide.title}
                      </h2>
                      <span className="inline-flex items-center gap-2 text-sm text-white/90 group-hover:text-white transition-colors font-medium">
                        {slide.cta}
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-2 h-2 rounded-full bg-neutral-300 hover:bg-neutral-400 transition-colors"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
