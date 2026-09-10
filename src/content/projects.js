/**
 * Source trail: docs/portfolio/CONTENT_SOURCES.md.
 * Future case studies use futurePath; caseStudyHref stays null until published.
 * Media supports {type:'image',src,alt,width,height,caption} and, in Phase 3,
 * {type:'youtube',youtubeId,title,caption,poster}. No final video IDs in Phase 2.
 */
export const featuredProjects = [
  {
    slug: 'simplr',
    number: '01',
    title: 'SIMPLR',
    subtitle: 'Simulation Multipurpose Lab Robot',
    year: '2026',
    categories: ['Laboratory manipulation', 'Physical AI'],
    summary:
      'A reusable laboratory manipulation platform connecting a UR5e, wrist-mounted RGB-D perception and simulation with demonstration data and robot-learning workflows.',
    detail: 'Designed to expand across pouring, scooping, object transfer and tool interaction.',
    tech: ['UR5e', 'Robotiq 2F-85', 'ROS 2 Jazzy', 'Isaac Sim', 'Isaac Lab', 'LeRobot'],
    metrics: [],
    futurePath: '/projects/simplr',
    caseStudyHref: null,
    media: [],
    system: {
      title: 'From workcell to learned behavior',
      label: 'Platform direction',
      steps: [
        {
          label: 'Physical system',
          value: 'UR5e + Robotiq 2F-85',
          detail: 'Wrist-mounted RGB-D perception',
        },
        {
          label: 'Simulation & control',
          value: 'ROS 2 + NVIDIA Isaac',
          detail: 'Digital twin and manipulation workflows',
        },
        {
          label: 'Data & learning',
          value: 'Demonstrations → policies',
          detail: 'Isaac Mimic · LeRobot · ACT',
        },
      ],
      note: 'One platform. Multiple laboratory tasks.',
    },
  },
  {
    slug: 'mrta',
    number: '02',
    title: 'Explainable Multi-Robot Task Allocation',
    subtitle: 'Outcome-aware scheduling and warehouse execution',
    year: '2026',
    categories: ['Multi-robot systems', 'Explainable AI'],
    summary:
      'An online warehouse task-allocation framework combining A* planning, symbolic robot and task states, and interpretable scheduling policies learned through Inductive Logic Programming.',
    detail:
      'Benchmarked heuristic, auction-based, optimization and learning-based allocation strategies.',
    tech: ['ROS 2', 'Gazebo', 'Python', 'A*', 'Prolog', 'ILP'],
    metrics: [{ value: 'ICAPS 2026', label: 'PlanRob publication' }],
    futurePath: '/projects/mrta',
    caseStudyHref: null,
    media: [
      {
        type: 'image',
        src: '/images/projects/mrta-control.webp',
        alt: 'Warehouse control interface showing allocation strategies, robot states and task monitoring',
        width: 1680,
        height: 920,
        caption: 'Warehouse task-allocation interface · existing research prototype',
      },
    ],
  },
  {
    slug: 'invite-industrial-manipulation',
    number: '03',
    title: 'Industrial Manipulation & Digital Twins',
    subtitle: 'INVITE GmbH',
    year: '2026',
    categories: ['Industrial robotics', 'Digital twins'],
    summary:
      'Integrating ROS 2, MoveIt 2 and NVIDIA Isaac Sim for industrial workcells, connecting perception, motion planning, trajectory execution and demonstration acquisition.',
    detail:
      'Engineering scope includes UR10 and UR5e systems, RGB-D sensing and robot-learning workflows.',
    tech: ['ROS 2', 'MoveIt 2', 'Isaac Sim', 'RGB-D'],
    metrics: [],
    futurePath: '/projects/invite-industrial-manipulation',
    caseStudyHref: null,
    media: [],
    system: {
      label: 'Engineering scope',
      title: 'Connecting simulation and the workcell',
      steps: [
        { label: 'Sense', value: 'RGB-D perception', detail: 'Robot and sensor integration' },
        {
          label: 'Plan & execute',
          value: 'MoveIt 2 + ROS 2',
          detail: 'Planning and trajectory execution',
        },
        {
          label: 'Simulate & learn',
          value: 'NVIDIA Isaac Sim',
          detail: 'Digital twins and demonstration acquisition',
        },
      ],
    },
  },
  {
    slug: 'intrinsic-ai-challenge',
    number: '04',
    title: 'Intrinsic AI for Industry Challenge',
    subtitle: 'Contact-rich cable and connector manipulation',
    year: '2026',
    categories: ['Robot learning', 'Competition'],
    summary:
      'Built a multi-camera perception and demonstration pipeline, validated LeRobot datasets and trained an ACT policy for cable handling and connector insertion.',
    detail: null,
    tech: ['ROS 2', 'YOLO', 'PyTorch', 'LeRobot', 'ACT'],
    metrics: [
      { value: 'Top 40 / 400', label: 'Teams in the challenge' },
      { value: '157', label: 'Successful demonstrations' },
      { value: '100k', label: 'ACT training steps' },
    ],
    futurePath: '/projects/intrinsic-ai-challenge',
    caseStudyHref: null,
    media: [],
  },
  {
    slug: 'robothon-2025',
    number: '05',
    title: 'Robothon 2025 Grand Challenge',
    subtitle: 'Vision-guided Kinova Gen3 manipulation',
    year: '2025',
    categories: ['Manipulation', 'Competition'],
    summary:
      'Developed an autonomous manipulation pipeline for button pressing, stylus grasping, trajectory drawing and maze solving under competition time constraints.',
    detail: null,
    tech: ['Kinova Gen3', 'ROS', 'MoveIt', 'OpenCV', 'Python', 'C++'],
    metrics: [{ value: 'Top 5', label: 'International result' }],
    futurePath: '/projects/robothon-2025',
    caseStudyHref: null,
    media: [
      {
        type: 'image',
        src: '/images/projects/robothon-kinova.png',
        alt: 'Kinova Gen3 robot arm positioned over the Robothon manipulation task board',
        width: 502,
        height: 818,
        caption: 'Kinova Gen3 · Robothon 2025',
      },
    ],
  },
];
