"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SectionPastelBackground } from "./SectionPastelBackground";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-zinc-200/80 bg-[#FAFAF9]">
      <SectionPastelBackground variant="pink-left" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start text-left">
          {/* Small uppercase label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="section-label">
              FULL STACK / MERN STACK DEVELOPER
            </span>
            <span className="text-zinc-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Available for roles</span>
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-zinc-950 mb-4 leading-[0.92]">
            Hi, I&apos;m<br />Ayush Dubey.
          </h1>

          {/* Supporting Headline */}
          <p className="text-xl sm:text-2xl font-light text-zinc-600 tracking-tight mb-6">
            Building useful products for the web.
          </p>

          {/* Concise Introduction */}
          <p className="text-[15px] sm:text-base text-zinc-600 leading-relaxed max-w-2xl mb-8">
            Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, REST APIs, MongoDB, and PostgreSQL with proven experience building scalable production applications.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 text-white text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4 text-zinc-400" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 bg-white/90 text-zinc-800 text-sm font-medium hover:bg-white hover:border-zinc-300 transition-colors cursor-pointer"
            >
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Verified Core Technologies */}
          <div className="pt-6 border-t border-zinc-200/80 w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-500">
            <span className="font-medium text-zinc-700">Core technologies:</span>
            <span>Next.js</span>
            <span>·</span>
            <span>React</span>
            <span>·</span>
            <span>TypeScript</span>
            <span>·</span>
            <span>Node.js</span>
            <span>·</span>
            <span>PostgreSQL</span>
            <span>·</span>
            <span>MongoDB</span>
            <span>·</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
