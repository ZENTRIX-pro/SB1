import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Briefcase, Globe, Users } from "lucide-react";
import { Footer } from "@/components/footer";

export default function Careers() {
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
            Careers at ZENTRIX
          </h1>

          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-neutral-600 mb-8">
              Join our team of passionate professionals dedicated to redefining luxury fashion and lifestyle.
            </p>

            <div className="grid gap-6 mb-12">
              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-black">Hiring Freelancers</h2>
                </div>
                <p className="text-neutral-600 mb-4">
                  We're currently partnering with talented freelancers across design, development, 
                  content creation, and marketing. If you have expertise in luxury brand positioning, 
                  we'd love to hear from you.
                </p>
                <a 
                  href="mailto:shop.with.zentrix@gmail.com?subject=Freelance Opportunity"
                  className="text-black font-medium hover:text-neutral-600 transition-colors"
                >
                  Apply via Email →
                </a>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-black">Remote-First Culture</h2>
                </div>
                <p className="text-neutral-600">
                  ZENTRIX operates as a fully digital brand. Our team collaborates across time zones, 
                  bringing together diverse perspectives to create exceptional luxury experiences.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-black">Our Values</h2>
                </div>
                <ul className="text-neutral-600 space-y-2">
                  <li>Excellence in every detail</li>
                  <li>Innovation meets tradition</li>
                  <li>Customer-first mindset</li>
                  <li>Sustainable luxury practices</li>
                </ul>
              </div>
            </div>

            <div className="text-center py-8 border-t border-neutral-200">
              <p className="text-neutral-600 mb-4">
                Interested in joining the ZENTRIX team?
              </p>
              <a 
                href="mailto:shop.with.zentrix@gmail.com?subject=Career Inquiry"
                className="inline-block px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.main>
  );
}
