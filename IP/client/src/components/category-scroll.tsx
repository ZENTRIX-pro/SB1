import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fetchCollections, ShopifyCollection } from "@/lib/shopify";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  description: string;
}

const categoryMappings = [
  { name: "New Arrivals", slug: "new", handle: "new" },
  { name: "Men", slug: "men", handle: "men" },
  { name: "Women", slug: "women", handle: "women" },
  { name: "Tech & Gadgets", slug: "tech", handle: "tech" },
  { name: "Home Living", slug: "home", handle: "home" },
  { name: "Beauty", slug: "beauty", handle: "beauty" },
  { name: "Gifts", slug: "gifts", handle: "gifts" },
];

const placeholderImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop";

export function CategoryScroll() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const collections = await fetchCollections();
        
        const mappedCategories = categoryMappings.map((mapping) => {
          const shopifyCollection = collections.find(
            (c: ShopifyCollection) => c.handle === mapping.handle
          );
          
          return {
            id: mapping.slug,
            name: mapping.name,
            slug: mapping.slug,
            image: shopifyCollection?.image?.src || null,
            description: shopifyCollection?.description || `Explore ${mapping.name}`,
          };
        });
        
        setCategories(mappedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
        setCategories(categoryMappings.map((m) => ({
          id: m.slug,
          name: m.name,
          slug: m.slug,
          image: null,
          description: `Explore ${m.name}`,
        })));
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="h-8 bg-neutral-100 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-neutral-100 rounded-lg" />
                <div className="h-4 bg-neutral-100 rounded mt-3 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-bold text-black mb-8 uppercase tracking-wider"
        >
          Shop by Category
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          {categories.map((category, idx) => (
            <Link key={category.id} href={`/collections/${category.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="cursor-pointer group"
              >
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <img
                    src={category.image || placeholderImage}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = placeholderImage;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <p className="text-center text-sm font-medium text-black mt-3 uppercase tracking-wider">
                  {category.name}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
