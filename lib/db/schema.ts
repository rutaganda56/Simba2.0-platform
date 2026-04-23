import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  price: real('price').notNull(),
  image: text('image').notNull(),
  description: text('description').notNull().default('No description available'),
  badge: text('badge'),
  inStock: integer('inStock', { mode: 'boolean' }).notNull().default(true),
  unit: text('unit').notNull().default('Pcs'),
  subcategoryId: integer('subcategoryId'),
  imageSource: text('imageSource'),
  imageScore: real('imageScore'),
  originalImage: text('originalImage'),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
