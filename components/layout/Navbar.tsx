'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useCart } from '@/lib/store';
import { Link } from '@/routing';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon, ShoppingCart, Search } from 'lucide-react';
import { useRouter } from '@/routing';

export default function Navbar() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 shadow-md">
      {/* Main Header */}
      <div className="border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-teal-700 dark:text-teal-500 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                S
              </div>
              <span className="hidden sm:inline">Simba</span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t('header.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 transition"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-teal-600 hover:bg-teal-700 rounded-r-xl transition"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="lg" className="flex items-center gap-2 h-auto py-2 px-3">
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {itemCount > 99 ? '99+' : itemCount}
                      </span>
                    )}
                  </div>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 ml-auto"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="hidden md:block bg-teal-700 dark:bg-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 h-10 text-sm">
            <Link href="/products" className="hover:text-yellow-400 transition font-medium">
              {t('header.products')}
            </Link>
            <Link href="/products?category=fruits" className="hover:text-yellow-400 transition">
              {t('categories.fruits')}
            </Link>
            <Link href="/products?category=vegetables" className="hover:text-yellow-400 transition">
              {t('categories.vegetables')}
            </Link>
            <Link href="/products?category=dairy" className="hover:text-yellow-400 transition">
              {t('categories.dairy')}
            </Link>
            <Link href="/products?category=meat" className="hover:text-yellow-400 transition">
              {t('categories.meat')}
            </Link>
            <Link href="/products?category=bakery" className="hover:text-yellow-400 transition">
              {t('categories.bakery')}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('header.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-teal-600 hover:bg-teal-700 rounded-r-xl"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>
            
            <div className="space-y-2">
              <Link href="/products" className="block py-2 text-lg font-medium hover:text-teal-600">
                {t('header.products')}
              </Link>
              <Link href="/cart" className="flex items-center gap-2 py-2 text-lg font-medium hover:text-teal-600">
                <ShoppingCart className="w-5 h-5" />
                {t('header.cart')} ({itemCount})
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
