import { experience } from '../../content/experience';
import Container from '../layout/Container';
import SectionHeading from '../layout/SectionHeading';
import Icon from '../ui/Icon';
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
                {/* Decorative: the company name is right beside it. */}
                <span
                  className={`experience-logo${item.logo ? '' : ' experience-logo--initial'}`}
                  aria-hidden="true"
                >
                  {item.logo ? (
                    <img src={item.logo} alt="" loading="lazy" decoding="async" />
                  ) : (
                    item.company.charAt(0)
                  )}
                </span>
                <h3>
                  {item.website ? (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.company} (opens in a new tab)`}
                    >
                      {item.company}
                      <Icon name="external" size={13} />
                    </a>
                  ) : (
                    item.company
                  )}
                </h3>
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
