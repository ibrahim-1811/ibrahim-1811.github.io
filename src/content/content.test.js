import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { profile } from './profile';
import { projects, projectSection } from './projects';
import { experience } from './experience';
import { research } from './research';
import { capabilities } from './capabilities';
import { getProject, orderedProjects } from '../features/projects/projectData';
import {
  MEDIA_ROLES,
  MEDIA_TYPES,
  PROJECT_TIERS,
  STATUS_LABELS,
} from '../features/projects/vocabulary';
import { parseYouTubeId } from '../lib/youtube';

const slugsIn = (tier) =>
  orderedProjects.filter((project) => project.tier === tier).map((project) => project.slug);
const everyStatus = (project) => [
  ...(project.system?.parts ?? []).map((part) => part.status),
  ...(project.scope?.items ?? []).map((item) => item.status),
];

describe('project inventory and hierarchy', () => {
  it('orders flagship, secondary, supporting and archive work as approved', () => {
    expect(slugsIn('flagship')).toEqual(['simplr', 'outcome-aware-ilp']);
    expect(slugsIn('secondary')).toEqual([
      'invite-industrial-manipulation',
      'intrinsic-ai-challenge',
      'robothon-2025',
    ]);
    expect(slugsIn('supporting')).toEqual([
      'ilp-fault-diagnosis',
      'autonomous-mobile-robot',
      'garrulus-power-electronics',
      'cross-modal-action-retrieval',
    ]);
    expect(slugsIn('archive')).toEqual([
      'multi-robot-task-distribution',
      'ur5-pick-and-place',
      'underwater-rov',
      'box-it',
      'home-automation-circuit',
    ]);
  });

  it('numbers current work automatically and leaves the archive unnumbered', () => {
    const numbered = orderedProjects.filter((project) => project.tier !== 'archive');
    expect(numbered.map((project) => project.number)).toEqual(
      numbered.map((_, index) => String(index + 1).padStart(2, '0')),
    );
    expect(
      orderedProjects.filter((p) => p.tier === 'archive').every((p) => p.number === null),
    ).toBe(true);
  });

  it('uses unique kebab-case slugs, known tiers and complete card fields', () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(PROJECT_TIERS).toContain(project.tier);
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.summary.length).toBeGreaterThan(0);
      expect(project.summary.length).toBeLessThanOrEqual(200);
      expect(project.category?.length).toBeGreaterThan(0);
      expect(project.technologies?.length).toBeGreaterThan(0);
      expect(Array.isArray(project.media)).toBe(true);
    }
    expect(Object.keys(projectSection.tiers)).toEqual(PROJECT_TIERS);
  });

  it('merges the MRTA entry into Outcome-Aware ILP and keeps fault diagnosis separate', () => {
    expect(getProject('mrta')).toBeNull();
    const ilp = getProject('outcome-aware-ilp');
    expect(ilp.title).toBe(
      'Outcome-Aware ILP for Explainable Grid-Aware Task Allocation in Multi-Robot Warehouse Systems',
    );
    expect(ilp.status).toBe('Ongoing R&D');
    expect(projects.filter((project) => /task allocation/i.test(project.title))).toHaveLength(1);
    const faultDiagnosis = getProject('ilp-fault-diagnosis');
    expect(orderedProjects.indexOf(faultDiagnosis)).toBeGreaterThan(orderedProjects.indexOf(ilp));
    expect(faultDiagnosis.note).toMatch(/separate/i);
  });

  it('keeps SIMPLR a multi-task platform and labels future and in-development work', () => {
    const simplr = getProject('simplr');
    expect(simplr.subtitle).toBe('Simulation Multipurpose Lab Robot');
    expect(simplr.scope.items.length).toBeGreaterThan(1);
    expect(simplr.system.parts.find((part) => /VLA/.test(part.detail)).status).toBe('future');
    expect(simplr.direction).toMatch(/not a deployed capability/);
    expect(getProject('outcome-aware-ilp').system.parts.at(-1)).toMatchObject({
      name: 'Outcome-aware ILP',
      status: 'in-development',
    });
  });

  it('reports the updated Intrinsic figures and no longer the old demonstration count', () => {
    const intrinsic = getProject('intrinsic-ai-challenge');
    expect(intrinsic.metrics[0]).toEqual({ value: 'Top 40 / 400', label: 'Submissions' });
    expect(intrinsic.metrics).toContainEqual({
      value: '2,000',
      label: 'Successful demonstrations',
    });
    expect(intrinsic.metrics).toContainEqual({ value: '1,600', label: 'Participants' });
    expect(intrinsic.metrics).toContainEqual({ value: '100k', label: 'ACT training steps' });
    expect(JSON.stringify(projects)).not.toMatch(/\b157\b/);
    expect(JSON.stringify(projects)).not.toMatch(/2,000\+/);
  });

  it('uses only known status keys and keeps employer content high level', () => {
    for (const project of projects) {
      for (const status of everyStatus(project)) {
        if (status !== undefined) expect(Object.keys(STATUS_LABELS)).toContain(status);
      }
    }
    const invite = getProject('invite-industrial-manipulation');
    expect(invite.media).toEqual([]);
    expect(invite.note).toMatch(/public, high level/);
  });
});

describe('project media and links', () => {
  it('references existing local images with alt text and dimensions', () => {
    for (const project of projects) {
      for (const item of project.media) {
        expect(MEDIA_TYPES).toContain(item.type);
        if (item.role !== undefined) expect(Object.keys(MEDIA_ROLES)).toContain(item.role);
        if (item.type === 'image') {
          expect(existsSync(`public${item.src}`)).toBe(true);
          expect(item.alt.length).toBeGreaterThan(0);
          expect(item.width).toBeGreaterThan(0);
          expect(item.height).toBeGreaterThan(0);
        }
        if (item.poster) {
          expect(existsSync(`public${item.poster}`)).toBe(true);
          expect(item.posterAlt?.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('uses parseable YouTube URLs with descriptive titles', () => {
    const videos = projects.flatMap((project) =>
      project.media.filter((item) => item.type === 'youtube'),
    );
    expect(videos.length).toBeGreaterThan(0);
    for (const video of videos) {
      expect(parseYouTubeId(video.url)).not.toBeNull();
      expect(video.title.length).toBeGreaterThan(3);
    }
    expect(JSON.stringify(projects)).not.toMatch(/unlisted/i);
  });

  it('publishes no case-study links until those pages exist', () => {
    for (const project of projects) expect(project.links?.caseStudy).toBeFalsy();
  });
});

describe('content consumed by the rest of the homepage', () => {
  it('keeps the CV download and INVITE first in experience', () => {
    expect(existsSync(`public${profile.resume}`)).toBe(true);
    expect(experience[0].company).toBe('INVITE GmbH');
  });

  it('distinguishes publications, ongoing research, projects and patent publications', () => {
    expect(research.map((item) => item.type)).toEqual([
      'Publication',
      'Ongoing research',
      'Research project',
      'Patent publication',
    ]);
    expect(research[0].venue).toBe('PlanRob, ICAPS 2026');
    expect(research.every((item) => item.href === null)).toBe(true);
    for (const item of research) {
      if (item.project) expect(getProject(item.project)).not.toBeNull();
    }
  });

  it('uses candidate education status and plain capability lists', () => {
    expect(profile.education.status).toBe('M.Sc. candidate');
    expect(profile.education.expected).toBe('June 2027');
    expect(
      capabilities.every((group) => group.items.every((item) => typeof item === 'string')),
    ).toBe(true);
  });
});
