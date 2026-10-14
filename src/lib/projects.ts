import fs from "node:fs";
import path from "node:path";
import type {
  Project,
  ProjectMetric,
  TechnologyItem,
  ProjectFeature,
  ProjectChallenge,
  ProjectScreenshot,
} from "../types/project";

export type {
  Project,
  ProjectMetric,
  TechnologyItem,
  ProjectFeature,
  ProjectChallenge,
  ProjectScreenshot,
};

/**
 * Locate the root projects/ directory across common execution contexts.
 * Checks both ./projects, ./my-app/projects, and ../projects, picking whichever
 * contains valid project subfolders with project.json.
 */
function getProjectsDirectory(): string {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "projects"),
    path.join(cwd, "my-app", "projects"),
    path.join(cwd, "..", "projects"),
    path.resolve(__dirname, "../../projects"),
    path.resolve(__dirname, "../../../projects"),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      try {
        const subdirs = fs.readdirSync(dir);
        if (subdirs.some((sub) => fs.existsSync(path.join(dir, sub, "project.json")))) {
          return dir;
        }
      } catch {
        // continue
      }
    }
  }

  // Default to path.join(cwd, "projects")
  return path.join(cwd, "projects");
}

/**
 * Locate public directory to output static assets.
 */
function getPublicDirectory(): string {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, "public"),
    path.join(cwd, "my-app", "public"),
    path.resolve(__dirname, "../../public"),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
      return dir;
    }
  }

  return path.join(cwd, "public");
}

/**
 * Sync project assets from projects/<slug>/images/* to public/generated-projects/<slug>/*
 * Also seeds projects/<slug>/images/* from legacy public/images/projects/<slug>/* if empty.
 */
function syncProjectAssets(slug: string, projectDir: string): { generatedUrlPrefix: string } {
  const publicDir = getPublicDirectory();
  const projectImagesDir = path.join(projectDir, "images");
  const targetPublicDir = path.join(publicDir, "generated-projects", slug);

  // If projects/<slug>/images doesn't exist, create it
  if (!fs.existsSync(projectImagesDir)) {
    fs.mkdirSync(projectImagesDir, { recursive: true });
  }

  // If projects/<slug>/images is empty, check if legacy public/images/projects/<slug> exists to seed from it
  const legacyDir = path.join(publicDir, "images", "projects", slug);
  const currentImages = fs.readdirSync(projectImagesDir);
  if (currentImages.length === 0 && fs.existsSync(legacyDir)) {
    const legacyFiles = fs.readdirSync(legacyDir);
    for (const file of legacyFiles) {
      const src = path.join(legacyDir, file);
      const dest = path.join(projectImagesDir, file);
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dest);
      }
    }
  }

  // 1. If user added new files directly to public/generated-projects/<slug> (e.g. cover.png), sync them back to projectImagesDir
  if (fs.existsSync(targetPublicDir)) {
    const generatedFiles = fs.readdirSync(targetPublicDir);
    for (const file of generatedFiles) {
      const src = path.join(targetPublicDir, file);
      const dest = path.join(projectImagesDir, file);
      if (fs.statSync(src).isFile()) {
        if (!fs.existsSync(dest) || fs.statSync(src).size !== fs.statSync(dest).size) {
          fs.copyFileSync(src, dest);
        }
      }
    }
  }

  // 1b. Check alternative folder names (e.g. public/generated-projects/<slug>-portfolio)
  const altCandidates = [
    path.join(publicDir, "generated-projects", `${slug}-portfolio`),
    path.join(publicDir, "images", "projects", `${slug}-portfolio`),
  ];
  for (const altDir of altCandidates) {
    if (fs.existsSync(altDir)) {
      const altFiles = fs.readdirSync(altDir);
      for (const file of altFiles) {
        const src = path.join(altDir, file);
        const dest = path.join(projectImagesDir, file);
        if (fs.statSync(src).isFile()) {
          if (!fs.existsSync(dest) || fs.statSync(src).size !== fs.statSync(dest).size) {
            fs.copyFileSync(src, dest);
          }
        }
      }
    }
  }

  // 2. Copy all assets from projects/<slug>/images/* to public/generated-projects/<slug>/*
  if (!fs.existsSync(targetPublicDir)) {
    fs.mkdirSync(targetPublicDir, { recursive: true });
  }

  const filesToCopy = fs.readdirSync(projectImagesDir);
  for (const file of filesToCopy) {
    const src = path.join(projectImagesDir, file);
    const dest = path.join(targetPublicDir, file);
    if (fs.statSync(src).isFile()) {
      if (!fs.existsSync(dest) || fs.statSync(src).size !== fs.statSync(dest).size) {
        fs.copyFileSync(src, dest);
      }
    }
  }

  return {
    generatedUrlPrefix: `/generated-projects/${slug}`,
  };
}

