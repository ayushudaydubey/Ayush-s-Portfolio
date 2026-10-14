"use client";

import React from "react";
import { developerProfile } from "../data/portfolio";
import { MapPin, Mail, Phone } from "lucide-react";
import { SectionPastelBackground } from "./SectionPastelBackground";

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28 border-b border-zinc-200/80 scroll-mt-16 bg-[#FAFAF9]">
      <SectionPastelBackground variant="blue-left" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="mb-12 sm:mb-16 border-b border-zinc-200/60 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-4">
              [ 01 — Overview ]
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.9]">
              Professional<br />Summary
            </h2>
          </div>
          <p className="text-[14px] text-zinc-500 leading-relaxed max-w-sm">
            Engineering background, stack specializations, and production problem-solving approach.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-5 text-zinc-600 text-base sm:text-lg leading-relaxed max-w-3xl">
          {developerProfile.bioFull.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Location & Status Meta */}
        <div className="mt-12 pt-6 border-t border-zinc-200/80 flex flex-wrap items-center gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            <span>{developerProfile.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            <span>{developerProfile.email}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-zinc-400" />
            <span>{developerProfile.phone}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>{developerProfile.availability}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
