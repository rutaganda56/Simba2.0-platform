'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/routing';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-teal-800 dark:bg-teal-950 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg text-gray-900">
                S
              </div>
              <span className="font-bold text-xl">Simba</span>
            </div>
            <p className="text-teal-100 text-sm mb-4">
              Your trusted supermarket for quality products. Fast delivery in 30 minutes.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-teal-700 hover:bg-yellow-400 hover:text-gray-900 rounded-lg flex items-center justify-center transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-teal-700 hover:bg-yellow-400 hover:text-gray-900 rounded-lg flex items-center justify-center transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-teal-700 hover:bg-yellow-400 hover:text-gray-900 rounded-lg flex items-center justify-center transition">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.about')}</h3>
            <ul className="space-y-2 text-teal-100 text-sm">
              <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
              <li><Link href="/products" className="hover:text-yellow-400 transition">Products</Link></li>
              <li><Link href="/cart" className="hover:text-yellow-400 transition">Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-teal-100 text-sm">
              <li><Link href="/products?category=fruits" className="hover:text-yellow-400 transition">{t('categories.fruits')}</Link></li>
              <li><Link href="/products?category=vegetables" className="hover:text-yellow-400 transition">{t('categories.vegetables')}</Link></li>
              <li><Link href="/products?category=dairy" className="hover:text-yellow-400 transition">{t('categories.dairy')}</Link></li>
              <li><Link href="/products?category=meat" className="hover:text-yellow-400 transition">{t('categories.meat')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-teal-100 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                info@simba.rw
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                +250 123 456 789
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 mt-0.5" />
                <span>Kigali, Rwanda</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center text-teal-100 text-sm">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-6 text-sm text-teal-100">
            <a href="#" className="hover:text-yellow-400 transition">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-yellow-400 transition">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
