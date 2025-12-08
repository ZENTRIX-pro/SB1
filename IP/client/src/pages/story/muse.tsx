import { useState, useEffect } from "react";
import { StoryLayout } from "@/components/story-layout";
import { fetchCollectionByHandle, COLLECTION_HANDLES, ShopifyProduct } from "@/lib/shopify";
import womenImage from "@assets/generated_images/luxury_womenswear_hero_image.png";

export default function MuseStory() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const { products: collectionProducts } = await fetchCollectionByHandle(COLLECTION_HANDLES.WOMEN);
        setProducts(collectionProducts);
      } catch (error) {
        console.error("Error loading women's collection:", error);
        setProducts([]);
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
