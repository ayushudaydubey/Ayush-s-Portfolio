import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.resolve(__dirname, "..");
const projectsDir = path.join(appDir, "projects");
const publicDir = path.join(appDir, "public");
const generatedPublicDir = path.join(publicDir, "generated-projects");
const legacyImagesDir = path.join(publicDir, "images", "projects");

if (!fs.existsSync(projectsDir)) {
  console.log(`Projects directory does not exist: ${projectsDir}`);
  process.exit(0);
}

const entries = fs.readdirSync(projectsDir, { withFileTypes: true });
const projectFolders = entries.filter((e) => e.isDirectory() && !e.name.startsWith("."));

for (const folder of projectFolders) {
  const slug = folder.name;
  const projectImagesDir = path.join(projectsDir, slug, "images");
  const projectDocsDir = path.join(projectsDir, slug, "documents");
  const targetPublicDir = path.join(generatedPublicDir, slug);

  if (!fs.existsSync(projectImagesDir)) {
    fs.mkdirSync(projectImagesDir, { recursive: true });
  }

  if (!fs.existsSync(projectDocsDir)) {
    fs.mkdirSync(projectDocsDir, { recursive: true });
  }

  if (!fs.existsSync(targetPublicDir)) {
    fs.mkdirSync(targetPublicDir, { recursive: true });
  }

  // 1. If project images are empty, copy from legacy
  const existingLegacy = path.join(legacyImagesDir, slug);
  if (fs.existsSync(existingLegacy)) {
    const legacyFiles = fs.readdirSync(existingLegacy);
    for (const file of legacyFiles) {
      const src = path.join(existingLegacy, file);
      const dest = path.join(projectImagesDir, file);
      if (fs.statSync(src).isFile() && !fs.existsSync(dest)) {
        fs.copyFileSync(src, dest);
      }
    }
  }

  // 1b. Check alternative folder names (e.g. public/generated-projects/<slug>-portfolio)
  const altCandidates = [
    path.join(generatedPublicDir, `${slug}-portfolio`),
    path.join(legacyImagesDir, `${slug}-portfolio`),
  ];
  for (const altDir of altCandidates) {
    if (fs.existsSync(altDir)) {
      const altFiles = fs.readdirSync(altDir);
      for (const file of altFiles) {
        const src = path.join(altDir, file);
        const dest = path.join(projectImagesDir, file);
        if (fs.statSync(src).isFile() && !fs.existsSync(dest)) {
          fs.copyFileSync(src, dest);
        }
      }
    }
  }

  // 2. Copy from project images to public/generated-projects
  const currentImages = fs.readdirSync(projectImagesDir);
  for (const file of currentImages) {
    const src = path.join(projectImagesDir, file);
    const dest = path.join(targetPublicDir, file);
    if (fs.statSync(src).isFile()) {
      fs.copyFileSync(src, dest);
    }
  }

  console.log(`Synced assets for project: ${slug} (${currentImages.length} images)`);
}

console.log("All project assets synchronized successfully.");
