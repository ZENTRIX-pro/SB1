import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Check, ChevronLeft, ChevronRight, AlertCircle, Truck, Shield, RotateCcw, Star, Zap, Crown } from "lucide-react";
import { useShopify } from "@/lib/shopify-context";
import { useCurrency } from "@/lib/currency-context";
import { useCart } from "@/lib/cart-context";
import { 
  fetchProductByHandle, 
  ShopifyProduct, 
  ShopifyVariant,
  ShopifyImage,
  findVariantByOptions,
  getVariantImageForOption,
  getUniqueOptionValues,
  isVariantAvailable,
  buildCheckoutUrl
} from "@/lib/shopify";
import { Footer } from "@/components/footer";
import { LoadingScreen } from "@/components/product-skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SplitImageGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
  selectedImageIndex: number;
  onImageChange: (index: number) => void;
}

function SplitImageGallery({ images, productTitle, selectedImageIndex, onImageChange }: SplitImageGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
        <img
          src="https://placehold.co/600x600?text=No+Image"
          alt={productTitle}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const nextImage = () => {
    onImageChange((selectedImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    onImageChange((selectedImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedImageIndex}
            src={images[selectedImageIndex]?.src}
            alt={images[selectedImageIndex]?.altText || productTitle}
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
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1D1D1F] hover:bg-white transition-colors shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1D1D1F] hover:bg-white transition-colors shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onImageChange(idx)}
              className={`flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                idx === selectedImageIndex 
                  ? "border-[#1D1D1F] ring-2 ring-[#1D1D1F]/20" 
                  : "border-transparent hover:border-[#1D1D1F]/30"
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

interface OptionSelectorProps {
  option: { name: string; values: string[] };
  selectedValue: string;
  onSelect: (value: string) => void;
  variants: ShopifyVariant[];
  currentOptions: Record<string, string>;
}

function OptionSelector({ option, selectedValue, onSelect, variants, currentOptions }: OptionSelectorProps) {
  const isColorOption = option.name.toLowerCase() === "color" || option.name.toLowerCase() === "colour";
  
  const uniqueValues = getUniqueOptionValues(option);
  
  const getValueAvailability = (value: string): boolean => {
    const testOptions = { ...currentOptions, [option.name]: value };
    const variant = findVariantByOptions(variants, testOptions);
    return isVariantAvailable(variant);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[#1D1D1F]">
          {option.name}: <span className="font-normal text-[#1D1D1F]/60">{selectedValue || "Select"}</span>
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {uniqueValues.map((value) => {
          const isSelected = selectedValue === value;
          const isAvailable = getValueAvailability(value);
          
          if (isColorOption) {
            return (
              <button
                key={value}
                onClick={() => onSelect(value)}
                className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                  isSelected 
                    ? "border-[#1D1D1F] ring-2 ring-[#1D1D1F]/20" 
                    : "border-[#1D1D1F]/20 hover:border-[#1D1D1F]/40"
                }`}
                style={{ backgroundColor: value.toLowerCase() }}
                title={value}
              >
                {isSelected && (
                  <Check className={`absolute inset-0 m-auto w-5 h-5 ${
                    ["white", "cream", "beige", "ivory", "yellow"].includes(value.toLowerCase()) 
                      ? "text-[#1D1D1F]" 
                      : "text-white"
                  }`} />
                )}
              </button>
            );
          }

          return (
            <button
              key={value}
              onClick={() => onSelect(value)}
              className={`min-w-[3rem] px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? "bg-[#1D1D1F] text-white"
                  : isAvailable
                    ? "bg-white border border-[#1D1D1F]/20 text-[#1D1D1F] hover:border-[#1D1D1F]/40"
                    : "bg-white/50 border border-[#1D1D1F]/10 text-[#1D1D1F]/40"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  maxQuantity?: number;
}

function QuantitySelector({ quantity, onQuantityChange, maxQuantity = 10 }: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const increase = () => {
    if (quantity < maxQuantity) onQuantityChange(quantity + 1);
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-[#1D1D1F]">Quantity</label>
      <div className="inline-flex items-center border border-[#1D1D1F]/20 rounded-full overflow-hidden bg-white">
        <button
          onClick={decrease}
          disabled={quantity <= 1}
          className="w-12 h-12 flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 flex items-center justify-center font-semibold text-lg text-[#1D1D1F]">
          {quantity}
        </div>
        <button
          onClick={increase}
          disabled={quantity >= maxQuantity}
          className="w-12 h-12 flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function ProductReviews() {
  const reviews = [
    { rating: 5, author: "Sarah M.", text: "Exceptional quality and craftsmanship. Worth every penny." },
    { rating: 5, author: "James K.", text: "The attention to detail is remarkable. Highly recommend." },
    { rating: 4, author: "Emily R.", text: "Beautiful product, fast shipping. Very satisfied." },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-4 h-4 fill-[#1D1D1F] text-[#1D1D1F]" />
          ))}
        </div>
        <span className="text-sm text-[#1D1D1F]/60">(127 reviews)</span>
      </div>
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="border-b border-[#1D1D1F]/10 pb-4 last:border-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= review.rating ? "fill-[#1D1D1F] text-[#1D1D1F]" : "fill-transparent text-[#1D1D1F]/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-[#1D1D1F]">{review.author}</span>
            </div>
            <p className="text-sm text-[#1D1D1F]/70">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MembershipLandingPage({ product }: { product: ShopifyProduct }) {
  const { addItem } = useCart();
  const [inventoryLeft, setInventoryLeft] = useState(500);
  
  useEffect(() => {
    const totalInventory = product.variants.reduce((sum, v) => {
      const match = v.sku.match(/(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }, 0);
    setInventoryLeft(Math.max(0, totalInventory));
  }, [product]);

  const handleJoinClub = () => {
    // Redirect to checkout with the membership product
    const membershipVariant = product.variants[0];
    if (membershipVariant) {
      const checkoutUrl = buildCheckoutUrl(membershipVariant.id, 1);
      window.location.href = checkoutUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors cursor-pointer text-sm">
              <ChevronLeft className="w-4 h-4" />
              Back to Shop
            </span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent z-10" />
              <img
                src={product.images[0]?.src || "https://placehold.co/600x600?text=ZENTRIX+BLACK"}
                alt="Zentrix Black Membership"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-[#D4AF37] text-black p-3 rounded-full">
              <Crown className="w-6 h-6" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#D4AF37] mb-4 tracking-tight">
                Welcome to the Inner Circle
              </h1>
              <p className="text-lg text-white/70">
                Exclusive membership for the discerning collector.
              </p>
            </div>

            {/* Scarcity Counter */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/50 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <p className="text-sm font-semibold text-[#D4AF37]">Limited Founding Membership</p>
                  <p className="text-xs text-white/60">🔥 Only {inventoryLeft} of 500 Founding Memberships left.</p>
                </div>
              </div>
            </motion.div>

            {/* Benefits */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#D4AF37] uppercase tracking-wide">Your Benefits</h3>
              <ul className="space-y-2">
                {[
                  "Lifetime Free Express Shipping",
                  "Priority Dispatch",
                  "Exclusive Early Access"
                ].map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Price and Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4 pt-4"
            >
              <div>
                <p className="text-4xl font-bold text-[#D4AF37] mb-1">$9.99</p>
                <p className="text-xs text-white/60">One-time fee • Lifetime access</p>
              </div>
              
              <motion.button
                onClick={handleJoinClub}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-full uppercase tracking-widest text-lg hover:bg-[#E8C547] transition-all"
              >
                JOIN THE CLUB - $9.99
              </motion.button>

              <p className="text-xs text-white/50 text-center">
                Secure checkout • Instant access
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Terms & Policy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-20 border-t border-white/10 pt-12"
        >
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-8 uppercase tracking-wide">Terms & Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="font-semibold text-white uppercase text-sm tracking-wider">Validity</h3>
              <p className="text-sm text-white/70">Lifetime access for a one-time fee. Once purchased, membership is permanent.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white uppercase text-sm tracking-wider">Refunds</h3>
              <p className="text-sm text-white/70">Non-refundable digital service. This is a permanent membership benefit.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white uppercase text-sm tracking-wider">Usage</h3>
              <p className="text-sm text-white/70">Strictly for the registered account holder only. Non-transferable.</p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading: contextLoading } = useShopify();
  const { formatPrice } = useCurrency();
  
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setError("Product not found");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      let foundProduct = products.find((p) => p.handle === id);
      
      if (!foundProduct && !contextLoading) {
        foundProduct = await fetchProductByHandle(id) || undefined;
      }
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        const initialOptions: Record<string, string> = {};
        foundProduct.options.forEach((opt) => {
          if (opt.values.length > 0) {
            const firstAvailableVariant = foundProduct!.variants.find((v) => isVariantAvailable(v));
            const matchingOption = firstAvailableVariant?.selectedOptions.find(
              (so) => so.name === opt.name
            );
            initialOptions[opt.name] = matchingOption?.value || opt.values[0];
          }
        });
        setSelectedOptions(initialOptions);
        setQuantity(1);
        setSelectedImageIndex(0);
        setError(null);
      } else if (!contextLoading) {
        setError("Product not found");
      }
      
      setIsLoading(false);
    };

    loadProduct();
  }, [id, products, contextLoading]);

  const selectedVariant = useMemo((): ShopifyVariant | null => {
    if (!product) return null;
    return findVariantByOptions(product.variants, selectedOptions);
  }, [product, selectedOptions]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
    
    if (product && (optionName.toLowerCase() === "color" || optionName.toLowerCase() === "colour")) {
      const variantImage = getVariantImageForOption(product.variants, optionName, value, product.images);
      if (variantImage) {
        const imageIndex = product.images.findIndex((img) => img.src === variantImage.src);
        if (imageIndex !== -1) {
          setSelectedImageIndex(imageIndex);
        }
      }
    }
  };

  const handleBuyNow = () => {
    try {
      let variantToCheckout = selectedVariant;
      
      if (!variantToCheckout && product && product.variants.length > 0) {
        variantToCheckout = product.variants[0];
      }
      
      if (!variantToCheckout) {
        console.error("No variant available for checkout");
        return;
      }
      
      const checkoutUrl = buildCheckoutUrl(variantToCheckout.id, quantity);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const currentPrice = selectedVariant 
    ? formatPrice(selectedVariant.price.amount, "USD")
    : product?.variants[0] 
      ? formatPrice(product.variants[0].price.amount, "USD")
      : "$0.00";

  const compareAtPrice = selectedVariant?.compareAtPrice 
    ? formatPrice(selectedVariant.compareAtPrice.amount, "USD")
    : null;

  const hasOptions = product?.options && product.options.length > 0 && 
    !(product.options.length === 1 && product.options[0].values.length === 1);

  if (isLoading || contextLoading) {
    return <LoadingScreen />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
        <div className="flex-1 flex items-center justify-center px-4 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-[#1D1D1F] mb-3">Product Not Found</h1>
            <p className="text-[#1D1D1F]/60 mb-8">
              Sorry, we couldn't find the product you're looking for. It may have been removed or the link is incorrect.
            </p>
            <Link href="/">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] text-white rounded-full font-medium hover:bg-[#1D1D1F]/90 transition-colors cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
                Back to Home
              </span>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // Render custom membership landing page for zentrix-black-membership
  if (product.handle === "zentrix-black-membership") {
    return <MembershipLandingPage product={product} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-[#1D1D1F]/60 hover:text-[#1D1D1F] transition-colors cursor-pointer text-sm">
              <ChevronLeft className="w-4 h-4" />
              Back to Shop
            </span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <SplitImageGallery 
              images={product.images} 
              productTitle={product.title}
              selectedImageIndex={selectedImageIndex}
              onImageChange={setSelectedImageIndex}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {product.vendor && (
              <p className="text-xs uppercase tracking-[0.2em] text-[#1D1D1F]/50 font-medium">
                {product.vendor}
              </p>
            )}

            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-[#1D1D1F] tracking-tight mb-4">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-[#1D1D1F]">{currentPrice}</span>
                {compareAtPrice && (
                  <span className="text-lg text-[#1D1D1F]/40 line-through">{compareAtPrice}</span>
                )}
              </div>
            </div>

            <div className="border-t border-[#1D1D1F]/10 pt-6 space-y-6">
              {hasOptions && product.options.map((option) => (
                <OptionSelector
                  key={option.id}
                  option={option}
                  selectedValue={selectedOptions[option.name] || ""}
                  onSelect={(value) => handleOptionChange(option.name, value)}
                  variants={product.variants}
                  currentOptions={selectedOptions}
                />
              ))}

              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                maxQuantity={10}
              />
            </div>

            <div className="pt-4 space-y-3">
              <motion.button
                onClick={handleBuyNow}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 rounded-full text-base font-semibold transition-all bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90"
              >
                Buy Now - {currentPrice}
              </motion.button>
            </div>

            <div className="flex items-center justify-center gap-6 py-4 flex-wrap">
              <div className="flex items-center gap-2 text-[#1D1D1F]/60 text-sm">
                <Truck className="w-4 h-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-[#1D1D1F]/60 text-sm">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-[#1D1D1F]/60 text-sm">
                <RotateCcw className="w-4 h-4" />
                <span>Easy Returns</span>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-[#1D1D1F]/10">
                <AccordionTrigger className="text-[#1D1D1F] hover:no-underline">
                  Product Details
                </AccordionTrigger>
                <AccordionContent className="text-[#1D1D1F]/70 leading-relaxed">
                  {product.description || "Premium quality product crafted with the finest materials and attention to detail."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="size" className="border-[#1D1D1F]/10">
                <AccordionTrigger className="text-[#1D1D1F] hover:no-underline">
                  Size & Fit
                </AccordionTrigger>
                <AccordionContent className="text-[#1D1D1F]/70 leading-relaxed">
                  Please refer to our size guide for the perfect fit. If you're between sizes, we recommend sizing up for a more comfortable fit.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-[#1D1D1F]/10">
                <AccordionTrigger className="text-[#1D1D1F] hover:no-underline">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-[#1D1D1F]/70 leading-relaxed">
                  Free shipping on orders over $200. Standard delivery takes 3-5 business days. Easy 30-day returns policy.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-6 border-t border-[#1D1D1F]/10">
              <h3 className="text-lg font-semibold text-[#1D1D1F] mb-4">Customer Reviews</h3>
              <ProductReviews />
            </div>

            {product.tags.length > 0 && (
              <div className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {product.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white border border-[#1D1D1F]/10 text-[#1D1D1F]/60 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
