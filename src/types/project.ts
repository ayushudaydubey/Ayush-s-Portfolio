export interface ProjectMetric {
  label: string;
  value: string;
}

export interface TechnologyItem {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps & Tools" | "AI & Libraries" | string;
  iconName?: string;
  color?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectChallenge {
  title: string;
  challenge: string;
  solution: string;
}

export interface ProjectScreenshot {
  url: string;
  caption: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  timeline: string;
  featured: boolean;
  order?: number;
  accentColor?: "lime" | "purple" | "pink" | "orange" | "blue" | "cyan";
  accentGradient?: string;
  technologies: TechnologyItem[];
  features: ProjectFeature[];
  contributions: string[];
  challenges: ProjectChallenge[];
  coverImage: string;
  screenshots: ProjectScreenshot[];
  liveUrl: string;
  githubUrl?: string | null;
  metrics?: ProjectMetric[];
  metadata?: Record<string, unknown>;
}
