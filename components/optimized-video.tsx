"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  controls?: boolean;
  lazy?: boolean;
  preload?: string;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: Event) => void;
}

export default function OptimizedVideo({
  src,
  poster,
  className = "",
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  controls = false,
  lazy = false,
  preload = "metadata",
  onLoadStart,
  onCanPlay,
  onError,
  ...props
}: OptimizedVideoProps) {
  const componentId = useMemo(() => `video-${Math.random().toString(36).substr(2, 9)}`, []);

  const log = useCallback((message: string, data?: any) => {
    console.log(`[${componentId}] ${message}`, data || '');
  }, [componentId]);

  log('Component mounted', { src, poster, autoPlay });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPoster, setShowPoster] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Get the correct poster path
  const getPosterPath = useCallback(() => {
    if (!poster && src) {
      const basePath = src.split('?')[0];
      return basePath.replace(/\.(mp4|webm|mov|avi|mkv)$/i, '-poster.webp');
    }
    return poster || '';
  }, [poster, src]);

  const posterPath = getPosterPath();

  // Hide poster when video can play
  const handleCanPlay = useCallback(() => {
    log('Video can play through');
    log('Video element state', {
      readyState: videoRef.current?.readyState,
      networkState: videoRef.current?.networkState,
      videoWidth: videoRef.current?.videoWidth,
      videoHeight: videoRef.current?.videoHeight,
      currentSrc: videoRef.current?.currentSrc,
      poster: videoRef.current?.poster
    });
    
    // Small delay to ensure poster has time to fade out
    setTimeout(() => {
      setIsVideoReady(true);
      setShowPoster(false);
    }, 100);
    
    onCanPlay?.();
  }, [onCanPlay, log]);

  // Handle video errors
  const handleError = useCallback((e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    log('Video error occurred', {
      error: video.error,
      readyState: video.readyState,
      networkState: video.networkState,
      event: e.nativeEvent
    });
    setHasError(true);
    setShowPoster(true);
    onError?.(e.nativeEvent);
  }, [onError, log]);

  const handleLoadStart = useCallback(() => {
    log('Video load started');
    log('Video element state', {
      readyState: videoRef.current?.readyState,
      networkState: videoRef.current?.networkState,
      error: videoRef.current?.error
    });
    setIsLoading(true);
    onLoadStart?.();
  }, [onLoadStart, log]);

  // Set up video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const canPlayHandler = () => handleCanPlay();
    const errorHandler = (e: Event) => {
      const target = e.target as HTMLVideoElement;
      log('DOM Video error occurred', {
        error: target.error,
        readyState: target.readyState,
        networkState: target.networkState
      });
      setHasError(true);
      setShowPoster(true);
      onError?.(e);
    };
    const loadStartHandler = () => handleLoadStart();

    // We'll use React's event handlers for the video element
    // So we don't need to add these DOM event listeners
    // video.addEventListener('canplay', canPlayHandler);
    // video.addEventListener('error', errorHandler);
    // video.addEventListener('loadstart', loadStartHandler);
    
    // Debug video element state
    log('Video element initialized', {
      readyState: video.readyState,
      networkState: video.networkState,
      preload: video.preload,
      autoplay: video.autoplay
    });

    // Start loading the video
    if (video.paused && video.readyState < 3) {
      log('Manually triggering video load');
      video.load();
    }

    return () => {
      // video.removeEventListener('canplay', canPlayHandler);
      // video.removeEventListener('error', errorHandler);
      // video.removeEventListener('loadstart', loadStartHandler);
    };
  }, [src, handleCanPlay, handleLoadStart, log, onError]);

  // Debug render info
  useEffect(() => {
    log('Render state', {
      showPoster,
      isLoading,
      hasError,
      poster,
      videoReady: videoRef.current?.readyState,
      videoNetwork: videoRef.current?.networkState
    });
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Poster - shown when available */}
      {showPoster && posterPath && (
        <div 
          className="absolute inset-0 z-10 w-full h-full"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            backgroundImage: 'linear-gradient(45deg, #e5e5e5 25%, #f0f0f0 25%, #f0f0f0 50%, #e5e5e5 50%, #e5e5e5 75%, #f0f0f0 75%, #f0f0f0 100%)',
            backgroundSize: '20px 20px',
            opacity: isVideoReady ? 0 : 1,
            pointerEvents: 'none',
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.03)'
          }}>
            <img
              src={posterPath}
              alt="Video poster"
              className="w-full h-full object-cover"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'cover'
              }}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                log('Poster image loaded successfully', {
                  src: posterPath,
                  naturalWidth: img.naturalWidth,
                  naturalHeight: img.naturalHeight,
                  complete: img.complete,
                  currentSrc: img.currentSrc,
                  dimensions: img.getBoundingClientRect()
                });
              }}
              onError={(e) => {
                log('Error loading poster', { 
                  src: posterPath,
                  error: e,
                  currentSrc: (e.target as HTMLImageElement)?.currentSrc,
                  timestamp: new Date().toISOString()
                });
              }}
            />
          </div>
          
          {/* Debug overlay - only shown in development */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '11px',
              fontFamily: 'monospace',
              zIndex: 20,
              pointerEvents: 'none',
              maxWidth: '90%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {posterPath.split('/').pop()}
            </div>
          )}
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        className={`w-full h-auto transition-opacity duration-300 ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
        preload="auto"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        controls={controls}
        onLoadStart={handleLoadStart}
        onLoadedMetadata={() => log('Video metadata loaded')}
        onLoadedData={() => log('Video frame loaded')}
        onCanPlay={handleCanPlay}
        onCanPlayThrough={handleCanPlay}
        onWaiting={() => log('Video waiting for data')}
        onPlaying={() => {
          log('Video started playing');
          setShowPoster(false);
        }}
        onPause={() => log('Video paused')}
        onEnded={() => log('Video ended')}
        onError={(e) => {
          // This will trigger our handleError callback with the proper event type
          handleError(e);
        }}
      >
        <source src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
      </video>
    </div>
  );
}
