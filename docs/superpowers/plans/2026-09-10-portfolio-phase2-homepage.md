# Professional Portfolio Phase 2 Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy cyber-themed homepage with a professional, modular React/Vite homepage that supports intentional light and dark themes, teal and green accents, current robotics positioning, responsive design, and GitHub Pages deployment.

**Architecture:** Build the new homepage as a single-page React application driven by centralized content modules. Keep visual tokens, theme state, content data, and presentation components separate so later project-detail pages can reuse the same primitives. Do not add project routing in Phase 2; flagship project buttons may target stable future URLs while Phase 3 implements the actual case-study pages.

**Tech Stack:** React, Vite, CSS custom properties, Vitest, React Testing Library, jsdom, GitHub Pages Actions.

**Spec:** `docs/superpowers/specs/2026-09-10-portfolio-redesign-design.md`

## Global Constraints

- Preserve the existing repository history and all current uncommitted migration work by executing this plan in an isolated worktree.
- Keep the custom domain `mohammadmemon.com`.
- Keep the current CV available as a static download.
- Support both light and dark themes.
- On first visit, resolve the theme from `prefers-color-scheme`.
- Store a manual theme choice in local storage.
- Avoid a flash of the wrong theme during initial page load.
- Use teal as the primary interface accent and green as a restrained secondary/result accent.
- Do not use neon glow, glitch effects, fake terminals, particle backgrounds, large background animations, skill-percentage bars, or broad gradients.
- Use clean sans-serif typography for normal copy and monospace only for technical metadata.
- Respect `prefers-reduced-motion`.
- Use semantic landmarks, keyboard-visible focus states, accessible labels, descriptive image alt text, and adequate contrast in both themes.
- Do not add a CMS, backend, database, contact-form backend, WebGL hero, animation framework, or automatic GitHub/LinkedIn ingestion.
- Do not add final YouTube links in Phase 2.
- Do not delete legacy CSS, JavaScript, HTML pages, or images until the new homepage is functional and verified.
- Use the updated CV `Mohammad_Memon_CV_2026 (Copy).pdf` as the factual source of truth for Phase 2 professional copy.
- Keep Phase 2 focused on the homepage and shared frontend foundation. Project-detail routing and project case-study pages belong to Phase 3.

## Target File Structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── CNAME
│   ├── Mohammad_Memon_CV_2026.pdf
│   └── images/
│       └── profile/
│           └── mohammad-memon.jpg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Container.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   └── SiteFooter.jsx
│   │   ├── navigation/
│   │   │   ├── SiteHeader.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── CredibilityStrip.jsx
│   │   │   ├── FeaturedProjects.jsx
│   │   │   ├── ProjectFeature.jsx
│   │   │   ├── CurrentFocus.jsx
│   │   │   ├── ResearchPreview.jsx
│   │   │   ├── ExperiencePreview.jsx
│   │   │   └── Capabilities.jsx
│   │   └── ui/
│   │       ├── ButtonLink.jsx
│   │       ├── TechTag.jsx
│   │       └── ExternalIcon.jsx
│   ├── content/
│   │   ├── profile.js
│   │   ├── projects.js
│   │   ├── research.js
│   │   ├── experience.js
│   │   ├── capabilities.js
│   │   └── content.test.js
│   ├── features/
│   │   └── theme/
│   │       ├── ThemeProvider.jsx
│   │       ├── theme.js
│   │       └── theme.test.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── home.css
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx
│   ├── App.test.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Shared Interfaces

Use these interfaces consistently across tasks.

```js
// src/content/projects.js
export const featuredProjects = [
  {
    slug: 'simplr',
    number: '01',
    title: 'SIMPLR',
    subtitle: 'Simulation Multipurpose Lab Robot',
    year: '2026',
    categories: ['Robot Manipulation', 'Physical AI'],
    summary: 'A multipurpose laboratory manipulation platform built around a UR5e, Robotiq 2F-85, wrist RGB-D sensing, ROS 2, NVIDIA Isaac Sim and robot-learning workflows.',
    tech: ['ROS 2', 'Isaac Sim', 'Isaac Lab', 'LeRobot'],
    metrics: [
      { value: 'RGB-D', label: 'Synchronized perception' },
      { value: '20 Hz', label: 'Demonstration data' }
    ],
    href: '/projects/simplr',
    image: null,
    imageAlt: ''
  }
]

// src/content/experience.js
export const experience = [
  {
    company: 'INVITE GmbH',
    role: 'Robotics Intern',
    location: 'Leverkusen, Germany',
    period: '05/2026 - Present',
    summary: 'Industrial robot manipulation, ROS 2 and MoveIt 2 integration, NVIDIA Isaac Sim digital twins, RGB-D sensing, demonstration acquisition and robot-learning workflows.'
  }
]

// src/content/research.js
export const research = [
  {
    type: 'publication',
    title: 'Learning Interpretable Scheduling Policies for Online Multi-Robot Task Allocation via Inductive Logic Programming',
    venue: 'PlanRob, ICAPS 2026',
    year: '2026',
    href: null
  }
]
```

The `summary` and image placeholders shown in this interface example are illustrative only. Task 3 below defines the exact Phase 2 content values and avoids shipping placeholder media paths.

---

### Task 1: Bootstrap the React/Vite Homepage Foundation

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Replace: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/App.test.jsx`
- Create: `src/test/setup.js`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/home.css`

**Interfaces:**
- Consumes: none.
- Produces: `App`, global CSS tokens, test environment, `npm run dev`, `npm run test`, and `npm run build`.

