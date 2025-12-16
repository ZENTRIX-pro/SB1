import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, User } from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerLinks = [
  { name: "NEW ARRIVALS", href: "/collections/new" },
  { name: "MEN", href: "/collections/men" },
  { name: "WOMEN", href: "/collections/women" },
  { name: "TECH & GADGETS", href: "/collections/tech" },
  { name: "HOME LIVING", href: "/collections/home" },
  { name: "BEAUTY", href: "/collections/beauty" },
  { name: "GIFTS", href: "/collections/gifts" },
];

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);

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
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[320px] bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-neutral-200">
              <span 
                className="text-xl font-bold tracking-[0.25em] text-black uppercase"
                style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
              >
                ZENTRIX
              </span>
              <button
                onClick={onClose}
                className="p-2 text-black hover:text-neutral-500 transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
              {drawerLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <Link href={link.href} onClick={onClose}>
                    <div className="px-6 py-4 border-b border-neutral-100 cursor-pointer group hover:bg-neutral-50 transition-colors">
                      <span className="text-sm font-bold text-black tracking-wider uppercase">
                        {link.name}
                      </span>
                    </div>
                  </Link>
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
                  <span>{selectedCurrency.symbol} {selectedCurrency.code}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {currencyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-full left-0 right-0 bg-white border border-neutral-200 shadow-lg mb-2"
                    >
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => {
                            setSelectedCurrency(currency);
                            setCurrencyOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-neutral-50 ${
                            selectedCurrency.code === currency.code ? 'bg-neutral-100' : ''
                          }`}
                        >
                          {currency.symbol} {currency.code} - {currency.name}
                        </button>
                      ))}
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
