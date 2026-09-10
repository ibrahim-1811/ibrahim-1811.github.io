# Project content guide

Everything shown in the **Selected Engineering Work** section and in every project dialog comes
from one file:

```text
src/content/projects.js
```

You never need to touch a component to add, edit, reorder or illustrate a project. Save the
file and the dev server (`npm run dev`) updates immediately.

After editing, run the checks. They catch broken image paths, bad YouTube URLs, unknown status
keys and duplicate slugs:

```bash
npm run test:run   # content + component tests
npm run build      # production build
```

---

## How the file is organized

`projects.js` exports two things:

- `projectSection` — the section heading, description and the four tier headings.
- `projects` — an array of project objects.

Each project belongs to a **tier**, which decides where and how prominently it appears:

| `tier`       | Where it appears                                     | Card style                                 |
| ------------ | ---------------------------------------------------- | ------------------------------------------ |
| `flagship`   | First row, two large cards                           | Large image or diagram, big title, 6 tags  |
| `secondary`  | Second row, three medium cards                       | Image or diagram, 4 tags                   |
| `supporting` | Third row, four compact text cards                   | No image, 3 tags                           |
| `archive`    | "Additional engineering work" list at the bottom      | One compact row                            |

Every project, including archive rows, opens the same project dialog.

## The project fields

Only `slug`, `tier`, `title`, `summary`, `category` and `technologies` are required. **Every
other field is optional: leave it out and its dialog section simply does not appear.** No empty
headings are ever rendered.

| Field          | Shown on                  | What it is                                                                             |
| -------------- | ------------------------- | -------------------------------------------------------------------------------------- |
| `slug`         | URL                       | Unique ID, lowercase with hyphens. Used in `?project=<slug>` links. Do not change it once shared. |
| `tier`         | —                         | `'flagship'`, `'secondary'`, `'supporting'` or `'archive'`.                            |
| `title`        | Dialog                    | Full project title.                                                                    |
| `shortTitle`   | Card, dialog top bar      | Shorter name for cards. Falls back to `title`.                                         |
| `subtitle`     | Card, dialog              | One line under the title.                                                              |
| `category`     | Card (first two), dialog  | List of labels, e.g. `['Physical AI', 'Robot learning']`.                               |
| `year`         | Card, dialog facts        | Text, e.g. `'2026'`. Leave out if unsure.                                              |
| `status`       | Card, dialog facts        | Free text, e.g. `'Ongoing R&D'`. Add `current: true` to show it in teal.               |
| `context`, `role`, `organization`, `period`, `location` | Dialog facts panel | Short facts. Each appears only when present.                |
| `summary`      | Card                      | 1–2 sentences, **max 200 characters** (a test enforces this).                          |
| `description`  | Dialog lead paragraph     | The technical overview. Falls back to `summary`.                                       |
| `problem`      | Dialog "Problem"          | Paragraph.                                                                             |
| `system`       | Dialog "System", card image fallback | Architecture diagram — see below.                                          |
| `scope`        | Dialog                    | Status list, e.g. SIMPLR's laboratory tasks — see below.                               |
| `contribution` | Dialog "My contribution"  | List of sentences.                                                                     |
| `results`      | Dialog "Results"          | List of sentences.                                                                     |
| `metrics`      | Card (first one), dialog strip | List of `{ value, label }`.                                                       |
| `hardware`, `software` | Dialog side panel | Lists. If both are missing the panel shows `technologies` instead.                     |
| `technologies` | Card tags                 | Ordered list; the card shows the first 6 / 4 / 3 by tier, so put the most important first. |
| `research`     | Dialog "Research connection" | `{ type, title, authors, venue, location, year, href }`.                             |
| `direction`    | Dialog "Direction"        | Where the work is going. Say clearly what is not done yet.                            |
| `note`         | Dialog footer note        | Small print, e.g. confidentiality.                                                     |
| `media`        | Card image, dialog        | Videos and images — see below.                                                         |
| `links`        | Dialog                    | `{ github, paper, website, caseStudy }`.                                               |

### Status keys (for `system.parts` and `scope.items`)

