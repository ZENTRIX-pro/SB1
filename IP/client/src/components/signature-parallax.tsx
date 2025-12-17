import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import signatureImage from "@assets/generated_images/luxury_leather_bag_product.png";

interface SignatureParallaxProps {
  videoUrl?: string;
  showVideoBackground?: boolean;
}

export function SignatureParallax({ 
  videoUrl,
  showVideoBackground = false 
}: SignatureParallaxProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-40 bg-[#1D1D1F] overflow-hidden">
      {showVideoBackground && videoUrl ? (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F]/80 via-black/60 to-[#1D1D1F]/80" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F] via-black to-[#1D1D1F]" />
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="md:hidden relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <img
              src={signatureImage}
              alt="Signature Series"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-2">
                Limited Edition
              </p>
              <h2 className="text-3xl font-semibold text-white tracking-tight leading-tight mb-3 transition-colors duration-300 hover:text-[#D4AF37]">
                Signature
                <span className="font-light italic"> Series</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Crafted for those who appreciate the extraordinary.
              </p>
              <Link href="/collections/signature">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white text-[#1D1D1F] text-sm font-semibold tracking-wide rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors duration-300"
                >
                  Discover Collection
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div style={{ y: imageY }} className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src={signatureImage}
                alt="Signature Series"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 border border-white/10 rounded-2xl"
              style={{ opacity }}
            />
            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"
              style={{ opacity }}
            />
          </motion.div>

          <motion.div style={{ y: textY }}>
            <motion.div style={{ opacity }}>
              <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-4">
                Limited Edition
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight mb-6 transition-colors duration-300 hover:text-[#D4AF37] cursor-pointer">
                Signature
                <br />
                <span className="font-light italic">Series</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md">
                Crafted for those who appreciate the extraordinary. Each piece in our Signature Series 
                represents the pinnacle of luxury craftsmanship.
              </p>
              <Link href="/collections/signature">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white text-[#1D1D1F] text-sm font-semibold tracking-wide rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors duration-300"
                >
                  Discover Collection
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
