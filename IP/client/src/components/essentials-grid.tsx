import { motion } from "framer-motion";
import { Link } from "wouter";
import menImage from "@assets/generated_images/men_category_jacket_image.png";
import womenImage from "@assets/generated_images/women_category_dress_image.png";
import techImage from "@assets/generated_images/premium_tech_gadgets_collection.png";

interface GridCard {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  mobileSpan: string;
  desktopSpan: string;
}

const gridCards: GridCard[] = [
  {
    title: "Men's Collection",
    subtitle: "Refined Elegance",
    image: menImage,
    href: "/collections/men",
    mobileSpan: "col-span-1",
    desktopSpan: "md:col-span-2 md:row-span-2"
  },
  {
    title: "Women's Collection",
    subtitle: "Timeless Beauty",
    image: womenImage,
    href: "/collections/women",
    mobileSpan: "col-span-1",
    desktopSpan: "md:col-span-2 md:row-span-2"
  },
  {
    title: "Tech Lifestyle",
    subtitle: "Innovation Meets Luxury",
    image: techImage,
    href: "/collections/tech",
    mobileSpan: "col-span-2",
    desktopSpan: "md:col-span-4"
  }
];

export function EssentialsGrid() {
  return (
    <section className="py-16 md:py-24 px-4 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3">Curated For You</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-tight">
            The Essentials
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {gridCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${card.mobileSpan} ${card.desktopSpan}`}
            >
              <Link href={card.href}>
                <div className="group relative aspect-[3/4] md:aspect-auto md:h-full md:min-h-[280px] overflow-hidden rounded-2xl cursor-pointer bg-white shadow-sm">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <p className="text-white/70 text-[10px] md:text-xs tracking-[0.15em] uppercase mb-1 md:mb-2">
                      {card.subtitle}
                    </p>
                    <h3 className="text-white text-base md:text-2xl font-semibold tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
