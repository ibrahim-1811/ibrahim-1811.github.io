import { experience } from '../../content/experience';
import Container from '../layout/Container';
import SectionHeading from '../layout/SectionHeading';
export default function ExperiencePreview() {
  return (
    <section
      id="experience"
      tabIndex={-1}
      className="section experience-section"
      aria-labelledby="experience-heading"
    >
      <Container>
        <SectionHeading
          id="experience-heading"
          eyebrow="03 / In practice"
          title="Experience"
          description="Robotics software and system integration, grounded in hands-on hardware engineering."
        />
        <ol className="experience-list">
          {experience.map((item) => (
            <li key={item.company}>
              <p className="experience-period">{item.period.replace(' - ', ' — ')}</p>
              <div className="experience-role">
                <h3>{item.company}</h3>
                <p>{item.role}</p>
                <span>{item.location}</span>
              </div>
              <p className="experience-summary">{item.summary}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
