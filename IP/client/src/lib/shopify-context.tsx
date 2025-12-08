import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchAllProducts, fetchCollections, ShopifyProduct, ShopifyCollection } from "./shopify";

interface ShopifyContextType {
  products: ShopifyProduct[];
  collections: ShopifyCollection[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getProductByHandle: (handle: string) => ShopifyProduct | undefined;
  getProductsByTag: (tag: string) => ShopifyProduct[];
  getProductsByType: (type: string) => ShopifyProduct[];
  getNewArrivals: () => ShopifyProduct[];
  getTrending: () => ShopifyProduct[];
  getSignature: () => ShopifyProduct[];
  getHeritage: () => ShopifyProduct[];
}

const ShopifyContext = createContext<ShopifyContextType | null>(null);

export function ShopifyProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [collections, setCollections] = useState<ShopifyCollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, collectionsData] = await Promise.all([
        fetchAllProducts(),
        fetchCollections(),
      ]);
      setProducts(productsData);
      setCollections(collectionsData);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Shopify fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getProductByHandle = (handle: string) => {
    return products.find((p) => p.handle === handle);
  };

  const getProductsByTag = (tag: string) => {
    return products.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
  };

  const getNewArrivals = () => {
    const newProducts = products.filter((p) => 
      p.tags.some((t) => t.toLowerCase() === "new" || t.toLowerCase() === "new arrival")
    );
    return newProducts.length > 0 ? newProducts : products.slice(0, 8);
  };

  const getTrending = () => {
    const trending = products.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === "trending" || t.toLowerCase() === "bestseller")
    );
    return trending.length > 0 ? trending : products.slice(0, 4);
  };

  const getSignature = () => {
    const signature = products.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === "signature")
    );
    return signature.length > 0 ? signature : products.slice(0, 4);
  };

  const getHeritage = () => {
    const heritage = products.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === "heritage")
    );
    return heritage;
  };

  const getProductsByType = (type: string) => {
    return products.filter((p) => 
      p.productType.toLowerCase() === type.toLowerCase()
    );
  };

  return (
    <ShopifyContext.Provider
      value={{
        products,
        collections,
        isLoading,
        error,
        refetch: fetchData,
        getProductByHandle,
        getProductsByTag,
        getProductsByType,
        getNewArrivals,
        getTrending,
        getSignature,
        getHeritage,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  );
}

export function useShopify() {
  const context = useContext(ShopifyContext);
  if (!context) {
    throw new Error("useShopify must be used within a ShopifyProvider");
  }
  return context;
}
