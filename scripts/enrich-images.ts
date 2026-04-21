import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  subcategoryId: number;
  inStock: boolean;
  image: string;
  unit: string;
}

interface ProductAnalysis {
  cleanName: string;
  brand: string | null;
  productType: string;
  size: string | null;
  searchQueries: string[];
  unsplashQuery: string;
  pexelsQuery: string;
  openFoodFactsQuery: string | null;
  isFood: boolean;
  isDrink: boolean;
  imageStyle: string;
}

interface ImageResult {
  url: string;
  source: string;
  score: number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function analyzeProductName(product: Product): Promise<ProductAnalysis> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Clean this product name for image searching:

Name: "${product.name}"
Category: "${product.category}"
Price: ${product.price} RWF

Return ONLY valid JSON:
{
  "cleanName": "human-readable product name without SKU codes",
  "brand": "brand name or null",
  "productType": "what kind of item this is",
  "size": "size/volume/weight if present, else null",
  "searchQueries": ["query 1: most specific", "query 2: medium", "query 3: broadest"],
  "unsplashQuery": "2-4 word Unsplash query",
  "pexelsQuery": "2-4 word Pexels query",
  "openFoodFactsQuery": "search term or null",
  "isFood": true/false,
  "isDrink": true/false,
  "imageStyle": "packaged_product | fresh_food | appliance | bottle | toy | generic"
}`
    }]
  });

  return JSON.parse(response.content[0].type === 'text' ? response.content[0].text : '{}');
}

async function searchOpenFoodFacts(query: string): Promise<ImageResult | null> {
  if (!query) return null;
  
  try {
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5&fields=product_name,image_front_url`);
    const data = await response.json();
    
    if (data.products?.[0]?.image_front_url) {
      return { url: data.products[0].image_front_url, source: 'openfoodfacts', score: 0.8 };
    }
  } catch (e) {}
  
  return null;
}

async function searchUnsplash(query: string): Promise<ImageResult | null> {
  if (!process.env.UNSPLASH_ACCESS_KEY) return null;
  
  try {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=squarish&per_page=5`, {
      headers: { 'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });
    const data = await response.json();
    
    if (data.results?.[0]?.urls?.regular) {
      return { url: data.results[0].urls.regular, source: 'unsplash', score: 0.7 };
    }
  } catch (e) {}
  
  return null;
}

async function searchPexels(query: string): Promise<ImageResult | null> {
  if (!process.env.PEXELS_API_KEY) return null;
  
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5`, {
      headers: { 'Authorization': process.env.PEXELS_API_KEY }
    });
    const data = await response.json();
    
    if (data.photos?.[0]?.src?.medium) {
      return { url: data.photos[0].src.medium, source: 'pexels', score: 0.65 };
    }
  } catch (e) {}
  
  return null;
}

function buildFallback(analysis: ProductAnalysis): string {
  return `https://source.unsplash.com/400x400/?${encodeURIComponent(analysis.unsplashQuery)}`;
}

async function searchCascade(product: Product, analysis: ProductAnalysis): Promise<ImageResult> {
  if (analysis.isFood || analysis.isDrink) {
    const result = await searchOpenFoodFacts(analysis.openFoodFactsQuery || analysis.searchQueries[0]);
    if (result && result.score >= 0.75) return result;
    await sleep(600);
  }
  
  const unsplashResult = await searchUnsplash(analysis.unsplashQuery);
  if (unsplashResult) {
    await sleep(72000);
    return unsplashResult;
  }
  
  const pexelsResult = await searchPexels(analysis.pexelsQuery);
  if (pexelsResult) {
    await sleep(18000);
    return pexelsResult;
  }
  
  return { url: buildFallback(analysis), source: 'fallback', score: 0.5 };
}

async function enrichProducts() {
  const data = JSON.parse(fs.readFileSync('simba_products.json', 'utf8'));
  const products: Product[] = data.products;
  const enriched: any[] = [];
  const report: any = { runAt: new Date().toISOString(), summary: { total: products.length, enriched: 0, fallback: 0, sources: {} }, lowConfidence: [] };
  
  const BATCH_SIZE = 10;
  
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    
    const results = await Promise.allSettled(
      batch.map(async (product) => {
        const analysis = await analyzeProductName(product);
        await sleep(1200);
        
        const imageResult = await searchCascade(product, analysis);
        
        return {
          ...product,
          image: imageResult.url,
          _imageSource: imageResult.source,
          _imageScore: imageResult.score,
          _imageQuery: analysis.searchQueries[0]
        };
      })
    );
    
    results.forEach((result, idx) => {
      const product = batch[idx];
      if (result.status === 'fulfilled') {
        enriched.push(result.value);
        report.summary.enriched++;
        report.summary.sources[result.value._imageSource] = (report.summary.sources[result.value._imageSource] || 0) + 1;
        
        if (result.value._imageScore < 0.6) {
          report.lowConfidence.push({ id: product.id, name: product.name, score: result.value._imageScore, source: result.value._imageSource });
        }
      } else {
        enriched.push({ ...product, _imageSource: 'error', _imageScore: 0 });
        report.summary.fallback++;
      }
    });
    
    console.log(`✅ ${Math.min(i + BATCH_SIZE, products.length)}/${products.length} products processed`);
    await sleep(500);
  }
  
  fs.writeFileSync('simba_products_enriched.json', JSON.stringify({ store: data.store, products: enriched }, null, 2));
  fs.writeFileSync('image-enrichment-report.json', JSON.stringify(report, null, 2));
  
  console.log('🎉 Done! Check simba_products_enriched.json');
}

enrichProducts().catch(console.error);
