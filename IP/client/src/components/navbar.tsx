import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, User, Crown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { MobileDrawer } from "@/components/mobile-drawer";

const navLinks = [
  { name: "Men", href: "/collections/men" },
  { name: "Women", href: "/collections/women" },
  { name: "Scents", href: "/collections/scents" },
  { name: "Tech", href: "/collections/tech" },
  { name: "Home", href: "/collections/home" },
  { name: "Beauty", href: "/collections/beauty" },
];

const premiumLinks = [
  { name: "ZENTRIX BLACK", href: "/products/zentrix-black-membership", isPremium: true },
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
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 relative">
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-black hover:text-neutral-500 transition-colors lg:hidden flex-shrink-0"
                data-testid="button-mobile-menu"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <div className="hidden lg:flex items-center gap-6">
                {navLinks.slice(0, 3).map((link) => (
                  <Link key={link.name} href={link.href}>
                    <span
                      className={`text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors hover:text-neutral-500 ${
                        location === link.href
                          ? "text-black"
                          : "text-neutral-700"
                      }`}
                      data-testid={`link-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <Link href="/" data-testid="link-home">
                <span 
                  className="text-2xl font-bold tracking-[0.3em] text-black cursor-pointer uppercase whitespace-nowrap"
                  style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
                >
                  ZENTRIX
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-6 flex-1 justify-end min-w-0">
              {navLinks.slice(3).map((link) => (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors hover:text-neutral-500 ${
                      location === link.href
                        ? "text-black"
                        : "text-neutral-700"
                    }`}
                    data-testid={`link-nav-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
              {/* Crown Membership Link */}
              <Link href="/products/zentrix-black-membership">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 cursor-pointer"
                >
                  <Crown
                    className={`w-5 h-5 transition-colors ${
                      location === "/products/zentrix-black-membership"
                        ? "text-[#D4AF37] fill-[#D4AF37]"
                        : "text-[#D4AF37] hover:text-[#E8C547] fill-[#D4AF37]/40 hover:fill-[#E8C547]"
                    }`}
                    data-testid="icon-membership-crown"
                  />
                </motion.div>
              </Link>
              {premiumLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider cursor-pointer transition-all hidden ${
                      location === link.href
                        ? "text-[#D4AF37]"
                        : "text-[#D4AF37] hover:text-[#E8C547] drop-shadow-sm"
                    }`}
                    data-testid={`link-nav-zentrix-black`}
                    style={{ textShadow: "0 1px 2px rgba(212, 175, 55, 0.1)" }}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-black hover:text-neutral-500 transition-colors"
                data-testid="button-search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>

              <Link href="/account">
                <span
                  className="p-2.5 text-black hover:text-neutral-500 transition-colors cursor-pointer inline-block"
                  data-testid="button-account"
                >
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </span>
              </Link>

              <button
                onClick={openCart}
                className="p-2.5 text-black hover:text-neutral-500 transition-colors relative"
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
                  className="w-full bg-neutral-100 rounded-none border-b-2 border-black px-4 py-4 text-lg text-black placeholder:text-neutral-400 focus:outline-none"
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
