import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "p52yuw-uq.myshopify.com",
  storefrontAccessToken: "c65b638b635b6782cc4d5a467c024378",
  apiVersion: "2024-01",
});

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  } | null;
  available: boolean;
  sku: string;
  selectedOptions: SelectedOption[];
}

export interface ShopifyImage {
  id: string;
  src: string;
  altText: string | null;
}

export interface ShopifyOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  handle: string;
  vendor: string;
  productType: string;
  tags: string[];
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  options: ShopifyOption[];
  availableForSale: boolean;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: {
    src: string;
    altText: string | null;
  } | null;
}

function transformProduct(product: any): ShopifyProduct {
  return {
    id: product.id,
    title: product.title,
    description: product.description || "",
    descriptionHtml: product.descriptionHtml || product.description || "",
    handle: product.handle,
    vendor: product.vendor || "",
    productType: product.productType || "",
    tags: product.tags || [],
    availableForSale: product.availableForSale ?? true,
    images: product.images?.map((img: any) => ({
      id: img.id || String(Math.random()),
      src: img.src,
      altText: img.altText || null,
    })) || [],
    variants: product.variants?.map((variant: any) => ({
      id: variant.id,
      title: variant.title || "Default",
      price: {
        amount: variant.price?.amount || variant.priceV2?.amount || variant.price || "0",
        currencyCode: variant.price?.currencyCode || variant.priceV2?.currencyCode || "USD",
      },
      compareAtPrice: variant.compareAtPrice || variant.compareAtPriceV2 ? {
        amount: variant.compareAtPrice?.amount || variant.compareAtPriceV2?.amount || "0",
        currencyCode: variant.compareAtPrice?.currencyCode || variant.compareAtPriceV2?.currencyCode || "USD",
      } : null,
      available: variant.available ?? variant.availableForSale ?? true,
      sku: variant.sku || "",
      selectedOptions: variant.selectedOptions?.map((opt: any) => ({
        name: opt.name,
        value: opt.value,
      })) || [],
    })) || [],
    options: product.options?.map((opt: any) => ({
      id: opt.id || String(Math.random()),
      name: opt.name,
      values: opt.values?.map((v: any) => typeof v === "string" ? v : v.value) || [],
    })) || [],
  };
}

function transformCollection(collection: any): ShopifyCollection {
  return {
    id: collection.id,
    title: collection.title,
    description: collection.description || "",
    handle: collection.handle,
    image: collection.image ? {
      src: collection.image.src,
      altText: collection.image.altText,
    } : null,
  };
}

export async function fetchAllProducts(): Promise<ShopifyProduct[]> {
  try {
    const products = await client.product.fetchAll(250);
    return products.map(transformProduct);
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    return [];
  }
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const product = await client.product.fetchByHandle(handle);
    return product ? transformProduct(product) : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function fetchProductById(id: string): Promise<ShopifyProduct | null> {
  try {
    const product = await client.product.fetch(id);
    return product ? transformProduct(product) : null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

export async function fetchCollections(): Promise<ShopifyCollection[]> {
  try {
    const collections = await client.collection.fetchAll(20);
    return collections.map(transformCollection);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export async function fetchCollectionWithProducts(handle: string): Promise<{
  collection: ShopifyCollection | null;
  products: ShopifyProduct[];
}> {
  try {
    const collections = await client.collection.fetchAllWithProducts();
    const collection = collections.find((c: any) => c.handle === handle);
    
    if (collection) {
      return {
        collection: transformCollection(collection),
        products: collection.products.map(transformProduct),
      };
    }
    return { collection: null, products: [] };
  } catch (error) {
    console.error("Error fetching collection with products:", error);
    return { collection: null, products: [] };
  }
}

export function findVariantByOptions(
  variants: ShopifyVariant[],
  selectedOptions: Record<string, string>
): ShopifyVariant | null {
  if (!variants || variants.length === 0) return null;
  
  const optionKeys = Object.keys(selectedOptions);
  if (optionKeys.length === 0) return variants[0];
  
  return variants.find((variant) => {
    return optionKeys.every((key) => {
      const variantOption = variant.selectedOptions.find(
        (opt) => opt.name.toLowerCase() === key.toLowerCase()
      );
      return variantOption && variantOption.value === selectedOptions[key];
    });
  }) || null;
}

export function extractNumericVariantId(variantId: string): string {
  const match = variantId.match(/ProductVariant\/(\d+)/);
  return match ? match[1] : variantId.split("/").pop() || variantId;
}

export function buildCheckoutUrl(variantId: string, quantity: number): string {
  const numericId = extractNumericVariantId(variantId);
  return `https://p52yuw-uq.myshopify.com/cart/${numericId}:${quantity}`;
}

export function formatPrice(amount: string, currencyCode: string = "USD"): string {
  const num = parseFloat(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(num);
}

export { client };
