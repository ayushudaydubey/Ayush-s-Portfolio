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
// Scales responsively from mobile to desktop
const ARC_CLASSES = [
  "-translate-x-3.5 sm:-translate-x-6 md:-translate-x-10 lg:-translate-x-18",
  "-translate-x-1.5 sm:-translate-x-3 md:-translate-x-5 lg:-translate-x-9",
  "translate-x-0",
  "translate-x-0",
  "-translate-x-1.5 sm:-translate-x-3 md:-translate-x-5 lg:-translate-x-9",
  "-translate-x-3.5 sm:-translate-x-6 md:-translate-x-10 lg:-translate-x-18",
];

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    // Drive category by scroll on all devices (mobile + tablet + desktop)
    const total = skillsData.length;
    const index = Math.min(Math.floor(progress * total), total - 1);
    if (index >= 0 && index < total) {
      setActiveIndex(index);
    }
  });

  const scrollToCategory = (index: number) => {
    setActiveIndex(index);

    if (sectionRef.current) {
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) > 45) {
      if (diff > 0 && activeIndex < skillsData.length - 1) {
        scrollToCategory(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        scrollToCategory(activeIndex - 1);
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
      className="relative border-b border-[#E4E4E7] bg-[#FAFAF9] h-[260vh] sm:h-[280vh]"
    >
      <div className="sticky top-16 sm:top-20 h-[calc(100dvh-4rem)] sm:h-[calc(100vh-5rem)] flex flex-col justify-center py-2 sm:py-6 lg:py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Subtle Top Metadata Bar (All Screen Sizes) */}
          <div className="flex items-center justify-between pb-2 sm:pb-6 lg:pb-8 mb-2 sm:mb-6 border-b border-[#E4E4E7] gap-2">
            <p className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#A1A1AA] truncate">
              [ 02 — Capabilities & Stack ]
            </p>
            <span className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#A1A1AA] shrink-0">
              0{activeIndex + 1} / 0{skillsData.length} &middot; {skillsData.reduce((acc, s) => acc + s.skills.length, 0)} Technologies
            </span>
          </div>

          {/* Side-by-Side Layout on All Screen Sizes (Mobile + Tablet + Desktop) */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="grid grid-cols-12 gap-2 sm:gap-6 md:gap-10 lg:gap-20 xl:gap-28 items-center"
          >
            {/* Left Side: Half-Circle Typography Layout (Curving to the RIGHT) */}
            <div className="col-span-5 relative py-1 sm:py-4 lg:py-6">
              {/* Semicircular Arc Guideline (Bowing to the RIGHT ')') */}
              <svg
                className="absolute right-0 top-1 bottom-1 sm:top-3 sm:bottom-3 h-[calc(100%-0.5rem)] sm:h-[calc(100%-1.5rem)] w-10 sm:w-20 md:w-24 lg:w-28 pointer-events-none text-zinc-300/80"
                viewBox="0 0 100 340"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 12 16 Q 85 170 12 324"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  opacity="0.65"
                />
              </svg>

              {/* 6 Curved Category Headings */}
              <div className="space-y-2 sm:space-y-3.5 lg:space-y-6 relative z-10 pr-1 sm:pr-2">
                {skillsData.map((group, index) => {
                  const isActive = activeIndex === index;
                  const arcClass = ARC_CLASSES[index] || "translate-x-0";

                  return (
                    <button
                      key={group.category}
                      type="button"
                      onClick={() => scrollToCategory(index)}
                      className={`group flex items-baseline justify-end gap-1.5 sm:gap-4 text-right transition-transform duration-300 ease-out cursor-pointer w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded-lg ${arcClass}`}
                    >
                      {/* Uppercase Editorial Heading */}
                      <span
                        className={`text-[10px] xs:text-[11px] sm:text-base md:text-xl lg:text-2xl xl:text-3xl uppercase tracking-tight transition-colors duration-300 truncate ${
                          isActive
                            ? "text-[#18181B] font-medium sm:font-normal"
                            : "text-[#A1A1AA] font-light hover:text-zinc-600"
                        }`}
                      >
                        {group.category}
                      </span>

                      {/* Active Indicator & Category Number */}
                      <span className="flex items-center gap-1 sm:gap-2 shrink-0">
                        <span
                          className={`text-[8px] sm:text-xs font-mono transition-colors duration-300 ${
                            isActive ? "text-[#18181B] font-semibold" : "text-[#A1A1AA]"
                          }`}
                        >
                          {`0${index + 1}`}
                        </span>
                        <span className="w-1.5 h-1.5 flex items-center justify-center shrink-0">
                          {isActive && (
                            <motion.span
                              layoutId="activeArcIndicator"
                              className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#18181B]"
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

            {/* Right Side / Active Content Area with Smooth Motion */}
            <div className="col-span-7 pl-1.5 sm:pl-2 md:pl-4 lg:pl-6 xl:pl-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.category}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={transitionConfig}
                  className="w-full bg-transparent min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] flex flex-col justify-between"
                >
                  <div>
                    {/* Editorial Header */}
                    <div className="flex items-baseline justify-between gap-1.5 sm:gap-2 pb-1 sm:pb-3 lg:pb-4">
                      <div className="min-w-0">
                        <span className="text-[8px] sm:text-[10px] lg:text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#A1A1AA] block mb-0.5 sm:mb-1.5 truncate">
                          {`0${activeIndex + 1} // DOMAIN`}
                        </span>
                        <h3 className="text-base sm:text-2xl md:text-3xl lg:text-5xl font-light uppercase tracking-tight text-[#18181B] leading-none truncate">
                          {activeCategory.category}
                        </h3>
                      </div>
                      <span className="text-[8px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-100/90 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded border border-[#E4E4E7] shrink-0">
                        {activeCategory.skills.length} Tech
                      </span>
                    </div>

                    {/* Subtle Editorial Divider */}
                    <div className="w-full h-px bg-[#E4E4E7] my-1.5 sm:my-3 lg:my-5" />

                    {/* Description */}
                    {activeCategory.description && (
                      <p className="text-[10px] sm:text-sm lg:text-base xl:text-lg text-[#52525B] font-light leading-snug sm:leading-relaxed max-w-xl mb-2 sm:mb-4 lg:mb-8 line-clamp-2 sm:line-clamp-none">
                        {activeCategory.description}
                      </p>
                    )}

                    {/* Full-Color Technology Icons with Neutral Labels */}
                    <div>
                      <p className="text-[8px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-[#A1A1AA] mb-1 sm:mb-3 lg:mb-4">
                        Stack & Tooling
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-3 max-h-[30vh] sm:max-h-[38vh] md:max-h-none overflow-y-auto no-scrollbar">
                        {activeCategory.skills.map((skill) => (
                          <span
                            key={skill.name}
                            className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-1.5 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2.5 rounded-md sm:rounded-xl bg-white/80 border border-[#E4E4E7] hover:border-zinc-300 hover:bg-white transition-all text-[#18181B] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                          >
                            <TechLogo
                              name={skill.name}
                              size={15}
                              className="shrink-0 sm:w-[22px] sm:h-[22px] lg:w-[26px] lg:h-[26px]"
                            />
                            <span className="text-[10px] sm:text-xs lg:text-sm font-medium tracking-tight text-[#18181B]">
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
