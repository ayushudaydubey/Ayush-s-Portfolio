"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import type { Project } from "@/src/types/project";
import { GithubIcon } from "./SocialIcons";
import { SectionPastelBackground } from "./SectionPastelBackground";
import { TechLogo } from "./TechLogo";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-10 sm:pb-16 border-b border-zinc-200/80 bg-[#FAFAF9]">
      <SectionPastelBackground variant="pink-left" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-zinc-500 mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <Link href="/#projects" className="hover:text-blue-600 transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-950 font-medium truncate max-w-[200px] sm:max-w-none">
            {project.title}
          </span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to projects</span>
          </Link>
        </div>

        {/* Header Details */}
        <div className="mb-8">
          <span className="text-xs text-zinc-500 font-medium block mb-2">
            {project.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-zinc-950 mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-3xl mb-6">
            {project.shortDescription}
          </p>

          {/* Meta Details: Role & Duration */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-500 py-3 border-y border-zinc-200/80 mb-6">
            <div>
              <span className="text-zinc-400">Role: </span>
              <span className="font-medium text-zinc-800">{project.role}</span>
            </div>
            <span className="text-zinc-300">•</span>
            <div>
              <span className="text-zinc-400">Timeline: </span>
              <span className="font-medium text-zinc-800">{project.timeline}</span>
            </div>
            {project.metrics && project.metrics.length > 0 && (
              <>
                <span className="text-zinc-300">•</span>
                <div>
                  <span className="text-zinc-400">Key metric: </span>
                  <span className="font-medium text-zinc-800">{project.metrics[0].value}</span>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-950 text-white text-xs sm:text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <span>View Live Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-xs sm:text-sm font-medium hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Cover Graphic */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 mb-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <Image
            src={project.coverImage}
            alt={`${project.title} Preview`}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover"
            priority
          />
        </div>

        {/* Technology tags with Icon + Text */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 mr-2">
            Technologies:
          </span>
          {project.technologies.map((tech) => (
            <span
              key={tech.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200/90 bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-zinc-300 transition-colors"
            >
              <TechLogo name={tech.name} size={18} className="shrink-0" />
              <span>{tech.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
