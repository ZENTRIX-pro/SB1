import { motion } from "framer-motion";
import { Shield, Truck, RefreshCw, CreditCard } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $200"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "256-bit SSL encryption"
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy"
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Pay in installments"
  }
];

export function TrustBadges() {
  return (
    <section className="py-10 md:py-14 px-4 bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-3 md:gap-8">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full bg-white border border-neutral-200 mb-2 md:mb-3">
                <badge.icon className="w-4 h-4 md:w-6 md:h-6 text-black" strokeWidth={1.5} />
              </div>
              <h3 className="text-[10px] md:text-sm font-semibold text-black mb-0.5 md:mb-1 leading-tight">
                {badge.title}
              </h3>
              <p className="text-[8px] md:text-xs text-neutral-500 leading-tight hidden md:block">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
