import { useState, useEffect } from "react";
import { StoryLayout } from "@/components/story-layout";
import { fetchCollectionByHandle, fetchAllProducts, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import lifestyleImage from "@assets/generated_images/premium_lifestyle_accessories.png";

export default function SignatureStory() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: collectionProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.SIGNATURE);
        if (collectionProducts.length > 0) {
          setProducts(collectionProducts);
        } else {
          const allProducts = await fetchAllProducts();
          const signatureProducts = allProducts.filter(p => 
            p.tags.some(t => t.toLowerCase().includes("signature") || t.toLowerCase().includes("exclusive"))
          );
          setProducts(signatureProducts.length > 0 ? signatureProducts : allProducts.slice(0, 8));
        }
      } catch (error) {
        console.error("Error loading signature collection:", error);
        const allProducts = await fetchAllProducts();
        setProducts(allProducts.slice(0, 8));
      }
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <StoryLayout
      title="The Masterpiece"
      subtitle="Signature Series"
      description="Our most exclusive pieces, each a masterwork of design and craftsmanship. Limited editions for those who appreciate the extraordinary."
      heroImage={lifestyleImage}
      products={products}
      isLoading={isLoading}
      accentColor="gold"
    />
  );
}
