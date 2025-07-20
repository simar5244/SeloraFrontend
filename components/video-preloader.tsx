"use client";

import { useEffect, useState } from 'react';
import { useVideoPreloader } from '@/utils/video-preloader';

// List of all videos used in the application
const VIDEO_SOURCES = [
  '/optimized/giferp.webm',
  '/optimized/giffeedback.webm',
  '/optimized/GIFORGAI.webm',
  '/optimized/gifusermanagement.webm',
  '/optimized/gifreport.webm',
  '/optimized/gifprojects.webm',
  '/optimized/gif1.webm',
  '/optimized/gif2.webm',
  '/optimized/gif3.webm',
  '/optimized/admin1.webm',
  '/optimized/employee1.webm',
  '/optimized/adminapproval.webm',
];

export default function VideoPreloader() {
  const { preloadBatch } = useVideoPreloader();

  // Start preloading videos when component mounts
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      console.log('🎬 VideoPreloader: Mobile detected - using on-demand loading only');
      return;
    }

    // On desktop, preload only the first few videos immediately
    const videosToPreload = isMobile ? [] : VIDEO_SOURCES.slice(0, 5);
    
    console.log('🎬 VideoPreloader: Starting preload of initial videos...');
    console.log('🎬 Videos to preload:', videosToPreload);

    const startTime = Date.now();

    preloadBatch(videosToPreload)
      .then(() => {
        const endTime = Date.now();
        console.log(`🎬 VideoPreloader: Initial videos preloaded in ${endTime - startTime}ms`);
      })
      .catch((error) => {
        console.error('🎬 VideoPreloader: Error preloading videos:', error);
      });
  }, [preloadBatch]);

  // Don't render any hidden videos on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile, don't pre-render any videos
  if (isMobile) {
    return null;
  }

  return (
    <div style={{ display: 'none' }}>
      {VIDEO_SOURCES.map((src, index) => (
        <video
          key={index}
          src={src}
          preload="auto"
          muted
          playsInline
          autoPlay={false}  // Explicitly disable auto-play
          style={{ display: 'none' }}
          onLoadStart={() => console.log(`🎬 Hidden video element loading: ${src}`)}
          onCanPlay={() => console.log(`🎬 Hidden video element ready: ${src}`)}
          onError={(e) => console.error(`🎬 Hidden video element error: ${src}`, e)}
        />
      ))}
    </div>
  );
}

// Hook to preload specific videos on demand
export function useVideoPreload() {
  const { preload, getCached } = useVideoPreloader();

  const preloadVideo = async (src: string) => {
    try {
      await preload(src);
    } catch (error) {
      console.warn(`Failed to preload video: ${src}`, error);
    }
  };

  const isVideoCached = (src: string) => {
    return getCached(src) !== null;
  };

  return {
    preloadVideo,
    isVideoCached,
  };
}
