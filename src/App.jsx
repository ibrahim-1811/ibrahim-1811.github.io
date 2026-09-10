import SiteHeader from './components/navigation/SiteHeader';
import Hero from './components/home/Hero';
import CredibilityStrip from './components/home/CredibilityStrip';
import FeaturedProjects from './components/home/FeaturedProjects';
import CurrentFocus from './components/home/CurrentFocus';
import ResearchPreview from './components/home/ResearchPreview';
import ExperiencePreview from './components/home/ExperiencePreview';
import Capabilities from './components/home/Capabilities';
import About from './components/home/About';
import SiteFooter from './components/layout/SiteFooter';

export default function App() {
  return (
    <div id="top" tabIndex={-1}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <CredibilityStrip />
        <FeaturedProjects />
        <CurrentFocus />
        <ResearchPreview />
        <ExperiencePreview />
        <Capabilities />
        <About />
      </main>
      <SiteFooter />
    </div>
  );
}
