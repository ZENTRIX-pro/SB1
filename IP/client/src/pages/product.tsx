import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Check, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useShopify } from "@/lib/shopify-context";
import { 
  fetchProductByHandle, 
  ShopifyProduct, 
  ShopifyVariant,
  ShopifyImage,
  findVariantByOptions,
  getVariantImageForOption,
  getUniqueOptionValues,
  isVariantAvailable,
  buildCheckoutUrl,
  formatPrice 
} from "@/lib/shopify";
import { Footer } from "@/components/footer";
import { CustomerReviews } from "@/components/customer-reviews";
import { LoadingScreen } from "@/components/product-skeleton";

interface ImageGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
  selectedImageIndex?: number;
  onImageChange?: (index: number) => void;
}

function ImageGallery({ images, productTitle, selectedImageIndex, onImageChange }: ImageGalleryProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = selectedImageIndex !== undefined ? selectedImageIndex : internalIndex;

  useEffect(() => {
    if (selectedImageIndex === undefined) {
      setInternalIndex(0);
    }
  }, [images, selectedImageIndex]);

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

  const handleIndexChange = (newIndex: number) => {
    if (onImageChange) {
      onImageChange(newIndex);
    } else {
      setInternalIndex(newIndex);
    }
  };

  const nextImage = () => {
    handleIndexChange((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    handleIndexChange((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F5F7]">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]?.src}
            alt={images[currentIndex]?.altText || productTitle}
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
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:bg-white transition-colors shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleIndexChange(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-black w-6" : "bg-black/30"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
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
              onClick={() => handleIndexChange(idx)}
              className={`flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                idx === currentIndex ? "border-amber-500 ring-2 ring-amber-500/30" : "border-transparent hover:border-neutral-300"
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
        <label className="text-sm font-medium text-black">
          {option.name}: <span className="font-normal text-neutral-600">{selectedValue || "Select"}</span>
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
                    ? "border-amber-500 ring-2 ring-amber-500/30" 
                    : "border-neutral-300 hover:border-neutral-400"
                }`}
                style={{ backgroundColor: value.toLowerCase() }}
                title={value}
              >
                {isSelected && (
                  <Check className={`absolute inset-0 m-auto w-5 h-5 ${
                    ["white", "cream", "beige", "ivory", "yellow"].includes(value.toLowerCase()) 
                      ? "text-black" 
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
              className={`min-w-[3rem] px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isSelected
                  ? "bg-black text-white"
                  : isAvailable
                    ? "bg-neutral-100 text-black hover:bg-neutral-200"
                    : "bg-neutral-50 text-neutral-400 hover:bg-neutral-100"
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
      <label className="text-sm font-medium text-black">Quantity</label>
      <div className="inline-flex items-center border-2 border-amber-500 rounded-xl overflow-hidden">
        <button
          onClick={decrease}
          disabled={quantity <= 1}
          className="w-12 h-12 flex items-center justify-center text-black hover:bg-amber-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="w-14 h-12 flex items-center justify-center font-semibold text-lg text-black border-x-2 border-amber-500 bg-white">
          {quantity}
        </div>
        <button
          onClick={increase}
          disabled={quantity >= maxQuantity}
          className="w-12 h-12 flex items-center justify-center text-black hover:bg-amber-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading: contextLoading } = useShopify();
  
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
    ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
    : product?.variants[0] 
      ? formatPrice(product.variants[0].price.amount, product.variants[0].price.currencyCode)
      : "$0.00";

  const compareAtPrice = selectedVariant?.compareAtPrice 
    ? formatPrice(selectedVariant.compareAtPrice.amount, selectedVariant.compareAtPrice.currencyCode)
    : null;

  const canBuy = product && product.variants.length > 0 ? true : false;
  const hasOptions = product?.options && product.options.length > 0 && 
    !(product.options.length === 1 && product.options[0].values.length === 1);

  if (isLoading || contextLoading) {
    return <LoadingScreen />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-black mb-3">Product Not Found</h1>
            <p className="text-neutral-600 mb-8">
              Sorry, we couldn't find the product you're looking for. It may have been removed or the link is incorrect.
            </p>
            <Link href="/">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors cursor-pointer">
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/">
            <span className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors cursor-pointer text-sm">
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
            <ImageGallery 
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
              <p className="text-xs uppercase tracking-widest text-amber-600 font-medium">
                {product.vendor}
              </p>
            )}

            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-black mb-3">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-black">{currentPrice}</span>
                {compareAtPrice && (
                  <span className="text-lg text-neutral-400 line-through">{compareAtPrice}</span>
                )}
              </div>
            </div>

            {product.description && (
              <p className="text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="border-t border-neutral-100 pt-6 space-y-6">
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
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-full text-base font-semibold transition-all bg-black text-white hover:bg-neutral-800"
              >
                Buy Now - {currentPrice}
              </motion.button>
            </div>

            <div className="border-t border-neutral-100 pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-neutral-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>

            {product.tags.length > 0 && (
              <div className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {product.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <CustomerReviews productId={product.id} />
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
