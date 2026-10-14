"use client";

import React from "react";
import Link from "next/link";
import type { Project } from "@/src/types/project";
import { ProjectCard } from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RelatedProjectsProps {
  related: Project[];
  previous: Project;
  next: Project;
}

export function RelatedProjects({
  related,
  previous,
  next,
}: RelatedProjectsProps) {
  return (
    <section className="py-12 border-b border-zinc-200/80">
      {/* Previous / Next Project Navigation Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        <Link
          href={`/projects/${previous.slug}`}
          className="group p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 transition-colors flex items-center justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center gap-2.5">
            <ChevronLeft className="w-4 h-4 text-zinc-500 group-hover:-translate-x-0.5 transition-transform" />
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-zinc-500">
                Previous Project
              </span>
              <span className="text-sm font-semibold text-zinc-950 group-hover:text-blue-600 transition-colors">
                {previous.title}
              </span>
            </div>
          </div>
        </Link>

        <Link
          href={`/projects/${next.slug}`}
          className="group p-4 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 transition-colors flex items-center justify-between sm:flex-row-reverse shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center gap-2.5 sm:flex-row-reverse">
            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
            <div className="text-left sm:text-right">
              <span className="block text-[10px] uppercase tracking-wider text-zinc-500">
                Next Project
              </span>
              <span className="text-sm font-semibold text-zinc-950 group-hover:text-blue-600 transition-colors">
                {next.title}
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* More Projects Section */}
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="section-label mb-2">Projects</p>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.92] mb-3">
            Other<br />Projects
          </h2>
          <p className="text-[15px] text-zinc-600">
            Selected from the eight production works.
          </p>
        </div>

        <Link
          href="/#projects"
          className="text-xs font-medium text-blue-600 hover:text-blue-700 underline"
        >
          View all projects →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {related.slice(0, 2).map((proj) => (
          <ProjectCard key={proj.slug} project={proj} />
        ))}
      </div>
    </section>
  );
}
