import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "The silk quality is unmatched. Truly feels like a masterpiece.",
    author: "Sarah J.",
    location: "London",
  },
  {
    id: 2,
    quote: "Fast shipping to New York and the packaging was exquisite.",
    author: "David R.",
    location: "USA",
  },
  {
    id: 3,
    quote: "I love the Heritage collection. A perfect blend of tradition and style.",
    author: "Priya K.",
    location: "Toronto",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
      ))}
    </div>
  );
}

export function ClienteleStories() {
  return (
    <section className="py-16 md:py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-2">
            What Our Clients Say
          </p>
          <h2 className="text-2xl md:text-3xl font-light text-white tracking-wide">
            Clientele Stories
          </h2>
        </motion.div>

        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 -mx-4 px-4">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="flex-none snap-start bg-neutral-900 border border-white/5 rounded-2xl p-6"
              style={{ width: 'calc(85% - 8px)' }}
            >
              <StarRating />
              <blockquote className="text-white/70 text-sm leading-relaxed mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-[#D4AF37]">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-white/40">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider mt-3 font-medium">
                Verified Buyer
              </p>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-neutral-900 border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/20 transition-colors"
            >
              <StarRating />
              <blockquote className="text-white/70 text-sm leading-relaxed mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <span className="text-xs font-medium text-[#D4AF37]">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-white/40">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-[10px] text-[#D4AF37] uppercase tracking-wider mt-3 font-medium">
                Verified Buyer
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
