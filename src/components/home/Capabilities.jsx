import { capabilities } from '../../content/capabilities';
import Container from '../layout/Container';
import SectionHeading from '../layout/SectionHeading';
export default function Capabilities() {
  return (
    <section className="section" aria-labelledby="capabilities-heading">
      <Container>
        <SectionHeading
          id="capabilities-heading"
          eyebrow="04 / Technical toolkit"
          title="Technical Capabilities"
          description="The tools behind the work, organized by engineering capability."
        />
        <div className="capability-grid">
          {capabilities.map((group) => (
            <div key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
