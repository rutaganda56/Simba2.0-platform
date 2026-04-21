'use client';

import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/store';
import { Link } from '@/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function CartSummary() {
  const t = useTranslations();
  const { getTotal, items } = useCart();

  const subtotal = getTotal();
  const shipping = subtotal > 50000 ? 0 : 5000;
  const total = subtotal + shipping;

  return (
    <Card className="sticky top-24 h-fit">
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('cart.title')}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-400">
            <span>{items.length} {items.length === 1 ? t('cart.item') : t('cart.items')}</span>
            <span>{subtotal.toLocaleString()} {t('common.rwf')}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>{t('cart.shipping')}</span>
            <span>
              {shipping === 0 ? (
                <span className="text-green-600 dark:text-green-400">{t('home.freeDelivery')}</span>
              ) : (
                `${shipping.toLocaleString()} ${t('common.rwf')}`
              )}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
          <div className="flex justify-between mb-6">
            <span className="font-semibold text-gray-900 dark:text-white text-lg">
              {t('cart.total')}
            </span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {total.toLocaleString()} {t('common.rwf')}
            </span>
          </div>

          <Link href="/checkout" className="block mb-3">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              {t('cart.checkout')}
            </Button>
          </Link>

          <Link href="/products" className="block">
            <Button variant="outline" className="w-full">
              {t('cart.continueShop')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
