import productsData from '@/data/products.json';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  badge?: string;
  inStock: boolean;
  unit: string;
  subcategoryId?: number;
}

const products: Product[] = productsData.products || productsData;

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const q = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) ||
    (p.description && p.description.toLowerCase().includes(q))
  );
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return products.find(p => p.id.toString() === id) || null;
};

export const getRelatedProducts = async (productId: string, limit = 4): Promise<Product[]> => {
  const product = await getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.category === product.category && p.id.toString() !== productId)
    .slice(0, limit);
};

export const getAllCategories = async (): Promise<string[]> => {
  const categories = [...new Set(products.map(p => p.category))];
  return categories.sort();
};

export const getFeaturedProducts = async (limit = 8): Promise<Product[]> => {
  return products.filter(p => p.badge === 'Fresh').slice(0, limit);
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    'Alcoholic Drinks': 'Alcoholic Drinks',
    'Cosmetics & Personal Care': 'Personal Care',
    'General': 'General',
    'Food Products': 'Food Products',
    'Kitchenware & Electronics': 'Kitchenware',
    'Cleaning & Sanitary': 'Cleaning',
    'Baby Products': 'Baby Products',
    'Pet Care': 'Pet Care',
    'Kitchen Storage': 'Storage',
    'Sports & Wellness': 'Sports',
  };
  return labels[category] || category;
};
