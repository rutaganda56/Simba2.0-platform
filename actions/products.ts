'use server';

import { createClient } from '@libsql/client';

const client = createClient({
  url: 'file:sqlite.db',
});

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge: string | null;
  inStock: boolean;
  unit: string;
  subcategoryId: number | null;
}

export async function getProducts(options: {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  limit?: number;
  offset?: number;
}) {
  const { query, category, minPrice = 0, maxPrice = 1000000, inStockOnly, limit = 20, offset = 0 } = options;

  let sql = 'SELECT * FROM products WHERE price BETWEEN ? AND ?';
  const args: any[] = [minPrice, maxPrice];

  if (query) {
    sql += ' AND name LIKE ?';
    args.push(`%${query}%`);
  }

  if (category) {
    sql += ' AND category = ?';
    args.push(category);
  }

  if (inStockOnly) {
    sql += ' AND inStock = 1';
  }

  sql += ' LIMIT ? OFFSET ?';
  args.push(limit, offset);

  const result = await client.execute({ sql, args });
  
  return result.rows.map(row => ({
    ...row,
    inStock: row.inStock === 1,
  })) as unknown as Product[];
}

export async function getProductById(id: string) {
  const result = await client.execute({
    sql: 'SELECT * FROM products WHERE id = ?',
    args: [id],
  });

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    ...row,
    inStock: row.inStock === 1,
  } as unknown as Product;
}

export async function getFeaturedProducts(limit: number = 10) {
  const result = await client.execute({
    sql: "SELECT * FROM products WHERE badge = 'Fresh' LIMIT ?",
    args: [limit],
  });

  return result.rows.map(row => ({
    ...row,
    inStock: row.inStock === 1,
  })) as unknown as Product[];
}

export async function getCategories() {
  const result = await client.execute('SELECT DISTINCT category FROM products ORDER BY category ASC');
  return result.rows.map(row => row.category as string);
}

export async function getRelatedProducts(categoryId: string, excludeId: string, limit: number = 4) {
  const result = await client.execute({
    sql: 'SELECT * FROM products WHERE category = ? AND id != ? LIMIT ?',
    args: [categoryId, excludeId, limit],
  });

  return result.rows.map(row => ({
    ...row,
    inStock: row.inStock === 1,
  })) as unknown as Product[];
}
