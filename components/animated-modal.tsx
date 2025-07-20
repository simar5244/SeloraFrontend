"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InstantVideo from '@/components/instant-video';
import ProductionVideo from '@/components/production-video';
import { useVideoPreload } from '@/components/video-preloader';
import { mobileVideoManager } from '@/utils/mobile-video-manager';

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  posterSrc?: string;
  title: string;
  description: string;
  features: string[];
  children?: React.ReactNode;
}

export default function AnimatedModal({
  isOpen,
  onClose,
  videoSrc,
  posterSrc,
  title,
  description,
  features,
  children
}: AnimatedModalProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [isVideoFullyLoaded, setIsVideoFullyLoaded] = useState(false);
  const { preloadVideo, isVideoCached } = useVideoPreload();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile to prevent crashes
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Start video loading immediately when modal opens to give 2-3 seconds for loading
  // while other animations play out before video is shown
  useEffect(() => {
    if (isOpen) {
      console.log('🎬 AnimatedModal: Modal opened, checking video status');
      const isCached = isVideoCached(videoSrc);
      console.log('🎬 AnimatedModal: Video cached status:', isCached);

      if (!isCached) {
        console.log('🎬 AnimatedModal: Starting video preload');
        preloadVideo(videoSrc);
      } else {
        console.log('🎬 AnimatedModal: Video already cached');
        setIsVideoFullyLoaded(true);
      }
    }
  }, [isOpen, videoSrc, preloadVideo, isVideoCached]);

  // Check video loading status more aggressively
  useEffect(() => {
    if (!isOpen) return;

    const checkVideoStatus = () => {
      const isCached = isVideoCached(videoSrc);
      if (isCached && !isVideoFullyLoaded) {
        console.log('🎬 AnimatedModal: Video became cached, marking as fully loaded');
        setIsVideoFullyLoaded(true);
      }
    };

    // Check immediately and then periodically
    checkVideoStatus();
    const interval = setInterval(checkVideoStatus, 100);

    return () => clearInterval(interval);
  }, [isOpen, videoSrc, isVideoCached, isVideoFullyLoaded]);

  // Trigger video playback when its animation turn comes AND video is ready
  useEffect(() => {
    if (isOpen && isVideoFullyLoaded) {
      const videoDelay = 1.5 + (features.length * 0.2) + 0.3; // Same delay as video animation
      const timer = setTimeout(() => {
        console.log('🎬 AnimatedModal: Video is ready, triggering playback');
        setShouldPlayVideo(true);
      }, (videoDelay + 0.2) * 1000); // Add 200ms buffer after video becomes visible

      return () => clearTimeout(timer);
    } else if (isOpen && !isVideoFullyLoaded) {
      console.log('🎬 AnimatedModal: Waiting for video to be fully loaded before triggering playback');
    } else {
      setShouldPlayVideo(false);
    }
  }, [isOpen, features.length, isVideoFullyLoaded]);

  // Aggressive mobile memory cleanup - reset states when modal closes
  useEffect(() => {
    if (!isOpen && isMobile) {
      console.log('🎬 AnimatedModal: Aggressive mobile cleanup on close');
      setIsVideoReady(false);
      setShouldPlayVideo(false);
      setIsVideoFullyLoaded(false);

      // Force cleanup using mobile video manager
      setTimeout(() => {
        mobileVideoManager.forceCleanupAll();
      }, 100);
    }
  }, [isOpen, isMobile]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.33 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.22 }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.44,
        delay: 0.11
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 30,
      transition: {
        duration: 0.22
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.55,
        delay: 0.33
      }
    }
  };

  // Staged animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1.0 // After title
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -15, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 1.5 + (i * 0.2) // After description, staggered
      }
    })
  };

  // Video shows last, but starts loading immediately
  const videoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 1.5 + (features.length * 0.2) + 0.3 // After all features
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          {/* Animated backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Close button */}
          <motion.button 
            onClick={onClose}
            className="fixed top-6 right-6 z-50 text-white/80 hover:text-white p-2 bg-black/30 rounded-full backdrop-blur-sm transition-colors duration-200"
            aria-label="Close"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Modal content */}
          <motion.div 
            className="relative w-full max-w-5xl bg-transparent overflow-hidden flex flex-col max-h-[90vh]" 
            onClick={e => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex-1 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 md:items-center">
                {/* Video */}
                <motion.div
                  className="w-full md:h-auto h-64 flex items-center justify-center"
                  variants={videoVariants}
                  initial="hidden"
                  animate={"visible"}
                >
                  <ProductionVideo
                    src={videoSrc}
                    autoPlay={shouldPlayVideo}  // Only auto-play when animation turn comes
                    loop
                    muted
                    playsInline
                    className="w-full h-auto rounded-lg"
                    forceReady={true}  // Force ready - we've had 7+ seconds of prep time!
                    onCanPlay={() => {
                      console.log('🎬 AnimatedModal: ProductionVideo reports canPlay');
                      setIsVideoReady(true);
                    }}
                    onReady={() => {
                      console.log('🎬 AnimatedModal: ProductionVideo is fully ready');
                      setIsVideoFullyLoaded(true);
                    }}
                  />
                </motion.div>
                
                {/* Text Content */}
                <div className="space-y-6 text-white">
                  {/* Main heading - shows first */}
                  <motion.h3
                    className="text-3xl font-bold"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {title}
                  </motion.h3>

                  {/* Sub heading - shows second */}
                  <motion.p
                    className="text-lg"
                    variants={descriptionVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {description}
                  </motion.p>

                  {/* Feature list - shows one by one after sub heading */}
                  <ul className="space-y-3 text-gray-300">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        custom={index}
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.svg
                          className="h-5 w-5 text-violet-400 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 1.5 + (index * 0.2) + 0.1, // Slight delay after text
                            duration: 0.3,
                            type: "spring",
                            stiffness: 200
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
