'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getFeaturedProducts } from '@/lib/products';

export default function ProductShowcase() {
  const t = useTranslations();
  const products = getFeaturedProducts(5);

  return (
    <section className="relative bg-gradient-to-br from-purple-300 via-purple-200 to-purple-300 dark:from-purple-400 dark:via-purple-300 dark:to-purple-400 overflow-hidden py-20">
      {/* Decorative wave shapes */}
      <div className="absolute top-0 left-0 right-0 h-20">
        <svg viewBox="0 0 1440 120" className="w-full h-full">
          <path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-teal-900 dark:text-teal-800 mb-4"
          >
            Spark Fresh Energy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-teal-800 dark:text-teal-700"
          >
            Zero sugar. Pure boost. Natural focus.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-5xl font-bold text-teal-800 mb-2">90%</div>
              <p className="text-teal-700 font-medium">Customers love our products</p>
            </div>
            
            <Link href="/products">
              <Button 
                size="lg" 
                className="bg-teal-800 text-white hover:bg-teal-900 font-bold px-8 py-6 rounded-full shadow-xl"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Right - Product Display with Real Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-[400px] flex items-center justify-center"
          >
            {/* Product arrangement - center, left, right */}
            <div className="relative w-full h-full flex items-center justify-center">
              {products.slice(0, 5).map((product, index) => {
                const positions = [
                  { left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 30, scale: 1.2 },
                  { left: '15%', top: '45%', transform: 'translate(-50%, -50%)', zIndex: 20, scale: 1 },
                  { left: '85%', top: '45%', transform: 'translate(-50%, -50%)', zIndex: 20, scale: 1 },
                  { left: '30%', top: '65%', transform: 'translate(-50%, -50%)', zIndex: 10, scale: 0.9 },
                  { left: '70%', top: '65%', transform: 'translate(-50%, -50%)', zIndex: 10, scale: 0.9 },
                ];
                
                const position = positions[index] || positions[0];
                const delay = index * 0.5;
                
                return (
                  <motion.div
                    key={product.id}
                    animate={{ 
                      y: [0, index % 2 === 0 ? -15 : 15, 0],
                    }}
                    transition={{ 
                      duration: 3 + index * 0.3, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: delay
                    }}
                    className="absolute w-24 h-32 md:w-32 md:h-40"
                    style={{
                      left: position.left,
                      top: position.top,
                      transform: position.transform,
                      zIndex: position.zIndex,
                    }}
                  >
                    <div className="relative w-full h-full" style={{ transform: `scale(${position.scale})` }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 w-12 h-12 opacity-50"
            >
              <Image src="/placeholder.jpg" alt="Kiwi" fill className="object-contain" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 left-10 text-3xl"
            >
              ✨
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-20">
        <svg viewBox="0 0 1440 120" className="w-full h-full">
          <path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
