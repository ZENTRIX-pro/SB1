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
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function ClienteleStories() {
  return (
    <section className="py-16 md:py-20 bg-neutral-100">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
            What Our Clients Say
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black">
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
              className="flex-none snap-start bg-white rounded-2xl p-6 shadow-sm"
              style={{ width: 'calc(85% - 8px)' }}
            >
              <StarRating />
              <blockquote className="text-neutral-700 text-sm leading-relaxed mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center">
                  <span className="text-xs font-semibold text-neutral-600">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-black">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-neutral-500">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-[10px] text-green-600 uppercase tracking-wider mt-3 font-medium">
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
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <StarRating />
              <blockquote className="text-neutral-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                  <span className="text-sm font-semibold text-neutral-600">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-black">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-neutral-500">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-xs text-green-600 uppercase tracking-wider mt-4 font-medium">
                Verified Buyer
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
