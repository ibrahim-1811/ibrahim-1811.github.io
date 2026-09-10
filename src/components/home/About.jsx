import { profile } from '../../content/profile';
import Container from '../layout/Container';
export default function About() {
  return <section id="about" tabIndex={-1} className="section about-section" aria-labelledby="about-heading"><Container className="about-grid">
    <div><p className="eyebrow">05 / Perspective</p><h2 id="about-heading">About</h2></div>
    <div><p className="about-lead">{profile.about}</p><p>I am pursuing an M.Sc. in Autonomous Systems at {profile.education.institution}, based in {profile.location}. Expected graduation: {profile.education.expected}.</p></div>
  </Container></section>;
}
