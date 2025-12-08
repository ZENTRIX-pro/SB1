import { useState, useEffect } from "react";
import { StoryLayout } from "@/components/story-layout";
import { fetchCollectionByHandle, fetchAllProducts, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import cinematicHeroImage from "@assets/generated_images/cinematic_luxury_fashion_hero.png";

export default function HeritageStory() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: collectionProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.HERITAGE);
        if (collectionProducts.length > 0) {
          setProducts(collectionProducts);
        } else {
          const allProducts = await fetchAllProducts();
          const heritageProducts = allProducts.filter(p => 
            p.tags.some(t => t.toLowerCase().includes("heritage"))
          );
          setProducts(heritageProducts.length > 0 ? heritageProducts : allProducts.slice(0, 8));
        }
      } catch (error) {
        console.error("Error loading heritage collection:", error);
        const allProducts = await fetchAllProducts();
        setProducts(allProducts.slice(0, 8));
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
