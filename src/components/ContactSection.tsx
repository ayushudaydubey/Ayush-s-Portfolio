"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
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
export const CONTACT_ANIMATION_CONFIG = {
  // 1. Heading roll-up animation
  heading: {
    initialRotateX: 80, // roll up from below in degrees
    initialYPercent: 110, // vertical slide percentage
    stagger: 0.12, // delay between line 1 and line 2
    duration: 0.85,
    ease: "power3.out",
  },

  // 2. Two-panel door swing (scrub-linked)
  doorSwing: {
    perspective: 1400,
    leftRotateY: 35, // left column opens from 35deg
    rightRotateY: -35, // right form card opens from -35deg
    zDepth: -150, // depth offset in px
    scrub: 1, // scrub catch-up smoothness
    start: "top 85%",
    end: "top 40%",
  },

  // 3. Form fields cascade fold-down
  formFields: {
    initialRotateX: -60, // folds down from -60deg
    duration: 0.65,
    stagger: 0.1, // delay between field rows
    ease: "back.out(1.4)",
  },

  // 4. Contact cards (email, LinkedIn, GitHub)
  contactCards: {
    zDepth: -100, // pushed back in z
    xOffset: -40, // pushed left
    duration: 0.75,
    stagger: 0.12,
    ease: "power2.out",
  },

  // 5. Magnetic "Send Message" Button
  magnetic: {
    maxBtnMove: 8, // max px button translates
    maxTextMove: 12, // max px inner text moves for parallax
  },

  // 6. Form Card Subtle Mouse Tilt
  formTilt: {
    maxTilt: 4, // subtle 4deg so typing isn't disturbed
  },
};

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);
  const sendBtnTextRef = useRef<HTMLSpanElement>(null);
  const copyBtnIconRef = useRef<HTMLSpanElement>(null);

  // Copy email with 3D 180deg flip animation
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);

    if (copyBtnIconRef.current) {
      gsap.fromTo(
        copyBtnIconRef.current,
        { rotateY: 0 },
        {
          rotateY: 180,
          duration: 0.35,
          ease: "power2.inOut",
        }
      );
    }

    setTimeout(() => {
      if (copyBtnIconRef.current) {
        gsap.to(copyBtnIconRef.current, {
          rotateY: 0,
          duration: 0.35,
          ease: "power2.inOut",
          onComplete: () => setCopied(false),
        });
      } else {
        setCopied(false);
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const formCard = formCardRef.current;
    const sendBtn = sendBtnRef.current;
    const sendBtnText = sendBtnTextRef.current;

    if (!section || !leftCol || !formCard) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Respect prefers-reduced-motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([leftCol, formCard], {
          rotateY: 0,
          z: 0,
          opacity: 1,
        });
      });

      // Mobile screens (<768px): clean fade-up stagger, no door swing/tilt
      mm.add("(max-width: 767px)", () => {
        gsap.from([leftCol, formCard], {
          y: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      // Desktop screens (>=768px): Full 3D Door Swing, Field Cascade & Magnetic Tilt
      mm.add("(min-width: 768px)", () => {
        // -------------------------------------------------------------------
        // 1. HEADING ROLL-UP ANIMATION
        // -------------------------------------------------------------------
        const eyebrow = section.querySelector(".contact-eyebrow");
        const headingLines = section.querySelectorAll(".heading-line-inner");

        const headTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });

        if (eyebrow) {
          headTl.fromTo(
            eyebrow,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }

        if (headingLines.length > 0) {
          headTl.fromTo(
            headingLines,
            {
              yPercent: CONTACT_ANIMATION_CONFIG.heading.initialYPercent,
              rotateX: CONTACT_ANIMATION_CONFIG.heading.initialRotateX,
              opacity: 0,
              transformOrigin: "bottom center",
            },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              duration: CONTACT_ANIMATION_CONFIG.heading.duration,
              stagger: CONTACT_ANIMATION_CONFIG.heading.stagger,
              ease: CONTACT_ANIMATION_CONFIG.heading.ease,
            },
            "-=0.25"
          );
        }

        // -------------------------------------------------------------------
        // 2. TWO-PANEL 3D DOOR SWING (Scrub-linked)
        // -------------------------------------------------------------------
        const doorTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: CONTACT_ANIMATION_CONFIG.doorSwing.start,
            end: CONTACT_ANIMATION_CONFIG.doorSwing.end,
            scrub: CONTACT_ANIMATION_CONFIG.doorSwing.scrub,
          },
        });

        // Left column opens inwards from right center
        doorTl.fromTo(
          leftCol,
          {
            rotateY: CONTACT_ANIMATION_CONFIG.doorSwing.leftRotateY,
            z: CONTACT_ANIMATION_CONFIG.doorSwing.zDepth,
            opacity: 0,
            transformOrigin: "right center",
          },
          {
            rotateY: 0,
            z: 0,
            opacity: 1,
            ease: "power2.out",
          },
          0
        );

        // Right form card opens inwards from left center
        doorTl.fromTo(
          formCard,
          {
            rotateY: CONTACT_ANIMATION_CONFIG.doorSwing.rightRotateY,
            z: CONTACT_ANIMATION_CONFIG.doorSwing.zDepth,
            opacity: 0,
            transformOrigin: "left center",
          },
          {
            rotateY: 0,
            z: 0,
            opacity: 1,
            ease: "power2.out",
          },
          0
        );

        // -------------------------------------------------------------------
        // 3. CONTACT CARDS FLY-IN (Left Column)
        // -------------------------------------------------------------------
        const contactCards = leftCol.querySelectorAll(".contact-card-item");
        if (contactCards.length > 0) {
          gsap.fromTo(
            contactCards,
            {
              z: CONTACT_ANIMATION_CONFIG.contactCards.zDepth,
              x: CONTACT_ANIMATION_CONFIG.contactCards.xOffset,
              opacity: 0,
            },
            {
              z: 0,
              x: 0,
              opacity: 1,
              duration: CONTACT_ANIMATION_CONFIG.contactCards.duration,
              stagger: CONTACT_ANIMATION_CONFIG.contactCards.stagger,
              ease: CONTACT_ANIMATION_CONFIG.contactCards.ease,
              scrollTrigger: {
                trigger: leftCol,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // -------------------------------------------------------------------
        // 4. FORM FIELDS CASCADE FOLD-DOWN & BUTTON FILL-IN (Right Column)
        // -------------------------------------------------------------------
        const formFields = formCard.querySelectorAll(".form-cascade-row");
        const formTl = gsap.timeline({
          scrollTrigger: {
            trigger: formCard,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        if (formFields.length > 0) {
          formTl.fromTo(
            formFields,
            {
              rotateX: CONTACT_ANIMATION_CONFIG.formFields.initialRotateX,
              opacity: 0,
              transformOrigin: "top center",
            },
            {
              rotateX: 0,
              opacity: 1,
              duration: CONTACT_ANIMATION_CONFIG.formFields.duration,
              stagger: CONTACT_ANIMATION_CONFIG.formFields.stagger,
              ease: CONTACT_ANIMATION_CONFIG.formFields.ease,
            }
          );
        }

        if (sendBtn) {
          formTl.fromTo(
            sendBtn,
            {
              scaleX: 0,
              transformOrigin: "left center",
              opacity: 0,
            },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }

        // -------------------------------------------------------------------
        // 5. MAGNETIC "SEND MESSAGE" BUTTON
        // -------------------------------------------------------------------
        if (sendBtn && window.matchMedia("(hover: hover)").matches) {
          const xToBtn = gsap.quickTo(sendBtn, "x", { duration: 0.35, ease: "power3.out" });
          const yToBtn = gsap.quickTo(sendBtn, "y", { duration: 0.35, ease: "power3.out" });
          const xToText = sendBtnText
            ? gsap.quickTo(sendBtnText, "x", { duration: 0.45, ease: "power3.out" })
            : null;
          const yToText = sendBtnText
            ? gsap.quickTo(sendBtnText, "y", { duration: 0.45, ease: "power3.out" })
            : null;

          const onBtnMouseMove = (e: MouseEvent) => {
            const rect = sendBtn.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            xToBtn(relX * CONTACT_ANIMATION_CONFIG.magnetic.maxBtnMove);
            yToBtn(relY * CONTACT_ANIMATION_CONFIG.magnetic.maxBtnMove);

            if (xToText && yToText) {
              xToText(relX * CONTACT_ANIMATION_CONFIG.magnetic.maxTextMove);
              yToText(relY * CONTACT_ANIMATION_CONFIG.magnetic.maxTextMove);
            }
          };

          const onBtnMouseLeave = () => {
            xToBtn(0);
            yToBtn(0);
            if (xToText && yToText) {
              xToText(0);
              yToText(0);
            }
          };

          sendBtn.addEventListener("mousemove", onBtnMouseMove);
          sendBtn.addEventListener("mouseleave", onBtnMouseLeave);
        }

        // -------------------------------------------------------------------
        // 6. FORM CARD SUBTLE MOUSE TILT (Max 4deg)
        // -------------------------------------------------------------------
        if (formCard && window.matchMedia("(hover: hover)").matches) {
          const onFormMouseMove = (e: MouseEvent) => {
            const rect = formCard.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width - 0.5;
            const relY = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(formCard, {
              rotateY: relX * (CONTACT_ANIMATION_CONFIG.formTilt.maxTilt * 2),
              rotateX: -relY * (CONTACT_ANIMATION_CONFIG.formTilt.maxTilt * 2),
              transformPerspective: 1000,
              duration: 0.25,
              ease: "power1.out",
            });
          };

          const onFormMouseLeave = () => {
            gsap.to(formCard, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          };

          formCard.addEventListener("mousemove", onFormMouseMove);
          formCard.addEventListener("mouseleave", onFormMouseLeave);
        }
      });
    }, section);

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
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28 border-b border-[#E4E4E7] scroll-mt-16 bg-[#FAFAF9]"
    >
      <SectionPastelBackground variant="pink-left" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="mb-12 sm:mb-16 border-b border-zinc-200/60 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="contact-eyebrow text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-4">
              [ 06 — Inquiries ]
            </p>
            {/* 3D Roll-up Heading */}
            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.9]"
              aria-label="Get In Touch"
              style={{ perspective: "800px" }}
            >
              <span className="block overflow-hidden pb-1">
                <span className="heading-line-inner inline-block will-change-transform">
                  Get In
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="heading-line-inner inline-block will-change-transform">
                  Touch
                </span>
              </span>
            </h2>
          </div>
          <p className="text-[14px] text-zinc-500 leading-relaxed max-w-sm">
            Have an open role, a project idea, or questions about my work? I typically respond within one business day.
          </p>
        </div>

        {/* Two-Panel Door Swing 3D Container */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          style={{
            perspective: `${CONTACT_ANIMATION_CONFIG.doorSwing.perspective}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Left Column: Direct contact info (Door Swing Left) */}
          <div
            ref={leftColRef}
            className="md:col-span-5 space-y-6 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div>
              <h3 className="text-xl font-light tracking-tight text-zinc-950 mb-2">
                Direct Contact
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                I typically respond within one business day to full-time opportunities and technical inquiries.
              </p>

              {/* Email row with copy & 3D flip icon */}
              <div className="contact-card-item p-3.5 rounded-xl border border-zinc-200 bg-white flex items-center justify-between gap-2 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-md">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <span className="text-xs font-mono text-zinc-800 truncate">
                    {developerProfile.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-xs text-zinc-600 hover:text-blue-600 font-medium cursor-pointer p-1 transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded"
                  aria-label="Copy email address"
                >
                  <span
                    ref={copyBtnIconRef}
                    className="inline-flex items-center justify-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <span
                    aria-live="polite"
                    className={`text-xs ${
                      copied ? "text-emerald-600 font-medium" : "sr-only"
                    }`}
                  >
                    {copied ? "Copied" : "Copy"}
                  </span>
                </button>
              </div>

              {/* Channels list with arrow nudge on hover */}
              <div className="space-y-2">
                <a
                  href={developerProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card-item group/link flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 text-xs font-medium text-zinc-800 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-zinc-600" />
                    <span>LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/link:text-blue-600 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </a>

                <a
                  href={developerProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card-item group/link flex items-center justify-between p-3 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 text-xs font-medium text-zinc-800 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-zinc-600" />
                    <span>GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover/link:text-blue-600 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200/80 text-xs text-zinc-500">
              <span className="font-medium text-zinc-700">Availability:</span>{" "}
              {developerProfile.availability}
            </div>
          </div>

          {/* Right Column: Clean Form (Door Swing Right with Subtle Tilt) */}
          <div
            ref={formCardRef}
            className="md:col-span-7 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="p-6 sm:p-7 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-lg"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="text-xl font-light tracking-tight text-zinc-950 mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-zinc-500 mb-5">
                Fill out the form below to send an email inquiry directly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-lg bg-zinc-50 border border-zinc-200 text-center">
                  <Check className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                  <h4 className="text-sm font-semibold text-zinc-950 mb-1">
                    Message Sent
                  </h4>
                  <p className="text-xs text-zinc-600 mb-4">
                    Thank you, {formData.name}. I will follow up shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" style={{ transformStyle: "preserve-3d" }}>
                  <div className="form-cascade-row grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="transition-all duration-300 focus-within:[transform:translateZ(10px)] focus-within:shadow-[0_8px_20px_rgba(37,99,235,0.08)] rounded-lg">
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-zinc-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your name"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="transition-all duration-300 focus-within:[transform:translateZ(10px)] focus-within:shadow-[0_8px_20px_rgba(37,99,235,0.08)] rounded-lg">
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-zinc-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="form-cascade-row transition-all duration-300 focus-within:[transform:translateZ(10px)] focus-within:shadow-[0_8px_20px_rgba(37,99,235,0.08)] rounded-lg">
                    <label
                      htmlFor="subject"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Project or role inquiry"
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div className="form-cascade-row transition-all duration-300 focus-within:[transform:translateZ(10px)] focus-within:shadow-[0_8px_20px_rgba(37,99,235,0.08)] rounded-lg">
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-zinc-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Write your note here..."
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Magnetic Send Button */}
                  <div className="form-cascade-row pt-1">
                    <button
                      ref={sendBtnRef}
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-zinc-950 text-white text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm relative overflow-hidden select-none"
                    >
                      <span
                        ref={sendBtnTextRef}
                        className="inline-block relative z-10 pointer-events-none"
                      >
                        Send Message
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
