import { type Product, type CartItem, type Category, type InsertProduct, type InsertCartItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;

  // Cart
  getCartItems(): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private categories: Map<string, Category>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.cartItems = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categoriesData: Category[] = [
      { id: "1", name: "ZENTRIX Men", slug: "men", description: "Luxury Suits, Minimalist Jackets, Premium Shirts", image: "/images/men.jpg" },
      { id: "2", name: "ZENTRIX Women", slug: "women", description: "Elegant Evening Wear, Chic Dresses", image: "/images/women.jpg" },
      { id: "3", name: "Z-Footwear", slug: "footwear", description: "High-end Sneakers & Leather Boots", image: "/images/footwear.jpg" },
      { id: "4", name: "Leather & Carry", slug: "leather", description: "Luxury Handbags, Backpacks, Wallets", image: "/images/leather.jpg" },
      { id: "5", name: "Z-Lifestyle", slug: "lifestyle", description: "Premium Tech Accessories & Minimalist Decor", image: "/images/lifestyle.jpg" },
    ];
    categoriesData.forEach(c => this.categories.set(c.id, c));

    // Initialize products
    const productsData: Product[] = [
      // Men
      { id: "m1", name: "ZENTRIX Noir Tailored Suit", description: "Impeccably crafted from Italian wool, this suit defines modern sophistication.", price: 795, category: "men", image: "/images/suit.jpg", isNew: true, sizes: ["S", "M", "L", "XL"], colors: ["Navy", "Charcoal", "Black"] },
      { id: "m2", name: "ZENTRIX Essential Jacket", description: "The quintessential layering piece. Premium wool blend with minimal aesthetic.", price: 485, category: "men", image: "/images/jacket.jpg", isNew: false, sizes: ["S", "M", "L", "XL"], colors: ["Charcoal", "Camel"] },
      { id: "m3", name: "ZENTRIX Pure Cotton Shirt", description: "Luxuriously soft Egyptian cotton in a contemporary slim fit.", price: 195, category: "men", image: "/images/shirt.jpg", isNew: true, sizes: ["S", "M", "L", "XL", "XXL"], colors: ["White", "Sky Blue", "Black"] },
      
      // Women
      { id: "w1", name: "ZENTRIX Aurora Evening Gown", description: "A statement of pure elegance. Flowing silk charmeuse cascades from the shoulder.", price: 750, category: "women", image: "/images/gown.jpg", isNew: true, sizes: ["XS", "S", "M", "L"], colors: ["Champagne Gold", "Midnight Black"] },
      { id: "w2", name: "ZENTRIX Velvet Wrap Dress", description: "Refined sophistication in sumptuous velvet.", price: 425, category: "women", image: "/images/dress.jpg", isNew: false, sizes: ["XS", "S", "M", "L", "XL"], colors: ["Burgundy", "Emerald", "Noir"] },
      { id: "w3", name: "ZENTRIX Silk Cocktail Dress", description: "Minimalist luxury meets evening glamour.", price: 545, category: "women", image: "/images/cocktail.jpg", isNew: true, sizes: ["XS", "S", "M", "L"], colors: ["Black", "Ivory"] },
      
      // Footwear
      { id: "f1", name: "ZENTRIX AirFlow Sneaker", description: "Where innovation meets luxury. Handcrafted Italian leather upper.", price: 395, category: "footwear", image: "/images/sneaker.jpg", isNew: true, sizes: ["40", "41", "42", "43", "44", "45"], colors: ["Pure White", "Obsidian"] },
      { id: "f2", name: "ZENTRIX Chelsea Boot", description: "Timeless British heritage reimagined. Premium calfskin leather.", price: 545, category: "footwear", image: "/images/boot.jpg", isNew: false, sizes: ["40", "41", "42", "43", "44", "45"], colors: ["Black", "Cognac"] },
      { id: "f3", name: "ZENTRIX Velocity High-Top", description: "Street luxury elevated. Premium leather construction.", price: 425, category: "footwear", image: "/images/hightop.jpg", isNew: true, sizes: ["40", "41", "42", "43", "44", "45"], colors: ["Triple White", "Shadow Black"] },
      
      // Leather
      { id: "l1", name: "ZENTRIX Noir Tote", description: "The ultimate everyday luxury. Full-grain Italian leather.", price: 685, category: "leather", image: "/images/tote.jpg", isNew: true, sizes: ["One Size"], colors: ["Black", "Tan"] },
      { id: "l2", name: "ZENTRIX Metropolitan Backpack", description: "Urban sophistication meets functionality.", price: 595, category: "leather", image: "/images/backpack.jpg", isNew: false, sizes: ["One Size"], colors: ["Black", "Navy"] },
      { id: "l3", name: "ZENTRIX Signature Wallet", description: "Minimalist precision in premium leather.", price: 175, category: "leather", image: "/images/wallet.jpg", isNew: true, sizes: ["One Size"], colors: ["Black", "Brown"] },
      
      // Lifestyle
      { id: "z1", name: "ZENTRIX Titan Smart Ring", description: "Technology meets elegance. Aerospace-grade titanium.", price: 395, category: "lifestyle", image: "/images/ring.jpg", isNew: true, sizes: ["6", "7", "8", "9", "10", "11"], colors: ["Titanium Black", "Platinum"] },
      { id: "z2", name: "ZENTRIX Executive Desk Set", description: "Elevate your workspace with this curated collection.", price: 285, category: "lifestyle", image: "/images/desk.jpg", isNew: false, sizes: ["One Size"], colors: ["Black/Steel", "Brown/Gold"] },
      { id: "z3", name: "ZENTRIX Noir Sculpture Vase", description: "Art meets function. Hand-finished ceramic piece.", price: 165, category: "lifestyle", image: "/images/vase.jpg", isNew: true, sizes: ["One Size"], colors: ["Matte Black", "Cream"] },
    ];
    productsData.forEach(p => this.products.set(p.id, p));
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isNew);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }

  // Categories
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(c => c.slug === slug);
  }

  // Cart
  async getCartItems(): Promise<CartItem[]> {
    return Array.from(this.cartItems.values());
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item with same productId, size, color exists
    const existing = Array.from(this.cartItems.values()).find(
      ci => ci.productId === item.productId && ci.size === item.size && ci.color === item.color
    );

    if (existing) {
      existing.quantity += item.quantity;
      return existing;
    }

    const id = randomUUID();
    const cartItem: CartItem = { ...item, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(): Promise<void> {
    this.cartItems.clear();
  }
}

export const storage = new MemStorage();
