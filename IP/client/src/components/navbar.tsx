import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { MobileDrawer } from "@/components/mobile-drawer";

const navLinks = [
  { name: "Men", href: "/collections/men" },
  { name: "Women", href: "/collections/women" },
  { name: "Jewelry", href: "/collections/jewelry" },
  { name: "Bags", href: "/collections/bags" },
  { name: "Accessories", href: "/collections/wallets" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, openCart } = useCart();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/" data-testid="link-home">
              <span className="text-xl font-semibold tracking-[0.15em] text-black cursor-pointer" style={{ fontFamily: 'Cinzel, serif' }}>
                ZENTRIX
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`text-sm font-medium cursor-pointer transition-colors hover:text-black ${
                      location === link.href
                        ? "text-black"
                        : "text-neutral-500"
                    }`}
                    data-testid={`link-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-neutral-600 hover:text-black transition-colors"
                data-testid="button-search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <button
                onClick={openCart}
                className="p-2.5 text-neutral-600 hover:text-black transition-colors relative"
                data-testid="button-cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span
                    className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center font-medium"
                    data-testid="text-cart-count"
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-neutral-600 hover:text-black transition-colors md:hidden"
                data-testid="button-mobile-menu"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white"
          >
            <div className="max-w-2xl mx-auto pt-20 px-4">
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-neutral-600 hover:text-black"
                  data-testid="button-close-search"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  autoFocus
                  className="w-full bg-neutral-100 rounded-xl px-5 py-4 text-lg text-black placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                  data-testid="input-search"
                />
              </form>
              <p className="text-neutral-500 text-sm mt-4">
                Press Enter to search
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
