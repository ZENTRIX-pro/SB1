import { motion } from "framer-motion";
import { Link } from "wouter";
import { Mail, MessageCircle } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Support() {
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
            Customer Support
          </h1>
          <p className="text-neutral-600 max-w-md mx-auto">
            We're here to help. Reach out to our dedicated support team for any questions or assistance.
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
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-black mb-2">Email Support</h3>
            <p className="text-neutral-600 text-sm mb-3">
              Get a response within 24 hours
            </p>
            <a 
              href="mailto:shop.with.zentrix@gmail.com" 
              className="text-black font-medium hover:underline"
            >
              shop.with.zentrix@gmail.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-50 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-black mb-2">Live Chat</h3>
            <p className="text-neutral-600 text-sm mb-3">
              Get instant help from our team
            </p>
            <button className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors">
              Start Chat
            </button>
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
