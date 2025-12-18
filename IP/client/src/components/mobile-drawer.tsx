import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, User, Search } from "lucide-react";
import { useCurrency, GLOBAL_CURRENCIES } from "@/lib/currency-context";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DrawerLink {
  name: string;
  href?: string;
  subcategories?: Array<{ name: string; href: string }>;
}

const drawerLinks: DrawerLink[] = [
  {
    name: "MEN",
    subcategories: [
      { name: "Apparel", href: "/collections/men" },
      { name: "Footwear", href: "/collections/male-footwear" },
      { name: "Accessories", href: "/collections/accessories" }
    ]
  },
  {
    name: "WOMEN",
    subcategories: [
      { name: "Apparel", href: "/collections/women" },
      { name: "Footwear", href: "/collections/female-footwear" },
      { name: "Accessories", href: "/collections/accessories" }
    ]
  },
  {
    name: "SCENTS",
    subcategories: [
      { name: "Men's Perfume", href: "/collections/mens-perfume" },
      { name: "Women's Perfume", href: "/collections/womens-perfume" },
      { name: "Unisex Scents", href: "/collections/unisex-scents" }
    ]
  },
  {
    name: "TECH & GADGETS",
    subcategories: [
      { name: "Smart Devices", href: "/collections/tech" },
      { name: "Wearables", href: "/collections/wearables" },
      { name: "Lifestyle", href: "/collections/lifestyle" }
    ]
  },
  {
    name: "HOME LIVING",
    subcategories: [
      { name: "Décor", href: "/collections/home" },
      { name: "Furniture", href: "/collections/furniture" },
      { name: "Essentials", href: "/collections/home-essentials" }
    ]
  },
  {
    name: "BEAUTY",
    subcategories: [
      { name: "Skincare", href: "/collections/skincare" },
      { name: "Makeup", href: "/collections/makeup" },
      { name: "Wellness", href: "/collections/wellness" }
    ]
  },
  { name: "GIFTS", href: "/collections/gifts" },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { currency, setCurrency } = useCurrency();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[320px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-center p-5 border-b border-neutral-200">
              <span 
                className="text-2xl font-bold tracking-[0.3em] text-black uppercase"
                style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
              >
                ZENTRIX
              </span>
              <button
                onClick={onClose}
                className="absolute right-5 p-2 text-black hover:text-neutral-500 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-0">
              {drawerLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 + 0.1 }}
                >
                  {link.subcategories ? (
                    <>
                      <button
                        onClick={() => toggleCategory(link.name)}
                        className="w-full px-6 py-5 border-b border-neutral-100/50 cursor-pointer hover:bg-neutral-50 transition-all duration-200 hover:border-neutral-300 flex items-center justify-between"
                      >
                        <span className="text-xs font-semibold text-black tracking-[0.1em] uppercase">
                          {link.name}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedCategory === link.name ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4 text-neutral-600" strokeWidth={2} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedCategory === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-neutral-50 overflow-hidden"
                          >
                            {link.subcategories.map((sub) => (
                              <Link key={sub.name} href={sub.href} onClick={onClose}>
                                <div className="px-8 py-4 border-b border-neutral-100 hover:bg-neutral-100 transition-colors">
                                  <span className="text-xs font-medium text-neutral-700 tracking-wider uppercase">
                                    {sub.name}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={link.href!} onClick={onClose}>
                      <div className="px-6 py-5 border-b border-neutral-100/50 cursor-pointer group hover:bg-neutral-50 transition-all duration-200 hover:border-neutral-300">
                        <span className="text-xs font-semibold text-black tracking-[0.1em] uppercase">
                          {link.name}
                        </span>
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="border-t border-neutral-200 p-5 space-y-4">
              <Link href="/account" onClick={onClose}>
                <div className="flex items-center gap-3 py-3 cursor-pointer hover:opacity-70 transition-opacity">
                  <User className="w-5 h-5 text-black" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-black uppercase tracking-wider">Login</span>
                </div>
              </Link>

              <div className="relative">
                <button
                  onClick={() => setCurrencyOpen(!currencyOpen)}
                  className="flex items-center justify-between w-full py-3 text-sm font-medium text-black uppercase tracking-wider"
                >
                  <span>{currency.symbol} {currency.code}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {currencyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-full left-0 right-0 bg-white border border-neutral-200 shadow-lg mb-2 max-h-[300px] overflow-hidden flex flex-col"
                    >
                      <div className="sticky top-0 bg-white border-b border-neutral-100 p-2">
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input
                            type="text"
                            placeholder="Search currency..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-sm border border-neutral-200 rounded focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-[240px]">
                        {GLOBAL_CURRENCIES
                          .filter(c => 
                            c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.name.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((curr) => (
                          <button
                            key={curr.code}
                            onClick={() => {
                              setCurrency(curr);
                              setCurrencyOpen(false);
                              setSearchQuery("");
                            }}
                            className={`w-full px-4 py-3 text-left text-sm hover:bg-neutral-50 ${
                              currency.code === curr.code ? 'bg-neutral-100' : ''
                            }`}
                          >
                            {curr.symbol} {curr.code} - {curr.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
