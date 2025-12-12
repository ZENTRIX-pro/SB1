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
  span: string;
}

const gridCards: GridCard[] = [
  {
    title: "Men's Collection",
    subtitle: "Refined Elegance",
    image: menImage,
    href: "/collections/men",
    span: "md:col-span-2 md:row-span-2"
  },
  {
    title: "Women's Collection",
    subtitle: "Timeless Beauty",
    image: womenImage,
    href: "/collections/women",
    span: "md:col-span-2 md:row-span-2"
  },
  {
    title: "Tech Lifestyle",
    subtitle: "Innovation Meets Luxury",
    image: techImage,
    href: "/collections/tech",
    span: "md:col-span-4"
  }
];

export function EssentialsGrid() {
  return (
    <section className="py-16 md:py-24 px-4 bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">Curated For You</p>
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-wide">
            The Essentials
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {gridCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={card.span}
            >
              <Link href={card.href}>
                <div className="group relative h-64 md:h-full min-h-[280px] overflow-hidden rounded-xl cursor-pointer">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">
                      {card.subtitle}
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-light tracking-wide">
                      {card.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-[#D4AF37]/30 rounded-xl transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
