import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { fetchHeroSlides, HeroSlide } from "@/lib/shopify";
import { heroSlides as fallbackSlides } from "@/lib/data";

export function Hero() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [desktopIndex, setDesktopIndex] = useState(0);
  
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const [desktopEmblaRef, desktopEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    containScroll: false,
  });

  useEffect(() => {
    const loadHeroSlides = async () => {
      setIsLoading(true);
      try {
        const slides = await fetchHeroSlides();
        if (slides.length > 0) {
          setHeroSlides(slides);
        } else {
          setHeroSlides(fallbackSlides.map((s) => ({
            id: String(s.id),
            title: s.title,
            description: "",
            image: s.image,
            link: s.link,
            subtitle: s.subtitle,
          })));
        }
      } catch (error) {
        console.error("Error loading hero slides:", error);
        setHeroSlides(fallbackSlides.map((s) => ({
          id: String(s.id),
          title: s.title,
          description: "",
          image: s.image,
          link: s.link,
          subtitle: s.subtitle,
        })));
      }
      setIsLoading(false);
    };
    loadHeroSlides();
  }, []);

  const scrollPrev = useCallback(() => {
    if (desktopEmblaApi) desktopEmblaApi.scrollPrev();
  }, [desktopEmblaApi]);

  const scrollNext = useCallback(() => {
    if (desktopEmblaApi) desktopEmblaApi.scrollNext();
  }, [desktopEmblaApi]);

  useEffect(() => {
    if (!mobileEmblaApi) return;

    const onSelect = () => {
      setMobileIndex(mobileEmblaApi.selectedScrollSnap());
    };

    mobileEmblaApi.on("select", onSelect);
    onSelect();

    const autoplay = setInterval(() => {
      mobileEmblaApi.scrollNext();
    }, 5000);

    return () => {
      mobileEmblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [mobileEmblaApi]);

  useEffect(() => {
    if (!desktopEmblaApi) return;

    const onSelect = () => {
      setDesktopIndex(desktopEmblaApi.selectedScrollSnap());
    };

    desktopEmblaApi.on("select", onSelect);
    onSelect();

    const autoplay = setInterval(() => {
      desktopEmblaApi.scrollNext();
    }, 5000);

    return () => {
      desktopEmblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [desktopEmblaApi]);

  if (isLoading || heroSlides.length === 0) {
    return (
      <section className="h-[55vh] md:h-[75vh] md:max-h-[700px] bg-neutral-100 animate-pulse" />
    );
  }

  return (
    <>
      <section className="md:hidden h-[55vh] pt-14 bg-black overflow-hidden">
        <div className="h-full overflow-hidden" ref={mobileEmblaRef}>
          <div className="flex h-full">
            {heroSlides.map((slide) => (
              <div key={slide.id} className="flex-none w-full h-full min-w-0">
                <Link href={slide.link}>
                  <div className="relative w-full h-full cursor-pointer">
                    <div className="w-full h-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-6 right-6">
                      <p className="text-xs text-white/80 uppercase tracking-[0.2em] mb-2 font-medium">
                        {slide.subtitle}
                      </p>
                      <h2 className="font-heading text-2xl font-semibold text-white mb-3">
                        {slide.title}
                      </h2>
                      <span className="inline-flex items-center gap-2 text-sm text-white/90 font-medium">
                        Explore Story
                        <svg
                          className="w-4 h-4"
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
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4 pb-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => mobileEmblaApi?.scrollTo(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === mobileIndex ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="hidden md:block h-[75vh] max-h-[700px] pt-16 bg-white overflow-hidden">
        <div className="relative max-w-[1400px] mx-auto px-6 h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-center"
          >
            <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-black">
              Discover Luxury
            </h1>
          </motion.div>

          <div className="relative h-[calc(100%-120px)]">
            <div className="overflow-hidden h-full" ref={desktopEmblaRef}>
              <div className="flex h-full">
                {heroSlides.map((slide, index) => {
                  const isActive = index === desktopIndex;
                  return (
                    <motion.div
                      key={slide.id}
                      className="flex-none px-3 h-full"
                      style={{ width: "60%" }}
                      animate={{
                        scale: isActive ? 1 : 0.9,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Link href={slide.link}>
                        <div className="relative h-full rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-xs text-white/80 uppercase tracking-[0.2em] mb-2 font-medium">
                              {slide.subtitle}
                            </p>
                            <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-white mb-4">
                              {slide.title}
                            </h2>
                            <span className="inline-flex items-center gap-2 text-base text-white/90 group-hover:text-white transition-colors font-medium">
                              Explore Story
                              <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                  );
                })}
              </div>
            </div>

            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => desktopEmblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === desktopIndex
                    ? "bg-black scale-110"
                    : "bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
