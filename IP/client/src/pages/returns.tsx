import { motion } from "framer-motion";
import { Footer } from "@/components/footer";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function Returns() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white pt-20"
    >
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/">
          <span className="inline-flex items-center text-sm text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors mb-8 cursor-pointer">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </span>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-light text-[#1D1D1F] tracking-tight mb-8">
          Returns Policy
        </h1>
        
        <div className="prose prose-lg max-w-none text-[#1D1D1F]/70">
          <p className="text-xl leading-relaxed mb-8">
            At ZENTRIX, we want you to be completely satisfied with your purchase. 
            If you're not entirely happy, we're here to help.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mt-12 mb-4">Return Window</h2>
          <p>
            You have 30 days from the date of delivery to initiate a return. 
            Items must be unworn, unwashed, and in their original condition with all tags attached.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mt-12 mb-4">How to Return</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li>Contact our customer service team at shop.with.zentrix@gmail.com</li>
            <li>Receive your prepaid return label</li>
            <li>Pack items securely in original packaging</li>
            <li>Drop off at your nearest shipping location</li>
          </ol>
          
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mt-12 mb-4">Refund Processing</h2>
          <p>
            Refunds are processed within 5-7 business days after we receive your return. 
            The refund will be credited to your original payment method.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mt-12 mb-4">Exchanges</h2>
          <p>
            For exchanges, please initiate a return and place a new order for the desired item. 
            This ensures the fastest processing time.
          </p>
          
          <div className="mt-12 p-6 bg-[#F5F5F7] rounded-2xl">
            <p className="text-[#1D1D1F] font-medium">Need Help?</p>
            <p className="text-[#1D1D1F]/60 mt-2">
              Contact our support team at{" "}
              <a href="mailto:shop.with.zentrix@gmail.com" className="text-[#D4AF37] hover:underline">
                shop.with.zentrix@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </motion.main>
  );
}