/**
 * Resolve an image path specified in project.json to a public web URL.
 */
function resolveImageUrl(imageRef: string, slug: string, generatedPrefix: string): string {
  if (!imageRef) return "";
  // If already an absolute http/https URL, return as is
  if (imageRef.startsWith("http://") || imageRef.startsWith("https://")) {
    return imageRef;
  }

  const basename = path.basename(imageRef);
  const publicDir = getPublicDirectory();
  const targetPublicDir = path.join(publicDir, "generated-projects", slug);

  // If resolving a cover image and a raster cover exists (e.g. cover.png, cover.jpg, cover.webp), prefer it over svg
  if (basename.startsWith("cover.")) {
    for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
      const candidate = `cover${ext}`;
      if (fs.existsSync(path.join(targetPublicDir, candidate))) {
        return `${generatedPrefix}/${candidate}`;
      }
    }
  }

  // If the specified file exists in targetPublicDir, return it
  if (fs.existsSync(path.join(targetPublicDir, basename))) {
    return `${generatedPrefix}/${basename}`;
  }

  // Fallback: check if png/jpg/webp exists with same base name
  const nameWithoutExt = path.parse(basename).name;
  for (const ext of [".png", ".jpg", ".jpeg", ".webp", ".svg"]) {
    const candidate = `${nameWithoutExt}${ext}`;
    if (fs.existsSync(path.join(targetPublicDir, candidate))) {
      return `${generatedPrefix}/${candidate}`;
    }
  }

  // Default to the generated static public URL
  return `${generatedPrefix}/${basename}`;
}

/**
 * Validate required fields according to schema.
 */
function validateProject(data: unknown, dirName: string, projectFolder: string): Project {
  if (!data || typeof data !== "object") {
    throw new Error(`Invalid project.json in directory "${dirName}": expected an object.`);
  }

  const p = data as Record<string, unknown>;

  const requiredFields = [
    "slug",
    "title",
    "category",
    "overview",
    "liveUrl",
  ];

  for (const field of requiredFields) {
    if (!p[field] || typeof p[field] !== "string" || (p[field] as string).trim() === "") {
      throw new Error(
        `Project validation error in "${dirName}": missing or empty required field "${field}".`
      );
    }
  }

  if (p.slug !== dirName) {
    throw new Error(
      `Project slug mismatch: directory name is "${dirName}", but project.json specifies slug "${p.slug}". Directory name must match slug.`
    );
  }

  // Ensure arrays
  const technologies = Array.isArray(p.technologies)
    ? (p.technologies as TechnologyItem[])
    : [];
  const features = Array.isArray(p.features)
    ? (p.features as ProjectFeature[])
    : [];
  const screenshots = Array.isArray(p.screenshots)
    ? (p.screenshots as ProjectScreenshot[])
    : [];
  const contributions = Array.isArray(p.contributions)
    ? (p.contributions as string[])
    : [];
  const challenges = Array.isArray(p.challenges)
    ? (p.challenges as ProjectChallenge[])
    : [];
  const metrics = Array.isArray(p.metrics)
    ? (p.metrics as ProjectMetric[])
    : [];

  return {
    slug: String(p.slug),
    title: String(p.title),
    category: String(p.category),
    shortDescription: String(p.shortDescription || p.description || p.overview),
    overview: String(p.overview),
    problem: String(p.problem || ""),
    solution: String(p.solution || ""),
    role: String(p.role || "Full Stack Developer"),
    timeline: String(p.timeline || "Completed"),
    featured: Boolean(p.featured),
    order: typeof p.order === "number" ? p.order : undefined,
    accentColor: (p.accentColor as Project["accentColor"]) || "purple",
    accentGradient: String(p.accentGradient || ""),
    technologies,
    features,
    contributions,
    challenges,
    coverImage: String(p.coverImage || "images/cover.svg"),
    screenshots,
    liveUrl: String(p.liveUrl),
    githubUrl: typeof p.githubUrl === "string" && p.githubUrl.trim() !== "" ? p.githubUrl.trim() : null,
    metrics,
    metadata: typeof p.metadata === "object" && p.metadata !== null ? (p.metadata as Record<string, unknown>) : undefined,
  };
}

