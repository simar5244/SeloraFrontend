export class VideoManager {
  private static instance: VideoManager;
  // Very aggressive limits for mobile
  private maxVideos = 1; // Only 1 video at a time
  private activeVideos: Map<string, {element: HTMLVideoElement, lastUsed: number}> = new Map();
  private isMobile: boolean;
  private cleanupInterval: NodeJS.Timeout | null = null;
  private lastReleaseTime = 0;
  private readonly RELEASE_COOLDOWN = 1000; // 1 second cooldown between releases

  private constructor() {
    this.isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
      // Start cleanup interval
      this.startCleanupInterval();
    }
  }

  public static getInstance(): VideoManager {
    if (!VideoManager.instance) {
      VideoManager.instance = new VideoManager();
    }
    return VideoManager.instance;
  }

  private handleResize = () => {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 768;
    
    // If switching to mobile, ensure we don't have too many videos
    if (this.isMobile && !wasMobile) {
      this.cleanupExcessVideos();
    }
  };

  private cleanupExcessVideos() {
    if (this.activeVideos.size <= this.maxVideos) return;

    // Remove oldest videos first
    const entries = Array.from(this.activeVideos.entries());
    const excess = entries.length - this.maxVideos;
    
    for (let i = 0; i < excess; i++) {
      const [src, video] = entries[i];
      this.releaseVideo(src);
    }
  }

  private startCleanupInterval() {
    // Clean up every 5 seconds
    this.cleanupInterval = setInterval(() => {
      this.cleanupInactiveVideos();
    }, 5000);
  }

  private cleanupInactiveVideos() {
    if (!this.isMobile) return;
    
    const now = Date.now();
    const inactiveTime = 1000; // 1 second of inactivity
    
    // If we have more than max videos, clean up the oldest ones first
    if (this.activeVideos.size > this.maxVideos) {
      const entries = Array.from(this.activeVideos.entries())
        .sort((a, b) => a[1].lastUsed - b[1].lastUsed);
      
      // Release all but the most recent video
      for (let i = 0; i < entries.length - 1; i++) {
        this.releaseVideo(entries[i][0]);
      }
      return;
    }
    
    // Release videos that haven't been used recently
    for (const [src, { lastUsed }] of this.activeVideos.entries()) {
      if (now - lastUsed > inactiveTime) {
        this.releaseVideo(src);
      }
    }
  }

  public registerVideo(src: string, video: HTMLVideoElement) {
    // Always update last used time if already registered
    if (this.activeVideos.has(src)) {
      const existing = this.activeVideos.get(src)!;
      this.activeVideos.set(src, { ...existing, lastUsed: Date.now() });
      return;
    }

    if (this.isMobile) {
      // On mobile, ensure we don't exceed max videos
      if (this.activeVideos.size >= this.maxVideos) {
        // Force release all other videos
        for (const [s] of this.activeVideos.entries()) {
          this.releaseVideo(s, true); // Force release
        }
      }
    }
    
    // Add the new video
    this.activeVideos.set(src, { 
      element: video, 
      lastUsed: Date.now() 
    });
    
    console.log(`🎥 Video registered: ${src} (${this.activeVideos.size} active)`);
    
    // Schedule a cleanup in case something goes wrong
    if (this.isMobile) {
      setTimeout(() => {
        this.cleanupInactiveVideos();
      }, 500);
    }
  }

  public releaseVideo(src: string, force = false) {
    // Implement cooldown to prevent rapid releases
    const now = Date.now();
    if (!force && now - this.lastReleaseTime < this.RELEASE_COOLDOWN) {
      return;
    }
    
    const videoData = this.activeVideos.get(src);
    if (!videoData) return;
    
    const { element: video } = videoData;
    
    try {
      // Pause and reset the video
      video.pause();
      video.currentTime = 0;
      
      // More aggressive cleanup
      video.removeAttribute('src');
      video.load();
      
      // Force garbage collection by removing event listeners and replacing the element
      const clone = video.cloneNode(false) as HTMLVideoElement;
      if (video.parentNode) {
        video.parentNode.replaceChild(clone, video);
      }
      
      // Clear any remaining references
      for (const key in video) {
        try {
          delete (video as any)[key];
        } catch (e) {
          // Ignore errors from read-only properties
        }
      }
      
      console.log(`🎥 Video released: ${src} (${this.activeVideos.size - 1} remaining)`);
      this.lastReleaseTime = now;
    } catch (error) {
      console.error('Error releasing video:', error);
    } finally {
      this.activeVideos.delete(src);
      
      // Force garbage collection if possible
      if (window.gc) {
        window.gc();
      } else if (window.CollectGarbage) {
        window.CollectGarbage();
      }
    }
  }

  public isVideoActive(src: string): boolean {
    return this.activeVideos.has(src);
  }

  public cleanup() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
      if (this.cleanupInterval) {
        clearInterval(this.cleanupInterval);
      }
    }
    // Create a copy of the keys to avoid mutation during iteration
    const videoSources = Array.from(this.activeVideos.keys());
    videoSources.forEach(src => this.releaseVideo(src));
  }
}

export const videoManager = VideoManager.getInstance();
