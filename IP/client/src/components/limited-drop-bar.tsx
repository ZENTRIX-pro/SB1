import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { fetchCollectionByHandle } from "@/lib/shopify";
import { Link } from "wouter";

export function LimitedDropBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    async function checkLimitedDrop() {
      try {
        const { products } = await fetchCollectionByHandle("limited-drop");
        if (products && products.length > 0) {
          setProductCount(products.length);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } catch (error) {
        console.error("Error checking limited drop collection:", error);
        setIsVisible(false);
      }
    }

    checkLimitedDrop();
  }, []);

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-black text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex-1" />
          
          <Link href="/collections/limited-drop">
            <div className="flex items-center gap-2 cursor-pointer group">
              <AlertTriangle className="w-4 h-4 text-[#B91C1C]" />
              <span className="text-xs md:text-sm font-medium tracking-wider uppercase">
                Exclusive Drop Live - {productCount} Items Available
              </span>
              <span className="text-xs text-white/60 hidden md:inline group-hover:text-white transition-colors">
                Shop Now →
              </span>
            </div>
          </Link>
          
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-white/60 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
