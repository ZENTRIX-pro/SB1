import { motion } from "framer-motion";
import { Hero } from "@/components/hero";
import { CategoryScroll } from "@/components/category-scroll";
import { NewArrivals } from "@/components/new-arrivals";
import { TrendingSection } from "@/components/trending-section";
import { SignatureSeries } from "@/components/signature-series";
import { HeritageEdition } from "@/components/heritage-edition";
import { TrustBadges } from "@/components/trust-badges";
import { ClienteleStories } from "@/components/clientele-stories";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white"
      data-testid="page-home"
    >
      <Hero />
      <CategoryScroll />
      <NewArrivals />
      <TrendingSection />
      <SignatureSeries />
      <HeritageEdition />
      <TrustBadges />
      <ClienteleStories />
      <Footer />
    </motion.main>
  );
}
