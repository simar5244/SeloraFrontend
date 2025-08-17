'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import TestMotion from './test-motion';

// Custom hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typically the breakpoint for md in Tailwind
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Dynamically import the DashboardPreview component with no SSR
const DashboardPreview = dynamic<{}>(
  () => import('./dashboard-preview') as any,
  {
    ssr: false,
    loading: () => (
      <div className="h-96 w-full bg-gray-900/30 rounded-2xl animate-pulse"></div>
    ),
  }
);

// Create a wrapper component to handle the animation
const AnimatedDashboard = () => {
  const isMobile = useIsMobile();

  // TEMPORARILY DISABLE DASHBOARD PREVIEW ON MOBILE TO DEBUG CLIENT ERROR
  if (isMobile) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <DashboardPreview />
    </motion.div>
  );
};

export default function HeroHome() {
  return (
    <section className="relative overflow-hidden">
      {/* Background elements will be visible through the transparent dashboard */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
      </div>
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-16 md:pt-40 md:pb-24">
          {/* Section header */}
          <motion.div 
            className="pb-12 text-center md:pb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-violet-200 via-violet-400 via-violet-100 via-violet-500 to-violet-200 bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              You can't scale what you can't see
            </motion.h1>
            <div className="mx-auto max-w-3xl">
              <motion.p
                className="mb-8 text-xl text-violet-200/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Run what-if simulations, predict attrition, balance workloads, and retain top talent. 
                Selora lets you design a healthier, smarter organization before making a single move.
              </motion.p>
              <motion.div 
                className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center sm:gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link
                  className="btn group mb-3 w-full bg-gradient-to-t from-violet-600 to-violet-500 bg-[length:100%_100%] text-white shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                  href="https://app.seloraa.com/company-signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="relative inline-flex items-center">
                    Get Started
                    <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                </Link>
                <Link
                  className="btn group w-full sm:w-auto bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"
                  href="/demo"
                >
                  <span className="relative inline-flex items-center">
                    Schedule a demo
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="relative z-10 -mx-4 sm:mx-0 mt-8"
          >
            <AnimatedDashboard />
          </motion.div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </section>
  );
}
