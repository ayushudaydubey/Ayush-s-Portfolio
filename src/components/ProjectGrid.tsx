"use client";

import React, { useState } from "react";
import type { Project } from "@/src/types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  showFilters?: boolean;
  initialFilter?: string;
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "UI & Tooling" },
];

function matchesFilter(project: Project, filter: string) {
  const cat = project.category.toLowerCase();
  const title = project.title.toLowerCase();
  if (filter === "all") return true;
  if (filter === "fullstack")
    return cat.includes("full stack") || cat.includes("commercial") || cat.includes("e-commerce") || cat.includes("mern");
  if (filter === "backend")
    return cat.includes("backend") || cat.includes("data pipeline") || cat.includes("pde") || cat.includes("ai") || cat.includes("etl") || title.includes("pde");
  if (filter === "frontend")
    return cat.includes("ui") || cat.includes("agency") || cat.includes("tooling");
  return true;
}

export function ProjectGrid({
  projects,
  showFilters = true,
  initialFilter = "all",
}: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);

  const filtered = projects.filter((p) => matchesFilter(p, activeFilter));

  return (
    <div className="w-full">
      {/* Filter tabs — inline pill style */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CATEGORIES.map((cat) => {
            const count = projects.filter((p) => matchesFilter(p, cat.id)).length;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 cursor-pointer ${isActive
                    ? "bg-zinc-950 text-white"
                    : "bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900"
                  }`}
              >
                {cat.label}
                <span
                  className={`text-[10px] font-normal ${isActive ? "text-zinc-400" : "text-zinc-400"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 2-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {filtered.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={idx}
            featured={idx === 0}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 px-4 border border-zinc-200 rounded-2xl bg-white">
          <p className="text-sm font-medium text-zinc-900 mb-2">
            No projects in this category
          </p>
          <button
            onClick={() => setActiveFilter("all")}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 underline cursor-pointer"
          >
            Show all
          </button>
        </div>
      )}
    </div>
  );
}
