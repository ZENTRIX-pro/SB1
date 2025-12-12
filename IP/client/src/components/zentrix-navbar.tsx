import { useState } from "react";
import { Link } from "wouter";
import { Menu, Search, User, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export function ZentrixNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, openCart } = useCart();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const menuLinks = [
    { label: "Home", href: "/" },
    { label: "Tech", href: "/collections/tech" },
    { label: "Men", href: "/collections/men" },
    { label: "Women", href: "/collections/women" },
    { label: "Nordic Zen", href: "/collections/nordic-zen" },
    { label: "Heritage", href: "/collections/heritage" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between h-16 px-4 md:px-8">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl md:text-2xl font-light tracking-[0.3em] bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#C5A028] bg-clip-text text-transparent">
              ZENTRIX
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link href="/account" className="p-2 text-white/80 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => openCart()}
              className="relative p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-[#D4AF37] text-black rounded-full">
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
              className="border-t border-white/5 overflow-hidden"
            >
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search ZENTRIX..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37]/50"
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
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-[70] w-80 bg-neutral-950 border-r border-white/5"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-lg font-light tracking-[0.2em] bg-gradient-to-r from-[#D4AF37] via-[#F5E6A3] to-[#C5A028] bg-clip-text text-transparent">
                  ZENTRIX
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-6">
                <ul className="space-y-4">
                  {menuLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 text-lg text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
