import React from "react";
import { Metadata } from "next";
import { getAllProjects } from "@/src/lib/projects";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { HeroSection } from "@/src/components/HeroSection";
import { AboutSection } from "@/src/components/AboutSection";
import { SkillsSection } from "@/src/components/SkillsSection";
import { ExperienceSection } from "@/src/components/ExperienceSection";
import { EducationSection } from "@/src/components/EducationSection";
import { ContactSection } from "@/src/components/ContactSection";
import { ProjectShowcase3D } from "@/src/components/ProjectShowcase3D";

export const metadata: Metadata = {
  title: "Ayush Dubey — Full Stack / MERN Stack Developer Portfolio",
  description:
    "Portfolio of Ayush Dubey — Full Stack & MERN Stack Developer specializing in React.js, Next.js, Node.js, Express.js, REST APIs, MongoDB, and PostgreSQL.",
};

export default function HomePage() {
  const projects = getAllProjects();
  return (
    <div className="min-h-screen bg-transparent text-zinc-950 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <HeroSection />

        {/* About / Professional Summary */}
        <AboutSection />

        {/* Skills */}
        <SkillsSection />

        {/* 3D Horizontal Projects Showcase */}
        <ProjectShowcase3D projects={projects} />

        {/* Experience */}
        <ExperienceSection />

        {/* Education & Certifications */}
        <EducationSection />

        {/* Contact */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
