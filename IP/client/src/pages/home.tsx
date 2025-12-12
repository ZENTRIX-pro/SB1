import { motion } from "framer-motion";
import { HeroAutoSlider } from "@/components/hero-auto-slider";
import { RibbonBar } from "@/components/ribbon-bar";
import { BentoGrid } from "@/components/bento-grid";
import { GlobalAtelier } from "@/components/global-atelier";
import { SignatureParallax } from "@/components/signature-parallax";
import { TrendingSection } from "@/components/trending-section";
import { TrustBadges } from "@/components/trust-badges";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[#F5F5F7]"
      data-testid="page-home"
    >
      <HeroAutoSlider />
      <RibbonBar />
      <BentoGrid />
      <GlobalAtelier />
      <SignatureParallax />
      <TrendingSection />
      <TrustBadges />
      <Footer />
    </motion.main>
  );
}
