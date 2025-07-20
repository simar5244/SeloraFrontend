'use client';

import { useState } from 'react';
import Spotlight from '@/components/spotlight';
import PageIllustration from '@/components/page-illustration';
import Cta from '@/components/cta';
import Footer from '@/components/ui/footer';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How accurate is Selora's AI prediction?",
      answer: 'Our AI algorithms achieve an industry-leading 99.994% accuracy in workforce predictions! This incredible precision comes from our proprietary neural networks trained on millions of data points from diverse organizations worldwide.'
    },
    {
      question: 'What makes Selora different from other HR tools?',
      answer: 'Traditional HR tools show you what happened yesterday. Selora shows you what will happen tomorrow!\n\n• Predictive Analytics: Not just reporting, but forecasting future outcomes\n• 3D Visualization: See your organization as an interactive galaxy\n• Real-time Simulations: Test hiring/firing scenarios before making decisions\n• OrgAI Assistant: Chat with AI that knows everything about your workforce\n• 99.994% Accuracy: Industry-leading precision in predictions\n\nWe\'re not just another dashboard - we\'re your organization\'s crystal ball!'
    },
    {
      question: 'How quickly can we see results?',
      answer: 'For our Enterprise plan, we sync up data on every major data entry event, which can be multiple times a day. For Starter and Standard plans, our algorithms run every 24 hours to provide you with the latest insights.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, absolutely! You can change your plan at any time with just a few clicks. We make it super easy to scale up or down based on your needs.\n\n• Upgrades: Take effect immediately with prorated billing\n• Downgrades: Take effect at your next billing cycle\n• No penalties: Change plans as often as you need\n• Data retention: Your data is always preserved'
    },
    {
      question: 'How secure is my data?',
      answer: 'Your data security is our top priority! We implement military-grade security measures to protect your organizational data.\n\n• Encryption: AES-256 encryption at rest and TLS 1.3 in transit\n• Certifications: Enterprise-grade security measures implemented\n• Access Control: Multi-factor authentication and role-based permissions\n• Monitoring: 24/7 security monitoring and threat detection\n\nWe treat your data like our own - with the utmost care and protection!'
    },
    {
      question: 'Where is my data stored?',
      answer: 'Your data is stored in enterprise-grade data centers with multiple layers of security and redundancy. We use AWS infrastructure with data centers located in:\n\n• Primary: US East (Virginia) and US West (Oregon)\n• EU: Frankfurt, Germany for European customers\n• Backup: Multiple geographic regions for disaster recovery\n\nAll data is encrypted, backed up daily, and can be geo-located based on your compliance requirements.'
    },
    {
      question: 'What integrations do you support?',
      answer: 'We support Microsoft Active Directory, Workday, SAP and CSV upload integrations. The first three cover roughly 80% of our market share. If you don\'t work with any of these, we can pipeline your data directly into the database via CSV.'
    },
    {
      question: 'How fast is the platform?',
      answer: 'Lightning fast! Our platform is built for speed and can handle massive datasets with sub-second response times.\n\n• Query Speed: Less than 200ms average response time\n• Data Processing: 10M+ records processed in real-time\n• Uptime: 99.99% SLA with 24/7 monitoring\n• Scalability: Auto-scales to handle any workload'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageIllustration />
      <main className="flex-grow">
        <section className="relative pb-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-52">
            <div className="mb-32">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-45">
                <h1
                  className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-violet-200 via-violet-400 via-violet-100 via-violet-500 to-violet-200 bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl"
                  data-aos="fade-up"
                >
                  Frequently Asked Questions
                </h1>
                <div className="mx-auto max-w-3xl">
                  <p className="mb-8 text-xl text-violet-200/80" data-aos="fade-up" data-aos-delay={200}>
Everything you need to know about Selora's AI-powered workforce analytics platform. Can't find what you're looking for?                    <a href="mailto:helloselora@gmail.com" className="text-violet-400 hover:text-white transition-colors">
                      Drop us a line!
                    </a>
                  </p>
                </div>
              </div>

              {/* FAQ items */}
              <div className="space-y-4">
                <Spotlight className="grid gap-4 max-w-3xl mx-auto">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="group/card relative overflow-hidden rounded-2xl bg-gray-800/40 border border-gray-700/50 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                    >
                      <button
                        className={`w-full px-6 py-5 text-left flex justify-between items-center ${openIndex === index ? 'bg-gray-800/80' : ''}`}
                        onClick={() => toggleFAQ(index)}
                      >
                        <span className="font-medium text-lg text-white">{faq.question}</span>
                        <svg 
                          className={`w-5 h-5 text-violet-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div 
                        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="text-violet-200/80 space-y-2">
                          {faq.answer.split('\n\n').map((paragraph, pIndex) => (
                            <div key={pIndex} className="mb-4 last:mb-0">
                              {paragraph.split('\n').map((line, lIndex) => (
                                <div key={lIndex} className="mb-1">
                                  {line.startsWith('• ') ? (
                                    <div className="flex items-start">
                                      <span className="mr-2">•</span>
                                      <span>{line.substring(2)}</span>
                                    </div>
                                  ) : (
                                    line
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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

export default FAQPage;
