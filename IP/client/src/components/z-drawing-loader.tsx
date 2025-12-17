import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ZDrawingLoaderProps {
  onComplete?: () => void;
}

const LOADER_SHOWN_KEY = "zentrix_loader_shown";

export function ZDrawingLoader({ onComplete }: ZDrawingLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const hasShownLoader = sessionStorage.getItem(LOADER_SHOWN_KEY);
    
    if (!hasShownLoader) {
      setShouldShow(true);
      setIsVisible(true);
      sessionStorage.setItem(LOADER_SHOWN_KEY, "true");
      
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [onComplete]);

  if (!shouldShow) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1D1D1F]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-light tracking-[0.4em] text-white uppercase"
              style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
              animate={{ 
                scale: [1, 1.02, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ZENTRIX
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
