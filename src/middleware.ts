import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// const isProtectedRoute = createRouteMatcher([
//     '/dashboard(.*)',
//     '/api/payment',
//     '/payment(.*)',
// ]);

// export default clerkMiddleware(async (auth, req) => {
//     if(isProtectedRoute(req)) {
//         const { userId } = await auth();

//         if (!userId) {
//         // Not authenticated → redirect to sign-in page
//             return NextResponse.redirect(new URL('/auth/sign-in', req.url));
//         }
//     }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };


const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
];

const allowedMethods = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "OPTIONS",
];

const allowedHeaders = [
  "Content-Type",
  "Authorization",
];

const corsOptions = {
  'Access-Control-Allow-Methods': allowedMethods.join(','),
  'Access-Control-Allow-Headers': allowedHeaders.join(','),
};

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/payment',
  '/payment(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const origin = req.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };

    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle protected routes
  if(isProtectedRoute(req)) {
      const { userId } = await auth();

      if (!userId) {
      // Not authenticated → redirect to sign-in page
          return NextResponse.redirect(new URL('/auth/sign-in', req.url));
      }
  }

  // Handle simple requests
  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
