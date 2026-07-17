'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

const WireframeScene = dynamic(() => import('./WireframeScene'), {
  ssr: false,
});

interface WireframeLoaderProps {
  className?: string;
}

export default function WireframeLoader({ className }: WireframeLoaderProps) {
  return (
    <Suspense fallback={null}>
      <WireframeScene className={className} />
    </Suspense>
  );
}
