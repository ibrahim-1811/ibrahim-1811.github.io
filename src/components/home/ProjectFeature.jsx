import Icon from '../ui/Icon';
import TechTags from '../ui/TechTags';
import MediaFigure from '../media/MediaFigure';
import ProjectMetrics from '../projects/ProjectMetrics';
import SystemSummary from '../projects/SystemSummary';

export default function ProjectFeature({ project, compact = false }) {
  return <article id={project.slug} className={`project-feature${compact ? ' project-feature--compact' : ''}`} aria-labelledby={`${project.slug}-title`}>
    <div className="project-copy">
      <p className="project-meta"><span>{project.number} / {project.categories.join(' · ')}</span><span>{project.year}</span></p>
      <h3 id={`${project.slug}-title`}>{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-summary">{project.summary}</p>
      {project.detail && <p className="project-detail">{project.detail}</p>}
      <TechTags items={project.tech} />
      <ProjectMetrics metrics={project.metrics} />
      {project.caseStudyHref && <a className="text-link" href={project.caseStudyHref}>View Case Study <Icon name="external" size={18} /></a>}
    </div>
    {(project.system || project.media.length > 0) && <div className="project-visual">
      {project.system ? <SystemSummary system={project.system} /> : <MediaFigure media={project.media[0]} className={project.slug === 'robothon-2025' ? 'media-figure--portrait' : ''} />}
    </div>}
  </article>;
}
