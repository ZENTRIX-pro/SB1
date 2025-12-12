import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, Clock } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "Secure Payment",
    description: "256-bit SSL encryption"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $200"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated assistance"
  }
];

export function TrustBadges() {
  return (
    <section className="py-12 px-4 md:px-6 bg-neutral-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 mb-3">
                <badge.icon className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-white mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-white/50">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
