import { useEffect, useRef, useState } from 'react';
import { groupDialogMedia, mediaKey } from '../../features/projects/projectData';
import MediaGallery from '../media/MediaGallery';
import MediaItem from '../media/MediaItem';
import Icon from '../ui/Icon';
import TechTags from '../ui/TechTags';
import ProjectMetrics from './ProjectMetrics';
import StatusBadge from './StatusBadge';
import SystemDiagram from './SystemDiagram';

export const DIALOG_TITLE_ID = 'project-dialog-title';
export const DIALOG_LEAD_ID = 'project-dialog-lead';

const FACTS = [
  ['year', 'Year'],
  ['status', 'Status'],
  ['context', 'Context'],
  ['role', 'Role'],
  ['organization', 'Organization'],
  ['period', 'Period'],
  ['location', 'Location'],
];

const LINKS = [
  ['github', 'GitHub repository'],
  ['paper', 'Publication'],
  ['website', 'Project website'],
];

const hasItems = (list) => Array.isArray(list) && list.length > 0;

/** Renders nothing unless it has content, so the dialog never shows empty headings. */
function DialogSection({ title, show, className = '', children }) {
  if (!show) return null;
  return (
    <section className={`dialog-section ${className}`.trim()}>
      <h3 className="dialog-section__title">{title}</h3>
      {children}
    </section>
  );
}

function ProjectFacts({ project }) {
  const facts = FACTS.filter(([key]) => project[key]);
  if (!facts.length) return null;
  return (
    <dl className="project-facts">
      {facts.map(([key, label]) => (
        <div key={key}>
          <dt>{label}</dt>
          <dd>
            {key === 'status' ? (
              <StatusBadge tone={project.current ? 'active' : 'neutral'}>
                {project.status}
              </StatusBadge>
            ) : (
              project[key]
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ExternalLink({ href, children, className = 'text-link' }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
      <Icon name="external" size={15} />
    </a>
  );
}

function ResearchReference({ research }) {
  return (
    <div className="research-reference">
      {research.type && <p className="research-reference__type">{research.type}</p>}
      <p className="research-reference__title">
        {research.href ? (
          <ExternalLink href={research.href}>{research.title}</ExternalLink>
        ) : (
          research.title
        )}
      </p>
      {research.authors && <p className="research-reference__authors">{research.authors}</p>}
      <p className="research-reference__venue">
        {[research.venue, research.location, research.year].filter(Boolean).join(' · ')}
      </p>
    </div>
  );
}

export default function ProjectDialogContent({ project, panelRef }) {
  const titleRef = useRef(null);
  const [playingKey, setPlayingKey] = useState(null);
  const media = groupDialogMedia(project);
  const diagramIsHero = !media.hero && Boolean(project.system);
  const links = LINKS.filter(([key]) => project.links[key]);
  const hasStack = hasItems(project.hardware) || hasItems(project.software);
  const longTitle = project.title.length > 48;

  useEffect(() => {
    panelRef.current?.scrollTo?.({ top: 0 });
    titleRef.current?.focus({ preventScroll: true });
  }, [panelRef]);

  const videoProps = (item) => {
    const key = mediaKey(project, item);
    return { playing: playingKey === key, onPlay: () => setPlayingKey(key) };
  };
  const figure = (item) => (
    <MediaItem key={mediaKey(project, item)} item={item} variant="figure" {...videoProps(item)} />
  );

  return (
    <div className="project-dialog__content">
      <header className="project-dialog__intro">
        <div className="project-dialog__heading">
          <p className="project-dialog__meta">
            {project.number && <span>{project.number}</span>}
            {project.category.join(' · ')}
          </p>
          <h2
            ref={titleRef}
            id={DIALOG_TITLE_ID}
            tabIndex={-1}
            className={`project-dialog__title${longTitle ? ' project-dialog__title--long' : ''}`}
          >
            {project.title}
          </h2>
          {project.subtitle && <p className="project-dialog__subtitle">{project.subtitle}</p>}
          <p id={DIALOG_LEAD_ID} className="project-dialog__lead">
            {project.description ?? project.summary}
          </p>
          {project.links.caseStudy && (
            <a
              className="button-link button-link--primary project-dialog__case-study"
              href={project.links.caseStudy}
            >
              Full case study <Icon name="arrow" size={16} />
            </a>
          )}
        </div>
        <ProjectFacts project={project} />
      </header>

      {(media.hero || diagramIsHero) && (
        <div className="project-dialog__hero">
          {media.hero ? (
            <MediaItem item={media.hero} variant="hero" {...videoProps(media.hero)} />
          ) : (
            <SystemDiagram system={project.system} variant="hero" />
          )}
        </div>
      )}

      <ProjectMetrics metrics={project.metrics} className="project-metrics--dialog" />

      <div className="project-dialog__body">
        <div className="project-dialog__main">
          <DialogSection title="Problem" show={project.problem}>
            <p>{project.problem}</p>
          </DialogSection>

          <DialogSection
            title="System"
            show={(project.system && !diagramIsHero) || hasItems(media.architecture)}
          >
            {!diagramIsHero && <SystemDiagram system={project.system} variant="section" />}
            {media.architecture.map(figure)}
          </DialogSection>

          <DialogSection
            title={project.scope?.title ?? 'Scope'}
            show={hasItems(project.scope?.items)}
          >
            <ul className="scope-list">
              {project.scope?.items?.map((item) => (
                <li key={item.name}>
                  <span className="scope-list__name">{item.name}</span>
                  {item.detail && <span className="scope-list__detail">{item.detail}</span>}
                  {item.status && <StatusBadge status={item.status} />}
                </li>
              ))}
            </ul>
          </DialogSection>

          <DialogSection title="My contribution" show={hasItems(project.contribution)}>
            <ul className="dialog-list">
              {project.contribution?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </DialogSection>

          <DialogSection
            title="Results"
            show={hasItems(project.results) || hasItems(media.results)}
          >
            {hasItems(project.results) && (
              <ul className="dialog-list dialog-list--results">
                {project.results.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {media.results.map(figure)}
          </DialogSection>

          <DialogSection title="Research connection" show={project.research}>
            {project.research && <ResearchReference research={project.research} />}
          </DialogSection>

          <DialogSection title="Direction" show={project.direction}>
            <p>{project.direction}</p>
          </DialogSection>

          {project.note && <p className="project-dialog__note">{project.note}</p>}
        </div>

        <aside className="project-dialog__aside" aria-label="Technical details">
          <DialogSection title="Hardware" show={hasItems(project.hardware)}>
            <TechTags items={project.hardware ?? []} label="Hardware" />
          </DialogSection>
          <DialogSection title="Software" show={hasItems(project.software)}>
            <TechTags items={project.software ?? []} label="Software" />
          </DialogSection>
          <DialogSection title="Technical stack" show={!hasStack && hasItems(project.technologies)}>
            <TechTags items={project.technologies} />
          </DialogSection>
          <DialogSection title="Links" show={links.length > 0}>
            <ul className="dialog-links">
              {links.map(([key, label]) => (
                <li key={key}>
                  <ExternalLink href={project.links[key]}>{label}</ExternalLink>
                </li>
              ))}
            </ul>
          </DialogSection>
        </aside>
      </div>

      <DialogSection
        title="Media"
        show={hasItems(media.gallery)}
        className="project-dialog__gallery"
      >
        <MediaGallery items={media.gallery} videoProps={videoProps} />
      </DialogSection>
    </div>
  );
}
