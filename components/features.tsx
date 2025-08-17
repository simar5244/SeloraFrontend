'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import FeaturesIllustration from './FeaturesIllustration';
import PageIllustration from '@/components/page-illustration';
import OptimizedVideo from '@/components/optimized-video';
import AnimatedModal from '@/components/animated-modal';
import PreloadTrigger from '@/components/preload-trigger';
import Spotlight from '@/components/spotlight';

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
    videoSrc="/optimized/gif3.webm"
    title="3D Mapping"
    description="Navigate your organization in 3D. Track skills, reporting lines, and cross-functional ties to uncover hidden talent and structural insights."
    features={[
      "Interactive 3D visualization of your entire organization",
      "View team structures, project relationships, and employee connections",
      "Zoom, pan, and rotate for different perspectives",
      "Click on any node for detailed information and insights"
    ]}
  />
);

// Refined static SVG icons (external UI only)
const ProjectBarsIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <rect x="8" y="36" width="10" height="20" rx="3" fill="url(#g1)" />
    <rect x="24" y="28" width="10" height="28" rx="3" fill="url(#g1)" opacity=".9" />
    <rect x="40" y="18" width="10" height="38" rx="3" fill="url(#g1)" opacity=".8" />
  </svg>
);

const ReportPieIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="18" stroke="#a78bfa" strokeWidth="3" opacity=".35" />
    <path d="M32 14a18 18 0 0 1 18 18H32V14z" fill="#a78bfa" />
    <circle cx="32" cy="32" r="6" fill="#6366f1" />
  </svg>
);

const UserAvatarIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 64 64" fill="none">
    <circle cx="22" cy="22" r="8" stroke="#a78bfa" strokeWidth="3" />
    <circle cx="42" cy="22" r="8" stroke="#6366f1" strokeWidth="3" />
    <rect x="14" y="36" width="36" height="14" rx="7" stroke="#a78bfa" strokeWidth="3" />
  </svg>
);

const OrgNodesIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="4" fill="#a78bfa" />
    <circle cx="14" cy="18" r="3" fill="#6366f1" />
    <circle cx="50" cy="18" r="3" fill="#6366f1" />
    <circle cx="14" cy="46" r="3" fill="#6366f1" />
    <circle cx="50" cy="46" r="3" fill="#6366f1" />
    <line x1="32" y1="32" x2="14" y2="18" stroke="#a78bfa" strokeOpacity=".4" />
    <line x1="32" y1="32" x2="50" y2="18" stroke="#a78bfa" strokeOpacity=".35" />
    <line x1="32" y1="32" x2="14" y2="46" stroke="#a78bfa" strokeOpacity=".35" />
    <line x1="32" y1="32" x2="50" y2="46" stroke="#a78bfa" strokeOpacity=".35" />
  </svg>
);

const StarPulseIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 64 64" fill="none">
    <path d="M32 8l6.5 13.2L53 23l-9.5 9.3L46 48l-14-7.5L18 48l2.5-15.7L11 23l14.5-1.8L32 8z" fill="#a78bfa" opacity=".9" />
  </svg>
);

const RingsIcon = () => (
  <svg className="h-16 w-16" viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="18" stroke="#a78bfa" strokeWidth="3" opacity=".35" />
    <circle cx="32" cy="32" r="12" stroke="#6366f1" strokeWidth="3" strokeDasharray="8 8" />
    <circle cx="32" cy="32" r="6" fill="#a78bfa" />
  </svg>
);

// Small 20x20 futuristic glyphs (one per card)
const BarsGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="12" width="3" height="6" rx="1.2" fill="#8b5cf6" />
    <rect x="8.5" y="9" width="3" height="9" rx="1.2" fill="#a78bfa" />
    <rect x="14" y="6" width="3" height="12" rx="1.2" fill="#6366f1" />
  </svg>
);
const PieGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="6" stroke="#a78bfa" strokeWidth="2" opacity="0.6" />
    <path d="M10 4a6 6 0 0 1 6 6h-6V4z" fill="#8b5cf6" />
  </svg>
);
const UsersGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="8" r="3" stroke="#a78bfa" strokeWidth="1.5" />
    <circle cx="13.5" cy="8" r="2.5" stroke="#6366f1" strokeWidth="1.5" />
    <rect x="3.5" y="12" width="9" height="5" rx="2.5" stroke="#a78bfa" strokeWidth="1.5" />
  </svg>
);
const NodesGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="2" fill="#a78bfa" />
    <circle cx="4" cy="6" r="1.5" fill="#6366f1" />
    <circle cx="16" cy="6" r="1.5" fill="#6366f1" />
    <circle cx="4" cy="14" r="1.5" fill="#6366f1" />
    <circle cx="16" cy="14" r="1.5" fill="#6366f1" />
    <path d="M10 10L4 6M10 10l6-4M10 10l-6 4M10 10l6 4" stroke="#a78bfa" opacity="0.5" />
  </svg>
);
const RingsGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="6" stroke="#a78bfa" strokeWidth="1.5" opacity="0.45" />
    <circle cx="10" cy="10" r="4" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
  </svg>
);
const StarGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3l2.2 4.5 5 .6-3.7 3.5 1 4.9L10 14.8 5.5 16.5l1-4.9L2.8 8.1l5-.6L10 3z" fill="#a78bfa" />
  </svg>
);

