'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HeroBanner() {
  const t = useTranslations();

  return (
    <section className="relative bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 dark:from-teal-800 dark:via-teal-700 dark:to-teal-900 overflow-hidden min-h-[500px]">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
        <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-32 w-40 h-40 bg-pink-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6 z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                Rwanda&apos;s Favourite Supermarket, Now Online
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Order for pick-up at any of our 8 Kigali branches. Ready in 30 minutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-extrabold text-lg px-10 py-7 rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image - Product Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative h-[400px] md:h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-yellow-100 to-pink-200 rounded-3xl transform rotate-3" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden bg-gradient-to-br from-pink-100 to-yellow-50 flex items-center justify-center p-8">
              {/* Product Display - Using placeholder that will be replaced with actual images */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-48 h-64"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
                    alt="Fresh Organic Food"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </div>
              
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 right-10 w-16 h-16 opacity-80"
              >
                <Image src="https://images.unsplash.com/photo-1585059895181-42e126225de0?w=100&h=100&fit=crop" alt="Kiwi" fill className="object-contain drop-shadow-lg" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 w-16 h-16 opacity-80"
              >
                <Image src="https://images.unsplash.com/photo-1590502593747-42a996131d82?w=100&h=100&fit=crop" alt="Lemon" fill className="object-contain drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