Use these keys so visitors can tell finished work from work in progress:

| Key              | Label shown        | Colour |
| ---------------- | ------------------ | ------ |
| `implemented`    | Implemented        | green  |
| `evaluated`      | Evaluated          | green  |
| `experimental`   | Experimental       | teal   |
| `ongoing`        | Ongoing            | teal   |
| `in-development` | In development     | teal   |
| `planned`        | Planned            | dashed |
| `future`         | Future direction   | dashed |

### The `system` diagram

```js
system: {
  layout: 'flow',            // 'flow' = numbered pipeline, 'stack' = layered platform (top to bottom)
  title: 'Allocation and learning pipeline',
  parts: [
    { name: 'Orders', detail: 'Online warehouse orders', status: 'implemented' },
    { name: 'Outcome-aware ILP', detail: 'Learning from decision outcomes', status: 'in-development' },
  ],
},
```

`status` is optional per part. When a project has no image or video yet, a compact copy of this
diagram becomes the card image and the full diagram leads the dialog.

### The `scope` list

```js
scope: {
  title: 'Laboratory task scope',
  items: [
    { name: 'Pick → pour → return', detail: 'First development workflow', status: 'implemented' },
    { name: 'Powder scooping', status: 'future' },
  ],
},
```

---

## HOW TO ADD A PROJECT

1. Open `src/content/projects.js`.
2. Copy an existing project object of the same tier and paste it where it should appear.
3. Give it a new, unique `slug` (lowercase, hyphens only).
4. Fill in the fields you have; delete the ones you do not.
5. Run `npm run test:run`.

Minimal example (a supporting project with one video):

```js
{
  slug: 'my-new-project',
  tier: 'supporting',
  title: 'My New Robotics Project',
  shortTitle: 'My New Project',
  subtitle: 'One-line description',
  category: ['Manipulation', 'Robot learning'],
  year: '2026',
  summary: 'One or two sentences for the card, at most 200 characters.',
  description: 'The longer technical overview shown at the top of the dialog.',
  contribution: ['What I personally built.', 'What I evaluated.'],
  technologies: ['ROS 2', 'MoveIt 2', 'Python'],
  media: [
    {
      type: 'youtube',
      url: 'https://youtu.be/VIDEO_ID',
      title: 'Grasping demonstration',
      caption: 'What the viewer sees in the video.',
      role: 'hero',
    },
  ],
  links: {},
},
```

## HOW TO EDIT A PROJECT

Find the project by its `slug` in `src/content/projects.js` and change the text. To remove a
dialog section, delete its field (or set it to an empty list). To add a GitHub link:

```js
links: { github: 'https://github.com/ibrahim-1811/repository-name' },
```

When a dedicated case-study page exists, add `caseStudy: '/projects/<slug>'` to `links` and a
**Full case study** button appears in the dialog automatically. Do not add it before the page
exists (a test guards this).

## HOW TO CHANGE A METRIC

Metrics are `{ value, label }` pairs. **The first metric is the one shown on the homepage card**;
all of them appear in the dialog.

```js
metrics: [
  { value: 'Top 40 / 400', label: 'Submissions' },       // shown on the card
  { value: '2,000', label: 'Successful demonstrations' },
],
```

Change `value` or `label`, or reorder the list to change which metric the card shows. Only use a
`+` (for example `2,000+`) if the number really is a lower bound. If you also mention the number in
`summary`, `contribution` or `results`, update it there too.

## HOW TO ADD A YOUTUBE VIDEO

Add an entry to the project's `media` list. Paste the normal share or watch URL — any of these
work, and the ID is extracted safely:

```text
https://youtu.be/VIDEO_ID
https://www.youtube.com/watch?v=VIDEO_ID
https://www.youtube.com/watch?v=VIDEO_ID&t=42s     (starts at 0:42)
https://www.youtube.com/shorts/VIDEO_ID
VIDEO_ID
```

Example for SIMPLR:

