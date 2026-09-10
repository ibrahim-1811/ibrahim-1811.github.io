import SiteHeader from './components/navigation/SiteHeader';
import Hero from './components/home/Hero';
import CredibilityStrip from './components/home/CredibilityStrip';
import ProjectsSection from './components/projects/ProjectsSection';
import CurrentFocus from './components/home/CurrentFocus';
import ResearchPreview from './components/home/ResearchPreview';
import ExperiencePreview from './components/home/ExperiencePreview';
import Capabilities from './components/home/Capabilities';
import About from './components/home/About';
import SiteFooter from './components/layout/SiteFooter';
import { ProjectDialogProvider } from './features/projects/ProjectDialogProvider';

export default function App() {
  return (
    <ProjectDialogProvider>
      <div id="top" tabIndex={-1}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <CredibilityStrip />
          <ProjectsSection />
          <CurrentFocus />
          <ResearchPreview />
          <ExperiencePreview />
          <Capabilities />
          <About />
        </main>
        <SiteFooter />
      </div>
    </ProjectDialogProvider>
  );
}
