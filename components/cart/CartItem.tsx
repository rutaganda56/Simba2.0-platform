'use client';

import { useTranslations } from 'next-intl';
import { CartItem as CartItemType, useCart } from '@/lib/store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const t = useTranslations();
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 pb-4 border-b border-gray-200 dark:border-slate-700"
    >
      {/* Image */}
      <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-slate-700">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          {item.name}
        </h3>
        <p className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">
          {item.price.toLocaleString()} {t('common.rwf')}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="px-2 py-1 border border-gray-300 dark:border-slate-600 rounded hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            −
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 border border-gray-300 dark:border-slate-600 rounded hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            +
          </button>

          {/* Remove Button */}
          <button
            onClick={() => removeItem(item.id)}
            className="ml-auto text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="text-right">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total</p>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {(item.price * item.quantity).toLocaleString()} {t('common.rwf')}
        </p>
      </div>
    </motion.div>
  );
}
