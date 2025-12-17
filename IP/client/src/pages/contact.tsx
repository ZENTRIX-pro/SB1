import { motion } from "framer-motion";
import { Link } from "wouter";
import { Mail } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Contact() {
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
            Contact Us
          </h1>
          <p className="text-neutral-600 max-w-md mx-auto">
            We're here to help. Reach out to our dedicated support team for any questions or assistance.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-50 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 mx-auto">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-semibold text-black text-xl mb-3">Email Support</h3>
            <p className="text-neutral-600 text-sm mb-4">
              Get a response within 24 hours
            </p>
            <a 
              href="mailto:shop.with.zentrix@gmail.com" 
              className="text-black font-medium hover:underline text-lg"
            >
              shop.with.zentrix@gmail.com
            </a>
          </motion.div>
        </div>

        <div className="text-center">
          <Link href="/">
            <button className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors">
              Back to Shopping
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </motion.main>
  );
}
