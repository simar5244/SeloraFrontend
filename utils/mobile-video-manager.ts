"use client";

class MobileVideoManager {
  private static instance: MobileVideoManager;
  private activeVideos: Set<HTMLVideoElement> = new Set();
  private maxVideos = 1; // Only ONE video allowed on mobile

  static getInstance(): MobileVideoManager {
    if (!MobileVideoManager.instance) {
      MobileVideoManager.instance = new MobileVideoManager();
    }
    return MobileVideoManager.instance;
  }

  isMobile(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }

  registerVideo(video: HTMLVideoElement): void {
    if (!this.isMobile()) return;

    console.log('🎬 MobileVideoManager: Registering video, current count:', this.activeVideos.size);

    // MOBILE: Only allow ONE video - destroy ALL others immediately
    this.activeVideos.forEach(existingVideo => {
      if (existingVideo !== video) {
        this.cleanupVideo(existingVideo);
      }
    });

    this.activeVideos.clear();
    this.activeVideos.add(video);
  }

  unregisterVideo(video: HTMLVideoElement): void {
    if (!this.isMobile()) return;
    
    console.log('🎬 MobileVideoManager: Unregistering video');
    this.cleanupVideo(video);
  }

  private cleanupVideo(video: HTMLVideoElement): void {
    if (!video) return;

    console.log('🎬 MobileVideoManager: Cleaning up video');

    try {
      video.pause();
      video.currentTime = 0;
      video.src = '';
      video.load();
      this.activeVideos.delete(video);
    } catch (error) {
      console.warn('🎬 MobileVideoManager: Error cleaning up video:', error);
    }
  }

  forceCleanupAll(): void {
    if (!this.isMobile()) return;

    console.log('🎬 MobileVideoManager: Force cleanup all videos');
    
    this.activeVideos.forEach(video => {
      this.cleanupVideo(video);
    });
    
    this.activeVideos.clear();

    // Also cleanup any orphaned videos
    setTimeout(() => {
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(video => {
        if (!this.activeVideos.has(video)) {
          try {
            video.pause();
            video.src = '';
            video.load();
          } catch (error) {
            console.warn('🎬 MobileVideoManager: Error cleaning orphaned video:', error);
          }
        }
      });
    }, 100);
  }

  getActiveVideoCount(): number {
    return this.activeVideos.size;
  }
}

export const mobileVideoManager = MobileVideoManager.getInstance();
