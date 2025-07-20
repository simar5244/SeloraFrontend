"use client";

import { useEffect, useRef, useState } from 'react';
import { useVideoPreload } from '@/components/video-preloader';

interface PreloadTriggerProps {
  videoSrc: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  preloadDelay?: number;
}

export default function PreloadTrigger({
  videoSrc,
  onClick,
  children,
  className = "",
  preloadDelay = 300
}: PreloadTriggerProps) {
  const [isPreloading, setIsPreloading] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const { preloadVideo, isVideoCached } = useVideoPreload();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if video is already cached
  useEffect(() => {
    setIsPreloaded(isVideoCached(videoSrc));
  }, [videoSrc, isVideoCached]);

  const handleMouseEnter = () => {
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
    // Clear the timeout if user leaves before preload starts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
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
    };
  }, []);

  return (
    <div
      className={`group cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >

      
      {children}
    </div>
  );
}
