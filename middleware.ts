import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with /_next, /api, /_static, /_vercel
    // - … the ones containing a dot (e.g. favicon.ico)
    '/((?!api|_next|_static|_vercel|.*\\..*).*)',
    // However, match all pathnames within the locale prefix
    '/(en|fr|rw)/:path*',
  ],
};
