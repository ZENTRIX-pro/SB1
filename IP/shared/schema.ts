import { z } from "zod";

export const productCategories = [
  "men",
  "women", 
  "footwear",
  "leather",
  "lifestyle"
] as const;

export type ProductCategory = typeof productCategories[number];

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.enum(productCategories),
  image: z.string(),
  isNew: z.boolean().default(false),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
});

export type Product = z.infer<typeof productSchema>;

export const insertProductSchema = productSchema.omit({ id: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;

export const cartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  quantity: z.number().min(1),
  size: z.string().optional(),
  color: z.string().optional(),
});

export type CartItem = z.infer<typeof cartItemSchema>;

export const insertCartItemSchema = cartItemSchema.omit({ id: true });
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.enum(productCategories),
  description: z.string(),
  image: z.string(),
});

export type Category = z.infer<typeof categorySchema>;

// Users schema (keeping existing)
export const users = {
  id: z.string(),
  username: z.string(),
  password: z.string(),
};

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = { id: string; username: string; password: string };
