import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/recordings',
  '/personal-room',
  '/meeting(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    // Correct way to protect routes in newer Clerk versions
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)',
    // Include API routes
    '/(api|trpc)(.*)'
  ]
};