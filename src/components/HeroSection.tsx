"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center bg-[#FAFAF9] border-b border-zinc-200/80">
      {/* Full-Screen Edge-to-Edge Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/portfolio-man.webp"
          alt="Ayush Dubey"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[76%_10%] sm:object-[78%_14%] md:object-[82%_20%] lg:object-[85%_22%]"
        />

        {/* Desktop smooth gradient on the left side (stops before 55% so portrait is 100% clear) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#FAFAF9]/90 via-[#FAFAF9]/40 to-transparent to-55% z-10 pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-16">
        <div className="flex flex-col items-start text-left max-w-xl lg:max-w-2xl bg-white/85 sm:bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-5 sm:p-7 md:p-0 rounded-2xl md:rounded-none border border-white/70 md:border-none shadow-[0_8px_32px_rgba(0,0,0,0.06)] md:shadow-none">
          {/* Small uppercase label */}
          <div className="mb-4">
            <span className="section-label">
              FULL STACK / MERN STACK DEVELOPER
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-zinc-950 mb-4 leading-[0.92]">
            Hi, I&apos;m<br />Ayush Dubey.
          </h1>

          {/* Supporting Headline */}
          <p className="text-xl sm:text-2xl font-light text-zinc-700 tracking-tight mb-6">
            Building useful products for the web.
          </p>

          {/* Concise Introduction */}
          <p className="text-[15px] sm:text-base text-zinc-600 leading-relaxed max-w-xl mb-8">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 bg-white/90 text-zinc-800 text-sm font-medium hover:bg-white hover:border-zinc-300 transition-colors cursor-pointer backdrop-blur-xs"
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
