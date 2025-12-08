import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Check, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { useShopify } from "@/lib/shopify-context";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/lib/cart-context";
import { Footer } from "@/components/footer";
import { CustomerReviews } from "@/components/customer-reviews";
import { LoadingScreen } from "@/components/product-skeleton";

function ImageGallery({ images, productTitle }: { images: ShopifyProduct["images"]; productTitle: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F5F7]">
        <img
          src="https://placehold.co/600x600?text=No+Image"
          alt={productTitle}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F5F7]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex].src}
            alt={images[currentIndex].altText || productTitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:bg-white transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:bg-white transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-black w-6" : "bg-black/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                idx === currentIndex ? "border-amber-500" : "border-transparent"
              }`}
            >
              <img
                src={img.src}
                alt={img.altText || `${productTitle} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading: contextLoading } = useShopify();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      
      let foundProduct = products.find((p) => p.handle === id);
      
      if (!foundProduct && !contextLoading) {
        foundProduct = await fetchProductByHandle(id || "") || undefined;
      }
      
      if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.variants.length > 0) {
          setSelectedVariant(foundProduct.variants[0].id);
        }
      }
      
      setIsLoading(false);
    };
    
    if (id) {
      loadProduct();
    }
  }, [id, products, contextLoading]);

  if (isLoading || contextLoading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-14 bg-white min-h-screen"
      >
        <LoadingScreen />
      </motion.main>
    );
  }

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

  const price = parseFloat(product.variants[0]?.price.amount || "0");
  const selectedVariantData = product.variants.find((v) => v.id === selectedVariant);

  const handleAddToBag = () => {
    const cartProduct = {
      id: product.handle,
      name: product.title,
      description: product.description,
      price: price,
      category: product.productType,
      image: product.images[0]?.src || "",
      isNew: true,
    };
    addItem(cartProduct, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedVariant) {
      console.error("No variant selected");
      return;
    }
    
    const variantIdMatch = selectedVariant.match(/ProductVariant\/(\d+)/);
    const variantIdNumber = variantIdMatch ? variantIdMatch[1] : selectedVariant.split("/").pop();
    
    if (!variantIdNumber) {
      console.error("Could not extract variant ID");
      return;
    }
    
    const checkoutUrl = `https://p52yuw-uq.myshopify.com/cart/${variantIdNumber}:${quantity}`;
    window.location.href = checkoutUrl;
  };

  const sizeOption = product.options.find((opt) => opt.name.toLowerCase() === "size");
  const colorOption = product.options.find((opt) => opt.name.toLowerCase() === "color");

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
            {product.productType && (
              <>
                <Link href={`/category/${product.productType.toLowerCase()}`}>
                  <span className="text-neutral-500 hover:text-black cursor-pointer transition-colors">
                    {product.productType}
                  </span>
                </Link>
                <span className="text-neutral-300">/</span>
              </>
            )}
            <span className="text-black">{product.title}</span>
          </div>
        </div>

        <section className="max-w-[1200px] mx-auto px-4 md:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="lg:sticky lg:top-20 lg:self-start lg:h-fit">
              <ImageGallery images={product.images} productTitle={product.title} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="py-2"
            >
              {product.productType && (
                <Link href={`/category/${product.productType.toLowerCase()}`}>
                  <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                    {product.productType}
                  </span>
                </Link>
              )}

              <h1 className="text-2xl md:text-3xl font-semibold text-black mt-2 mb-2">
                {product.title}
              </h1>

              <p className="text-xl text-black mb-6">
                ${price.toLocaleString()}
              </p>

              <p className="text-neutral-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {sizeOption && sizeOption.values.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-black">Size</h3>
                    <button className="text-sm text-blue-600 hover:underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizeOption.values.map((size, idx) => {
                      const variant = product.variants.find((v) => 
                        v.title.includes(size) || (product.variants.length === sizeOption.values.length && idx === product.variants.indexOf(v))
                      );
                      return (
                        <button
                          key={size}
                          onClick={() => variant && setSelectedVariant(variant.id)}
                          className={`min-w-[48px] px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            selectedVariantData?.title.includes(size)
                              ? "bg-black text-white"
                              : "bg-neutral-100 text-black hover:bg-neutral-200"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {colorOption && colorOption.values.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-black mb-3">
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {colorOption.values.map((color) => (
                      <button
                        key={color}
                        className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all bg-neutral-100 text-black hover:bg-neutral-200"
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-medium text-black mb-3">Quantity</h3>
                <div className="inline-flex items-center border-2 border-amber-500 rounded-full p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black hover:bg-neutral-200 transition-colors"
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium text-black w-12 text-center">
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
                  className="flex-1 px-6 py-3.5 bg-black hover:bg-neutral-800 rounded-full text-sm font-medium text-white transition-colors"
                  data-testid="button-buy-now"
                >
                  Buy Now — ${(price * quantity).toLocaleString()}
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