- [ ] **Step 1: Create the package manifest with the exact scripts and dependencies**

Create `package.json`:

```json
{
  "name": "mohammad-memon-portfolio",
  "private": true,
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

- [ ] **Step 2: Install and lock runtime and development dependencies**

Run:

```bash
npm install react react-dom
npm install --save-dev vite @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/jest-dom
```

Expected: `package.json` now contains concrete semver ranges written by npm, `package-lock.json` pins the resolved versions, and `node_modules/` is created without dependency-resolution errors.

- [ ] **Step 3: Write the failing app smoke test**

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest';
```

Create `src/App.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the professional robotics identity', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Mohammad Ibrahim Memon/i })).toBeInTheDocument();
    expect(screen.getByText(/Robotics Engineer/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Configure Vite and Vitest**

Create `vite.config.js`:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
});
```

- [ ] **Step 5: Run the test and confirm the app does not exist yet**

Run:

```bash
npm run test:run -- src/App.test.jsx
```

Expected: FAIL because `src/App.jsx` does not exist.

- [ ] **Step 6: Create the minimal React entry point and app**

Create `src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/global.css';
import './styles/home.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Create `src/App.jsx`:

```jsx
export default function App() {
  return (
    <main>
      <h1>Mohammad Ibrahim Memon</h1>
      <p>Robotics Engineer</p>
    </main>
  );
}
```

Replace `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <title>Mohammad Ibrahim Memon | Robotics Engineer</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Add the initial design tokens and reset**

Create `src/styles/tokens.css`:

```css
:root {
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  --page-max: 1180px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --teal-600: #087f7a;
  --teal-500: #0f9f98;
  --green-600: #2e7d4f;
  --green-500: #3f9d63;
  --bg: #f7f8f6;
  --surface: #ffffff;
  --surface-muted: #eff2ef;
  --text: #15201f;
  --text-muted: #5d6a68;
  --border: #d9e0dd;
  --accent: var(--teal-600);
  --accent-strong: var(--green-600);
  --focus: #0f9f98;
  --shadow-sm: 0 8px 28px rgb(13 39 37 / 0.08);
}

html[data-theme='dark'] {
  --bg: #101615;
  --surface: #171f1d;
  --surface-muted: #1d2825;
  --text: #edf4f1;
  --text-muted: #a6b5b0;
  --border: #2e3b37;
  --accent: #59c8c0;
  --accent-strong: #6fcf8f;
  --focus: #59c8c0;
  --shadow-sm: 0 10px 32px rgb(0 0 0 / 0.24);
}
```

Create `src/styles/global.css` with a box-sizing reset, `body` font/background/text styles, link inheritance, responsive images, focus-visible outline, and reduced-motion override:

```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; min-width: 320px; background: var(--bg); color: var(--text); font-family: var(--font-sans); line-height: 1.6; }
button, input, textarea, select { font: inherit; }
a { color: inherit; }
img { display: block; max-width: 100%; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}
```

Create `src/styles/home.css` as an empty stylesheet for the next tasks.

- [ ] **Step 8: Run tests and build**

Run:

```bash
npm run test:run
npm run build
```

Expected: all tests PASS and Vite produces `dist/index.html` plus bundled assets.

- [ ] **Step 9: Commit the foundation**

```bash
git add package.json package-lock.json vite.config.js index.html src

git commit -m "build: bootstrap React portfolio frontend"
```

---

### Task 2: Implement the Light/Dark Theme System

**Files:**
- Create: `src/features/theme/theme.js`
- Create: `src/features/theme/theme.test.js`
- Create: `src/features/theme/ThemeProvider.jsx`
- Create: `src/components/navigation/ThemeToggle.jsx`
- Modify: `src/main.jsx`
- Modify: `index.html`

**Interfaces:**
- Produces: `THEME_STORAGE_KEY`, `resolveInitialTheme()`, `setDocumentTheme(theme)`, `ThemeProvider`, and `useTheme()`.
- Consumes: CSS tokens from Task 1.

- [ ] **Step 1: Write failing theme utility tests**

Create `src/features/theme/theme.test.js`:

```js
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resolveInitialTheme, setDocumentTheme, THEME_STORAGE_KEY } from './theme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('resolveInitialTheme', () => {
  it('prefers a stored visitor choice', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    expect(resolveInitialTheme(() => false)).toBe('dark');
  });

  it('uses system dark preference when no stored choice exists', () => {
    expect(resolveInitialTheme(() => true)).toBe('dark');
  });

  it('defaults to light when the system is not dark', () => {
    expect(resolveInitialTheme(() => false)).toBe('light');
  });
});

describe('setDocumentTheme', () => {
  it('writes the theme to the document root', () => {
    setDocumentTheme('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
```

- [ ] **Step 2: Run the tests and verify failure**

```bash
npm run test:run -- src/features/theme/theme.test.js
```

Expected: FAIL because `theme.js` does not exist.

- [ ] **Step 3: Implement theme utilities**

Create `src/features/theme/theme.js`:

```js
export const THEME_STORAGE_KEY = 'portfolio-theme';
export const THEMES = ['light', 'dark'];

export function resolveInitialTheme(systemPrefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches) {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (THEMES.includes(stored)) return stored;
  return systemPrefersDark() ? 'dark' : 'light';
}

export function setDocumentTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
```

- [ ] **Step 4: Create the theme provider and hook**

Create `src/features/theme/ThemeProvider.jsx`:

```jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { resolveInitialTheme, setDocumentTheme, THEME_STORAGE_KEY } from './theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => resolveInitialTheme());

  const setTheme = (nextTheme) => {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setDocumentTheme(nextTheme);
    setThemeState(nextTheme);
  };

  useEffect(() => {
    setDocumentTheme(theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark')
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used within ThemeProvider');
  return value;
}
```


- [ ] **Step 5: Create the accessible theme toggle**

Create `src/components/navigation/ThemeToggle.jsx` with inline SVG icons and no icon dependency:

```jsx
import { useTheme } from '../../features/theme/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
    </button>
  );
}
```

- [ ] **Step 6: Wrap the application with the provider**

Modify `src/main.jsx` so `App` renders inside `ThemeProvider`.

- [ ] **Step 7: Add pre-render theme bootstrap to prevent a wrong-theme flash**

In `index.html`, before the module script, add:

```html
<script>
  (() => {
    const key = 'portfolio-theme';
    const stored = localStorage.getItem(key);
    const valid = stored === 'light' || stored === 'dark';
    const theme = valid
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  })();
</script>
```

- [ ] **Step 8: Run theme tests and full build**

```bash
npm run test:run
npm run build
```

Expected: all tests PASS and the build succeeds.

- [ ] **Step 9: Commit the theme system**

```bash
git add index.html src/features src/components/navigation/ThemeToggle.jsx src/main.jsx

git commit -m "feat: add persistent light and dark themes"
```

---

### Task 3: Centralize the Current Professional Content

**Files:**
- Create: `src/content/profile.js`
- Create: `src/content/projects.js`
- Create: `src/content/research.js`
- Create: `src/content/experience.js`
- Create: `src/content/capabilities.js`
- Create: `src/content/content.test.js`

**Interfaces:**
- Produces: `profile`, `featuredProjects`, `research`, `experience`, and `capabilities` arrays consumed by all homepage components.
- Consumes: factual content from `Mohammad_Memon_CV_2026 (Copy).pdf` and approved Phase 1 positioning.

- [ ] **Step 1: Write content-contract tests**

Create `src/content/content.test.js`:

```js
import { describe, expect, it } from 'vitest';
import { profile } from './profile';
import { featuredProjects } from './projects';
import { research } from './research';
import { experience } from './experience';
import { capabilities } from './capabilities';

describe('portfolio content', () => {
  it('uses the current professional identity', () => {
    expect(profile.name).toBe('Mohammad Ibrahim Memon');
    expect(profile.title).toBe('Robotics Engineer');
    expect(profile.focus).toContain('Physical AI');
  });

  it('keeps unique project slugs and SIMPLR first', () => {
    const slugs = featuredProjects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(featuredProjects[0].slug).toBe('simplr');
  });

  it('puts INVITE first in professional experience', () => {
    expect(experience[0].company).toBe('INVITE GmbH');
  });

  it('contains the ICAPS 2026 PlanRob publication', () => {
    expect(research.some((item) => item.venue.includes('ICAPS 2026'))).toBe(true);
  });

  it('does not use numeric skill percentages', () => {
    expect(capabilities.flatMap((group) => group.items).every((item) => typeof item === 'string')).toBe(true);
  });
});
```

- [ ] **Step 2: Run the content tests and verify failure**

```bash
npm run test:run -- src/content/content.test.js
```

Expected: FAIL because the content modules do not exist.

- [ ] **Step 3: Create the exact Phase 2 profile content**

Create `src/content/profile.js`:

```js
export const profile = {
  name: 'Mohammad Ibrahim Memon',
  title: 'Robotics Engineer',
  location: 'Bonn, Germany',
  focus: [
    'Industrial Manipulation',
    'Physical AI',
    'Robot Learning',
    'Autonomous Systems',
    'Digital Twins'
  ],
  intro: 'I build robotic systems from simulation to deployment, combining ROS 2, NVIDIA Isaac, perception, motion planning, robot learning, and explainable autonomy.',
  email: 'immemon1811@gmail.com',
  github: 'https://github.com/ibrahim-1811',
  linkedin: 'https://www.linkedin.com/in/ibrahimmemon18',
  resume: '/Mohammad_Memon_CV_2026.pdf',
  credibility: [
    { label: 'Education', value: 'M.Sc. Autonomous Systems, H-BRS' },
    { label: 'Current', value: 'Robotics R&D, INVITE GmbH' },
    { label: 'Research', value: 'PlanRob, ICAPS 2026' },
    { label: 'Stack', value: 'ROS 2 · Isaac Sim · Isaac Lab · LeRobot' }
  ]
};
```

- [ ] **Step 4: Create the exact Phase 2 featured-project records**

Create `src/content/projects.js` with these records. Do not assign final image paths in Phase 2. Use `image: null` so the component renders a professional technical placeholder surface until the user supplies final project visuals.

