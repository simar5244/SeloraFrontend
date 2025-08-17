'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import FeaturesIllustration from './FeaturesIllustration';
import PageIllustration from '@/components/page-illustration';
import OptimizedVideo from '@/components/optimized-video';
import AnimatedModal from '@/components/animated-modal';
import PreloadTrigger from '@/components/preload-trigger';

const ERPIntegrationsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/giferp.webm"
    title="ERP Integrations"
    description="Connect seamlessly with any ERP system including SAP, Microsoft Dynamics, PeopleSoft, and more. Import/export data via CSV for maximum compatibility with your existing systems."
    features={[
      "Direct integration with major ERP systems",
      "Simple CSV import/export for any system",
      "Real-time data synchronization",
      "Custom field mapping for any data structure"
    ]}
  />
);

const PerformanceEvalModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/giffeedback.webm"
    title="Performance Evaluation"
    description="Our innovative evaluation system uses a proprietary algorithm to provide fair, bias-adjusted performance insights that focus on growth and development."
    features={[
      "Patented algorithm that adjusts for rater biases",
      "Focuses on continuous improvement, not just ratings",
      "Simple, streamlined process that respects everyone's time",
      "Actionable insights for both employees and managers"
    ]}
  />
);

const OrgAIModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/GIFORGAI.webm"
    title="Org AI"
    description="Get instant answers about your company, employees, and projects with our AI assistant. Ask anything and receive comprehensive, accurate responses in real-time."
    features={[
      "Ask questions about any employee, project, or company data",
      "Get instant, accurate responses with source references",
      "Natural language understanding for complex queries",
      "24/7 availability for all your organizational queries"
    ]}
  />
);

const UserManagementModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/gifusermanagement.webm"
    title="User Management"
    description="Manage users who can access the app. Multi-factor authentication and admin approval required for access. Simplified interface for editing roles, deleting records, and searching employees."
    features={[
      "Multi-factor authentication required for all users",
      "Admin approval required for new user access",
      "Easily manage user roles and permissions",
      "Powerful search and filtering for employee records"
    ]}
  />
);

const ReportGenerationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/gifreport.webm"
    title="Advanced Report Generation"
    description="Create comprehensive reports with specific writing styles and web scraping if necessary for additional context. Add custom visuals and automated scheduling. Export to multiple formats including PDF and DOCX, with full version control. Imagine ChatGPT integrated with MS Word."
    features={[
      "Schedule automated reports at custom intervals (daily, weekly, monthly, etc.)",
      "Use AI to generate insights and suggestions for your reports",
      "Use AI to ask for edits, different charts etc. Export to PDF and DOCX",
      "Track changes with complete version history and rollback options"
    ]}
  />
);

const ProjectManagementModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/gifprojects.webm"
    title="Project Management"
    description="Manage all your projects in one place with our comprehensive project management solution. Streamline workflows, track progress, and ensure successful project delivery."
    features={[
      "Track all major project metrics, from budget to status, from timeline to priority",
      "Manage team assignments and permissions, restrict which employee categories can access each project",
      "Use our AI to find the right team for each project. Unlike generic AI tools, our AI takes into account several soft factors like if the group of employees have good social cohesion with each other, do they have the skills to compliment each other, etc.",
      "We also suggest what duty, role and tool should each employee use. Easily search and filter projects, and edit any and every aspect of them"
    ]}
  />
);

const ObjectiveMappingModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/goals.webm"
    title="Objective Mapping"
    description="Turn strategy into outcomes: trace every objective to the initiatives, projects, and people that move the needle—spot direct and indirect impact, frontline owners, and silent heroes, down to KPI timelines."
    features={[
      "Map company objectives to initiatives, projects, and tasks (OKR alignment)",
      "Identify direct vs. indirect contribution paths across the org",
      "Spot 'frontline' impact owners and unsung 'silent heroes'",
      "Drill down from company KPIs to individual contributions and timelines"
    ]}
  />
);

