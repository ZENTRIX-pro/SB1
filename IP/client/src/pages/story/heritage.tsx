import { useState, useEffect } from "react";
import { StoryLayout } from "@/components/story-layout";
import { fetchCollectionByHandle, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import cinematicHeroImage from "@assets/generated_images/cinematic_luxury_fashion_hero.png";

export default function HeritageStory() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: collectionProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.HERITAGE);
        setProducts(collectionProducts);
      } catch (error) {
        console.error("Error loading heritage collection:", error);
        setProducts([]);
      }
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <StoryLayout
      title="The Royal Weave"
      subtitle="Heritage Collection"
      description="A celebration of timeless craftsmanship, where centuries-old techniques meet modern luxury. Each piece tells a story of tradition, excellence, and enduring elegance."
      heroImage={cinematicHeroImage}
      products={products}
      isLoading={isLoading}
      accentColor="amber"
    />
  );
}