```js
export const featuredProjects = [
  {
    slug: 'simplr',
    number: '01',
    title: 'SIMPLR',
    subtitle: 'Simulation Multipurpose Lab Robot',
    year: '2026',
    categories: ['Robot Manipulation', 'Physical AI'],
    summary: 'A multipurpose laboratory manipulation platform built around a UR5e, Robotiq 2F-85, wrist RGB-D sensing, ROS 2, NVIDIA Isaac Sim and robot-learning workflows for tasks such as pouring, scooping, transfer and tool interaction.',
    tech: ['UR5e', 'Robotiq 2F-85', 'ROS 2', 'Isaac Sim', 'Isaac Lab', 'LeRobot'],
    metrics: [
      { value: 'RGB-D', label: 'Synchronized perception' },
      { value: '20 Hz', label: 'Demonstration data' }
    ],
    href: '/projects/simplr',
    image: null,
    imageAlt: ''
  },
  {
    slug: 'mrta',
    number: '02',
    title: 'Explainable Multi-Robot Task Allocation',
    subtitle: 'Outcome-aware scheduling and warehouse execution',
    year: '2026',
    categories: ['Multi-Robot Systems', 'Explainable AI'],
    summary: 'An online warehouse task-allocation framework combining grid-based A* planning, scheduling, symbolic robot and task state, heuristic and optimization baselines, and interpretable ILP scheduling policies.',
    tech: ['ROS 2', 'Gazebo', 'Python', 'A*', 'Prolog', 'ILP'],
    metrics: [
      { value: 'ICAPS 2026', label: 'PlanRob publication' },
      { value: 'Online MRTA', label: 'Warehouse scheduling' }
    ],
    href: '/projects/mrta',
    image: null,
    imageAlt: ''
  },
  {
    slug: 'invite-industrial-manipulation',
    number: '03',
    title: 'Industrial Manipulation & Digital Twins',
    subtitle: 'INVITE GmbH',
    year: '2026',
    categories: ['Industrial Robotics', 'Digital Twins'],
    summary: 'ROS 2, MoveIt 2 and NVIDIA Isaac Sim digital twins for UR10 and UR5e workcells, including grippers, RGB-D cameras, TF, collision geometry, trajectory execution, simulated sensors and demonstration acquisition.',
    tech: ['UR10', 'UR5e', 'ROS 2', 'MoveIt 2', 'Isaac Sim', 'RGB-D'],
    metrics: [
      { value: 'Sim to robot', label: 'Integrated control workflow' },
      { value: 'Robot learning', label: 'Demonstration pipeline' }
    ],
    href: '/projects/invite-industrial-manipulation',
    image: null,
    imageAlt: ''
  },
  {
    slug: 'intrinsic-ai-challenge',
    number: '04',
    title: 'Intrinsic AI for Industry Challenge',
    subtitle: 'Contact-rich cable and connector manipulation',
    year: '2026',
    categories: ['Robot Learning', 'Manipulation'],
    summary: 'A multi-camera perception and demonstration pipeline for contact-rich manipulation, with validated LeRobot datasets and ACT policy training for learned cable and connector handling.',
    tech: ['ROS 2', 'YOLO', 'PyTorch', 'LeRobot', 'ACT'],
    metrics: [
      { value: 'Top 40 / 400', label: 'Challenge ranking' },
      { value: '157', label: 'Successful demonstrations' },
      { value: '100k', label: 'ACT training steps' }
    ],
    href: '/projects/intrinsic-ai-challenge',
    image: null,
    imageAlt: ''
  },
  {
    slug: 'robothon-2025',
    number: '05',
    title: 'Robothon 2025 Grand Challenge',
    subtitle: 'Vision-guided Kinova Gen3 manipulation',
    year: '2025',
    categories: ['Manipulation', 'Competition'],
    summary: 'An autonomous vision-guided manipulation pipeline using MoveIt and OpenCV for button pressing, stylus grasping, trajectory drawing and maze solving under competition time constraints.',
    tech: ['Kinova Gen3', 'ROS', 'MoveIt', 'OpenCV', 'Python', 'C++'],
    metrics: [{ value: 'Top 5', label: 'International result' }],
    href: '/projects/robothon-2025',
    image: null,
    imageAlt: ''
  }
];
```

- [ ] **Step 5: Create research, experience and capability content**

Create `src/content/research.js`:

```js
export const research = [
  {
    type: 'Publication',
    title: 'Learning Interpretable Scheduling Policies for Online Multi-Robot Task Allocation via Inductive Logic Programming',
    venue: 'PlanRob, ICAPS 2026',
    year: '2026',
    note: 'Dublin, Ireland'
  },
  {
    type: 'Research Project',
    title: 'ILP-Based Fault Detection and Diagnosis for Mobile and Multi-Robot Systems',
    venue: 'Interpretable fault diagnosis with ROS, Prolog and ILP',
    year: '2026',
    note: 'Simulation and real-robot evaluation'
  },
  {
    type: 'Patent',
    title: 'An Inventory Management, Tracking and Consumption Predicting System using Intelligent Container Box and Central Server',
    venue: 'Indian Patent Publication No. IN 202021029069 A',
    year: '2020',
    note: null
  }
];
```

Create `src/content/experience.js`:

```js
export const experience = [
  {
    company: 'INVITE GmbH',
    role: 'Robotics Intern',
    location: 'Leverkusen, Germany',
    period: '05/2026 - Present',
    summary: 'Industrial robot manipulation, ROS 2 and MoveIt 2 integration, NVIDIA Isaac Sim digital twins, RGB-D sensing, demonstration acquisition, LeRobot, ACT and Isaac Mimic.'
  },
  {
    company: 'Garrulus',
    role: 'Research Assistant',
    location: 'Bonn, Germany',
    period: '05/2025 - 12/2025',
    summary: 'PCB protection, power distribution, eFuse protection, solenoid drivers and power sequencing for autonomous tree-seeding robots.'
  },
  {
    company: 'Kelo Robotics',
    role: 'Research Assistant',
    location: 'Stuttgart, Germany',
    period: '05/2024 - 08/2024',
    summary: 'NVIDIA Isaac Sim and Gazebo evaluation for robotic navigation, control, sensor integration and multi-agent simulation.'
  },
  {
    company: 'Unbox Robotics Pvt. Ltd',
    role: 'Robotics System Engineer',
    location: 'Pune, India',
    period: '06/2022 - 07/2023',
    summary: 'Automated validation, regression testing, system debugging, DFMEA, deployment support and warehouse-robot integration.'
  },
  {
    company: 'DashDot Robotics Pvt. Ltd',
    role: 'Embedded System Engineer',
    location: 'Ahmedabad, India',
    period: '03/2021 - 02/2022',
    summary: 'Embedded hardware, sensor interfaces, hardware bring-up, circuit debugging, sensor calibration and firmware integration.'
  }
];
```

