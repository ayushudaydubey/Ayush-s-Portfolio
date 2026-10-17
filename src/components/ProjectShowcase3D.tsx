"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/src/types/project";

interface ProjectShowcase3DProps {
  projects: Project[];
}

interface CurvedCardProps {
  project: Project;
  index: number;
  totalCards: number;
  smoothProgress: MotionValue<number>;
  cardWidth: number;
  cardGap: number;
}

function CurvedCard({
  project,
  index,
  totalCards,
  smoothProgress,
  cardWidth,
  cardGap,
}: CurvedCardProps) {
  // Target progress when this card is at the center of the 3D amphitheater
  const targetP = totalCards > 1 ? index / (totalCards - 1) : 0;
  const step = totalCards > 1 ? 1 / (totalCards - 1) : 0.2;

  // 3D Panoramic Amphitheater Curve:
  // - Outer cards (left & right) are large and angle inward toward the center
  // - Center card dips deeper in Z and faces flat toward the viewer
  const rotateY = useTransform(
    smoothProgress,
    [
      targetP - step * 2.5,
      targetP - step * 1.2,
      targetP,
      targetP + step * 1.2,
      targetP + step * 2.5,
    ],
    [-38, -22, 0, 22, 38]
  );

  const scale = useTransform(
    smoothProgress,
    [
      targetP - step * 2.5,
      targetP - step * 1.2,
      targetP,
      targetP + step * 1.2,
      targetP + step * 2.5,
    ],
    [1.14, 0.98, 0.86, 0.98, 1.14]
  );

  const z = useTransform(
    smoothProgress,
    [
      targetP - step * 2.5,
      targetP - step * 1.2,
      targetP,
      targetP + step * 1.2,
      targetP + step * 2.5,
    ],
    [75, -10, -110, -10, 75]
  );

  const y = useTransform(
    smoothProgress,
    [
      targetP - step * 2.5,
      targetP - step * 1.2,
      targetP,
      targetP + step * 1.2,
      targetP + step * 2.5,
    ],
    [20, 6, 0, 6, 20]
  );

  const opacity = useTransform(
    smoothProgress,
    [
      targetP - step * 3.6,
      targetP - step * 2.6,
      targetP,
      targetP + step * 2.6,
      targetP + step * 3.6,
    ],
    [0.2, 0.95, 1, 0.95, 0.2]
  );

  return (
    <motion.div
      className="relative flex-shrink-0 select-none"
      style={{
        width: cardWidth,
        marginRight: cardGap,
        transformStyle: "preserve-3d",
        rotateY,
        scale,
        z,
        y,
        opacity,
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block w-full h-[360px] sm:h-[420px] md:h-[460px] lg:h-[500px] rounded-2xl sm:rounded-3xl bg-zinc-900 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.16)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.28)] border border-white/20 transition-all duration-300"
      >
        {/* Full-Bleed High-Res Cover Visual */}
        <div className="absolute inset-0 w-full h-full bg-zinc-950">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 260px, 320px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            priority={index < 3}
          />
        </div>

        {/* Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/40 text-white/95 backdrop-blur-md border border-white/15">
            0{index + 1}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/40 text-white/95 backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        {/* Bottom Project Info Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400 mb-1.5 line-clamp-1">
            {project.category}
          </span>
          <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mb-2 leading-snug">
            {project.title}
          </h3>

          {/* Quick Case Study Link */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/15 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/95">
              <span>View Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
            </span>
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.liveUrl, "_blank", "noopener,noreferrer");
              }}
              className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors"
            >
              <span>Live Site</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectShowcase3D({ projects }: ProjectShowcase3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [dimensions, setDimensions] = useState({
    cardWidth: 260,
    cardGap: 24,
  });

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ cardWidth: 220, cardGap: 16 });
      } else if (width < 1024) {
        setDimensions({ cardWidth: 240, cardGap: 20 });
      } else {
        setDimensions({ cardWidth: 270, cardGap: 26 });
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

  // Smooth spring interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate horizontal travel
  const stride = dimensions.cardWidth + dimensions.cardGap;
  const totalTravel = Math.max(0, (projects.length - 1) * stride);
  const trackX = useTransform(smoothProgress, [0, 1], [0, -totalTravel]);

  // Update active index indicator
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

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const totalHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = totalHeight - viewportHeight;

    if (scrollableDistance > 0 && projects.length > 1) {
      const fraction = index / (projects.length - 1);
      window.scrollTo({
        top: sectionTop + fraction * scrollableDistance,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="projects" className="relative scroll-mt-16 bg-white">
      {/* =========================================================================
          DESKTOP & TABLET: 3D PANORAMIC AMPHITHEATER CAROUSEL (AS PER REFERENCE IMAGE)
          ========================================================================= */}
      <section
        ref={containerRef}
        className="hidden md:block relative h-[320vh] bg-white border-b border-[#E4E4E7]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 lg:py-12">
          {/* Header Area (Centered, Matching Reference Image) */}
          <div className="w-full max-w-4xl mx-auto px-4 text-center">
            {/* Top Amber/Orange Tag */}
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-orange-600 uppercase mb-3 font-mono">
              Behind the Designs
            </p>

            {/* Bold Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 mb-3.5 leading-tight">
              Curious What Else I’ve Created?
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-500 max-w-xl mx-auto mb-6 font-normal leading-relaxed">
              Explore full-stack platforms, client systems, and interactive digital engineering in my portfolio.
            </p>

            {/* "See more Projects ->" Pill Button */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/ayushudaydubey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-200/90 bg-white hover:border-zinc-300 text-sm font-medium text-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all group"
              >
                <span>See more Projects</span>
                <span className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          </div>

          {/* 3D Perspective Curved Arc Stage */}
          <div
            className="relative w-full flex-1 flex items-center overflow-visible my-2"
            style={{
              perspective: "1400px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* Left & Right Step Buttons */}
            <div className="absolute left-6 lg:left-12 z-40">
              <button
                type="button"
                onClick={() => scrollToCard(Math.max(0, activeCardIndex - 1))}
                disabled={activeCardIndex === 0}
                aria-label="Previous project"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-md flex items-center justify-center text-zinc-700 hover:text-zinc-950 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute right-6 lg:right-12 z-40">
              <button
                type="button"
                onClick={() => scrollToCard(Math.min(projects.length - 1, activeCardIndex + 1))}
                disabled={activeCardIndex === projects.length - 1}
                aria-label="Next project"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-md flex items-center justify-center text-zinc-700 hover:text-zinc-950 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Moving Track */}
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
                <CurvedCard
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

          {/* Bottom 4 Pillars (Matching Reference Image) */}
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-zinc-200/80 text-center">
              <div>
                <span className="text-xs font-mono font-bold text-orange-600 block mb-1">
                  #01
                </span>
                <h4 className="text-sm font-medium text-zinc-900 leading-snug">
                  Strategy & Planning
                </h4>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-orange-600 block mb-1">
                  #02
                </span>
                <h4 className="text-sm font-medium text-zinc-900 leading-snug">
                  Design & Development
                </h4>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-orange-600 block mb-1">
                  #03
                </span>
                <h4 className="text-sm font-medium text-zinc-900 leading-snug">
                  Launch & Growth
                </h4>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-orange-600 block mb-1">
                  #04
                </span>
                <h4 className="text-sm font-medium text-zinc-900 leading-snug">
                  Ongoing Support
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MOBILE VIEW: CURVED TOUCH-FRIENDLY SWIPE SHOWCASE
          ========================================================================= */}
      <section
        id="projects-mobile"
        className="block md:hidden py-16 sm:py-20 border-b border-[#E4E4E7] bg-white"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-semibold tracking-wide text-orange-600 uppercase mb-2 font-mono">
              Behind the Designs
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 mb-3 leading-tight">
              Curious What Else I’ve Created?
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mx-auto mb-5">
              Swipe horizontally to browse through production applications and design systems.
            </p>
            <a
              href="https://github.com/ayushudaydubey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white text-xs font-medium text-zinc-800 shadow-xs"
            >
              <span>See more Projects</span>
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </span>
            </a>
          </div>

          {/* Swipe Track */}
          <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none -mx-4 px-4">
            {projects.map((project, idx) => (
              <div
                key={project.slug}
                className="w-[78vw] max-w-[280px] h-[380px] flex-shrink-0 snap-center rounded-2xl bg-zinc-900 overflow-hidden relative shadow-lg"
              >
                <Link href={`/projects/${project.slug}`} className="block w-full h-full relative">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="280px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                  <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/50 text-white border border-white/15">
                      0{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/50 text-white border border-white/15">
                      Live
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-4 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 block mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-base font-medium text-white mb-1.5 leading-snug">
                      {project.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs text-orange-400">
                      <span>Explore case study</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile Bottom 4 Pillars */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-200/70 text-center mt-6">
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 block mb-0.5">
                #01
              </span>
              <h4 className="text-xs font-medium text-zinc-900">Strategy & Planning</h4>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 block mb-0.5">
                #02
              </span>
              <h4 className="text-xs font-medium text-zinc-900">Design & Development</h4>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 block mb-0.5">
                #03
              </span>
              <h4 className="text-xs font-medium text-zinc-900">Launch & Growth</h4>
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-orange-600 block mb-0.5">
                #04
              </span>
              <h4 className="text-xs font-medium text-zinc-900">Ongoing Support</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