// Unique glyph for 3D Mapping
const CubeGlyph = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2l7 4v8l-7 4-7-4V6l7-4z" stroke="#8b5cf6" strokeWidth="1.5" fill="none" />
    <path d="M3 6l7 4 7-4" stroke="#a78bfa" strokeWidth="1.5" />
    <path d="M10 18V10" stroke="#6366f1" strokeWidth="1.5" />
  </svg>
);


export default function Features() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isOrgAIModalOpen, setIsOrgAIModalOpen] = useState(false);
  const [isPerfEvalModalOpen, setIsPerfEvalModalOpen] = useState(false);
  const [isERPModalOpen, setIsERPModalOpen] = useState(false);
  const [isObjectiveModalOpen, setIsObjectiveModalOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  // Center the first card on initial load
  useEffect(() => {
    const scroller = scrollerRef.current;
    const first = firstCardRef.current;
    if (!scroller || !first) return;
    // Only center on desktop (md and up)
    if (typeof window !== 'undefined' && !window.matchMedia('(min-width: 768px)').matches) {
      return;
    }
    // Wait for layout
    requestAnimationFrame(() => {
      const target = first.offsetLeft - (scroller.clientWidth - first.clientWidth) / 2;
      scroller.scrollTo({ left: Math.max(0, target), behavior: 'auto' });
    });
  }, []);
  const scrollRow = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.85);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

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
          <div className="flex justify-center pb-3 md:pb-8" data-aos="fade-up">
            <FeaturesIllustration />
          </div>
          {/* Items: single horizontal row with bottom arrows, wrapped in Spotlight for purple hover */}
          <Spotlight className="group mx-auto max-w-6xl">
          <div ref={scrollerRef} className="overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] mx-auto">
            <div className="flex flex-nowrap gap-4 pr-12 md:pl-[calc((100%_-_352px)/2)] md:pr-[calc((100%_-_352px)/2_+_6rem)]">
            <PreloadTrigger videoSrc="/optimized/gifprojects.webm" onClick={() => setIsProjectModalOpen(true)} className="relative">
              <motion.article ref={firstCardRef} className="group/card relative overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer w-[294px] md:w-[352px] h-[189px] md:h-[210px] shrink-0">
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="p-5 pt-6 pb-6 flex flex-col gap-1.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Project Management
                      </span>
                    </span>
                    <div className="shrink-0 text-violet-200/80"><BarsGlyph /></div>
                  </div>
                  <p className="text-xs md:text-sm text-violet-200/70 group-hover:text-violet-100/90 transition-colors">
                  Manage all projects under one roof. Edit employee access permissions, filter projects, and track status updates. Find the right people for each project using AI.                  </p>
                  <div className="mt-auto pb-1 flex items-center justify-end">
                    <div className="absolute right-3 bottom-3 z-50 grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.article>
            </PreloadTrigger>

            <PreloadTrigger videoSrc="/optimized/giffeedback.webm" onClick={() => setIsPerfEvalModalOpen(true)} className="relative">
              <motion.article className="group/card relative overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer w-[294px] md:w-[352px] h-[189px] md:h-[210px] shrink-0">
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="p-5 pt-6 pb-6 flex flex-col gap-1.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Performance Evaluation
                      </span>
                    </span>
                    <div className="shrink-0 text-violet-200/80"><StarGlyph /></div>
                  </div>
                  <p className="text-xs md:text-sm text-violet-200/70 group-hover:text-violet-100/90 transition-colors">
                  World's first fair, bias-adjusted, no-negative-connotations-ever feedback evaluation system using our proprietary algorithms. Focus on growth, not just ratings.                  </p>
                  <div className="mt-auto pb-1 flex items-center justify-end">
                    <div className="absolute right-3 bottom-3 z-50 grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.article>
            </PreloadTrigger>

            <PreloadTrigger videoSrc="/optimized/goals.webm" onClick={() => setIsObjectiveModalOpen(true)} className="relative">
              <motion.article className="group/card relative overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer w-[294px] md:w-[352px] h-[189px] md:h-[210px] shrink-0">
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="p-5 pt-6 pb-6 flex flex-col gap-1.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        3D Mapping
                      </span>
                    </span>
                    <div className="shrink-0 text-violet-200/80"><CubeGlyph /></div>
                  </div>
                  <p className="text-xs md:text-sm text-violet-200/70 group-hover:text-violet-100/90 transition-colors">
                    Navigate your org in 3D and reveal hidden structure. Track skills, reporting lines, and cross-functional ties.
                  </p>
                  <div className="mt-auto pb-1 flex items-center justify-end">
                    <div className="absolute right-3 bottom-3 z-50 grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.article>
            </PreloadTrigger>

            <PreloadTrigger videoSrc="/optimized/giferp.webm" onClick={() => setIsERPModalOpen(true)} className="relative">
              <motion.article className="group/card relative overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer w-[294px] md:w-[352px] h-[189px] md:h-[210px] shrink-0">
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="p-5 pt-6 pb-6 flex flex-col gap-1.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        ERP Integrations
                      </span>
                    </span>
                    <div className="shrink-0 text-violet-200/80"><RingsGlyph /></div>
                  </div>
                  <p className="text-xs md:text-sm text-violet-200/70 group-hover:text-violet-100/90 transition-colors">
                  Connect your SAP, Microsoft Dynamics, PeopleSoft, or any other system via CSV. Seamless data integration for your existing workflows.                  </p>
                  <div className="mt-auto pb-1 flex items-center justify-end">
                    <div className="absolute right-3 bottom-3 z-50 grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.article>
            </PreloadTrigger>

            <PreloadTrigger videoSrc="/optimized/GIFORGAI.webm" onClick={() => setIsOrgAIModalOpen(true)} className="relative">
              <motion.article className="group/card relative overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer w-[294px] md:w-[352px] h-[189px] md:h-[210px] shrink-0">
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="p-5 pt-6 pb-6 flex flex-col gap-1.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Org AI
                      </span>
                    </span>
                    <div className="shrink-0 text-violet-200/80"><NodesGlyph /></div>
                  </div>
                  <p className="text-xs md:text-sm text-violet-200/70 group-hover:text-violet-100/90 transition-colors">
                  Ask anything about your company, employees, and projects. Get quick, comprehensive responses with our AI assistant.                  </p>
                  <div className="mt-auto pb-1 flex items-center justify-end">
                    <div className="absolute right-3 bottom-3 z-50 grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.article>
            </PreloadTrigger>

            <PreloadTrigger videoSrc="/optimized/gifreport.webm" onClick={() => setIsReportModalOpen(true)} className="relative">
              <motion.article className="group/card relative overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer w-[294px] md:w-[352px] h-[189px] md:h-[210px] shrink-0">
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="p-5 pt-6 pb-6 flex flex-col gap-1.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Report Generation
                      </span>
                    </span>
                    <div className="shrink-0 text-violet-200/80"><PieGlyph /></div>
                  </div>
                  <p className="text-xs md:text-sm text-violet-200/70 group-hover:text-violet-100/90 transition-colors">
                  Create, schedule, and export detailed reports with custom visuals. Use AI to generate insights and track changes with version control.                  </p>
                  <div className="mt-auto pb-1 flex items-center justify-end">
                    <div className="absolute right-3 bottom-3 z-50 grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.article>
            </PreloadTrigger>

            <PreloadTrigger videoSrc="/optimized/gifusermanagement.webm" onClick={() => setIsUserModalOpen(true)} className="relative">
              <motion.article className="group/card relative overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer w-[294px] md:w-[352px] h-[189px] md:h-[210px] shrink-0">
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  <div className="p-5 pt-6 pb-6 flex flex-col gap-1.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        User Management
                      </span>
                    </span>
                    <div className="shrink-0 text-violet-200/80"><UsersGlyph /></div>
                  </div>
                  <p className="text-xs md:text-sm text-violet-200/70 group-hover:text-violet-100/90 transition-colors">
                  Manage users you let into the app. MFA and admin approval needed for access. Edit roles, delete records, and search employees with ease.                  </p>
                  <div className="mt-auto pb-1 flex items-center justify-end">
                    <div className="absolute right-3 bottom-3 z-50 grid h-9 w-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 group-hover:bg-white/10 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M4 10h12" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.article>
            </PreloadTrigger>
            </div>
          </div>
          </Spotlight>
          <div className="mt-6 flex w-full items-center justify-center gap-3">
            <button onClick={() => scrollRow(-1)} className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">←</button>
            <button onClick={() => scrollRow(1)} className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">→</button>
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
