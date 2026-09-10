import { projectSection } from '../../content/projects';
import { projectsInTier } from '../../features/projects/projectData';
import { PROJECT_TIERS } from '../../features/projects/vocabulary';
import Container from '../layout/Container';
import SectionHeading from '../layout/SectionHeading';
import ArchiveList from './ArchiveList';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  return (
    <section
      id="work"
      tabIndex={-1}
      className="section work-section"
      aria-labelledby="work-heading"
    >
      <Container>
        <SectionHeading
          id="work-heading"
          eyebrow={projectSection.eyebrow}
          title={projectSection.title}
          description={projectSection.description}
        />
        {PROJECT_TIERS.map((tier) => {
          const tierProjects = projectsInTier(tier);
          if (!tierProjects.length) return null;
          const copy = projectSection.tiers[tier] ?? {};
          return (
            <div key={tier} className={`project-tier project-tier--${tier}`}>
              <div className="project-tier__header">
                <h3 className="project-tier__title">{copy.title}</h3>
                <span className="project-tier__rule" aria-hidden="true" />
                <span className="project-tier__count" aria-hidden="true">
                  {String(tierProjects.length).padStart(2, '0')}
                </span>
              </div>
              {copy.description && <p className="project-tier__description">{copy.description}</p>}
              {tier === 'archive' ? (
                <ArchiveList projects={tierProjects} />
              ) : (
                <div className="project-grid">
                  {tierProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </Container>
    </section>
  );
}
