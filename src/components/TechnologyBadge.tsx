"use client";

import React from "react";

interface TechnologyBadgeProps {
  name: string;
  category?: string;
  iconName?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  showCategory?: boolean;
}

// Crisp SVGs for official technology logos
const TechIcons: Record<string, React.ReactNode> = {
  react: (
    <svg className="w-full h-full" viewBox="0 0 115.3 100" fill="#61DAFB">
      <path d="M57.6 63.8c7.5 0 13.6-6.1 13.6-13.6s-6.1-13.6-13.6-13.6-13.6 6.1-13.6 13.6 6.1 13.6 13.6 13.6zm0-23.7c5.6 0 10.1 4.5 10.1 10.1s-4.5 10.1-10.1 10.1-10.1-4.5-10.1-10.1 4.5-10.1 10.1-10.1z"/>
      <path d="M115.3 50.2c0-5.8-5.3-11.4-14.3-15.6 3.6-9.6 4.3-18.4 1.4-23.5-3.3-5.7-11.1-7.1-21.7-4-7.2-7.1-15.7-11.7-24.5-13C52.7-6.5 48.5-7.1 45 4.1c-8.9 1.3-17.4 5.9-24.6 13-10.6-3.1-18.4-1.7-21.7 4-3 5.1-2.2 13.9 1.4 23.5C3.2 38.8 0 44.4 0 50.2c0 5.8 5.3 11.4 14.3 15.6-3.6 9.6-4.3 18.4-1.4 23.5 3.3 5.7 11.1 7.1 21.7 4 7.2 7.1 15.7 11.7 24.5 13 3.5 10.6 7.7 11.2 11.2 0 8.9-1.3 17.4-5.9 24.6-13 10.6 3.1 18.4 1.7 21.7-4 3-5.1 2.2-13.9-1.4-23.5 9-4.2 12.2-9.8 12.2-15.6zm-10.9 9.3c-7.9 3.4-18.2 5.6-29.6 6.5 2.8 5.4 5.7 11.3 8.3 17.4 6.8-.7 13.1-2.3 18.2-5.1 4.1-2.2 6.5-4.8 6.5-7.3 0-3.6-5-7.7-11.5-10.7zM70.9 33.7c-2.6 6.1-5.5 12-8.3 17.4 11.4.9 21.7 3.1 29.6 6.5 6.5-3 11.5-7.1 11.5-10.7 0-2.5-2.4-5.1-6.5-7.3-5.1-2.8-11.4-4.4-18.2-5.1-2.6 6.1-5.5 12-8.1 17.4zM57.6 8.5c6.3.8 12.5 3.6 18 7.9-2.9 6.2-6.2 13-9.7 20-2.8-.2-5.6-.3-8.3-.3s-5.5.1-8.3.3c-3.5-7-6.8-13.8-9.7-20 5.5-4.3 11.7-7.1 18-7.9zm-13.3 41.7c0-2.8.3-5.5.8-8.2 2.8-.2 5.6-.3 8.3-.3s5.5.1 8.3.3c.5 2.7.8 5.4.8 8.2s-.3 5.5-.8 8.2c-2.8.2-5.6.3-8.3.3s-5.5-.1-8.3-.3c-.5-2.7-.8-5.4-.8-8.2z"/>
    </svg>
  ),
  nextjs: (
    <svg className="w-full h-full" viewBox="0 0 180 180" fill="none">
      <mask id="mask-next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" r="90" fill="#000"/>
      </mask>
      <g mask="url(#mask-next)">
        <circle cx="90" cy="90" r="90" fill="#000"/>
        <path d="M149.5 153.5L69.8 50.8H54V129.2H66.8V67.1L139.5 160.7C143 158.5 146.4 156.1 149.5 153.5Z" fill="url(#next-g1)"/>
        <path d="M115 50.8H128V129.2H115V50.8Z" fill="url(#next-g2)"/>
      </g>
      <defs>
        <linearGradient id="next-g1" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF"/>
          <stop offset="1" stopColor="#FFF" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="next-g2" x1="121.5" y1="50.8" x2="120.8" y2="92.7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF"/>
          <stop offset="1" stopColor="#FFF" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  typescript: (
    <svg className="w-full h-full" viewBox="0 0 128 128">
      <path fill="#3178C6" d="M0 0h128v128H0z"/>
      <path fill="#FFF" d="M69.8 108.9c3.7 2.1 8.3 3.6 13.5 3.6 13.7 0 22.3-7.2 22.3-19.3 0-11.4-6.8-16.7-18.4-21.7l-4.5-2c-7.4-3.1-10.4-6.3-10.4-11.5 0-5.7 4.7-9.9 12-9.9 4.8 0 8.6 1.3 11.4 2.8l2.9-10.7c-3.1-1.3-7.7-2.4-13.6-2.4-13.7 0-21.9 7.6-21.9 18.7 0 10.4 6.5 16.2 17.4 20.9l4.5 1.9c7.9 3.4 11.4 6.9 11.4 12.4 0 6.1-5.1 10.5-13.1 10.5-5.9 0-10.5-1.9-13.6-3.8l-2.5 10.5zM20 40h41.4v10.5H46.6v59.8H34.8V50.5H20V40z"/>
    </svg>
  ),
  nodejs: (
    <svg className="w-full h-full" viewBox="0 0 128 128">
      <path fill="#539E43" d="M64 4.5l56 32.3v64.4L64 123.5 8 91.2V36.8L64 4.5z"/>
      <path fill="#FFF" d="M64 21.6l41.6 24v44.8L64 104.4 22.4 80.4V45.6L64 21.6z"/>
      <path fill="#539E43" d="M64 33.6l31.2 18v34.8L64 94.4 32.8 76.4V51.6L64 33.6z"/>
    </svg>
  ),
  tailwind: (
    <svg className="w-full h-full" viewBox="0 0 128 128">
      <path fill="#06B6D4" d="M32 40c6.4-12.8 14.4-19.2 24-19.2 14.4 0 19.2 9.6 28.8 9.6 6.4 0 12.8-4.8 19.2-14.4-6.4 12.8-14.4 19.2-24 19.2-14.4 0-19.2-9.6-28.8-9.6-6.4 0-12.8 4.8-19.2 14.4zm-24 32c6.4-12.8 14.4-19.2 24-19.2 14.4 0 19.2 9.6 28.8 9.6 6.4 0 12.8-4.8 19.2-14.4-6.4 12.8-14.4 19.2-24 19.2-14.4 0-19.2-9.6-28.8-9.6-6.4 0-12.8 4.8-19.2 14.4z"/>
    </svg>
  ),
  framer: (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="#EA4C89">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
    </svg>
  ),
  postgresql: (
    <svg className="w-full h-full" viewBox="0 0 128 128">
      <path fill="#4169E1" d="M64 10c-29.8 0-54 24.2-54 54s24.2 54 54 54 54-24.2 54-54-24.2-54-54-54zm0 98c-24.3 0-44-19.7-44-44s19.7-44 44-44 44 19.7 44 44-19.7 44-44 44z"/>
      <path fill="#FFF" d="M64 26c-13.8 0-25 11.2-25 25 0 9.8 5.7 18.3 14 22.3V86h11V69.7c5.2-1.3 9.7-4.4 12.9-8.7l8.8 8.8 7.8-7.8-8.8-8.8c1.5-3.3 2.3-7 2.3-10.9 0-13.8-11.2-24.3-25-24.3z"/>
    </svg>
  ),
  mongodb: (
    <svg className="w-full h-full" viewBox="0 0 128 128">
      <path fill="#47A248" d="M64 12c-3.2 0-38 31.2-38 67.2 0 28.8 19.2 46.4 38 48.8 18.8-2.4 38-20 38-48.8C102 43.2 67.2 12 64 12zm0 98.4c-1.6 0-3.2-.8-4-2.4l-4.8-10.4c-.8-1.6-.8-3.2 0-4.8l8.8-19.2c.8-1.6 2.4-2.4 4-2.4s3.2.8 4 2.4l8.8 19.2c.8 1.6.8 3.2 0 4.8l-4.8 10.4c-.8 1.6-2.4 2.4-4 2.4z"/>
    </svg>
  ),
  prisma: (
    <svg className="w-full h-full" viewBox="0 0 128 128">
      <path fill="#5A67D8" d="M106.8 101.4L68.2 14.8c-1.8-4-6.6-4-8.4 0L21.2 101.4c-1.8 4 1.2 8.6 5.6 8.6h74.4c4.4 0 7.4-4.6 5.6-8.6z"/>
      <path fill="#FFF" d="M64 36l26 56H38l26-56z"/>
    </svg>
  ),
  redis: (
    <svg className="w-full h-full" viewBox="0 0 128 128">
      <path fill="#DC382D" d="M10 40l54-25 54 25-54 25L10 40zm0 30l54 25 54-25-54 25-54-25zm0 25l54 25 54-25-54 25-54-25z"/>
    </svg>
  ),
  docker: (
    <svg className="w-full h-full" viewBox="0 0 128 128">
      <path fill="#2496ED" d="M120 54c-1.6-9.6-9.6-16-17.6-16-1.6 0-3.2.3-4.8.8C92.8 31.2 83.2 27.2 72 28.8c0 0-3.2 3.2-3.2 9.6v6.4H16c-4.4 0-8 3.6-8 8v24c0 17.6 14.4 32 32 32h56c17.6 0 32-14.4 32-32 0-3.2-.8-6.4-1.6-9.6 4.8-3.2 9.6-8 9.6-13.6z"/>
      <path fill="#FFF" d="M30 46h10v10H30zm14 0h10v10H44zm14 0h10v10H58zm-28 14h10v10H30zm14 0h10v10H44zm14 0h10v10H58zm14 0h10v10H72z"/>
    </svg>
  ),
};

export function TechnologyBadge({
  name,
  category,
  iconName,
  color,
  size = "md",
  showCategory = false,
}: TechnologyBadgeProps) {
  const normalizedKey = (iconName || name).toLowerCase().replace(/[^a-z0-9]/g, "");
  const icon = TechIcons[normalizedKey];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1.5",
    md: "px-2.5 py-1 text-xs sm:text-sm gap-2",
    lg: "px-3.5 py-1.5 text-sm sm:text-base gap-2.5",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border border-white/10 bg-slate-900/70 backdrop-blur-md text-slate-200 transition-all duration-200 hover:border-white/25 hover:bg-slate-800/80 hover:scale-[1.03] select-none ${sizeClasses[size]}`}
      title={`${name} ${category ? `(${category})` : ""}`}
    >
      {icon ? (
        <span className={`inline-block flex-shrink-0 ${iconSizes[size]}`}>{icon}</span>
      ) : (
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: color || "#38bdf8" }}
        />
      )}
      <span className="whitespace-nowrap">{name}</span>
      {showCategory && category && (
        <span className="text-[10px] text-slate-400 border-l border-white/10 pl-1.5 font-normal">
          {category}
        </span>
      )}
    </span>
  );
}
