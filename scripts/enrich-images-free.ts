import fs from 'fs';

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

interface ImageResult {
  url: string;
  source: string;
  score: number;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function analyzeProductName(product: Product) {
  const name = product.name.toLowerCase();
  
  // Detect product type
  let productType = 'generic product';
  let searchQuery = product.name.replace(/\d+[a-z]*[-_]\d+/gi, '').trim();
  
  // Food/Drink detection
  const isFood = /bread|rice|sugar|flour|pasta|honey|jam|chocolate|biscuit|cookie|cake|meat|sausage|burger/i.test(name);
  const isDrink = /cognac|whisky|vodka|wine|beer|champagne|gin|rum|tequila|juice|milk|coffee|tea/i.test(name);
  
  // Specific categories
  if (/cognac|whisky|vodka|wine|beer|champagne|gin|rum|tequila/i.test(name)) {
    productType = 'alcoholic beverage bottle';
    searchQuery = name.split(' ').slice(0, 3).join(' ') + ' bottle';
  } else if (/oil|olive|cooking/i.test(name)) {
    productType = 'cooking oil bottle';
    searchQuery = 'cooking oil bottle';
  } else if (/bread|baguette|croissant|pain/i.test(name)) {
    productType = 'bakery bread';
    searchQuery = name.includes('baguette') ? 'french baguette' : 'artisan bread';
  } else if (/heater|iron|kettle|blender|pan/i.test(name)) {
    productType = 'kitchen appliance';
    searchQuery = name.match(/heater|iron|kettle|blender|pan/i)?.[0] + ' appliance';
  } else if (/toy|plane|blocks|doll|rope/i.test(name)) {
    productType = 'toy';
    searchQuery = name.match(/plane|blocks|doll|rope/i)?.[0] + ' toy';
  } else if (/sausage|burger|meat|chicken/i.test(name)) {
    productType = 'meat product';
    searchQuery = name.match(/sausage|burger|meat|chicken/i)?.[0];
  }
  
  return {
    productType,
    searchQuery: searchQuery.substring(0, 50),
    isFood,
    isDrink
  };
}

async function searchOpenFoodFacts(query: string): Promise<ImageResult | null> {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=3&fields=product_name,image_front_url`);
    const data = await response.json();
    
    if (data.products?.[0]?.image_front_url) {
      return { url: data.products[0].image_front_url, source: 'openfoodfacts', score: 0.75 };
    }
  } catch (e) {
    console.log(`  ⚠️  Open Food Facts error: ${e}`);
  }
  
  return null;
}

function buildUnsplashFallback(query: string): string {
  const cleanQuery = query.replace(/[^\w\s]/g, '').trim().substring(0, 40);
  return `https://source.unsplash.com/400x400/?${encodeURIComponent(cleanQuery)}`;
}

async function searchForImage(product: Product): Promise<ImageResult> {
  const analysis = analyzeProductName(product);
  
  console.log(`  🔍 Searching: ${analysis.searchQuery}`);
  
  // Try Open Food Facts for food/drinks
  if (analysis.isFood || analysis.isDrink) {
    const result = await searchOpenFoodFacts(analysis.searchQuery);
    if (result) {
      console.log(`  ✅ Found on Open Food Facts`);
      return result;
    }
    await sleep(600);
  }
  
  // Fallback to Unsplash random
  console.log(`  📸 Using Unsplash fallback`);
  return {
    url: buildUnsplashFallback(analysis.searchQuery),
    source: 'unsplash-fallback',
    score: 0.5
  };
}

async function enrichProducts() {
  console.log('🚀 Starting Simba Product Image Enrichment (Free Version)\n');
  
  const data = JSON.parse(fs.readFileSync('simba_products.json', 'utf8'));
  const products: Product[] = data.products;
  const enriched: any[] = [];
  
  const report: any = {
    runAt: new Date().toISOString(),
    summary: {
      total: products.length,
      enriched: 0,
      sources: {}
    },
    lowConfidence: []
  };
  
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] ${product.name}`);
    
    try {
      const imageResult = await searchForImage(product);
      
      enriched.push({
        ...product,
        image: imageResult.url,
        _imageSource: imageResult.source,
        _imageScore: imageResult.score,
        _originalImage: product.image
      });
      
      report.summary.enriched++;
      report.summary.sources[imageResult.source] = (report.summary.sources[imageResult.source] || 0) + 1;
      
      if (imageResult.score < 0.6) {
        report.lowConfidence.push({
          id: product.id,
          name: product.name,
          score: imageResult.score,
          source: imageResult.source
        });
      }
      
    } catch (error) {
      console.log(`  ❌ Error: ${error}`);
      enriched.push({
        ...product,
        _imageSource: 'error',
        _imageScore: 0
      });
    }
    
    // Progress update every 50 products
    if ((i + 1) % 50 === 0) {
      console.log(`\n📊 Progress: ${i + 1}/${products.length} (${Math.round((i + 1) / products.length * 100)}%)`);
    }
    
    await sleep(300);
  }
  
  // Save results
  fs.writeFileSync('simba_products_enriched.json', JSON.stringify({
    store: data.store,
    products: enriched
  }, null, 2));
  
  fs.writeFileSync('image-enrichment-report.json', JSON.stringify(report, null, 2));
  
  console.log('\n\n🎉 Enrichment Complete!\n');
  console.log('📊 Summary:');
  console.log(`   Total products: ${report.summary.total}`);
  console.log(`   Successfully enriched: ${report.summary.enriched}`);
  console.log('\n📁 Files created:');
  console.log('   ✅ simba_products_enriched.json');
  console.log('   ✅ image-enrichment-report.json');
  console.log('\n🔍 Sources used:');
  Object.entries(report.summary.sources).forEach(([source, count]) => {
    console.log(`   ${source}: ${count}`);
  });
}

enrichProducts().catch(console.error);
