import { useProjectDialog } from '../../features/projects/ProjectDialogProvider';
import { countVideos } from '../../features/projects/projectData';
import Icon from '../ui/Icon';

/** Compact rows for earlier work; each row opens the same project dialog. */
export default function ArchiveList({ projects }) {
  const { openProject } = useProjectDialog();
  return (
    <ul className="archive-list">
      {projects.map((project) => {
        const videos = countVideos(project);
        return (
          <li key={project.slug} id={project.slug} className="archive-item">
            <span className="archive-item__year">{project.year}</span>
            <div className="archive-item__main">
              <h4 className="archive-item__title">
                <button
                  type="button"
                  className="archive-item__trigger"
                  aria-haspopup="dialog"
                  data-project-trigger={project.slug}
                  onClick={(event) => openProject(project.slug, event.currentTarget)}
                >
                  {project.shortTitle}
                </button>
              </h4>
              <p className="archive-item__summary">{project.summary}</p>
            </div>
            <p className="archive-item__tags">{project.technologies.join(' · ')}</p>
            <span className="archive-item__media">
              {videos > 0 && (
                <>
                  <Icon name="play" size={11} />
                  Video
                </>
              )}
            </span>
            <span className="archive-item__arrow" aria-hidden="true">
              <Icon name="arrow" size={16} />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
