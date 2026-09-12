import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../../App';
import { ThemeProvider } from '../../features/theme/ThemeProvider';
import { getFocusableElements } from '../../features/projects/useModalDialog';

const ILP_TITLE =
  'Outcome-Aware ILP for Explainable Grid-Aware Task Allocation in Multi-Robot Warehouse Systems';

const renderApp = () =>
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );
const work = () => screen.getByRole('region', { name: 'Selected Engineering Work' });
const cardTrigger = (name) => within(work()).getByRole('button', { name });
const dialog = () => screen.getByRole('dialog');
/** Closing a dialog opened from the page goes back in history; wait for that to settle. */
const historySettled = () => waitFor(() => expect(window.location.search).toBe(''));

describe('project cards', () => {
  it('shows scannable cards per tier without the full project explanation', () => {
    renderApp();
    const headings = within(work())
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);
    expect(headings).toEqual([
      'Current flagship work',
      'Industrial & competition work',
      'Supporting projects',
      'Additional engineering work',
    ]);
    const simplr = within(work()).getAllByRole('article')[0];
    expect(simplr).toHaveClass('project-card--flagship');
    expect(simplr).toHaveTextContent('01 / Physical AI · Laboratory manipulation');
    expect(simplr).toHaveTextContent('Current development');
    expect(simplr).not.toHaveTextContent('Laboratory work is made of many small');
    const intrinsic = document.getElementById('intrinsic-ai-challenge');
    expect(intrinsic).toHaveTextContent('Top 40 / 400');
    expect(intrinsic).toHaveTextContent('2,000 successful demonstrations');
    expect(intrinsic).not.toHaveTextContent('100k');
    expect(within(intrinsic).getAllByRole('listitem')).toHaveLength(4);
  });

  it('lists archive work compactly with the same dialog behaviour', () => {
    renderApp();
    const archive = document.querySelector('.archive-list');
    expect(within(archive).getAllByRole('listitem')).toHaveLength(5);
    expect(
      within(archive).getByRole('button', { name: 'Multi-Robot Task Distribution' }),
    ).toHaveAttribute('aria-haspopup', 'dialog');
  });
});

