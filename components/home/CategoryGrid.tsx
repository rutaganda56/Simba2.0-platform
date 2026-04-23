'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CATEGORIES = [
  { slug: 'vegetables', image: 'https://images.unsplash.com/photo-1540333677239-ef00f3c61b86?w=200&h=200&fit=crop', color: 'from-emerald-50 to-emerald-100', textColor: 'text-emerald-700' },
  { slug: 'fruits', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&h=200&fit=crop', color: 'from-orange-50 to-orange-100', textColor: 'text-orange-700' },
  { slug: 'dairy', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop', color: 'from-sky-50 to-sky-100', textColor: 'text-sky-700' },
  { slug: 'meat', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&h=200&fit=crop', color: 'from-rose-50 to-rose-100', textColor: 'text-rose-700' },
  { slug: 'bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop', color: 'from-amber-50 to-amber-100', textColor: 'text-amber-700' },
  { slug: 'beverages', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop', color: 'from-cyan-50 to-cyan-100', textColor: 'text-cyan-700' },
  { slug: 'snacks', image: 'https://images.unsplash.com/photo-1621447509323-570aaba038b1?w=200&h=200&fit=crop', color: 'from-violet-50 to-violet-100', textColor: 'text-violet-700' },
  { slug: 'frozen', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=200&h=200&fit=crop', color: 'from-indigo-50 to-indigo-100', textColor: 'text-indigo-700' },
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
                <div className="flex flex-col items-center group cursor-pointer">
                  {/* Image Container with radial gradient (Getir style) */}
                  <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-[2rem] bg-indigo-50/50 dark:bg-slate-800 flex items-center justify-center p-4 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-2xl group-hover:shadow-indigo-100 dark:group-hover:shadow-none transition-all duration-500 border border-transparent group-hover:border-indigo-100 dark:group-hover:border-slate-600`}>
                    <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${category.color} opacity-40 group-hover:opacity-60 transition-opacity`} />
                    <div className="relative w-full h-full">
                      <Image 
                        src={category.image} 
                        alt={category.slug}
                        fill
                        className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 80px, 100px"
                      />
                    </div>
                  </div>
                  <span className="mt-3 text-[13px] md:text-sm font-bold text-center leading-tight text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
