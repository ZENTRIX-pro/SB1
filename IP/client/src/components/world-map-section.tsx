import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

interface Hotspot {
  id: string;
  name: string;
  tooltip: string;
  href: string;
  x: string;
  y: string;
}

const hotspots: Hotspot[] = [
  { id: "sweden", name: "Sweden", tooltip: "Nordic Zen", href: "/collections/men", x: "52%", y: "18%" },
  { id: "italy", name: "Italy", tooltip: "Italian Classico", href: "/collections/women", x: "51%", y: "32%" },
  { id: "japan", name: "Japan", tooltip: "Eastern Soul", href: "/collections/tech", x: "85%", y: "35%" },
  { id: "india", name: "India", tooltip: "Royal Heritage", href: "/heritage", x: "70%", y: "45%" },
];

function PulsingDot({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 -m-3 rounded-full bg-[#D4AF37]/30"
        animate={{ 
          scale: [1, 2, 1], 
          opacity: [0.6, 0, 0.6] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div
        className="absolute inset-0 -m-2 rounded-full bg-[#D4AF37]/20"
        animate={{ 
          scale: [1, 1.5, 1], 
          opacity: [0.4, 0, 0.4] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.3 
        }}
      />
      <motion.div 
        className="w-4 h-4 rounded-full bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/50"
        animate={{ scale: isHovered ? 1.3 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}

export function WorldMapSection() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section id="world-map-section" className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden mt-12">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(212, 175, 55, 0.15) 1px, transparent 1px),
            radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, transparent 0%, transparent 20%, rgba(212, 175, 55, 0.03) 20%, rgba(212, 175, 55, 0.03) 21%, transparent 21%),
            radial-gradient(circle at 50% 50%, transparent 0%, transparent 35%, rgba(212, 175, 55, 0.03) 35%, rgba(212, 175, 55, 0.03) 36%, transparent 36%),
            radial-gradient(circle at 50% 50%, transparent 0%, transparent 50%, rgba(212, 175, 55, 0.03) 50%, rgba(212, 175, 55, 0.03) 51%, transparent 51%),
            radial-gradient(circle at 50% 50%, transparent 0%, transparent 65%, rgba(212, 175, 55, 0.03) 65%, rgba(212, 175, 55, 0.03) 66%, transparent 66%),
            radial-gradient(circle at 50% 50%, transparent 0%, transparent 80%, rgba(212, 175, 55, 0.02) 80%, rgba(212, 175, 55, 0.02) 81%, transparent 81%)
          `,
          backgroundSize: '40px 40px, 20px 20px, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%',
          backgroundPosition: 'center'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">Global Inspiration</p>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-wide">
            World of ZENTRIX
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Discover collections inspired by the world's most iconic design philosophies
          </p>
        </motion.div>

        <div className="relative aspect-[2/1] max-w-4xl mx-auto">
          {hotspots.map((hotspot) => (
            <motion.div
              key={hotspot.id}
              className="absolute"
              style={{ left: hotspot.x, top: hotspot.y }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href={hotspot.href}>
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={() => setActiveHotspot(hotspot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <PulsingDot isHovered={activeHotspot === hotspot.id} />
                  
                  <AnimatePresence>
                    {activeHotspot === hotspot.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 whitespace-nowrap z-10"
                      >
                        <div className="bg-black/90 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg px-4 py-2">
                          <p className="text-[#D4AF37] text-sm font-medium">{hotspot.tooltip}</p>
                          <p className="text-white/50 text-xs">{hotspot.name}</p>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 w-2 h-2 bg-black/90 border-r border-b border-[#D4AF37]/30 rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          style={{ gridTemplateRows: '1fr' }}
        >
          {hotspots.map((hotspot, index) => (
            <motion.div
              key={hotspot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Link href={hotspot.href}>
                <div 
                  className="group relative w-full overflow-hidden rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 cursor-pointer"
                  style={{ aspectRatio: '3/4', minHeight: '320px' }}
                >
                  <img
                    src={`https://images.unsplash.com/photo-1${1234567890 + index}?auto=format&fit=crop&w=500&q=80`}
                    alt={hotspot.tooltip}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 flex flex-col items-center justify-end p-6 group-hover:to-black/70 transition-all duration-300">
                    <p className="text-[#D4AF37] text-lg font-light text-center">{hotspot.tooltip}</p>
                    <p className="text-white/40 text-sm text-center mt-1">{hotspot.name}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
