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
    <section ref={sectionRef} className="relative py-24 md:py-40 bg-[#1D1D1F] overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div style={{ y: imageY }} className="relative order-2 md:order-1">
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

          <motion.div style={{ y: textY }} className="order-1 md:order-2">
            <motion.div style={{ opacity }}>
              <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-4">
                Limited Edition
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight mb-6">
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
                  className="px-8 py-4 bg-white text-[#1D1D1F] text-sm font-semibold tracking-wide rounded-full hover:bg-white/90 transition-colors"
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
