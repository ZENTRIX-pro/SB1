import { motion } from "framer-motion";
import { CinematicHero } from "@/components/cinematic-hero";
import { RibbonBar } from "@/components/ribbon-bar";
import { EssentialsGrid } from "@/components/essentials-grid";
import { WorldMapSection } from "@/components/world-map-section";
import { SignatureParallax } from "@/components/signature-parallax";
import { GiftGuide } from "@/components/gift-guide";
import { TrustBadges } from "@/components/trust-badges";
import { ClienteleStories } from "@/components/clientele-stories";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-neutral-950"
      data-testid="page-home"
    >
      <CinematicHero />
      <RibbonBar />
      <EssentialsGrid />
      <WorldMapSection />
      <SignatureParallax />
      <GiftGuide />
      <TrustBadges />
      <ClienteleStories />
      <Footer />
    </motion.main>
  );
}
