import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import App from './App';
import { ThemeProvider } from './features/theme/ThemeProvider';
const renderApp = () =>
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );

it('introduces the engineer with one primary heading', () => {
  renderApp();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mohammad Ibrahim Memon');
  expect(screen.getByText('Robotics Engineer')).toBeInTheDocument();
});
it('provides primary navigation, working section targets and CV downloads', () => {
  renderApp();
  expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute('href', '#work');
  expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute(
    'href',
    '/Mohammad_Memon_CV_2026.pdf',
  );
  for (const link of screen.getAllByRole('link')) {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) expect(document.getElementById(href.slice(1))).not.toBeNull();
  }
});
it('renders the five flagship projects in approved order', () => {
  renderApp();
  const work = screen.getByRole('region', { name: 'Selected Engineering Work' });
  expect(
    within(work)
      .getAllByRole('article')
      .map((article) => article.id),
  ).toEqual([
    'simplr',
    'mrta',
    'invite-industrial-manipulation',
    'intrinsic-ai-challenge',
    'robothon-2025',
  ]);
  expect(work).toHaveTextContent('Top 40 / 400');
  expect(work).toHaveTextContent('157');
  expect(work).toHaveTextContent('100k');
  expect(work).toHaveTextContent('Top 5');
  expect(within(work).queryByRole('link', { name: /case study/i })).not.toBeInTheDocument();
});
it('renders research, experience, capabilities, about and contact', () => {
  renderApp();
  expect(screen.getByRole('region', { name: 'Research and Publications' })).toHaveTextContent(
    'PlanRob, ICAPS 2026',
  );
  expect(screen.getByRole('region', { name: 'Experience' })).toHaveTextContent('INVITE GmbH');
  expect(screen.getByRole('region', { name: 'Technical Capabilities' })).toHaveTextContent(
    'Isaac Mimic',
  );
  expect(screen.getByRole('region', { name: 'About' })).toHaveTextContent('June 2027');
  expect(
    within(screen.getByRole('contentinfo')).getByRole('link', { name: /email/i }),
  ).toHaveAttribute('href', 'mailto:immemon1811@gmail.com');
});
it('opens navigation and closes it with Escape, restoring focus', async () => {
  const user = userEvent.setup();
  renderApp();
  const menu = screen.getByRole('button', { name: 'Open navigation' });
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  await user.click(menu);
  expect(menu).toHaveAttribute('aria-expanded', 'true');
  const mobile = screen.getByRole('navigation', { name: 'Mobile' });
  within(mobile).getByRole('link', { name: 'Work' }).focus();
  await user.keyboard('{Escape}');
  expect(menu).toHaveFocus();
  expect(menu).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument();
});
it('closes mobile navigation after selecting a destination', () => {
  renderApp();
  fireEvent.click(screen.getByRole('button', { name: 'Open navigation' }));
  fireEvent.click(
    within(screen.getByRole('navigation', { name: 'Mobile' })).getByRole('link', {
      name: 'Research',
    }),
  );
  expect(screen.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});
