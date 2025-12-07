import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Globe, Monitor, Truck } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Stores() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      <div className="pt-20 pb-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/">
            <button className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-black mb-6">
            Our Stores
          </h1>

          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-neutral-600 mb-8">
              ZENTRIX brings luxury fashion directly to you through our digital-first approach.
            </p>

            <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 mb-12 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Monitor className="w-8 h-8" />
                <h2 className="text-2xl font-semibold">Global Digital Store</h2>
              </div>
              <p className="text-neutral-300 mb-6 text-lg">
                Experience the future of luxury shopping. Our flagship digital store offers the complete 
                ZENTRIX collection, available 24/7 from anywhere in the world.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Virtual Showroom</h3>
                  <p className="text-neutral-300 text-sm">
                    Browse our collections in stunning detail with high-resolution imagery 
                    and comprehensive product information.
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Personal Concierge</h3>
                  <p className="text-neutral-300 text-sm">
                    Email our dedicated team for personalized styling advice and 
                    exclusive access to new arrivals.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 mb-12">
              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-black">Worldwide Shipping</h2>
                </div>
                <p className="text-neutral-600">
                  We deliver to over 50 countries worldwide. Experience ZENTRIX luxury 
                  wherever you are, with premium packaging and insured delivery.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-black">Express Delivery</h2>
                </div>
                <p className="text-neutral-600">
                  Free shipping on orders over $200. Standard delivery in 5-7 business days, 
                  with express options available for select locations.
                </p>
              </div>
            </div>

            <div className="text-center py-8 border-t border-neutral-200">
              <p className="text-neutral-600 mb-4">
                Questions about our store or services?
              </p>
              <Link href="/contact">
                <span className="inline-block px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors cursor-pointer">
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.main>
  );
}
