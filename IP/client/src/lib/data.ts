import type { Product, Category } from "@shared/schema";

import heroMenImage from "@assets/generated_images/luxury_menswear_hero_image.png";
import heroWomenImage from "@assets/generated_images/luxury_womenswear_hero_image.png";
import heroSneakerImage from "@assets/generated_images/premium_sneaker_product_shot.png";
import cinematicHeroImage from "@assets/generated_images/cinematic_luxury_fashion_hero.png";

import menCategoryImage from "@assets/generated_images/men_category_jacket_image.png";
import womenCategoryImage from "@assets/generated_images/women_category_dress_image.png";
import footwearCategoryImage from "@assets/generated_images/luxury_leather_boots_product.png";
import leatherCategoryImage from "@assets/generated_images/luxury_leather_bag_product.png";
import lifestyleCategoryImage from "@assets/generated_images/premium_lifestyle_accessories.png";
import beautyCategoryImage from "@assets/generated_images/premium_luxury_skincare_products.png";
import techCategoryImage from "@assets/generated_images/premium_tech_gadgets_collection.png";
import womensFootwearImage from "@assets/generated_images/luxury_women's_footwear_heels.png";

import navySuitImage from "@assets/generated_images/navy_suit_jacket_product.png";
import whiteShirtImage from "@assets/generated_images/premium_white_shirt_product.png";
import goldGownImage from "@assets/generated_images/gold_evening_gown_product.png";
import burgundyDressImage from "@assets/generated_images/burgundy_wrap_dress_product.png";
import whiteSneakerImage from "@assets/generated_images/white_high-top_sneaker_product.png";
import bootsImage from "@assets/generated_images/luxury_leather_boots_product.png";
import toteImage from "@assets/generated_images/luxury_leather_bag_product.png";
import backpackImage from "@assets/generated_images/luxury_leather_backpack_product.png";
import walletImage from "@assets/generated_images/luxury_wallet_product_shot.png";
import smartRingImage from "@assets/generated_images/smart_ring_product_shot.png";
import deskOrganizerImage from "@assets/generated_images/desk_organizer_lifestyle_product.png";
import vaseImage from "@assets/generated_images/minimalist_vase_decor_product.png";
import crossbodyImage from "@assets/generated_images/crossbody_bag_product_shot.png";
import menJacketImage from "@assets/generated_images/men_category_jacket_image.png";
import womenDressImage from "@assets/generated_images/women_category_dress_image.png";

const SHOPIFY_BASE_URL = "https://p52yuw-uq.myshopify.com";
const SMART_RING_SHOPIFY_URL = "https://p52yuw-uq.myshopify.com/products/health-smart-ring-fitness-tracker-with-heart-rate-blood-oxygen-heart-rate-variability-sleep-monitoring-step-count-ip68-compatible-with-iphone-and-android-no-subscription-fee-required";

export const heroSlides = [
  {
    id: 1,
    image: cinematicHeroImage,
    title: "Define Your Legacy",
    subtitle: "Signature Collection",
    cta: "Explore Collection",
    link: "/collections/signature"
  },
  {
    id: 2,
    image: techCategoryImage,
    title: "Smart Living",
    subtitle: "Tech Innovation",
    cta: "Discover",
    link: "/collections/tech"
  },
  {
    id: 3,
    image: lifestyleCategoryImage,
    title: "Curated from the World",
    subtitle: "Heritage Collection",
    cta: "Explore",
    link: "/collections/heritage"
  }
];

export const cinematicHero = {
  image: cinematicHeroImage,
  title: "Define Your Future",
  subtitle: "The New Collection"
};

export const categories: Category[] = [
  {
    id: "1",
    name: "Men's Apparel",
    slug: "men",
    description: "Luxury Suits & Premium Shirts",
    image: menCategoryImage
  },
  {
    id: "2",
    name: "Women's Apparel",
    slug: "women",
    description: "Elegant Dresses & Evening Wear",
    image: womenCategoryImage
  },
  {
    id: "3",
    name: "Men's Footwear",
    slug: "male-footwear",
    description: "Formal Shoes & Premium Sneakers",
    image: footwearCategoryImage
  },
  {
    id: "4",
    name: "Women's Footwear",
    slug: "female-footwear",
    description: "Luxury Heels & Designer Boots",
    image: womensFootwearImage
  },
  {
    id: "5",
    name: "Jewelry",
    slug: "jewelry",
    description: "Premium Necklaces & Signature Rings",
    image: smartRingImage
  },
  {
    id: "6",
    name: "Bags",
    slug: "bags",
    description: "Luxury Totes & Designer Bags",
    image: leatherCategoryImage
  },
  {
    id: "7",
    name: "Wallets",
    slug: "wallets",
    description: "Premium Wallets & Card Holders",
    image: walletImage
  },
  {
    id: "8",
    name: "Tech Lifestyle",
    slug: "tech",
    description: "Premium Gadgets & Smart Devices",
    image: techCategoryImage
  }
];

