import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";

export function BentoGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const gridLayout = [
    { category: categories[0], size: "large", gridClass: "md:col-span-2 md:row-span-2" },
    { category: categories[1], size: "medium", gridClass: "" },
    { category: categories[4], size: "medium", gridClass: "" },
    { category: categories[2], size: "wide", gridClass: "md:col-span-2" },
    { category: categories[6], size: "medium", gridClass: "" },
    { category: categories[3], size: "medium", gridClass: "" },
    { category: categories[5], size: "medium", gridClass: "" },
    { category: categories[7], size: "wide", gridClass: "md:col-span-2" },
  ];

  return (
    <section className="py-20 md:py-32 px-6 lg:px-8 bg-background" data-testid="bento-grid-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
            Curated Collections
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-foreground tracking-tight mb-4">
            The ZENTRIX Ecosystem
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto text-lg">
            Discover our world of premium fashion, beauty, technology, and lifestyle pieces
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {gridLayout.map((item, index) => (
            <motion.div
              key={item.category.id}
              variants={itemVariants}
              className={item.gridClass}
            >
              <CategoryCard 
                category={item.category} 
                size={item.size as "small" | "medium" | "large" | "wide"} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: typeof categories[0];
  size: "small" | "medium" | "large" | "wide";
}

function CategoryCard({ category, size }: CategoryCardProps) {
  const heightClass = {
    small: "h-64",
    medium: "h-72 md:h-80",
    large: "h-72 md:h-[36rem]",
    wide: "h-64 md:h-72",
  }[size];

  return (
    <Link href={`/category/${category.slug}`}>
      <motion.div
        whileHover="hover"
        className={`relative ${heightClass} rounded-xl overflow-hidden cursor-pointer group`}
        data-testid={`card-category-${category.slug}`}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hover: { scale: 1.08 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/40" />
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-all duration-700"
          />
        </motion.div>

        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
          <motion.div
            variants={{
              hover: { y: -10 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-xl -m-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-3 -m-3">
                <motion.h3 
                  className="text-xl md:text-2xl lg:text-3xl font-light text-white tracking-tight mb-2 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  variants={{
                    hover: { textShadow: "0 0 20px rgba(255,255,255,0.4)" }
                  }}
                >
                  {category.name}
                </motion.h3>
                <p className="text-white/60 text-sm font-light mb-4 max-w-xs group-hover:text-white/80 transition-colors duration-300">
                  {category.description}
                </p>
                <motion.div
                  className="flex items-center gap-2 text-white/70 text-sm tracking-wide group-hover:text-white transition-colors duration-300"
                  variants={{
                    hover: { x: 8 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-light">Explore Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 z-5 border-2 border-white/0 rounded-xl transition-all duration-500 group-hover:border-white/10"
          variants={{
            hover: { opacity: 1 }
          }}
        />
      </motion.div>
    </Link>
  );
}
