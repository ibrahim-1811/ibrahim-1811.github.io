import { featuredProjects } from '../../content/projects';
import Container from '../layout/Container';
import SectionHeading from '../layout/SectionHeading';
import ProjectFeature from './ProjectFeature';
export default function FeaturedProjects() {
  return <section id="work" tabIndex={-1} className="section work-section" aria-labelledby="work-heading"><Container>
    <SectionHeading id="work-heading" eyebrow="01 / Engineering" title="Selected Engineering Work" description="Manipulation, learning and autonomy — from integrated workcells to interpretable multi-robot systems." />
    <div className="flagship-projects">{featuredProjects.slice(0,3).map(project => <ProjectFeature key={project.slug} project={project} />)}</div>
    <div className="competition-projects">{featuredProjects.slice(3).map(project => <ProjectFeature key={project.slug} project={project} compact />)}</div>
  </Container></section>;
}
