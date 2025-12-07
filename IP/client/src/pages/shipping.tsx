import { motion } from "framer-motion";
import { Link } from "wouter";
import { Truck, Clock, Shield, Globe } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Shipping() {
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
            Shipping & Delivery
          </h1>
          <p className="text-neutral-600 max-w-md mx-auto">
            We ensure your luxury purchases arrive safely and promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-50 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-black mb-2">Free Shipping</h3>
            <p className="text-neutral-600 text-sm">
              Complimentary shipping on all orders over $200. Standard delivery within 3-5 business days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-50 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-black mb-2">Express Delivery</h3>
            <p className="text-neutral-600 text-sm">
              Need it faster? Choose express delivery for next-day arrival on orders placed before 2PM.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-neutral-50 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-black mb-2">Secure Packaging</h3>
            <p className="text-neutral-600 text-sm">
              All items are carefully packaged in premium, eco-friendly materials to ensure safe delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-neutral-50 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-black mb-2">International Shipping</h3>
            <p className="text-neutral-600 text-sm">
              We ship worldwide. International orders typically arrive within 7-14 business days.
            </p>
          </motion.div>
        </div>

        <div className="bg-neutral-50 rounded-2xl p-8 text-center mb-12">
          <h3 className="font-semibold text-black mb-4">Returns Policy</h3>
          <p className="text-neutral-600 text-sm max-w-lg mx-auto">
            We offer a 30-day return policy on all unworn items with original tags attached. 
            Returns are free for orders within the domestic region.
          </p>
        </div>

        <div className="text-center">
          <Link href="/">
            <button className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </motion.main>
  );
}