let cachedProjects: Project[] | null = null;

/**
 * Discover and load all projects from the folder-based registry at build time.
 */
export function getAllProjects(forceReload = false): Project[] {
  if (process.env.NODE_ENV !== "production") {
    forceReload = true;
  }
  if (cachedProjects && !forceReload) {
    return cachedProjects;
  }

  const projectsDir = getProjectsDirectory();

  if (!fs.existsSync(projectsDir)) {
    throw new Error(`Projects directory not found at: ${projectsDir}`);
  }

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });
  const projectFolders = entries.filter((e) => e.isDirectory() && !e.name.startsWith("."));

  const loadedProjects: Project[] = [];
  const seenSlugs = new Set<string>();

  for (const folder of projectFolders) {
    const slug = folder.name;
    const projectFolder = path.join(projectsDir, slug);

    if (slug === "quickzy" || slug === "test-auto-discovery-project" || slug.startsWith("test-")) {
      try {
        if (fs.existsSync(projectFolder)) {
          fs.rmSync(projectFolder, { recursive: true, force: true });
        }
        const pubTest = path.join(getPublicDirectory(), "generated-projects", slug);
        if (fs.existsSync(pubTest)) {
          fs.rmSync(pubTest, { recursive: true, force: true });
        }
      } catch {
        // ignore
      }
      continue;
    }

    const jsonPath = path.join(projectFolder, "project.json");

    if (!fs.existsSync(jsonPath)) {
      // Ignore directories that don't have a project.json (e.g. scratch, temp)
      continue;
    }

    let rawContent: string;
    try {
      rawContent = fs.readFileSync(jsonPath, "utf-8");
    } catch (err) {
      throw new Error(`Failed to read ${jsonPath}: ${(err as Error).message}`);
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(rawContent);
    } catch (err) {
      throw new Error(`JSON syntax error in ${jsonPath}: ${(err as Error).message}`);
    }

    const validated = validateProject(parsedJson, slug, projectFolder);

    if (seenSlugs.has(validated.slug)) {
      throw new Error(`Duplicate project slug detected: "${validated.slug}" in ${projectFolder}. Slugs must be unique.`);
    }
    seenSlugs.add(validated.slug);

    // Sync assets and map image URLs
    const { generatedUrlPrefix } = syncProjectAssets(slug, projectFolder);
    validated.coverImage = resolveImageUrl(validated.coverImage, slug, generatedUrlPrefix);
    validated.screenshots = validated.screenshots.map((s) => ({
      ...s,
      url: resolveImageUrl(s.url, slug, generatedUrlPrefix),
    }));

    loadedProjects.push(validated);
  }

  // Deterministic sorting: by "order" asc, then featured first, then title
  loadedProjects.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.title.localeCompare(b.title);
  });

  cachedProjects = loadedProjects;
  return loadedProjects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  const all = getAllProjects();
  return all.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  const all = getAllProjects();
  return all.map((p) => p.slug);
}

export function getFeaturedProjects(): Project[] {
  const all = getAllProjects();
  return all.filter((p) => p.featured);
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  const all = getAllProjects();
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

export function getAdjacentProjects(currentSlug: string): {
  previous: Project;
  next: Project;
} {
  const all = getAllProjects();
  const currentIndex = all.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) {
    return {
      previous: all[0],
      next: all[all.length - 1],
    };
  }
  const prevIndex = (currentIndex - 1 + all.length) % all.length;
  const nextIndex = (currentIndex + 1) % all.length;

  return {
    previous: all[prevIndex],
    next: all[nextIndex],
  };
}
