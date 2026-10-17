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
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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

  const rotateY = useTransform(
    smoothProgress,
    [
      targetP - step * 2.2,
      targetP - step * 1.1,
      targetP,
      targetP + step * 1.1,
      targetP + step * 2.2,
    ],
    [-28, -15, 0, 15, 28]
  );

  const scale = useTransform(
    smoothProgress,
    [
      targetP - step * 2.2,
      targetP - step * 1.1,
      targetP,
      targetP + step * 1.1,
      targetP + step * 2.2,
    ],
    [1.08, 0.98, 0.90, 0.98, 1.08]
  );

  const z = useTransform(
    smoothProgress,
    [
      targetP - step * 2.2,
      targetP - step * 1.1,
      targetP,
      targetP + step * 1.1,
      targetP + step * 2.2,
    ],
    [55, -5, -85, -5, 55]
  );

  const y = useTransform(
    smoothProgress,
    [
      targetP - step * 2.2,
      targetP - step * 1.1,
      targetP,
      targetP + step * 1.1,
      targetP + step * 2.2,
    ],
    [16, 5, 0, 5, 16]
  );

  const opacity = useTransform(
    smoothProgress,
    [
      targetP - step * 3.2,
      targetP - step * 2.2,
      targetP,
      targetP + step * 2.2,
      targetP + step * 3.2,
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
        title={project.title}
        aria-label={project.title}
        className="group relative block w-full aspect-video rounded-2xl sm:rounded-3xl bg-zinc-950 overflow-hidden shadow-[0_16px_45px_rgba(0,0,0,0.18)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300"
      >
        {/* Full-Bleed 16:9 Screenshot Visual (Complete 100% Uncut Image Display) */}
        <div className="absolute inset-0 w-full h-full bg-zinc-950 flex items-center justify-center">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 320px, 480px"
            className="object-cover object-center"
            priority={index < 3}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectShowcase3D({ projects }: ProjectShowcase3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D amphitheater carousel dimensions with balanced width and space
  const [dimensions, setDimensions] = useState({
    cardWidth: 480,
    cardGap: 38,
  });

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 420) {
        setDimensions({ cardWidth: 260, cardGap: 16 });
      } else if (width < 640) {
        setDimensions({ cardWidth: 300, cardGap: 20 });
      } else if (width < 1024) {
        setDimensions({ cardWidth: 380, cardGap: 28 });
      } else if (width < 1440) {
        setDimensions({ cardWidth: 460, cardGap: 36 });
      } else {
        setDimensions({ cardWidth: 500, cardGap: 40 });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Extended display list so when reaching the last project, the first cards appear on the right
  // completing the 3D amphitheater loop without an empty void!
  const displayProjects = [
    ...projects,
    ...(projects.length > 2 ? projects.slice(0, 3) : []),
  ];

  // Normal vertical page scroll driving the showcase progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate horizontal travel: reaches the last project cleanly, then allows natural continuation
  const stride = dimensions.cardWidth + dimensions.cardGap;
  const totalTravel = Math.max(0, (projects.length - 1) * stride);
  const trackX = useTransform(smoothProgress, [0, 1], [0, -totalTravel]);

  // Update active index indicator (mapped to original projects list)
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
          UNIFIED SCROLL-DRIVEN 3D AMPHITHEATER CAROUSEL (MOBILE & DESKTOP)
          ========================================================================= */}
      <section
        ref={containerRef}
        className="relative h-[240vh] bg-white border-b border-[#E4E4E7]"
      >
        <div className="sticky top-16 sm:top-20 h-[calc(100dvh-4rem)] sm:h-[calc(100vh-5rem)] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-8 lg:py-12">
          {/* Header Area (Centered, Matching Reference Image) */}
          <div className="w-full max-w-4xl mx-auto px-4 text-center">
            {/* Top Amber/Orange Tag */}
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide text-orange-600 uppercase mb-1.5 sm:mb-3 font-mono">
              Behind the Designs
            </p>

            {/* Bold Headline */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 mb-2 sm:mb-3.5 leading-tight">
              Curious What Else I’ve Created?
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-zinc-500 max-w-xl mx-auto mb-3 sm:mb-6 font-normal leading-relaxed">
              Explore full-stack platforms, client systems, and interactive digital engineering in my portfolio.
            </p>

            {/* "See more Projects ->" Pill Button */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://github.com/ayushudaydubey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-zinc-200/90 bg-white hover:border-zinc-300 text-xs sm:text-sm font-medium text-zinc-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all group"
              >
                <span>See more Projects</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-600 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 shadow-xs">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>
              </a>
            </div>
          </div>

          {/* 3D Perspective Curved Arc Stage */}
          <div
            className="relative w-full flex-1 flex items-center overflow-visible my-1 sm:my-2"
            style={{
              perspective: "1200px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* Left & Right Step Buttons with Seamless Loop */}
            <div className="absolute left-2 sm:left-6 lg:left-12 z-40">
              <button
                type="button"
                onClick={() =>
                  scrollToCard(activeCardIndex === 0 ? projects.length - 1 : activeCardIndex - 1)
                }
                aria-label="Previous project"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-md flex items-center justify-center text-zinc-700 hover:text-zinc-950 hover:bg-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="absolute right-2 sm:right-6 lg:right-12 z-40">
              <button
                type="button"
                onClick={() =>
                  scrollToCard(activeCardIndex === projects.length - 1 ? 0 : activeCardIndex + 1)
                }
                aria-label="Next project"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-md flex items-center justify-center text-zinc-700 hover:text-zinc-950 hover:bg-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
              {displayProjects.map((project, idx) => (
                <CurvedCard
                  key={`${project.slug}-${idx}`}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-3 sm:pt-6 border-t border-zinc-200/80 text-center">
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-orange-600 block mb-0.5 sm:mb-1">
                  #01
                </span>
                <h4 className="text-xs sm:text-sm font-medium text-zinc-900 leading-snug">
                  Strategy & Planning
                </h4>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-orange-600 block mb-0.5 sm:mb-1">
                  #02
                </span>
                <h4 className="text-xs sm:text-sm font-medium text-zinc-900 leading-snug">
                  Design & Development
                </h4>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-orange-600 block mb-0.5 sm:mb-1">
                  #03
                </span>
                <h4 className="text-xs sm:text-sm font-medium text-zinc-900 leading-snug">
                  Launch & Growth
                </h4>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-orange-600 block mb-0.5 sm:mb-1">
                  #04
                </span>
                <h4 className="text-xs sm:text-sm font-medium text-zinc-900 leading-snug">
                  Ongoing Support
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
