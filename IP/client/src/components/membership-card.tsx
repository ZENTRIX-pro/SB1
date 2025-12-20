import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown, Check, Gift, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProductByHandle } from "@/lib/shopify";
import { useCart } from "@/lib/cart-context";

export function MembershipCard() {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        setLoading(true);
        const membershipProduct = await fetchProductByHandle("zentrix-black-membership");
        if (membershipProduct) {
          setProduct(membershipProduct);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load membership");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, []);

  const handleAddToCart = () => {
    if (product?.id) {
      const imageUrl = product.images?.[0]?.src || "";
      addItem({
        id: product.id,
        name: product.title,
        description: product.description || "",
        price: parseFloat(product.variants?.[0]?.price?.amount || "9.99"),
        category: "membership",
        image: imageUrl,
        isNew: false,
      });
      setTimeout(() => {
        window.location.href = '/checkout';
      }, 100);
    }
  };

  if (loading) {
    return (
      <section className="w-full py-20 px-4 md:px-8 bg-black">
        <div className="max-w-6xl mx-auto h-80 bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl animate-pulse" />
      </section>
    );
  }

  if (!product) return null;

  const price = product.variants?.[0]?.price?.amount || "9.99";
  const imageUrl = product.images?.[0]?.src;

  return (
    <section className="w-full py-20 px-4 md:px-8 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Glassmorphism Dark Card */}
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-black/50 rounded-3xl border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-10 md:py-12 px-6 md:px-12">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col justify-center space-y-6"
            >
              {/* Premium Badge */}
              <div className="flex items-center gap-2 w-fit">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-widest font-bold text-[#D4AF37]">
                  Premium Membership
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-4xl md:text-5xl font-light text-white tracking-tight"
                style={{ fontFamily: "Georgia, serif" }}
              >
                UNLOCK ZENTRIX BLACK
              </h2>

              {/* Benefits List - Displayed above button */}
              <div className="space-y-3 py-6 border-y border-white/20">
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#D4AF37]">Instant Benefit</p>
                    <p className="text-xs text-white/80">Get a $20 Store Credit immediately</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#D4AF37]">Lifetime Privilege</p>
                    <p className="text-xs text-white/80">Never pay for shipping again</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Crown className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#D4AF37]">VIP Status</p>
                    <p className="text-xs text-white/80">Priority access to exclusive drops</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-2"
              >
                <Button
                  onClick={handleAddToCart}
                  className="w-full md:w-fit bg-[#D4AF37] text-black hover:bg-[#E8C547] font-bold text-sm uppercase tracking-wide py-3 px-8 transition-all duration-300"
                >
                  Become a Member - ${price}
                </Button>
              </motion.div>
            </motion.div>

            {/* Image Side - Optimized for mobile */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              {imageUrl && (
                <div className="relative max-h-[200px] md:max-h-none md:h-96 rounded-2xl overflow-hidden border border-white/20">
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain md:object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
