import { useParams } from "wouter";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCollectionByHandle, ShopifyProduct, ShopifyCollection, formatPrice } from "@/lib/shopify";
import { categories } from "@/lib/data";
import { Footer } from "@/components/footer";
import { ProductSkeleton } from "@/components/product-skeleton";

interface SubCategory {
  icon: string;
  label: string;
  href: string;
}

const subCategoryMap: Record<string, SubCategory[]> = {
  // Main Men's category
  men: [
    { icon: "👕", label: "Clothing", href: "/collections/mens-clothing" },
    { icon: "👟", label: "Footwear", href: "/collections/male-footwear" },
    { icon: "⌚", label: "Accessories", href: "/collections/mens-accessories" },
  ],
  // Main Women's category - includes Beauty access
  women: [
    { icon: "👗", label: "Clothing", href: "/collections/womens-clothing" },
    { icon: "👜", label: "Bags", href: "/collections/bags" },
    { icon: "💍", label: "Jewelry", href: "/collections/jewelry" },
    { icon: "👠", label: "Footwear", href: "/collections/women-footwear" },
    { icon: "💄", label: "Beauty", href: "/collections/beauty" },
  ],
  // Beauty sub-architecture (Level 2 under Women)
  beauty: [
    { icon: "✨", label: "Face Tools", href: "/collections/face-tools" },
    { icon: "💇‍♀️", label: "Hair Tools", href: "/collections/hair-tools" },
    { icon: "🧴", label: "Skincare", href: "/collections/skincare-devices" },
  ],
  "beauty-tools": [
    { icon: "✨", label: "Face Tools", href: "/collections/face-tools" },
    { icon: "💇‍♀️", label: "Hair Tools", href: "/collections/hair-tools" },
    { icon: "🧴", label: "Skincare", href: "/collections/skincare-devices" },
  ],
  // Active sub-architecture
  active: [
    { icon: "🏃‍♂️", label: "Men's Active", href: "/collections/mens-activewear" },
    { icon: "🏃‍♀️", label: "Women's Active", href: "/collections/womens-activewear" },
    { icon: "🎒", label: "Gear", href: "/collections/workout-gear" },
    { icon: "💆", label: "Recovery", href: "/collections/recovery" },
  ],
  // Level-3: Men's Clothing deep links
  "mens-clothing": [
    { icon: "👔", label: "Shirts", href: "/collections/mens-shirts" },
    { icon: "👕", label: "T-Shirts", href: "/collections/mens-tshirts" },
    { icon: "👖", label: "Trousers", href: "/collections/mens-trousers" },
  ],
  // Level-3: Male Footwear deep links
  "male-footwear": [
    { icon: "👟", label: "Sneakers", href: "/collections/mens-sneakers" },
    { icon: "👞", label: "Formal", href: "/collections/mens-formal-shoes" },
    { icon: "🥾", label: "Boots", href: "/collections/mens-boots" },
    { icon: "🩴", label: "Slides", href: "/collections/mens-slides" },
  ],
  // Level-3: Women's Clothing deep links
  "womens-clothing": [
    { icon: "👗", label: "Dresses", href: "/collections/womens-dresses" },
    { icon: "👚", label: "Tops", href: "/collections/womens-tops" },
    { icon: "👖", label: "Bottoms", href: "/collections/womens-bottoms" },
  ],
  // Level-3: Women's Footwear deep links
  "women-footwear": [
    { icon: "👠", label: "Heels", href: "/collections/womens-heels" },
    { icon: "👟", label: "Sneakers", href: "/collections/womens-sneakers" },
    { icon: "🥿", label: "Flats", href: "/collections/womens-flats" },
  ],
  // Tech categories
  tech: [
    { icon: "🎧", label: "Audio", href: "/collections/audio" },
    { icon: "📱", label: "Mobile", href: "/collections/mobile-tech" },
    { icon: "🏠", label: "Smart Home", href: "/collections/smart-home" },
  ],
  // Signature/Heritage
  signature: [
    { icon: "✨", label: "Heritage", href: "/collections/heritage" },
    { icon: "🎁", label: "Gifts for Her", href: "/collections/gifts-for-her" },
    { icon: "🎩", label: "Gifts for Him", href: "/collections/gifts-for-him" },
  ],
  heritage: [
    { icon: "🌏", label: "Nordic Zen", href: "/collections/nordic-zen" },
    { icon: "🇮🇹", label: "Italian Classico", href: "/collections/italian-classico" },
    { icon: "🎎", label: "Eastern Soul", href: "/collections/eastern-soul" },
  ],
  // Fragrances/Scents
  fragrances: [
    { icon: "🌸", label: "For Her", href: "/collections/womens-fragrances" },
    { icon: "🌲", label: "For Him", href: "/collections/mens-fragrances" },
    { icon: "🏠", label: "Home Scents", href: "/collections/home-fragrances" },
  ],
  // Gifts
  gifts: [
    { icon: "🎁", label: "For Her", href: "/collections/gifts-for-her" },
    { icon: "🎩", label: "For Him", href: "/collections/gifts-for-him" },
    { icon: "💝", label: "Sets", href: "/collections/gift-sets" },
  ],
  // Home collection
  home: [
    { icon: "🛋️", label: "Decor", href: "/collections/home-decor" },
    { icon: "🕯️", label: "Candles", href: "/collections/candles" },
    { icon: "🛏️", label: "Bedding", href: "/collections/bedding" },
  ],
};

