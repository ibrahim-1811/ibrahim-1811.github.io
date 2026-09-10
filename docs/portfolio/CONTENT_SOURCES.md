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

## Project experience update (2026-09-10)

Project content now lives in `src/content/projects.js`; editing instructions are in `PROJECT_CONTENT_GUIDE.md`.

| Content | Evidence / decision |
| --- | --- |
| Intrinsic: 2,000 successful demonstrations | User-supplied (brief + direct edit), replaces the CV's 157. The downloadable CV PDF still says 157 until it is updated. |
| Intrinsic: top 40 of 400 **submissions**, 1,600 participants | User's direct edit of project data; CV says "400 teams". |
| Intrinsic: Gazebo, TCP position-control actions, simulated insertion | Previously deployed site (`main`, project modal). GR00T from the April draft data is omitted (not in CV or deployed site). |
| Outcome-Aware ILP title, status "Ongoing R&D", MRTA as domain | User brief and `docs/portfolio/README.md`. Former `mrta` entry merged, not duplicated. |
| ILP pipeline: orders, Prolog facts (`idle`, `closest`, `most_charged`), "ILP selected Robot N" | CV + frames of the project's own demo video `m3gBvXjOTYQ` ("EML Project demo 2025") and warehouse UI (`images/ILP_Project.jpg`). Outcome-aware learning labelled *in development*; single/multi-teacher ILP omitted (unverified). |
| SIMPLR scope and statuses | User brief + AGENTS.md. Only pick → pour → return is marked implemented (simulation); LeRobot/ACT/Isaac Mimic *ongoing*; other lab tasks and VLA *future*. MoveIt 2 omitted for SIMPLR (not confirmed). No SIMPLR contribution list yet (not supplied). |
| INVITE bullets | CV page 1, condensed; no workcell media. |
| Robothon: Munich; team ctrl_bot | Older CV (`cv_content.txt`); public title of video `FcK0cvRkM-Q`. |
| Supporting/archive projects | Older CV (AMR, cross-modal retrieval, task distribution), deployed-site descriptions (UR5, underwater vehicle, Box-it, home automation), April draft data (TurtleBot3 for fault diagnosis). |
| AMR | 2020 Gazebo/RViz screenshot + older CV (circuit layout, power system); navigation/exploration videos are March 2026 ROS 2 runs on a physical robot. Copy avoids claiming it is the same self-built robot. Year omitted (sources conflict). |
| Underwater vehicle | Deployed site said ROV (tethered); the video title says AUV. Neutral title, tether claim dropped. |
| YouTube IDs (9) | All from the previously deployed site; each verified to exist and be embeddable (oEmbed) on 2026-09-10. |
| Images | Real repository imagery, cropped only to remove YouTube/desktop UI chrome and converted to WebP: Kinova photo, AMR Gazebo/RViz, Garrulus KiCad renders and layout, task-distributor diagram, relay-board photo. |
