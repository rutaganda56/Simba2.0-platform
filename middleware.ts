import createMiddleware from 'next-intl/middleware';
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { routing } from './routing';

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  return intlMiddleware(req);
});

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
