import { motion } from "framer-motion";

export function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] bg-neutral-200 rounded-2xl mb-3" />
      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-neutral-200 rounded w-1/4" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
}

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{ 
          opacity: [0.6, 1, 0.6],
          scale: [0.98, 1, 0.98]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="text-center"
      >
        <h2 
          className="text-3xl md:text-4xl font-semibold tracking-[0.25em] mb-4 bg-gradient-to-r from-[#D4AF37] via-[#F4E4BC] to-[#D4AF37] bg-clip-text text-transparent"
          style={{ fontFamily: 'Cinzel, serif' }}
        >
          ZENTRIX
        </h2>
        <motion.div 
          className="w-16 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-white/40 text-xs mt-4 tracking-[0.3em] uppercase">Loading luxury...</p>
      </motion.div>
    </motion.div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-neutral-200" />
      <div className="h-3 bg-neutral-200 rounded w-16 mt-3" />
    </div>
  );
}
