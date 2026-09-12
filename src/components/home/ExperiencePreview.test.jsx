import { existsSync } from 'node:fs';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import ExperiencePreview from './ExperiencePreview';
import { experience } from '../../content/experience';

it('shows each company logo as a decorative image beside the company name', () => {
  const { container } = render(<ExperiencePreview />);
  for (const item of experience) {
    if (item.logo) expect(existsSync(`public${item.logo}`)).toBe(true);
  }
  const logos = container.querySelectorAll('.experience-logo img');
  expect(logos).toHaveLength(experience.filter((item) => item.logo).length);
  for (const logo of logos) expect(logo).toHaveAttribute('alt', '');
  expect(screen.getByRole('heading', { name: 'INVITE GmbH' })).toBeInTheDocument();
});
