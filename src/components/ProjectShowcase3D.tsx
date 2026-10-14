"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "@/src/types/project";
import { TechLogo } from "./TechLogo";

interface ProjectShowcase3DProps {
  projects: Project[];
}

interface Card3DProps {
  project: Project;
  index: number;
  totalCards: number;
  smoothProgress: MotionValue<number>;
  cardWidth: number;
  cardGap: number;
}

function Card3D({
  project,
  index,
  totalCards,
  smoothProgress,
  cardWidth,
  cardGap,
}: Card3DProps) {
  // Target progress when this card is dead-center
  const targetP = totalCards > 1 ? index / (totalCards - 1) : 0;
  // Span of progress over which this card rotates & scales
  const delta = 0.28;

  // 3D Rotation:
  // When smoothProgress < targetP (card is on the right of center), rotateY is negative (angles towards center)
  // When smoothProgress === targetP (card is in center), rotateY is 0deg (facing viewer)
  // When smoothProgress > targetP (card is on the left of center), rotateY is positive (angles towards center)
  const rotateY = useTransform(
    smoothProgress,
    [targetP - delta, targetP, targetP + delta],
    [-22, 0, 22]
  );

  // Center card is larger and prominent, edges scale down gracefully
  const scale = useTransform(
    smoothProgress,
    [targetP - delta, targetP, targetP + delta],
    [0.86, 1.02, 0.86]
  );

  // Subtle depth z translation
  const z = useTransform(
    smoothProgress,
    [targetP - delta, targetP, targetP + delta],
    [-70, 25, -70]
  );

  // Subtle opacity reduction on extreme edges to keep focus on center
  const opacity = useTransform(
    smoothProgress,
    [targetP - 0.42, targetP - delta, targetP, targetP + delta, targetP + 0.42],
    [0.45, 0.85, 1, 0.85, 0.45]
  );

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer select-none"
      style={{
        width: cardWidth,
        marginRight: cardGap,
        transformStyle: "preserve-3d",
        rotateY,
        scale,
        z,
        opacity,
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block w-full h-[490px] sm:h-[530px] rounded-2xl bg-white border border-[#E4E4E7] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-zinc-300 transition-all duration-300 overflow-hidden flex flex-col justify-between"
      >
        {/* Project Screenshot / Cover Image */}
        <div className="relative w-full h-[230px] sm:h-[260px] bg-zinc-100 overflow-hidden border-b border-[#E4E4E7]">
          <Image
            src={project.coverImage}
            alt={`${project.title} screenshot preview`}
            fill
            sizes="(max-width: 768px) 100vw, 440px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            priority={index < 2}
          />
          {/* Subtle live indicator badge on top right */}
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/95 text-zinc-700 border border-zinc-200/80 shadow-xs backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Production
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            {/* Index & Category */}
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-2.5">
              <span>// {String(index + 1).padStart(2, "0")}</span>
              <span className="truncate max-w-[220px] text-zinc-500">
                {project.category}
              </span>
            </div>

            {/* Project Title */}
            <h3 className="text-xl sm:text-2xl font-light tracking-tight text-zinc-950 mb-2 group-hover:text-zinc-600 transition-colors">
              {project.title}
            </h3>

            {/* Short Description */}
            <p className="text-xs sm:text-[13px] text-zinc-600 line-clamp-3 leading-relaxed mb-4 font-normal">
              {project.shortDescription}
            </p>

            {/* Key Technologies: Icons Only */}
            <div className="flex flex-wrap items-center gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.name}
                  title={tech.name}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/80 hover:bg-white hover:border-zinc-300 hover:scale-110 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <TechLogo name={tech.name} size={18} className="shrink-0" />
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3 mt-4">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 group-hover:text-zinc-600 transition-colors">
              <span>Case study</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>

            {/* External live site link */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors py-1 px-2 rounded-md hover:bg-zinc-100"
              aria-label={`Open ${project.title} live website in new tab`}
            >
              <span>Live site</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectShowcase3D({ projects }: ProjectShowcase3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive card dimension configuration
  const [dimensions, setDimensions] = useState({
    cardWidth: 420,
    cardGap: 32,
  });

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ cardWidth: 320, cardGap: 16 });
      } else if (width < 1024) {
        setDimensions({ cardWidth: 370, cardGap: 24 });
      } else if (width < 1440) {
        setDimensions({ cardWidth: 410, cardGap: 30 });
      } else {
        setDimensions({ cardWidth: 440, cardGap: 36 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Normal vertical page scroll driving the showcase progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Buttery-smooth spring interpolation to eliminate scroll jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate track horizontal translation
  const stride = dimensions.cardWidth + dimensions.cardGap;
  const totalTravel = Math.max(0, (projects.length - 1) * stride);

  // Track translates from 0 to -totalTravel based on scroll progress
  const trackX = useTransform(smoothProgress, [0, 1], [0, -totalTravel]);

  // Update active card index indicator
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const idx = Math.min(
        projects.length - 1,
        Math.max(0, Math.round(latest * (projects.length - 1)))
      );
      setActiveCardIndex(idx);
    });
    return () => unsubscribe();
  }, [smoothProgress, projects.length]);

  return (
    <div id="projects" className="relative scroll-mt-16">
      {/* =========================================================================
          DESKTOP & TABLET: SCROLL-DRIVEN 3D CINEMATIC HORIZONTAL SHOWCASE
          ========================================================================= */}
      <section
        ref={containerRef}
        className="hidden md:block relative h-[340vh] bg-[#FAFAF9] border-b border-[#E4E4E7]"
      >
        {/* Sticky inner viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 lg:py-10">
          {/* Header area */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-200/60 pb-6">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-3">
                  [ 03 — Portfolio ]
                </p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.92]">
                  Selected<br />Work
                </h2>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <p className="text-[13px] text-zinc-500 leading-relaxed max-w-xs md:text-right">
                  Scroll down to explore production applications across the 3D showcase.
                </p>

                {/* Understated scroll indicator & counter */}
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] font-mono text-zinc-400">
                    // 0{activeCardIndex + 1} of 0{projects.length}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-zinc-600 font-mono tracking-wider">
                    <span>Scroll to explore</span>
                    <span className="animate-pulse">→</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Perspective Stage & Moving Track */}
          <div
            className="relative w-full flex-1 flex items-center overflow-visible"
            style={{
              perspective: "1300px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            <motion.div
              className="flex items-center"
              style={{
                x: trackX,
                transformStyle: "preserve-3d",
                paddingLeft: `calc(50vw - ${dimensions.cardWidth / 2}px)`,
                paddingRight: `calc(50vw - ${dimensions.cardWidth / 2}px)`,
              }}
            >
              {projects.map((project, idx) => (
                <Card3D
                  key={project.slug}
                  project={project}
                  index={idx}
                  totalCards={projects.length}
                  smoothProgress={smoothProgress}
                  cardWidth={dimensions.cardWidth}
                  cardGap={dimensions.cardGap}
                />
              ))}
            </motion.div>
          </div>

          {/* Bottom Project Navigator Bar */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200/60 text-xs text-zinc-500">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  Current:
                </span>
                <span className="font-medium text-zinc-900 truncate max-w-[260px]">
                  {projects[activeCardIndex]?.title}
                </span>
                <span className="text-zinc-300 hidden sm:inline">•</span>
                <span className="text-zinc-500 text-[11px] hidden sm:inline">
                  {projects[activeCardIndex]?.category}
                </span>
              </div>

              {/* Progress dots indicator */}
              <div className="flex items-center gap-1.5">
                {projects.map((p, i) => (
                  <span
                    key={p.slug}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeCardIndex
                        ? "w-6 bg-zinc-950"
                        : "w-1.5 bg-zinc-300"
                    }`}
                    aria-label={`Project ${i + 1} of ${projects.length}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: ACCESSIBLE HORIZONTAL SWIPE GALLERY (NO SCROLL TRAP)
          ========================================================================= */}
      <section
        id="projects-mobile"
        className="block md:hidden py-16 sm:py-20 border-b border-[#E4E4E7] bg-[#FAFAF9]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8 border-b border-zinc-200/60 pb-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-3">
              [ 03 — Portfolio ]
            </p>
            <h2 className="text-4xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.92] mb-3">
              Selected<br />Work
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Swipe horizontally to browse through eight production applications.
            </p>
          </div>

          {/* Touch-Friendly Swipe Track */}
          <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none -mx-4 px-4">
            {projects.map((project, idx) => (
              <div
                key={project.slug}
                className="w-[84vw] max-w-[340px] flex-shrink-0 snap-center rounded-2xl bg-white border border-[#E4E4E7] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="relative w-full h-[200px] bg-zinc-100 border-b border-[#E4E4E7]">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="340px"
                      className="object-cover object-top"
                    />
                  </div>
                </Link>

                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-400 mb-2">
                      <span>// 0{idx + 1}</span>
                      <span className="truncate max-w-[180px]">
                        {project.category}
                      </span>
                    </div>

                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-lg font-light tracking-tight text-zinc-950 mb-1.5 hover:text-zinc-600">
                        {project.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-3">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech.name}
                          title={tech.name}
                          className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-50 border border-zinc-200/80"
                        >
                          <TechLogo name={tech.name} size={16} className="shrink-0" />
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-medium text-zinc-900 inline-flex items-center gap-1"
                    >
                      <span>Case study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-zinc-500 hover:text-zinc-950 inline-flex items-center gap-1"
                    >
                      <span>Live site</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe indicator */}
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Swipe to explore →</span>
            <span>8 Production Projects</span>
          </div>
        </div>
      </section>
    </div>
  );
}
