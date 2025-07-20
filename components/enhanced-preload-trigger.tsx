"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPreload } from '@/components/video-preloader';

interface EnhancedPreloadTriggerProps {
  videoSrc: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  preloadDelay?: number;
  showThumbnailOnHover?: boolean;
}

export default function EnhancedPreloadTrigger({
  videoSrc,
  onClick,
  children,
  className = "",
  preloadDelay = 300,
  showThumbnailOnHover = true
}: EnhancedPreloadTriggerProps) {
  const [isPreloading, setIsPreloading] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { preloadVideo, isVideoCached } = useVideoPreload();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const thumbnailTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate poster path automatically
  const posterSrc = videoSrc.replace('.webm', '-poster.webp').replace('.mp4', '-poster.webp');

  // Check if video is already cached
  useEffect(() => {
    setIsPreloaded(isVideoCached(videoSrc));
  }, [videoSrc, isVideoCached]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    // Show thumbnail after a short delay
    if (showThumbnailOnHover) {
      thumbnailTimeoutRef.current = setTimeout(() => {
        setShowThumbnail(true);
      }, 200);
    }
    
    // Start preloading after a short delay to avoid unnecessary requests
    hoverTimeoutRef.current = setTimeout(async () => {
      if (!isPreloaded && !isPreloading) {
        setIsPreloading(true);
        try {
          await preloadVideo(videoSrc);
          setIsPreloaded(true);
        } catch (error) {
          console.warn('Failed to preload video:', error);
        } finally {
          setIsPreloading(false);
        }
      }
    }, preloadDelay);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowThumbnail(false);
    
    // Clear timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (thumbnailTimeoutRef.current) {
      clearTimeout(thumbnailTimeoutRef.current);
      thumbnailTimeoutRef.current = null;
    }
  };

  const handleClick = () => {
    // If video isn't preloaded yet, start preloading immediately
    if (!isPreloaded && !isPreloading) {
      preloadVideo(videoSrc).catch(console.warn);
    }
    onClick();
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      if (thumbnailTimeoutRef.current) {
        clearTimeout(thumbnailTimeoutRef.current);
        thumbnailTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={`group cursor-pointer relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Thumbnail preview overlay */}
      <AnimatePresence>
        {showThumbnail && showThumbnailOnHover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 rounded-2xl overflow-hidden"
            style={{ pointerEvents: 'none' }}
          >
            <img
              src={posterSrc}
              alt="Video preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            {/* Play icon overlay */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
              >
                <svg className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5z" />
                </svg>
              </motion.div>
            </div>

            {/* Loading indicator */}
            {isPreloading && (
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-2 bg-black/70 rounded-full px-3 py-1.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <span className="text-white text-xs font-medium">Loading...</span>
                </div>
              </div>
            )}

            {/* Preloaded indicator */}
            {isPreloaded && !isPreloading && (
              <div className="absolute top-3 right-3">
                <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg"></div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {children}
      
      {/* Enhanced interaction feedback */}
      <motion.div
        className="absolute inset-0 bg-violet-500/0 rounded-2xl transition-all duration-300 pointer-events-none"
        animate={{
          backgroundColor: isHovered ? 'rgba(139, 92, 246, 0.05)' : 'rgba(139, 92, 246, 0)',
        }}
      />
    </div>
  );
}