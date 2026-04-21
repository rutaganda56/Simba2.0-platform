'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  { question: 'What Makes Supplements Different?', answer: 'Our supplements are made with premium, natural ingredients sourced from trusted suppliers.' },
  { question: 'Do You Ship Internationally?', answer: 'Yes, we ship to most countries worldwide with fast and reliable delivery.' },
  { question: 'Are Your Products Vegan And Gluten-Free?', answer: 'Most of our products are vegan and gluten-free. Check individual product labels for details.' },
  { question: 'Can I Track My Order?', answer: 'Yes, you will receive a tracking number once your order ships.' },
  { question: 'How Much Does Shipping Cost?', answer: 'Free shipping on orders over 50,000 RWF. Standard shipping rates apply otherwise.' },
  { question: 'What Are Your Return Policies?', answer: 'We offer a 30-day money-back guarantee on all products.' },
];

export default function FAQ() {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-400 mb-2">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-left group"
              >
                <span className="font-medium text-gray-900 dark:text-white text-sm pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Plus className={`w-4 h-4 text-gray-900 transition-transform ${openIndex === index ? 'rotate-45' : ''}`} />
                </div>
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
