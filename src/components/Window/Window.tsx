import React, { useEffect, useState, Suspense, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';
import { RootState } from '../../store';
import { FileSystemNode, Project } from '../../types';
import { useTranslation } from '../../contexts/LanguageContext';

// Import State selectors
import { getCurrentNode, getProjectById } from '../../selectors/explorerSelectors';

// Import backend URL for backend calls
import { backendUrl } from '../../middlewares/env';

// Import styles
import './window.scss';

// Import components
import Loader from '../Loader/Loader';
import WindowHeader from '../../containers/windowHeader';
import SidebarTree from './../../containers/sidebarTree';
import ExplorerView from '../ExplorerView/ExplorerView';
import ProjectView from '../ProjectView/ProjectView';
import IconGrid from '../../containers/iconGrid';
import Stolify from '../Stolify/Stolify';
import ArtQuizApp from '../ArtQuiz/App';

interface WindowProps {
  displayWindow: boolean;
  displayProjects: boolean;
  displayImageItem: boolean;
  windowItemId: string;
  displayResume: boolean;
  displayArtquiz: boolean;
  position?: { x: number; y: number };
  windowPosition?: { x: number; y: number };
  isOpen: boolean;
  fileSystem: FileSystemNode;
  view: string;
  minimizedWindows: string[];
  openWindows: any[];
  currentPath: string[];
  openFolder: (id: string) => void;
}

const Window: React.FC<WindowProps> = ({
  displayWindow,
  displayProjects,
  displayImageItem,
  windowItemId,
  displayResume,
  displayArtquiz,
  position,
  windowPosition,
  isOpen,
  fileSystem,
  view,
  minimizedWindows,
  openWindows,
  currentPath,
  openFolder
}) => {
  // Window positioning
  const boxRef = useRef(null);

  // Default to center of screen, but allow override with position prop
  const getDefaultPosition = (windowId?: string) => {
    if (position && typeof position === 'object') {
      return position;
    }

    // Get desktop dimensions (excluding taskbar, etc.)
    const desktopWidth = window.innerWidth;
    const desktopHeight = window.innerHeight - 80; // Subtract desktop bar height

    // Center window precisely - get dimensions from CSS
    const getWindowDimensions = () => {
      // Create a temporary element to measure CSS dimensions
      const tempEl = document.createElement('div');
      tempEl.style.position = 'fixed';
      tempEl.style.width = '750px';
      tempEl.style.height = '515px';
      tempEl.style.visibility = 'hidden';
      document.body.appendChild(tempEl);

      const rect = tempEl.getBoundingClientRect();
      document.body.removeChild(tempEl);

      return {
        width: rect.width,
        height: rect.height
      };
    };

    const windowDimensions = getWindowDimensions();

    // Add offset based on window index in openWindows
    let windowIndex = 0;
    if (windowId && openWindows) {
      windowIndex = openWindows.indexOf(windowId);
    }
    const offset = windowIndex * 50;

    return {
      x: Math.max(0, (desktopWidth - windowDimensions.width) / 2 + offset),
      y: Math.max(0, (desktopHeight - windowDimensions.height) / 2 + offset)
    };
  };

  // Positions are derived per-window from openWindows on every render, so that
  // a window mounting (opening) always reads the offset that matches its
  // current index in openWindows. Using state here would lag one render
  // behind at mount time (Draggable only reads defaultPosition once, on mount).
  const projetsPos = getDefaultPosition('projets');
  const resumePos = getDefaultPosition('resume');
  const contactPos = getDefaultPosition('contact_me');
  const stolifyPos = getDefaultPosition('stolify');
  const artquizPos = getDefaultPosition('artquiz');

  // Force a re-render on resize so newly-opened windows still center correctly
  const [, forceRerender] = useState(0);
  useEffect(() => {
    const handleResize = () => forceRerender((n) => n + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // z-index stacking: each window gets an incrementing z-index, the most
  // recently opened or clicked window always ends up on top.
  const zIndexCounterRef = useRef(1);
  const [zIndexes, setZIndexes] = useState<Record<string, number>>({});

  const bringToFront = (windowId: string) => {
    if (zIndexes[windowId] === zIndexCounterRef.current) return;
    zIndexCounterRef.current += 1;
    setZIndexes((prev) => ({ ...prev, [windowId]: zIndexCounterRef.current }));
  };

  const getZIndex = (windowId: string) => zIndexes[windowId] ?? 1;

  // Bring newly opened windows to front automatically
  const prevOpenWindowsRef = useRef<any[]>([]);
  useEffect(() => {
    const prevOpenWindows = prevOpenWindowsRef.current;
    const newlyOpened = (openWindows || []).filter((id) => !prevOpenWindows.includes(id));
    newlyOpened.forEach((id) => bringToFront(id));
    prevOpenWindowsRef.current = openWindows || [];
  }, [openWindows]);

  // OPEN_WINDOW sets windowItemId on every dispatch, even when the window is
  // already open (it's just not re-added to openWindows). Use that signal to
  // bring an already-open window to the front when its item is clicked again.
  useEffect(() => {
    if (windowItemId && openWindows && openWindows.includes(windowItemId)) {
      bringToFront(windowItemId);
    }
  }, [windowItemId]);

  // Handle z-index on click/drag: bring the targeted window to the front
  function handleZIndex(windowId: string) {
    bringToFront(windowId);
  }

  // Handle minifying window
  const [isMinified, minify] = useState(false);
  const [showStyle, setShowStyle] = useState(true);

  useEffect(() => {
    if (displayWindow) {
      // setShowStyle(true);
      setTimeout(() => setShowStyle(false), 1000);
      // return () => clearTimeout(timeout);
    }
  }, [displayWindow]);

  useEffect(() => {
    // This useEffect seems to be expecting an array but displayProjects is boolean
    // Commenting out for now to prevent the error
    // TODO: Fix this logic based on the actual data structure needed
    // if (!displayProjects || displayProjects.length === 0) return;
    //
    // const projectOpen = displayProjects.find(
    //   (item) => item?.projectOpen && item.projectOpen !== 0
    // );
    // if (projectOpen && projectOpen.attributes) {
    //   setHeaderlabel('/' + projectOpen.attributes.title);
    // }
  }, [fileSystem]);

  const [headerLabel, setHeaderlabel] = useState('');

  // Get current node and active project from Redux store
  const mainState = useSelector((state: any) => state.main);
  const node = useSelector((state: any) => getCurrentNode(state.main));
  // Get active project by ID
  const activeProject = useSelector((state: any) => getProjectById(state.main, windowItemId));
  const { t } = useTranslation();

  // Mapping for window labels to match outWindowLabel
  const getWindowLabel = (windowId) => {
    switch (windowId) {
      case 'projets':
        return t('projects');
      case 'resume':
        return t('resume');
      case 'contact_me':
        return t('contact');
      case 'artquiz':
        return t('artquiz');
      case 'stolify':
        return t('stolify');
      default:
        return windowId;
    }
  };

  // Check if a window is minimized
  const isWindowMinimized = (windowId) => {
    return minimizedWindows && minimizedWindows.includes(windowId);
  };

  // Check if a window should be displayed
  const shouldDisplayWindow = (windowId) => {
    return openWindows && openWindows.includes(windowId) && !isWindowMinimized(windowId);
  };

  // Get window index for positioning
  const getWindowIndex = (windowId) => {
    if (!openWindows) return 0;
    const visibleWindows = openWindows.filter((id) => !isWindowMinimized(id));
    return visibleWindows.indexOf(windowId);
  };

  return (
    <>
      {/* File explorer and projects */}
      {shouldDisplayWindow('projets') && fileSystem && (
        <Draggable
          bounds={'.desktop'}
          handle={'.window-header-container'}
          onStart={() => handleZIndex('projets')}
          key={'projets'}
          defaultPosition={projetsPos}
          nodeRef={boxRef}
        >
          <div
            className={`window ${isMinified ? 'minified' : ''}`}
            onClick={() => handleZIndex('projets')}
            style={{ zIndex: getZIndex('projets') }}
            origin={position}
            ref={boxRef}
          >
            {/* Window Header  */}
            <WindowHeader
              label={getWindowLabel('projets')}
              minify={minify}
              isMinified={isMinified}
              closeAnimState={showStyle}
              closeAnim={setShowStyle}
              itemId={'projets'}
              currentPath={currentPath}
              fileSystem={fileSystem}
              openFolder={openFolder}
            />

            <div className="window-item-container">
              {/* SidebarTree for explorer navigation */}
              <SidebarTree />

              <div className="window-right-items">
                {/* Explorer view */}
                {fileSystem && view && view === 'explorer' && (
                  <ExplorerView view={view} node={fileSystem} />
                )}

                {/* Folder view */}
                {fileSystem && view && view === 'folder' && node && (
                  <IconGrid items={node.children || []} isIconGrid={true} />
                )}

                {/* Project View  */}
                {fileSystem && view && view === 'project' && (
                  <ProjectView node={activeProject ?? node} />
                )}
              </div>
            </div>
          </div>
        </Draggable>
      )}

      {/* Resume  */}
      {shouldDisplayWindow('resume') && (
        <Draggable
          bounds={'.App'}
          onStart={() => handleZIndex('resume')}
          handle={'.window-header-container'}
          defaultPosition={resumePos}
        >
          <div
            className={`window level-class-third`}
            key={'resume'}
            onClick={() => handleZIndex('resume')}
            style={{ zIndex: getZIndex('resume') }}
          >
            <WindowHeader
              label={getWindowLabel('resume')}
              itemId={'resume'}
              minify={minify}
              isMinified={isMinified}
              currentPath={null}
              fileSystem={null}
              openFolder={openFolder}
              useOnlyLabel={true}
            />
            <iframe
              src="https://heady-salto-322.notion.site/ebd//2aadb394a5ab8121bd4afde3e99c9a7f"
              width="100%"
              height="100%"
              frameborder="0"
              allowfullscreen
              title="resume"
            />
          </div>
        </Draggable>
      )}

      {/* Contact Me */}
      {shouldDisplayWindow('contact_me') && (
        <Draggable
          bounds={'.App'}
          onStart={() => handleZIndex('contact_me')}
          handle={'.window-header-container'}
          defaultPosition={contactPos}
        >
          <div
            className={`window level-class-fourth`}
            key={'contact_me'}
            onClick={() => handleZIndex('contact_me')}
            style={{ zIndex: getZIndex('contact_me') }}
          >
            <WindowHeader
              label={getWindowLabel('contact_me')}
              itemId={'contact_me'}
              minify={minify}
              isMinified={isMinified}
              currentPath={null}
              fileSystem={null}
              openFolder={openFolder}
              useOnlyLabel={true}
            />
            <div style={{ padding: '20px', height: 'calc(100% - 40px)', overflow: 'auto' }}>
              <h2>Contactez-moi</h2>
              <p>Vous pouvez me contacter via :</p>
              <ul>
                <li>Email : sandrine@example.com</li>
                <li>LinkedIn : linkedin.com/in/sandrine-mze</li>
                <li>GitHub : github.com/sandrine</li>
              </ul>
            </div>
          </div>
        </Draggable>
      )}

      {/* Stolify */}
      {shouldDisplayWindow('stolify') && (
        <Draggable
          bounds={'.App'}
          onStart={() => handleZIndex('stolify')}
          handle={'.window-header-container'}
          defaultPosition={stolifyPos}
        >
          <div
            className={`window level-class-fourth stolify-main-window`}
            key={'stolify'}
            onClick={() => handleZIndex('stolify')}
            style={{ zIndex: getZIndex('stolify') }}
          >
            <WindowHeader
              label={getWindowLabel('stolify')}
              itemId={'stolify'}
              minify={minify}
              isMinified={isMinified}
              currentPath={null}
              fileSystem={null}
              openFolder={openFolder}
              useOnlyLabel={true}
            />
            <div className="window-item-container stolify-window">
              <Stolify />
            </div>
          </div>
        </Draggable>
      )}

      {/* ArtQuiz */}
      {shouldDisplayWindow('artquiz') && (
        <Draggable
          bounds={'.App'}
          onStart={() => handleZIndex('artquiz')}
          handle={'.window-header-container'}
          defaultPosition={artquizPos}
        >
          <div
            className={`window level-class-fourth artquiz-main-window`}
            style={{ width: '450px', height: '750px', zIndex: getZIndex('artquiz') }}
            key={'artquiz'}
            onClick={() => handleZIndex('artquiz')}
          >
            <WindowHeader
              label={getWindowLabel('artquiz')}
              itemId={'artquiz'}
              minify={minify}
              isMinified={isMinified}
              currentPath={null}
              fileSystem={null}
              openFolder={openFolder}
              useOnlyLabel={true}
            />
            <div
              className="window-item-container artquiz-window"
              style={{ width: '100%', height: '100%' }}
            >
              <ArtQuizApp />
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default Window;
