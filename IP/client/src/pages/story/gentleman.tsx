import { useState, useEffect } from "react";
import { StoryLayout } from "@/components/story-layout";
import { fetchMultipleCollections, fetchAllProducts, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import menImage from "@assets/generated_images/luxury_menswear_hero_image.png";

export default function GentlemanStory() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const collectionProducts = await fetchMultipleCollections([
          COLLECTION_HANDLES.MALE_APPAREL,
          COLLECTION_HANDLES.MALE_FOOTWEAR,
        ]);
        if (collectionProducts.length > 0) {
          setProducts(collectionProducts);
        } else {
          const allProducts = await fetchAllProducts();
          const menProducts = allProducts.filter(p => 
            p.tags.some(t => t.toLowerCase().includes("men") || t.toLowerCase().includes("male")) ||
            p.productType.toLowerCase().includes("men")
          );
          setProducts(menProducts.length > 0 ? menProducts : allProducts.slice(0, 8));
        }
      } catch (error) {
        console.error("Error loading men's collections:", error);
        const allProducts = await fetchAllProducts();
        setProducts(allProducts.slice(0, 8));
      }
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <StoryLayout
      title="Refined Men"
      subtitle="The Modern Gentleman"
      description="For the man who understands that true style is effortless. A curated collection of impeccable tailoring, premium footwear, and accessories that speak to refined taste."
      heroImage={menImage}
      products={products}
      isLoading={isLoading}
      accentColor="neutral"
    />
  );
}
