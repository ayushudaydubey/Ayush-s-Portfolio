"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/src/types/project";

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export function ProjectCard({
  project,
  index = 0,
  featured = false,
}: ProjectCardProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group flex flex-col bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
      {/* Cover image — taller aspect ratio for editorial feel */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block w-full overflow-hidden bg-zinc-100"
        style={{ paddingTop: "62%" }}
        tabIndex={-1}
        aria-label={`Open ${project.title} case study`}
      >
        <Image
          src={project.coverImage}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          priority={featured}
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/5 transition-colors duration-300" />
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Index + category row */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono font-semibold text-zinc-400 tracking-wider">
            {num}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-zinc-950 mb-2 leading-snug">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-[14px] text-zinc-600 leading-relaxed mb-5 flex-1 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
          <Link
            href={`/projects/${project.slug}`}
            className="text-[12px] font-semibold text-zinc-700 hover:text-zinc-950 transition-colors"
          >
            Case study
          </Link>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            aria-label={`Open ${project.title} live site`}
          >
            <span>Live site</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
