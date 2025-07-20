'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform, Variants } from 'framer-motion';
import { FaUsers, FaProjectDiagram, FaBullseye, FaDollarSign, FaChartLine, FaLightbulb } from 'react-icons/fa';

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

// Types
type InsightItem = {
  name?: string;
  score?: string;
  label?: string;
  value?: string;
  width?: string;
  color?: string;
};

// A component for items that animate on scroll
const AnimatedItem = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  
  // Disable animations on mobile
  if (isMobile) {
    return <div className="h-full">{children}</div>;
  }

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end 0.8'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};


const DashboardPreview: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' }); // Changed from -200px to 0px
  const controls = useAnimation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView) {
      // Skip animation on mobile by immediately setting to 'visible' state
      if (isMobile) {
        controls.set('visible');
      } else {
        controls.start('visible');
      }
    }
  }, [isInView, controls, isMobile]);

  // Initialize animation to visible state immediately to prevent blank screen
  useEffect(() => {
    if (!isMobile) {
      // Start animation immediately when component mounts, don't wait for scroll
      controls.start('visible');
    }
  }, [controls, isMobile]);
  
  // Simplified variants for mobile
  const containerVariants: Variants = isMobile ? {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  } : {
    hidden: { opacity: 0.3 }, // Changed from 0 to 0.3 to prevent complete blank screen
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05, // Reduced stagger for faster appearance
        delayChildren: 0.05,   // Reduced delay for faster appearance
      },
    },
  };

  const itemVariants: Variants = isMobile ? {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 }
  } : {
    hidden: { opacity: 0.5, y: 10 }, // Less dramatic initial state
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Faster animation
        ease: [0.16, 1, 0.3, 1] // Quintic ease-out
      }
    },
  };

  const stats = [
    { icon: <FaUsers className="w-5 h-5" />, label: 'Total Employees', value: '247', change: '+12 this month' },
    { icon: <FaProjectDiagram className="w-5 h-5" />, label: 'Active Projects', value: '18', change: '3 launching soon' },
    { icon: <FaBullseye className="w-5 h-5" />, label: 'Avg Utilization', value: '87%', change: '+5% from last month' },
    { icon: <FaDollarSign className="w-5 h-5" />, label: 'Cost Savings', value: '$2.4M', change: 'YTD optimization' },
  ];

  const insights = [
    {
      icon: <FaChartLine className="w-4 h-4" />,
      title: 'High Performers',
      type: 'performers' as const,
      items: [
        { name: 'Anthony Kasey (Engineering)', score: '4.9/5.0' },
        { name: 'Maria Santos (Sales)', score: '4.8/5.0' },
        { name: 'Henry Roberts (IT)', score: '4.8/5.0' },
      ],
    },
    {
      icon: <FaLightbulb className="w-4 h-4" />,
      title: 'Workload Distribution',
      type: 'workload' as const,
      items: [
        { label: 'Optimal Range (80-90%)', value: '156 employees', width: '63%', color: 'bg-violet-500' },
        { label: 'Overutilized (>90%)', value: '34 employees', width: '14%', color: 'bg-red-500' },
        { label: 'Underutilized (<80%)', value: '57 employees', width: '23%', color: 'bg-yellow-500' },
      ],
    },
  ];

  return (
    <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={isMobile ? "visible" : "hidden"}
        animate={controls}
        variants={containerVariants}
        className="relative bg-[#0D0D12]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden [mask-image:linear-gradient(to_bottom,white,white,transparent)]"
      >
        {/* Top glow */}
        <div className="absolute -top-0.5 left-0 right-0 h-4 bg-gradient-to-r from-violet-600/80 via-violet-500/70 to-violet-600/80 blur-lg z-10" />
        <div className="absolute -top-4 -left-4 -right-4 h-8 bg-gradient-to-b from-violet-500/20 to-transparent blur-xl -z-10"></div>
        
        {/* Browser Header */}
        <motion.div variants={itemVariants} className="bg-[#0D0D12]/90 px-6 py-3 border-b border-white/10 flex items-center gap-2 backdrop-blur-xl">
          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="ml-4 text-sm text-gray-400">app.seloraa.com/dashboard</span>
        </motion.div>
        
        <div className="p-6 md:p-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Workforce Analytics</h2>
                <p className="text-gray-400">Real-time insights and recommendations</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600/50 hover:bg-violet-600/70 rounded-lg transition-colors border border-violet-500/30">
                  Export Report
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
                  Filter
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <AnimatedItem key={index}>
                <div className="bg-white/5 backdrop-blur-xl p-5 rounded-xl border border-white/10 hover:border-violet-500/50 transition-all h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-900/30 flex items-center justify-center text-violet-400">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                    </div>
                  </div>
                  <div className="text-xs text-violet-400">{stat.change}</div>
                </div>
              </AnimatedItem>
            ))}
          </div>

          {/* Insights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {insights.map((insight, index) => (
              <AnimatedItem key={index}>
                <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-violet-900/30 flex items-center justify-center text-violet-400">
                      {insight.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white">{insight.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {insight.items.map((item: InsightItem, i) => (
                      <div key={i} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-400">
                            {insight.type === 'performers' ? item.name : item.label}
                          </span>
                          {insight.type === 'performers' ? (
                            <span className="text-white font-medium">{item.score}</span>
                          ) : (
                            <span className="text-white font-medium">{item.value}</span>
                          )}
                        </div>
                        {insight.type === 'workload' && item.width && item.color && (
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${item.color}`} 
                              style={{ width: item.width }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>

          {/* AI Recommendations */}
          <AnimatedItem>
            <div className="bg-gradient-to-r from-violet-900/40 to-violet-800/30 rounded-xl p-6 border border-violet-900/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300">
                  <FaLightbulb className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white">AI Recommendations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/20 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
                  <h4 className="font-medium text-white mb-2">Immediate Actions</h4>
                  <ul className="text-sm text-gray-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      <span>Redistribute workload for 8 overutilized employees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      <span>Schedule retention meetings for high-risk staff</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      <span>Promote 3 succession-ready candidates</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
                  <h4 className="font-medium text-white mb-2">Strategic Planning</h4>
                  <ul className="text-sm text-gray-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      <span>Hire 2 senior engineers for Q1 projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      <span>Implement cross-training program</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-violet-400">•</span>
                      <span>Review compensation for top performers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedItem>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPreview;