```js
media: [
  {
    type: 'youtube',
    url: 'https://youtu.be/VIDEO_ID',
    title: 'SIMPLR manipulation demonstration',      // required: names the player for screen readers
    caption: 'Pick, pour and return workflow in simulation',
    role: 'hero',                                     // the big video at the top of the dialog
  },
  {
    type: 'youtube',
    url: 'https://www.youtube.com/watch?v=VIDEO_ID',
    title: 'Robot learning rollout',
    role: 'experiment',                               // appears in the dialog's Media gallery
  },
],
```

Optional video fields:

| Field         | Purpose                                                                          |
| ------------- | -------------------------------------------------------------------------------- |
| `poster`      | Local image shown before Play (e.g. `'/images/projects/simplr-poster.webp'`). Without it, YouTube's own thumbnail is used. |
| `posterAlt`   | Description of the poster; needed when the poster also becomes the card image.   |
| `posterPosition` | Crop focus for the poster, e.g. `'left center'`.                             |
| `start`       | Start time in seconds (overrides `t=` in the URL).                               |
| `aspectRatio` | e.g. `'9 / 16'` for a vertical video. Default is 16:9.                           |

How playback behaves (no configuration needed): nothing from YouTube loads with the homepage;
the dialog shows a poster and a Play button; the `youtube-nocookie.com` player is created only
when the visitor presses Play; only one video plays at a time; a small "YouTube" link lets
visitors open the video on YouTube if they choose. Unlisted videos work normally, and nothing on
the site says a video is unlisted.

## HOW TO ADD AN IMAGE

1. Put the file in `public/images/projects/` (WebP preferred, about 1600 px wide or less).
2. Add an entry to the project's `media` list. The path starts with `/images/...` — without
   `public`.

```js
{
  type: 'image',
  src: '/images/projects/simplr-workcell.webp',
  alt: 'UR5e with a Robotiq 2F-85 gripper above laboratory glassware',   // required
  width: 1600,                                                          // real pixel size
  height: 900,
  caption: 'SIMPLR workcell in Isaac Sim.',
  role: 'simulation',
},
```

`alt`, `width` and `height` are required (tests check them and that the file exists). Add
`position: '50% 80%'` to change where a cropped card image focuses.

### Where media appears (the `role` field)

| `role`                                                   | Placement in the dialog                   |
| -------------------------------------------------------- | ----------------------------------------- |
| `hero`                                                   | Large, directly under the title           |
| `architecture`                                           | Full-width figure inside **System**       |
| `result`                                                 | Full-width figure inside **Results**      |
| `demo`, `simulation`, `experiment`, `dataset`, `explanation` | **Media** gallery at the end, labelled by role |

If no item is marked `hero`, the first video (or else the first image) becomes the hero.

**Card image:** the hero image, or the hero video's `poster`, or the first image. With none of
these, the card shows the compact `system` diagram.

## HOW TO CHANGE PROJECT ORDER

- **Within a tier:** move the project object up or down in the `projects` array.
- **Between tiers:** change its `tier` value.

Numbers (01, 02, …) follow the displayed order automatically, so never type them by hand.
Archive entries are unnumbered. If you change the flagship order, update the expected order in
`src/content/content.test.js` and `src/App.test.jsx` — those tests intentionally lock in the
approved hierarchy.

---

## Related content files

| File                         | Content                                                                |
| ---------------------------- | ---------------------------------------------------------------------- |
| `src/content/research.js`    | Research and publications list. `project: '<slug>'` adds a "View project" button that opens that dialog. |
| `src/content/experience.js`  | Experience timeline.                                                    |
| `src/content/profile.js`     | Name, intro, contact links, credibility strip.                         |
| `src/content/capabilities.js`| Technical capability groups.                                           |
| `docs/portfolio/CONTENT_SOURCES.md` | Where every factual claim comes from. Update it when you add facts. |

## Rules of thumb

- Do not publish results, metrics, hardware or dates you cannot back up. Leave the field out.
- Mark unfinished work with `in-development`, `planned` or `future` instead of describing it as done.
- Keep employer work high level; never publish internal infrastructure, data or assets.
- Keep `summary` short. The dialog is the place for detail.
