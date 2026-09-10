import { currentFocus } from '../../content/focus';
import Container from '../layout/Container';
export default function CurrentFocus() {
  return (
    <section className="current-focus" aria-labelledby="focus-heading">
      <Container>
        <p className="eyebrow">Looking ahead</p>
        <h2 id="focus-heading">Current Focus</h2>
        <div className="focus-grid">
          {currentFocus.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="technical-label">{item.tech}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