Create `src/content/capabilities.js`:

```js
export const capabilities = [
  { title: 'Robotics', items: ['ROS 2', 'ROS', 'MoveIt 2', 'tf2', 'Gazebo', 'Isaac Sim', 'Isaac Lab'] },
  { title: 'Robot Learning', items: ['PyTorch', 'LeRobot', 'ACT', 'Isaac Mimic', 'Imitation Learning', 'Dataset Validation', 'Policy Evaluation'] },
  { title: 'Perception', items: ['RGB-D Cameras', 'OpenCV', 'YOLO', 'RealSense', 'ZED'] },
  { title: 'Programming & Systems', items: ['Python', 'C++', 'C', 'Bash', 'Linux', 'Git', 'CI/CD'] },
  { title: 'Research & Planning', items: ['ILP', 'Prolog', 'MRTA', 'A* Planning', 'Explainable AI', 'Scheduling'] },
  { title: 'Embedded & Electronics', items: ['PCB Design', 'Power Electronics', 'I2C', 'SPI', 'UART', 'Hardware Bring-up', 'DFMEA'] }
];
```

- [ ] **Step 6: Run content tests**

```bash
npm run test:run -- src/content/content.test.js
```

Expected: PASS.

- [ ] **Step 7: Commit centralized content**

```bash
git add src/content

git commit -m "content: add current robotics portfolio data"
```

---

### Task 4: Build the Global Header and Hero

