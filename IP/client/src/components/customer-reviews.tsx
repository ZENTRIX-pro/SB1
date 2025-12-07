import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  name: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
}

interface CustomerReviewsProps {
  productId: string;
}

const generateMockReviews = (productId: string): Review[] => {
  const reviewSets: { [key: string]: Review[] } = {
    default: [
      {
        id: 1,
        name: "Alexandra M.",
        rating: 5,
        title: "Exceptional Quality",
        comment: "Absolutely stunning craftsmanship. The attention to detail is remarkable and it exceeded all my expectations.",
        date: "November 28, 2025",
      },
      {
        id: 2,
        name: "Michael T.",
        rating: 4,
        title: "Beautiful Design",
        comment: "Love the minimalist aesthetic. Shipping was fast and the packaging was premium quality.",
        date: "November 15, 2025",
      },
      {
        id: 3,
        name: "Sophie L.",
        rating: 5,
        title: "Worth Every Penny",
        comment: "This is exactly what I was looking for. The quality justifies the price point completely.",
        date: "October 30, 2025",
      },
    ],
  };

  const hash = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variations = [
    { name: "James K.", title: "Impressed!", comment: "The material quality is outstanding. Very satisfied with my purchase." },
    { name: "Emma R.", title: "Perfect Gift", comment: "Bought this as a gift and it was a huge hit. Beautiful presentation." },
    { name: "David H.", title: "Luxurious Feel", comment: "You can tell this is premium quality the moment you touch it." },
  ];

  const baseReviews = reviewSets.default.map((review, idx) => ({
    ...review,
    name: variations[(hash + idx) % variations.length].name,
    title: variations[(hash + idx) % variations.length].title,
    comment: variations[(hash + idx) % variations.length].comment,
    rating: 4 + ((hash + idx) % 2),
  }));

  return baseReviews;
};

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-neutral-200 text-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

function InteractiveStarRating({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange: (rating: number) => void;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="p-1 transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              star <= (hoverRating || rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-neutral-200 text-neutral-200"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewFormModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: Omit<Review, "id" | "date">) => void;
}) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !rating || !title || !comment) return;

    onSubmit({ name, rating, title, comment });
    setName("");
    setRating(0);
    setTitle("");
    setComment("");
  };

  const isValid = name && rating > 0 && title && comment;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-neutral-100">
                <h2 className="text-lg font-semibold text-black">Write a Review</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-500 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Rating
                  </label>
                  <InteractiveStarRating rating={rating} onRatingChange={setRating} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Sum up your experience"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this product"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-black focus:outline-none transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full py-3.5 rounded-full text-sm font-medium transition-colors ${
                    isValid
                      ? "bg-black text-white hover:bg-neutral-800"
                      : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                  }`}
                >
                  Submit Review
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function CustomerReviews({ productId }: CustomerReviewsProps) {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(() => generateMockReviews(productId));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  const handleSubmitReview = (newReview: Omit<Review, "id" | "date">) => {
    const review: Review = {
      ...newReview,
      id: Date.now(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setReviews((prev) => [review, ...prev]);
    setIsModalOpen(false);

    toast({
      title: "Thank you!",
      description: "Your review has been submitted for moderation.",
    });
  };

  return (
    <section className="mt-12 pt-10 border-t border-neutral-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">Customer Reviews</h3>
            <div className="flex items-center gap-3">
              <StarRating rating={Math.round(averageRating)} size="md" />
              <span className="text-neutral-600">
                {averageRating.toFixed(1)}/5 based on {totalReviews} reviews
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 border border-black text-black rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Write a Review
          </button>
        </div>

        <div className="space-y-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="pb-6 border-b border-neutral-100 last:border-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-black">{review.name}</span>
                    <StarRating rating={review.rating} />
                  </div>
                  <h4 className="font-medium text-black">{review.title}</h4>
                </div>
                <span className="text-xs text-neutral-500">{review.date}</span>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <ReviewFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReview}
      />
    </section>
  );
}
