import { useState, useEffect } from "react";
import { StoryLayout } from "@/components/story-layout";
import { fetchCollectionByHandle, fetchAllProducts, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import techImage from "@assets/generated_images/premium_tech_gadgets_collection.png";

export default function FutureTechStory() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: collectionProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.TECH);
        if (collectionProducts.length > 0) {
          setProducts(collectionProducts);
        } else {
          const allProducts = await fetchAllProducts();
          const techProducts = allProducts.filter(p => 
            p.tags.some(t => t.toLowerCase().includes("tech") || t.toLowerCase().includes("gadget")) || 
            p.productType.toLowerCase().includes("tech")
          );
          setProducts(techProducts.length > 0 ? techProducts : allProducts.slice(0, 8));
        }
      } catch (error) {
        console.error("Error loading tech collection:", error);
        const allProducts = await fetchAllProducts();
        setProducts(allProducts.slice(0, 8));
      }
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <StoryLayout
      title="Future Ready"
      subtitle="Tech & Lifestyle"
      description="Where innovation meets sophistication. Premium technology designed for those who demand excellence in every detail of their connected lifestyle."
      heroImage={techImage}
      products={products}
      isLoading={isLoading}
      accentColor="blue"
    />
  );
}
