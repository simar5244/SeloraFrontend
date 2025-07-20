// Extend the Window interface to include garbage collection methods
declare interface Window {
  // Chrome and Firefox
  gc?: () => void;
  // IE and Edge
  CollectGarbage?: () => void;
}
