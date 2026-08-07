import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileSystemNode } from '../../types';
import { openWindow } from '../../actions/main';
// Import components
import { Desktop } from '../Desktop/Desktop';
import DesktopBottomBar from '../DesktopBottomBar/DesktopBottomBar';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const DEEP_LINKS: Record<string, string> = {
  '/projets': 'projets',
  '/artquiz': 'artquiz',
  '/stolify': 'stolify',
  '/resume':  'resume',
};

const WINDOW_TO_PATH: Record<string, string> = {
  projets: '/projets',
  artquiz: '/artquiz',
  stolify: '/stolify',
  resume:  '/resume',
};

const DeepLinkHandler = () => {
  const dispatch = useDispatch();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    const path = window.location.pathname.replace(/\/$/, '');
    const windowId = DEEP_LINKS[path];
    if (windowId) {
      handled.current = true;
      dispatch(openWindow(windowId as any));
    }
  }, []);

  return null;
};

const URLSyncHandler = () => {
  const openWindows: string[] = useSelector((state: any) => state.main.openWindows);

  useEffect(() => {
    const linkable = openWindows.filter((id) => WINDOW_TO_PATH[id]);
    const newPath = linkable.length > 0 ? WINDOW_TO_PATH[linkable[linkable.length - 1]] : '/';
    if (window.location.pathname.replace(/\/$/, '') !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  }, [openWindows]);

  return null;
};

interface MainProps {
  fetchProjects: () => void;
  fileSystem: FileSystemNode | null;
  loadingState: boolean;
}

const Main: React.FC<MainProps> = ({ fetchProjects, fileSystem, loadingState }) => {
  const [showLoader, setShowLoader] = useState(true);

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
