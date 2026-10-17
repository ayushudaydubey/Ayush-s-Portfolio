"use client";

import React from "react";
import { GraduationCap, Award } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { educationData, certificationsData } from "../data/portfolio";
import { SectionPastelBackground } from "./SectionPastelBackground";

const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const subheaderVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function EducationSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="education"
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#E4E4E7] scroll-mt-16 bg-[#FAFAF9]"
    >
      <SectionPastelBackground variant="green-left" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header with Smooth Scroll Reveal */}
        <motion.div
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionHeaderVariants}
          className="mb-12 sm:mb-16 border-b border-zinc-200/60 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-4">
              [ 05 — Credentials ]
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.9]">
              Academic &amp;<br />Training
            </h2>
          </div>
          <p className="text-[14px] text-zinc-500 leading-relaxed max-w-sm">
            Formal degrees in computer science and mathematics alongside comprehensive professional full-stack training.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Degree entries with Staggered Scroll Entrance */}
          <div className="space-y-4">
            <motion.h3
              initial={shouldReduceMotion ? undefined : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={subheaderVariants}
              className="text-xs font-mono uppercase tracking-[0.14em] text-zinc-400 mb-4 flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-zinc-400" />
              <span>Higher Education</span>
            </motion.h3>

            <motion.div
              initial={shouldReduceMotion ? undefined : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardContainerVariants}
              className="grid grid-cols-1 gap-4"
            >
              {educationData.map((edu) => (
                <motion.div
                  key={edu.id}
                  variants={cardItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
                  className="p-6 sm:p-7 rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:border-zinc-300 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <h4 className="text-xl font-light tracking-tight text-zinc-950">
                      {edu.degree}
                    </h4>
                    {edu.period.toLowerCase().includes("pursuing") ? (
                      <span className="self-start inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md whitespace-nowrap font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {edu.period}
                      </span>
                    ) : (
                      <span className="self-start text-[11px] font-mono text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-md whitespace-nowrap">
                        {edu.period}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-zinc-600 mb-2">
                    {edu.institution}
                  </p>

                  {edu.statusOrType && (
                    <p className="text-xs text-zinc-500 font-normal">
                      {edu.statusOrType}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications with Staggered Scroll Entrance */}
          <div className="space-y-4 pt-6 border-t border-zinc-200/80">
            <motion.h3
              initial={shouldReduceMotion ? undefined : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={subheaderVariants}
              className="text-xs font-mono uppercase tracking-[0.14em] text-zinc-400 mb-4 flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-zinc-400" />
              <span>Certifications</span>
            </motion.h3>

            <motion.div
              initial={shouldReduceMotion ? undefined : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardContainerVariants}
              className="grid grid-cols-1 gap-4"
            >
              {certificationsData.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={cardItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, transition: { duration: 0.2 } }}
                  className="p-6 sm:p-7 rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:border-zinc-300 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <h4 className="text-xl font-light tracking-tight text-zinc-950">
                      {cert.title}
                    </h4>
                    <span className="self-start text-[11px] font-mono text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-md whitespace-nowrap">
                      {cert.period}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 mb-3">
                    {cert.institution}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-3xl">
                    {cert.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
