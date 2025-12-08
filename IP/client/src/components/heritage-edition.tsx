import { motion } from "framer-motion";
import { Link } from "wouter";
import artisanCraftsmanshipImage from "@assets/generated_images/artisan_hands_weaving_luxury_fabric.png";

export function HeritageEdition() {
  return (
    <section className="bg-neutral-900 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={artisanCraftsmanshipImage}
                alt="Artisan Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-400/15 rounded-full blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <p className="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4 font-medium">
              Heritage Collection
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-amber-400 mb-6 leading-tight" style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}>
              The Royal Weave
            </h2>
            <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Centuries of Indian craftsmanship, woven into modern luxury. Each piece celebrates 
              the artistry of master weavers and goldsmiths, reimagined for the contemporary connoisseur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/heritage">
                <button className="px-8 py-3.5 bg-amber-400 text-neutral-900 font-medium rounded-full hover:bg-amber-300 transition-colors">
                  Explore Heritage
                </button>
              </Link>
              <Link href="/category/all">
                <button className="px-8 py-3.5 border border-amber-400/40 text-amber-400 font-medium rounded-full hover:bg-amber-400/10 transition-colors">
                  View Lookbook
                </button>
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-neutral-700 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-semibold text-amber-400" style={{ fontFamily: 'Cinzel, serif' }}>50+</p>
                <p className="text-neutral-400 text-xs uppercase tracking-wider mt-1">Artisans</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-semibold text-amber-400" style={{ fontFamily: 'Cinzel, serif' }}>100%</p>
                <p className="text-neutral-400 text-xs uppercase tracking-wider mt-1">Handcrafted</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl md:text-3xl font-semibold text-amber-400" style={{ fontFamily: 'Cinzel, serif' }}>Ltd</p>
                <p className="text-neutral-400 text-xs uppercase tracking-wider mt-1">Edition</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
