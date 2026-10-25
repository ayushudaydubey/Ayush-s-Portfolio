"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { developerProfile } from "../data/portfolio";
import { SectionPastelBackground } from "./SectionPastelBackground";

/**
 * =========================================================================
 * ANIMATION CONFIGURATION
 * =========================================================================
 * Tweak any angles, distances, durations, or staggers here.
 */
export const FOOTER_ANIMATION_CONFIG = {
  // 1. Footer entrance 3D curtain lift
  curtainLift: {
    perspective: 1200,
    initialRotateX: 12, // slightly tilted back
    initialScale: 0.96, // scaled down
    initialY: 60, // translated down
    scrub: 1, // scroll scrub smoothness
    start: "top 95%",
    end: "bottom bottom",
  },

  // 2. Name character flip-in
  name: {
    rotateX: -90, // starts flipped down
    y: 40,
    stagger: 0.04,
    duration: 0.75,
    ease: "back.out(1.6)",
  },

  // 3. Labels letter-spacing collapse
  labels: {
    initialLetterSpacing: "0.28em",
    targetLetterSpacing: "0.16em",
    duration: 0.65,
    ease: "power2.out",
  },

  // 4. Nav and Case Study Links entrance
  links: {
    x: -20,
    z: -60,
    stagger: 0.04,
    duration: 0.55,
    ease: "power2.out",
  },

  // 5. Social icons pop-in & magnetic hover
  social: {
    scale: 0.5,
    rotateY: 90,
    stagger: 0.1,
    duration: 0.6,
    ease: "back.out(2)",
    magneticMax: 8,
  },

  // 6. Name subtle mouse parallax
  nameParallax: {
    maxTilt: 3, // subtle 3deg tilt
  },
};

const NAME_LINE_1 = "AYUSH";
const NAME_LINE_2 = "DUBEY";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