export default function Features() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isOrgAIModalOpen, setIsOrgAIModalOpen] = useState(false);
  const [isPerfEvalModalOpen, setIsPerfEvalModalOpen] = useState(false);
  const [isERPModalOpen, setIsERPModalOpen] = useState(false);
  const [isObjectiveModalOpen, setIsObjectiveModalOpen] = useState(false);
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-700/25 py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-violet-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-violet-200/50">
              <span className="inline-flex bg-gradient-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                Advanced Analytics
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-gray-200 via-violet-200 via-gray-50 via-violet-300 to-gray-200 bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            Most HR platforms show you what happened yesterday. Selora shows you what will happen tomorrow.
            </h2>
            <p className="text-lg text-violet-200/80">
              Selora provides powerful insights into your organization's health,
              helping you make data-driven decisions to optimize team performance
              and employee satisfaction.
            </p>
          </div>
          <div className="flex justify-center pb-4 md:pb-12" data-aos="fade-up">
            <FeaturesIllustration />
          </div>
          {/* Items */}
          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            <PreloadTrigger
              videoSrc="/optimized/gifprojects.webm"
              onClick={() => setIsProjectModalOpen(true)}
              className="relative"
            >
              <article className="group cursor-pointer">
                <svg
                  className="mb-3 fill-violet-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M0 0h14v17H0V0Zm2 2v13h10V2H2Z" />
                  <path
                    fillOpacity="0.48"
                    d="m16.295 5.393 7.528 2.034-4.436 16.412L5.87 20.185l.522-1.93 11.585 3.132 3.392-12.55-5.597-1.514.522-1.93Z"
                  />
                </svg>
                <h3 className="relative inline-block mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-violet-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    Project Management
                  </span>
                </h3>
                <p className="text-violet-200/65 group-hover:text-violet-200 transition-colors duration-300">
                  Manage all projects under one roof. Edit employee access permissions, filter projects, and track status updates. Find the right people for each project using AI.
                </p>
              </article>
            </PreloadTrigger>
            <PreloadTrigger
              videoSrc="/optimized/gifreport.webm"
              onClick={() => setIsReportModalOpen(true)}
              className="relative"
            >
              <article className="group cursor-pointer">
                <svg
                  className="mb-3 fill-violet-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h7v-2h-5V7z" />
                </svg>
                <h3 className="relative inline-block mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-violet-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    Report Generation
                  </span>
                </h3>
                <p className="text-violet-200/65 group-hover:text-violet-200 transition-colors duration-300">
                  Create, schedule, and export detailed reports with custom visuals. Use AI to generate insights and track changes with version control.
                </p>
              </article>
            </PreloadTrigger>
            <PreloadTrigger
              videoSrc="/optimized/gifusermanagement.webm"
              onClick={() => setIsUserModalOpen(true)}
              className="relative"
            >
              <article className="group cursor-pointer">
                <svg
                  className="mb-3 fill-violet-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <h3 className="relative inline-block mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-violet-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    User Management
                  </span>
                </h3>
                <p className="text-violet-200/65 group-hover:text-violet-200 transition-colors duration-300">
                  Manage users you let into the app. MFA and admin approval needed for access. Edit roles, delete records, and search employees with ease.
                </p>
              </article>
            </PreloadTrigger>
            <PreloadTrigger
              videoSrc="/optimized/GIFORGAI.webm"
              onClick={() => setIsOrgAIModalOpen(true)}
              className="relative"
            >
              <article className="group cursor-pointer">
                <svg
                  className="mb-3 fill-violet-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1.5c-1.5 0-3 .5-4.2 1.4-1.2.9-2 2.3-2.3 3.9-.3 1.5 0 3.1.9 4.3.9 1.2 2.3 2 3.8 2.2v1.5h3v-1.5c1.5-.2 2.8-1 3.7-2.2.9-1.2 1.2-2.8.9-4.3-.3-1.6-1.1-3-2.3-3.9C15 2 13.5 1.5 12 1.5zm-1.5 6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm3 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zM9 15c-1.1 0-2 .9-2 2v3h2v-3h6v3h2v-3c0-1.1-.9-2-2-2H9z"/>
                </svg>
                <h3 className="relative inline-block mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-violet-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    Org AI
                  </span>
                </h3>
                <p className="text-violet-200/65 group-hover:text-violet-200 transition-colors duration-300">
                  Ask anything about your company, employees, and projects. Get quick, comprehensive responses with our AI assistant.
                </p>
              </article>
            </PreloadTrigger>
            <PreloadTrigger
              videoSrc="/optimized/giffeedback.webm"
              onClick={() => setIsPerfEvalModalOpen(true)}
              className="relative"
            >
              <article className="group cursor-pointer">
                <svg
                  className="mb-3 fill-violet-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <h3 className="relative inline-block mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-violet-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    Performance Evaluation
                  </span>
                </h3>
                <p className="text-violet-200/65 group-hover:text-violet-200 transition-colors duration-300">
                  World's first fair, bias-adjusted, no-negative-connotations-ever feedback evaluation system using our proprietary algorithms. Focus on growth, not just ratings.
                </p>
              </article>
            </PreloadTrigger>
            <PreloadTrigger
              videoSrc="/optimized/giferp.webm"
              onClick={() => setIsERPModalOpen(true)}
              className="relative"
            >
              <article className="group cursor-pointer">
                <svg
                  className="mb-3 fill-violet-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                >
                  <path
                    fillOpacity=".48"
                    d="M12 8.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                  />
                  <path d="m7.454 2.891.891-.454L7.437.655l-.891.454a12 12 0 0 0 0 21.382l.89.454.91-1.781-.892-.455a10 10 0 0 1 0-17.818ZM17.456 1.11l-.891-.454-.909 1.782.891.454a10 10 0 0 1 0 17.819l-.89.454.908 1.781.89-.454a12 12 0 0 0 0-21.382Z" />
                </svg>
                <h3 className="relative inline-block mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-violet-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    ERP Integrations
                  </span>
                </h3>
                <p className="text-violet-200/65 group-hover:text-violet-200 transition-colors duration-300">
                  Connect your SAP, Microsoft Dynamics, PeopleSoft, or any other system via CSV. Seamless data integration for your existing workflows.
                </p>
              </article>
            </PreloadTrigger>
            <PreloadTrigger
              videoSrc="/optimized/goals.webm"
              onClick={() => setIsObjectiveModalOpen(true)}
              className="relative"
            >
              <article className="group cursor-pointer">
                <svg
                  className="mb-3 fill-violet-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 1 0 10 10h-2A8 8 0 1 1 12 4V2Z" />
                  <path fillOpacity="0.48" d="M12 6a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6Z"/>
                  <path d="M12 10a2 2 0 1 0 2 2h6v-2h-6a2 2 0 0 0-2-2Z" />
                </svg>
                <h3 className="relative inline-block mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  <span className="relative">
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-violet-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    Objective Mapping
                  </span>
                </h3>
                <p className="text-violet-200/65 group-hover:text-violet-200 transition-colors duration-300">
                  See strategy-to-execution in one view. Know what projects drive each objective, who’s on the front lines, and who the silent heroes are—down to KPIs and timelines.
                </p>
              </article>
            </PreloadTrigger>
          </div>
        </div>
      </div>
      
      {/* Project Management Modal */}
      <ProjectManagementModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />
      <ReportGenerationModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
      <UserManagementModal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)} 
      />
      <OrgAIModal 
        isOpen={isOrgAIModalOpen} 
        onClose={() => setIsOrgAIModalOpen(false)} 
      />
      <PerformanceEvalModal 
        isOpen={isPerfEvalModalOpen} 
        onClose={() => setIsPerfEvalModalOpen(false)} 
      />
      <ERPIntegrationsModal
        isOpen={isERPModalOpen}
        onClose={() => setIsERPModalOpen(false)}
      />
      <ObjectiveMappingModal 
        isOpen={isObjectiveModalOpen} 
        onClose={() => setIsObjectiveModalOpen(false)} 
      />
    </section>
  );
}
