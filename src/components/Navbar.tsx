"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { developerProfile } from "../data/portfolio";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/#projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Education", href: "/#education" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF9]/90 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Name — Architectural uppercase */}
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-950 hover:text-zinc-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
            aria-label="Ayush Dubey - Home"
          >
            <span className="text-sm font-normal tracking-[0.18em] uppercase text-zinc-950">
              Ayush Dubey
            </span>
          </Link>

          {/* Desktop Navigation — Editorial tracking and uppercase */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-normal tracking-[0.14em] uppercase text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={developerProfile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-500 hover:text-zinc-950 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={developerProfile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-500 hover:text-zinc-950 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <span className="w-px h-4 bg-zinc-200 mx-1" />

            <a
              href="/resume.pdf"
              download="Ayush_Dubey_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono tracking-[0.12em] uppercase rounded-lg border border-zinc-200 text-zinc-800 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
            >
              <span>Resume</span>
              <Download className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="/resume.pdf"
              download="Ayush_Dubey_Resume.pdf"
              className="p-2 text-zinc-600 hover:text-zinc-950 transition-colors"
              aria-label="Download Resume"
            >
              <Download className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-xs font-normal tracking-[0.14em] uppercase text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 mt-3 border-t border-zinc-100 flex items-center justify-between px-3">
            <div className="flex items-center gap-3">
              <a
                href={developerProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-600 hover:text-zinc-950"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={developerProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-zinc-600 hover:text-zinc-950"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <a
              href="/resume.pdf"
              download="Ayush_Dubey_Resume.pdf"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono tracking-[0.12em] uppercase rounded-lg border border-zinc-200 text-zinc-800 bg-white hover:bg-zinc-50"
            >
              <Download className="w-3.5 h-3.5 text-zinc-500" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
