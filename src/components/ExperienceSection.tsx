"use client";

import React from "react";
import { experiencesData } from "../data/portfolio";
import { SectionPastelBackground } from "./SectionPastelBackground";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#E4E4E7] scroll-mt-16 bg-[#FAFAF9]"
    >
      <SectionPastelBackground variant="blue-left" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="mb-12 sm:mb-16 border-b border-zinc-200/60 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-4">
              [ 04 — Experience ]
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.9]">
              Work<br />History
            </h2>
          </div>
          <p className="text-[14px] text-zinc-500 leading-relaxed max-w-sm">
            Professional engineering roles, client engagements, and delivered production systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-10">
          {/* Vertical rule */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200" />

          <div className="space-y-0 divide-y divide-zinc-100">
            {experiencesData.map((exp) => (
              <div key={exp.id} className="relative py-10 first:pt-0 last:pb-0">
                {/* Timeline dot */}
                <div className="flex absolute -left-[29px] sm:-left-[45px] top-10 first:top-0 items-center justify-center w-2.5 h-2.5 rounded-full bg-zinc-400 border-2 border-white ring-1 ring-zinc-200" />

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-y-1 gap-x-6 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-950 leading-snug mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-zinc-600">
                      {exp.company}
                      <span className="text-zinc-400 font-normal mx-1.5">·</span>
                      {exp.location}
                    </p>
                  </div>
                  <span className="self-start sm:text-right text-[11px] font-mono text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-md whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                {exp.description ? (
                  <p className="text-[15px] text-zinc-600 leading-relaxed mb-4 max-w-3xl">
                    {exp.description}
                  </p>
                ) : null}

                {/* Highlights */}
                <ul className="space-y-2 mb-6 max-w-3xl">
                  {exp.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-[14px] text-zinc-600 leading-relaxed"
                    >
                      <span className="mt-[8px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 px-2.5 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
