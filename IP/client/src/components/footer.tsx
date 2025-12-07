import { Link } from "wouter";
import { SiInstagram, SiFacebook, SiPinterest } from "react-icons/si";

const footerLinks = {
  shop: [
    { name: "Men's Apparel", href: "/category/men" },
    { name: "Women's Apparel", href: "/category/women" },
    { name: "Footwear", href: "/category/mens-footwear" },
    { name: "Jewelry", href: "/category/jewelry" },
    { name: "Tech Lifestyle", href: "/category/tech" },
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
  return (
    <footer className="bg-[#F5F5F7] py-12 md:py-16" data-testid="footer">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/">
              <span className="text-lg font-semibold tracking-[0.15em] text-black cursor-pointer" style={{ fontFamily: 'Cinzel, serif' }} data-testid="link-footer-logo">
                ZENTRIX
              </span>
            </Link>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed max-w-sm">
              Defining the future of luxury fashion and lifestyle. 
              Crafted for those who seek excellence in every detail.
            </p>

            <div className="mt-6">
              <p className="text-xs text-neutral-500 mb-3">Join our newsletter</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 bg-white px-4 py-2.5 rounded-xl text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid="input-newsletter-email"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-neutral-800 transition-colors"
                  data-testid="button-newsletter-submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-black uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-sm text-neutral-600 hover:text-black cursor-pointer transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-black uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-sm text-neutral-600 hover:text-black cursor-pointer transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-black uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-sm text-neutral-600 hover:text-black cursor-pointer transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} ZENTRIX. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-black transition-colors"
                aria-label={social.label}
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/privacy">
              <span className="text-xs text-neutral-500 hover:text-black cursor-pointer transition-colors">
                Privacy
              </span>
            </Link>
            <Link href="/terms">
              <span className="text-xs text-neutral-500 hover:text-black cursor-pointer transition-colors">
                Terms
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
