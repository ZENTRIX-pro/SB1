import { useState, useEffect } from "react";
import { StoryLayout } from "@/components/story-layout";
import { fetchCollectionByHandle, fetchAllProducts, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import womenImage from "@assets/generated_images/luxury_womenswear_hero_image.png";

export default function MuseStory() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: collectionProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.WOMEN);
        if (collectionProducts.length > 0) {
          setProducts(collectionProducts);
        } else {
          const allProducts = await fetchAllProducts();
          const womenProducts = allProducts.filter(p => 
            p.tags.some(t => t.toLowerCase().includes("women") || t.toLowerCase().includes("female")) ||
            p.productType.toLowerCase().includes("women")
          );
          setProducts(womenProducts.length > 0 ? womenProducts : allProducts.slice(0, 8));
        }
      } catch (error) {
        console.error("Error loading women's collection:", error);
        const allProducts = await fetchAllProducts();
        setProducts(allProducts.slice(0, 8));
      }
      setIsLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <StoryLayout
      title="Elegance Redefined"
      subtitle="The Modern Muse"
      description="For women who make their own rules. A collection that celebrates bold femininity through exquisite craftsmanship, luxurious fabrics, and designs that empower."
      heroImage={womenImage}
      products={products}
      isLoading={isLoading}
      accentColor="rose"
    />
  );
}
