# Codex Astra 6 Master Prompt

Use the prompt below when opening this repository in Codex Astra 6.

## Recommended first prompt

```text
You are the implementation owner for my professional robotics portfolio redesign.

Start by reading the root AGENTS.md. Then read:
1. docs/superpowers/specs/2026-09-10-portfolio-redesign-design.md
2. docs/portfolio/CURRENT_PHASE.md
3. the implementation plan referenced by CURRENT_PHASE.md
4. docs/portfolio/README.md

Then inspect the repository, Git history, current git status, existing portfolio code, project data, assets, and the updated CV before making changes.

Important: the main working tree already contains uncommitted migration work. Preserve it. Do not reset it, clean it, overwrite it, or silently absorb it. Use an isolated Git worktree for the implementation. If your Superpowers skills are available, use the appropriate worktree, implementation, TDD, code review, debugging, and verification skills.

Execute the CURRENT_PHASE completely. Use the approved documents as constraints, but use your own strongest engineering and frontend design judgment for component architecture, typography, spacing, responsive behavior, accessibility, subtle micro interactions, performance, and code quality. I want a polished professional robotics engineering portfolio, not a literal template implementation.

Do not ask me to choose minor design details that the approved spec already leaves to engineering judgment. Make a strong decision, implement it, and explain it in the completion summary.

Do not invent facts, metrics, project outcomes, URLs, publications, or employer details. Verify professional facts from the updated CV and existing repository sources. Keep employer work appropriately public and high level.

Do not add cyberpunk styling, neon effects, fake terminals, skill percentage bars, particle backgrounds, excessive gradients, or unnecessary animation.

For Phase 2, do not build all project case study pages and do not invent YouTube URLs. Build the reusable foundation and full professional homepage described in the plan.

Work task by task. Test as you go. Make small meaningful commits in the isolated worktree. Before claiming completion, run the full relevant tests, production build, inspect the final diff, and visually review desktop and mobile layouts in both light and dark themes.

If the literal implementation plan conflicts with repository reality, choose the better engineering solution while preserving the approved product intent, and document the deviation.

At the end, give me:
1. What you built.
2. Screens or a clear visual review summary for desktop and mobile, if your environment supports it.
3. Test and build results.
4. Git branch/worktree and commit summary.
5. Any plan deviations and why.
6. Any factual or media placeholders that still need my input.
7. The exact command I should run to preview the site locally.

Begin now. Do not modify the original dirty working tree.
```

## Prompt after the first implementation

Use this only after you have opened the resulting website and want Codex to improve it.

```text
Read AGENTS.md and the current portfolio design documents again. Review the rendered website as a senior product designer and senior frontend engineer specializing in technical portfolios.

Do not redesign the product direction. Keep the professional robotics identity, light and dark themes, teal and green accents, and content hierarchy.

Audit the current implementation for:
- first impression within 5 seconds
- typography
- spacing and visual rhythm
- project hierarchy
- recruiter readability
- technical credibility
- responsive composition
- light and dark theme quality
- accessibility
- unnecessary visual noise
- weak or generic template patterns

Then make the highest value refinements directly. Prefer a few strong improvements over many decorative changes. Preserve factual content. Verify tests and production build again when finished.

Show me exactly what changed and why each change improves the portfolio.
```

## Prompt for a screenshot driven refinement

```text
I have reviewed the current rendered portfolio. Treat my screenshots and comments as visual QA feedback, not as a request to rebuild the architecture.

Read AGENTS.md first. Make the smallest clean changes that achieve my requested visual result. Preserve the theme system, content model, responsive behavior, accessibility, and existing component boundaries unless a boundary is clearly causing the problem.

After edits, verify both desktop and mobile and both light and dark modes. Run the relevant tests and production build before reporting completion.
```

## Prompt to move to Phase 3 later

Do not use this until Phase 2 has been reviewed and accepted.

```text
Phase 2 is accepted. Read AGENTS.md, the approved redesign spec, and all portfolio handoff documents.

Now begin Phase 3. The goal is to build the reusable technical case study system and make SIMPLR the first complete flagship case study.

Before coding, inspect the Phase 2 implementation and current project data. Create or update the Phase 3 design and implementation plan if one does not yet exist. Keep SIMPLR positioned as a Simulation Multipurpose Lab Robot for reusable laboratory manipulation, not only a pick and pour demo.

The case study architecture must support technical overview, problem, system architecture, hardware, software, data pipeline, demonstrations, robot learning, results, limitations, images, diagrams, plots, GitHub/publication links, and embedded YouTube videos supplied later by me.

Use the same quality, testing, review, and verification standards defined in AGENTS.md.
```
