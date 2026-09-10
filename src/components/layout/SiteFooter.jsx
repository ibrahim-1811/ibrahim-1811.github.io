import { profile } from '../../content/profile';
import Container from './Container';
import Icon from '../ui/Icon';
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-main">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let’s talk robotics.</h2>
            <p>Engineering opportunities, research and collaboration.</p>
          </div>
          <a
            className="contact-link"
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.email}`}
          >
            {profile.email}
            <Icon name="external" />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            {profile.name}
            <span>{profile.location}</span>
          </p>
          <div className="social-links">
            <a href={profile.github}>
              GitHub <Icon name="external" size={15} />
            </a>
            <a href={profile.linkedin}>
              LinkedIn <Icon name="external" size={15} />
            </a>
            <a href={profile.resume}>
              CV <Icon name="download" size={15} />
            </a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
