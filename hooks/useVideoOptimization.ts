import { useEffect, useRef } from 'react';
import { videoManager } from '@/utils/video-manager';

export function useVideoOptimization(src: string, videoRef: React.RefObject<HTMLVideoElement>) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const isVisibleRef = useRef(false);
  const lastVisibleTimeRef = useRef(0);
  const cleanupTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isMobile || !videoRef.current) return;

    const video = videoRef.current;
    let isMounted = true;

    const handleVisibilityChange = (isVisible: boolean) => {
      if (!isMounted || !video) return;

      // Clear any pending cleanup
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }

      isVisibleRef.current = isVisible;
      
      if (isVisible) {
        lastVisibleTimeRef.current = Date.now();
        
        // Immediately pause any other videos on the page
        if (isMobile) {
          document.querySelectorAll('video').forEach(v => {
            if (v !== video && !v.paused) {
              v.pause();
              v.currentTime = 0;
            }
          });
        }
        
        // Video is in view, register it with the manager
        videoManager.registerVideo(src, video);
        
        // Force play if it's the first time
        if (video.paused) {
          video.play().catch(console.warn);
        }
      } else {
        // Schedule cleanup with a small delay
        cleanupTimerRef.current = setTimeout(() => {
          if (!isVisibleRef.current && isMounted) {
            // Video is out of view, release it
            videoManager.releaseVideo(src, true); // Force release
            
            // Clear the video element
            if (video) {
              video.pause();
              video.currentTime = 0;
              video.removeAttribute('src');
              video.load();
            }
            
            // Force garbage collection if available
            if (window.gc) {
              window.gc();
            } else if (window.CollectGarbage) {
              window.CollectGarbage();
            }
          }
          cleanupTimerRef.current = null;
        }, 200); // Reduced from 300ms to 200ms
      }
    };

    // Use IntersectionObserver to track visibility with more aggressive settings
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isVisible = entry.isIntersecting && entry.intersectionRatio > 0;
            if (isVisible) {
              handleVisibilityChange(true);
            } else {
              handleVisibilityChange(false);
            }
          });
        },
        {
          root: null,
          rootMargin: '25%', // Smaller viewport margin
          threshold: 0.01, // More sensitive threshold
        }
      );

      if (video) {
        observerRef.current.observe(video);
      }
    }

    // Initial registration only if the video is in the viewport
    if (typeof window !== 'undefined' && video) {
      const rect = video.getBoundingClientRect();
      const isInViewport = (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
      );
      
      if (isInViewport) {
        handleVisibilityChange(true);
      }
    }

    // Cleanup function
    const cleanup = () => {
      isMounted = false;
      
      // Clear any pending timeouts
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }
      
      // Disconnect observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      // Force release the video
      videoManager.releaseVideo(src, true);
      
      // Clean up the video element
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.removeAttribute('src');
        video.load();
      }
    };
    
    return cleanup;
  }, [src, isMobile, videoRef]);
}
