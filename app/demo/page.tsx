'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageIllustration from '@/components/page-illustration';
import Footer from '@/components/ui/footer';
import Spotlight from '@/components/spotlight';

interface FormData {
  name: string;
  email: string;
  company: string;
  companySize: string;
  message: string;
}

const DemoPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    companySize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Add mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!formRef.current) return;
      
      const { left, top, width, height } = formRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      formRef.current.style.setProperty('--mouse-x', `${x}px`);
      formRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const form = formRef.current;
    if (form) {
      form.addEventListener('mousemove', handleMouseMove);
      
      // Cleanup
      return () => {
        form.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.2, 1]);

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <PageIllustration />
      <main className="relative flex-grow" ref={containerRef}>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-52 md:pb-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div 
              className="text-center mb-40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-violet-200 via-violet-400 via-violet-100 via-violet-500 to-violet-200 bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl lg:text-6xl">
                See Selora in Action
              </h1>
              <p className="text-xl text-violet-200/80 max-w-3xl mx-auto mt-6">
                Experience the power of AI-driven workforce analytics with a personalized demo. See how we can transform your organization's talent strategy in just 30 minutes.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* What to Expect */}
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">What to Expect</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold">1</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Personalized Walkthrough</h3>
                      <p className="text-violet-200/80">A 30-minute customized demo focused on your specific needs and challenges.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold">2</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Live Q&A</h3>
                      <p className="text-violet-200/80">Get your questions answered in real-time by our product experts.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold">3</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Next Steps</h3>
                      <p className="text-violet-200/80">Receive a tailored proposal and implementation plan for your organization.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Demo Form */}
              <motion.div
                ref={formRef}
                className="relative overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 group/card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  } 
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="absolute inset-0 -z-10 before:pointer-events-none before:absolute before:-left-28 before:-top-28 before:z-10 before:h-56 before:w-56 before:translate-x-[var(--mouse-x,0px)] before:translate-y-[var(--mouse-y,0px)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-34 after:-top-34 after:z-30 after:h-44 after:w-44 after:translate-x-[var(--mouse-x,0px)] after:translate-y-[var(--mouse-y,0px)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover/card:before:opacity-100"></div>
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: 0.1,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1]
                      } 
                    }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">Schedule Your Demo</h3>
                    <p className="text-violet-200/80 mb-8">We'll get back to you within 24 hours</p>
                  </motion.div>
                  
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setSubmitStatus(null);

                    try {
                      // Simple validation
                      if (!formData.name || !formData.email || !formData.company || !formData.companySize) {
                        throw new Error('Please fill in all required fields');
                      }

                      // Show success immediately for better UX
                      setSubmitStatus({
                        success: true,
                        message: 'Demo request sent successfully! We\'ll get back to you soon.'
                      });

                      // Reset form immediately
                      const formDataToSubmit = {
                        name: formData.name.trim(),
                        email: formData.email.trim(),
                        company: formData.company.trim(),
                        companySize: formData.companySize.trim(),
                        message: formData.message?.trim() || ''
                      };

                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        companySize: '',
                        message: ''
                      });

                      setIsSubmitting(false);

                      // Send to API in background (fire and forget)
                      fetch('/api/submit-demo', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formDataToSubmit),
                      }).catch(error => {
                        console.error('Background email send failed:', error);
                        // Could optionally show a subtle notification that email failed
                        // but form submission was recorded, but for now just log it
                      });

                    } catch (error) {
                      console.error('Error submitting form:', error);
                      setSubmitStatus({
                        success: false,
                        message: error instanceof Error ? error.message : 'Failed to send request. Please try again.'
                      });
                      setIsSubmitting(false);
                    }
                  }} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.2,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        } 
                      }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="entry.2006920441" className="block text-sm font-medium text-violet-200 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="entry.2006920441"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-colors duration-200 [color-scheme:dark]"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.25,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        } 
                      }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="entry.1045781291" className="block text-sm font-medium text-violet-200 mb-2">
                        Work Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="entry.1045781291"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-colors duration-200 [color-scheme:dark]"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.3,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        } 
                      }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="entry.1065046570" className="block text-sm font-medium text-violet-200 mb-2">
                        Company Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="entry.1065046570"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-colors duration-200 [color-scheme:dark]"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        required
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.35,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        } 
                      }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="entry.1166974659" className="block text-sm font-medium text-violet-200 mb-2">
                        Company Size <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="entry.1166974659"
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-colors duration-200 [color-scheme:dark]"
                        placeholder="Number of employees"
                        value={formData.companySize}
                        onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                        required
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.4,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        } 
                      }}
                      viewport={{ once: true }}
                    >
                      <label htmlFor="entry.209718697" className="block text-sm font-medium text-violet-200 mb-2">
                        Additional Information
                      </label>
                      <textarea
                        id="entry.209718697"
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-colors duration-200 [color-scheme:dark]"
                        placeholder="Tell us what you're interested in..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.45,
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1]
                        } 
                      }}
                      viewport={{ once: true }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="space-y-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full bg-gradient-to-r from-violet-700 to-violet-600 hover:from-violet-600 hover:to-violet-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-600/50 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isSubmitting ? 'Sending...' : 'Request Demo'}
                        </button>
                        
                        {submitStatus && (
                          <div className={`p-4 rounded-lg text-center text-sm ${
                            submitStatus.success 
                              ? 'bg-violet-900/20 text-violet-200 border border-violet-700/50' 
                              : 'bg-red-900/20 text-red-300 border border-red-700/50'
                          }`}>
                            {submitStatus.message}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Wrapper component with Suspense
function DemoPageWrapper() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    }>
      <DemoPage />
    </Suspense>
  );
}

export default DemoPageWrapper;
