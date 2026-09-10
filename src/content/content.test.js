import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { profile } from './profile';
import { featuredProjects } from './projects';
import { experience } from './experience';
import { research } from './research';
import { capabilities } from './capabilities';

describe('content consumed by the homepage', () => {
  it('has stable unique identifiers and the approved project priority', () => {
    const slugs = featuredProjects.map((project) => project.slug);
    expect(slugs).toEqual([
      'simplr',
      'mrta',
      'invite-industrial-manipulation',
      'intrinsic-ai-challenge',
      'robothon-2025',
    ]);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(experience[0].company).toBe('INVITE GmbH');
  });
  it('only references available public media and downloads', () => {
    expect(existsSync(`public${profile.resume}`)).toBe(true);
    for (const project of featuredProjects) {
      for (const item of project.media) {
        if (item.type === 'image') {
          expect(existsSync(`public${item.src}`)).toBe(true);
          expect(item.alt.length).toBeGreaterThan(0);
          expect(item.width).toBeGreaterThan(0);
          expect(item.height).toBeGreaterThan(0);
        }
      }
      expect(project.caseStudyHref).toBeNull();
    }
  });
  it('distinguishes publications, research projects and patent publications', () => {
    expect(research.map((item) => item.type)).toEqual([
      'Publication',
      'Research project',
      'Patent publication',
    ]);
    expect(research[0].venue).toBe('PlanRob, ICAPS 2026');
    expect(research.every((item) => item.href === null)).toBe(true);
  });
  it('uses candidate education status and plain capability lists', () => {
    expect(profile.education.status).toBe('M.Sc. candidate');
    expect(profile.education.expected).toBe('June 2027');
    expect(
      capabilities.every((group) => group.items.every((item) => typeof item === 'string')),
    ).toBe(true);
  });
});
