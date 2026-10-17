"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { skillsData } from "../data/portfolio";
import { TechLogo } from "./TechLogo";

// Semicircular arc offset classes: curving outward toward the RIGHT (direction: right side)
// Items 0 & 5 are positioned left; items 2 & 3 curve deep to the right
const ARC_CLASSES = [
  "-translate-x-10 sm:-translate-x-14 lg:-translate-x-18",
  "-translate-x-5 sm:-translate-x-7 lg:-translate-x-9",
  "translate-x-0",
  "translate-x-0",
  "-translate-x-5 sm:-translate-x-7 lg:-translate-x-9",
  "-translate-x-10 sm:-translate-x-14 lg:-translate-x-18",
];

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Only drive category by scroll on desktop/tablet where tall sticky track is active
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      const total = skillsData.length;
      const index = Math.min(Math.floor(progress * total), total - 1);
      if (index >= 0 && index < total) {
        setActiveIndex(index);
      }
    }
  });

  const scrollToCategory = (index: number) => {
    setActiveIndex(index);

    if (typeof window !== "undefined" && window.innerWidth >= 1024 && sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const totalHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = totalHeight - viewportHeight;

      if (scrollableDistance > 0) {
        const slice = 1 / skillsData.length;
        const progressFraction = (index + 0.35) * slice;
        const targetScroll = sectionTop + progressFraction * scrollableDistance;

        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
    }
  };

  const activeCategory = skillsData[activeIndex] || skillsData[0];
  const transitionConfig = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.24, ease: "easeOut" as const };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative border-b border-[#E4E4E7] bg-[#FAFAF9] lg:h-[280vh]"
    >
      <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex flex-col justify-center py-16 lg:py-0">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Subtle Top Metadata Bar */}
          <div className="hidden lg:flex items-center justify-between pb-8 mb-6 border-b border-[#E4E4E7]">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#A1A1AA]">
              [ 02 — Capabilities & Stack ]
            </p>
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#A1A1AA]">
              06 Domains / {skillsData.reduce((acc, s) => acc + s.skills.length, 0)} Technologies
            </span>
          </div>

          {/* Mobile Header & Horizontal Selector */}
          <div className="lg:hidden mb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#A1A1AA] mb-2">
              [ 02 — Capabilities ]
            </p>
            <h2 className="text-4xl sm:text-5xl font-light uppercase tracking-tight text-[#18181B] mb-6">
              Skills
            </h2>

            <div className="overflow-x-auto no-scrollbar flex gap-2 pb-2 -mx-4 px-4">
              {skillsData.map((group, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={group.category}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`px-3.5 py-1.5 rounded-full text-xs uppercase font-medium whitespace-nowrap transition-colors cursor-pointer ${isActive
                        ? "bg-[#18181B] text-white"
                        : "bg-white text-zinc-600 border border-[#E4E4E7] hover:bg-zinc-50"
                      }`}
                  >
                    <span>{group.category}</span>
                    <span
                      className={`ml-1.5 text-[10px] font-mono ${isActive ? "text-zinc-300" : "text-[#A1A1AA]"
                        }`}
                    >
                      ({group.skills.length})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Two-Column Layout with Generous Spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-28 items-center">
            {/* Left Side: Half-Circle Typography Layout (Curving to the RIGHT) */}
            <div className="hidden lg:block lg:col-span-5 relative py-6">
              {/* Semicircular Arc Guideline (Bowing to the RIGHT ')') */}
              <svg
                className="absolute right-0 top-3 bottom-3 h-[calc(100%-1.5rem)] w-28 pointer-events-none text-zinc-300/80"
                viewBox="0 0 100 340"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 20 16 Q 90 170 20 324"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  opacity="0.65"
                />
              </svg>

              {/* 6 Curved Category Headings */}
              <div className="space-y-4 lg:space-y-6 relative z-10 pr-2">
                {skillsData.map((group, index) => {
                  const isActive = activeIndex === index;
                  const arcClass = ARC_CLASSES[index] || "translate-x-0";

                  return (
                    <button
                      key={group.category}
                      type="button"
                      onClick={() => scrollToCategory(index)}
                      className={`group flex items-baseline justify-end gap-4 text-right transition-transform duration-300 ease-out cursor-pointer w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded-lg ${arcClass}`}
                    >
                      {/* Large Thin Uppercase Editorial Heading */}
                      <span
                        className={`text-lg sm:text-xl lg:text-2xl xl:text-3xl uppercase tracking-tight transition-colors duration-300 truncate ${isActive
                            ? "text-[#18181B] font-normal"
                            : "text-[#A1A1AA] font-light hover:text-zinc-600"
                          }`}
                      >
                        {group.category}
                      </span>

                      {/* Active Indicator & Category Number */}
                      <span className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-xs font-mono transition-colors duration-300 ${isActive ? "text-[#18181B] font-semibold" : "text-[#A1A1AA]"
                            }`}
                        >
                          {`0${index + 1}`}
                        </span>
                        <span className="w-1.5 h-1.5 flex items-center justify-center shrink-0">
                          {isActive && (
                            <motion.span
                              layoutId="activeArcIndicator"
                              className="w-1.5 h-1.5 rounded-full bg-[#18181B]"
                              transition={{ type: "spring", stiffness: 380, damping: 28 }}
                            />
                          )}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Editorial Transparent Active Content Area with Generous Padding */}
            <div className="lg:col-span-7 lg:pl-4 xl:pl-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.category}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={transitionConfig}
                  className="w-full bg-transparent min-h-[360px] flex flex-col justify-between"
                >
                  <div>
                    {/* Editorial Header */}
                    <div className="flex items-baseline justify-between gap-4 pb-4">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#A1A1AA] block mb-2">
                          {`0${activeIndex + 1} // DOMAIN CAPABILITIES`}
                        </span>
                        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-[#18181B] leading-none">
                          {activeCategory.category}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-100/90 px-2.5 py-1 rounded-md border border-[#E4E4E7] shrink-0">
                        {activeCategory.skills.length} Technologies
                      </span>
                    </div>

                    {/* Subtle Editorial Divider */}
                    <div className="w-full h-px bg-[#E4E4E7] my-5" />

                    {/* Description */}
                    {activeCategory.description && (
                      <p className="text-base sm:text-lg text-[#52525B] font-light leading-relaxed max-w-xl mb-8">
                        {activeCategory.description}
                      </p>
                    )}

                    {/* Full-Color Technology Icons with Neutral Labels */}
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#A1A1AA] mb-4">
                        Stack & Tooling
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {activeCategory.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/80 border border-[#E4E4E7] hover:border-zinc-300 hover:bg-white transition-all text-[#18181B] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                          >
                            <TechLogo
                              name={skill.name}
                              size={26}
                              className="shrink-0"
                            />
                            <span className="text-sm font-medium tracking-tight text-[#18181B]">
                              {skill.name}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
