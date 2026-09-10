# AGENTS.md

## Repository purpose

This repository is Mohammad Ibrahim Memon's professional robotics engineering portfolio, deployed through GitHub Pages at `mohammadmemon.com`.

The portfolio is being rebuilt from a legacy static cyber themed site into a modern, professional, modular engineering portfolio.

The primary audience is:

1. Robotics and autonomous systems recruiters.
2. Research supervisors and academic collaborators.
3. Robotics engineers evaluating technical depth.

## Read before changing code

Before implementation, read these files in order:

1. `docs/superpowers/specs/2026-09-10-portfolio-redesign-design.md`
2. `docs/portfolio/CURRENT_PHASE.md`
3. The implementation plan referenced by `CURRENT_PHASE.md`
4. `docs/portfolio/README.md`
5. Relevant existing source files and Git history

Treat the approved redesign spec as the product source of truth. Treat the current phase plan as an implementation guide, not as a substitute for inspecting the actual repository.

## Professional positioning

The website should present Mohammad as a robotics engineer working across:

- Industrial robot manipulation
- Physical AI
- Robot learning
- Autonomous systems
- Digital twins
- Explainable multi robot systems
- ROS 2 based robotics software
- NVIDIA Isaac Sim and Isaac Lab workflows

The strongest current work should be visually prioritized:

1. SIMPLR, Simulation Multipurpose Lab Robot
2. Explainable Multi Robot Task Allocation R&D
3. Industrial manipulation and digital twin work at INVITE
4. Intrinsic AI for Industry Challenge
5. Robothon 2025

Older work remains valuable, but it should not compete visually with the strongest current work.

## SIMPLR positioning

SIMPLR means Simulation Multipurpose Lab Robot. It is a reusable laboratory manipulation platform, not a single pick, pour, return demo.

Current system direction includes:

- UR5e
- Robotiq 2F-85
- Wrist mounted RGB-D perception
- ROS 2 Jazzy
- NVIDIA Isaac Sim
- Isaac Lab
- Isaac Mimic
- LeRobot
- ACT and future VLA workflows
- Multiple laboratory manipulation tasks such as pouring, scooping, object transfer, and tool interaction

Do not reduce SIMPLR to one task.

## Visual rules

The website must feel professional, technical, restrained, and contemporary.

Required:

- Light and dark themes
- System theme detection on first visit
- Manual theme toggle
- Persist manual preference in local storage
- Teal as primary accent
- Green as restrained secondary or result accent
- Strong typography and whitespace
- Real robotics imagery, videos, diagrams, plots, and metrics
- Responsive layout
- Keyboard visible focus states
- Reduced motion support
- Accessible contrast

Avoid:

- Cyberpunk aesthetics
- Neon glow
- Glitch text
- Fake terminals
- Particle backgrounds
- Hex decoration
- Skill percentage bars
- Decorative engineering graphics with no information value
- Excessive gradients
- Excessive motion
- Template looking hero sections

Use monospace only for technical metadata, identifiers, and code related details.

## Content rules

Do not invent facts, results, metrics, publications, dates, employers, project outcomes, technologies, or links.

For current professional facts, prefer this order:

1. The updated CV in the working tree, currently named `Mohammad_Memon_CV_2026 (Copy).pdf`, or the normalized copy created from it.
2. Approved redesign documentation.
3. Existing project case study data in the repository.
4. Existing Git history and project assets.

If sources conflict, use the updated CV for employment and education facts, and flag ambiguous project details rather than guessing.

Employer confidential work must remain high level unless the repository already contains material clearly intended for public portfolio use.

## Video strategy

Do not bundle local portfolio videos as the primary delivery method.

Project case studies should support YouTube embeds that play inside the website. YouTube URLs will be added later by the user.

Build reusable media components and data fields, but do not invent or add final video URLs unless they already exist in approved public project data.

## Architecture rules

The redesign should be modular and data driven.

Prefer:

- Small React components with one clear responsibility
- Centralized content modules for profile, projects, research, experience, and capabilities
- Reusable project and media primitives
- CSS custom properties for design tokens
- Semantic HTML
- Tests for content contracts, theme behavior, critical rendering, and navigation

Avoid rebuilding another multi thousand line `index.html`.

Do not add a backend, CMS, database, WebGL hero, animation framework, or automatic external profile ingestion unless a later approved phase explicitly requires it.

## Engineering workflow

Use available development skills and repository tools intelligently. If Superpowers skills are available, prefer them for planning, isolated worktrees, TDD, debugging, code review, and verification.

For implementation work:

1. Inspect the repository and `git status` first.
2. Preserve existing uncommitted user work.
3. Use an isolated Git worktree for architectural implementation.
4. Implement the current approved phase only.
5. Use tests where behavior can be tested.
6. Run targeted tests during development.
7. Run the full relevant verification suite before claiming completion.
8. Build the production site before completion.
9. Review the rendered result at desktop and mobile widths.
10. Keep commits small and meaningful.

Do not silently overwrite the existing uncommitted migration work in the main working tree.

## Autonomous judgment

Use your own engineering and design judgment where the specification intentionally leaves room for implementation quality.

You may improve:

- Component boundaries
- Typography choices
- Spacing
- Responsive layout
- Subtle micro interactions
- Accessibility implementation
- Performance
- SEO
- Visual hierarchy
- Code quality

Do not change the approved professional positioning, theme concept, core project priority, factual content, or phase scope without a concrete reason.

If implementation reality suggests a better technical approach than a literal plan step, use the better approach and record the deviation in your completion summary.

## Completion standard

A phase is complete only when:

- Required behavior is implemented.
- Relevant tests pass.
- `npm run build` succeeds when the React/Vite foundation exists.
- There are no obvious console errors.
- Light and dark themes both work.
- Responsive layouts are checked.
- Keyboard focus is usable.
- No known factual placeholders are presented as real claims.
- The final Git diff is reviewed.

Never claim completion based only on code generation.