export const products: Product[] = [
  {
    id: "m1",
    name: "ZENTRIX Noir Tailored Suit",
    description: "Impeccably crafted from Italian wool, this suit defines modern sophistication. The slim-cut silhouette offers timeless elegance with contemporary edge. Features hand-stitched details and premium lining.",
    price: 795,
    category: "men",
    image: navySuitImage,
    isNew: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Charcoal", "Black"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "m2",
    name: "ZENTRIX Essential Jacket",
    description: "The quintessential layering piece. Crafted from premium wool blend with a minimal aesthetic. Unstructured shoulders create a relaxed yet refined silhouette.",
    price: 485,
    category: "men",
    image: menJacketImage,
    isNew: false,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Camel"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "m3",
    name: "ZENTRIX Pure Cotton Shirt",
    description: "Luxuriously soft Egyptian cotton in a contemporary slim fit. Mother-of-pearl buttons and French seams throughout. The foundation of every refined wardrobe.",
    price: 195,
    category: "men",
    image: whiteShirtImage,
    isNew: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Sky Blue", "Black"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "w1",
    name: "ZENTRIX Aurora Evening Gown",
    description: "A statement of pure elegance. Flowing silk charmeuse cascades from the shoulder, creating a silhouette that moves like liquid gold. Perfect for galas and prestigious events.",
    price: 750,
    category: "women",
    image: goldGownImage,
    isNew: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne Gold", "Midnight Black"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "w2",
    name: "ZENTRIX Velvet Wrap Dress",
    description: "Refined sophistication in sumptuous velvet. The wrap silhouette flatters every figure while the rich burgundy hue speaks of confidence and allure.",
    price: 425,
    category: "women",
    image: burgundyDressImage,
    isNew: false,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Burgundy", "Emerald", "Noir"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "w3",
    name: "ZENTRIX Silk Cocktail Dress",
    description: "Minimalist luxury meets evening glamour. Clean lines in premium silk create an effortlessly chic statement piece for intimate gatherings and cocktail events.",
    price: 545,
    category: "women",
    image: womenDressImage,
    isNew: true,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Ivory"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "f1",
    name: "ZENTRIX AirFlow Sneaker",
    description: "Where innovation meets luxury. Handcrafted Italian leather upper with proprietary cushioning technology. Each pair is individually numbered and crafted to perfection.",
    price: 395,
    category: "mens-footwear",
    image: whiteSneakerImage,
    isNew: true,
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Pure White", "Obsidian"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "f2",
    name: "ZENTRIX Chelsea Boot",
    description: "Timeless British heritage reimagined. Premium calfskin leather with Goodyear welt construction ensures both durability and style that only improves with age.",
    price: 545,
    category: "mens-footwear",
    image: bootsImage,
    isNew: false,
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Black", "Cognac"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "f3",
    name: "ZENTRIX Velocity High-Top",
    description: "Street luxury elevated. Premium leather construction with signature sole technology. A bold statement piece for those who lead, not follow.",
    price: 425,
    category: "mens-footwear",
    image: whiteSneakerImage,
    isNew: true,
    sizes: ["40", "41", "42", "43", "44", "45"],
    colors: ["Triple White", "Shadow Black"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "l1",
    name: "ZENTRIX Noir Tote",
    description: "The ultimate everyday luxury. Full-grain Italian leather with brushed gold hardware. Thoughtfully designed compartments for the modern professional.",
    price: 685,
    category: "leather",
    image: toteImage,
    isNew: true,
    sizes: ["One Size"],
    colors: ["Black", "Tan"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "l2",
    name: "ZENTRIX Metropolitan Backpack",
    description: "Urban sophistication meets functionality. Premium leather construction with padded laptop compartment. For those who carry their world with style.",
    price: 595,
    category: "leather",
    image: backpackImage,
    isNew: false,
    sizes: ["One Size"],
    colors: ["Black", "Navy"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "l3",
    name: "ZENTRIX Signature Wallet",
    description: "Minimalist precision in premium leather. Hand-stitched edges and RFID protection. The essential accessory for the discerning gentleman.",
    price: 175,
    category: "leather",
    image: walletImage,
    isNew: true,
    sizes: ["One Size"],
    colors: ["Black", "Brown"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "z1",
    name: "ZENTRIX Titan Smart Ring",
    description: "Technology meets elegance. Track your wellness, control your devices, and make payments with a gesture. Crafted from aerospace-grade titanium.",
    price: 395,
    category: "jewelry",
    image: smartRingImage,
    isNew: true,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Titanium Black", "Platinum"],
    shopifyUrl: SMART_RING_SHOPIFY_URL
  },
  {
    id: "z2",
    name: "ZENTRIX Executive Desk Set",
    description: "Elevate your workspace with this curated collection. Premium leather and brushed steel combine in a set that makes every desk a statement.",
    price: 285,
    category: "tech",
    image: deskOrganizerImage,
    isNew: false,
    sizes: ["One Size"],
    colors: ["Black/Steel", "Brown/Gold"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "z3",
    name: "ZENTRIX Noir Sculpture Vase",
    description: "Art meets function. This hand-finished ceramic piece brings modern minimalism to any space. A conversation starter and design object in one.",
    price: 165,
    category: "tech",
    image: vaseImage,
    isNew: true,
    sizes: ["One Size"],
    colors: ["Matte Black", "Cream"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "b1",
    name: "ZENTRIX Luminance Serum",
    description: "Revolutionary anti-aging formula infused with 24k gold particles and hyaluronic acid. Clinically proven to restore radiance and reduce fine lines in just 14 days.",
    price: 285,
    category: "jewelry",
    image: beautyCategoryImage,
    isNew: true,
    sizes: ["30ml", "50ml"],
    colors: ["Gold"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "b2",
    name: "ZENTRIX Noir Eau de Parfum",
    description: "A bold, sophisticated fragrance crafted by master perfumers in Grasse. Notes of bergamot, oud wood, and amber create an unforgettable signature scent.",
    price: 245,
    category: "jewelry",
    image: beautyCategoryImage,
    isNew: true,
    sizes: ["50ml", "100ml"],
    colors: ["Noir"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "b3",
    name: "ZENTRIX Velvet Skin Cream",
    description: "Ultra-luxurious moisturizer with rare botanical extracts and Swiss alpine stem cells. Experience the ultimate in skin transformation and hydration.",
    price: 195,
    category: "jewelry",
    image: beautyCategoryImage,
    isNew: false,
    sizes: ["50ml"],
    colors: ["Pearl"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "t1",
    name: "ZENTRIX Aura Headphones",
    description: "Premium wireless headphones with active noise cancellation and spatial audio. Hand-stitched lambskin ear cushions deliver unparalleled comfort for hours of listening.",
    price: 595,
    category: "tech",
    image: techCategoryImage,
    isNew: true,
    sizes: ["One Size"],
    colors: ["Obsidian Black", "Titanium Silver"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "t2",
    name: "ZENTRIX Smart Home Hub",
    description: "The command center for your connected lifestyle. Seamlessly control lighting, climate, and security with voice commands and intuitive touch interface.",
    price: 445,
    category: "tech",
    image: techCategoryImage,
    isNew: true,
    sizes: ["One Size"],
    colors: ["Matte Black", "White"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "t3",
    name: "ZENTRIX Precision Charger",
    description: "Elegant wireless charging station for all your devices. Crafted from aerospace aluminum with LED ambient lighting. Fast-charges three devices simultaneously.",
    price: 175,
    category: "tech",
    image: techCategoryImage,
    isNew: false,
    sizes: ["One Size"],
    colors: ["Space Gray", "Gold"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "wf1",
    name: "ZENTRIX Elegance Stiletto",
    description: "The pinnacle of evening sophistication. Italian calfskin leather with signature red sole. Perfect arch support meets runway-worthy design.",
    price: 695,
    category: "womens-footwear",
    image: womensFootwearImage,
    isNew: true,
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    colors: ["Noir", "Nude", "Scarlet"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "wf2",
    name: "ZENTRIX Chic Ankle Boot",
    description: "Modern sophistication in premium leather. Sculptural block heel and pointed toe create a silhouette that transitions seamlessly from office to evening.",
    price: 545,
    category: "womens-footwear",
    image: womensFootwearImage,
    isNew: false,
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    colors: ["Black", "Burgundy", "Camel"],
    shopifyUrl: SHOPIFY_BASE_URL
  },
  {
    id: "wf3",
    name: "ZENTRIX Classic Pump",
    description: "Timeless elegance reimagined. Butter-soft leather with cushioned insole for all-day comfort. The essential luxury shoe for every occasion.",
    price: 425,
    category: "womens-footwear",
    image: womensFootwearImage,
    isNew: true,
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    colors: ["Patent Black", "Blush", "Navy"],
    shopifyUrl: SHOPIFY_BASE_URL
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
