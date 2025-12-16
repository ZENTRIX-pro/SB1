import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ZDrawingLoaderProps {
  onComplete?: () => void;
}

export function ZDrawingLoader({ onComplete }: ZDrawingLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: [0, 1, 1, 1],
              scale: [0.95, 1, 1.02, 1]
            }}
            transition={{ 
              duration: 2,
              times: [0, 0.3, 0.6, 1],
              ease: "easeOut"
            }}
          >
            <motion.h1 
              className="text-3xl md:text-5xl font-semibold tracking-[0.25em] bg-gradient-to-r from-[#D4AF37] via-[#F4E4BC] to-[#D4AF37] bg-clip-text text-transparent"
              style={{ fontFamily: 'Cinzel, serif' }}
              animate={{ 
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ZENTRIX
            </motion.h1>
            
            <motion.div 
              className="w-20 h-[1px] mx-auto mt-4 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
          
          <motion.p
            className="absolute bottom-1/3 text-xs tracking-[0.3em] text-white/40 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Define Your Future
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
