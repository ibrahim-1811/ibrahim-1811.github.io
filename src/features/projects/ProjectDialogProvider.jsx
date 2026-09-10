import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ProjectDialog from '../../components/projects/ProjectDialog';
import { getProject } from './projectData';

export const PROJECT_PARAM = 'project';
const HISTORY_MARK = 'projectDialog';
const ProjectDialogContext = createContext(null);

function readSlugFromUrl() {
  const slug = new URLSearchParams(window.location.search).get(PROJECT_PARAM);
  return slug && getProject(slug) ? slug : null;
}

function urlWithProject(slug) {
  const url = new URL(window.location.href);
  if (slug) {
    url.searchParams.set(PROJECT_PARAM, slug);
    url.hash = '';
  } else {
    url.searchParams.delete(PROJECT_PARAM);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

function focusTrigger(slug, trigger) {
  const target =
    trigger?.isConnected && trigger.dataset.projectTrigger === slug
      ? trigger
      : (document.querySelector(`[data-project-trigger="${slug}"]`) ?? trigger);
  target?.focus();
}

/**
 * Owns which project dialog is open. Opening pushes `?project=<slug>` so the URL can be
 * shared and the browser Back button closes the dialog; focus returns to the card.
 */
export function ProjectDialogProvider({ children }) {
  const [slug, setSlug] = useState(readSlugFromUrl);
  const triggerRef = useRef(null);
  const lastSlugRef = useRef(null);
  const ownsHistoryEntryRef = useRef(Boolean(slug && window.history.state?.[HISTORY_MARK]));
  const ignoreNextPopRef = useRef(false);

  const openProject = useCallback((nextSlug, trigger) => {
    if (!getProject(nextSlug)) return;
    triggerRef.current = trigger ?? document.activeElement;
    setSlug(nextSlug);
    window.history.pushState({ [HISTORY_MARK]: true }, '', urlWithProject(nextSlug));
    ownsHistoryEntryRef.current = true;
  }, []);

  const showProject = useCallback((nextSlug) => {
    if (!getProject(nextSlug)) return;
    setSlug(nextSlug);
    window.history.replaceState(window.history.state, '', urlWithProject(nextSlug));
  }, []);

  const closeProject = useCallback(() => {
    setSlug(null);
    if (ownsHistoryEntryRef.current) {
      ownsHistoryEntryRef.current = false;
      ignoreNextPopRef.current = true;
      window.history.back();
    } else {
      window.history.replaceState(window.history.state, '', urlWithProject(null));
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      if (ignoreNextPopRef.current) {
        ignoreNextPopRef.current = false;
        // Scroll restoration can run after popstate; keep the restored card in view.
        requestAnimationFrame(() => document.activeElement?.scrollIntoView?.({ block: 'nearest' }));
        return;
      }
      const next = readSlugFromUrl();
      ownsHistoryEntryRef.current = Boolean(next && window.history.state?.[HISTORY_MARK]);
      setSlug(next);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (slug) {
      lastSlugRef.current = slug;
      return;
    }
    if (!lastSlugRef.current) return;
    focusTrigger(lastSlugRef.current, triggerRef.current);
    lastSlugRef.current = null;
    triggerRef.current = null;
  }, [slug]);

  const value = useMemo(() => ({ openProject }), [openProject]);
  const project = slug ? getProject(slug) : null;

  return (
    <ProjectDialogContext.Provider value={value}>
      {children}
      {project && (
        <ProjectDialog project={project} onClose={closeProject} onNavigate={showProject} />
      )}
    </ProjectDialogContext.Provider>
  );
}

export function useProjectDialog() {
  const context = useContext(ProjectDialogContext);
  if (!context) throw new Error('useProjectDialog requires ProjectDialogProvider');
  return context;
}
