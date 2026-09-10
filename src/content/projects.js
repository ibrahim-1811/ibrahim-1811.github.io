/**
 * PROJECT CONTENT — the one file to edit for homepage project cards and project dialogs.
 * Step-by-step guide: docs/portfolio/PROJECT_CONTENT_GUIDE.md
 * Source trail for every claim: docs/portfolio/CONTENT_SOURCES.md
 *
 * ORDER    Projects are shown by tier (flagship → secondary → supporting → archive) and,
 *          inside a tier, in the order they appear in this array. Numbers (01, 02 …) are
 *          assigned automatically; archive entries are unnumbered.
 * CARDS    A card shows: summary, the first metric, status, and the first few technologies.
 *          Its image is the hero image, else the hero video's poster, else the first image,
 *          else a diagram drawn from `system`.
 * DIALOG   Every other field feeds the project dialog. Leave an optional field out (or empty)
 *          and its section is not rendered.
 *
 * Allowed values (src/features/projects/vocabulary.js):
 *   tier:        'flagship' | 'secondary' | 'supporting' | 'archive'
 *   status keys: 'implemented' | 'evaluated' | 'experimental' | 'ongoing' |
 *                'in-development' | 'planned' | 'future'
 *   media type:  'youtube' | 'image'
 *   media role:  'hero' | 'demo' | 'simulation' | 'architecture' | 'experiment' |
 *                'result' | 'dataset' | 'explanation'
 */

export const projectSection = {
  eyebrow: '01 / Engineering',
  title: 'Selected Engineering Work',
  description:
    'Two current directions lead: Physical AI for laboratory and industrial manipulation, and explainable multi-robot systems. Open any project for its technical overview.',
  tiers: {
    flagship: { title: 'Current flagship work' },
    secondary: { title: 'Industrial & competition work' },
    supporting: { title: 'Supporting projects' },
    archive: {
      title: 'Additional engineering work',
      description: 'Earlier student and engineering projects.',
    },
  },
};

