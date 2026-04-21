'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { getProductById, getRelatedProducts } from '@/lib/products';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/routing';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = React.use(params);
  const t = useTranslations();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = getProductById(resolvedParams.id);
  const relatedProducts = product ? getRelatedProducts(resolvedParams.id, 4) : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product not found
          </h1>
          <Link href="/products">
            <Button>{t('products.allProducts')}</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <Link href="/products" className="text-green-600 dark:text-green-400 hover:underline">
            ← {t('products.allProducts')}
          </Link>
        </motion.div>

        {/* Product Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-96 md:h-full bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-semibold">
                  {product.badge}
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t(`categories.${product.category}`)}
              </p>
            </div>

            <div className="border-y border-gray-200 dark:border-slate-700 py-6">
              <p className="text-5xl font-bold text-green-600 dark:text-green-400">
                {product.price.toLocaleString()} {t('common.rwf')}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                {t('products.description')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {t('cart.quantity')}
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    −
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                size="lg"
                className={`w-full ${
                  addedToCart
                    ? 'bg-green-600 hover:bg-green-600'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {addedToCart ? '✓ Added to Cart' : t('products.addToCart')}
              </Button>
            </div>

            {!product.inStock && (
              <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                Out of Stock
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {t('products.relatedProducts')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
