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
    <section id="world-map-section" className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#D4AF37" strokeWidth="0.3" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path
            d="M100,200 Q150,180 200,190 T300,185 T400,200 T500,195 T600,210 T700,200 T800,210 T900,200"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.5"
            opacity="0.4"
          />
          <ellipse cx="200" cy="250" rx="80" ry="60" fill="none" stroke="#D4AF37" strokeWidth="0.3" opacity="0.3" />
          <ellipse cx="500" cy="230" rx="120" ry="80" fill="none" stroke="#D4AF37" strokeWidth="0.3" opacity="0.3" />
          <ellipse cx="750" cy="260" rx="100" ry="70" fill="none" stroke="#D4AF37" strokeWidth="0.3" opacity="0.3" />
        </svg>
      </div>

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

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {hotspots.map((hotspot, index) => (
            <motion.div
              key={hotspot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={hotspot.href}>
                <div className="group p-4 border border-white/10 rounded-xl hover:border-[#D4AF37]/30 transition-colors cursor-pointer">
                  <p className="text-[#D4AF37] text-lg font-light">{hotspot.tooltip}</p>
                  <p className="text-white/40 text-sm">{hotspot.name}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
