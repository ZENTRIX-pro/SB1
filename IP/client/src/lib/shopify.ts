import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "p52yuw-uq.myshopify.com",
  storefrontAccessToken: "c65b638b635b6782cc4d5a467c024378",
  apiVersion: "2024-01",
});

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: Array<{
    id: string;
    src: string;
    altText: string | null;
  }>;
  variants: Array<{
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    available: boolean;
  }>;
  productType: string;
  tags: string[];
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
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
    handle: product.handle,
    images: product.images.map((img: any) => ({
      id: img.id,
      src: img.src,
      altText: img.altText,
    })),
    variants: product.variants.map((variant: any) => ({
      id: variant.id,
      title: variant.title,
      price: {
        amount: variant.price?.amount || variant.priceV2?.amount || "0",
        currencyCode: variant.price?.currencyCode || variant.priceV2?.currencyCode || "USD",
      },
      available: variant.available,
    })),
    productType: product.productType || "",
    tags: product.tags || [],
    options: product.options?.map((opt: any) => ({
      id: opt.id,
      name: opt.name,
      values: opt.values.map((v: any) => v.value || v),
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

export async function createCheckout(variantId: string, quantity: number = 1): Promise<string | null> {
  try {
    const checkout = await client.checkout.create();
    const lineItemsToAdd = [{ variantId, quantity }];
    const updatedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    return updatedCheckout.webUrl;
  } catch (error) {
    console.error("Error creating checkout:", error);
    return null;
  }
}

export { client };
