"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { ProjectScreenshot } from "@/src/types/project";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  screenshots: ProjectScreenshot[];
  projectTitle: string;
}

export function ProjectGallery({
  screenshots,
  projectTitle,
}: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = "unset";
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + screenshots.length) % screenshots.length
        : null
    );
  }, [screenshots.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % screenshots.length : null
    );
  }, [screenshots.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <section className="py-12 border-b border-zinc-200/80">
      <div className="mb-6">
        <p className="section-label mb-2">Gallery</p>
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.92] mb-3">
          Interface<br />Previews
        </h2>
        <p className="text-[15px] text-zinc-600">
          Click any preview to inspect in full view.
        </p>
      </div>

      {/* Screenshots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {screenshots.map((screen, index) => (
          <div
            key={index}
            onClick={() => handleOpen(index)}
            className="group rounded-xl overflow-hidden bg-white border border-zinc-200 hover:border-zinc-300 transition-colors cursor-pointer flex flex-col justify-between shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 border-b border-zinc-100">
              <Image
                src={screen.url}
                alt={screen.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>

            <div className="p-3.5">
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {screen.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview Modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          {/* Top Bar with counter & close */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-1 rounded-md bg-black/60 text-xs font-mono text-zinc-300">
              {projectTitle} • {selectedIndex + 1} / {screenshots.length}
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-md bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-md bg-black/60 hover:bg-black/80 text-white transition-colors z-10 cursor-pointer hidden sm:block"
            aria-label="Previous preview"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-md bg-black/60 hover:bg-black/80 text-white transition-colors z-10 cursor-pointer hidden sm:block"
            aria-label="Next preview"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col rounded-xl overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-zinc-100">
              <Image
                src={screenshots[selectedIndex].url}
                alt={screenshots[selectedIndex].alt}
                fill
                sizes="(max-width: 1200px) 90vw, 1024px"
                className="object-contain"
                priority
              />
            </div>

            <div className="p-4 bg-white border-t border-zinc-100">
              <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-medium">
                {screenshots[selectedIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
