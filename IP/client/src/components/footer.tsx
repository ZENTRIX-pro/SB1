import { useState } from "react";
import { Link, useLocation } from "wouter";
import { SiInstagram, SiFacebook, SiPinterest } from "react-icons/si";

const footerLinks = {
  shop: [
    { name: "Men's Collection", href: "/collections/men" },
    { name: "Women's Collection", href: "/collections/women" },
    { name: "Tech Lifestyle", href: "/collections/tech" },
    { name: "Home & Living", href: "/collections/bags" },
    { name: "Accessories", href: "/collections/jewelry" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Stores", href: "/stores" },
  ],
  support: [
    { name: "Contact", href: "/contact" },
    { name: "Shipping", href: "/shipping" },
    { name: "Support", href: "/support" },
    { name: "Email Us", href: "mailto:shop.with.zentrix@gmail.com" },
  ],
};

const socialLinks = [
  { icon: SiInstagram, href: "https://www.instagram.com/zentrix.gear?igsh=ZDNpNGh3MXhlYm5o", label: "Instagram" },
  { icon: SiFacebook, href: "https://www.facebook.com/share/17U6B59QsA/", label: "Facebook" },
  { icon: SiPinterest, href: "https://pinterest.com", label: "Pinterest" },
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
    <footer className="bg-[#0E0E0E] py-10 md:py-14" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/">
              <span 
                className="text-xl font-semibold tracking-[0.2em] cursor-pointer bg-gradient-to-r from-[#D4AF37] via-[#F4E4BC] to-[#D4AF37] bg-clip-text text-transparent" 
                style={{ fontFamily: 'Cinzel, serif' }}
                data-testid="link-footer-logo"
              >
                ZENTRIX
              </span>
            </Link>
            <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-sm">
              Defining the future of luxury fashion and lifestyle. 
              Crafted for those who seek excellence in every detail.
            </p>

            <div className="mt-6 bg-white/5 rounded-2xl p-5">
              <p className="text-white font-medium text-sm mb-1">Join the Inner Circle</p>
              <p className="text-white/40 text-xs mb-4">Get 10% off your first order.</p>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/10 px-4 py-2.5 rounded-full text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                  data-testid="input-newsletter-email"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white text-[#1D1D1F] text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
                  data-testid="button-newsletter-submit"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-medium">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-medium">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4 font-medium">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("mailto:") ? (
                    <a href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>© {new Date().getFullYear()} ZENTRIX. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