**Files:**
- Create: `src/components/layout/Container.jsx`
- Create: `src/components/navigation/SiteHeader.jsx`
- Create: `src/components/home/Hero.jsx`
- Create: `src/components/ui/ButtonLink.jsx`
- Create: `src/components/ui/ExternalIcon.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Modify: `src/styles/home.css`

**Interfaces:**
- Consumes: `profile` and `ThemeToggle`.
- Produces: accessible global header and homepage hero.

- [ ] **Step 1: Extend the app test with header and hero expectations**

Add to `src/App.test.jsx`:

```jsx
it('renders primary portfolio navigation and hero actions', () => {
  render(<App />);
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute('href', '#work');
  expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute('href', '/Mohammad_Memon_CV_2026.pdf');
  expect(screen.getByRole('button', { name: /switch to/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify failure**

```bash
npm run test:run -- src/App.test.jsx
```

Expected: FAIL because the navigation and hero do not exist.

- [ ] **Step 3: Create reusable layout and link primitives**

Create `Container.jsx` with a `div.container` wrapper.

Create `ButtonLink.jsx` accepting `{ href, children, variant = 'primary', external = false, download = false }` and applying `button-link button-link--${variant}`. Add `target="_blank" rel="noreferrer"` only when `external` is true.

Create `ExternalIcon.jsx` as a small accessible-hidden inline SVG arrow icon.

- [ ] **Step 4: Create the site header**

`SiteHeader.jsx` must render:

```text
Mohammad Memon
Work
Research
Experience
About
Resume
ThemeToggle
```

Use anchor targets `#work`, `#research`, `#experience`, `#about`, and `/Mohammad_Memon_CV_2026.pdf`. Mark the navigation with `aria-label="Primary"`. Keep the theme toggle outside the nav list but inside the header actions.

- [ ] **Step 5: Create the professional hero**

`Hero.jsx` must render the exact `profile.name`, `profile.title`, `profile.intro`, all focus tags, and actions for View Projects, Download CV, GitHub and LinkedIn.

For the initial visual, use `/images/profile/mohammad-memon.jpg` only after Task 8 copies the approved CV/profile image. Until Task 8, render a CSS-only `hero-visual` panel containing the metadata text `ROBOTICS · PHYSICAL AI · AUTONOMOUS SYSTEMS` so the page remains complete without a broken image.

- [ ] **Step 6: Compose header and hero in `App.jsx`**

`App` should now start with:

```jsx
<>
  <SiteHeader />
  <main>
    <Hero />
  </main>
</>
```

- [ ] **Step 7: Style the global header and hero**

Add styles to `home.css` for:

- sticky translucent header using theme surfaces,
- max-width container,
- simple wordmark,
- horizontal desktop navigation,
- compact circular theme toggle,
- two-column hero at widths above 860px,
- large but restrained heading scale,
- wrapped focus tags,
- teal primary CTA,
- neutral secondary CTA,
- technical metadata visual using a subtle border and one restrained teal-to-green accent rule,
- one-column mobile hero below 860px.

Do not add glowing shadows, animated gradients, background grids, or decorative particles.

- [ ] **Step 8: Run tests and build**

```bash
npm run test:run
npm run build
```

Expected: PASS.

- [ ] **Step 9: Commit header and hero**

```bash
git add src/components src/App.jsx src/App.test.jsx src/styles/home.css

git commit -m "feat: build professional portfolio hero"
```

---

### Task 5: Build the Credibility Strip and Featured Engineering Work

**Files:**
- Create: `src/components/home/CredibilityStrip.jsx`
- Create: `src/components/home/FeaturedProjects.jsx`
- Create: `src/components/home/ProjectFeature.jsx`
- Create: `src/components/ui/TechTag.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Modify: `src/styles/home.css`

**Interfaces:**
- Consumes: `profile.credibility` and `featuredProjects`.
- Produces: `#work` section with five ordered flagship projects.

- [ ] **Step 1: Add failing project hierarchy tests**

Add to `src/App.test.jsx`:

```jsx
it('shows the approved flagship project hierarchy', () => {
  render(<App />);
  const work = screen.getByRole('region', { name: /selected engineering work/i });
  expect(work).toHaveTextContent('SIMPLR');
  expect(work).toHaveTextContent('Explainable Multi-Robot Task Allocation');
  expect(work).toHaveTextContent('Industrial Manipulation & Digital Twins');
  expect(work).toHaveTextContent('Intrinsic AI for Industry Challenge');
  expect(work).toHaveTextContent('Robothon 2025 Grand Challenge');
});

it('shows evidence-based challenge metrics', () => {
  render(<App />);
  expect(screen.getByText('Top 40 / 400')).toBeInTheDocument();
  expect(screen.getByText('157')).toBeInTheDocument();
  expect(screen.getByText('Top 5')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests and confirm failure**

```bash
npm run test:run -- src/App.test.jsx
```

Expected: FAIL because the work section does not exist.

- [ ] **Step 3: Build `TechTag` and `CredibilityStrip`**

`TechTag` renders a `<span className="tech-tag">`.

`CredibilityStrip` maps `profile.credibility` into four concise items with label and value. Use a semantic `<section aria-label="Professional highlights">`.

- [ ] **Step 4: Build the reusable project feature component**

`ProjectFeature.jsx` must render:

- project number and year,
- joined category metadata,
- title and subtitle,
- concise summary,
- tech tags,
- metric cards only when `metrics.length > 0`,
- `View Case Study` link using `project.href`,
- a project visual panel.

When `project.image === null`, the visual panel must show the project number, title, and first three technology tags rather than a broken image.

Alternate the editorial layout by index on desktop, but keep DOM order logical for accessibility.

- [ ] **Step 5: Build the work section**

`FeaturedProjects.jsx` renders:

```jsx
<section id="work" aria-labelledby="work-heading">
  <SectionHeading eyebrow="Selected Engineering Work" title="Systems I build and study" id="work-heading" />
  {featuredProjects.map((project, index) => (
    <ProjectFeature key={project.slug} project={project} index={index} />
  ))}
</section>
```

Create `SectionHeading.jsx` under `src/components/layout/` if it does not yet exist. It must support `{ eyebrow, title, description, id }`.

- [ ] **Step 6: Add the credibility strip and work section to `App.jsx`**

Order:

```text
Header
Hero
CredibilityStrip
FeaturedProjects
```

- [ ] **Step 7: Style editorial project layouts**

Add styles for:

- compact credibility row,
- large section spacing,
- project index metadata in monospace,
- alternating two-column desktop feature rows,
- project visual panels with theme-aware neutral surfaces,
- metric cards that use green only for values or small accents,
- restrained border lift on hover,
- single-column project rows on narrow screens,
- tag wrapping without horizontal overflow.

- [ ] **Step 8: Run tests and build**

```bash
npm run test:run
npm run build
```

Expected: PASS.

- [ ] **Step 9: Commit flagship homepage work**

```bash
git add src/components src/App.jsx src/App.test.jsx src/styles/home.css

git commit -m "feat: add flagship robotics work section"
```

---

### Task 6: Complete the Homepage With Research, Experience, Capabilities, About and Footer

**Files:**
- Create: `src/components/home/CurrentFocus.jsx`
- Create: `src/components/home/ResearchPreview.jsx`
- Create: `src/components/home/ExperiencePreview.jsx`
- Create: `src/components/home/Capabilities.jsx`
- Create: `src/components/layout/SiteFooter.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Modify: `src/styles/home.css`

**Interfaces:**
- Consumes: `profile`, `research`, `experience`, and `capabilities`.
- Produces: complete homepage sections with stable anchors `#research`, `#experience`, and `#about`.

- [ ] **Step 1: Add failing tests for the lower homepage**

Add to `src/App.test.jsx`:

```jsx
it('renders research, experience and capability evidence', () => {
  render(<App />);
  expect(screen.getByRole('region', { name: /research and publications/i })).toHaveTextContent('PlanRob, ICAPS 2026');
  expect(screen.getByRole('region', { name: /experience/i })).toHaveTextContent('INVITE GmbH');
  expect(screen.getByRole('region', { name: /technical capabilities/i })).toHaveTextContent('Isaac Mimic');
  expect(screen.queryByText(/%/)).not.toBeInTheDocument();
});

it('provides direct contact and profile links in the footer', () => {
  render(<App />);
  expect(screen.getByRole('contentinfo')).toHaveTextContent('Mohammad Ibrahim Memon');
  expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', 'mailto:immemon1811@gmail.com');
});
```

- [ ] **Step 2: Run the tests and verify failure**

```bash
npm run test:run -- src/App.test.jsx
```

Expected: FAIL because these sections do not exist.

- [ ] **Step 3: Build `CurrentFocus`**

Render the five approved focus areas in a compact horizontal or wrapping editorial list:

```text
Physical AI
Robot Learning
Industrial Manipulation
Digital Twins
Explainable Multi-Robot Systems
```

- [ ] **Step 4: Build `ResearchPreview`**

Render a section with `id="research"`, accessible name `Research and Publications`, and one card/row per research item. The ICAPS publication must appear first. Distinguish Publication, Research Project, and Patent with quiet metadata labels rather than colored badges.

- [ ] **Step 5: Build `ExperiencePreview`**

Render `id="experience"` as a vertical timeline/stack. Each item shows period, role, company, location and one concise summary. Avoid copying every CV bullet.

- [ ] **Step 6: Build `Capabilities`**

Render grouped capability columns from `capabilities`. Technology names are plain tags or comma-separated compact items. Do not add numeric proficiency scores.

- [ ] **Step 7: Build the About section directly in `App.jsx` or as `CurrentFocus` companion**

Create an `#about` section with this Phase 2 copy:

```text
I work across robotics software, simulation, manipulation, robot learning and embedded systems. My current focus is building industrial and research robot systems that connect digital twins, perception, planning, demonstration data and learned policies into deployable workflows.
```

Add a secondary sentence:

```text
I am currently pursuing an M.Sc. in Autonomous Systems at Hochschule Bonn-Rhein-Sieg in Bonn, Germany.
```

- [ ] **Step 8: Build the footer**

`SiteFooter` contains name, email, GitHub, LinkedIn and CV links. It does not contain a contact form.

- [ ] **Step 9: Compose the final homepage order**

Use this exact section order:

```text
SiteHeader
Hero
CredibilityStrip
Selected Engineering Work
Current Focus
Research and Publications
Experience
Technical Capabilities
About
SiteFooter
```

- [ ] **Step 10: Style the lower homepage**

Use consistent section spacing and borders. Keep research and experience text-heavy sections visually calm. Use green only for evidence/result accents, not for every label. Ensure two-column sections collapse cleanly below 760px.

- [ ] **Step 11: Run tests and build**

```bash
npm run test:run
npm run build
```

Expected: PASS.

- [ ] **Step 12: Commit the complete homepage content**

```bash
git add src/components src/App.jsx src/App.test.jsx src/styles/home.css

git commit -m "feat: complete professional portfolio homepage"
```

---

### Task 7: Add Mobile Navigation, Responsive Polish and Accessibility Checks

**Files:**
- Modify: `src/components/navigation/SiteHeader.jsx`
- Modify: `src/App.test.jsx`
- Modify: `src/styles/home.css`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: existing header and homepage sections.
- Produces: keyboard-operable mobile navigation, responsive layouts, reduced-motion behavior.

- [ ] **Step 1: Add a failing mobile-navigation behavior test**

Use React Testing Library `fireEvent`:

```jsx
import { fireEvent, render, screen } from '@testing-library/react';

it('opens and closes the mobile navigation accessibly', () => {
  render(<App />);
  const menuButton = screen.getByRole('button', { name: /open navigation/i });
  expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(menuButton);
  expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and verify failure**

```bash
npm run test:run -- src/App.test.jsx
```

Expected: FAIL because the mobile navigation button does not exist.

- [ ] **Step 3: Implement mobile navigation state**

Update `SiteHeader.jsx` with local `menuOpen` state. The desktop nav remains in the DOM for desktop styling. Add a mobile menu button with `aria-expanded`, `aria-controls="mobile-navigation"`, and a changing accessible label `Open navigation` / `Close navigation`.

The mobile nav must contain the same destination links as the desktop nav. Clicking an in-page mobile link closes the menu.

- [ ] **Step 4: Add responsive CSS at defined breakpoints**

Verify these layout rules in CSS:

- `<= 960px`: reduce section and hero gaps.
- `<= 860px`: hero and project features become one column.
- `<= 760px`: desktop nav hides, mobile menu control appears, research/experience grids become one column.
- `<= 520px`: smaller page gutters, CTA buttons stack when needed, credibility strip becomes a 2-column or 1-column grid.

- [ ] **Step 5: Add explicit accessibility CSS and semantics**

Ensure:

- skip link appears on keyboard focus and targets `#main-content`,
- `<main id="main-content">` exists,
- all sections have headings and accessible region names,
- focus states remain visible in both themes,
- icon-only theme/menu buttons have accessible names,
- no text is conveyed only by color.

- [ ] **Step 6: Run full tests and build**

```bash
npm run test:run
npm run build
```

Expected: PASS.

- [ ] **Step 7: Start the preview and perform a lightweight visual check**

Run:

```bash
npm run preview -- --host 127.0.0.1
```

Check at approximately 1440px, 1024px, 768px and 390px widths. Confirm no horizontal overflow, clipped tags, overlapping navigation, unreadable contrast, or broken project layouts in either theme.

- [ ] **Step 8: Commit responsive and accessibility improvements**

```bash
git add src/components/navigation/SiteHeader.jsx src/App.test.jsx src/styles

git commit -m "fix: polish responsive and accessible navigation"
```

---

### Task 8: Add Current CV, Profile Asset, SEO Metadata and GitHub Pages Deployment

**Files:**
- Create: `public/CNAME`
- Create: `public/Mohammad_Memon_CV_2026.pdf`
- Create: `public/images/profile/mohammad-memon.jpg`
- Create: `.github/workflows/deploy.yml`
- Modify: `index.html`
- Modify: `src/components/home/Hero.jsx`
- Modify: `src/App.test.jsx`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: updated CV and existing professional headshot from the CV/source assets.
- Produces: static CV download, professional hero image, metadata, reproducible Pages deployment.

- [ ] **Step 1: Copy the approved CV into the Vite public directory**

Run:

```bash
mkdir -p public/images/profile
cp 'Mohammad_Memon_CV_2026 (Copy).pdf' public/Mohammad_Memon_CV_2026.pdf
printf '%s\n' 'mohammadmemon.com' > public/CNAME
```

Expected: the build later contains both `/Mohammad_Memon_CV_2026.pdf` and `/CNAME`.

- [ ] **Step 2: Create a web-ready profile image from the existing professional headshot**

Extract the embedded professional headshot from page 1 of `Mohammad_Memon_CV_2026 (Copy).pdf`. The PDF contains one JPEG image at 897 x 1280 pixels. Preserve that image without generative retouching, resize only if needed for web delivery, and save it to:

```text
public/images/profile/mohammad-memon.jpg
```

Do not apply generative retouching or change facial appearance.

- [ ] **Step 3: Replace the CSS-only hero visual with the profile image**

Update `Hero.jsx` to render:

```jsx
<img
  src="/images/profile/mohammad-memon.jpg"
  alt="Mohammad Ibrahim Memon"
  width="900"
  height="900"
  loading="eager"
/>
```

Keep the technical metadata as a small caption or adjacent text treatment rather than overlaying it across the face.

- [ ] **Step 4: Add SEO and social metadata**

Update `index.html` with:

```html
<meta name="description" content="Mohammad Ibrahim Memon is a robotics engineer working on industrial manipulation, Physical AI, robot learning, digital twins, ROS 2 and NVIDIA Isaac Sim." />
<link rel="canonical" href="https://mohammadmemon.com/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Mohammad Ibrahim Memon | Robotics Engineer" />
<meta property="og:description" content="Industrial manipulation, Physical AI, robot learning, digital twins and explainable autonomous systems." />
<meta property="og:url" content="https://mohammadmemon.com/" />
<meta name="twitter:card" content="summary_large_image" />
```

Do not add an `og:image` until a deliberate social-card image exists.

Add a compact `Person` JSON-LD object with name, jobTitle, URL, sameAs GitHub/LinkedIn, alumniOf/current education, and address locality/country. Do not publish phone number in JSON-LD.

- [ ] **Step 5: Add GitHub Pages deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy portfolio

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run test:run
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 6: Ensure generated build artifacts stay untracked**

Append to `.gitignore` if absent:

```text
dist/
```

- [ ] **Step 7: Add a CV-link regression test**

Ensure `src/App.test.jsx` includes:

```jsx
expect(screen.getAllByRole('link', { name: /cv|resume/i })[0]).toHaveAttribute('href', '/Mohammad_Memon_CV_2026.pdf');
```

- [ ] **Step 8: Run final Phase 2 verification**

Run:

```bash
npm run test:run
npm run build

test -f dist/index.html
test -f dist/CNAME
test -f dist/Mohammad_Memon_CV_2026.pdf
```

Expected: all commands succeed.

- [ ] **Step 9: Perform one final source check for legacy references**

Run:

```bash
grep -RniE 'Orbitron|glitch|cyber-theme|skill.*%|jquery' src index.html package.json || true
```

Expected: no legacy cyber-theme or jQuery dependency references in the new React source.

- [ ] **Step 10: Commit deployment and production assets**

```bash
git add .github public index.html src/components/home/Hero.jsx src/App.test.jsx .gitignore

git commit -m "chore: prepare portfolio for GitHub Pages"
```

---

## Phase 2 Acceptance Checklist

Before presenting the first complete webpage to the user, verify all of the following:

- [ ] `npm run test:run` passes.
- [ ] `npm run build` passes.
- [ ] `dist/CNAME` contains `mohammadmemon.com`.
- [ ] `dist/Mohammad_Memon_CV_2026.pdf` exists.
- [ ] Light theme looks intentional.
- [ ] Dark theme looks intentional.
- [ ] Manual theme selection persists after reload.
- [ ] The first visit respects system theme preference.
- [ ] Hero clearly says `Mohammad Ibrahim Memon` and `Robotics Engineer`.
- [ ] The homepage foregrounds industrial manipulation, Physical AI, robot learning, autonomous systems and digital twins.
- [ ] SIMPLR is the first flagship project.
- [ ] MRTA/R&D appears second and includes the PlanRob, ICAPS 2026 connection.
- [ ] INVITE appears first in Experience.
- [ ] Intrinsic shows Top 40 / 400, 157 successful demonstrations and 100k ACT training steps.
- [ ] Robothon shows Top 5.
- [ ] No percentage skill bars remain.
- [ ] No new final YouTube links are hardcoded.
- [ ] Mobile navigation works with keyboard and touch.
- [ ] No horizontal overflow at 390px width.
- [ ] Focus states are visible in both themes.
- [ ] Reduced-motion users are not forced through animations.
- [ ] Legacy files remain in the branch until the new site is reviewed and Phase 2 is accepted.

## Deferred to Phase 3

The following approved design items intentionally remain out of this plan:

- Dedicated project case-study pages under `/projects/<slug>`.
- Project routing and direct-link fallback behavior.
- Modular project sections such as architecture, hardware, dataset, methods and results.
- YouTube media gallery and click-to-load embeds.
- Related-project links.
- Final project-specific imagery and simulation video posters.

Phase 3 should reuse the theme, layout, content model and project metadata created here rather than redesigning them.
