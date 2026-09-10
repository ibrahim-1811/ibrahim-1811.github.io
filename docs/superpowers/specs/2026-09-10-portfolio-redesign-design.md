# Professional Robotics Portfolio Redesign

Date: 2026-09-10
Status: Approved for implementation

## 1. Goal

Rebuild the existing GitHub Pages portfolio into a professional robotics engineering portfolio that represents Mohammad Ibrahim Memon's current work in industrial manipulation, Physical AI, robot learning, digital twins, autonomous systems, and explainable multi-robot research.

The site must work for three primary audiences:

1. Robotics and autonomous-systems recruiters.
2. Research supervisors and academic collaborators.
3. Robotics engineers who want enough technical depth to understand the systems and contributions.

The result should feel modern, technically credible, restrained, and easy to maintain. It must not retain the current cyberpunk or hacker-template visual identity.

## 2. Core Positioning

Primary identity:

**Mohammad Ibrahim Memon**
**Robotics Engineer**

Focus areas:

- Industrial Manipulation
- Physical AI
- Robot Learning
- Autonomous Systems
- Digital Twins
- Explainable Multi-Robot Systems

Suggested short introduction:

> I build robotic systems from simulation to deployment, combining ROS 2, NVIDIA Isaac, perception, motion planning, robot learning, and explainable autonomy.

This copy can be refined later without changing the information architecture.

## 3. Visual Direction

### 3.1 Theme system

The portfolio supports both light and dark themes.

Behavior:

1. On first visit, use the visitor's `prefers-color-scheme` setting.
2. Provide a compact light/dark theme control in the navigation.
3. Store a manual visitor choice in local storage.
4. Reuse the same design tokens and visual hierarchy in both themes.
5. Avoid visible flashes of the wrong theme during page load.

### 3.2 Color system

The identity uses teal and green as restrained accents.

Light theme:

- Warm off-white page background.
- Near-black primary text.
- Graphite secondary text.
- White or soft-gray surfaces.
- Deep teal as primary interactive accent.
- Controlled green for results, highlights, and secondary technical accents.

Dark theme:

- Deep graphite page background.
- Soft-white primary text.
- Cool-gray secondary text.
- Slightly lighter graphite surfaces.
- Teal as primary interactive accent.
- Green as secondary highlight accent.

Rules:

- No neon glow.
- No cyberpunk visual effects.
- No broad use of gradients.
- A subtle teal-to-green gradient may appear in one or two identity details such as a hero rule, selected project edge, or major CTA treatment.
- Accessibility contrast must remain adequate in both modes.

### 3.3 Typography and visual language

- Use clean contemporary sans-serif typography for body and headings.
- Use monospace sparingly for technical metadata, project identifiers, code, and system labels.
- Use generous whitespace.
- Use real project imagery, simulator footage, diagrams, plots, technical metrics, and videos as the visual language.
- Avoid fake terminals, glitch text, hexadecimal decorations, loading screens, particle backgrounds, and decorative engineering graphics without information value.

## 4. Global Navigation

Desktop navigation:

- Mohammad Memon / compact identity mark
- Work
- Research
- Experience
- About
- Resume
- Theme control

Mobile navigation:

- Compact name/mark
- Menu control
- Theme control remains reachable with one interaction

Navigation should become slightly more compact after scrolling, but motion must remain subtle.

## 5. Homepage Information Architecture

### 5.1 Hero

Purpose: establish professional identity immediately.

Content:

- Name
- Robotics Engineer title
- Focus areas
- Two-sentence introduction
- Primary CTA: View Projects
- Secondary CTA: Download CV
- GitHub link
- LinkedIn link
- Professional photo or selected robotics visual

The hero should not contain decorative terminal UI or animated jargon.

### 5.2 Credibility strip

Compact factual row beneath the hero.

Initial content:

- M.Sc. Autonomous Systems, H-BRS
- Robotics R&D / industrial robotics experience
- ICAPS 2026 PlanRob
- ROS 2 · Isaac Sim · Isaac Lab · LeRobot

This section should communicate credibility in seconds and remain concise.

### 5.3 Selected Engineering Work

Flagship projects get editorial hierarchy rather than identical cards.

Recommended order:

1. SIMPLR, Simulation Multipurpose Lab Robot
2. Explainable Multi-Robot Task Allocation / R&D
3. Industrial Manipulation / Digital Twin work at INVITE
4. Intrinsic AI for Industry Challenge
5. Robothon 2025

Secondary and older work appears in a later compact project grid.

Each flagship preview can contain:

- Project number, for example `01 / SIMPLR`
- Project category
- Title
- One concise technical summary
- Core technology tags
- One or two evidence-based metrics where available
- High-quality project visual or video poster
- Case Study CTA

Example technical metadata:

`ROBOT MANIPULATION · PHYSICAL AI · 2026`

### 5.4 Current Focus

Compact section highlighting active engineering/research directions:

- Physical AI
- Robot Learning
- Industrial Manipulation
- Digital Twins
- Explainable Multi-Robot Systems

### 5.5 Research and Publications

Highlight:

- ICAPS 2026 PlanRob publication
- Explainable MRTA research
- ILP-based fault diagnosis work
- Existing patent publication

This section must distinguish peer-reviewed/research output from project demos.

### 5.6 Experience

Professional experience timeline or clean stacked entries.

Priority order based on current relevance:

1. INVITE
2. Garrulus
3. Kelo Robotics
4. Unbox Robotics
5. DashDot Robotics

Each item should emphasize contribution and engineering scope, not duplicate the CV word-for-word.

### 5.7 Technical Capabilities

Remove percentage skill bars entirely.

Organize technologies by capability:

Robotics:
- ROS 2
- ROS
- MoveIt 2
- Gazebo
- Isaac Sim
- Isaac Lab

Robot Learning:
- LeRobot
- ACT
- Isaac Mimic
- VLA workflows where appropriate
- PyTorch

Perception:
- RGB-D
- OpenCV
- RealSense / ZED where applicable
- Sensor integration

Programming and Systems:
- Python
- C++
- C
- Linux
- Git
- CI

Research and Planning:
- ILP
- Prolog
- MRTA
- Planning
- Explainable AI

The site should show competency through projects and contributions rather than invented numeric proficiency scores.

### 5.8 Footer / Contact

Keep contact concise:

- Email
- GitHub
- LinkedIn
- CV
- Location if desired

No full contact form is required for the first rebuild unless there is an existing reason to retain one.

## 6. Project Architecture

Projects move from modal-heavy presentation to dedicated case-study pages.

Example routes:

- `/projects/simplr`
- `/projects/mrta`
- `/projects/invite-industrial-manipulation`
- `/projects/intrinsic-ai-challenge`
- `/projects/robothon-2025`

Each project page can support the following modules. Modules are optional and should render only when project data exists.

1. Project hero
2. Overview
3. Problem / motivation
4. System architecture
5. Hardware
6. Software stack
7. My contribution
8. Data or dataset details
9. Method / pipeline
10. Results and metrics
11. Technical challenges / lessons
12. Media gallery
13. Research/publication links
14. GitHub or external references when public
15. Related projects

This modular approach prevents empty placeholder sections.

## 7. Flagship Project Content Direction

### 7.1 SIMPLR

Position as a multipurpose laboratory manipulation platform, not a one-task pouring demo.

Core themes:

- UR5e
- Robotiq 2F-85
- Wrist RGB-D sensing
- ROS 2 Jazzy
- NVIDIA Isaac Sim
- Isaac Lab
- Isaac Mimic
- LeRobot
- Demonstration collection
- ACT / imitation learning
- Future VLA workflows
- Generic laboratory task expansion such as pouring, scooping, object transfer, and tool interaction

