'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { slug: 'fruits', icon: '🍎', color: 'from-red-400 to-red-500' },
  { slug: 'vegetables', icon: '🥬', color: 'from-green-400 to-green-500' },
  { slug: 'dairy', icon: '🥛', color: 'from-blue-400 to-blue-500' },
  { slug: 'meat', icon: '🍗', color: 'from-orange-400 to-orange-500' },
  { slug: 'bakery', icon: '🍞', color: 'from-yellow-400 to-yellow-500' },
  { slug: 'beverages', icon: '☕', color: 'from-amber-400 to-amber-500' },
  { slug: 'snacks', icon: '🍿', color: 'from-pink-400 to-pink-500' },
  { slug: 'frozen', icon: '🧊', color: 'from-cyan-400 to-cyan-500' },
];

export default function CategoryGrid() {
  const t = useTranslations();

  return (
    <section className="py-8 md:py-12 bg-[#fafbfb] dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4 md:mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {t('home.categories')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              viewport={{ once: true }}
            >
              <Link href={`/products?category=${category.slug}`} className="block h-full group">
                <div className="flex flex-col items-center bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-green-200 transition-all cursor-pointer h-full justify-between">
                  {/* Icon Container with radial gradient */}
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl md:text-3xl shadow-sm mb-2 group-hover:scale-105 transition-transform`}>
                    {category.icon}
                  </div>
                  <span className="text-[11px] md:text-xs font-semibold text-gray-600 dark:text-gray-300 text-center leading-tight">
                    {t(`categories.${category.slug}`)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
