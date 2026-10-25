"use client";

import React, { useRef, useEffect } from "react";
import { GraduationCap, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { educationData, certificationsData } from "../data/portfolio";
import { SectionPastelBackground } from "./SectionPastelBackground";

/**
 * =========================================================================
 * ANIMATION CONFIGURATION
 * =========================================================================
 * Tweak any animation intensity, angles, durations, or staggers here.
 */
export const ANIMATION_CONFIG = {
  // 1. Overall section entrance 3D tilt & scrub
  section: {
    perspective: 1200,
    initialRotateX: 25, // tilted back in degrees
    initialScale: 0.85, // scaled down at start of scroll
    initialY: 90, // pushed down distance in px
    initialOpacity: 0.15, // initial fade
    scrub: 1, // scroll scrub smoothness (1s catch-up)
  },

  // 2. Heading character 3D flip-in
  heading: {
    rotateX: -90, // starts flipped down
    stagger: 0.04, // delay between each character
    duration: 0.75, // duration per character
    ease: "back.out(1.8)", // spring overshoot on landing
  },

  // 3. Sub-labels ("Higher Education", "Certifications")
  sublabel: {
    x: -36, // slide in from left
    duration: 0.6,
    ease: "power2.out",
  },

  // 4. Cards 3D depth fly-in
  cards: {
    z: -200, // pushed deep back in 3D space
    rotateY: -35, // angled around Y
    rotateX: 15, // angled around X
    x: -60, // pushed left
    stagger: 0.18, // sequential card delay
    duration: 0.85,
    ease: "power3.out",
  },

  // 5. Badges & Date tags pop-in
  badges: {
    scale: 0.6,
    duration: 0.5,
    ease: "back.out(2.2)",
  },

  // 6. Interactive mouse 3D tilt on individual cards
  tilt: {
    maxTilt: 12, // max tilt angle in degrees
    transformPerspective: 900,
    resetDuration: 0.55,
    tiltEase: "power1.out",
  },
};

const HEADING_LINE_1 = "Academic &";
const HEADING_LINE_2 = "Training";

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger inside client-side useEffect only
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const inner = innerContainerRef.current;
    if (!section || !inner) return;

    // Use gsap.context for React Strict Mode and Next.js route change hygiene
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Respect prefers-reduced-motion: if reduced, show content cleanly without 3D transforms
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(inner, { rotateX: 0, scale: 1, y: 0, opacity: 1 });
      });

      // Full animation timeline for standard viewports
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // -------------------------------------------------------------------
        // 1. SECTION 3D SCROLL ENTRANCE (Scrubbed)
        // -------------------------------------------------------------------
        gsap.fromTo(
          inner,
          {
            rotateX: ANIMATION_CONFIG.section.initialRotateX,
            scale: ANIMATION_CONFIG.section.initialScale,
            y: ANIMATION_CONFIG.section.initialY,
            opacity: ANIMATION_CONFIG.section.initialOpacity,
            transformPerspective: ANIMATION_CONFIG.section.perspective,
            transformOrigin: "center top",
          },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: section,
              start: "top 92%",
              end: "top 35%",
              scrub: ANIMATION_CONFIG.section.scrub,
            },
          }
        );

        // -------------------------------------------------------------------
        // 2. HEADING CHARACTER FLIP-IN ANIMATION
        // -------------------------------------------------------------------
        const chars = inner.querySelectorAll<HTMLSpanElement>(".heading-char");
        if (chars.length > 0) {
          gsap.fromTo(
            chars,
            {
              rotateX: ANIMATION_CONFIG.heading.rotateX,
              opacity: 0,
              y: 18,
              transformOrigin: "50% 100%",
            },
            {
              rotateX: 0,
              opacity: 1,
              y: 0,
              duration: ANIMATION_CONFIG.heading.duration,
              stagger: ANIMATION_CONFIG.heading.stagger,
              ease: ANIMATION_CONFIG.heading.ease,
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // -------------------------------------------------------------------
        // 3. HIGHER EDUCATION GROUP (Sublabel, 3D Cards Fly-in, Badges Pop)
        // -------------------------------------------------------------------
        const eduGroup = inner.querySelector<HTMLDivElement>(".edu-group");
        if (eduGroup) {
          const eduSublabel = eduGroup.querySelector(".group-sublabel");
          const eduCards = eduGroup.querySelectorAll(".card-3d");
          const eduBadges = eduGroup.querySelectorAll(".badge-tag");

          const eduTl = gsap.timeline({
            scrollTrigger: {
              trigger: eduGroup,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          });

          if (eduSublabel) {
            eduTl.fromTo(
              eduSublabel,
              { x: ANIMATION_CONFIG.sublabel.x, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: ANIMATION_CONFIG.sublabel.duration,
                ease: ANIMATION_CONFIG.sublabel.ease,
              }
            );
          }

          if (eduCards.length > 0) {
            eduTl.fromTo(
              eduCards,
              {
                z: ANIMATION_CONFIG.cards.z,
                rotateY: ANIMATION_CONFIG.cards.rotateY,
                rotateX: ANIMATION_CONFIG.cards.rotateX,
                x: ANIMATION_CONFIG.cards.x,
                opacity: 0,
                transformPerspective: 1000,
              },
              {
                z: 0,
                rotateY: 0,
                rotateX: 0,
                x: 0,
                opacity: 1,
                duration: ANIMATION_CONFIG.cards.duration,
                stagger: ANIMATION_CONFIG.cards.stagger,
                ease: ANIMATION_CONFIG.cards.ease,
              },
              "-=0.3"
            );
          }

          if (eduBadges.length > 0) {
            eduTl.fromTo(
              eduBadges,
              { scale: ANIMATION_CONFIG.badges.scale, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: ANIMATION_CONFIG.badges.duration,
                stagger: 0.08,
                ease: ANIMATION_CONFIG.badges.ease,
              },
              "-=0.4"
            );
          }
        }

        // -------------------------------------------------------------------
        // 4. CERTIFICATIONS GROUP (Sublabel, 3D Cards Fly-in, Badges Pop)
        // -------------------------------------------------------------------
        const certGroup = inner.querySelector<HTMLDivElement>(".cert-group");
        if (certGroup) {
          const certSublabel = certGroup.querySelector(".group-sublabel");
          const certCards = certGroup.querySelectorAll(".card-3d");
          const certBadges = certGroup.querySelectorAll(".badge-tag");

          const certTl = gsap.timeline({
            scrollTrigger: {
              trigger: certGroup,
              start: "top 84%",
              toggleActions: "play none none none",
            },
          });

          if (certSublabel) {
            certTl.fromTo(
              certSublabel,
              { x: ANIMATION_CONFIG.sublabel.x, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: ANIMATION_CONFIG.sublabel.duration,
                ease: ANIMATION_CONFIG.sublabel.ease,
              }
            );
          }

          if (certCards.length > 0) {
            certTl.fromTo(
              certCards,
              {
                z: ANIMATION_CONFIG.cards.z,
                rotateY: ANIMATION_CONFIG.cards.rotateY,
                rotateX: ANIMATION_CONFIG.cards.rotateX,
                x: ANIMATION_CONFIG.cards.x,
                opacity: 0,
                transformPerspective: 1000,
              },
              {
                z: 0,
                rotateY: 0,
                rotateX: 0,
                x: 0,
                opacity: 1,
                duration: ANIMATION_CONFIG.cards.duration,
                stagger: ANIMATION_CONFIG.cards.stagger,
                ease: ANIMATION_CONFIG.cards.ease,
              },
              "-=0.3"
            );
          }

          if (certBadges.length > 0) {
            certTl.fromTo(
              certBadges,
              { scale: ANIMATION_CONFIG.badges.scale, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: ANIMATION_CONFIG.badges.duration,
                stagger: 0.08,
                ease: ANIMATION_CONFIG.badges.ease,
              },
              "-=0.4"
            );
          }
        }

        // -------------------------------------------------------------------
        // 5. INTERACTIVE 3D MOUSE TILT & GLARE EFFECT ON EVERY CARD
        // -------------------------------------------------------------------
        if (window.matchMedia("(hover: hover)").matches) {
          const allCards = inner.querySelectorAll<HTMLDivElement>(".card-3d");
          allCards.forEach((card) => {
            const glare = card.querySelector<HTMLDivElement>(".card-glare");

            const onMouseMove = (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const normX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
              const normY = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

              const rotY = normX * (ANIMATION_CONFIG.tilt.maxTilt * 2);
              const rotX = -normY * (ANIMATION_CONFIG.tilt.maxTilt * 2);

              gsap.to(card, {
                rotateX: rotX,
                rotateY: rotY,
                transformPerspective: ANIMATION_CONFIG.tilt.transformPerspective,
                boxShadow: "0 18px 38px rgba(0, 0, 0, 0.07)",
                duration: 0.16,
                ease: ANIMATION_CONFIG.tilt.tiltEase,
              });

              if (glare) {
                const posX = ((e.clientX - rect.left) / rect.width) * 100;
                const posY = ((e.clientY - rect.top) / rect.height) * 100;
                glare.style.background = `radial-gradient(circle 260px at ${posX}% ${posY}%, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 75%)`;
                gsap.to(glare, { opacity: 1, duration: 0.2 });
              }
            };

            const onMouseLeave = () => {
              gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
                duration: ANIMATION_CONFIG.tilt.resetDuration,
                ease: "power2.out",
              });

              if (glare) {
                gsap.to(glare, {
                  opacity: 0,
                  duration: ANIMATION_CONFIG.tilt.resetDuration,
                });
              }
            };

            card.addEventListener("mousemove", onMouseMove);
            card.addEventListener("mouseleave", onMouseLeave);
          });
        }
      });
    }, section);

    // Refresh ScrollTrigger after layout calculation
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#E4E4E7] scroll-mt-16 bg-[#FAFAF9]"
      style={{
        perspective: `${ANIMATION_CONFIG.section.perspective}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <SectionPastelBackground variant="green-left" />

      {/* 3D Tilted Inner Container */}
      <div
        ref={innerContainerRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {/* Editorial Section Header */}
        <div className="mb-12 sm:mb-16 border-b border-zinc-200/60 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-4">
              [ 05 — Credentials ]
            </p>
            {/* Accessible Character-Split 3D Heading */}
            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.9]"
              aria-label="Academic & Training"
              style={{ perspective: "800px" }}
            >
              <span className="block" aria-hidden="true">
                {HEADING_LINE_1.split("").map((char, i) => (
                  <span
                    key={`l1-${i}`}
                    className="heading-char inline-block"
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="block" aria-hidden="true">
                {HEADING_LINE_2.split("").map((char, i) => (
                  <span
                    key={`l2-${i}`}
                    className="heading-char inline-block"
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h2>
          </div>
          <p className="text-[14px] text-zinc-500 leading-relaxed max-w-sm">
            Formal degrees in computer science and mathematics alongside comprehensive professional full-stack training.
          </p>
        </div>

        <div className="space-y-12">
          {/* Higher Education Group */}
          <div className="edu-group space-y-4">
            <h3 className="group-sublabel text-xs font-mono uppercase tracking-[0.14em] text-zinc-400 mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-zinc-400" />
              <span>Higher Education</span>
            </h3>

            <div className="grid grid-cols-1 gap-4" style={{ transformStyle: "preserve-3d" }}>
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className="card-3d relative p-6 sm:p-7 rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-zinc-300 transition-colors duration-300 overflow-hidden cursor-default"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Soft Glare Layer that follows mouse cursor */}
                  <div
                    className="card-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <h4 className="text-xl font-light tracking-tight text-zinc-950">
                      {edu.degree}
                    </h4>
                    {edu.period.toLowerCase().includes("pursuing") ? (
                      <span className="badge-tag self-start inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md whitespace-nowrap font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {edu.period}
                      </span>
                    ) : (
                      <span className="badge-tag self-start text-[11px] font-mono text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-md whitespace-nowrap">
                        {edu.period}
                      </span>
                    )}
                  </div>

                  <p className="relative z-10 text-sm text-zinc-600 mb-2">
                    {edu.institution}
                  </p>

                  {edu.statusOrType && (
                    <p className="relative z-10 text-xs text-zinc-500 font-normal">
                      {edu.statusOrType}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Group */}
          <div className="cert-group space-y-4 pt-6 border-t border-zinc-200/80">
            <h3 className="group-sublabel text-xs font-mono uppercase tracking-[0.14em] text-zinc-400 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-zinc-400" />
              <span>Certifications</span>
            </h3>

            <div className="grid grid-cols-1 gap-4" style={{ transformStyle: "preserve-3d" }}>
              {certificationsData.map((cert) => (
                <div
                  key={cert.id}
                  className="card-3d relative p-6 sm:p-7 rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-zinc-300 transition-colors duration-300 overflow-hidden cursor-default"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Soft Glare Layer that follows mouse cursor */}
                  <div
                    className="card-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                    <h4 className="text-xl font-light tracking-tight text-zinc-950">
                      {cert.title}
                    </h4>
                    <span className="badge-tag self-start text-[11px] font-mono text-zinc-500 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-md whitespace-nowrap">
                      {cert.period}
                    </span>
                  </div>

                  <p className="relative z-10 text-sm text-zinc-600 mb-3">
                    {cert.institution}
                  </p>

                  <p className="relative z-10 text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-3xl">
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

// Export both names so import can use either AcademicSection or EducationSection
export { EducationSection as AcademicSection };
