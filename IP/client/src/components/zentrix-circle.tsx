import { motion } from "framer-motion";

interface CustomerStory {
  id: string;
  name: string;
  city: string;
  quote: string;
  image: string;
}

const customerStories: CustomerStory[] = [
  {
    id: "1",
    name: "Alexandra Chen",
    city: "New York",
    quote: "ZENTRIX pieces have become the cornerstone of my wardrobe. The attention to detail and quality is unmatched.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "2",
    name: "Marcus Andersson",
    city: "Stockholm",
    quote: "Finally, a brand that understands modern luxury. Every piece tells a story of craftsmanship and elegance.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "3",
    name: "Priya Sharma",
    city: "Mumbai",
    quote: "The fusion of heritage and contemporary design speaks to my soul. ZENTRIX is my go-to for timeless pieces.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  }
];

export function ZentrixCircle() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">Our Community</p>
          <h2 className="text-3xl md:text-5xl font-light text-[#1D1D1F] tracking-tight">
            The ZENTRIX Circle
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {customerStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-[#D4AF37]/30" />
              </div>
              
              <blockquote className="text-[#1D1D1F]/70 text-base md:text-lg leading-relaxed mb-6 italic">
                "{story.quote}"
              </blockquote>
              
              <div>
                <p className="text-[#1D1D1F] font-semibold tracking-wide">
                  {story.name}
                </p>
                <p className="text-[#1D1D1F]/50 text-sm">
                  {story.city}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
