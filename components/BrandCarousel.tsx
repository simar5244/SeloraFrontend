"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function BrandCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logos = Array.from({ length: 9 }, (_, i) => `/images/client-logo-${String(i + 1).padStart(2, '0')}.svg`);
  const duplicatedLogos = [...logos, ...logos]; // Duplicate for seamless loop

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame: number;
    let position = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      position -= speed;
      if (position <= -container.scrollWidth / 2) {
        position = 0;
      }
      container.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-white to-violet-400" style={{
          backgroundSize: '200% auto',
          animation: 'gradient 3s ease infinite',
        }}>
          Trusted by many
        </h2>
      </div>
      <div className="relative overflow-hidden">
        <div 
          ref={containerRef}
          className="flex items-center gap-16 md:gap-24 px-4"
          style={{
            width: 'max-content',
            animation: 'scroll 30s linear infinite',
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0">
              <div className="w-32 md:w-40 h-16 flex items-center justify-center">
                <Image
                  src={logo}
                  width={160}
                  height={80}
                  alt="Client logo"
                  className="max-h-12 md:max-h-16 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 2rem));
            }
          }
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