export const projects = [
  /* ───────────────────────────── FLAGSHIP ───────────────────────────── */
  {
    slug: 'simplr',
    tier: 'flagship',
    title: 'SIMPLR',
    shortTitle: 'SIMPLR',
    subtitle: 'Simulation Multipurpose Lab Robot',
    category: ['Physical AI', 'Laboratory manipulation', 'Robot learning'],
    year: '2026',
    status: 'Current development',
    current: true,
    summary:
      'A reusable laboratory manipulation platform connecting a UR5e workcell, NVIDIA Isaac simulation and demonstration-driven robot learning — built for many lab tasks, not a single demo.',
    description:
      'SIMPLR is a simulation-first platform for laboratory manipulation. Instead of scripting one task, it shares one robot, perception, simulation and learning pipeline across many laboratory workflows. The pick → pour → return workflow is the first task used to develop that pipeline.',
    problem:
      'Laboratory work is made of many small, varied manipulation tasks: handling containers, pouring liquids, transferring powders, operating tools. Scripting each task separately does not scale. A useful lab robot needs a shared foundation — a faithful simulation of the workcell, wrist-mounted perception and a data pipeline that turns demonstrations into reusable policies.',
    system: {
      layout: 'stack',
      title: 'Platform architecture',
      parts: [
        {
          name: 'Research direction',
          detail: 'Vision-language-action (VLA) policies',
          status: 'future',
        },
        {
          name: 'Robot learning',
          detail: 'LeRobot datasets · ACT imitation learning',
          status: 'ongoing',
        },
        {
          name: 'Demonstrations',
          detail: 'Demonstration collection · Isaac Lab · Isaac Mimic',
          status: 'ongoing',
        },
        {
          name: 'Simulation & control',
          detail: 'NVIDIA Isaac Sim · ROS 2 Jazzy',
          status: 'implemented',
        },
        { name: 'Robot platform', detail: 'UR5e · Robotiq 2F-85 · wrist-mounted RGB-D camera' },
      ],
    },
    scope: {
      title: 'Laboratory task scope',
      items: [
        {
          name: 'Pick → pour → return',
          detail: 'First development workflow, running in simulation',
          status: 'implemented',
        },
        { name: 'Powder scooping', status: 'future' },
        { name: 'Material transfer', status: 'future' },
        { name: 'Container handling', status: 'future' },
        { name: 'Tool interaction', status: 'future' },
      ],
    },
    hardware: ['UR5e', 'Robotiq 2F-85', 'Wrist-mounted RGB-D camera'],
    software: ['ROS 2 Jazzy', 'NVIDIA Isaac Sim', 'Isaac Lab', 'Isaac Mimic', 'LeRobot', 'ACT'],
    technologies: ['UR5e', 'ROS 2', 'Isaac Sim', 'Isaac Lab', 'LeRobot', 'ACT'],
    direction:
      'Grow the platform from its first workflow into a family of laboratory tasks, and use the collected demonstrations to study vision-language-action (VLA) policies. VLA work is a research direction, not a deployed capability.',
    media: [],
    links: {},
  },
  {
    slug: 'outcome-aware-ilp',
    tier: 'flagship',
    title:
      'Outcome-Aware ILP for Explainable Grid-Aware Task Allocation in Multi-Robot Warehouse Systems',
    shortTitle: 'Outcome-Aware ILP',
    subtitle: 'Explainable, grid-aware task allocation for multi-robot warehouses',
    category: ['Multi-robot systems', 'Explainable AI', 'Task allocation', 'Research'],
    year: '2026',
    status: 'Ongoing R&D',
    current: true,
    context: 'R&D project',
    summary:
      'Learning human-readable allocation rules for warehouse robot fleets — a ROS 2 warehouse system with grid-based A* costs, benchmarked allocation strategies and Inductive Logic Programming.',
    description:
      'Multi-robot task allocation (MRTA) is the domain; explainability is the goal. Warehouse orders are allocated online to a robot fleet using grid-based A* travel costs and symbolic robot and task state. Allocation strategies are benchmarked side by side, and Inductive Logic Programming (ILP) learns interpretable Prolog rules for allocation decisions. The current research makes this learning outcome-aware.',
    problem:
      'Warehouse fleets need allocation decisions that are efficient and that people can inspect. Optimization and learned allocators can perform well but rarely explain their choices; hand-written rules are transparent but brittle. This project studies whether interpretable allocation rules can be learned from the system’s own behavior — and, in the outcome-aware formulation, from the outcomes that allocation decisions produce.',
    system: {
      layout: 'flow',
      title: 'Allocation and learning pipeline',
      parts: [
        {
          name: 'Orders',
          detail: 'Online warehouse orders with shelf items and quantities',
          status: 'implemented',
        },
        {
          name: 'Robot & task state',
          detail: 'Symbolic world state: robot availability, battery and order progress',
          status: 'implemented',
        },
        {
          name: 'Grid / A* costs',
          detail: 'Grid-based A* path planning for travel-cost estimation',
          status: 'implemented',
        },
        {
          name: 'Allocation strategies',
          detail: 'Heuristic, auction-based, optimization and learning-based allocators',
          status: 'evaluated',
        },
        {
          name: 'Execution & outcomes',
          detail:
            'Simulated multi-robot warehouse execution, measured on task completion, travel, energy, congestion and scheduling',
          status: 'implemented',
        },
        {
          name: 'ILP rule learning',
          detail:
            'Interpretable scheduling policies as Prolog rules — published at PlanRob, ICAPS 2026',
          status: 'evaluated',
        },
        {
          name: 'Outcome-aware ILP',
          detail: 'Learning explainable allocation rules from the outcomes of allocation decisions',
          status: 'in-development',
        },
      ],
    },
    contribution: [
      'Developed an online multi-robot task-allocation framework for warehouse environments, combining grid-based A* path planning, scheduling and symbolic robot and task state modeling.',
      'Benchmarked heuristic, auction-based, optimization and learning-based allocation strategies on task completion, travel, energy, congestion and scheduling objectives.',
      'Developed interpretable scheduling policies with Inductive Logic Programming, leading to a publication at PlanRob, ICAPS 2026.',
      'Developing the outcome-aware ILP formulation as the current research step.',
    ],
    results: [
      'Interpretable ILP scheduling policies for online multi-robot task allocation, published at PlanRob, ICAPS 2026.',
    ],
    metrics: [{ value: 'ICAPS 2026', label: 'PlanRob publication' }],
    software: [
      'ROS 2',
      'Gazebo',
      'Python',
      'A* path planning',
      'Prolog',
      'Inductive Logic Programming',
    ],
    technologies: ['ROS 2', 'Gazebo', 'A*', 'ILP', 'Prolog', 'Python'],
    research: {
      type: 'Publication',
      title:
        'Learning Interpretable Scheduling Policies for Online Multi-Robot Task Allocation via Inductive Logic Programming',
      authors: 'M. I. Memon, U. Patil, I. Awaad, Y. M. Youssef',
      venue: 'PlanRob, ICAPS 2026',
      location: 'Dublin, Ireland',
      href: null,
    },
    direction:
      'The outcome-aware formulation connects learned allocation rules to the outcomes their decisions produce, while keeping every rule human-readable. It is in development; evaluation results will be added once available.',
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/m3gBvXjOTYQ',
        title: 'Explainable task allocation — system demonstration',
        caption: 'Demonstration of the explainable warehouse task-allocation system.',
        role: 'hero',
        poster: '/images/projects/mrta-control.webp',
        posterAlt:
          'Warehouse control interface showing four robots with battery level and status, an order form and active orders with progress',
        posterPosition: 'left center',
      },
    ],
    links: {},
  },

  /* ─────────────────────────── SECONDARY FLAGSHIP ─────────────────────────── */
  {
    slug: 'invite-industrial-manipulation',
    tier: 'secondary',
    title: 'Industrial Manipulation & Digital Twins',
    shortTitle: 'Industrial Manipulation & Digital Twins',
    subtitle: 'Robotics Intern · INVITE GmbH',
    category: ['Industrial robotics', 'Digital twins', 'Robot learning'],
    year: '2026',
    status: 'Current role',
    current: true,
    role: 'Robotics Intern',
    organization: 'INVITE GmbH',
    location: 'Leverkusen, Germany',
    period: '05/2026 – present',
    summary:
      'ROS 2, MoveIt 2 and NVIDIA Isaac Sim digital twins for UR10 and UR5e workcells — perception-aware manipulation, trajectory execution and demonstration data for robot learning.',
    description:
      'Industrial robot workcells where simulation, motion planning and real robot execution have to agree. The work spans digital twins, perception-aware manipulation workflows, the ROS 2 ↔ Isaac Sim control bridge and the pipeline that turns demonstrations into robot-learning datasets.',
    problem:
      'Industrial manipulation cells have to be developed and tested before and alongside the physical robot. That needs a digital twin that matches the real workcell — kinematics, grippers, cameras, collision geometry and timing — and a clean path from demonstrations to learned behavior.',
    system: {
      layout: 'stack',
      title: 'Workcell software stack',
      parts: [
        { name: 'Robot learning', detail: 'LeRobot · ACT · Isaac Mimic demonstration generation' },
        {
          name: 'Demonstration data',
          detail: 'Synchronized states, actions, RGB, depth, object poses · automated episode QA',
        },
        {
          name: 'Planning & execution',
          detail: 'MoveIt 2 · perception-aware motion planning · trajectory execution',
        },
        {
          name: 'Digital twin',
          detail: 'NVIDIA Isaac Sim · simulated RGB-D · TF · collision geometry',
        },
        { name: 'Workcells', detail: 'UR10 and UR5e with grippers and RGB-D cameras' },
      ],
    },
    contribution: [
      'Architected and integrated ROS 2, MoveIt 2 and NVIDIA Isaac Sim digital twins for UR10 and UR5e industrial workcells, including grippers, RGB-D cameras, TF, collision geometry, motion planning and simulated sensor pipelines.',
      'Developed autonomous pharmaceutical manipulation workflows for bottle grasping, transport, liquid pouring, capping and decapping, scooping and precision placement using perception-aware motion planning.',
      'Implemented a ROS 2–Isaac Sim control architecture integrating trajectory execution, joint-state feedback, simulation time, TF, RGB-D perception and synchronization between MoveIt 2 and the simulated robot.',
      'Built an end-to-end demonstration acquisition pipeline recording synchronized robot states, actions, RGB, depth, object poses, task phases and timestamps, with automated episode quality validation and LeRobot dataset conversion.',
      'Developed and evaluated imitation-learning workflows with LeRobot and ACT, and implemented an Isaac Mimic pipeline for scalable manipulation demonstration generation.',
      'Conducted a feasibility study for pharmaceutical handling with the Unitree G1 humanoid — bimanual manipulation, reachability, balance, collision clearance and flexible-bag handling — using an Isaac Sim digital twin and a physical mock-up.',
    ],
    hardware: ['UR10', 'UR5e', 'Grippers', 'RGB-D cameras', 'Unitree G1 (feasibility study)'],
    software: ['ROS 2', 'MoveIt 2', 'NVIDIA Isaac Sim', 'Isaac Mimic', 'LeRobot', 'ACT'],
    technologies: ['UR10', 'UR5e', 'ROS 2', 'MoveIt 2', 'Isaac Sim', 'LeRobot'],
    note: 'Employer work is summarized at a public, high level. No internal infrastructure, process data, datasets or assets are shown.',
    media: [],
    links: {},
  },
  {
    slug: 'intrinsic-ai-challenge',
    tier: 'secondary',
    title: 'Intrinsic AI for Industry Challenge',
    shortTitle: 'Intrinsic AI for Industry Challenge',
    subtitle: 'Contact-rich cable and connector manipulation',
    category: ['Robot learning', 'Manipulation', 'Competition'],
    year: '2026',
    summary:
      'An imitation-learning pipeline for cable handling and connector insertion: multi-camera perception, 2,000 successful demonstrations and an ACT policy trained with LeRobot.',
    description:
      'The challenge task was contact-rich cable and connector manipulation — deformable cables, tight connector alignment and small corrections during insertion. I built the perception and demonstration pipeline, validated the data and converted it to LeRobot format, and trained an ACT policy for learned manipulation and insertion. The entry ranked in the top 40 of 400 submissions.',
    problem:
      'Cables deform and connectors need precise alignment, so success depends on small corrections during contact. Scripted motion generalizes poorly across these variations, which makes the task a strong test of learning from demonstrations — and of the data quality behind them.',
    system: {
      layout: 'flow',
      title: 'Demonstration-to-policy pipeline',
      parts: [
        {
          name: 'Perception',
          detail: 'Multi-camera observations with YOLO-based object detection',
        },
        { name: 'State', detail: 'Robot state and task-state information' },
        { name: 'Demonstrations', detail: '2,000 successful demonstrations, validated' },
        { name: 'Dataset', detail: 'Converted to LeRobot format' },
        {
          name: 'Policy',
          detail: 'ACT trained for 100,000 steps with TCP position-control actions in simulation',
        },
        { name: 'Evaluation', detail: 'Challenge ranking: top 40 of 400 submissions' },
      ],
    },
    contribution: [
      'Built a multi-camera perception and demonstration pipeline using YOLO-based object detection, robot state and task-state information for manipulation and dataset validation.',
      'Collected and validated 2,000 successful demonstrations and converted the data to LeRobot format.',
      'Trained an ACT policy for 100,000 steps for learned manipulation and insertion.',
    ],
    results: [
      'Ranked in the top 40 of 400 submissions, from 1,600 participants.',
      '2,000 validated successful demonstrations in LeRobot format.',
      'ACT policy trained for 100,000 steps for connector insertion.',
    ],
    metrics: [
      { value: 'Top 40 / 400', label: 'Submissions' },
      { value: '2,000', label: 'Successful demonstrations' },
      { value: '100k', label: 'ACT training steps' },
      { value: '1,600', label: 'Participants' },
    ],
    software: ['ROS 2', 'Gazebo', 'YOLO', 'PyTorch', 'LeRobot', 'ACT'],
    technologies: ['LeRobot', 'ACT', 'PyTorch', 'YOLO', 'ROS 2'],
    media: [],
    links: {},
  },
  {
    slug: 'robothon-2025',
    tier: 'secondary',
    title: 'Robothon 2025 Grand Challenge',
    shortTitle: 'Robothon 2025 Grand Challenge',
    subtitle: 'Vision-guided manipulation with a Kinova Gen3',
    category: ['Manipulation', 'Computer vision', 'Competition'],
    year: '2025',
    location: 'Munich, Germany',
    summary:
      'Autonomous, vision-guided manipulation on a Kinova Gen3: task-state detection, button pressing, stylus drawing and magnetic maze solving under strict time limits.',
    description:
      'Robothon is an international competition in which a robot has to solve a manipulation task board autonomously under strict task and time constraints. The entry, built on a Kinova Gen3 with MoveIt and OpenCV, placed in the top 5.',
    problem:
      'Every sub-task has to run autonomously and within the time limit: detecting the task state, pressing buttons, grasping a stylus to draw a trajectory and solving a maze with a magnetic end-effector — with no manual correction.',
    system: {
      layout: 'flow',
      title: 'Manipulation pipeline',
      parts: [
        { name: 'Perception', detail: 'OpenCV task-state detection' },
        { name: 'Planning', detail: 'MoveIt motion planning for the Kinova Gen3' },
        { name: 'Manipulation', detail: 'Button pressing · stylus grasping · trajectory drawing' },
        {
          name: 'Closed-loop control',
          detail: 'Maze solving with a magnetic end-effector and continuous visual feedback',
        },
      ],
    },
    contribution: [
      'Built a vision-guided manipulation pipeline using MoveIt and OpenCV for task-state detection, button pressing, stylus grasping and trajectory drawing.',
      'Implemented a maze-solving routine using a magnetic end-effector with continuous visual feedback for path correction.',
      'Developed autonomous manipulation solutions under strict task and time constraints.',
    ],
    results: ['Placed in the top 5 of the international Robothon 2025 Grand Challenge.'],
    metrics: [{ value: 'Top 5', label: 'International result' }],
    hardware: ['Kinova Gen3', 'Magnetic end-effector'],
    software: ['ROS', 'MoveIt', 'OpenCV', 'Python', 'C++'],
    technologies: ['Kinova Gen3', 'MoveIt', 'OpenCV', 'ROS', 'C++'],
    media: [
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=FcK0cvRkM-Q',
        title: 'Robothon 2025 — Kinova Gen3 task-board run',
        caption: 'The Kinova Gen3 working through the Robothon task board.',
        role: 'hero',
      },
      {
        type: 'image',
        src: '/images/projects/robothon-kinova.webp',
        alt: 'Kinova Gen3 robot arm positioned over the Robothon manipulation task board',
        width: 438,
        height: 818,
        caption: 'Kinova Gen3 and the Robothon task board.',
        role: 'demo',
        position: '50% 90%',
      },
    ],
    links: {},
  },

  /* ─────────────────────────── SUPPORTING ─────────────────────────── */
  {
    slug: 'ilp-fault-diagnosis',
    tier: 'supporting',
    title: 'ILP-Based Fault Detection and Diagnosis for Mobile and Multi-Robot Systems',
    shortTitle: 'ILP Fault Detection & Diagnosis',
    subtitle: 'Interpretable fault diagnosis for ROS-based mobile robots',
    category: ['Explainable AI', 'Fault diagnosis', 'Research'],
    summary:
      'Interpretable fault detection for ROS mobile robots with Inductive Logic Programming — wheel slip, sensor noise, delay and communication faults as symbolic rules.',
    description:
      'Earlier research into interpretable robot reasoning. Faults in ROS-based mobile robots are modeled as symbolic rules learned with Inductive Logic Programming, so each diagnosis can be read and checked by an engineer. The approach was evaluated in simulation and real-robot experiments and extended to multi-robot scenarios.',
    problem:
      'Threshold checks and black-box classifiers can flag a fault but rarely explain it, which makes a diagnosis hard for engineers to verify or extend. Symbolic rules are readable — if they can be learned rather than hand-written.',
    contribution: [
      'Developed an interpretable fault detection and diagnosis framework for ROS-based mobile robots using Inductive Logic Programming.',
      'Modeled faults including wheel slip, sensor noise, delay and communication inconsistencies as symbolic rules.',
      'Evaluated the approach in simulation and real-robot experiments.',
      'Extended it to multi-robot scenarios to study fault propagation and coordination robustness.',
    ],
    hardware: ['TurtleBot3'],
    software: ['ROS', 'Python', 'Prolog', 'Inductive Logic Programming'],
    technologies: ['ILP', 'Prolog', 'ROS', 'Python'],
    note: 'An earlier, separate ILP project: it applies ILP to fault diagnosis, while Outcome-Aware ILP applies it to multi-robot task allocation.',
    media: [],
    links: {},
  },
  {
    slug: 'autonomous-mobile-robot',
    tier: 'supporting',
    title: 'Autonomous Mobile Robot (AMR)',
    shortTitle: 'Autonomous Mobile Robot',
    subtitle: 'From circuit design to autonomous navigation',
    category: ['Mobile robotics', 'Navigation', 'Hardware'],
    summary:
      'An AMR built end to end — circuit layout and power system through ROS navigation: LiDAR SLAM, A* planning, potential-field avoidance and frontier exploration.',
    description:
      'An autonomous mobile robot designed end to end: electronics, power system and the full ROS software stack. The stack was built and tested in simulation first, then deployed on the physical robot for navigation to coordinate goals and autonomous exploration of unknown spaces.',
    system: {
      layout: 'flow',
      title: 'Navigation stack',
      parts: [
        { name: 'Mapping', detail: 'LiDAR-based SLAM' },
        { name: 'Global planning', detail: 'A* routes to assigned coordinate goals' },
        { name: 'Local planning', detail: 'Potential fields for real-time obstacle avoidance' },
        { name: 'Exploration', detail: 'Frontier-based autonomous mapping of unknown spaces' },
      ],
    },
    contribution: [
      'Led the end-to-end design, including circuit layout, power system and full software-stack integration.',
      'Built and tested the software stack in simulation: LiDAR-based SLAM, A* path planning and motor control.',
      'Deployed navigation on the physical robot with A* global planning and a potential-field local planner.',
      'Implemented frontier-based exploration to map unknown environments autonomously.',
    ],
    hardware: ['LiDAR', 'Custom circuit layout and power system'],
    software: ['ROS', 'Python', 'SLAM', 'A*', 'Potential fields', 'Frontier exploration'],
    technologies: ['ROS', 'SLAM', 'A*', 'LiDAR'],
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/AcolNEWpMdM',
        title: 'Software stack in simulation',
        caption: 'LiDAR-based SLAM, A* path planning and motor control tested in simulation.',
        role: 'hero',
        poster: '/images/projects/amr-gazebo-rviz.webp',
        posterAlt: 'Gazebo simulation beside an RViz occupancy map showing the robot navigating',
      },
      {
        type: 'youtube',
        url: 'https://youtu.be/TIxDWtgllts',
        title: 'Navigation on the physical robot',
        caption: 'A* global routing with a potential-field local planner for obstacle avoidance.',
        role: 'demo',
      },
      {
        type: 'youtube',
        url: 'https://youtu.be/qHKsl6RHDi8',
        title: 'Autonomous frontier exploration',
        caption:
          'The robot picks unexplored frontiers and navigates to them until the space is mapped.',
        role: 'experiment',
      },
    ],
    links: {},
  },
  {
    slug: 'garrulus-power-electronics',
    tier: 'supporting',
    title: 'Power Protection Electronics for Tree-Seeding Robots',
    shortTitle: 'Garrulus Power Electronics',
    subtitle: 'Research Assistant · Garrulus',
    category: ['Embedded electronics', 'PCB design', 'Field robotics'],
    year: '2025',
    role: 'Research Assistant',
    organization: 'Garrulus',
    location: 'Bonn, Germany',
    period: '05/2025 – 12/2025',
    summary:
      'PCB protection and power distribution for the 3.3 V, 5 V and 24 V rails of autonomous tree-seeding robots — eFuse protection, solenoid drivers and power sequencing.',
    description:
      'Garrulus builds autonomous tree-seeding robots. I designed and validated the protection and power-distribution circuits for their 3.3 V, 5 V and 24 V rails, working with the hardware and firmware teams.',
    problem:
      'Field robots have to survive solenoid switching, inrush current at power-up and reverse-polarity mistakes during maintenance, while every rail stays protected and powers up in the right order.',
    contribution: [
      'Designed and validated PCB protection and power-distribution circuits for 3.3 V, 5 V and 24 V rails, including solenoid drivers and eFuse-based protection.',
      'Developed power sequencing, inrush-current limiting and reverse-polarity protection.',
      'Worked with the hardware and firmware teams to integrate the electronics into the tree-seeding robots.',
    ],
    hardware: ['3.3 V, 5 V and 24 V rails', 'eFuse protection', 'Solenoid drivers'],
    software: ['KiCad'],
    technologies: ['PCB design', 'KiCad', 'Power electronics', 'eFuse'],
    media: [
      {
        type: 'image',
        src: '/images/projects/garrulus-board-render.webp',
        alt: 'KiCad 3D render of a green control board with connectors labelled for solenoids, sensors, the motor and 24 V, 5 V and 3.3 V power',
        width: 1199,
        height: 855,
        caption: 'KiCad 3D render of the board design.',
        role: 'hero',
      },
      {
        type: 'image',
        src: '/images/projects/garrulus-pcb-layout.webp',
        alt: 'PCB layout in the KiCad editor with routed copper traces between connectors and integrated circuits',
        width: 1400,
        height: 607,
        caption: 'Mechanism motherboard layout in the KiCad PCB editor.',
        role: 'architecture',
      },
      {
        type: 'image',
        src: '/images/projects/garrulus-board-top.webp',
        alt: 'Top-down KiCad render of the populated board',
        width: 1029,
        height: 832,
        caption: 'Top view of the populated board.',
        role: 'result',
      },
    ],
    links: { github: 'https://github.com/ibrahim-1811/garrulus-pcb-design' },
  },
  {
    slug: 'cross-modal-action-retrieval',
    tier: 'supporting',
    title: 'Cross-Modal Action Retrieval for Robotic Manipulation',
    shortTitle: 'Cross-Modal Action Retrieval',
    subtitle: 'Grounding language instructions in manipulation actions',
    category: ['Robot learning', 'Vision–language', 'Manipulation'],
    summary:
      'A lightweight dual-encoder that aligns camera images with text instructions to predict manipulation actions — push, slide, rotate — served from a ROS 2 node.',
    description:
      'A small vision–language model for manipulation decisions. Images and text instructions are aligned in a shared embedding space with contrastive learning, and the predicted action label is published by a ROS 2 node for downstream manipulation logic.',
    system: {
      layout: 'flow',
      title: 'Retrieval pipeline',
      parts: [
        { name: 'Inputs', detail: 'Camera image and text instruction' },
        { name: 'Dual encoder', detail: 'Contrastive image–text embedding in PyTorch' },
        { name: 'Action label', detail: 'Push, slide or rotate' },
        { name: 'ROS 2 node', detail: 'Publishes the prediction as a decision signal' },
      ],
    },
    contribution: [
      'Built a lightweight cross-modal embedding model that aligns images with text instructions to predict manipulation action labels such as push, slide and rotate.',
      'Trained a dual-encoder pipeline in PyTorch with contrastive learning and evaluated retrieval quality with Top-1 and Top-5 accuracy.',
      'Integrated inference into a ROS 2 node that outputs the predicted action label as a decision signal for downstream manipulation logic.',
    ],
    software: ['PyTorch', 'Contrastive learning', 'ROS 2'],
    technologies: ['PyTorch', 'Contrastive learning', 'ROS 2'],
    media: [],
    links: {},
  },

  /* ─────────────────────────── ARCHIVE ─────────────────────────── */
  {
    slug: 'multi-robot-task-distribution',
    tier: 'archive',
    title: 'Multi-Robot Task Distribution',
    subtitle: 'Coordinated parcel collection and delivery in Gazebo',
    category: ['Multi-robot systems'],
    year: '2024',
    summary:
      'Task distribution for a simulated robot fleet: coordinated parcel collection and delivery to a central depot, with CI on GitHub Actions.',
    contribution: [
      'Developed scalable task allocation for multiple robots in Gazebo simulation.',
      'Enabled coordinated parcel collection and delivery to a central depot.',
      'Implemented CI pipelines using GitHub Actions and static analysis with Codacy.',
    ],
    hardware: ['TurtleBot3 (simulated)'],
    software: ['ROS', 'Python', 'Gazebo', 'SLAM', 'GitHub Actions', 'Codacy'],
    technologies: ['ROS', 'Gazebo', 'GitHub Actions'],
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/asg0zFYG6K0',
        title: 'Multi-robot task distribution',
        caption: 'Task distribution demonstration.',
        role: 'demo',
      },
      {
        type: 'image',
        src: '/images/projects/task-distribution-architecture.webp',
        alt: 'Flowchart: a client sends orders to a task-distributor broker that assigns them to workers; workers process orders through the navigation stack and update a shared memory module',
        width: 607,
        height: 615,
        caption:
          'Task-distributor architecture: client, broker, workers, shared memory and navigation stack.',
        role: 'architecture',
      },
    ],
    links: {},
  },
  {
    slug: 'ur5-pick-and-place',
    tier: 'archive',
    title: 'UR5 Pick and Place',
    subtitle: 'Simulated pick-and-place with MoveIt',
    category: ['Manipulation'],
    summary: 'Pick-and-place with a UR5 arm in Gazebo, planned with MoveIt and visualized in RViz.',
    technologies: ['UR5', 'MoveIt', 'Gazebo', 'ROS'],
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/FStlGbfTc_0',
        title: 'UR5 pick and place',
        caption: 'Gazebo simulation alongside MoveIt planning in RViz.',
        role: 'simulation',
      },
    ],
    links: {},
  },
  {
    slug: 'underwater-rov',
    tier: 'archive',
    title: 'Underwater ROV',
    subtitle: 'Vehicle design for underwater exploration and inspection',
    category: ['Marine robotics', 'Mechanical design'],
    summary:
      'An ROV for underwater exploration and inspection: six-DOF thruster layout, onboard camera, tethered power and communication, watertight enclosures and pool testing.',
    technologies: ['Thrusters', 'Waterproofing', 'CAD'],
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/nCYJSiTMKXI',
        title: 'Underwater vehicle design',
        caption: 'Design walkthrough, including an exploded view of the vehicle.',
        role: 'explanation',
      },
    ],
    links: {},
  },
  {
    slug: 'box-it',
    tier: 'archive',
    title: 'Box-it Inventory Tracking',
    subtitle: 'Automated box inventory tracking for warehouses',
    category: ['Warehouse automation'],
    summary:
      'Box-level inventory tracking for warehouses, with QR-code scanning and database logging.',
    technologies: ['Computer vision', 'QR codes', 'Database'],
    media: [
      {
        type: 'youtube',
        url: 'https://youtu.be/7DjfuaVgfzQ',
        title: 'Box-it inventory tracking',
        role: 'demo',
      },
    ],
    links: {},
  },
  {
    slug: 'home-automation-circuit',
    tier: 'archive',
    title: 'Home Automation Circuit',
    subtitle: 'Circuit design project',
    category: ['Embedded electronics'],
    summary:
      'A 16-appliance control system designed and built in a university lab: PCB switching design, microcontroller-based control and surge protection.',
    technologies: ['Circuit design', 'PCB design', 'Embedded systems'],
    media: [
      {
        type: 'image',
        src: '/images/projects/home-automation-board.webp',
        alt: 'Relay switching board with a microcontroller module, wired inside an enclosure',
        width: 648,
        height: 1152,
        caption: 'Relay switching board installed in its enclosure.',
        role: 'hero',
      },
    ],
    links: {},
  },
];
