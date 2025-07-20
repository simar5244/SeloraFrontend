// Video preloader utility for better performance
class VideoPreloader {
  private cache = new Map<string, HTMLVideoElement>();
  private preloadQueue: string[] = [];
  private isPreloading = false;
  private maxCacheSize = 5; // Limit cache size to prevent memory issues

  // Preload a video
  preload(src: string): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
      console.log(`🎬 VideoPreloader: Starting preload for ${src}`);

      // Check if already cached
      if (this.cache.has(src)) {
        console.log(`🎬 VideoPreloader: ${src} already cached`);
        resolve(this.cache.get(src)!);
        return;
      }

      const video = document.createElement('video');
      video.preload = 'auto';  // Changed to 'auto' for full preloading
      video.muted = true;
      video.playsInline = true;
      video.autoplay = false;  // Explicitly disable auto-play

      const startTime = Date.now();

      const onCanPlay = () => {
        const loadTime = Date.now() - startTime;
        console.log(`🎬 VideoPreloader: ${src} loaded successfully in ${loadTime}ms`);
        // Add to cache
        this.addToCache(src, video);
        cleanup();
        resolve(video);
      };

      const onError = (e: Event) => {
        const loadTime = Date.now() - startTime;
        console.error(`🎬 VideoPreloader: ${src} failed to load after ${loadTime}ms`, e);
        cleanup();
        reject(new Error(`Failed to preload video: ${src}`));
      };

      const cleanup = () => {
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onError);
      };

      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('error', onError);

      // Start loading
      video.src = src;
      console.log(`🎬 VideoPreloader: Network request initiated for ${src}`);
    });
  }

  // Add video to cache with LRU eviction
  private addToCache(src: string, video: HTMLVideoElement) {
    // Remove oldest if cache is full
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        const oldVideo = this.cache.get(firstKey);
        if (oldVideo) {
          oldVideo.src = '';
          oldVideo.load();
        }
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(src, video);
  }

  // Get cached video
  getCached(src: string): HTMLVideoElement | null {
    return this.cache.get(src) || null;
  }

  // Preload multiple videos in sequence
  async preloadBatch(sources: string[]): Promise<void> {
    if (this.isPreloading) {
      console.log('🎬 VideoPreloader: Batch preload already in progress, skipping');
      return;
    }

    console.log(`🎬 VideoPreloader: Starting batch preload of ${sources.length} videos`);
    this.isPreloading = true;
    this.preloadQueue = [...sources];

    const batchStartTime = Date.now();

    try {
      for (let i = 0; i < this.preloadQueue.length; i++) {
        const src = this.preloadQueue[i];
        console.log(`🎬 VideoPreloader: Preloading video ${i + 1}/${this.preloadQueue.length}: ${src}`);
        await this.preload(src);
        // No delay for instant loading
      }

      const batchEndTime = Date.now();
      console.log(`🎬 VideoPreloader: Batch preload completed in ${batchEndTime - batchStartTime}ms`);
    } catch (error) {
      console.error('🎬 VideoPreloader: Batch preload failed:', error);
      throw error;
    } finally {
      this.isPreloading = false;
      this.preloadQueue = [];
    }
  }

  // Clear cache
  clearCache() {
    this.cache.forEach(video => {
      video.src = '';
      video.load();
    });
    this.cache.clear();
  }

  // Get cache size
  getCacheSize(): number {
    return this.cache.size;
  }
}

// Singleton instance
export const videoPreloader = new VideoPreloader();

// Hook for React components
export function useVideoPreloader() {
  return {
    preload: videoPreloader.preload.bind(videoPreloader),
    preloadBatch: videoPreloader.preloadBatch.bind(videoPreloader),
    getCached: videoPreloader.getCached.bind(videoPreloader),
    clearCache: videoPreloader.clearCache.bind(videoPreloader),
    getCacheSize: videoPreloader.getCacheSize.bind(videoPreloader),
  };
}

// Utility to generate poster images from video (client-side)
export function generatePosterFromVideo(videoSrc: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;

    video.onloadeddata = () => {
      video.currentTime = 0.1; // Get frame at 0.1 seconds
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(video, 0, 0);
      const posterUrl = canvas.toDataURL('image/jpeg', 0.8);
      resolve(posterUrl);
    };

    video.onerror = () => {
      reject(new Error('Failed to load video for poster generation'));
    };

    video.src = videoSrc;
  });
}
