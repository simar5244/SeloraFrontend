'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageIllustration from '@/components/page-illustration';
import { useEffect } from 'react';

export default function NotFound() {
  // Hide scrollbar but keep functionality
  useEffect(() => {
    document.documentElement.style.overflowX = 'hidden';
    return () => {
      document.documentElement.style.overflowX = '';
    };
  }, []);

  // Animation delays
  const animationDelay = {
    container: 0.1,
    item: 0.2
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-transparent">
      <style jsx global>{`
        html {
          overflow-x: hidden;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        html {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      <PageIllustration />
      <main className="flex-grow relative bg-transparent">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-screen w-full flex items-center justify-center">
          <motion.div
            className="max-w-3xl mx-auto text-center relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-40 h-40 mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: animationDelay.item * 1 }}
            >
              <motion.div
                className="absolute inset-0 bg-violet-600/20 rounded-full blur-3xl opacity-70"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="relative flex items-center justify-center w-full h-full">
                <motion.span
                  className="text-8xl font-bold text-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                >
                  404
                </motion.span>
              </div>
            </motion.div>

            <motion.h1
              className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-violet-200 via-violet-400 via-violet-100 via-violet-500 to-violet-200 bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl md:text-5xl lg:text-6xl font-semibold text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: animationDelay.item * 2 }}
            >
              Page Not Found
            </motion.h1>

            <motion.p
              className="text-xl text-violet-200/80 mb-8 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: animationDelay.item * 3 }}
            >
              Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </motion.p>

            <motion.div
              className="relative group inline-block mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: animationDelay.item * 4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/"
                className="relative px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-all duration-200 ease-out flex items-center space-x-2"
              >
                <span>Return Home</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 text-sm text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <p>
                Need help?{' '}
                <a
                  href="mailto:helloselora@gmail.com"
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  Contact support
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
