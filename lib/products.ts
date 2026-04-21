import data from '@/data/products.json';
const products = data.products;

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
  inStock: boolean;
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercase = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercase) ||
      p.description.toLowerCase().includes(lowercase) ||
      p.category.toLowerCase().includes(lowercase)
  );
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];

  return products
    .filter((p) => p.category === product.category && p.id !== productId)
    .slice(0, limit);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories);
};

export const getFeaturedProducts = (limit = 8): Product[] => {
  return products
    .filter((p) => p.badge === 'Fresh')
    .slice(0, limit);
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    bakery: 'Bakery',
    dairy: 'Dairy',
    vegetables: 'Vegetables',
    fruits: 'Fruits',
    meat: 'Meat & Seafood',
    grains: 'Grains & Cereals',
    oils: 'Oils & Condiments',
    beverages: 'Beverages',
    snacks: 'Snacks',
    frozen: 'Frozen Foods',
  };
  return labels[category] || category;
};
