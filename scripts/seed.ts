import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';

async function main() {
  const client = createClient({ url: 'file:sqlite.db' });
  
  const dataPath = path.join(process.cwd(), 'data', 'products.json');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent);
  const productsList = data.products;

  console.log(`Starting seeding ${productsList.length} products...`);

  // Handle products in batches
  const batchSize = 50; // Smaller batches for safer raw SQL execution
  for (let i = 0; i < productsList.length; i += batchSize) {
    const batch = productsList.slice(i, i + batchSize);
    
    const placeholders = batch.map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
    const params = batch.flatMap((p: any) => [
        String(p.id),
        p.name,
        p.category,
        Number(p.price),
        p.image,
        p.description || 'No description available',
        p.badge || null,
        p.inStock ? 1 : 0,
        p.unit || 'Pcs',
        p.subcategoryId || null,
        p._imageSource || null,
        p._imageScore || null,
        p._originalImage || null,
    ]);

    await client.execute({
        sql: `INSERT OR IGNORE INTO products (id, name, category, price, image, description, badge, inStock, unit, subcategoryId, imageSource, imageScore, originalImage) VALUES ${placeholders}`,
        args: params
    });
    
    if (i % 1000 === 0) {
      console.log(`Processed ${i} / ${productsList.length} products...`);
    }
  }

  console.log('Seeding complete successfully!');
}

main().catch(console.error);
