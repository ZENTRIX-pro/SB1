import { useState, useEffect } from "react";
import { StoryLayout } from "@/components/story-layout";
import { fetchCollectionByHandle, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import menImage from "@assets/generated_images/luxury_menswear_hero_image.png";

export default function GentlemanStory() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: collectionProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.MEN);
        setProducts(collectionProducts);
      } catch (error) {
        console.error("Error loading men's collection:", error);
        setProducts([]);
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
