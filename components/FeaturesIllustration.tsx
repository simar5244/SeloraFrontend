'use client';

import React, { useRef, useEffect } from 'react';
import useMousePosition from '@/utils/useMousePosition';

const FeaturesIllustration = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const mousePosition = useMousePosition();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = mousePosition.x - rect.left;
    const y = mousePosition.y - rect.top;

    svg.style.setProperty('--mouse-x', `${x}px`);
    svg.style.setProperty('--mouse-y', `${y}px`);
  }, [mousePosition]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 1200 400"
        width="1200"
        height="400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="spotlight-grad"
            cx="var(--mouse-x, 600px)"
            cy="var(--mouse-y, 200px)"
            r="40%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#6D28D9" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
          </radialGradient>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="fade-mask">
            <rect width="1200" height="400" fill="url(#fade-gradient)" />
          </mask>
          <radialGradient id="fade-gradient" cx="50%" cy="50%" r="55%">
            <stop offset="30%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Main content group with mask */}
        <g mask="url(#fade-mask)">
          {/* Background fill with spotlight */}
          <rect width="1200" height="400" fill="url(#spotlight-grad)" />

          {/* Abstract futuristic lines */}
          <g filter="url(#neon-glow)" opacity="0.3">
            <path
              d="M 50 200 Q 300 50, 600 200 T 1150 200"
              stroke="#C4B5FD"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 100 300 Q 400 350, 600 200 T 1100 100"
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 200 100 Q 500 150, 600 200 T 1000 300"
              stroke="#DDD6FE"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Nodes */}
          <g>
            <circle cx="600" cy="200" r="12" fill="#F3F4F6" />
            <circle cx="350" cy="115" r="8" fill="#DDD6FE" />
            <circle cx="850" cy="285" r="8" fill="#DDD6FE" />
            <circle cx="150" cy="240" r="6" fill="#C4B5FD" />
            <circle cx="1050" cy="160" r="6" fill="#C4B5FD" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default FeaturesIllustration;