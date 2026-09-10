import { research } from '../../content/research';
import { useProjectDialog } from '../../features/projects/ProjectDialogProvider';
import { getProject } from '../../features/projects/projectData';
import Container from '../layout/Container';
import SectionHeading from '../layout/SectionHeading';
import Icon from '../ui/Icon';

export default function ResearchPreview() {
  const { openProject } = useProjectDialog();
  return (
    <section id="research" tabIndex={-1} className="section" aria-labelledby="research-heading">
      <Container>
        <SectionHeading
          id="research-heading"
          eyebrow="02 / Research"
          title="Research and Publications"
          description="Interpretable decisions for systems that act in the physical world."
        />
        <div className="research-list">
          {research.map((item) => {
            const project = item.project ? getProject(item.project) : null;
            return (
              <article className="research-item" key={item.title}>
                <div className="research-meta">
                  <span>{item.type}</span>
                  {item.year && <span className="technical-label">{item.year}</span>}
                </div>
                <div>
                  <h3>{item.href ? <a href={item.href}>{item.title}</a> : item.title}</h3>
                  <p className="research-venue">{item.venue}</p>
                  {item.note && <p className="research-note">{item.note}</p>}
                  {project && (
                    <button
                      type="button"
                      className="text-button"
                      aria-haspopup="dialog"
                      aria-label={`View project: ${project.shortTitle}`}
                      data-project-trigger={project.slug}
                      onClick={(event) => openProject(project.slug, event.currentTarget)}
                    >
                      View project
                      <Icon name="arrow" size={15} />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
