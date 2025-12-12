import { useState } from "react";
import { Link } from "wouter";
import { Menu, Search, User, ShoppingBag, X, Smartphone, Home, Gift, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

const megaMenuCategories = [
  {
    title: "Collections",
    links: [
      { label: "Men's Collection", href: "/collections/men" },
      { label: "Women's Collection", href: "/collections/women" },
      { label: "Tech Lifestyle", href: "/collections/tech" },
      { label: "Home & Living", href: "/collections/bags" },
      { label: "Scents", href: "/collections/scents" },
      { label: "Accessories", href: "/collections/jewelry" },
    ]
  },
  {
    title: "Discover",
    links: [
      { label: "New Arrivals", href: "/collections/new" },
      { label: "Trending Now", href: "/collections/trending" },
      { label: "Gift Guide", href: "/collections/gifts" },
      { label: "Heritage Edition", href: "/heritage" },
    ]
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Stores", href: "/stores" },
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" },
    ]
  }
];

export function ZentrixNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, openCart } = useCart();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-black/5 shadow-sm">
        <div className="flex items-center justify-between h-14 px-4 md:px-8 max-w-7xl mx-auto">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl md:text-2xl font-semibold tracking-[0.2em] text-[#1D1D1F]">
              ZENTRIX
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/account" className="p-2 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => openCart()}
              className="relative p-2 text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-[#1D1D1F] text-white rounded-full font-medium">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-black/5 overflow-hidden bg-white/90 backdrop-blur-xl"
            >
              <div className="p-4 max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search ZENTRIX..."
                  className="w-full bg-[#F5F5F7] border border-black/10 rounded-full px-5 py-3 text-[#1D1D1F] placeholder:text-[#1D1D1F]/40 focus:outline-none focus:ring-2 focus:ring-[#1D1D1F]/20"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-[70] w-full max-w-md bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <h2 className="text-xl font-semibold tracking-[0.15em] text-[#1D1D1F]">
                  ZENTRIX
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                {megaMenuCategories.map((category) => (
                  <div key={category.title} className="mb-8">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/40 font-medium mb-4">
                      {category.title}
                    </h3>
                    <ul className="space-y-3">
                      {category.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-lg text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
