import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, ShoppingBag, Crown, Briefcase, Wallet, HeadphonesIcon } from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop Men", href: "/collections/men", icon: ShoppingBag },
  { name: "Shop Women", href: "/collections/women", icon: ShoppingBag },
  { name: "Jewelry", href: "/collections/jewelry", icon: Crown },
  { name: "Bags", href: "/collections/bags", icon: Briefcase },
  { name: "Accessories", href: "/collections/wallets", icon: Wallet },
  { name: "Support", href: "/support", icon: HeadphonesIcon },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-[#111111] z-50 shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span 
                className="text-lg font-semibold tracking-[0.15em] bg-gradient-to-r from-[#D4AF37] via-[#F4E4BC] to-[#D4AF37] bg-clip-text text-transparent"
                style={{ fontFamily: 'Cinzel, serif' }}
              >
                ZENTRIX
              </span>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="p-4">
              {drawerLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <Link href={link.href} onClick={onClose}>
                    <div className="flex items-center gap-4 py-4 border-b border-white/10 cursor-pointer group">
                      <link.icon className="w-5 h-5 text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
                      <span className="text-base font-medium text-white/80 group-hover:text-[#D4AF37] transition-colors">
                        {link.name}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
              <p className="text-xs text-white/30 text-center tracking-wider">
                Premium Luxury Since 2026
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
