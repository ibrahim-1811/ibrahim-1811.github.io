/** Allowed keys used by src/content/projects.js. Labels are what visitors see. */
export const PROJECT_TIERS = ['flagship', 'secondary', 'supporting', 'archive'];

export const STATUS_LABELS = {
  implemented: 'Implemented',
  evaluated: 'Evaluated',
  experimental: 'Experimental',
  ongoing: 'Ongoing',
  'in-development': 'In development',
  planned: 'Planned',
  future: 'Future direction',
};

/** Visual grouping: finished work, active work, not yet started. */
export const STATUS_TONES = {
  implemented: 'done',
  evaluated: 'done',
  experimental: 'active',
  ongoing: 'active',
  'in-development': 'active',
  planned: 'future',
  future: 'future',
};

export const MEDIA_ROLES = {
  hero: 'Featured',
  demo: 'Demonstration',
  simulation: 'Simulation',
  architecture: 'Architecture',
  experiment: 'Experiment',
  result: 'Result',
  dataset: 'Dataset',
  explanation: 'Explanation',
};

export const MEDIA_TYPES = ['youtube', 'image'];
