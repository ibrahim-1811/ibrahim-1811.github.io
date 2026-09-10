/* ============================================================
   PROJECTS CASE STUDY DATA
   Used by: projects/project.html
   ============================================================ */

const PROJECTS_DATA = {

  'robothon': {
    id: 'robothon',
    title: 'Robothon 2025 — Kinova Gen3 Manipulation',
    subtitle: 'International Robotics Competition',
    badge: '🏆 Top 5 International',
    badgeType: 'gold',
    status: 'Completed',
    role: 'Robotics Software Engineer',
    timeline: 'March – April 2025',
    team: '3 engineers',
    videoId: 'FcK0cvRkM-Q',
    videos: null,
    images: [],
    tagline: 'Built a vision-guided manipulation pipeline that secured a Top 5 finish in an international robotics competition.',
    overview: 'Robothon 2025 is an annual international robotics competition that challenges teams to automate complex manipulation tasks in the shortest possible time. Our team competed with a Kinova Gen3 7-DOF robotic arm, developing a fully autonomous pipeline capable of detecting task states, pressing buttons, grasping and drawing with a stylus, and navigating a magnetic maze — all without human intervention.',
    problem: 'The challenge demanded sub-minute completion of multi-step manipulation tasks with a physical Kinova Gen3 arm under competition conditions. Tasks involved precise button detection, stylus manipulation, and maze solving — with unpredictable variation in physical setup and strict time pressure that left no margin for manual correction.',
    solution: 'We built a modular vision-guided pipeline: OpenCV handles real-time task state detection and position estimation, MoveIt plans and executes manipulation trajectories, and a custom state machine sequences all tasks. Visual feedback loops continuously verify task completion and adapt to small positional variations.',
    contribution: [
      'Built task state detection using OpenCV to identify button positions and solve the maze layout.',
      'Integrated ROS and MoveIt to plan and execute precise manipulation trajectories for the Kinova Gen3.',
      'Designed and tuned a stylus grasping and trajectory drawing workflow under competition conditions.',
      'Developed visual feedback-based control for verified task completion.',
      'Coordinated real-time task sequencing and state transitions under strict time limits.'
    ],
    results: [
      'Achieved a Top 5 ranking among international teams.',
      'Successfully completed all assigned manipulation tasks across competition runs.',
      'Demonstrated robust vision-guided manipulation pipeline under live competition pressure.'
    ],
    tech: ['Robothon', 'Kinova Gen3', 'ROS', 'MoveIt', 'OpenCV', 'Python', 'C++', 'Manipulation'],
    links: {}
  },

  'intrensic': {
    id: 'intrensic',
    title: 'AI for Industry — Dexterous Cable Manipulation',
    subtitle: 'Intrinsic & Open Robotics AI for Industry Challenge',
    badge: 'In Progress',
    badgeType: 'teal',
    status: 'In Progress',
    role: 'Robotics ML Engineer',
    timeline: '2025 – Present',
    team: 'Individual + collaboration',
    videoId: '',
    videos: null,
    images: [],
    tagline: 'End-to-end imitation learning pipeline for industrial cable insertion — multi-camera perception, data collection tooling, and policy training.',
    overview: 'The Intrinsic & Open Robotics AI for Industry Challenge focuses on developing robot learning pipelines for dexterous industrial tasks. The specific challenge is automating cable handling and connector insertion — requiring fine motor control, multi-modal perception, and reliable generalisation from a limited set of human demonstrations.',
    problem: 'Cable insertion in industrial electronics assembly demands sub-millimetre precision and robust handling of deformable objects. Traditional motion planning fails to generalise across connector variations, and high-quality demonstration data is difficult to collect and validate at scale. Sim-to-real transfer for dexterous tasks remains an open problem.',
    solution: 'Built an end-to-end imitation learning pipeline using LeRobot and GR00T with a ROS2/Gazebo simulation environment for data collection. Multi-camera observations provide rich spatial context, while TCP pose, force, and joint state inputs ground the policy in physical reality. Strict data validation ensures only clean episodes enter training.',
    contribution: [
      'Built dataset collection and validation tooling for robot demonstrations.',
      'Set up a multi-view camera observation pipeline with synchronised TCP pose, force, joint states, and timestamps.',
      'Designed and validated a dataset of 157 successful cable insertion episodes.',
      'Trained ACT policy for 100k steps targeting simulated connector insertion.',
      'Focused on deployment reliability, data quality, and sim-to-real generalisation.'
    ],
    results: [
      'Collected and validated 157 successful demonstration episodes.',
      'Trained end-to-end cable insertion policy using ACT for 100k steps.',
      'Built a robust multi-camera data pipeline with fully synchronised sensor streams.'
    ],
    tech: ['Robot Learning', 'Imitation Learning', 'LeRobot', 'GR00T', 'ACT Policy', 'PyTorch', 'ROS2', 'Gazebo', 'Computer Vision', 'Dexterous Manipulation'],
    links: {}
  },

  'task-allocation': {
    id: 'task-allocation',
    title: 'Explainable Multi-Robot Task Allocation via ILP',
    subtitle: 'ROS2 Warehouse Robotics Research',
    badge: 'Research',
    badgeType: 'teal',
    status: 'Completed',
    role: 'Robotics Research Engineer',
    timeline: '2024 – 2025',
    team: 'Individual research',
    videoId: 'm3gBvXjOTYQ',
    videos: null,
    images: ['images/ILP_Project.jpg'],
    tagline: 'Symbolic allocation rules learned from robot execution logs — interpretable, verifiable, and benchmarked against five classical MRTA strategies.',
    overview: 'Multi-Robot Task Allocation (MRTA) is a core challenge in warehouse automation. This project implements a ROS2-based framework that learns interpretable Prolog allocation rules from robot execution logs using Inductive Logic Programming (ILP), then benchmarks them against classical strategies including random, score-based, heuristic, auction, and ILP.',
    problem: 'Classical MRTA algorithms offer performance but no explainability. Warehouse operators cannot understand or verify why the system made a specific allocation decision. As robot fleets scale, opaque allocation decisions become a safety and operational liability. There is no standard benchmarking framework for comparing MRTA strategies with consistent metrics.',
    solution: 'Designed a modular ROS2 warehouse simulation with interchangeable allocation strategies. Robot execution logs are converted to positive and negative ILP examples, and Popper learns concise human-readable Prolog rules for task assignment. A benchmarking module logs standardised metrics across all strategy runs.',
    contribution: [
      'Implemented random, score-based, heuristic, auction, and ILP allocation strategies in ROS2.',
      'Built execution logging for allocation delay, allocator runtime, makespan, throughput, success rate, and workload balance.',
      'Converted execution traces to Popper ILP positive and negative examples.',
      'Learned interpretable Prolog rules for robot assignment and task deferment.',
      'Built benchmarking scripts, CSV logging, and automated plot generation for repeatable experiments.'
    ],
    results: [
      'Successfully learned interpretable, human-readable allocation rules from execution logs.',
      'Benchmark framework supports reproducible comparison across 5 allocation strategies.',
      'Demonstrated explainability advantage of ILP over black-box methods with zero performance penalty on tested scenarios.'
    ],
    tech: ['ROS2', 'MRTA', 'ILP', 'Prolog', 'Popper', 'Gazebo', 'Nav2', 'Python', 'Benchmarking', 'Explainable AI'],
    links: {}
  },

  'ilp-fault': {
    id: 'ilp-fault',
    title: 'TurtleBot3 Fault Detection and Diagnosis using ILP',
    subtitle: 'Symbolic AI for Robot Diagnostics',
    badge: 'Research',
    badgeType: 'teal',
    status: 'Completed',
    role: 'Robotics Research Engineer',
    timeline: '2024',
    team: 'Individual research',
    videoId: '',
    videos: null,
    images: [],
    tagline: 'Interpretable fault diagnosis rules learned by Popper ILP — diagnoses wheel slip, sensor noise, delays, and comm faults from TurtleBot3 logs.',
    overview: 'Fault detection and diagnosis in mobile robots is critical for reliable autonomous operation. This project implements a symbolic fault diagnosis system for TurtleBot3 that uses Inductive Logic Programming to learn interpretable Prolog rules from simulated fault injection experiments across five fault types.',
    problem: 'Current fault detection in robots relies on threshold-based or ML methods that are hard to interpret and verify by field engineers. Existing approaches also struggle to generalise across fault types without extensive retraining, and provide no explanation for their diagnoses.',
    solution: 'Built a fault injection framework in ROS that simulates five distinct fault types on a TurtleBot3. Custom preprocessing converts sensor log data into Popper ILP positive and negative examples. Popper learns concise, human-readable Prolog diagnostic rules that can be inspected and extended without retraining.',
    contribution: [
      'Modelled and injected wheel slip, LiDAR noise, ultrasonic noise, sensor delay, and communication faults.',
      'Built a ROS logging pipeline to capture relevant sensor data during each fault injection.',
      'Wrote preprocessing scripts to convert logs into Popper ILP positive and negative examples.',
      'Ran Popper to learn interpretable Prolog fault diagnosis rules.',
      'Evaluated diagnosis latency, accuracy, and robustness across fault types and noise configurations.'
    ],
    results: [
      'Successfully diagnosed all five fault types using learned Prolog rules.',
      'Produced interpretable diagnostic rules that engineers can inspect and extend.',
      'Evaluated robustness across multiple noise levels and delay configurations.'
    ],
    tech: ['ROS', 'TurtleBot3', 'Fault Detection', 'ILP', 'Prolog', 'Popper', 'Python', 'Diagnostics'],
    links: {}
  },

  'multi-robot': {
    id: 'multi-robot',
    title: 'ROS2 Warehouse Simulation & Benchmarking Framework',
    subtitle: 'Multi-Robot Coordination at Scale',
    badge: 'Simulation',
    badgeType: 'default',
    status: 'Completed',
    role: 'Robotics Software Engineer',
    timeline: '2024',
    team: 'Individual project',
    videoId: 'asg0zFYG6K0',
    videos: null,
    images: ['images/thumbs/multi_robot/multi_robot.jpg'],
    tagline: 'Modular ROS2 warehouse simulation with pluggable allocation strategies, reproducible experiments, and CI/CD via GitHub Actions.',
    overview: 'Built a modular ROS2 warehouse simulation environment for evaluating multi-robot coordination, task allocation strategies, and navigation performance. The framework supports fully reproducible experiments with configurable seeds, order rates, and strategy selection, and includes CI/CD integration via GitHub Actions with static analysis through Codacy.',
    problem: 'Evaluating multi-robot task allocation algorithms requires a reproducible, configurable simulation environment. Most existing setups are tightly coupled to specific strategies, hard to extend with new algorithms, and lack standardised metrics logging that enables fair comparison.',
    solution: 'Designed a modular framework with pluggable allocation strategies, integrated order generation, and automated experiment runners. TurtleBot3 robots navigate a warehouse environment using Nav2, with tasks assigned and logged in real time. Experiment parameters are fully configurable via seed, trial count, order rate, and strategy flag.',
    contribution: [
      'Integrated TurtleBot3 multi-robot simulation with Gazebo and Nav2.',
      'Built order generation, task execution, structured logging, and experiment runner modules.',
      'Added reproducible experiment configurations using seeds, trial counts, order rates, and strategy selection.',
      'Set up CI pipelines via GitHub Actions with static analysis using Codacy.',
      'Designed the architecture for scaling toward 50–100 robots in 2D simulation.'
    ],
    results: [
      'Fully functional multi-robot warehouse simulation with real-time task assignment and execution.',
      'CI/CD pipeline provides automated testing and code quality checks on every push.',
      'Framework used as the base platform for the ILP task allocation benchmarking research.'
    ],
    tech: ['ROS2', 'Gazebo', 'Nav2', 'TurtleBot3', 'GitHub Actions', 'SLAM', 'Python', 'Codacy', 'Benchmarking'],
    links: {}
  },

  'amr-real': {
    id: 'amr-real',
    title: 'Autonomous Mobile Robot (AMR)',
    subtitle: 'Full-Stack AMR: Simulation to Real Hardware',
    badge: 'Hardware',
    badgeType: 'default',
    status: 'Completed',
    role: 'Robotics Systems Engineer',
    timeline: '2023 – 2024',
    team: 'Team of 4',
    videoId: '',
    videos: [
      {
        id: 'AcolNEWpMdM',
        label: 'Simulation',
        desc: 'Full AMR software stack validated in simulation — LiDAR-based SLAM for mapping, A* for global path planning, and motor control. Circuit layout and power system design were developed in parallel.'
      },
      {
        id: 'TIxDWtgllts',
        label: 'Navigation',
        desc: 'Deployed on real hardware: A* computes the global route while Potential Fields handles real-time local obstacle avoidance, keeping the robot on track without collisions.'
      },
      {
        id: 'qHKsl6RHDi8',
        label: 'Exploration',
        desc: 'Autonomous frontier-based exploration: the robot identifies unexplored boundaries and navigates to them autonomously until the full environment is mapped.'
      }
    ],
    images: [],
    tagline: 'End-to-end AMR from circuit design to deployment — SLAM mapping, A* global planning, Potential Fields local avoidance, and autonomous frontier exploration.',
    overview: 'Designed and built a complete Autonomous Mobile Robot from the ground up — covering hardware design, circuit layout, ROS software stack, and real-world deployment. The robot navigates unknown environments using LiDAR-based SLAM, plans globally with A*, and avoids obstacles locally using Potential Fields. A frontier-based exploration module allows fully autonomous mapping of unknown spaces.',
    problem: 'Building a functional AMR from scratch requires tight integration of hardware design, embedded systems, and a full ROS-based software stack — each layer introducing unique failure modes. Bridging the simulation-to-real gap for navigation and exploration is a persistent challenge, particularly for real-time local obstacle avoidance.',
    solution: 'Started with a full ROS simulation environment to validate the entire software stack before touching hardware. A two-layer planning architecture (A* global + Potential Fields local) provides both path efficiency and real-time reactivity. The frontier exploration module treats unexplored boundaries as navigation targets for systematic environment coverage.',
    contribution: [
      'Led circuit layout and power system design for the physical robot.',
      'Built and validated the LiDAR-based SLAM stack for real-time environment mapping.',
      'Implemented and tuned the A* global path planner with ROS navigation integration.',
      'Developed the Potential Fields local planner for dynamic obstacle avoidance.',
      'Implemented frontier-based autonomous exploration for unknown environments.',
      'Tested and deployed the full software stack on real hardware.'
    ],
    results: [
      'Successfully navigated real-world environments using the combined A* + Potential Fields planning stack.',
      'Autonomous exploration mapped unknown environments without human guidance.',
      'Validated full simulation-to-real pipeline across all navigation and exploration modes.'
    ],
    tech: ['ROS', 'SLAM', 'A*', 'Potential Fields', 'Frontier Exploration', 'LiDAR', 'Python', 'Circuit Design', 'Embedded Systems'],
    links: {}
  },

  'garrulus-pcb': {
    id: 'garrulus-pcb',
    title: 'Circuit Design — Autonomous Tree-Seeding Robots',
    subtitle: 'Garrulus Research Project · Bonn, Germany',
    badge: 'Hardware',
    badgeType: 'default',
    status: 'Completed',
    role: 'Electronics / PCB Design Engineer',
    timeline: 'May – December 2025',
    team: 'Hardware + firmware team',
    videoId: '',
    videos: null,
    images: [
      'images/garullas_1.png',
      'images/garullas_2.png',
      'images/garullas_3.png',
      'images/garullas_4.png'
    ],
    tagline: 'Robust power protection and distribution circuits for outdoor autonomous robots operating in uncontrolled field conditions.',
    overview: 'Garrulus is a research project developing autonomous robots for tree-seeding in forest environments. As a Research Assistant, I designed and validated the power protection and distribution circuits for the robot\'s 3.3 V, 5 V, and 24 V power rails — a safety-critical system ensuring robot reliability during outdoor field operation.',
    problem: 'Field-deployed robots face harsh electrical conditions: solenoid switching transients on 24 V rails, reverse-polarity risk during field maintenance, inrush current spikes at power-up, and limited overcurrent protection. Off-the-shelf solutions were unsuitable for the specific rail configurations and mechanical constraints of the Garrulus platform.',
    solution: 'Designed custom PCBs in KiCad covering eFuse-based overcurrent protection, solenoid flyback suppression, reverse-polarity protection via P-channel MOSFETs, and sequenced power-up for all rails. Each circuit was simulated and validated against field requirements before integration.',
    contribution: [
      'Designed PCB protection circuits for 3.3 V, 5 V, and 24 V power rails.',
      'Implemented eFuse-based overcurrent protection and power distribution.',
      'Designed solenoid drivers with flyback diode protection for 24 V switching.',
      'Developed power sequencing, inrush-current limiting, and reverse-polarity protection.',
      'Collaborated with hardware and firmware teams for system integration and field validation.'
    ],
    results: [
      'All circuit designs validated against Garrulus field requirements.',
      'Power system integrated into the robot hardware platform.',
      'Successfully deployed in field robot prototypes used for tree-seeding research.'
    ],
    tech: ['Circuit Design', 'KiCad', 'PCB Design', 'Power Electronics', 'eFuse', 'Solenoid Drivers', 'Embedded Systems', 'Robotics'],
    links: { github: 'https://github.com/ibrahim-1811/garrulus-pcb-design' }
  },

  'crossmodal': {
    id: 'crossmodal',
    title: 'Cross-Modal Action Retrieval for Manipulation',
    subtitle: 'Vision-Language Grounding for Robot Control',
    badge: 'Research',
    badgeType: 'teal',
    status: 'Completed',
    role: 'ML Researcher',
    timeline: '2024',
    team: 'Individual research',
    videoId: '',
    videos: null,
    images: [],
    tagline: 'Lightweight dual-encoder model matching camera images with text instructions to predict robot manipulation actions in real time.',
    overview: 'Built a cross-modal retrieval model that aligns visual observations with natural language instructions to predict robot manipulation actions. The model uses contrastive learning to train a dual-encoder that maps images and text into a shared embedding space, then classifies the appropriate manipulation action (push, slide, or rotate).',
    problem: 'Robots operating from natural language instructions need to ground abstract commands into concrete physical actions. Existing approaches are computationally expensive, require large pretrained models ill-suited for real-time deployment, or lack the cross-modal alignment needed for instruction-conditioned manipulation.',
    solution: 'Designed a lightweight dual-encoder architecture trained with contrastive loss to align camera images with text manipulation instructions. The model predicts discrete manipulation labels and was deployed as a ROS2 node outputting real-time action decision signals.',
    contribution: [
      'Designed and trained a dual-encoder model using contrastive learning.',
      'Built training pipeline aligning camera images with text manipulation instructions.',
      'Implemented model inference as a ROS2 node for real-time action prediction.',
      'Evaluated model accuracy across push, slide, and rotate manipulation classes.'
    ],
    results: [
      'Successfully trained a cross-modal retrieval model for manipulation action prediction.',
      'Deployed as a functional ROS2 node with real-time inference.',
      'Demonstrated cross-modal alignment between visual observations and language instructions.'
    ],
    tech: ['PyTorch', 'ROS2', 'Contrastive Learning', 'Computer Vision', 'NLP', 'Embeddings', 'Manipulation'],
    links: {}
  }

};

/* Ordered list for prev / next navigation on case study pages */
const PROJECT_ORDER = [
  'robothon',
  'intrensic',
  'task-allocation',
  'ilp-fault',
  'multi-robot',
  'amr-real',
  'garrulus-pcb',
  'crossmodal'
];
