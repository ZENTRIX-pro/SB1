import { motion } from "framer-motion";
import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white pt-16"
    >
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-black mb-4">
            About ZENTRIX
          </h1>
          <p className="text-neutral-600 max-w-md mx-auto">
            Defining the future of luxury fashion and lifestyle since 2024.
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl font-semibold text-black mb-4">
              Our Story
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              ZENTRIX was born from a vision to create a luxury lifestyle brand that seamlessly blends 
              timeless elegance with contemporary innovation. We believe that true luxury lies in the 
              details - from the finest materials to impeccable craftsmanship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl font-semibold text-black mb-4">
              Our Mission
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              To curate and deliver exceptional luxury products that inspire confidence and celebrate 
              individuality. We partner with master artisans and renowned designers to bring you 
              collections that transcend trends and stand the test of time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h2 className="font-heading text-2xl font-semibold text-black mb-4">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-neutral-50 rounded-2xl p-6">
                <h3 className="font-semibold text-black mb-2">Excellence</h3>
                <p className="text-neutral-600 text-sm">
                  Uncompromising quality in every product we offer.
                </p>
              </div>
              <div className="bg-neutral-50 rounded-2xl p-6">
                <h3 className="font-semibold text-black mb-2">Authenticity</h3>
                <p className="text-neutral-600 text-sm">
                  Genuine craftsmanship and transparent practices.
                </p>
              </div>
              <div className="bg-neutral-50 rounded-2xl p-6">
                <h3 className="font-semibold text-black mb-2">Innovation</h3>
                <p className="text-neutral-600 text-sm">
                  Pushing boundaries while honoring tradition.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center">
          <Link href="/">
            <button className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </motion.main>
  );
}
