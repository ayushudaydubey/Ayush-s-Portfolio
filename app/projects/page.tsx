import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/src/lib/projects";
import { ProjectGrid } from "@/src/components/ProjectGrid";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects Archive & Case Studies | Ayush Dubey",
  description:
    "Explore full stack engineering case studies, data ingestion pipelines, UI component systems, and modern web applications built by Ayush Dubey.",
};

export default function ProjectsArchivePage() {
  const projects = getAllProjects();
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-zinc-950 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Page Heading */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
              Archive
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 mb-2">
              All Projects &amp; Case Studies
            </h1>
            <p className="text-sm text-zinc-600 max-w-2xl">
              An overview of all eight production applications, developer tools, and data architectures.
            </p>
          </div>

          {/* Project Grid with filtering */}
          <ProjectGrid projects={projects} showFilters={true} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
