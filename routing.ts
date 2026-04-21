import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr', 'rw'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/products': {
      en: '/products',
      fr: '/produits',
      rw: '/ibicurambire',
    },
    '/cart': {
      en: '/cart',
      fr: '/panier',
      rw: '/karamu',
    },
    '/checkout': {
      en: '/checkout',
      fr: '/paiement',
      rw: '/kurekura',
    },
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
