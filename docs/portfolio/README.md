# Portfolio Redesign Handoff

This folder is the operational handoff for the professional portfolio rebuild.

## Source documents

The redesign has already completed its product design stage.

Read:

- `../superpowers/specs/2026-09-10-portfolio-redesign-design.md`
- `CURRENT_PHASE.md`
- The implementation plan referenced by `CURRENT_PHASE.md`
- Root `AGENTS.md`

## Goal

Transform the old static cyber themed portfolio into a professional robotics engineering website that communicates technical depth quickly and clearly.

The site should help a visitor answer these questions within a short visit:

- Who is Mohammad Ibrahim Memon?
- What kind of robotics engineer is he?
- What is he currently building?
- What are his strongest projects?
- What did he personally contribute?
- What tools and systems can he work with?
- What research output and competition results support his claims?
- Where can I inspect a project, GitHub repository, publication, video, or CV?

## Approved design direction

The approved design is:

- Professional and editorial rather than flashy
- User selectable light and dark themes
- Teal and green accent system
- Strong project hierarchy
- Large flagship work sections
- Real technical evidence
- Dedicated case studies in later phases
- YouTube videos embedded directly in project pages
- No cyberpunk visual language

## Project hierarchy

Flagship work:

1. SIMPLR
2. Outcome-Aware ILP (explainable multi-robot task allocation R&D)
3. INVITE industrial manipulation and digital twins
4. Intrinsic AI for Industry Challenge
5. Robothon 2025

Supporting work can include:

- ILP fault detection and diagnosis
- Cross modal action retrieval
- Multi robot task distribution
- Autonomous mobile robot
- Garrulus electronics and PCB work
- Other earlier robotics and embedded projects that remain relevant

## Important R&D project

Current research project title:

`Outcome-Aware ILP for Explainable Grid-Aware Task Allocation in Multi-Robot Warehouse Systems`

The portfolio should eventually show the actual warehouse simulation, architecture, allocation pipeline, explainability layer, experimental comparison, and research publication connection rather than describing it as a generic multi robot project.

## Editing project content

All project cards and dialogs are driven by `src/content/projects.js`. See `PROJECT_CONTENT_GUIDE.md` for adding projects, metrics, YouTube videos and images.

## Media

The user will provide YouTube links later.

The site should be prepared for:

- Featured YouTube video
- Multiple videos per project
- Poster or thumbnail image
- Figure captions
- Architecture diagrams
- Result plots
- Project image galleries

Videos should play on the portfolio page through embedded YouTube players.

## Phase model

The redesign is intentionally iterative.

- Phase 1: Product and visual design, approved
- Phase 2: Shared React/Vite foundation and complete professional homepage
- Phase 3: Dedicated technical case study system, starting with SIMPLR
- Phase 4: Remaining flagship case studies and research pages
- Phase 5: Media integration and YouTube content
- Phase 6: Supporting projects and archive cleanup
- Phase 7: Final polish, SEO, performance, accessibility, deployment validation

Do not jump ahead simply because a later feature is interesting. A later phase can refine earlier work after the full website is visible.

## Working style

Build a strong complete version first. The user plans to inspect the rendered website and then make smaller design and copy changes with Codex.

This means the implementation should be easy to tune. Prefer centralized design tokens and centralized content data over hardcoded values spread across components.
