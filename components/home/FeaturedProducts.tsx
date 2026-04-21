'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedProducts } from '@/lib/products';
import { useCart } from '@/lib/store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
  const t = useTranslations();
  const { addItem, items, updateQuantity, removeItem } = useCart();
  const products = getFeaturedProducts(8);

  const getQuantity = (productId: string) => {
    const item = items.find(i => i.id === productId);
    return item?.quantity || 0;
  };

  const handleAdd = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleIncrement = (productId: string) => {
    const quantity = getQuantity(productId);
    updateQuantity(productId, quantity + 1);
  };

  const handleDecrement = (productId: string) => {
    const quantity = getQuantity(productId);
    if (quantity === 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, quantity - 1);
    }
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {t('home.featured')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Fresh picks for you</p>
          </div>
          <Link href="/products">
            <Button variant="ghost" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {products.map((product, index) => {
            const quantity = getQuantity(product.id);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="h-full">
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-green-300 dark:hover:border-green-600 transition-all h-full flex flex-col overflow-hidden relative">
                      
                      {/* Top Right Add Button overlay (Getir style) if count is 0 */}
                      {quantity === 0 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAdd(product);
                          }}
                          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white dark:bg-slate-700 rounded-lg shadow border border-gray-100 dark:border-slate-600 flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      )}

                      {/* Top Right Stepper (Getir style overlay) if count > 0 */}
                      {quantity > 0 && (
                        <div className="absolute top-2 right-2 z-10 flex flex-col items-center bg-white dark:bg-slate-700 rounded-lg shadow border border-gray-100 dark:border-slate-600 overflow-hidden">
                          <button
                            onClick={(e) => { e.preventDefault(); handleIncrement(product.id); }}
                            className="w-8 h-7 flex items-center justify-center text-green-600 hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <div className="w-8 h-7 flex items-center justify-center bg-green-600 text-white font-bold text-sm">
                            {quantity}
                          </div>
                          <button
                            onClick={(e) => { e.preventDefault(); handleDecrement(product.id); }}
                            className="w-8 h-7 flex items-center justify-center text-green-600 hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      <Link href={`/products/${product.id}`} className="flex-1 flex flex-col p-3 pt-4">
                        <div className="relative h-28 md:h-36 w-full flex items-center justify-center mb-3">
                          <div className="relative w-full h-full">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          {product.badge && (
                            <div className="absolute top-0 left-0 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                              {product.badge}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col flex-1">
                          <span className="text-sm md:text-base font-bold text-green-600 dark:text-green-400 mb-1 leading-tight">
                            {product.price.toLocaleString()} {t('common.rwf')}
                          </span>
                          <h3 className="font-medium text-[13px] md:text-sm text-gray-800 dark:text-gray-200 leading-tight line-clamp-2">
                            {product.name}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
