
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(), // Using as email
  password: text("password").notNull(),
  name: text("name").notNull(),
  whatsapp: text("whatsapp").notNull(), // Format: 1234567890
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(), // Foreign key to users
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  reward: text("reward"), // Optional reward text
  status: text("status").notNull().default("safe"), // 'safe' | 'lost'
  uuid: text("uuid").notNull().unique(), // Public unique ID for QR code
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema for inserting user - validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  whatsapp: true,
}).extend({
  username: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  whatsapp: z.string().min(10, "Invalid WhatsApp number"),
});

// Schema for inserting product
export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  category: true,
  description: true,
  reward: true,
  status: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
