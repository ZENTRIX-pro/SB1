import { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Check, ShoppingBag } from "lucide-react";
import { getProductById, categories } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { Footer } from "@/components/footer";
import { CustomerReviews } from "@/components/customer-reviews";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const [, setLocation] = useLocation();
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-black mb-4">Product not found</h1>
          <Link href="/">
            <span className="text-blue-600 hover:underline cursor-pointer">Return home</span>
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.slug === product.category);

  const handleAddToBag = () => {
    addItem(
      product,
      quantity,
      selectedSize || product.sizes?.[0],
      selectedColor || product.colors?.[0]
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(
      product,
      quantity,
      selectedSize || product.sizes?.[0],
      selectedColor || product.colors?.[0]
    );
    setLocation("/checkout");
  };

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-14 bg-white"
        data-testid={`page-product-${id}`}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/">
              <span className="text-neutral-500 hover:text-black cursor-pointer transition-colors">
                Home
              </span>
            </Link>
            <span className="text-neutral-300">/</span>
            {category && (
              <>
                <Link href={`/category/${category.slug}`}>
                  <span className="text-neutral-500 hover:text-black cursor-pointer transition-colors">
                    {category.name.replace("ZENTRIX ", "").replace("Z-", "")}
                  </span>
                </Link>
                <span className="text-neutral-300">/</span>
              </>
            )}
            <span className="text-black">{product.name}</span>
          </div>
        </div>

        <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="lg:sticky lg:top-20 lg:self-start lg:h-fit">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F5F7]"
                data-testid="img-product-main"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs font-medium rounded-full" data-testid="badge-new-arrival">
                    NEW
                  </span>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="py-2"
            >
              {category && (
                <Link href={`/category/${product.category}`}>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                    {category.name.replace("ZENTRIX ", "").replace("Z-", "")}
                  </span>
                </Link>
              )}

              <h1 className="text-2xl md:text-3xl font-semibold text-black mt-2 mb-2">
                {product.name}
              </h1>

              <p className="text-xl text-black mb-6">
                ${product.price.toLocaleString()}
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-black">Size</h3>
                    <button className="text-sm text-blue-600 hover:underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "bg-neutral-100 text-black hover:bg-neutral-200"
                        }`}
                        data-testid={`button-size-${size}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-black mb-3">
                    Color: {selectedColor || product.colors[0]}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          (selectedColor || product.colors?.[0]) === color
                            ? "bg-black text-white"
                            : "bg-neutral-100 text-black hover:bg-neutral-200"
                        }`}
                        data-testid={`button-color-${color.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-medium text-black mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-neutral-200 transition-colors"
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium text-black w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-neutral-200 transition-colors"
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToBag}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border border-neutral-300 hover:border-neutral-400 rounded-full text-sm font-medium text-black transition-colors"
                  data-testid="button-add-to-bag"
                >
                  <AnimatePresence mode="wait">
                    {added ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Added
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Bag
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium text-white transition-colors"
                  data-testid="button-buy-now"
                >
                  Buy Now — ${(product.price * quantity).toLocaleString()}
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-neutral-200 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-black mb-2">Details</h4>
                  <ul className="text-sm text-neutral-600 space-y-1.5">
                    <li>Premium quality materials</li>
                    <li>Handcrafted with precision</li>
                    <li>Designed for timeless elegance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black mb-2">Shipping</h4>
                  <p className="text-sm text-neutral-600">
                    Complimentary shipping on all orders over $500. 
                    Standard delivery within 3-5 business days.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-black mb-2">Returns</h4>
                  <p className="text-sm text-neutral-600">
                    30-day return policy on all unworn items with original tags attached.
                  </p>
                </div>
              </div>

              <CustomerReviews productId={id || ""} />
            </motion.div>
          </div>
        </section>

        <Footer />
      </motion.main>
    </>
  );
}
