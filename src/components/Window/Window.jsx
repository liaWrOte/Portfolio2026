import React, { useEffect, useState, Suspense, useRef, useLayoutEffect} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ReactMarkdown from "react-markdown";

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


const Window = ({
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
  view
}) => {

  // Window positioning
  const boxRef = useRef(null);
  const [defaultPos, setDefaultPos] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (displayWindow && boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
  
      const centerX = window.innerWidth / 2 - rect.width / 2;
      const centerY = window.innerHeight / 2 - rect.height / 2;
  
      setDefaultPos({ x: centerX, y: centerY });
    }
  }, [displayWindow]);


  // Handle z-index on click
  function handleZIndex(e) {
    let windows = document.querySelectorAll('.window');
    windows.forEach((el) => {
      el.style.zIndex = '0';
    });
    if (e.target.closest('.window')) {
      e.target.closest('.window').style.zIndex = '1';
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
    const projectOpen = displayProjects.find(
      (item) => item?.projectOpen && item.projectOpen !== 0
    );
    if (projectOpen) {
      setHeaderlabel('/' + projectOpen.attributes.title);
    }
  }, [fileSystem])

  const [headerLabel, setHeaderlabel] = useState('');

  // Get current node and active project from Redux store
  const node = useSelector(getCurrentNode);
  // Get active project by ID
  const activeProject = useSelector(getProjectById);


    return (
      <>

        {/* File explorer and projects */}
        {isOpen && fileSystem && 
          <>

            {/* Container to make window draggable */}
            <Draggable
              bounds={'.desktop'}
              handle={'.window-header-container'}
              onDrag={(e) => handleZIndex(e)}
              key={Math.random()}
              defaultPosition={defaultPos}
            >
              <div
                className={`window ${isMinified ? "minified" : ""}`}
                onClick={(e) => handleZIndex(e)}
                origin={position}
                ref={boxRef}
              >

                {/* Window Header  */}
                <WindowHeader label={windowItemId + headerLabel}
                  minify={minify}
                  isMinified={isMinified}               
                  closeAnimState={showStyle}
                  closeAnim={setShowStyle}
                  itemId={windowItemId}
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
                    {fileSystem && view && view === 'folder' &&
                      <IconGrid items={node.children || []} isIconGrid={true} />
                    }

                    {/* Project View  */}
                    {fileSystem && view && (view === 'project') &&
                      <ProjectView node={activeProject??node} />
                    }

                  </div>

                </div>

              </div>
            </Draggable>
          </>
        }

        {/* Resume  */}
        {displayResume && 
            <Draggable
              bounds={'.App'}
              onDrag={(e) => handleZIndex(e)}
              handle={'.window-header-container'}
              >
              <div
                className={`window level-class-fourth`}
                key={Math.random()}
                onClick={(e) => handleZIndex(e)}
              >
                <WindowHeader
                  label={`Resume.pdf`}
                  itemId={['Resume', 'img']}
                  minify={minify} isMinified={isMinified}
                />
                <iframe src="https://heady-salto-322.notion.site/ebd//2aadb394a5ab8121bd4afde3e99c9a7f" width="100%" height="100%" frameborder="0" allowfullscreen title="resume" />
              </div>
            </Draggable>
        }

      </>
    );

}; 

Window.propTypes = {
  /**
   * Show items window of firt level
   */
  displayWindow: PropTypes.bool.isRequired,
  /**
   * Show items window of second level
   */
  displayWindowItem: PropTypes.bool,

};

Window.defaultProps = {
  displayWindow: false,
  displayWindowItem: false,
};

export default Window;
