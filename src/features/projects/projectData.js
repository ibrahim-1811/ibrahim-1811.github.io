import { projects as contentProjects } from '../../content/projects';
import { PROJECT_TIERS } from './vocabulary';

/** Display order is tier order, then content order. Archive entries are unnumbered. */
export function prepareProjects(list) {
  let count = 0;
  return PROJECT_TIERS.flatMap((tier) => list.filter((project) => project.tier === tier)).map(
    (project) => ({
      ...project,
      number: project.tier === 'archive' ? null : String(++count).padStart(2, '0'),
      shortTitle: project.shortTitle || project.title,
      category: project.category ?? [],
      technologies: project.technologies ?? [],
      metrics: project.metrics ?? [],
      media: project.media ?? [],
      links: project.links ?? {},
    }),
  );
}

export const orderedProjects = prepareProjects(contentProjects);
const projectsBySlug = new Map(orderedProjects.map((project) => [project.slug, project]));

export const getProject = (slug) => projectsBySlug.get(slug) ?? null;
export const projectsInTier = (tier) => orderedProjects.filter((project) => project.tier === tier);

export function getAdjacentProjects(slug) {
  const index = orderedProjects.findIndex((project) => project.slug === slug);
  return {
    previous: index > 0 ? orderedProjects[index - 1] : null,
    next: index >= 0 && index < orderedProjects.length - 1 ? orderedProjects[index + 1] : null,
  };
}

/** The hero is the item marked `role: 'hero'`, else the first video, else the first image. */
export function getHeroMedia(project) {
  const { media } = project;
  return (
    media.find((item) => item.role === 'hero') ??
    media.find((item) => item.type === 'youtube') ??
    media.find((item) => item.type === 'image') ??
    null
  );
}

const SECTION_FOR_ROLE = { architecture: 'architecture', result: 'results' };

/** Architecture figures sit in System, result figures in Results, everything else in Media. */
export function groupDialogMedia(project) {
  const hero = getHeroMedia(project);
  const groups = { hero, architecture: [], results: [], gallery: [] };
  for (const item of project.media) {
    if (item !== hero) groups[SECTION_FOR_ROLE[item.role] ?? 'gallery'].push(item);
  }
  return groups;
}

export function getCardImage(project) {
  const hero = getHeroMedia(project);
  if (hero?.type === 'image') return hero;
  if (hero?.type === 'youtube' && hero.poster) {
    return {
      type: 'image',
      src: hero.poster,
      alt: hero.posterAlt ?? '',
      position: hero.posterPosition,
    };
  }
  return project.media.find((item) => item.type === 'image') ?? null;
}

export const countVideos = (project) =>
  project.media.filter((item) => item.type === 'youtube').length;

export const mediaKey = (project, item) => `${project.slug}:${project.media.indexOf(item)}`;
