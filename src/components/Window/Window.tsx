import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { getWindowTargetPosition } from '../../utils/windowPosition';
import { FileSystemNode } from '../../types';
import { useTranslation } from '../../contexts/LanguageContext';

import { getCurrentNode, getProjectById } from '../../selectors/explorerSelectors';
import { backendUrl } from '../../middlewares/env';

import './window.scss';

import Loader from '../Loader/Loader';
import WindowHeader from '../../containers/windowHeader';
import SidebarTree from './../../containers/sidebarTree';
import ExplorerView from '../ExplorerView/ExplorerView';
import ProjectView from '../ProjectView/ProjectView';
import IconGrid from '../../containers/iconGrid';
import Stolify from '../Stolify/Stolify';
import ArtQuizApp from '../ArtQuiz/App';
import ContactMe from '../ContactMe/ContactMe';

interface WindowProps {
  windowItemId: string;
  position?: { x: number; y: number };
  isOpen: boolean;
  fileSystem: FileSystemNode;
  view: string;
  minimizedWindows: string[];
  openWindows: any[];
  currentPath: string[];
  openFolder: (id: string) => void;
}

const Window: React.FC<WindowProps> = ({
  windowItemId,
  position,
  isOpen,
  fileSystem,
  view,
  minimizedWindows,
  openWindows,
  currentPath,
  openFolder
}) => {
  const boxRef = useRef(null);

  const getDefaultPosition = (windowId?: string) => {
    if (position && typeof position === 'object') return position;
    return getWindowTargetPosition(windowId, openWindows);
  };

  const projetsPos = getDefaultPosition('projets');
  const contactPos = getDefaultPosition('contact_me');
  const stolifyPos = getDefaultPosition('stolify');
  const artquizPos = getDefaultPosition('artquiz');

  const [, forceRerender] = useState(0);
  useEffect(() => {
    const handleResize = () => forceRerender((n) => n + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const zIndexCounterRef = useRef(1);
  const [zIndexes, setZIndexes] = useState<Record<string, number>>({});

  const bringToFront = (windowId: string) => {
    if (zIndexes[windowId] === zIndexCounterRef.current) return;
    zIndexCounterRef.current += 1;
    setZIndexes((prev) => ({ ...prev, [windowId]: zIndexCounterRef.current }));
  };

  const getZIndex = (windowId: string) => zIndexes[windowId] ?? 1;

  const prevOpenWindowsRef = useRef<any[]>([]);
  useEffect(() => {
    const prev = prevOpenWindowsRef.current;
    (openWindows || []).filter((id) => !prev.includes(id)).forEach((id) => bringToFront(id));
    prevOpenWindowsRef.current = openWindows || [];
  }, [openWindows]);

  useEffect(() => {
    if (windowItemId && openWindows && openWindows.includes(windowItemId)) {
      bringToFront(windowItemId);
    }
  }, [windowItemId]);

  function handleZIndex(windowId: string) {
    bringToFront(windowId);
  }

  const node = useSelector((state: any) => getCurrentNode(state.main));
  const activeProject = useSelector((state: any) => getProjectById(state.main, windowItemId));
  const { t } = useTranslation();

  const rightPaneRef = useRef<HTMLDivElement>(null);
  const displayedId = (activeProject ?? node)?.id;
  useEffect(() => {
    if (rightPaneRef.current) rightPaneRef.current.scrollTop = 0;
  }, [displayedId]);

  const getWindowLabel = (windowId) => {
    switch (windowId) {
      case 'projets': return t('projects');
      case 'contact_me': return t('contact');
      case 'artquiz': return t('artquiz');
      case 'stolify': return t('stolify');
      default: return windowId;
    }
  };

  const isWindowMinimized = (windowId) =>
    minimizedWindows && minimizedWindows.includes(windowId);

  const shouldDisplayWindow = (windowId) =>
    openWindows && openWindows.includes(windowId) && !isWindowMinimized(windowId);

  return (
    <>
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
            className="window"
            onClick={() => handleZIndex('projets')}
            style={{ zIndex: getZIndex('projets') }}
            data-window-id="projets"
            ref={boxRef}
          >
            <WindowHeader
              label={getWindowLabel('projets')}
              itemId={'projets'}
              currentPath={currentPath}
              fileSystem={fileSystem}
              openFolder={openFolder}
            />
            <div className="window-item-container">
              <SidebarTree />
              <div className="window-right-items" ref={rightPaneRef}>
                {fileSystem && view === 'explorer' && (
                  <ExplorerView view={view} node={fileSystem} />
                )}
                {fileSystem && view === 'folder' && node && (
                  <IconGrid items={node.children || []} />
                )}
                {fileSystem && view === 'project' && (
                  <ProjectView node={activeProject ?? node} />
                )}
              </div>
            </div>
          </div>
        </Draggable>
      )}


      {shouldDisplayWindow('contact_me') && (
        <Draggable
          bounds={'.App'}
          onStart={() => handleZIndex('contact_me')}
          handle={'.window-header-container'}
          defaultPosition={contactPos}
        >
          <div
            className="window level-class-fourth"
            key={'contact_me'}
            onClick={() => handleZIndex('contact_me')}
            style={{ zIndex: getZIndex('contact_me') }}
            data-window-id="contact_me"
          >
            <WindowHeader
              label={getWindowLabel('contact_me')}
              itemId={'contact_me'}
              useOnlyLabel={true}
            />
            <ContactMe />
          </div>
        </Draggable>
      )}

      {shouldDisplayWindow('stolify') && (
        <Draggable
          bounds={'.App'}
          onStart={() => handleZIndex('stolify')}
          handle={'.window-header-container'}
          defaultPosition={stolifyPos}
        >
          <div
            className="window level-class-fourth stolify-main-window"
            key={'stolify'}
            onClick={() => handleZIndex('stolify')}
            style={{ zIndex: getZIndex('stolify') }}
            data-window-id="stolify"
          >
            <WindowHeader
              label={getWindowLabel('stolify')}
              itemId={'stolify'}
              useOnlyLabel={true}
              hideExpandButton={true}
            />
            <div className="window-item-container stolify-window">
              <Stolify />
            </div>
          </div>
        </Draggable>
      )}

      {shouldDisplayWindow('artquiz') && (
        <Draggable
          bounds={'.App'}
          onStart={() => handleZIndex('artquiz')}
          handle={'.window-header-container'}
          defaultPosition={artquizPos}
        >
          <div
            className="window level-class-fourth artquiz-main-window"
            style={{ width: '450px', height: '620px', zIndex: getZIndex('artquiz') }}
            key={'artquiz'}
            onClick={() => handleZIndex('artquiz')}
            data-window-id="artquiz"
          >
            <WindowHeader
              label={getWindowLabel('artquiz')}
              itemId={'artquiz'}
              useOnlyLabel={true}
              hideExpandButton={true}
            />
            <div className="window-item-container artquiz-window" style={{ width: '100%', height: '100%' }}>
              <ArtQuizApp />
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default Window;
