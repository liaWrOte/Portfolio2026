import React, { useEffect, useState, Suspense, useRef, useLayoutEffect} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ReactMarkdown from "react-markdown";
import { RootState } from '../../store';
import { FileSystemNode, Project } from '../../types';

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
  
  // Get default position for window (centered with offset for multiple windows)
  const getDefaultPosition = (windowIndex = 0) => {
    const desktop = document.querySelector('.desktop');
    if (!desktop) {
      return { x: 100, y: 100 };
    }
    
    const rect = desktop.getBoundingClientRect();
    const desktopWidth = rect.width;
    const desktopHeight = rect.height;
    
    const getWindowDimensions = () => {
      const windowWidth = 800; // Default window width
      const windowHeight = 600; // Default window height
      
      // Try to get actual window dimensions if available
      if (boxRef.current) {
        const windowRect = boxRef.current.getBoundingClientRect();
        return {
          width: windowRect.width || windowWidth,
          height: windowRect.height || windowHeight
        };
      }
      
      return {
        width: windowWidth,
        height: windowHeight
      };
    };
    
    const windowDimensions = getWindowDimensions();
    
    // Calculate center position
    const centerX = Math.max(0, (desktopWidth - windowDimensions.width) / 2);
    const centerY = Math.max(0, (desktopHeight - windowDimensions.height) / 2);
    
    // Add offset based on window index (50px right and down for each additional window)
    const offsetX = windowIndex * 50;
    const offsetY = windowIndex * 50;
    
    return {
      x: centerX + offsetX,
      y: centerY + offsetY
    };
  };

  const [defaultPos, setDefaultPos] = useState(getDefaultPosition());

  useLayoutEffect(() => {
    if (displayWindow && boxRef.current) {
      setDefaultPos(getDefaultPosition());
    }
  }, [displayWindow, position]);

  // Handle window resize to keep window centered
  useEffect(() => {
    const handleResize = () => {
      if (displayWindow && !position) {
        setDefaultPos(getDefaultPosition());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [displayWindow, position]);


  // Handle z-index on click
  function handleZIndex(e) {
    let windows = document.querySelectorAll('.window');
    let maxZ = 0;
    
    // Find the current max z-index
    windows.forEach((el) => {
      let z = parseInt(el.style.zIndex || '0');
      if (z > maxZ) maxZ = z;
    });
    
    // Reset all windows to lower z-index
    windows.forEach((el) => {
      el.style.zIndex = '0';
    });
    
    // Set clicked window to highest z-index
    if (e.target.closest('.window')) {
      e.target.closest('.window').style.zIndex = (maxZ + 1).toString();
    }
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
  }, [fileSystem])

  const [headerLabel, setHeaderlabel] = useState('');

  // Get current node and active project from Redux store
  const mainState = useSelector((state: any) => state.main);
  const node = useSelector((state: any) => getCurrentNode(state.main));
  // Get active project by ID
  const activeProject = useSelector((state: any) => getProjectById(state.main, windowItemId));

  // Mapping for window labels to match outWindowLabel
  const getWindowLabel = (windowId) => {
    switch(windowId) {
      case 'projets':
        return 'Projets';
      case 'resume':
        return 'resume.pdf';
      case 'contact_me':
        return 'contact.me';
      case 'artquiz':
        return 'Artquiz';
      case 'stolify':
        return 'Stolify';
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
    const visibleWindows = openWindows.filter(id => !isWindowMinimized(id));
    return visibleWindows.indexOf(windowId);
  };

    return (
      <>

        {/* File explorer and projects */}
        {shouldDisplayWindow('projets') && fileSystem && 

            <Draggable
              bounds={'.desktop'}
              handle={'.window-header-container'}
              onDrag={(e) => handleZIndex(e)}
              key={Math.random()}
              defaultPosition={getDefaultPosition(getWindowIndex('projets'))}
              nodeRef={boxRef}
            >
              <div
                className={`window ${isMinified ? "minified" : ""}`}
                onClick={(e) => handleZIndex(e)}
                origin={position}
                ref={boxRef}
              >

                {/* Window Header  */}
                <WindowHeader label={getWindowLabel('projets')}
                  minify={minify}
                  isMinified={isMinified}               
                  closeAnimState={showStyle}
                  closeAnim={setShowStyle}
                  itemId={windowItemId}
                  currentPath={currentPath}
                  fileSystem={fileSystem}
                  openFolder={openFolder}
                  />

                <div className="window-item-container">

                  {/* SidebarTree for explorer navigation */}
                  <SidebarTree />

                  <div className="window-right-items">
                    
                    {/* Explorer view */}
                    {fileSystem && view && (view === 'explorer') &&
                      <ExplorerView view={view} node={fileSystem} />
                    }

                    {/* Folder view */}
                    {fileSystem && view && view === 'folder' && node && (
                      <IconGrid items={node.children || []} isIconGrid={true} />
                    )}

                    {/* Project View  */}
                    {fileSystem && view && (view === 'project') &&
                      <ProjectView node={activeProject??node} />
                    }

                  </div>

                </div>

              </div>
            </Draggable>
        }

        {/* Resume  */}
        {shouldDisplayWindow('resume') && 
        
            <Draggable
              bounds={'.App'}
              onDrag={(e) => handleZIndex(e)}
              handle={'.window-header-container'}
              defaultPosition={getDefaultPosition(getWindowIndex('resume'))}
              >
              <div
                className={`window ${isMinified ? "minified" : ""}`}
                key={Math.random()}
                onClick={(e) => handleZIndex(e)}
              >
                <WindowHeader label={getWindowLabel('resume')}
                  itemId={'resume'}
                  minify={minify} isMinified={isMinified}
                  currentPath={null}
                  fileSystem={null}
                  openFolder={openFolder}
                  useOnlyLabel={true}
                />
                <iframe src="https://heady-salto-322.notion.site/ebd//2aadb394a5ab8121bd4afde3e99c9a7f" width="100%" height="100%" frameborder="0" allowfullscreen title="resume" />
              </div>
            </Draggable>
        }

        {/* Contact Me */}
        {shouldDisplayWindow('contact_me') && 
        
            <Draggable
              bounds={'.App'}
              onDrag={(e) => handleZIndex(e)}
              handle={'.window-header-container'}
              defaultPosition={getDefaultPosition(getWindowIndex('contact_me'))}
              >
              <div
                className={`window ${isMinified ? "minified" : ""}`}
                key={Math.random()}
                onClick={(e) => handleZIndex(e)}
              >
                <WindowHeader
                  label={getWindowLabel('contact_me')}
                  itemId={'contact_me'}
                  minify={minify} isMinified={isMinified}
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
        }

      </>
    );

}; 


export default Window;
