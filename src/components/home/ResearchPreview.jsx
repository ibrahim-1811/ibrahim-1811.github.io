import { research } from '../../content/research';
import Container from '../layout/Container';
import SectionHeading from '../layout/SectionHeading';
export default function ResearchPreview() {
  return <section id="research" tabIndex={-1} className="section" aria-labelledby="research-heading"><Container>
    <SectionHeading id="research-heading" eyebrow="02 / Research" title="Research and Publications" description="Interpretable decisions for systems that act in the physical world." />
    <div className="research-list">{research.map(item => <article className="research-item" key={item.title}>
      <div className="research-meta"><span>{item.type}</span>{item.year && <span className="technical-label">{item.year}</span>}</div>
      <div><h3>{item.href ? <a href={item.href}>{item.title}</a> : item.title}</h3><p className="research-venue">{item.venue}</p>{item.note && <p className="research-note">{item.note}</p>}</div>
    </article>)}</div>
  </Container></section>;
}
