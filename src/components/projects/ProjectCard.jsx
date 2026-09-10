import { useProjectDialog } from '../../features/projects/ProjectDialogProvider';
import { countVideos, getCardImage } from '../../features/projects/projectData';
import Icon from '../ui/Icon';
import TechTags from '../ui/TechTags';
import StatusBadge from './StatusBadge';
import SystemDiagram from './SystemDiagram';

const TAG_LIMIT = { flagship: 6, secondary: 4, supporting: 3 };

function CardVisual({ project }) {
  const image = getCardImage(project);
  const videos = countVideos(project);
  if (!image && !project.system) return null;
  return (
    <div className={`project-card__media${image ? '' : ' project-card__media--diagram'}`}>
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      ) : (
        <SystemDiagram system={project.system} variant="card" />
      )}
      {videos > 0 && (
        <span className="project-card__badge">
          <Icon name="play" size={11} />
          {videos === 1 ? 'Video' : `${videos} videos`}
        </span>
      )}
    </div>
  );
}

/** Scannable summary card; the whole card opens the project dialog. */
export default function ProjectCard({ project }) {
  const { openProject } = useProjectDialog();
  const [metric] = project.metrics;
  const titleId = `${project.slug}-title`;

  return (
    <article
      id={project.slug}
      className={`project-card project-card--${project.tier}`}
      aria-labelledby={titleId}
    >
      <div className="project-card__body">
        <p className="project-card__meta">
          <span>
            {project.number} / {project.category.slice(0, 2).join(' · ')}
          </span>
          {project.year && <span>{project.year}</span>}
        </p>
        <h4 className="project-card__title" id={titleId}>
          <button
            type="button"
            className="project-card__trigger"
            aria-haspopup="dialog"
            data-project-trigger={project.slug}
            onClick={(event) => openProject(project.slug, event.currentTarget)}
          >
            {project.shortTitle}
          </button>
        </h4>
        {project.subtitle && <p className="project-card__subtitle">{project.subtitle}</p>}
        <p className="project-card__summary">{project.summary}</p>
        {(project.status || metric) && (
          <div className="project-card__facts">
            {metric && (
              <p className="project-card__metric">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </p>
            )}
            {project.status && (
              <StatusBadge tone={project.current ? 'active' : 'neutral'}>
                {project.status}
              </StatusBadge>
            )}
          </div>
        )}
        <TechTags items={project.technologies.slice(0, TAG_LIMIT[project.tier])} />
        <span className="project-card__cta" aria-hidden="true">
          View project <Icon name="arrow" size={16} />
        </span>
      </div>
      {project.tier !== 'supporting' && <CardVisual project={project} />}
    </article>
  );
}
