'use client';

import { useState } from 'react';
import Image from "next/image";
const OrgChartImg = "/optimized/features/workflow-03.webp";
const SuccessionImg = "/optimized/features/workflow-02.webp";
const GalaxyImg = "/optimized/features/workflow-01.webp";
import Spotlight from "@/components/spotlight";
import AnimatedModal from "@/components/animated-modal";
import PreloadTrigger from "@/components/preload-trigger";

const OrgChartModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/gif1.webm"
    title="Interactive Organization Chart"
    description="Visualize your entire organization in real-time with our dynamic organization chart with blended simulation engine. Easily navigate through departments, teams, and individual contributors."
    features={[
      "Add/Remove employees and see the real-time impact on other employee's workloads, utilization rates, attrition rates.",
      "Find out who is the best person to take over someone's responsibilities.",
      "See real time cost to company updates, and optimize departments using AI.",
      "Interactive zoom with detailed employee profiles accessible with one click synced with real-time data."
    ]}
  />
);

const SuccessionPlanningModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/gif2.webm"
    title="Succession Planning"
    description="Plan for the future with our comprehensive succession planning tools. Identify and develop high-potential employees to fill key leadership roles."
    features={[
      "We take into account tens of different variables with several niches like how well a user integrates within a company, how well they collaborate and interact with their peers etc.",
      "Using proprietary algorithms, the best candidates for a given position are identified. Then factored with appropriate weights for each metric, a holistic and thorough recommendation is made.",
      "Key areas of strength and improvement are highlighted and show overlaps and underlaps in all major regions of employability.",
      "Provide multiple options for succession planning for each employee, even those not at risk with detailed attrition risk assessment."
    ]}
  />
);

const GalaxyVisualizationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <AnimatedModal
    isOpen={isOpen}
    onClose={onClose}
    videoSrc="/optimized/gif3.webm"
    title="3D Galaxy Visualization"
    description="Explore your organization like never before with our immersive 3D galaxy view. Visualize complex relationships between teams, projects, and employees in an interactive 3D space."
    features={[
      "Interactive 3D visualization of your entire organization",
      "View team structures, project relationships, and employee connections",
      "Zoom, pan, and rotate for different perspectives",
      "Click on any node for detailed information and insights"
    ]}
  />
);

export default function OrganizationFeatures() {
  const [isOrgChartModalOpen, setIsOrgChartModalOpen] = useState(false);
  const [isSuccessionModalOpen, setIsSuccessionModalOpen] = useState(false);
  const [isGalaxyModalOpen, setIsGalaxyModalOpen] = useState(false);
  
  return (
    <section id="features">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-violet-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-violet-200/50">
              <span className="inline-flex bg-gradient-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                Tailored Analytics
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-gray-200 via-violet-200 via-gray-50 via-violet-300 to-gray-200 bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Map your organizational journey
            </h2>
            <p className="text-lg text-violet-200/80">
              Get powerful insights into your team's performance and health.
              Selora helps you make data-driven decisions to optimize your
              organization's structure and processes.
            </p>
          </div>
          {/* Spotlight items */}
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {/* Card 1 */}
            <PreloadTrigger
              videoSrc="/optimized/gif1.webm"
              onClick={() => setIsOrgChartModalOpen(true)}
              className="relative"
            >
              <div
                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer"
              >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                {/* Arrow */}
                <div
                  className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={9}
                    height={8}
                    fill="none"
                  >
                    <path
                      fill="#F4F4F5"
                      d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                    />
                  </svg>
                </div>
                {/* Image */}
                <Image
                  className="inline-flex"
                  style={{
                    filter: 'hue-rotate(20deg) saturate(1.5) brightness(0.9) contrast(1.1)'
                  }}
                  src={OrgChartImg}
                  width={350}
                  height={288}
                  alt="Organizational Chart"
                />
                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Organization Chart
                      </span>
                    </span>
                  </div>
                  <p className="text-violet-200/65">
                    Visualize your entire organizational structure in real-time. 
                    Track reporting lines, team compositions, and departmental connections as they evolve.
                  </p>
                </div>
              </div>
            </div>
            </PreloadTrigger>
            {/* Card 2 */}
            <PreloadTrigger
              videoSrc="/optimized/gif2.webm"
              onClick={() => setIsSuccessionModalOpen(true)}
              className="relative"
            >
              <div
                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer"
              >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                {/* Arrow */}
                <div
                  className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={9}
                    height={8}
                    fill="none"
                  >
                    <path
                      fill="#F4F4F5"
                      d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                    />
                  </svg>
                </div>
                {/* Image */}
                <Image
                  className="inline-flex"
                  style={{
                    filter: 'hue-rotate(20deg) saturate(1.5) brightness(0.9) contrast(1.1)'
                  }}
                  src={SuccessionImg}
                  width={350}
                  height={288}
                  alt="Succession Planning"
                />
                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Succession Planning
                      </span>
                    </span>
                  </div>
                  <p className="text-violet-200/65">
                    Future-proof your leadership pipeline. Identify and develop 
                    high-potential employees for key roles before you need them.
                  </p>
                </div>
              </div>
            </div>
            </PreloadTrigger>
            {/* Card 3 */}
            <PreloadTrigger
              videoSrc="/optimized/gif3.webm"
              onClick={() => setIsGalaxyModalOpen(true)}
              className="relative"
            >
              <div
                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100 cursor-pointer"
              >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                {/* Arrow */}
                <div
                  className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 bg-gray-800/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={9}
                    height={8}
                    fill="none"
                  >
                    <path
                      fill="#F4F4F5"
                      d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
                    />
                  </svg>
                </div>
                {/* Image */}
                <Image
                  className="inline-flex"
                  style={{
                    filter: 'hue-rotate(20deg) saturate(1.5) brightness(0.9) contrast(1.1)'
                  }}
                  src={GalaxyImg}
                  width={350}
                  height={288}
                  alt="Talent Galaxy"
                />
                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Talent Galaxy
                      </span>
                    </span>
                  </div>
                  <p className="text-violet-200/65">
Navigate your organization in 3D. Track skills, reporting lines, and cross-functional ties to uncover hidden talent and structural insights.
                  </p>
                </div>
              </div>
            </div>
            </PreloadTrigger>
          </Spotlight>
          
          <OrgChartModal 
            isOpen={isOrgChartModalOpen} 
            onClose={() => setIsOrgChartModalOpen(false)} 
          />
          <SuccessionPlanningModal
            isOpen={isSuccessionModalOpen}
            onClose={() => setIsSuccessionModalOpen(false)}
          />
          <GalaxyVisualizationModal
            isOpen={isGalaxyModalOpen}
            onClose={() => setIsGalaxyModalOpen(false)}
          />
        </div>
      </div>
    </section>
  );
}