const CASE_STUDY_LINKS = [
  { href: "/projects/prospect-data-engine", label: "Prospect Data Engine" },
  { href: "/projects/painteye", label: "PaintEye" },
  { href: "/projects/tech-inject-design-library", label: "Tech Inject Design Library" },
  { href: "/projects/chatzone", label: "ChatZone" },
  { href: "/projects/exotic-car-detailing-studio", label: "Exotic Car Detailing" },
  { href: "/projects/doubt-tracker", label: "Doubt Tracker" },
  { href: "/projects/gnosys-digital", label: "Gnosys Digital" },
  { href: "/projects/ltm-model", label: "LTM Model" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const innerWrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footer = footerRef.current;
    const inner = innerWrapRef.current;
    const nameWrap = nameRef.current;
    const divider = dividerRef.current;

    if (!footer || !inner) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Respect prefers-reduced-motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(inner, { rotateX: 0, scale: 1, y: 0, opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // -------------------------------------------------------------------
        // 1. FOOTER ENTRANCE (3D Curtain Lift Scrub)
        // -------------------------------------------------------------------
        gsap.fromTo(
          inner,
          {
            rotateX: FOOTER_ANIMATION_CONFIG.curtainLift.initialRotateX,
            scale: FOOTER_ANIMATION_CONFIG.curtainLift.initialScale,
            y: FOOTER_ANIMATION_CONFIG.curtainLift.initialY,
            transformPerspective: FOOTER_ANIMATION_CONFIG.curtainLift.perspective,
            transformOrigin: "center bottom",
          },
          {
            rotateX: 0,
            scale: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: footer,
              start: FOOTER_ANIMATION_CONFIG.curtainLift.start,
              end: FOOTER_ANIMATION_CONFIG.curtainLift.end,
              scrub: FOOTER_ANIMATION_CONFIG.curtainLift.scrub,
            },
          }
        );

        // -------------------------------------------------------------------
        // 2. NAME "AYUSH DUBEY" CHARACTER FLIP-IN
        // -------------------------------------------------------------------
        const chars = footer.querySelectorAll<HTMLSpanElement>(".name-char");
        if (chars.length > 0) {
          gsap.fromTo(
            chars,
            {
              rotateX: FOOTER_ANIMATION_CONFIG.name.rotateX,
              y: FOOTER_ANIMATION_CONFIG.name.y,
              opacity: 0,
              transformOrigin: "50% 100%",
            },
            {
              rotateX: 0,
              y: 0,
              opacity: 1,
              duration: FOOTER_ANIMATION_CONFIG.name.duration,
              stagger: FOOTER_ANIMATION_CONFIG.name.stagger,
              ease: FOOTER_ANIMATION_CONFIG.name.ease,
              scrollTrigger: {
                trigger: footer,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // -------------------------------------------------------------------
        // 3. MONO LABELS FADE-IN & LETTER-SPACING COLLAPSE
        // -------------------------------------------------------------------
        const monoLabels = footer.querySelectorAll<HTMLElement>(".footer-mono-label");
        if (monoLabels.length > 0) {
          gsap.fromTo(
            monoLabels,
            {
              letterSpacing: FOOTER_ANIMATION_CONFIG.labels.initialLetterSpacing,
              opacity: 0,
            },
            {
              letterSpacing: FOOTER_ANIMATION_CONFIG.labels.targetLetterSpacing,
              opacity: 1,
              duration: FOOTER_ANIMATION_CONFIG.labels.duration,
              stagger: 0.12,
              ease: FOOTER_ANIMATION_CONFIG.labels.ease,
              scrollTrigger: {
                trigger: footer,
                start: "top 82%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // -------------------------------------------------------------------
        // 4. NAV LINKS & CASE STUDY LINKS STAGGER FROM LEFT
        // -------------------------------------------------------------------
        const navLinks = footer.querySelectorAll<HTMLAnchorElement>(".footer-link-item");
        if (navLinks.length > 0) {
          gsap.fromTo(
            navLinks,
            {
              x: FOOTER_ANIMATION_CONFIG.links.x,
              z: FOOTER_ANIMATION_CONFIG.links.z,
              opacity: 0,
            },
            {
              x: 0,
              z: 0,
              opacity: 1,
              duration: FOOTER_ANIMATION_CONFIG.links.duration,
              stagger: FOOTER_ANIMATION_CONFIG.links.stagger,
              ease: FOOTER_ANIMATION_CONFIG.links.ease,
              scrollTrigger: {
                trigger: footer,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // -------------------------------------------------------------------
        // 5. SOCIAL ICONS POP-IN
        // -------------------------------------------------------------------
        const socialIcons = footer.querySelectorAll<HTMLAnchorElement>(".social-magnetic-btn");
        if (socialIcons.length > 0) {
          gsap.fromTo(
            socialIcons,
            {
              scale: FOOTER_ANIMATION_CONFIG.social.scale,
              rotateY: FOOTER_ANIMATION_CONFIG.social.rotateY,
              opacity: 0,
            },
            {
              scale: 1,
              rotateY: 0,
              opacity: 1,
              duration: FOOTER_ANIMATION_CONFIG.social.duration,
              stagger: FOOTER_ANIMATION_CONFIG.social.stagger,
              ease: FOOTER_ANIMATION_CONFIG.social.ease,
              scrollTrigger: {
                trigger: footer,
                start: "top 78%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // -------------------------------------------------------------------
        // 6. BOTTOM DIVIDER LINE DRAW FROM LEFT TO RIGHT
        // -------------------------------------------------------------------
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: divider,
                start: "top 95%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // -------------------------------------------------------------------
        // 7. INTERACTIONS: FLOATING "BACK TO TOP" ARROW
        // -------------------------------------------------------------------
        const arrow = footer.querySelector(".back-to-top-arrow");
        if (arrow) {
          gsap.to(arrow, {
            y: -4,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
          });
        }

        // -------------------------------------------------------------------
        // 8. INTERACTIONS: NAME "AYUSH DUBEY" SUBTLE MOUSE PARALLAX TILT
        // -------------------------------------------------------------------
        if (nameWrap && window.matchMedia("(hover: hover)").matches) {
          const onNameMouseMove = (e: MouseEvent) => {
            const rect = nameWrap.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(nameWrap, {
              rotateY: relX * (FOOTER_ANIMATION_CONFIG.nameParallax.maxTilt * 2),
              rotateX: -relY * (FOOTER_ANIMATION_CONFIG.nameParallax.maxTilt * 2),
              duration: 0.3,
              ease: "power1.out",
              transformPerspective: 800,
            });
          };

          const onNameMouseLeave = () => {
            gsap.to(nameWrap, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          };

          nameWrap.addEventListener("mousemove", onNameMouseMove);
          nameWrap.addEventListener("mouseleave", onNameMouseLeave);
        }

        // -------------------------------------------------------------------
        // 9. INTERACTIONS: MAGNETIC EFFECT ON SOCIAL ICONS
        // -------------------------------------------------------------------
        if (window.matchMedia("(hover: hover)").matches) {
          socialIcons.forEach((btn) => {
            const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3.out" });
            const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });

            const onBtnMove = (e: MouseEvent) => {
              const rect = btn.getBoundingClientRect();
              const relX = (e.clientX - rect.left) / rect.width - 0.5;
              const relY = (e.clientY - rect.top) / rect.height - 0.5;

              xTo(relX * FOOTER_ANIMATION_CONFIG.social.magneticMax);
              yTo(relY * FOOTER_ANIMATION_CONFIG.social.magneticMax);

              gsap.to(btn, {
                rotateY: relX * 16,
                rotateX: -relY * 16,
                scale: 1.12,
                duration: 0.2,
                ease: "power1.out",
                transformPerspective: 400,
              });
            };

            const onBtnLeave = () => {
              xTo(0);
              yTo(0);
              gsap.to(btn, {
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                duration: 0.45,
                ease: "power2.out",
              });
            };

            btn.addEventListener("mousemove", onBtnMove);
            btn.addEventListener("mouseleave", onBtnLeave);
          });
        }
      });
    }, footer);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative overflow-hidden w-full pt-16 pb-12 border-t border-zinc-200/80 bg-[#FAFAF9]"
      style={{
        // Original Off-White Palette Variables
        ["--footer-bg" as string]: "#FAFAF9",
        ["--footer-name" as string]: "#18181B",
        ["--footer-text" as string]: "#71717A",
        ["--footer-label" as string]: "#A1A1AA",
        ["--footer-divider" as string]: "#E4E4E7",
        ["--footer-hover" as string]: "#18181B",
        backgroundColor: "var(--footer-bg)",
        perspective: `${FOOTER_ANIMATION_CONFIG.curtainLift.perspective}px`,
        transformStyle: "preserve-3d",
      }}
    >
      <SectionPastelBackground variant="blue-left" />

      {/* 3D Curtain Lift Inner Container */}
      <div
        ref={innerWrapRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Identity Column */}
          <div className="md:col-span-2">
            <p
              className="footer-mono-label text-[11px] font-mono uppercase tracking-[0.16em] mb-3"
              style={{ color: "var(--footer-label)" }}
            >
              [ Full Stack Developer ]
            </p>

            {/* Split-Character Name with 3D Parallax */}
            <div
              ref={nameRef}
              className="inline-block mb-3 leading-[0.92] select-none cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link
                href="/"
                className="group block"
                aria-label="Ayush Dubey"
              >
                <span
                  className="block text-3xl sm:text-4xl font-light tracking-tighter uppercase transition-colors duration-200 hover:text-zinc-600"
                  style={{ color: "var(--footer-name)" }}
                >
                  <span className="block overflow-hidden pb-0.5">
                    {NAME_LINE_1.split("").map((char, i) => (
                      <span
                        key={`n1-${i}`}
                        className="name-char inline-block will-change-transform"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                  <span className="block overflow-hidden pb-0.5">
                    {NAME_LINE_2.split("").map((char, i) => (
                      <span
                        key={`n2-${i}`}
                        className="name-char inline-block will-change-transform"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </span>
              </Link>
            </div>

            <p
              className="text-xs leading-relaxed max-w-sm mb-6"
              style={{ color: "var(--footer-text)" }}
            >
              Full Stack &amp; MERN Stack Developer specializing in React.js, Next.js, Node.js, Express.js, REST APIs, MongoDB, and PostgreSQL.
            </p>

            {/* Magnetic 3D Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href={developerProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-magnetic-btn p-2 rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-950 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)] inline-flex items-center justify-center"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 pointer-events-none" />
              </a>

              <a
                href={developerProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-magnetic-btn p-2 rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-950 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)] inline-flex items-center justify-center"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4 pointer-events-none" />
              </a>

              <a
                href={`mailto:${developerProfile.email}`}
                className="social-magnetic-btn p-2 rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-950 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)] inline-flex items-center justify-center"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4 pointer-events-none" />
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4
              className="footer-mono-label text-[11px] font-mono uppercase tracking-[0.16em] mb-4"
              style={{ color: "var(--footer-label)" }}
            >
              [ Navigation ]
            </h4>
            <ul className="space-y-2.5 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link-item group/link relative inline-block tracking-[0.04em] transition-colors duration-200"
                    style={{ color: "var(--footer-text)" }}
                  >
                    <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1.5 group-hover/link:text-zinc-950">
                      {link.label}
                      {/* Underline drawn in from left on hover */}
                      <span
                        className="absolute left-0 -bottom-0.5 h-[1px] w-full bg-zinc-950 scale-x-0 origin-left transition-transform duration-200 group-hover/link:scale-x-100"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Case Studies Column */}
          <div>
            <h4
              className="footer-mono-label text-[11px] font-mono uppercase tracking-[0.16em] mb-4"
              style={{ color: "var(--footer-label)" }}
            >
              [ Case Studies ]
            </h4>
            <ul className="space-y-2 text-xs">
              {CASE_STUDY_LINKS.map((proj) => (
                <li key={proj.label}>
                  <Link
                    href={proj.href}
                    className="footer-link-item group/link relative inline-block tracking-[0.04em] transition-colors duration-200"
                    style={{ color: "var(--footer-text)" }}
                  >
                    <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1.5 group-hover/link:text-zinc-950">
                      {proj.label}
                      {/* Underline drawn in from left on hover */}
                      <span
                        className="absolute left-0 -bottom-0.5 h-[1px] w-full bg-zinc-950 scale-x-0 origin-left transition-transform duration-200 group-hover/link:scale-x-100"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom divider line (Draws left-to-right) */}
        <div
          ref={dividerRef}
          className="h-[1px] w-full origin-left will-change-transform mb-8"
          style={{ backgroundColor: "var(--footer-divider)" }}
        />

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-wider"
          style={{ color: "var(--footer-label)" }}
        >
          <p>© {new Date().getFullYear()} AYUSH DUBEY. ALL RIGHTS RESERVED.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 transition-colors duration-200 text-zinc-500 hover:text-zinc-950 cursor-pointer select-none"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <span className="back-to-top-arrow inline-block will-change-transform text-zinc-500 group-hover:text-zinc-950">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
