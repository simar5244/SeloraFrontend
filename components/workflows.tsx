"use client";

import React, { useState } from 'react';
import Image from "next/image";

import Spotlight from "@/components/spotlight";

function Workflows() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-violet-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-violet-200/50">
              <span className="inline-flex bg-gradient-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                Enterprise Security
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-gray-200 via-violet-200 via-gray-50 via-violet-300 to-gray-200 bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Robust security measures to protect your most sensitive data
            </h2>
          </div>
          {/* Spotlight items */}
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {/* Card 1 */}
            <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
              
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                {/* Content */}
                <div className="p-8 flex flex-col h-full justify-center">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Advanced Encryption
                      </span>
                    </span>
                  </div>
                  <p className="text-violet-200/65">
                    Military-grade AES-256 encryption for all data at rest and in transit, ensuring your information remains secure at all times.
                  </p>
                </div>
              </div>
            </a>
            {/* Card 2 */}
            <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
              
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                {/* Content */}
                <div className="p-8 flex flex-col h-full justify-center">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Zero-Trust Architecture
                      </span>
                    </span>
                  </div>
                  <p className="text-violet-200/65">
                    Strict access controls with multi-factor authentication to ensure only authorized personnel can access sensitive systems.
                  </p>
                </div>
              </div>
            </a>
            {/* Card 3 */}
            <a
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
              
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                {/* Content */}
                <div className="p-8 flex flex-col h-full justify-center">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Tailored Flows
                      </span>
                    </span>
                  </div>
                  <p className="text-violet-200/65">
                    Streamline the product development flow with a content
                    platform that's aligned across specs and insights.
                  </p>
                </div>
              </div>
            </a>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="relative py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-violet-200/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-violet-200/50">
              <span className="inline-flex bg-gradient-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-gray-200 via-violet-200 via-gray-50 via-violet-300 to-gray-200 bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl text-transparent md:text-4xl">
              Simple, straightforward pricing with no hidden fees.
            </h2>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center bg-gray-800 rounded-full p-1">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm transition-colors ${!isAnnual ? 'bg-violet-500/50 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm transition-colors ${isAnnual ? 'bg-violet-500/50 text-white' : 'text-gray-300 hover:text-white'}`}
              >
                Annual
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {/* Starter */}
            <a 
              href="https://app.seloraa.com/company-signup"
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                <div className="p-6 pt-10 flex flex-col h-full">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Starter
                      </span>
                    </span>
                  </div>
                  <p className="text-violet-200/65 mb-6">Perfect for small teams</p>
                  <div className="mb-6">
                    <span className="text-4xl font-nacelle text-white">
                      ${isAnnual ? '5,999' : '599'}
                      <span className="text-lg text-gray-400"> / {isAnnual ? 'year' : 'month'}</span>
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Upto 20 Users
                    </li>
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Email and Call Support
                    </li>
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      DIY Onboarding
                    </li>
                  </ul>
                  <div className="relative mt-auto pt-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-violet-200 p-0.5">
                        <div className="h-full w-full rounded-full bg-gray-950"></div>
                      </div>
                      <button className="relative w-full py-3 px-6 rounded-full text-white text-center">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Standard - Most Popular */}
            <a 
              href="https://app.seloraa.com/company-signup"
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                <div className="p-6 pt-10 flex flex-col h-full">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Standard
                      </span>
                    </span>
                  </div>
                  <p className="text-violet-200/65 mb-6">Ideal for growing businesses</p>
                  <div className="mb-6">
                    <span className="text-4xl font-nacelle text-white">
                      ${isAnnual ? '9,999' : '999'}
                      <span className="text-lg text-gray-400"> / {isAnnual ? 'year' : 'month'}</span>
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Upto 100 Users
                    </li>
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      24/7 Priority Support
                    </li>
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      DIY Onboarding
                    </li>
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        
                      </svg>
                      
                    </li>
                  </ul>
                  <div className="relative mt-auto pt-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-violet-200 p-0.5">
                        <div className="h-full w-full rounded-full bg-gray-950"></div>
                      </div>
                      <button className="relative w-full py-3 px-6 rounded-full text-white text-center">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Enterprise */}
            <a 
              href="https://app.seloraa.com/company-signup"
              className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-violet-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-violet-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
            >
              <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                <div className="p-6 pt-10 flex flex-col h-full">
                  <div className="mb-3">
                    <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                      <span className="bg-linear-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent">
                        Enterprise
                      </span>
                    </span>
                  </div>
                  <p className="text-violet-200/65 mb-6">Perfect for large organizations</p>
                  <div className="mb-6">
                    <span className="text-4xl font-nacelle text-white">
                      ${isAnnual ? '29,999' : '2,999'}
                      <span className="text-lg text-gray-400"> / {isAnnual ? 'year' : 'month'}</span>
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      100+ Users
                    </li>
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      24/7 Priority Support
                    </li>
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Dedicated Account Manager
                    </li>
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      White Glove Onboarding
                    </li>
                    <li className="flex items-center text-violet-200/80">
                      <svg className="w-5 h-5 text-violet-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Custom Pricing Options Available
                    </li>
                  </ul>
                  <div className="relative mt-auto pt-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-violet-200 p-0.5">
                        <div className="h-full w-full rounded-full bg-gray-950"></div>
                      </div>
                      <button className="relative w-full py-3 px-6 rounded-full text-white text-center">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Spotlight>
        </div>
      </div>
    </section>
  );
}

// Main component that combines both sections
export default function HomePage() {
  return (
    <>
      <Workflows />
      <Pricing />
    </>
  );
}
