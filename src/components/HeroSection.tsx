"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { TechLogo } from "./TechLogo";

const CORE_TECH = [
  { name: "Next.js", label: "Next.js" },
  { name: "React", label: "React" },
  { name: "TypeScript", label: "TypeScript" },
  { name: "Node.js", label: "Node.js" },
  { name: "PostgreSQL", label: "PostgreSQL" },
  { name: "MongoDB", label: "MongoDB" },
  { name: "Tailwind CSS", label: "Tailwind CSS" },
  { name: "Docker", label: "Docker" },
  { name: "AWS", label: "AWS" },
  { name: "Git", label: "Git" },
  { name: "GitHub", label: "GitHub" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 22,
    },
  },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle scroll-driven parallax for buttery-smooth scrolling transition
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 50]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, shouldReduceMotion ? 1 : 0.15]
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 60]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center bg-[#FAFAF9] border-b border-zinc-200/80"
    >
      {/* Full-Screen Edge-to-Edge Background Image with Parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 z-0 pointer-events-none select-none"
      >
        <Image
          src="/portfolio-man.webp"
          alt="Ayush Dubey"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_top] sm:object-[80%_top] md:object-[82%_20%] lg:object-[85%_22%]"
        />

        {/* Desktop smooth gradient on the left side */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#FAFAF9]/90 via-[#FAFAF9]/40 to-transparent to-55% z-10 pointer-events-none" />

        {/* Mobile bottom dark blend */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 via-55% to-transparent to-75% z-10 pointer-events-none" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 lg:px-8 w-full pt-[38vh] pb-12 sm:pt-[40vh] md:py-16"
      >
        <div className="flex flex-col items-start text-left w-full max-w-xl lg:max-w-2xl bg-transparent p-0 border-none shadow-none ring-0">
          {/* Small uppercase label */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-3.5"
          >
            <span className="text-[11px] font-semibold tracking-wider uppercase text-white/90 md:text-zinc-500 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] md:drop-shadow-none">
              FULL STACK / MERN STACK DEVELOPER
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-white md:text-zinc-950 mb-4 leading-[0.94] break-words drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] md:drop-shadow-none"
          >
            Hi, I&apos;m<br />Ayush Dubey.
          </motion.h1>

          {/* Supporting Headline */}
          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
            className="text-lg sm:text-2xl font-light text-white md:text-zinc-700 tracking-tight mb-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] md:drop-shadow-none"
          >
            Building useful products for the web.
          </motion.p>

          {/* Concise Introduction */}
          <motion.p
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: "easeOut" }}
            className="text-[15px] sm:text-base text-white/95 md:text-zinc-600 leading-relaxed max-w-xl mb-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] md:drop-shadow-none"
          >
            Full Stack Developer specializing in React.js, Next.js, Node.js, Express.js, REST APIs, MongoDB, and PostgreSQL with proven experience building scalable production applications.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-3 mb-10"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white md:bg-zinc-950 text-zinc-950 md:text-white text-sm font-medium hover:bg-zinc-100 md:hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4 text-zinc-600 md:text-zinc-400" />
            </Link>

            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 md:border-zinc-200 bg-white/10 md:bg-white/90 text-white md:text-zinc-800 text-sm font-medium hover:bg-white/20 md:hover:bg-white hover:border-white/50 md:hover:border-zinc-300 transition-colors cursor-pointer backdrop-blur-xs"
            >
              <span>Contact Me</span>
            </Link>
          </motion.div>

          {/* Verified Core Technologies with Smooth Scroll & Loading Entrance */}
          <motion.div
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="pt-6 sm:pt-7 border-t border-white/20 md:border-zinc-200/80 w-full"
          >
            <motion.p
              variants={itemVariants}
              className="text-xs text-white/80 md:text-zinc-500 mb-3 font-normal"
            >
              Core technologies:
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="flex flex-wrap items-center gap-2 sm:gap-2.5"
            >
              {CORE_TECH.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={tech.label}
                  className="group relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/95 md:bg-white/85 flex items-center justify-center border border-white/60 md:border-zinc-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md hover:border-zinc-300 md:hover:bg-white transition-all duration-200 select-none cursor-pointer"
                >
                  <TechLogo
                    name={tech.name}
                    size={20}
                    className="shrink-0 transition-transform group-hover:scale-110 duration-200"
                  />

                  {/* Floating tooltip on hover (placed below icon) */}
                  <span className="pointer-events-none absolute top-full mt-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-zinc-900 text-white text-[10px] font-mono py-0.5 px-2 rounded shadow-md whitespace-nowrap z-30">
                    {tech.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
