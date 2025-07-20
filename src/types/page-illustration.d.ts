// @ts-nocheck
// Type definitions for PageIllustration component
declare module '*/components/page-illustration' {
  import React from 'react';
  
  interface PageIllustrationProps {
    [key: string]: any;
  }
  
  const PageIllustration: React.FC<PageIllustrationProps>;
  export default PageIllustration;
}

// Allow any props on any element
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
