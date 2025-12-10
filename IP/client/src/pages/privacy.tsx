import { motion } from "framer-motion";
import { Link } from "wouter";
import { Footer } from "@/components/footer";

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="text-neutral-600 max-w-md mx-auto">
            Your privacy matters to us. Learn how we protect your information.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Information We Collect</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, subscribe to our newsletter, or contact us for support. This may include 
              your name, email address, shipping address, payment information, and phone number.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">How We Use Your Information</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We use the information we collect to process transactions, send order confirmations, 
              respond to your requests, personalize your shopping experience, and send promotional 
              communications (with your consent). We may also use your information to improve our 
              services and prevent fraud.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Information Sharing</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share 
              your information with trusted service providers who assist us in operating our website, 
              conducting our business, or servicing you, provided they agree to keep this information 
              confidential.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Data Security</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We implement industry-standard security measures to protect your personal information. 
              All payment transactions are encrypted using SSL technology. However, no method of 
              transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Cookies</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We use cookies and similar technologies to enhance your browsing experience, analyze 
              site traffic, and personalize content. You can control cookie preferences through your 
              browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Your Rights</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. 
              You may also opt out of receiving promotional communications by following the unsubscribe 
              instructions in our emails or contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-black mb-3">Contact Us</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
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
