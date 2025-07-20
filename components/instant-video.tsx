"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVideoPreload } from '@/components/video-preloader';
import { videoManager } from '@/utils/video-manager';
import { useVideoOptimization } from '@/hooks/useVideoOptimization';

interface InstantVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: Event) => void;
  showPlayButton?: boolean;
}

export default function InstantVideo({
  src,
  poster,
  className = "",
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  controls = false,
  showPlayButton = false,
  onLoadStart,
  onCanPlay,
  onError,
}: InstantVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isVideoCached } = useVideoPreload();

  // Check if video is already preloaded to skip loading states
  const isVideoPreloaded = isVideoCached(src);

  const [isLoading, setIsLoading] = useState(!isVideoPreloaded); // Skip loading if already cached
  const [hasError, setHasError] = useState(false);
  const [showPoster, setShowPoster] = useState(poster !== "" && !isVideoPreloaded); // Hide poster if video is preloaded
  const [isPlaying, setIsPlaying] = useState(false);

  // Generate poster path automatically if not provided, but respect explicit disable
  const posterPath = poster === "" ? "" : (poster || src.replace('.webm', '-poster.webp').replace('.mp4', '-poster.webp'));
  
  // Debug poster path
  useEffect(() => {
    console.log('Poster path:', posterPath);
  }, [posterPath]);

  // Monitor video cache status and update loading state
  useEffect(() => {
    const checkCacheStatus = () => {
      const isCached = isVideoCached(src);
      console.log(`🎬 InstantVideo: Video ${src} cache status:`, isCached);

      if (isCached) {
        console.log(`🎬 InstantVideo: Video ${src} is cached, skipping loading state`);
        setIsLoading(false);
        // For cached videos, don't show poster unless explicitly required
        if (poster === "") {
          setShowPoster(false);
        }
      }
    };

    checkCacheStatus();

    // Check periodically in case video gets cached while component is mounted
    const interval = setInterval(checkCacheStatus, 200);

    return () => clearInterval(interval);
  }, [src, isVideoCached, poster]);

  // Force immediate readiness for cached videos
  // Use video optimization hook for mobile
  useVideoOptimization(src, videoRef);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isCached = isVideoCached(src);
    if (isCached) {
      console.log(`🎬 InstantVideo: Forcing immediate readiness for cached video ${src}`);

      // Force the video to be ready
      if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
        setIsLoading(false);
        if (poster === "") {
          setShowPoster(false);
        }

        // If autoPlay is enabled and video is ready, play immediately
        if (autoPlay && !isPlaying) {
          video.play().then(() => {
            setIsPlaying(true);
            setShowPoster(false);
          }).catch(console.warn);
        }
      }
    }
  }, [src, isVideoCached, autoPlay, isPlaying, poster]);

  // Immediate check on mount for already-ready videos
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Small delay to ensure video element is fully initialized
    const timer = setTimeout(() => {
      const isCached = isVideoCached(src);
      console.log(`🎬 InstantVideo: Mount check for ${src} - cached: ${isCached}, readyState: ${video.readyState}`);

      if (isCached && video.readyState >= 1) { // HAVE_METADATA or higher
        console.log(`🎬 InstantVideo: Video ${src} is ready on mount, skipping loading`);
        setIsLoading(false);
        if (poster === "") {
          setShowPoster(false);
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [src, isVideoCached, poster]);

  // Video event handlers
  const handleLoadStart = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    console.log('Video load started:', {
      src: video.currentSrc || video.src,
      readyState: video.readyState,
      networkState: video.networkState,
      currentTime: video.currentTime,
      buffered: video.buffered?.length ? video.buffered.end(0) : 0,
      event: e.nativeEvent
    });
    setIsLoading(true);
    setShowPoster(poster !== ""); // Only show poster if not explicitly disabled
    onLoadStart?.();
  }, [onLoadStart, src]);

  const handleCanPlay = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const isCached = isVideoCached(src);

    console.log('🎬 InstantVideo: Video can play:', {
      src: video.currentSrc || video.src,
      readyState: video.readyState,
      networkState: video.networkState,
      currentTime: video.currentTime,
      buffered: video.buffered?.length ? video.buffered.end(0) : 0,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      isCached,
      event: e.nativeEvent
    });

    // Immediately hide loading for cached videos
    setIsLoading(false);

    // For cached videos, be more aggressive about hiding poster
    if (isCached && poster !== "") {
      console.log('🎬 InstantVideo: Cached video ready, hiding poster immediately');
      setShowPoster(false);
    }

    onCanPlay?.();
    
    // If autoPlay is enabled, hide poster and start playing
    if (autoPlay) {
      console.log('Attempting to play video...');
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video play successful, hiding poster');
            setShowPoster(false);
            setIsPlaying(true);
          })
          .catch(error => {
            console.warn('Autoplay failed:', error);
            setShowPoster(poster !== ""); // Only show poster if not explicitly disabled
            // Try again with user interaction
            const handleUserInteraction = () => {
              video.play()
                .then(() => {
                  setShowPoster(false);
                  setIsPlaying(true);
                })
                .catch(console.error);
              document.removeEventListener('click', handleUserInteraction);
              document.removeEventListener('touchstart', handleUserInteraction);
            };
            document.addEventListener('click', handleUserInteraction);
            document.addEventListener('touchstart', handleUserInteraction);
          });
      }
    }
  }, [onCanPlay, autoPlay, src, isVideoCached, poster]);

  // Handle dynamic autoPlay changes (when autoPlay prop changes from false to true)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isLoading || hasError) return;

    if (autoPlay && !isPlaying) {
      console.log('AutoPlay enabled dynamically, attempting to play...');

      // Small delay to prevent glitching
      setTimeout(() => {
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Dynamic video play successful');
              // Additional delay before hiding poster to prevent glitch
              setTimeout(() => {
                setShowPoster(false);
                setIsPlaying(true);
              }, 200);
            })
            .catch(error => {
              console.warn('Dynamic autoplay failed:', error);
              setShowPoster(poster !== ""); // Only show poster if not explicitly disabled
            });
        }
      }, 100); // 100ms delay to prevent glitching
    }
  }, [autoPlay, isLoading, hasError, isPlaying]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    setShowPoster(false);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleError = useCallback((error: Event) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(error);
  }, [onError]);

  const handlePosterClick = useCallback(() => {
    if (videoRef.current && !isLoading) {
      setShowPoster(false);
      videoRef.current.play().catch(console.warn);
    }
  }, [isLoading]);

  // Debug effect to log video state changes
  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    // Log initial state
    console.log('Video initial state:', {
      readyState: video.readyState,
      networkState: video.networkState,
      currentTime: video.currentTime,
      buffered: video.buffered?.length ? video.buffered.end(0) : 0,
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
      src: video.currentSrc || video.src
    });
    
    // Force a reload if needed
    if (autoPlay) {
      video.load();
    }
  }, [src, autoPlay]);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-900/50 rounded-lg ${className}`}>
        <p className="text-gray-400">Failed to load video</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Poster with debug overlay */}
      {showPoster && posterPath && (
        <div className="absolute inset-0 z-10 w-full h-full bg-red-500/10" style={{
          border: '2px solid red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: 'red',
          pointerEvents: 'none'
        }}>
          <img
            src={posterPath}
            alt="Video poster"
            className="w-full h-full object-cover"
            style={{
              border: '2px solid lime',
              boxSizing: 'border-box',
              opacity: 1,
              transition: 'opacity 0.3s ease-in-out'
            }}
            onLoad={(e) => {
              const img = e.target as HTMLImageElement;
              console.log('Poster loaded:', {
                src: posterPath,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                complete: img.complete,
                currentSrc: img.currentSrc,
                boundingRect: img.getBoundingClientRect()
              });
            }}
            onError={(e) => {
              console.error('Error loading poster:', {
                src: posterPath,
                error: e,
                currentSrc: (e.target as HTMLImageElement)?.currentSrc
              });
              setShowPoster(false);
            }}
          />
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            zIndex: 20
          }}>
            Poster: {posterPath.split('/').pop()}
          </div>
        </div>
      )}

      {/* Actual video element */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover`}
        style={{
          opacity: showPoster ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
          position: 'relative',
          zIndex: 5,
          backgroundColor: 'transparent'
        }}
        src={src}
        preload="auto"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        onLoadStart={handleLoadStart}
        onLoadedData={() => {
          console.log('🎬 InstantVideo: Video data loaded:', src);
          const isCached = isVideoCached(src);
          if (isCached) {
            console.log('🎬 InstantVideo: Cached video data ready, hiding loading');
            setIsLoading(false);
            if (poster === "") {
              setShowPoster(false);
            }
          }
        }}
        onCanPlay={handleCanPlay}
        onCanPlayThrough={handleCanPlay}
        onPlay={() => {
          console.log('Video playing:', src);
          setShowPoster(false);
          setIsPlaying(true);
        }}
        onPause={() => {
          console.log('Video paused:', src);
          setIsPlaying(false);
        }}
        onEnded={() => {
          console.log('Video ended:', src);
          setIsPlaying(false);
        }}
        onError={(e) => {
          console.error('Video error occurred:', {
            src,
            error: (e.target as HTMLVideoElement)?.error,
            readyState: (e.target as HTMLVideoElement)?.readyState,
            networkState: (e.target as HTMLVideoElement)?.networkState
          });
          setShowPoster(poster !== ""); // Only show poster if not explicitly disabled
          setHasError(true);
          onError?.(e as unknown as Event);
        }}
      >
        <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        Your browser does not support the video tag.
      </video>

      {/* Play button overlay */}
      {showPlayButton && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.button
            className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handlePosterClick();
            }}
          >
            <svg 
              className="w-6 h-6 text-gray-900 ml-1" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M8 5v10l8-5z" />
            </svg>
          </motion.button>
        </motion.div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white text-xs">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}