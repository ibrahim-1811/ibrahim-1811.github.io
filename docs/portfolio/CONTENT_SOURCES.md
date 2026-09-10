# Phase 2 content provenance

Professional source of truth: `Mohammad_Memon_CV_2026 (Copy).pdf`, copied byte-for-byte to `public/Mohammad_Memon_CV_2026.pdf`. The old `cv_content.txt` is stale and is not consumed by the frontend.

| Content | Evidence / decision |
| --- | --- |
| Identity, contact, INVITE role, all experience periods | Updated CV page 1 |
| M.Sc. candidate, expected June 2027; B.Tech. | Updated CV pages 1–2; no claim that the M.Sc. is completed |
| PlanRob title, venue, year | Updated CV page 2; no publication URL supplied |
| Patent title and publication number | Updated CV page 2; identified as a patent publication, not a granted patent |
| Intrinsic Top 40 / 400, 157 demos, 100,000 training steps | Updated CV page 2, corroborated for demos/training by legacy project data |
| Robothon Top 5, tasks, technologies | Updated CV page 2 |
| MRTA scope and benchmarks | Updated CV page 2 and approved design spec; no invented performance gains |
| SIMPLR expansion, hardware, laboratory task scope | Approved design spec §7.1 and AGENTS.md; presented as platform direction, not a completed result |
| 20 Hz demonstration rate | Omitted: appears in plan but not CV or legacy project sources |
| Fault-diagnosis project date | Omitted: plan says 2026, legacy project data says 2024, latest CV gives no year |
| Employer content | High-level public CV scope only; no workcell photographs or confidential technical artifacts |
| CV portrait | Exact JPEG extracted with `pdfimages -j`; 897 × 1280; no retouching |
| MRTA interface image | `images/ILP_Project.jpg`, explicitly mapped to task allocation in `assets/js/projects-data.js`; caption says existing research prototype; resized to 1680 × 920 WebP for delivery |
| Robothon image | `images/thumbs/multi_robot/kinova_arm.png`; associated with Robothon in Git commit `e8add90:index.html` |
| GitHub / LinkedIn | Updated CV handles and baseline homepage links |
| Capabilities | Updated CV and approved positioning; unsupported RealSense/ZED specifics omitted |

Future case-study paths are metadata, not live navigation. Media arrays are ready for images and the planned Phase 3 YouTube type; no video IDs were added. Missing SIMPLR, INVITE and Intrinsic visuals do not appear as pretend screenshots. A semantic system summary supplies useful engineering information where supported by the approved sources.
