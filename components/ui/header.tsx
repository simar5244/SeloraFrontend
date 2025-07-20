"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Logo from "./logo";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run this effect on the client side and when pathname or searchParams change
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [pathname, searchParams]);

  return (
    <header className="sticky top-5 z-30 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/20 backdrop-blur-xl bg-opacity-90 px-6 shadow-2xl shadow-black/50 border border-white/10">
          {/* Site branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Logo className="mr-2" />
              <span className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-violet-200 via-violet-400 via-violet-100 via-violet-500 to-violet-200 bg-[length:200%_auto] bg-clip-text font-nacelle text-xl font-semibold text-transparent">
                Selora
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform md:flex md:items-center md:space-x-8">
            <a 
              href="/#features"
              className="text-gray-300 hover:text-white transition-colors hover:bg-white/10 px-3 py-1.5 rounded-lg"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const element = document.getElementById('features');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Features
            </a>
            <a 
              href="/#pricing"
              className="text-gray-300 hover:text-white transition-colors hover:bg-white/10 px-3 py-1.5 rounded-lg"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const element = document.getElementById('pricing');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Pricing
            </a>
            <a 
              href="/faq"
              className="text-gray-300 hover:text-white transition-colors hover:bg-white/10 px-3 py-1.5 rounded-lg"
            >
              FAQ
            </a>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-3">
            <a
              href="https://app.seloraa.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white transition-all border border-white/10 hover:border-white/20"
            >
              Login
            </a>
            <div className="relative group">
              <a
                href="https://app.seloraa.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/20 transition-all"
              >
                Sign Up
              </a>
              <div className="absolute right-0 mt-2 w-48 bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/50 py-1.5 hidden group-hover:block z-50 border border-white/10">
                <a
                  href="https://app.seloraa.com/signup"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5 rounded-lg mx-1.5 transition-colors"
                >
                  Personal Account
                </a>
                <a
                  href="https://app.seloraa.com/company-signup"
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/5 rounded-lg mx-1.5 transition-colors"
                >
                  Company Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
