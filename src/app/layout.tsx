import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { InterceptProvider } from '@/hooks/useIntercept';
import InterceptOverlay from '@/components/InterceptOverlay';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'VARCHECK - Ad-Hoc Verification for Luxury Real Estate',
  description:
    'Secure, mobile-first compliance verification for luxury real estate agents handling transactions with unrepresented parties. Generate intake links, capture documents via isolated vault, deliver standardized PDF packages.',
  keywords: [
    'real estate verification',
    'compliance automation',
    'luxury real estate',
    'document vault',
    'unrepresented buyer',
  ],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'VARCHECK - Verification Engine',
    description:
      'Ad-hoc compliance verification for luxury real estate transactions.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isClerkConfigured =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('placeholder') &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_ZHVtbXkuY2xlcmsuYWNjb3VudHMuZGV2JA==';

  const content = (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <InterceptProvider>
          {children}
          <InterceptOverlay />
        </InterceptProvider>
      </body>
    </html>
  );

  if (isClerkConfigured) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