describe('project dialog', () => {
  it('opens as a named modal dialog, updates the URL and focuses the title', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(cardTrigger('Outcome-Aware ILP'));
    const modal = screen.getByRole('dialog', { name: ILP_TITLE });
    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAccessibleDescription(/Multi-robot task allocation \(MRTA\) is the domain/);
    expect(window.location.search).toBe('?project=outcome-aware-ilp');
    expect(screen.getByRole('heading', { level: 2, name: ILP_TITLE })).toHaveFocus();
    expect(document.documentElement).toHaveClass('has-open-dialog');
    expect(document.querySelector('#top').closest('[inert]')).not.toBeNull();
    await user.keyboard('{Escape}');
    await historySettled();
  });

  it('closes with Escape and returns focus to the originating card', async () => {
    const user = userEvent.setup();
    renderApp();
    const trigger = cardTrigger('SIMPLR');
    await user.click(trigger);
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.documentElement).not.toHaveClass('has-open-dialog');
    expect(document.querySelector('[inert]')).toBeNull();
    await historySettled();
  });

  it('closes from the close button and the backdrop', async () => {
    const user = userEvent.setup();
    renderApp();
    const trigger = cardTrigger('Robothon 2025 Grand Challenge');
    await user.click(trigger);
    await user.click(within(dialog()).getByRole('button', { name: 'Close project details' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    await historySettled();
    await user.click(trigger);
    fireEvent.click(document.querySelector('.project-dialog-backdrop'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await historySettled();
  });

  it('traps keyboard focus inside the dialog in both directions', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(cardTrigger('Autonomous Mobile Robot'));
    const focusable = getFocusableElements(dialog());
    const first = focusable[0];
    const last = focusable.at(-1);
    expect(first).toHaveAccessibleName('Close project details');
    last.focus();
    await user.tab();
    expect(first).toHaveFocus();
    await user.tab({ shift: true });
    expect(last).toHaveFocus();
    for (let step = 0; step < focusable.length + 2; step += 1) {
      await user.tab();
      expect(dialog()).toContainElement(document.activeElement);
    }
    await user.keyboard('{Escape}');
    await historySettled();
  });

  it('renders only the sections a project has content for', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(cardTrigger('SIMPLR'));
    const sections = within(dialog())
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);
    expect(sections).toEqual([
      'Problem',
      'System',
      'Laboratory task scope',
      'Direction',
      'Hardware',
      'Software',
      'Media',
    ]);
    // The hero video leads; the three other SIMPLR videos sit in the Media gallery.
    expect(within(dialog()).getAllByRole('button', { name: /^Play video/ })).toHaveLength(4);
    expect(within(dialog()).getByText('Platform architecture')).toBeInTheDocument();
    expect(within(dialog()).getAllByText('Future direction').length).toBeGreaterThan(1);
    expect(within(dialog()).queryByText('My contribution')).not.toBeInTheDocument();
    expect(within(dialog()).queryByText('Results')).not.toBeInTheDocument();
    await user.keyboard('{Escape}');
    await historySettled();
  });

  it('shows the research connection and honest development status for Outcome-Aware ILP', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(cardTrigger('Outcome-Aware ILP'));
    const modal = dialog();
    expect(within(modal).getByText('In development')).toBeInTheDocument();
    expect(within(modal).getAllByText('Implemented').length).toBeGreaterThan(0);
    expect(within(modal).getAllByText('Evaluated').length).toBeGreaterThan(0);
    expect(modal).toHaveTextContent('M. I. Memon, U. Patil, I. Awaad, Y. M. Youssef');
    expect(modal).toHaveTextContent('PlanRob, ICAPS 2026 · Dublin, Ireland');
    await user.keyboard('{Escape}');
    await historySettled();
  });

  it('shows the updated Intrinsic metrics in the dialog', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(cardTrigger('Intrinsic AI for Industry Challenge'));
    const values = [...dialog().querySelectorAll('.project-metrics dd')].map(
      (dd) => dd.textContent,
    );
    expect(values).toEqual(['Top 40 / 400', '2,000', '100k', '1,600']);
    expect(dialog()).not.toHaveTextContent(/\b157\b/);
    await user.keyboard('{Escape}');
    await historySettled();
  });

  it('lazily creates one YouTube player at a time across multiple videos', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(cardTrigger('Autonomous Mobile Robot'));
    const modal = dialog();
    expect(modal.querySelectorAll('iframe')).toHaveLength(0);
    const playButtons = within(modal).getAllByRole('button', { name: /^Play video/ });
    expect(playButtons).toHaveLength(3);
    await user.click(playButtons[0]);
    expect(modal.querySelectorAll('iframe')).toHaveLength(1);
    expect(modal.querySelector('iframe')).toHaveAttribute('title', 'Software stack in simulation');
    await user.click(
      within(modal).getByRole('button', { name: /Autonomous frontier exploration/ }),
    );
    const iframes = modal.querySelectorAll('iframe');
    expect(iframes).toHaveLength(1);
    expect(iframes[0]).toHaveAttribute('title', 'Autonomous frontier exploration');
    await user.keyboard('{Escape}');
    await historySettled();
  });

  it('browses to the next project and restores focus to that project card', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(cardTrigger('SIMPLR'));
    await user.click(within(dialog()).getByRole('button', { name: /Next project/ }));
    expect(screen.getByRole('dialog', { name: ILP_TITLE })).toBeInTheDocument();
    expect(window.location.search).toBe('?project=outcome-aware-ilp');
    expect(screen.getByRole('heading', { level: 2, name: ILP_TITLE })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(cardTrigger('Outcome-Aware ILP')).toHaveFocus();
    await historySettled();
  });

  it('opens from a shared link and closes on browser Back', async () => {
    window.history.replaceState(null, '', '/?project=robothon-2025');
    renderApp();
    expect(
      screen.getByRole('dialog', { name: 'Robothon 2025 Grand Challenge' }),
    ).toBeInTheDocument();
    fireEvent.click(within(dialog()).getByRole('button', { name: 'Close project details' }));
    expect(window.location.search).toBe('');
    expect(cardTrigger('Robothon 2025 Grand Challenge')).toHaveFocus();

    const user = userEvent.setup();
    await user.click(cardTrigger('SIMPLR'));
    expect(window.location.search).toBe('?project=simplr');
    act(() => window.history.back());
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(cardTrigger('SIMPLR')).toHaveFocus();
  });

  it('ignores unknown project links', () => {
    window.history.replaceState(null, '', '/?project=does-not-exist');
    renderApp();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens related projects from the research section', async () => {
    const user = userEvent.setup();
    renderApp();
    const research = screen.getByRole('region', { name: 'Research and Publications' });
    const [publicationLink] = within(research).getAllByRole('button', {
      name: 'View project: Outcome-Aware ILP',
    });
    await user.click(publicationLink);
    expect(screen.getByRole('dialog', { name: ILP_TITLE })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(publicationLink).toHaveFocus();
    await historySettled();
  });
});
