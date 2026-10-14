"use client";

import React from "react";
import type { ProjectFeature } from "@/src/types/project";
import {
  Cpu,
  Layers,
  RotateCcw,
  CheckCircle2,
  Activity,
  Terminal,
  Sparkles,
  Palette,
  Monitor,
  Droplets,
  Search,
  Sun,
  FileDown,
  Sliders,
  Eye,
  Calendar,
  Bell,
  MousePointer,
  Grid,
  FileText,
  Send,
  ShoppingCart,
  Filter,
  ShieldCheck,
  Package,
  Zap,
  Code,
  UserCheck,
  DownloadCloud,
  Check,
} from "lucide-react";

interface ProjectFeaturesProps {
  features: ProjectFeature[];
  accentColor?: string;
}

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-4 h-4 text-zinc-700" />,
  Layers: <Layers className="w-4 h-4 text-zinc-700" />,
  RotateCcw: <RotateCcw className="w-4 h-4 text-zinc-700" />,
  CheckCircle2: <CheckCircle2 className="w-4 h-4 text-zinc-700" />,
  Activity: <Activity className="w-4 h-4 text-zinc-700" />,
  Terminal: <Terminal className="w-4 h-4 text-zinc-700" />,
  Sparkles: <Sparkles className="w-4 h-4 text-zinc-700" />,
  Palette: <Palette className="w-4 h-4 text-zinc-700" />,
  Monitor: <Monitor className="w-4 h-4 text-zinc-700" />,
  Droplets: <Droplets className="w-4 h-4 text-zinc-700" />,
  Search: <Search className="w-4 h-4 text-zinc-700" />,
  Sun: <Sun className="w-4 h-4 text-zinc-700" />,
  FileDown: <FileDown className="w-4 h-4 text-zinc-700" />,
  Sliders: <Sliders className="w-4 h-4 text-zinc-700" />,
  Eye: <Eye className="w-4 h-4 text-zinc-700" />,
  Calendar: <Calendar className="w-4 h-4 text-zinc-700" />,
  Bell: <Bell className="w-4 h-4 text-zinc-700" />,
  MousePointer: <MousePointer className="w-4 h-4 text-zinc-700" />,
  Grid: <Grid className="w-4 h-4 text-zinc-700" />,
  FileText: <FileText className="w-4 h-4 text-zinc-700" />,
  Send: <Send className="w-4 h-4 text-zinc-700" />,
  ShoppingCart: <ShoppingCart className="w-4 h-4 text-zinc-700" />,
  Filter: <Filter className="w-4 h-4 text-zinc-700" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-zinc-700" />,
  Package: <Package className="w-4 h-4 text-zinc-700" />,
  Zap: <Zap className="w-4 h-4 text-zinc-700" />,
  Code: <Code className="w-4 h-4 text-zinc-700" />,
  UserCheck: <UserCheck className="w-4 h-4 text-zinc-700" />,
  DownloadCloud: <DownloadCloud className="w-4 h-4 text-zinc-700" />,
};

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <section className="py-12 border-b border-zinc-200/80">
      <div className="mb-6">
        <p className="section-label mb-2">Features</p>
        <h2 className="text-3xl sm:text-4xl font-light tracking-tighter uppercase text-zinc-950 leading-[0.92] mb-3">
          Key Features<br />&amp; Architecture
        </h2>
        <p className="text-[15px] text-zinc-600">
          Core technical features implemented for this project.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feat, idx) => {
          const icon = feat.icon ? FEATURE_ICONS[feat.icon] : <Check className="w-4 h-4 text-zinc-700" />;

          return (
            <div
              key={idx}
              className="p-5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {icon}
                </div>
                <div>
                  <h3 className="text-base font-medium text-zinc-950 mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
