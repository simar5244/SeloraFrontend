'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PageIllustration from '@/components/page-illustration';
import Footer from '@/components/ui/footer';
import Spotlight from '@/components/spotlight';
import Cta from '@/components/cta';

const CareersPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <PageIllustration />
      <main className="relative flex-grow" ref={containerRef}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-violet-200 via-violet-400 via-violet-100 via-violet-500 to-violet-200 bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl">
                Make Impact Where Decisions Matter
              </h1>
              <p className="text-xl text-violet-200/80 max-w-3xl mx-auto mt-6">
                Join our mission to revolutionize how organizations understand and optimize their most valuable asset: their people. We're building the future of work, and we want you to be part of it.
              </p>
            </motion.div>

            {/* Why Join Us Section */}
            <div className="relative mb-32 pt-20">
              {/* Simple, clean background */}
              <div className="absolute inset-0 -z-10">
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(139, 92, 246, 0.3) 20%, rgba(0,0,0,0) 100%)',
                    transform: 'skewY(-2deg)'
                  }}
                />
              </div>
              <Spotlight>
                <motion.div 
                  className="relative z-10 max-w-4xl mx-auto text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Why Join Us
                    <div className="text-base font-normal text-violet-400 mt-2">
                      Work that matters with people who care
                    </div>
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-violet-200/80 leading-relaxed mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    At Selora, we're not just building software - we're transforming how organizations understand and develop their most valuable asset: their people.
                  </motion.p>

                  <div className="grid md:grid-cols-3 gap-8 text-left mt-16">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-3">Massive Impact</h3>
                      <p className="text-violet-200/80">
                        Your work transforms how organizations understand and develop their most valuable asset—their people.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-3">Cutting-Edge Tech</h3>
                      <p className="text-violet-200/80">
                        Work with the latest AI and ML technologies that process millions of data points with incredible accuracy.
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-3">Accelerated Growth</h3>
                      <p className="text-violet-200/80">
                        Rapid career advancement in a fast-growing startup with unlimited learning opportunities.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </Spotlight>
            </div>

            {/* Benefits Section */}
            <div className="relative py-20 -mx-4 sm:-mx-6 px-4 sm:px-6">
              <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-screen h-[120%] opacity-40">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-violet-500/10 rounded-full blur-3xl" />
                </div>
              </div>
              <div className="relative max-w-6xl mx-auto">
                <Spotlight>
                  <div className="relative z-10">
                    <motion.h2 
                      className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      Benefits & Perks
                      <div className="text-base font-normal text-violet-400 mt-2">
                        We take care of our team
                      </div>
                    </motion.h2>
                    
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="text-xl font-bold text-white mb-3">Competitive Salary</h3>
                        <p className="text-violet-200/80">
                          Top-tier compensation with significant equity upside in our fast-growing startup.
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-xl font-bold text-white mb-3">Unlimited PTO</h3>
                        <p className="text-violet-200/80">
                          Take the time you need to rest, recharge, and come back at your best.
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-xl font-bold text-white mb-3">Team Events</h3>
                        <p className="text-violet-200/80">
                          Quarterly retreats and celebrations to connect with your team.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </Spotlight>
              </div>
            </div>

            {/* Spacer */}
            <div className="py-16"></div>

            {/* Open Positions */}
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
              <Spotlight>
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-white text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Open Positions
                  <div className="text-base font-normal text-violet-400 mt-2">
                    Join our growing team
                  </div>
                </motion.h2>
                
                <div className="grid gap-6 max-w-3xl mx-auto">
                  <a 
                    href="mailto:helloselora@gmail.com?subject=Application for AI/ML Engineer"
                    className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                  >
                    <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 p-6 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                      <h3 className="text-xl font-bold text-white mb-2">AI/ML Engineer</h3>
                      <p className="text-violet-200/80">
                        Build the next generation of predictive analytics and workforce intelligence.
                      </p>
                      <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none">
                          <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"/>
                        </svg>
                      </div>
                    </div>
                  </a>

                  <a 
                    href="mailto:helloselora@gmail.com?subject=Application for Full-Stack Developer"
                    className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                  >
                    <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 p-6 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                      <h3 className="text-xl font-bold text-white mb-2">Full-Stack Developer</h3>
                      <p className="text-violet-200/80">
                        Create seamless, intuitive experiences that make complex data accessible.
                      </p>
                      <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none">
                          <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"/>
                        </svg>
                      </div>
                    </div>
                  </a>

                  <a 
                    href="mailto:helloselora@gmail.com?subject=Application for Product Designer"
                    className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                  >
                    <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 p-6 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                      <h3 className="text-xl font-bold text-white mb-2">Product Designer</h3>
                      <p className="text-violet-200/80">
                        Shape the future of work through thoughtful, human-centered design.
                      </p>
                      <div className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none">
                          <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              </Spotlight>
            </div>
          </div>
        </section>
      </main>
      
      <Cta />
      
      <Footer />
    </div>
  );
};

export default CareersPage;
