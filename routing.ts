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
    '/login': {
      en: '/login',
      fr: '/connexion',
      rw: '/kwinjira',
    },
    '/register': {
      en: '/register',
      fr: '/inscription',
      rw: '/kwiyandikisha',
    },
    '/history': {
      en: '/history',
      fr: '/historique',
      rw: '/amateka',
    },
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
