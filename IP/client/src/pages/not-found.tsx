import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
          404
        </p>
        <h1 className="text-4xl md:text-5xl font-extralight text-foreground tracking-tight mb-6">
          Page Not Found
        </h1>
        <p className="text-muted-foreground font-light mb-10">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg" data-testid="button-back-home">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
