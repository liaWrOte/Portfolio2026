import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileSystemNode } from '../../types';
import { openWindow, openFolder, openProject, setLanguage } from '../../actions/main';
import { slugify, categoryToSlug, slugToCategory } from '../../utils/projectSlug';
// Import components
import { Desktop } from '../Desktop/Desktop';
import DesktopBottomBar from '../DesktopBottomBar/DesktopBottomBar';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const DEEP_LINKS: Record<string, string> = {
  '/projets':    'projets',
  '/projects':   'projets',
  '/artquiz':    'artquiz',
  '/stolify':    'stolify',
  '/resume':     'resume',
  '/cv.pdf':     'resume',
  '/resume.pdf': 'resume',
  '/contact':    'contact_me',
  '/contact.me': 'contact_me',
};

const getWindowToPath = (windowId: string, lang: 'fr' | 'en'): string | null => {
  switch (windowId) {
    case 'artquiz':    return '/artquiz';
    case 'stolify':    return '/stolify';
    case 'resume':     return lang === 'en' ? '/resume.pdf' : '/cv.pdf';
    case 'contact_me': return '/contact.me';
    default:           return null;
  }
};

// ── Deep-link handler ──────────────────────────────────────────────────────────
// Parses the URL on first render and dispatches the right navigation actions.
// For project URLs (/projets/cat/proj), defers the folder+project navigation
// until the fileSystem arrives from Strapi (async).
const DeepLinkHandler = () => {
  const dispatch = useDispatch();
  const handled = useRef(false);
  const pendingNav = useRef<{ categoryName: string; projectSlug: string } | null>(null);
  const fileSystem    = useSelector((s: any) => s.main.fileSystem);
  const fileSystemEn  = useSelector((s: any) => s.main.fileSystemEn);

  // First render: parse URL
  useEffect(() => {
    if (handled.current) return;
    const path = window.location.pathname.replace(/\/$/, '');

    // Non-project deep links (artquiz, stolify, resume)
    const simpleId = DEEP_LINKS[path];
    if (simpleId && simpleId !== 'projets') {
      handled.current = true;
      dispatch(openWindow(simpleId as any));
      return;
    }

    // Project paths: /projets[/cat[/proj]] or /projects[/cat[/proj]]
    const match = path.match(/^\/(projets|projects)(?:\/([^/]+)(?:\/([^/]+))?)?$/);
    if (match) {
      handled.current = true;
      const lang: 'fr' | 'en' = match[1] === 'projects' ? 'en' : 'fr';
      dispatch(setLanguage(lang));
      dispatch(openWindow('projets' as any));

      const catSlug = match[2] ? decodeURIComponent(match[2]) : undefined;
      const projSlug = match[3] ? decodeURIComponent(match[3]) : undefined;

      if (catSlug) {
        const categoryName = slugToCategory(catSlug);
        if (categoryName) {
          if (projSlug) {
            pendingNav.current = { categoryName, projectSlug: projSlug };
          } else {
            dispatch(openFolder(categoryName));
          }
        }
      }
    }
  }, []);

  // Resolve deferred project navigation when fileSystem(s) arrive
  useEffect(() => {
    if (!pendingNav.current) return;
    if (!fileSystem && !fileSystemEn) return;

    const { categoryName, projectSlug } = pendingNav.current;

    const findProject = (fs: any) => {
      if (!fs) return null;
      const cat = fs.children?.find((c: any) => c.id === categoryName || c.name === categoryName);
      if (!cat) return null;
      return cat.children?.find((p: any) => slugify(p.name) === projectSlug) ?? null;
    };

    const projNode = findProject(fileSystemEn) ?? findProject(fileSystem);

    // Give up if both filesystems are loaded and nothing matched (bad URL)
    if (!projNode) {
      if (fileSystem && fileSystemEn) pendingNav.current = null;
      return;
    }

    pendingNav.current = null;
    dispatch(openFolder(categoryName));
    dispatch(openProject(String(projNode.id)));
  }, [fileSystem, fileSystemEn]);

  return null;
};

// ── URL sync handler ───────────────────────────────────────────────────────────
// Keeps the browser URL in sync with the current Redux navigation state.
const URLSyncHandler = () => {
  const openWindows  = useSelector((s: any) => s.main.openWindows as string[]);
  const windowView   = useSelector((s: any) => s.main.window?.view as string | undefined);
  const navigation   = useSelector((s: any) => s.main.navigation);
  const fileSystem   = useSelector((s: any) => s.main.fileSystem);
  const fileSystemEn = useSelector((s: any) => s.main.fileSystemEn);
  const language     = useSelector((s: any) => s.main.language as 'fr' | 'en');

  useEffect(() => {
    let newPath: string;
    const projetsOpen   = openWindows.includes('projets');
    const otherLinkable = openWindows.filter((id) => getWindowToPath(id, language) !== null);

    if (projetsOpen) {
      const base = language === 'en' ? '/projects' : '/projets';
      const fs   = language === 'en' && fileSystemEn ? fileSystemEn : fileSystem;
      const currentPath: string[] = navigation?.currentPath ?? ['root'];

      if (windowView === 'project' && fs) {
        const projectId = String(currentPath[currentPath.length - 1] ?? '');
        let catId: string | null = null;
        let projNode: any = null;

        if (currentPath.length >= 3) {
          catId = String(currentPath[currentPath.length - 2] ?? '');
          const catNode = fs.children?.find((c: any) => String(c.id) === catId || c.id === catId);
          projNode = catNode?.children?.find((p: any) => String(p.id) === projectId);
        }

        if (!projNode) {
          for (const cat of (fs.children ?? [])) {
            const found = cat.children?.find((p: any) => String(p.id) === projectId);
            if (found) { catId = String(cat.id); projNode = found; break; }
          }
        }

        if (catId && projNode) {
          newPath = `${base}/${categoryToSlug(catId, language)}/${slugify(projNode.name)}`;
        } else {
          newPath = base;
        }
      } else if (windowView === 'folder' && currentPath.length >= 2) {
        const categoryId = String(currentPath[currentPath.length - 1] ?? '');
        if (categoryId && categoryId !== 'root') {
          newPath = `${base}/${categoryToSlug(categoryId, language)}`;
        } else {
          newPath = base;
        }
      } else {
        newPath = base;
      }
    } else if (otherLinkable.length > 0) {
      newPath = getWindowToPath(otherLinkable[otherLinkable.length - 1], language) ?? '/';
    } else {
      newPath = '/';
    }

    if (window.location.pathname.replace(/\/$/, '') !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  }, [openWindows, windowView, navigation, fileSystem, fileSystemEn, language]);

  return null;
};

// ── Main ───────────────────────────────────────────────────────────────────────

interface MainProps {
  fetchProjects: () => void;
  fileSystem: FileSystemNode | null;
  loadingState: boolean;
}

const _initPath = window.location.pathname.replace(/\/$/, '');
const isDeepLink =
  Object.keys(DEEP_LINKS).includes(_initPath) ||
  /^\/(projets|projects)(\/|$)/.test(_initPath);

const Main: React.FC<MainProps> = ({ fetchProjects, fileSystem, loadingState }) => {
  const [showLoader, setShowLoader] = useState(!isDeepLink);

  useEffect(() => {
    fetchProjects();
  }, []);

  if (showLoader) return <LoadingScreen onComplete={() => setShowLoader(false)} />;
  if (loadingState) return null;
  if (fileSystem === null) return null;

  return (
    <div>
      <Desktop />
      <DesktopBottomBar />
      <DeepLinkHandler />
      <URLSyncHandler />
    </div>
  );
};
export default Main;
