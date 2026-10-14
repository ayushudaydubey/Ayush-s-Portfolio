"use client";

import React from "react";
import { GraduationCap, Award } from "lucide-react";
import { educationData, certificationsData } from "../data/portfolio";
import { SectionPastelBackground } from "./SectionPastelBackground";

export function EducationSection() {
  return (
    <section
      id="education"
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#E4E4E7] scroll-mt-16 bg-[#FAFAF9]"
    >
      <SectionPastelBackground variant="green-left" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="mb-12 sm:mb-16 border-b border-zinc-200/60 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
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
        </div>

        <div className="space-y-12">
          {/* Degree entries */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.14em] text-zinc-400 mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-zinc-400" />
              <span>Higher Education</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="p-6 sm:p-7 rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors hover:border-zinc-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <h4 className="text-xl font-light tracking-tight text-zinc-950">
                      {edu.degree}
                    </h4>
                    <span className="self-start text-[11px] font-mono text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-md whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-600 mb-2">
                    {edu.institution}
                  </p>

                  {edu.statusOrType && (
                    <p className="text-xs text-zinc-500 font-normal">
                      {edu.statusOrType}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4 pt-6 border-t border-zinc-200/80">
            <h3 className="text-xs font-mono uppercase tracking-[0.14em] text-zinc-400 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-zinc-400" />
              <span>Certifications</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 sm:p-7 rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors hover:border-zinc-300"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