function IconSubNav({ slug }: { slug: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const subCategories = subCategoryMap[slug];
  
  if (!subCategories) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative mb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex w-8 h-8 rounded-full bg-white shadow-md items-center justify-center text-[#1D1D1F]/60 hover:bg-gray-100 transition-all flex-shrink-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div
          ref={scrollRef}
          className="flex flex-row flex-nowrap gap-3 overflow-x-auto py-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {subCategories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 px-4 py-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer min-w-[80px]"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-[#1D1D1F] whitespace-nowrap">{cat.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex w-8 h-8 rounded-full bg-white shadow-md items-center justify-center text-[#1D1D1F]/60 hover:bg-gray-100 transition-all flex-shrink-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collection, setCollection] = useState<ShopifyCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    const loadCollection = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const { collection: fetchedCollection, products: fetchedProducts } = await fetchCollectionByHandle(slug);
        setCollection(fetchedCollection);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(`Error loading collection ${slug}:`, error);
        setProducts([]);
        setCollection(null);
      }
      setIsLoading(false);
    };
    loadCollection();
  }, [slug]);
  
  const categoryProducts = products;

  if (isLoading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pt-14 bg-[#F5F5F7] min-h-screen"
      >
        <section className="relative h-[30vh] min-h-[200px] overflow-hidden bg-[#E5E5E7] animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7]/60 via-transparent to-transparent z-10" />
        </section>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductSkeleton key={idx} />
            ))}
          </div>
        </div>
        <Footer />
      </motion.main>
    );
  }

  if (!collection && !category && slug !== "all" && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] pt-14">
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#1D1D1F] mb-4">Collection not found</h1>
          <Link href="/">
            <span className="text-[#0066CC] hover:underline cursor-pointer">Return home</span>
          </Link>
        </div>
      </div>
    );
  }

  const displayProducts = categoryProducts;
  const categoryTitle = collection?.title || category?.name || slug?.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) || "All Products";
  const categoryDescription = collection?.description || category?.description || "Browse our curated collection";
  const categoryImage = collection?.image?.src || category?.image || products[0]?.images[0]?.src;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-14 bg-[#F5F5F7]"
      data-testid={`page-category-${slug}`}
    >
      <section className="relative h-[30vh] min-h-[200px] overflow-hidden bg-[#E8E8EA]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] via-transparent to-transparent z-10" />
        {categoryImage && (
          <motion.img
            src={categoryImage}
            alt={categoryTitle}
            className="w-full h-full object-cover opacity-80"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-[#1D1D1F]/50 text-xs tracking-[0.3em] uppercase mb-3"
            >
              Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-3xl md:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-2"
            >
              {categoryTitle.replace("ZENTRIX ", "").replace("Z-", "")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-[#1D1D1F]/60 text-sm md:text-base"
            >
              {categoryDescription}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Link href="/">
          <span className="inline-flex items-center gap-1.5 text-[#0066CC] text-sm hover:underline cursor-pointer" data-testid="link-back-home">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </span>
        </Link>
      </div>

      <section className="pb-16" data-testid="products-grid-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <IconSubNav slug={slug || ""} />

          <div className="flex items-center justify-between mb-6">
            <p className="text-[#1D1D1F]/50 text-sm">
              {displayProducts.length} {displayProducts.length === 1 ? "product" : "products"}
            </p>
          </div>

          {displayProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#1D1D1F]/50 text-lg mb-4">No products found in this collection</p>
              <Link href="/collections/men">
                <span className="text-[#0066CC] hover:underline cursor-pointer">Browse Men's Collection</span>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.05, 0.3), duration: 0.3 }}
                className="group"
              >
                <Link href={`/product/${product.handle}`}>
                  <div className="cursor-pointer">
                    <div className="relative aspect-[3/4] overflow-hidden bg-white rounded-3xl mb-2 md:mb-3 shadow-sm">
                      <img
                        src={product.images[0]?.src || "https://placehold.co/400x500?text=No+Image"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-xs md:text-sm font-medium text-[#1D1D1F] mb-1 group-hover:text-[#0066CC] transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#1D1D1F]/60">
                      {formatPrice(product.variants[0]?.price.amount || "0")}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
