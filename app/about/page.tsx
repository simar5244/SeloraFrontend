'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageIllustration from '@/components/page-illustration';
import Footer from '@/components/ui/footer';
import Spotlight from '@/components/spotlight';
import Cta from '@/components/cta';

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smoother parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <PageIllustration />
      <main className="flex-grow relative" ref={containerRef}>
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
                Building a Better Future of Work
              </h1>
              <p className="text-xl text-violet-200/80 max-w-3xl mx-auto mt-6">
                At Selora, we transform complex workforce data into actionable insights, enabling organizations to make smarter decisions, foster growth, and build the future of work.
              </p>
            </motion.div>

            {/* Mission Section */}
            <div className="relative mb-32 pt-20">
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
                    Our Mission
                    <div className="text-base font-normal text-violet-400 mt-2">
                      What drives us forward
                    </div>
                  </motion.h2>
                  <motion.p 
                    className="text-xl text-violet-200/80 leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    In a world where data drives decisions, workforce management remains surprisingly archaic. Selora was born from a simple belief: organizations deserve better tools to understand and optimize their most valuable asset—their people.
                  </motion.p>
                  <motion.p 
                    className="text-xl text-violet-200/80 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Our founders, veterans in both enterprise technology and organizational psychology, saw firsthand how poor workforce visibility leads to reactive decisions, talent churn, and missed opportunities. We’re changing that.
                  </motion.p>
                </motion.div>
                
                {/* Subtle background elements */}
                <motion.div 
                  className="absolute -left-40 top-1/2 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl -z-10"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 0.8, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                />
              </Spotlight>
            </div>

            {/* Values Section */}
            <div className="relative mb-32">
              <Spotlight>
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Our Values
                  <div className="text-base font-normal text-violet-400 mt-2">
                    Principles that guide our work
                  </div>
                </motion.h2>
                
                <div className="space-y-24 max-w-4xl mx-auto">
                  {/* Value 1 */}
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >

                    <h3 className="text-2xl font-bold text-white mb-4">Data-Driven Excellence</h3>
                    <p className="text-lg text-violet-200/80 pl-8 border-l-2 border-violet-500/30">
                      We let data guide our decisions, not hunches. Every feature is validated through rigorous testing and real-world application.
                    </p>
                  </motion.div>

                  {/* Value 2 */}
                  <motion.div 
                    className="relative ml-auto text-right"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >

                    <h3 className="text-2xl font-bold text-white mb-4">Privacy First</h3>
                    <p className="text-lg text-violet-200/80 pr-8 border-r-2 border-violet-500/30">
                      We implement enterprise-grade security measures to protect your data, because trust is the foundation of everything we do.
                    </p>
                  </motion.div>

                  {/* Value 3 */}
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >

                    <h3 className="text-2xl font-bold text-white mb-4">Relentless Innovation</h3>
                    <p className="text-lg text-violet-200/80 pl-8 border-l-2 border-violet-500/30">
                      We’re constantly pushing boundaries, exploring new technologies, and challenging the status quo of workforce analytics.
                    </p>
                  </motion.div>
                </div>
              </Spotlight>
            </div>

            {/* Vision Section */}
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
                      className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      Our Vision
                      <div className="text-base font-normal text-violet-400 mt-2">
                        The future we’re building towards
                      </div>
                    </motion.h2>
                    
                    <motion.div 
                      className="max-w-3xl mx-auto text-center"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-xl text-violet-200/80 mb-12">
                        We envision a world where every organization operates at its full potential by truly understanding and empowering its people.
                      </p>
                      
                      <div className="space-y-6 text-left max-w-2xl mx-auto">
                        <motion.div 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex-shrink-0 mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-violet-400 mt-2"></div>
                          </div>
                          <p className="ml-4 text-lg text-violet-200/80">
                            Make every workforce decision data-driven and bias-free
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="flex-shrink-0 mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-violet-400 mt-2"></div>
                          </div>
                          <p className="ml-4 text-lg text-violet-200/80">
                            Predict and prevent employee burnout before it happens
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex-shrink-0 mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-violet-400 mt-2"></div>
                          </div>
                          <p className="ml-4 text-lg text-violet-200/80">
                            Create the most engaged and productive workforce in history
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Subtle background elements */}
                  <motion.div 
                    className="absolute -left-40 top-1/2 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl -z-10"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 0.8, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                  />
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

export default AboutPage;
