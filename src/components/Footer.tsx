"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { developerProfile } from "../data/portfolio";
import { SectionPastelBackground } from "./SectionPastelBackground";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden w-full bg-[#FAFAF9] border-t border-zinc-200/80 pt-16 pb-12">
      <SectionPastelBackground variant="blue-left" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Identity */}
          <div className="md:col-span-2">
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-3">
              [ Full Stack Developer ]
            </p>
            <Link
              href="/"
              className="inline-block text-3xl sm:text-4xl font-light tracking-tighter uppercase text-zinc-950 mb-3 hover:text-zinc-600 transition-colors leading-[0.92]"
            >
              Ayush<br />Dubey
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm mb-6">
              Full Stack &amp; MERN Stack Developer specializing in React.js, Next.js, Node.js, Express.js, REST APIs, MongoDB, and PostgreSQL.
            </p>

            <div className="flex items-center gap-2">
              <a
                href={developerProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-400 hover:text-zinc-950 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={developerProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-400 hover:text-zinc-950 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${developerProfile.email}`}
                className="p-1.5 text-zinc-400 hover:text-zinc-950 transition-colors"
                aria-label="Email Me"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-4">
              [ Navigation ]
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-600">
              <li>
                <Link href="/" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#education" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects Direct */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-400 mb-4">
              [ Case Studies ]
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              <li>
                <Link href="/projects/prospect-data-engine" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Prospect Data Engine
                </Link>
              </li>
              <li>
                <Link href="/projects/painteye" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  PaintEye
                </Link>
              </li>
              <li>
                <Link href="/projects/tech-inject-design-library" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Tech Inject Design Library
                </Link>
              </li>
              <li>
                <Link href="/projects/chatzone" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  ChatZone
                </Link>
              </li>
              <li>
                <Link href="/projects/exotic-car-detailing-studio" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Exotic Car Detailing
                </Link>
              </li>
              <li>
                <Link href="/projects/doubt-tracker" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Doubt Tracker
                </Link>
              </li>
              <li>
                <Link href="/projects/gnosys-digital" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  Gnosys Digital
                </Link>
              </li>
              <li>
                <Link href="/projects/ltm-model" className="hover:text-zinc-950 transition-colors tracking-[0.04em]">
                  LTM Model
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
          <p>© {new Date().getFullYear()} AYUSH DUBEY. ALL RIGHTS RESERVED.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