The case study should show the evolution from simulation/digital twin through demonstration data and learned policies.

### 7.2 Explainable MRTA / R&D

Core themes:

- Warehouse order/task allocation
- ROS 2
- Gazebo
- Grid/A* navigation
- Multiple allocation strategies
- ILP
- Prolog
- Explainability
- Evaluation and benchmarking
- Connection to ICAPS 2026 PlanRob work

The warehouse simulation is a strong visual anchor. The project should communicate the complete flow from incoming orders through allocation, path/execution modeling, logs, learning/explanation, and evaluation.

### 7.3 INVITE industrial manipulation

Core themes:

- Industrial robot digital twins
- UR10 / UR5e workcells where publicly shareable
- ROS 2
- MoveIt 2
- NVIDIA Isaac Sim
- RGB-D sensing
- Planning/execution bridges
- Data acquisition / imitation-learning experiments where public

Only public, non-confidential details and media should be published.

### 7.4 Intrinsic AI for Industry Challenge

Present the competition result and technical robot-learning work with evidence-based metrics.

Potential highlights already represented in project content include:

- Top 40 of 400 teams, if verified in the final content source
- 157 successful demonstrations
- LeRobot
- ACT training
- Cable/contact-rich manipulation

All final numbers must be checked against the latest CV/project source before publishing.

### 7.5 Robothon 2025

Keep the Top 5 international result prominent.

Core themes:

- Kinova Gen3
- ROS / MoveIt
- OpenCV
- Vision-guided manipulation
- Competition execution under time constraints

## 8. Media and YouTube

Do not bundle new project videos directly into the site for the first redesign.

The project content model must support YouTube URLs/IDs so videos can play inline on the portfolio without navigating away.

Suggested media item model:

```js
{
  type: 'youtube',
  youtubeId: '...',
  title: 'Warehouse MRTA simulation',
  caption: '...',
  poster: 'optional/local/image.webp'
}
```

Requirements:

- Use responsive 16:9 containers.
- Use native lazy loading or a lightweight click-to-load facade where practical.
- Do not autoplay.
- Provide descriptive titles.
- Allow multiple videos per project.
- Support project images/diagrams in the same media gallery abstraction.

The user will provide final YouTube links later.

## 9. Frontend Architecture

Recommended implementation: React + Vite, statically built for GitHub Pages.

Reasons:

- Component-based architecture.
- Straightforward GitHub Pages deployment.
- Easy light/dark theme state.
- Clean routing for project case studies.
- Structured data can drive project pages.
- Lower complexity than a framework requiring a server/runtime.

Initial structure:

```text
src/
├── components/
│   ├── navigation/
│   ├── hero/
│   ├── projects/
│   ├── research/
│   ├── experience/
│   ├── media/
│   ├── theme/
│   └── layout/
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── Research.jsx
│   ├── About.jsx
│   └── ProjectDetail.jsx
├── data/
│   ├── projects.js
│   ├── experience.js
│   ├── publications.js
│   └── capabilities.js
├── styles/
│   ├── tokens.css
│   ├── global.css
│   └── components/
└── assets/
    ├── images/
    └── diagrams/
```

Public static files include the current CV and any project media that should ship with the site.

## 10. Data Model

Project content should live outside page components.

Example shape:

```js
{
  slug: 'simplr',
  number: '01',
  title: 'SIMPLR',
  subtitle: 'Simulation Multipurpose Lab Robot',
  year: '2026',
  category: ['Robot Manipulation', 'Physical AI'],
  summary: '...',
  tech: ['ROS 2', 'Isaac Sim', 'Isaac Lab', 'LeRobot'],
  featured: true,
  metrics: [],
  heroMedia: {},
  sections: {},
  media: [],
  links: {}
}
```

Experience, publications, and capabilities should use similar centralized data modules.

## 11. Interaction Design

Allowed:

