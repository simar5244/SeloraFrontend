'use client';

import { Suspense } from 'react';
import Header from './header';

export default function HeaderWrapper() {
  return (
    <Suspense fallback={
      <div className="sticky top-5 z-30 w-full">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="h-14 rounded-2xl bg-gray-900/20 backdrop-blur-xl bg-opacity-90 px-6 shadow-2xl shadow-black/50 border border-white/10 animate-pulse"></div>
        </div>
      </div>
    }>
      <Header />
    </Suspense>
  );
}
