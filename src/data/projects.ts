/**
 * Central Project Types and Loader Re-exports
 *
 * NOTE: Individual project data has been refactored into a folder-based architecture
 * under root projects/<slug>/project.json.
 *
 * Single data-loading module: @/src/lib/projects
 * Types definition: @/src/types/project
 *
 * No project content is duplicated in a central hardcoded array.
 */

export type {
  Project,
  ProjectMetric,
  TechnologyItem,
  ProjectFeature,
  ProjectChallenge,
  ProjectScreenshot,
} from "@/src/types/project";

export {
  getAllProjects,
  getProjectBySlug,
  getAllProjectSlugs,
  getFeaturedProjects,
  getRelatedProjects,
  getAdjacentProjects,
} from "@/src/lib/projects";
