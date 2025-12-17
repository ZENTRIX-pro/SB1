import { useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/lib/data";

const categoryLabels: Record<string, string> = {
  men: "Men",
  women: "Women",
  "male-footwear": "Shoes",
  "female-footwear": "Heels",
  jewelry: "Jewelry",
  bags: "Bags",
  scents: "Scents",
  tech: "Tech",
};

export function CategoryBar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-neutral-50 border-b border-neutral-200 py-3" data-testid="category-bar">
      <div className="max-w-6xl mx-auto px-4 relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors md:hidden"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-black" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide px-6 md:px-0 md:justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-white border border-neutral-200 group-hover:border-neutral-400 transition-colors shadow-sm">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-medium text-neutral-700 group-hover:text-black transition-colors whitespace-nowrap">
                  {categoryLabels[category.slug] || category.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-neutral-50 transition-colors md:hidden"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-black" />
        </button>
      </div>
    </section>
  );
}
