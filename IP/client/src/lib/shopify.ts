import Client from "shopify-buy";

const SHOPIFY_DOMAIN = "p52yuw-uq.myshopify.com";
const STOREFRONT_TOKEN = "c65b638b635b6782cc4d5a467c024378";
const API_VERSION = "2024-01";

const client = Client.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: STOREFRONT_TOKEN,
  apiVersion: API_VERSION,
});

export interface MenuItem {
  id: string;
  title: string;
  url: string;
  type: string;
  items: MenuItem[];
}

export interface NavigationMenu {
  id: string;
  handle: string;
  title: string;
  items: MenuItem[];
}

export async function fetchNavigationMenu(handle: string = "main-menu"): Promise<NavigationMenu | null> {
  try {
    const query = `
      query getMenu($handle: String!) {
        menu(handle: $handle) {
          id
          handle
          title
          items {
            id
            title
            url
            type
            items {
              id
              title
              url
              type
              items {
                id
                title
                url
                type
              }
            }
          }
        }
      }
    `;

    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables: { handle } }),
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('[Shopify] GraphQL errors:', data.errors);
      return null;
    }

    if (data.data?.menu) {
      console.log(`[Shopify] Fetched navigation menu: ${handle}`);
      return data.data.menu as NavigationMenu;
    }

    return null;
  } catch (error) {
    console.error('[Shopify] Error fetching navigation menu:', error);
    return null;
  }
}

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
  image?: {
    src: string;
    altText: string | null;
  } | null;
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
      image: variant.image ? {
        src: variant.image.src,
        altText: variant.image.altText || null,
      } : null,
    })) || [],
    options: product.options?.map((opt: any) => ({
      id: opt.id || String(Math.random()),
      name: opt.name,
      values: Array.from(new Set(opt.values?.map((v: any) => typeof v === "string" ? v : v.value) || [])),
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
    const collections = await client.collection.fetchAll(250);
    return collections.map(transformCollection);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export const COLLECTION_HANDLES = {
  MEN: "men",
  WOMEN: "women",
  HOME: "home",
  ACTIVE: "active",
  TECH: "tech",
  BEAUTY: "beauty",
  SCENTS: "scents",
  GIFTS: "gifts",
  MENS_SETS: "mens-sets",
  MENS_KNITWEAR: "mens-knitwear",
  MENS_RESORT_SHIRTS: "mens-resort-shirts",
  MENS_T_SHIRTS: "mens-t-shirts",
  MENS_TROUSERS: "mens-trousers",
  MENS_WATCHES: "mens-watches",
  MENS_FOOTWEAR: "mens-footwear",
  MENS_ACCESSORIES: "mens-accessories",
  WOMENS_DRESSES: "womens-dresses",
  WOMENS_TOPS: "womens-tops",
  WOMENS_HANDBAGS: "womens-handbags",
  WOMENS_JEWELRY: "womens-jewelry",
  WOMENS_WATCHES: "womens-watches",
  WOMENS_FOOTWEAR: "womens-footwear",
  HOME_DECOR: "home-decor",
  ITALIAN_FURNITURE: "italian-furniture",
  WALL_ART: "wall-art",
  TABLEWARE: "tableware",
  MENS_ACTIVEWEAR: "mens-activewear",
  WOMENS_ACTIVEWEAR: "womens-activewear",
  RUNNING_SHOES: "running-shoes",
  GYM_GEAR: "gym-gear",
  SMART_WATCHES: "smart-watches",
  HEADPHONES: "headphones",
  TECH_GADGETS: "tech-gadgets",
  BEAUTY_SKINCARE: "beauty-skincare",
  BEAUTY_TOOLS: "beauty-tools",
  HAIR_CARE: "hair-care",
  MENS_PERFUME: "mens-perfume",
  WOMENS_PERFUME: "womens-perfume",
  UNISEX_SCENTS: "unisex-scents",
  GIFTS_FOR_HIM: "gifts-for-him",
  GIFTS_FOR_HER: "gifts-for-her",
  GIFT_BUNDLES: "gift-bundles",
  SIGNATURE: "signature",
  HERITAGE: "heritage",
  TRENDING: "trending",
  NEW: "new",
  HERO_SLIDER: "hero-slider",
  LIMITED_DROP: "limited-drop",
} as const;

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  subtitle: string;
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  try {
    const { products } = await fetchCollectionByHandle(COLLECTION_HANDLES.HERO_SLIDER);
    
    return products.map((product) => {
      const linkTag = product.tags.find((tag) => tag.startsWith("link:"));
      const link = linkTag ? linkTag.replace("link:", "") : "/";
      
      const subtitleTag = product.tags.find((tag) => tag.startsWith("subtitle:"));
      const subtitle = subtitleTag ? subtitleTag.replace("subtitle:", "") : "Featured Collection";
      
      return {
        id: product.id,
        title: product.title,
        description: product.description || "",
        image: product.images[0]?.src || "",
        link,
        subtitle,
      };
    });
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
}

export async function fetchCollectionByHandle(handle: string): Promise<{
  collection: ShopifyCollection | null;
  products: ShopifyProduct[];
}> {
  try {
    console.log(`[Shopify] Fetching collection: ${handle}`);
    
    // Directly fetch the collection by handle using the SDK
    const collection = await client.collection.fetchByHandle(handle);
    
    if (!collection) {
      console.log(`[Shopify] Collection "${handle}" not found - trying alternative fetch`);
      // Fallback: fetch all collections with higher limit
      const allCollections = await client.collection.fetchAllWithProducts({ first: 250 });
      console.log(`[Shopify] Available collections (${allCollections.length}):`, allCollections.map((c: any) => c.handle));
      const foundCollection = allCollections.find((c: any) => c.handle === handle);
      
      if (foundCollection) {
        console.log(`[Shopify] Found collection "${handle}" via fallback with ${foundCollection.products?.length || 0} products`);
        return {
          collection: transformCollection(foundCollection),
          products: (foundCollection.products || []).map(transformProduct),
        };
      }
      
      console.log(`[Shopify] Collection "${handle}" definitely not found in store`);
      return { collection: null, products: [] };
    }
    
    // Fetch products for this collection with no filters, high limit
    const collectionWithProducts = await client.collection.fetchWithProducts(collection.id, { productsFirst: 250 });
    
    if (collectionWithProducts && collectionWithProducts.products) {
      console.log(`[Shopify] Found collection "${handle}" with ${collectionWithProducts.products.length} products`);
      return {
        collection: transformCollection(collectionWithProducts),
        products: collectionWithProducts.products.map(transformProduct),
      };
    }
    
    console.log(`[Shopify] Collection "${handle}" found but has no products`);
    return { 
      collection: transformCollection(collection), 
      products: [] 
    };
  } catch (error) {
    console.error(`[Shopify] Error fetching collection "${handle}":`, error);
    return { collection: null, products: [] };
  }
}

export async function fetchMultipleCollections(handles: string[]): Promise<ShopifyProduct[]> {
  try {
    const results = await Promise.all(
      handles.map((handle) => fetchCollectionByHandle(handle))
    );
    const allProducts: ShopifyProduct[] = [];
    const seenIds = new Set<string>();
    
    results.forEach(({ products }) => {
      products.forEach((product) => {
        if (!seenIds.has(product.id)) {
          seenIds.add(product.id);
          allProducts.push(product);
        }
      });
    });
    
    return allProducts;
  } catch (error) {
    console.error("Error fetching multiple collections:", error);
    return [];
  }
}

export async function fetchCollectionWithProducts(handle: string): Promise<{
  collection: ShopifyCollection | null;
  products: ShopifyProduct[];
}> {
  // Re-use the improved fetchCollectionByHandle
  return fetchCollectionByHandle(handle);
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

export function getUniqueOptionValues(option: { name: string; values: string[] }): string[] {
  return Array.from(new Set(option.values));
}

export function getVariantImageForOption(
  variants: ShopifyVariant[],
  optionName: string,
  optionValue: string,
  images: ShopifyImage[]
): ShopifyImage | null {
  const matchingVariant = variants.find((variant) => 
    variant.selectedOptions.some(
      (opt) => opt.name.toLowerCase() === optionName.toLowerCase() && opt.value === optionValue
    )
  );
  
  if (matchingVariant?.image) {
    const matchingImage = images.find((img) => img.src === matchingVariant.image?.src);
    if (matchingImage) return matchingImage;
    return {
      id: String(Math.random()),
      src: matchingVariant.image.src,
      altText: matchingVariant.image.altText,
    };
  }
  
  return null;
}

export function isVariantAvailable(variant: ShopifyVariant | null): boolean {
  if (!variant) return true;
  return variant.available ?? true;
}

export function extractNumericVariantId(variantId: string): string {
  const match = variantId.match(/ProductVariant\/(\d+)/);
  return match ? match[1] : variantId.split("/").pop() || variantId;
}

export function buildCheckoutUrl(variantId: string, quantity: number): string {
  const numericId = extractNumericVariantId(variantId);
  return `https://${SHOPIFY_DOMAIN}/cart/${numericId}:${quantity}`;
}

export function formatPrice(amount: string, currencyCode: string = "USD"): string {
  let num = parseFloat(amount);
  if (num > 500) {
    num = num / 84;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

export async function fetchCollectionImage(handle: string): Promise<string | null> {
  try {
    const collection = await client.collection.fetchByHandle(handle);
    if (collection && collection.image) {
      return collection.image.src;
    }
    const collections = await client.collection.fetchAll(250);
    const found = collections.find((c: any) => c.handle === handle);
    if (found && found.image) {
      return found.image.src;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching collection image for ${handle}:`, error);
    return null;
  }
}

export interface ShopifyMenuItem {
  id: string;
  title: string;
  url: string;
  type: string;
  items: ShopifyMenuItem[];
  collectionHandle?: string;
  collectionImage?: string | null;
  productCount?: number;
}

export interface ShopifyMenu {
  id: string;
  title: string;
  handle: string;
  items: ShopifyMenuItem[];
}

const GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

async function shopifyGraphQL<T>(query: string, variables: Record<string, any> = {}): Promise<T | null> {
  try {
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });
    const result = await response.json();
    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    return null;
  }
}

export async function fetchShopifyMenu(handle: string = "main-menu"): Promise<ShopifyMenu | null> {
  const query = `
    query GetMenu($handle: String!) {
      menu(handle: $handle) {
        id
        title
        handle
        items {
          id
          title
          url
          type
          items {
            id
            title
            url
            type
          }
        }
      }
    }
  `;
  
  const data = await shopifyGraphQL<{ menu: any }>(query, { handle });
  if (!data?.menu) return null;
  
  const transformMenuItem = (item: any): ShopifyMenuItem => ({
    id: item.id,
    title: item.title,
    url: item.url,
    type: item.type,
    items: item.items?.map(transformMenuItem) || [],
  });
  
  return {
    id: data.menu.id,
    title: data.menu.title,
    handle: data.menu.handle,
    items: data.menu.items.map(transformMenuItem),
  };
}

export async function fetchCollectionsWithImages(): Promise<ShopifyCollection[]> {
  try {
    const collections = await client.collection.fetchAll(250);
    return collections.map(transformCollection);
  } catch (error) {
    console.error("Error fetching collections with images:", error);
    return [];
  }
}

export async function fetchMenuWithCollectionImages(menuHandle: string = "main-menu"): Promise<ShopifyMenuItem[]> {
  const [menu, collections, allProducts] = await Promise.all([
    fetchShopifyMenu(menuHandle),
    fetchCollectionsWithImages(),
    fetchAllProducts(),
  ]);
  
  if (!menu) return [];
  
  const collectionMap = new Map(collections.map(c => [c.handle, c]));
  const productsByCollection = new Map<string, number>();
  
  allProducts.forEach(product => {
    product.tags.forEach(tag => {
      const current = productsByCollection.get(tag.toLowerCase()) || 0;
      productsByCollection.set(tag.toLowerCase(), current + 1);
    });
  });
  
  const enrichMenuItem = (item: ShopifyMenuItem): ShopifyMenuItem => {
    const urlParts = item.url.split("/");
    const handle = urlParts[urlParts.length - 1];
    const collection = collectionMap.get(handle);
    
    let productCount = 0;
    if (collection) {
      productCount = productsByCollection.get(handle) || 0;
    }
    
    return {
      ...item,
      collectionHandle: handle,
      collectionImage: collection?.image?.src || null,
      productCount,
      items: item.items.map(enrichMenuItem),
    };
  };
  
  return menu.items.map(enrichMenuItem);
}

export async function fetchCollectionImagesMap(handles: string[]): Promise<Map<string, string | null>> {
  const collections = await fetchCollectionsWithImages();
  const imageMap = new Map<string, string | null>();
  
  handles.forEach(handle => {
    const collection = collections.find(c => c.handle === handle);
    imageMap.set(handle, collection?.image?.src || null);
  });
  
  return imageMap;
}

export { client };
