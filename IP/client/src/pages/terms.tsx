import { motion } from "framer-motion";
import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function Terms() {
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
            Terms of Service
          </h1>
          <p className="text-neutral-600 max-w-md mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Acceptance of Terms</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              By accessing and using the ZENTRIX website, you accept and agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our website 
              or services.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Use of Website</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              You agree to use this website only for lawful purposes and in a way that does not 
              infringe upon the rights of others or restrict their use of the website. Prohibited 
              behavior includes transmitting harmful content, attempting to gain unauthorized access, 
              or interfering with the website's functionality.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Products and Pricing</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              All products are subject to availability. We reserve the right to discontinue any 
              product at any time. Prices are subject to change without notice. We make every effort 
              to display accurate product information, but we do not guarantee that descriptions, 
              images, or pricing are error-free.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Orders and Payment</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              By placing an order, you warrant that you are legally capable of entering into binding 
              contracts. All orders are subject to acceptance and availability. We reserve the right 
              to refuse or cancel any order for any reason. Payment must be received before orders 
              are processed.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Returns and Refunds</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We offer a 30-day return policy on unworn items with original tags attached. Items 
              must be in their original condition. Refunds will be processed within 5-7 business days 
              after we receive the returned item. Shipping costs for returns are the responsibility 
              of the customer unless the item is defective.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Intellectual Property</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, 
              is the property of ZENTRIX and is protected by copyright and trademark laws. You may 
              not reproduce, distribute, or use any content without our prior written permission.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Limitation of Liability</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              ZENTRIX shall not be liable for any indirect, incidental, special, or consequential 
              damages arising from your use of this website or any products purchased through it. 
              Our total liability shall not exceed the amount you paid for the specific product 
              giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Changes to Terms</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting to the website. Your continued use of the website after 
              changes are posted constitutes your acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Contact Us</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:shop.with.zentrix@gmail.com" className="text-black underline">
                shop.with.zentrix@gmail.com
              </a>
            </p>
          </section>

          <p className="text-neutral-500 text-xs mt-8">
            Last updated: January 2026
          </p>
        </div>

        <div className="text-center mt-12">
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
