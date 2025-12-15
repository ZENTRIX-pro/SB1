import { useParams } from "wouter";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchCollectionByHandle, fetchCollectionImage, ShopifyProduct, ShopifyCollection, formatPrice } from "@/lib/shopify";
import { categories } from "@/lib/data";
import { Footer } from "@/components/footer";
import { ProductSkeleton } from "@/components/product-skeleton";

interface SubCategory {
  handle: string;
  label: string;
}

const subCategoryMap: Record<string, SubCategory[]> = {
  men: [
    { handle: "mens-sets", label: "Luxury Sets" },
    { handle: "mens-knitwear", label: "Knitwear" },
    { handle: "mens-resort-shirts", label: "Resort Shirts" },
    { handle: "mens-t-shirts", label: "T-Shirts" },
    { handle: "mens-trousers", label: "Trousers" },
    { handle: "mens-watches", label: "Watches" },
    { handle: "mens-footwear", label: "Footwear" },
    { handle: "mens-accessories", label: "Accessories" },
  ],
  women: [
    { handle: "womens-dresses", label: "Dresses" },
    { handle: "womens-tops", label: "Designer Tops" },
    { handle: "womens-handbags", label: "Handbags" },
    { handle: "womens-jewelry", label: "Jewelry" },
    { handle: "womens-watches", label: "Watches" },
    { handle: "womens-footwear", label: "Footwear" },
  ],
  home: [
    { handle: "home-decor", label: "Artisan Decor" },
    { handle: "italian-furniture", label: "Italian Living" },
    { handle: "wall-art", label: "Minimalist Art" },
    { handle: "tableware", label: "Tableware" },
  ],
  active: [
    { handle: "mens-activewear", label: "Men's Active" },
    { handle: "womens-activewear", label: "Women's Active" },
    { handle: "running-shoes", label: "Running Shoes" },
    { handle: "gym-gear", label: "Gear" },
  ],
  tech: [
    { handle: "smart-watches", label: "Smart Watches" },
    { handle: "headphones", label: "Headphones" },
    { handle: "tech-gadgets", label: "Gadgets" },
  ],
  beauty: [
    { handle: "beauty-skincare", label: "Skincare" },
    { handle: "beauty-tools", label: "Tools" },
    { handle: "hair-care", label: "Hair Care" },
  ],
  scents: [
    { handle: "mens-perfume", label: "For Him" },
    { handle: "womens-perfume", label: "For Her" },
    { handle: "unisex-scents", label: "Unisex" },
  ],
  gifts: [
    { handle: "gifts-for-him", label: "For Him" },
    { handle: "gifts-for-her", label: "For Her" },
    { handle: "gift-bundles", label: "Bundles" },
  ],
};

const placeholderIcons: Record<string, string> = {
  "mens-sets": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=150&q=80",
  "mens-knitwear": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=150&q=80",
  "mens-resort-shirts": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=150&q=80",
  "mens-t-shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=150&q=80",
  "mens-trousers": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=150&q=80",
  "mens-watches": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=150&q=80",
  "mens-footwear": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80",
  "mens-accessories": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=150&q=80",
  "womens-dresses": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=150&q=80",
  "womens-tops": "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=150&q=80",
  "womens-handbags": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=150&q=80",
  "womens-jewelry": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=150&q=80",
  "womens-watches": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=150&q=80",
  "womens-footwear": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=150&q=80",
  "home-decor": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=150&q=80",
  "italian-furniture": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=150&q=80",
  "wall-art": "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=150&q=80",
  "tableware": "https://images.unsplash.com/photo-1603199506016-5d54ebf27d1d?auto=format&fit=crop&w=150&q=80",
  "mens-activewear": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=150&q=80",
  "womens-activewear": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=150&q=80",
  "running-shoes": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80",
  "gym-gear": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80",
  "smart-watches": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=150&q=80",
  "headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80",
  "tech-gadgets": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=150&q=80",
  "beauty-skincare": "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=150&q=80",
  "beauty-tools": "https://images.unsplash.com/photo-1522338242042-a1bdc4c94f24?auto=format&fit=crop&w=150&q=80",
  "hair-care": "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=150&q=80",
  "mens-perfume": "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=150&q=80",
  "womens-perfume": "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=150&q=80",
  "unisex-scents": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=150&q=80",
  "gifts-for-him": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=150&q=80",
  "gifts-for-her": "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=150&q=80",
  "gift-bundles": "https://images.unsplash.com/photo-1607469256872-48e4c6ae4fc9?auto=format&fit=crop&w=150&q=80",
};

function VisualIconRow({ slug }: { slug: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [subCategoryImages, setSubCategoryImages] = useState<Record<string, string>>({});
  const subCategories = subCategoryMap[slug];
  
  useEffect(() => {
    if (!subCategories) return;
    
    const loadImages = async () => {
      const imagePromises = subCategories.map(async (cat) => {
        try {
          const image = await fetchCollectionImage(cat.handle);
          return { handle: cat.handle, image: image || placeholderIcons[cat.handle] || "" };
        } catch {
          return { handle: cat.handle, image: placeholderIcons[cat.handle] || "" };
        }
      });
      
      const results = await Promise.all(imagePromises);
      const imagesMap: Record<string, string> = {};
      results.forEach(r => {
        if (r.image) imagesMap[r.handle] = r.image;
      });
      setSubCategoryImages(imagesMap);
    };
    
    loadImages();
  }, [subCategories]);
  
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
          className="hidden md:flex w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-[#1D1D1F]/60 hover:bg-gray-50 hover:shadow-xl transition-all flex-shrink-0"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div
          ref={scrollRef}
          className="flex flex-row flex-nowrap gap-4 md:gap-6 overflow-x-auto py-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {subCategories.map((cat, idx) => {
            const imageUrl = subCategoryImages[cat.handle] || placeholderIcons[cat.handle] || "";
            
            return (
              <Link key={cat.handle} href={`/collections/${cat.handle}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2.5 cursor-pointer group"
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-white shadow-md ring-2 ring-black/5 group-hover:ring-black/20 group-hover:shadow-xl transition-all duration-300">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={cat.label}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-2xl">📦</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-[#1D1D1F] text-center whitespace-nowrap group-hover:text-[#0066CC] transition-colors">
                    {cat.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-[#1D1D1F]/60 hover:bg-gray-50 hover:shadow-xl transition-all flex-shrink-0"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
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

  const hasSubCategories = slug ? !!subCategoryMap[slug] : false;
  
  if (!collection && !category && slug !== "all" && products.length === 0 && !hasSubCategories) {
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
          <VisualIconRow slug={slug || ""} />

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
