import { useState } from "react";
import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { ChevronLeft, Package, Search } from "lucide-react";
import { Link } from "wouter";

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white pt-20"
    >
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link href="/">
          <span className="inline-flex items-center text-sm text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors mb-8 cursor-pointer">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </span>
        </Link>
        
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-8 h-8 text-[#1D1D1F]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-[#1D1D1F] tracking-tight mb-4">
            Track Your Order
          </h1>
          <p className="text-[#1D1D1F]/60 text-lg">
            Enter your order details below to check the status of your delivery.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-[#1D1D1F] mb-2">
              Order Number
            </label>
            <input
              type="text"
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g., ZX-123456"
              className="w-full px-4 py-3 border border-[#1D1D1F]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1D1D1F] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-[#1D1D1F]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all"
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#1D1D1F] text-white font-semibold rounded-xl hover:bg-[#1D1D1F]/90 transition-colors duration-300"
          >
            <Search className="w-5 h-5" />
            Track Order
          </button>
        </form>
        
        <div className="mt-12 p-6 bg-[#F5F5F7] rounded-2xl text-center">
          <p className="text-[#1D1D1F] font-medium mb-2">Can't find your order?</p>
          <p className="text-[#1D1D1F]/60 text-sm">
            Contact our support team at{" "}
            <a href="mailto:support@zentrix.com" className="text-[#D4AF37] hover:underline">
              support@zentrix.com
            </a>
            {" "}or check your email for shipping confirmation.
          </p>
        </div>
      </div>
      <Footer />
    </motion.main>
  );
}
