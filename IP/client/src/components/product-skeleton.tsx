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
      className="min-h-[400px] flex flex-col items-center justify-center bg-white"
    >
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="text-center"
      >
        <h2 
          className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-black uppercase"
          style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}
        >
          ZENTRIX
        </h2>
        <motion.div 
          className="w-12 h-[2px] mx-auto mt-3 bg-black"
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-neutral-400 text-xs mt-4 tracking-widest uppercase">Loading...</p>
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
