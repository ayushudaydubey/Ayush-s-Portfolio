"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { experiencesData } from "../data/portfolio";
import { SectionPastelBackground } from "./SectionPastelBackground";

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Track scroll position of the parent container
  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start 78%", "end 52%"],
  });

  // Master progress value (0.0 = completely wrapped at top, 1.0 = completely unrolled at bottom)
  const activeProgress = useMotionValue(0);

  // Auto-unroll on scroll (only rolls forward on scroll, never backward)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDragging.current) {
      if (latest > activeProgress.get()) {
        activeProgress.set(Math.min(1, latest));
      }
    }
  });

  // Responsive spring physics: instantaneous tracking during mouse drag, liquid smooth on scroll
  const smoothProgress = useSpring(activeProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.3,
  });

  // Dynamic vertical print mask: content below the roller is 100% clipped/hidden
  const clipPercent = useTransform(smoothProgress, [0, 1], [100, 0]);
  const clipPath = useTransform(clipPercent, (val) => `inset(0% 0% ${val}% 0%)`);

  // Position of the roller bar traveling down the parent container
  const rollerTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Section header scroll animation
  const { scrollYProgress: headerProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "start 55%"],
  });

  const headerY = useTransform(headerProgress, [0, 1], [24, 0]);
  const headerOpacity = useTransform(headerProgress, [0, 0.8], [0, 1]);

  // Interactive mouse / touch drag on the roller:
  // User can click and drag the roller up and down to wrap and unroll content!
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    isDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

    const updateFromPointer = (clientY: number) => {
      if (!parentRef.current) return;
      const rect = parentRef.current.getBoundingClientRect();
      const relativeY = clientY - rect.top;
      const clamped = Math.max(0, Math.min(1, relativeY / rect.height));
      activeProgress.set(clamped);
    };

    updateFromPointer(e.clientY);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isDragging.current) return;
      updateFromPointer(moveEvent.clientY);
    };

    const onPointerUp = () => {
      isDragging.current = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#E4E4E7] scroll-mt-16 bg-[#FAFAF9]"
    >
      <SectionPastelBackground variant="blue-left" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <motion.div
          style={
            shouldReduceMotion
              ? {}
              : {
                  y: headerY,
                  opacity: headerOpacity,
                }
          }
          className="mb-12 sm:mb-16 border-b border-[#E4E4E7] pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#A1A1AA] mb-4">
              [ 04 — Experience ]
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-[#18181B] leading-[0.9]">
              Work<br />History
            </h2>
          </div>
          <p className="text-[14px] text-[#52525B] font-light leading-relaxed max-w-sm">
            Professional engineering roles, client engagements, and delivered production systems.
          </p>
        </motion.div>

        {/* Unified Parent Container with Interactive 3D Roller */}
        <div
          ref={parentRef}
          style={{ perspective: "1200px" }}
          className="relative py-2 sm:py-4"
        >
          {/* Interactive Mechanical Roller Drum (Draggable with Mouse / Touch) */}
          {!shouldReduceMotion && (
            <motion.div
              style={{
                top: rollerTop,
              }}
              onPointerDown={handlePointerDown}
              className="group/roller absolute -left-2 sm:-left-3 -right-2 sm:-right-3 z-30 flex items-center -translate-y-1/2 cursor-grab active:cursor-grabbing select-none touch-none py-2"
            >
              {/* Left Precision Micro-Anchor */}
              <div className="w-1.5 sm:w-2 h-4 sm:h-4.5 rounded-l-sm bg-zinc-300 group-hover/roller:bg-zinc-400 group-active/roller:bg-zinc-900 border border-zinc-400/40 shadow-xs transition-colors shrink-0" />

              {/* Slender Machined Cylindrical Drum */}
              <div className="relative flex-1 h-3.5 sm:h-4 rounded-full bg-gradient-to-b from-white via-zinc-100 to-zinc-200 group-hover/roller:from-white group-hover/roller:via-zinc-50 group-hover/roller:to-zinc-300 border border-zinc-300/90 shadow-[0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] flex items-center justify-center px-4 transition-all">
                {/* Specular Glint */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-400/40 to-transparent" />

                {/* Tactile Grip Ribs in Center */}
                <div className="absolute inset-y-0 flex items-center gap-1 opacity-60 group-hover/roller:opacity-100 transition-opacity">
                  <div className="w-0.5 h-2 rounded-full bg-zinc-400" />
                  <div className="w-0.5 h-2 rounded-full bg-zinc-400" />
                  <div className="w-0.5 h-2 rounded-full bg-zinc-400" />
                </div>

                {/* Interactive Tooltip Pill on Hover / Drag */}
                <div className="absolute -top-7 px-2.5 py-0.5 rounded-full bg-zinc-900/90 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider shadow-sm opacity-0 group-hover/roller:opacity-100 group-active/roller:opacity-100 transition-opacity pointer-events-none whitespace-nowrap flex items-center gap-1.5">
                  <span>↕ Drag to roll / wrap</span>
                </div>

                {/* Print Head Register Point */}
                <div className="absolute right-5 w-1.5 h-1.5 rounded-full bg-[#18181B] border border-white shadow-xs" />
              </div>

              {/* Right Precision Micro-Anchor */}
              <div className="w-1.5 sm:w-2 h-4 sm:h-4.5 rounded-r-sm bg-zinc-300 group-hover/roller:bg-zinc-400 group-active/roller:bg-zinc-900 border border-zinc-400/40 shadow-xs transition-colors shrink-0" />

              {/* Soft Ambient Shadow on Unrolled Sheet */}
              <div className="absolute left-4 right-4 -bottom-2 h-2.5 bg-gradient-to-b from-zinc-900/8 to-transparent blur-[1.5px] pointer-events-none" />
            </motion.div>
          )}

          {/* Unified Architectural Parent Card */}
          <motion.div
            style={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    clipPath,
                  }
            }
            className="relative bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.02)]"
          >
            {/* Editorial Portfolio Metadata Bar */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E4E4E7]/80 text-[11px] font-mono uppercase tracking-[0.18em] text-[#A1A1AA]">
              <span>[ Verified Employment Track ]</span>
              <span>2025 — Present · 02 Engagements</span>
            </div>

            {/* Companies List inside the Parent Card */}
            <div>
              {experiencesData.map((exp, index) => (
                <div key={exp.id}>
                  {index > 0 && (
                    <div className="my-8 sm:my-10 border-t border-[#E4E4E7]/80" />
                  )}

                  {/* Role, Company, Location & Date Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-y-1 gap-x-6 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[#18181B] leading-snug mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-sm text-[#52525B]">
                        {exp.company}
                        <span className="text-[#A1A1AA] font-normal mx-1.5">·</span>
                        {exp.location}
                      </p>
                    </div>
                    <span className="self-start sm:text-right text-[11px] font-mono text-[#71717A] bg-zinc-100/90 border border-[#E4E4E7] px-2.5 py-1 rounded-md whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  {exp.description ? (
                    <p className="text-[15px] text-[#52525B] font-light leading-relaxed mb-5 max-w-3xl">
                      {exp.description}
                    </p>
                  ) : null}

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-6 max-w-3xl">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-[14px] text-[#52525B] leading-relaxed"
                      >
                        <span className="mt-[8px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-medium text-zinc-700 bg-zinc-50 border border-[#E4E4E7] px-2.5 py-1 rounded-lg hover:border-zinc-300 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
