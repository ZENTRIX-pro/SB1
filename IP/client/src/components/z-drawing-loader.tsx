import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ZDrawingLoaderProps {
  onComplete?: () => void;
}

export function ZDrawingLoader({ onComplete }: ZDrawingLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAnimationComplete = useCallback(() => {
    setIsVisible(false);
    onComplete?.();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 md:w-32 md:h-32"
          >
            <motion.path
              d="M20 20 L80 20 L20 80 L80 80"
              stroke="url(#goldGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 1.5, ease: "easeInOut" },
                opacity: { duration: 0.2 }
              }}
              onAnimationComplete={handleAnimationComplete}
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="50%" stopColor="#F5E6A3" />
                <stop offset="100%" stopColor="#C5A028" />
              </linearGradient>
            </defs>
          </svg>
          
          <motion.p
            className="absolute bottom-1/3 text-xs tracking-[0.3em] text-neutral-500 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Define Your Future
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
