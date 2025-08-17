'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import PageIllustration from '@/components/page-illustration';
import Footer from '@/components/ui/footer';
import Spotlight from '@/components/spotlight';
import Cta from '@/components/cta';
import OptimizedVideo from '@/components/optimized-video';

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState([false, false, false]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);

  // Enhanced step transition with morphing effect
  const handleStepChange = (newStep: number) => {
    if (newStep === currentStep || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 50);
  };

  // Custom video loop handler with 5-second pause
  const handleVideoEnd = () => {
    const currentVideo = videoRefs.current[currentStep];
    if (currentVideo) {
      setTimeout(() => {
        if (currentVideo) {
          currentVideo.currentTime = 0;
          currentVideo.play();
        }
      }, 5000); // 5 second pause
    }
  };

  // Preload all videos immediately
  useEffect(() => {
    const videos = [
      '/optimized/admin1.webm',
      '/optimized/employee1.webm',
      '/optimized/adminapproval.webm'
    ];

    videos.forEach((src, index) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', ''); // For iOS
      video.setAttribute('muted', ''); // For autoplay on mobile
      video.setAttribute('autoplay', ''); // For autoplay on mobile
      video.src = src;

      video.addEventListener('canplay', () => {
        // Force play on mobile
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Autoplay prevented:', error);
            // Try again with user interaction
            const handleFirstInteraction = () => {
              video.play().catch(console.warn);
              document.removeEventListener('click', handleFirstInteraction);
              document.removeEventListener('touchstart', handleFirstInteraction);
            };
            document.addEventListener('click', handleFirstInteraction);
            document.addEventListener('touchstart', handleFirstInteraction);
          });
        }

        setIsVideoLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      });

      // Fallback to .mov if webm fails
      video.addEventListener('error', () => {
        const fallbackSrc = src.replace('/optimized/', '/').replace('.webm', '.mov');
        video.src = fallbackSrc;
      });
    });
  }, []);

  const steps = [
    {
      title: "Sign Your Company Up",
      description: "Enter work email, choose password, select plan, complete payment. You'll get a unique company code.",
      video: "/optimized/admin1.webm",
      fallback: "/admin1.mov",
      poster: "/optimized/admin1-poster.webp",
      color: "from-violet-500 to-purple-600",
      number: 1
    },
    {
      title: "Distribute Your Code",
      description: "Share your unique company code with employees. They'll enter it for quick and easy signup - no lengthy forms.",
      video: "/optimized/employee1.webm",
      fallback: "/employee1.mov",
      poster: "/optimized/employee1-poster.webp",
      color: "from-purple-600 to-indigo-600",
      number: 2
    },
    {
      title: "Approve Team Members",
      description: "Review and approve employee signups in your admin dashboard. Click accept to grant platform access. That's it! Your team is now ready to use Selora.",
      video: "/optimized/adminapproval.webm",
      fallback: "/adminapproval.mov",
      poster: "/optimized/adminapproval-poster.webp",
      color: "from-indigo-600 to-violet-500",
      number: 3
    }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <PageIllustration />
      <main className="flex-grow relative" ref={containerRef}>
        {/* Hero Section */}
        <section className="relative pb-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-52">
            <div className="mb-32">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-45">
                <motion.h1
                  className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-violet-200 via-violet-400 via-violet-100 via-violet-500 to-violet-200 bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Get Your Team Onboarded in Minutes
                </motion.h1>
                <div className="mx-auto max-w-3xl">
                  <motion.p
                    className="mb-8 text-xl text-violet-200/80"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    Our streamlined onboarding process gets your entire organization up and running with Selora in just 3 simple steps.
                  </motion.p>
                </div>
              </div>

              {/* Interactive Step Navigator */}
              <div className="relative mb-32">
                <Spotlight>
                  {/* Floating Particles Background */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-violet-400/20 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          x: [0, Math.random() * 200 - 100],
                          y: [0, Math.random() * 200 - 100],
                          opacity: [0.2, 0.8, 0.2],
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: Math.random() * 10 + 5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut',
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 max-w-5xl mx-auto">
                    {/* Step Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: 1,
                          transition: { 
                            duration: 0.5,
                            ease: [0.2, 0, 0, 1]
                          }
                        }}
                        exit={{ 
                          opacity: 0,
                          transition: { 
                            duration: 0.4,
                            ease: [0.2, 0, 0, 1]
                          }
                        }}
                        className="grid md:grid-cols-2 gap-12 items-center"
                      >
                        {/* Text Content */}
                        <div className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="mb-4">
                              <span className="text-base font-medium text-violet-300">
                                Step {steps[currentStep].number} of {steps.length}
                              </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                              {steps[currentStep].title}
                            </h2>
                            <p className="text-lg text-violet-200/80 leading-relaxed">
                              {steps[currentStep].description}
                            </p>
                          </motion.div>

                          {/* Navigation Buttons */}
                          <motion.div
                            className="flex space-x-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {currentStep > 0 && (
                              <motion.button
                                onClick={() => handleStepChange(currentStep - 1)}
                                className="px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white transition-all border border-white/10 hover:border-white/20"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Previous
                              </motion.button>
                            )}
                            {currentStep < steps.length - 1 && (
                              <motion.button
                                onClick={() => handleStepChange(currentStep + 1)}
                                className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-violet-600 to-violet-500 text-white hover:shadow-lg hover:shadow-violet-500/20 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                Next Step
                              </motion.button>
                            )}
                          </motion.div>
                        </div>

                        {/* Video Content */}
                        <motion.div
                          className="relative"
                          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                          transition={{ delay: 0.3, duration: 0.6 }}
                        >
                          {/* Data Flow Animation */}
                          <div className="absolute -inset-4 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-violet-400 rounded-full"
                                style={{
                                  left: `${10 + i * 15}%`,
                                  top: `${20 + (i % 2) * 60}%`,
                                }}
                                animate={{
                                  x: [0, 300, 0],
                                  opacity: [0, 1, 0],
                                  scale: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  delay: i * 0.5,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>

                          <div className="relative shadow-2xl shadow-black/50" style={{ overflow: 'hidden' }}>
                            <video
                              ref={(el) => {
                                videoRefs.current[currentStep] = el;
                                if (el) {
                                  const playPromise = el.play();
                                  if (playPromise !== undefined) {
                                    playPromise.catch(error => {
                                      console.log('Autoplay prevented:', error);
                                    });
                                  }
                                }
                              }}
                              className="w-full h-auto block"
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                              onPlay={(e) => {
                                if (e.currentTarget.paused) {
                                  const playPromise = e.currentTarget.play();
                                  if (playPromise !== undefined) {
                                    playPromise.catch(error => {
                                      console.log('Autoplay prevented on play:', error);
                                    });
                                  }
                                }
                              }}
                              poster={steps[currentStep].poster}
                              onEnded={handleVideoEnd}
                              onCanPlay={(e) => {
                                const playPromise = e.currentTarget.play();
                                if (playPromise !== undefined) {
                                  playPromise.catch(error => {
                                    console.log('Autoplay prevented on canplay:', error);
                                  });
                                }
                              }}
                              style={{ display: 'block' }}
                            >
                              <source src={steps[currentStep].video} type="video/webm" />
                              <source src={steps[currentStep].fallback} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </Spotlight>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Cta />
      <Footer />
    </div>
  );
};

export default OnboardingPage;
