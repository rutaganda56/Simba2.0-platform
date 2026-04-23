'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/actions/products';
import { Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations();
  const { addItem, items, updateQuantity, removeItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (cartItem) {
      if (quantity === 1) {
        removeItem(product.id);
      } else {
        updateQuantity(product.id, quantity - 1);
      }
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group"
      >
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500 dark:hover:border-green-600 h-full flex flex-col bg-white dark:bg-slate-800">
          <div className="relative h-40 md:h-48 bg-gray-100 dark:bg-slate-700 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {product.badge && (
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
                {product.badge}
              </div>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-sm">Out of Stock</span>
              </div>
            )}
          </div>

          <CardContent className="p-3 md:p-4 flex-1 flex flex-col bg-white dark:bg-slate-800">
            <h3 className="font-medium text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-1 line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-green-600 transition-colors">
              {product.name}
            </h3>
            
            <div className="mt-auto pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg md:text-xl font-bold text-green-600 dark:text-green-400">
                  {product.price.toLocaleString()} {t('common.rwf')}
                </span>
              </div>

              {/* Interaction Row */}
              {quantity === 0 ? (
                <motion.button
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 rounded-xl font-bold transition-all text-xs md:text-sm flex items-center justify-center gap-2 border-2 ${
                    !product.inStock
                      ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
                      : 'bg-white text-green-600 border-green-500 hover:bg-green-500 hover:text-white shadow-sm'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  {t('products.addToCart')}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-between bg-green-600 rounded-xl p-0.5 shadow-lg shadow-green-200 dark:shadow-none"
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrement}
                    className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-lg flex items-center justify-center text-green-600 hover:bg-gray-50 transition shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="text-white font-black text-sm md:text-base px-2 tabular-nums">
                    {quantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrement}
                    className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-lg flex items-center justify-center text-green-600 hover:bg-gray-50 transition shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
