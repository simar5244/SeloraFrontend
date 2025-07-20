'use client';

import { useState } from 'react';

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
};

const features: Feature[] = [
  {
    title: "AI-Powered Predictions",
    description: "Leverage advanced machine learning to forecast organizational trends and potential risks before they impact your business.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
      </svg>
    ),
    color: "violet-500",
    gradient: "from-violet-600/20 to-violet-900/10"
  },
  {
    title: "Real-time Analytics",
    description: "Get instant insights into your organization's performance with our real-time data processing and visualization tools.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 8C19.5 8 18.7 9.4 19.1 10.5L15.5 14.1C15.2 14 14.8 14 14.5 14.1L11.9 11.5C12.3 10.4 11.5 9 10 9C8.6 9 7.7 10.4 8.1 11.5L3.5 16C2.4 15.6 1 16.5 1 18C1 19.1 1.9 20 3 20C4.4 20 5.3 18.6 4.9 17.5L9.4 12.9C9.7 13 10.1 13 10.4 12.9L13 15.5C12.6 16.6 13.4 18 15 18C16.5 18 17.4 16.6 17 15.5L21 11.5C22.1 11.9 23.5 11 23.5 9.5C23.5 8.7 23.2 8 22.5 7.5C22.2 7.2 21.6 7 21 8Z" fill="currentColor"/>
      </svg>
    ),
    color: "pink-500",
    gradient: "from-pink-600/20 to-pink-900/10"
  },
  {
    title: "Automated Workflows",
    description: "Streamline your operations with customizable, automated workflows that adapt to your organization's unique needs.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>
      </svg>
    ),
    color: "blue-500",
    gradient: "from-blue-600/20 to-blue-900/10"
  },
  {
    title: "Secure Collaboration",
    description: "Work together seamlessly with enterprise-grade security and privacy controls for your most sensitive data.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5V11C3 16.55 6.16 21.74 12 23C17.84 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
      </svg>
    ),
    color: "emerald-500",
    gradient: "from-emerald-600/20 to-emerald-900/10"
  }
];

export default function ModernFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-violet-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-violet-200/50">
            <span className="inline-flex bg-gradient-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
              Next-Gen Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-4">
            The Future of Organizational Intelligence
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Interactive timeline */}
          <div className="relative h-1 bg-gradient-to-r from-violet-900/50 to-pink-900/50 rounded-full mb-16 mx-8">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-pink-500/30 to-blue-500/30 rounded-full" />
            
            {/* Feature indicators */}
            <div className="flex justify-between absolute -top-3.5 w-full">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeIndex === index 
                      ? `bg-gradient-to-br from-${feature.color} to-${feature.color}/70 text-white scale-110`
                      : `bg-gray-800 border border-gray-700 text-gray-400 hover:border-${feature.color}/50 hover:text-${feature.color}`
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active feature display */}
          <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${activeFeature.gradient} transition-all duration-500`}>
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${activeFeature.color} to-${activeFeature.color}/70 flex items-center justify-center text-white`}>
                    {activeFeature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {activeFeature.title}
                  </h3>
                  <p className="text-gray-300 text-lg max-w-3xl">
                    {activeFeature.description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Animated background elements */}
            <div className="absolute inset-0 -z-10 opacity-20">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-violet-500/20 rounded-full filter blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl" />
            </div>
          </div>

          {/* Feature preview grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`p-4 rounded-xl text-left transition-all duration-300 ${
                  activeIndex === index
                    ? `bg-gradient-to-br from-${feature.color}/10 to-${feature.color}/5 border border-${feature.color}/20`
                    : 'bg-gray-900/50 border border-gray-800/50 hover:border-gray-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-${feature.color}/10 flex items-center justify-center text-${feature.color}`}>
                    {feature.icon}
                  </div>
                  <span className={`font-medium ${activeIndex === index ? 'text-white' : 'text-gray-400'}`}>
                    {feature.title.split(' ')[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
