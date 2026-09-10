import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { getAdjacentProjects } from '../../features/projects/projectData';
import { useModalDialog } from '../../features/projects/useModalDialog';
import Icon from '../ui/Icon';
import ProjectDialogContent, { DIALOG_LEAD_ID, DIALOG_TITLE_ID } from './ProjectDialogContent';

function ProjectPager({ slug, onNavigate }) {
  const { previous, next } = getAdjacentProjects(slug);
  if (!previous && !next) return null;
  return (
    <nav className="project-pager" aria-label="More projects">
      {previous && (
        <button
          type="button"
          className="project-pager__link project-pager__link--previous"
          onClick={() => onNavigate(previous.slug)}
        >
          <span className="project-pager__label">
            <Icon name="arrow-left" size={15} />
            Previous project
          </span>
          <span className="project-pager__title">{previous.shortTitle}</span>
        </button>
      )}
      {next && (
        <button
          type="button"
          className="project-pager__link project-pager__link--next"
          onClick={() => onNavigate(next.slug)}
        >
          <span className="project-pager__label">
            Next project
            <Icon name="arrow" size={15} />
          </span>
          <span className="project-pager__title">{next.shortTitle}</span>
        </button>
      )}
    </nav>
  );
}

/** Large, accessible project overview rendered above the page in a portal. */
export default function ProjectDialog({ project, onClose, onNavigate }) {
  const layerRef = useRef(null);
  const panelRef = useRef(null);
  useModalDialog({ layerRef, panelRef, onClose });

  return createPortal(
    <div ref={layerRef} className="project-dialog-layer">
      <div className="project-dialog-backdrop" aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={DIALOG_TITLE_ID}
        aria-describedby={DIALOG_LEAD_ID}
        tabIndex={-1}
      >
        <div className="project-dialog__bar">
          <p className="project-dialog__crumb" aria-hidden="true">
            <span>{project.number ?? 'Archive'}</span>
            {project.shortTitle}
          </p>
          <button
            type="button"
            className="icon-button project-dialog__close"
            aria-label="Close project details"
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
        </div>
        <ProjectDialogContent key={project.slug} project={project} panelRef={panelRef} />
        <ProjectPager slug={project.slug} onNavigate={onNavigate} />
      </div>
    </div>,
    document.body,
  );
}
