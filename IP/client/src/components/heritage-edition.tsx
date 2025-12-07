import { motion } from "framer-motion";
import { Link } from "wouter";
import cinematicHeroImage from "@assets/generated_images/cinematic_luxury_fashion_hero.png";

export function HeritageEdition() {
  return (
    <section className="bg-stone-900 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={cinematicHeroImage}
                alt="Heritage Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-600/20 rounded-full blur-3xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <p className="text-amber-400/80 text-xs uppercase tracking-[0.3em] mb-4 font-medium">
              Exclusive Collection
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Timeless India:<br />
              <span className="text-amber-200">The Heritage Edit</span>
            </h2>
            <p className="text-stone-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Discover our exclusive collection inspired by India's rich artisan traditions. 
              Each piece celebrates centuries of craftsmanship, reimagined for the modern connoisseur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/category/heritage">
                <button className="px-8 py-3.5 bg-white text-stone-900 font-medium rounded-full hover:bg-amber-50 transition-colors">
                  Explore Heritage
                </button>
              </Link>
              <Link href="/category/lifestyle">
                <button className="px-8 py-3.5 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
                  View Lookbook
                </button>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-stone-700/50 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="font-heading text-2xl md:text-3xl font-semibold text-white">50+</p>
                <p className="text-stone-400 text-xs uppercase tracking-wider mt-1">Artisans</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-heading text-2xl md:text-3xl font-semibold text-white">100%</p>
                <p className="text-stone-400 text-xs uppercase tracking-wider mt-1">Handcrafted</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-heading text-2xl md:text-3xl font-semibold text-white">Ltd</p>
                <p className="text-stone-400 text-xs uppercase tracking-wider mt-1">Edition</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