- Small card elevation or border response on hover.
- Subtle image scale/reveal.
- Smooth theme transition.
- Subtle section entrance transitions.
- Compact navbar transition on scroll.
- Small architecture/data-flow animation only if it remains readable without animation.

Avoid:

- Glitch effects.
- Strong parallax.
- Cursor gimmicks.
- Particle systems.
- Large background animations.
- Excessive glowing shadows.
- Scroll-jacking.

Respect `prefers-reduced-motion`.

## 12. Responsive Design

The site must be designed mobile-first and verified at common widths.

Requirements:

- Hero becomes single-column cleanly.
- Project imagery remains readable.
- Tags wrap cleanly.
- Case-study sections collapse to one column as needed.
- Navigation remains accessible.
- Videos maintain aspect ratio.
- Architecture diagrams use responsive containers and horizontal scrolling only when unavoidable.

## 13. Accessibility and Semantics

- Semantic headings in strict hierarchy.
- Accessible navigation landmarks.
- Keyboard-visible focus states.
- Descriptive alt text for meaningful project visuals.
- Decorative images use empty alt text.
- Adequate contrast in both themes.
- Theme toggle has accessible labeling.
- YouTube embeds have descriptive titles.

## 14. Performance

- Prefer optimized WebP/AVIF images when practical.
- Lazy-load below-the-fold images and video facades.
- Avoid shipping old CSS/JS libraries once migration is complete.
- Avoid Font Awesome when a small SVG icon set is sufficient.
- Keep JavaScript limited to functionality needed by the site.
- Measure the final build with Lighthouse or equivalent lightweight checks.

## 15. SEO and Metadata

Provide per-page metadata:

- Title
- Description
- Canonical URL
- Open Graph metadata
- Social image

Add structured data where useful for `Person`, projects/creative work, and publications without overengineering the first version.

## 16. Migration Strategy

Current repository state contains uncommitted work and must be preserved.

The redesign should:

1. Preserve the existing repository history.
2. Start from an isolated redesign branch/worktree for implementation.
3. Reuse verified content and media from the old site where still relevant.
4. Move reusable content into structured data.
5. Replace the old homepage and project template only when the new frontend is functional.
6. Remove obsolete CSS, JS, pages, and duplicate assets only after confirming they are no longer referenced.
7. Preserve `CNAME` and GitHub Pages behavior.
8. Keep the current CV available as a static download.

## 17. Initial Delivery Scope

The first complete visible redesign should include:

- New global visual system.
- Light and dark modes.
- New responsive navigation.
- Complete professional homepage.
- Project listing.
- Modular project-detail template.
- Initial flagship project records.
- Research section/page.
- Experience section/page or homepage section.
- About page.
- Resume/CV link.
- YouTube-ready project media support.
- Mobile responsiveness.
- Basic accessibility, SEO, and performance hygiene.

The first delivery does not require final copy, final project videos, or every older project. Those can be refined after the user evaluates the complete visual site.

## 18. Explicit Non-Goals for First Delivery

- CMS or backend.
- Authentication.
- Database.
- Contact-form backend.
- Blog platform rebuild.
- Complex 3D/WebGL hero.
- Heavy animation framework.
- Automatic ingestion from GitHub/LinkedIn.
- Final video URLs.
- Final polishing of every legacy project.

## 19. Success Criteria

The redesign is successful when:

1. A new visitor understands within seconds that Mohammad is a robotics engineer focused on manipulation, Physical AI, robot learning, autonomous systems, and research.
2. The strongest 2026 work appears before legacy projects.
3. Project pages communicate engineering problems, architecture, contribution, technology, and evidence/results.
4. Light and dark themes both look intentional and professional.
5. Adding a new project does not require editing multiple large HTML files.
6. YouTube videos can be added to project data without redesigning page markup.
7. The portfolio remains deployable as a static GitHub Pages site.
8. The user can iterate later with small Codex changes without reopening the site architecture.
