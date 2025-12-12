import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AtelierLocation {
  id: string;
  name: string;
  country: string;
  description: string;
  href: string;
  gradient: string;
}

const locations: AtelierLocation[] = [
  {
    id: "sweden",
    name: "Nordic Zen",
    country: "Sweden",
    description: "Minimalist design philosophy meets premium craftsmanship",
    href: "/collections/men",
    gradient: "from-blue-900 via-blue-800 to-slate-900"
  },
  {
    id: "italy",
    name: "Italian Classico",
    country: "Italy",
    description: "Heritage luxury with timeless Mediterranean elegance",
    href: "/collections/women",
    gradient: "from-amber-900 via-orange-800 to-red-900"
  },
  {
    id: "japan",
    name: "Eastern Soul",
    country: "Japan",
    description: "Where ancient tradition meets cutting-edge innovation",
    href: "/collections/tech",
    gradient: "from-rose-900 via-pink-800 to-purple-900"
  },
  {
    id: "india",
    name: "Royal Heritage",
    country: "India",
    description: "Opulent craftsmanship inspired by centuries of artistry",
    href: "/heritage",
    gradient: "from-emerald-900 via-teal-800 to-cyan-900"
  }
];

export function GlobalAtelier() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3">Global Inspiration</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
              World of ZENTRIX
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#1D1D1F]/10 flex items-center justify-center text-[#1D1D1F]/60 hover:bg-[#1D1D1F] hover:text-white transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#1D1D1F]/10 flex items-center justify-center text-[#1D1D1F]/60 hover:bg-[#1D1D1F] hover:text-white transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4 snap-x snap-mandatory"
      >
        <div className="flex-none w-4 md:w-[calc((100vw-1280px)/2+16px)]" />
        {locations.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex-none w-[300px] md:w-[380px] snap-start"
          >
            <Link href={location.href}>
              <div className={`group relative h-[400px] md:h-[480px] rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${location.gradient}`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">
                    {location.country}
                  </p>
                  <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight mb-3">
                    {location.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {location.description}
                  </p>
                  <span className="inline-flex items-center text-white text-sm font-medium group-hover:underline">
                    Explore Collection
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        <div className="flex-none w-4 md:w-[calc((100vw-1280px)/2+16px)]" />
      </div>
    </section>
  );
}
