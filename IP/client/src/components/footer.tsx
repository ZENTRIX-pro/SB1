import { useState } from "react";
import { Link, useLocation } from "wouter";
import { SiInstagram, SiFacebook, SiPinterest, SiVisa, SiMastercard, SiPaypal, SiApplepay, SiGooglepay } from "react-icons/si";

const footerLinks = {
  shop: [
    { name: "New Arrivals", href: "/collections/new-arrivals" },
    { name: "Men", href: "/collections/men" },
    { name: "Women", href: "/collections/women" },
    { name: "Tech & Gadgets", href: "/collections/tech" },
    { name: "Home Living", href: "/collections/home" },
    { name: "Beauty", href: "/collections/beauty" },
    { name: "Gifts", href: "/collections/gifts" },
  ],
  support: [
    { name: "Track Your Order", href: "/track-order" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Return Policy", href: "/returns" },
    { name: "Contact Us", href: "/contact" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Stores", href: "/stores" },
  ],
};

const socialLinks = [
  { icon: SiInstagram, href: "https://www.instagram.com/zentrix.gear?igsh=ZDNpNGh3MXhlYm5o", label: "Instagram" },
  { icon: SiFacebook, href: "https://www.facebook.com/share/17U6B59QsA/", label: "Facebook" },
  { icon: SiPinterest, href: "https://pinterest.com", label: "Pinterest" },
];

const paymentMethods = [
  { icon: SiVisa, label: "Visa" },
  { icon: SiMastercard, label: "Mastercard" },
  { icon: SiPaypal, label: "PayPal" },
  { icon: SiApplepay, label: "Apple Pay" },
  { icon: SiGooglepay, label: "Google Pay" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [, setLocation] = useLocation();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const encodedEmail = encodeURIComponent(email.trim());
      setLocation(`/account?email=${encodedEmail}&signup=true`);
    }
  };

  return (
    <footer className="bg-neutral-100 border-t border-neutral-200" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/">
              <span 
                className="text-2xl font-bold tracking-[0.3em] text-black cursor-pointer uppercase"
                style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
                data-testid="link-footer-logo"
              >
                ZENTRIX
              </span>
            </Link>
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed max-w-sm">
              Modern luxury for the discerning individual. 
              Curated collections for those who appreciate exceptional quality.
            </p>

            <div className="mt-6">
              <p className="text-sm font-medium text-black mb-3">Subscribe to our newsletter</p>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-neutral-300 px-4 py-2.5 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
                  data-testid="input-newsletter-email"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                  data-testid="button-newsletter-submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-black mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-neutral-600 hover:text-black transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-black mb-4 font-semibold">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-neutral-600 hover:text-black transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-black mb-4 font-semibold">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-neutral-600 hover:text-black transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.label}
                  className="w-10 h-6 flex items-center justify-center text-neutral-400"
                  aria-label={method.label}
                >
                  <method.icon className="w-8 h-8" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500 mt-8">
            <Link href="/privacy" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms of Service
            </Link>
            <span>|</span>
            <span>© {new Date().getFullYear()} ZENTRIX. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
