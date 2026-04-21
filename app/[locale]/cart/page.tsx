'use client';

import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/store';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Link } from '@/routing';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function CartPage() {
  const t = useTranslations();
  const { items, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t('cart.title')}
          </h1>
        </motion.div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearCart}
                className="mt-6 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
              >
                Clear Cart
              </motion.button>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CartSummary />
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('cart.empty')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('cart.continueShop')}
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                {t('cart.continueShop')}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
