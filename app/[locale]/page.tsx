'use client';

import { useTranslations } from 'next-intl';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import FAQ from '@/components/home/FAQ';
import ProductShowcase from '@/components/home/ProductShowcase';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Truck, Shield, Clock, Headphones } from 'lucide-react';

export default function Home() {
  const t = useTranslations();

  const features = [
    { icon: Truck, title: 'Free Delivery', desc: 'On orders over 50,000 RWF' },
    { icon: Clock, title: '30 Min Delivery', desc: 'Fast delivery to your door' },
    { icon: Shield, title: 'Secure Payment', desc: 'Safe & secure checkout' },
    { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <HeroBanner />
      
      {/* Features Bar */}
      <section className="bg-white dark:bg-slate-800 border-y border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{feature.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CategoryGrid />
      
      <FAQ />
      
      <ProductShowcase />
      
      <FeaturedProducts />

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-teal-700 dark:bg-teal-800 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t('home.newsletter')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg mb-8 text-white/90"
          >
            Get exclusive deals and updates delivered to your inbox
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder={t('home.enterEmail')}
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg"
            />
            <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold px-8 py-4 rounded-xl shadow-lg">
              Subscribe
            </Button>
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
}
