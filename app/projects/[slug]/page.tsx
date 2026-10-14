import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getRelatedProjects,
  getAdjacentProjects,
} from "@/src/lib/projects";
import { ProjectHero } from "@/src/components/ProjectHero";
import { ProjectGallery } from "@/src/components/ProjectGallery";
import { ProjectFeatures } from "@/src/components/ProjectFeatures";
import { RelatedProjects } from "@/src/components/RelatedProjects";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Ayush Dubey Portfolio",
      description: "The requested project case study could not be located.",
    };
  }

  return {
    title: `${project.title} — Case Study | Ayush Dubey`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Architecture & Case Study`,
      description: project.shortDescription,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 675,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { previous, next } = getAdjacentProjects(project.slug);
  const related = getRelatedProjects(project.slug, 3);

  // Group technologies by category
  const techByCategory = project.technologies.reduce(
    (acc, tech) => {
      acc[tech.category] = acc[tech.category] || [];
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<string, typeof project.technologies>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-zinc-950 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Project Hero Section */}
        <ProjectHero project={project} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section B: Project Overview (Problem, Solution, Description) */}
          <section className="py-12 border-b border-zinc-200/80">
            <div className="space-y-8">
              {/* Detailed Overview */}
              <div>
                <p className="section-label mb-2">Overview</p>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.92] mb-4">
                  Project<br />Overview
                </h2>
                <p className="text-[15px] sm:text-base text-zinc-600 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Problem vs Solution Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Problem Statement Card */}
                <div className="p-5 sm:p-6 rounded-xl border border-zinc-200 bg-zinc-50/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                  <h3 className="text-base font-medium text-zinc-950 mb-2">
                    The Problem
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Solution Engineered Card */}
                <div className="p-5 sm:p-6 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                  <h3 className="text-base font-medium text-zinc-950 mb-2">
                    The Solution
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section C: Project Screenshots & Lightbox */}
          <ProjectGallery
            screenshots={project.screenshots}
            projectTitle={project.title}
          />

          {/* Section D: Key Features */}
          <ProjectFeatures
            features={project.features}
            accentColor={project.accentColor}
          />

          {/* Section E: Complete Technology Stack */}
          <section className="py-12 border-b border-zinc-200/80">
            <div className="mb-6">
              <p className="section-label mb-2">Stack</p>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.92] mb-3">
                Technology<br />Stack
              </h2>
              <p className="text-[15px] text-zinc-600">
                Infrastructure and frameworks powering this application.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.entries(techByCategory).map(([category, items]) => (
                <div
                  key={category}
                  className="p-5 sm:p-6 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                >
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span
                        key={item.name}
                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md border border-zinc-200 bg-zinc-50 text-zinc-800"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section F: Contributions & Technical Challenges */}
          <section className="py-12 border-b border-zinc-200/80">
            <div className="space-y-10">
              {/* Contributions */}
              <div>
                <p className="section-label mb-2">Role</p>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.92] mb-4">
                  My<br />Contribution
                </h2>

                <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-zinc-600">
                  {project.contributions.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Challenges & Solutions */}
              <div>
                <p className="section-label mb-2">Engineering</p>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.92] mb-4">
                  Technical Challenges<br />&amp; Solutions
                </h2>

                <div className="space-y-4">
                  {project.challenges.map((ch, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-xl border border-zinc-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    >
                      <h3 className="text-sm font-semibold text-zinc-950 mb-2">
                        {ch.title}
                      </h3>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <p className="text-zinc-600">
                          <span className="font-medium text-zinc-900">Challenge: </span>
                          {ch.challenge}
                        </p>
                        <p className="text-zinc-700 pl-3 border-l-2 border-blue-600">
                          <span className="font-medium text-zinc-900">Solution: </span>
                          {ch.solution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section G: Navigation & Related Projects */}
          <RelatedProjects
            related={related}
            previous={previous}
            next={next}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
