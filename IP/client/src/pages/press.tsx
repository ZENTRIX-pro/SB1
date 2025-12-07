import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, FileText, Mail, Camera } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Press() {
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
            Press & Media
          </h1>

          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-neutral-600 mb-8">
              For press inquiries, partnership opportunities, and media resources.
            </p>

            <div className="grid gap-6 mb-12">
              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-black">About ZENTRIX</h2>
                </div>
                <p className="text-neutral-600 mb-4">
                  ZENTRIX is a premium luxury lifestyle brand offering exclusive fashion, 
                  footwear, jewelry, and high-end accessories. We combine centuries of artisan 
                  craftsmanship with modern design sensibilities to create pieces that define 
                  the future of luxury.
                </p>
                <p className="text-neutral-600">
                  Founded with a vision to make luxury accessible through digital innovation, 
                  ZENTRIX serves discerning customers across 50+ countries worldwide.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-black">Media Resources</h2>
                </div>
                <p className="text-neutral-600 mb-4">
                  High-resolution images, brand assets, and product photography are available 
                  for authorized press and media partners.
                </p>
                <a 
                  href="mailto:shop.with.zentrix@gmail.com?subject=Media Resources Request"
                  className="text-black font-medium hover:text-neutral-600 transition-colors"
                >
                  Request Media Kit →
                </a>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-black">Press Contact</h2>
                </div>
                <p className="text-neutral-600 mb-4">
                  For all press inquiries, interview requests, and partnership opportunities:
                </p>
                <a 
                  href="mailto:shop.with.zentrix@gmail.com"
                  className="text-black font-medium hover:text-neutral-600 transition-colors"
                >
                  shop.with.zentrix@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1a237e] to-[#283593] rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-4">Brand Partnerships</h2>
              <p className="text-blue-100 mb-6">
                ZENTRIX collaborates with select brands and influencers who share our 
                commitment to quality, sustainability, and exceptional design. 
                We welcome partnership inquiries from aligned organizations.
              </p>
              <a 
                href="mailto:shop.with.zentrix@gmail.com?subject=Partnership Inquiry"
                className="inline-block px-6 py-3 bg-white text-[#1a237e] font-medium rounded-full hover:bg-blue-50 transition-colors"
              >
                Discuss Partnership
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.main>
  );
}
