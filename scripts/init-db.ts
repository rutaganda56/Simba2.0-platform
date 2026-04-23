import { createClient } from '@libsql/client';

async function main() {
  const client = createClient({ url: 'file:sqlite.db' });
  
  await client.execute(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT 'No description available',
    badge TEXT,
    inStock INTEGER NOT NULL DEFAULT 1,
    unit TEXT NOT NULL DEFAULT 'Pcs',
    subcategoryId INTEGER,
    imageSource TEXT,
    imageScore REAL,
    originalImage TEXT
  );`);
  
  console.log('Database table created successfully!');
}

main().catch(console.error);
