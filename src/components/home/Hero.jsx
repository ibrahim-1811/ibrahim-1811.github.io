import { profile } from '../../content/profile';
import Container from '../layout/Container';
import ButtonLink from '../ui/ButtonLink';
import Icon from '../ui/Icon';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-location">
            Robotics & autonomous systems <span>{profile.location}</span>
          </p>
          <h1 id="hero-heading">{profile.name}</h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-intro">
            {profile.intro} My work connects industrial manipulation with Physical AI and robot
            learning.
          </p>
          <div className="hero-actions">
            <ButtonLink href="#work">
              View Projects <Icon />
            </ButtonLink>
            <ButtonLink href={profile.resume} variant="secondary" download>
              Download CV <Icon name="download" />
            </ButtonLink>
          </div>
          <div className="social-links">
            <a href={profile.github}>
              GitHub <Icon name="external" size={16} />
            </a>
            <a href={profile.linkedin}>
              LinkedIn <Icon name="external" size={16} />
            </a>
          </div>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <img
              src="/images/profile/mohammad-memon.jpg"
              alt="Mohammad Ibrahim Memon"
              width="897"
              height="1280"
              fetchPriority="high"
            />
          </div>
          <figcaption>
            <span className="portrait-rule" aria-hidden="true" />
            <span>
              From simulation
              <br />
              to robotic systems.
            </span>
          </figcaption>
        </figure>
        <ul className="hero-focus" aria-label="Focus areas">
          {profile.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
