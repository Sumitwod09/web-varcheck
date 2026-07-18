import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent, NextMiddleware } from 'next/server';

const isClerkConfigured =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('placeholder') &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_ZHVtbXkuY2xlcmsuYWNjb3VudHMuZGV2JA==';

let cachedClerkMiddleware: NextMiddleware | null = null;

function getClerkMiddleware(): NextMiddleware {
  if (!cachedClerkMiddleware) {
    cachedClerkMiddleware = clerkMiddleware();
  }
  return cachedClerkMiddleware;
}

// Next.js 16 requires a single proxy export (either as default or named `proxy`).
// Exporting both named `proxy` and default exports from the same file can cause
// static analysis to fail with "multiple proxy from the same file are not supported".
export function proxy(request: NextRequest, event: NextFetchEvent) {
  if (isClerkConfigured) {
    return getClerkMiddleware()(request, event);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
};
