'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/routing';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, MapPin } from 'lucide-react';

export default function SuccessPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || 'ORD-' + Date.now();

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            variants={itemVariants}
            animate={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-24 h-24">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full"
              />
              <CheckCircle className="w-24 h-24 text-green-600 dark:text-green-400 absolute inset-0" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t('checkout.thankYou')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('checkout.orderConfirmed')}
            </p>
          </motion.div>

          {/* Order Number */}
          <motion.div variants={itemVariants} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {t('checkout.orderNumber')}
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 font-mono">
              {orderId}
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div className="text-left flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">Order Confirmed</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Your order has been placed</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <Truck className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <div className="text-left flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">In Transit</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('checkout.estimatedDelivery')}: {estimatedDate.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
              <div className="text-left flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">Delivered</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You will receive tracking updates via email
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4 flex-col sm:flex-row">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {t('checkout.continueHome')}
              </Button>
            </Link>
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full">
                {t('header.products')}
              </Button>
            </Link>
          </motion.div>

          {/* Help Text */}
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 text-sm">
            Questions? Contact us at info@simba.rw or call +250 123 456 789
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
