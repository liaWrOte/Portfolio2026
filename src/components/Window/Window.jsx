import React, { useEffect, useState, Suspense, useRef, useLayoutEffect} from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ReactMarkdown from "react-markdown";
import { getCurrentNode, getProjectById } from '../../selectors/explorerSelectors';

import { backendUrl } from '../../middlewares/env';
import './window.scss';

import Loader from '../Loader/Loader';
import WindowHeader from '../../containers/windowHeader';
import SidebarTree from './../../containers/sidebarTree';
import ExplorerView from '../ExplorerView/ExplorerView';
import ProjectView from '../ProjectView/ProjectView';
import IconGrid from '../../containers/iconGrid';


const RemoteQuiz = React.lazy(
  async () => (await import('remote/Quiz'))
);



/**
 * Primary UI component for user interaction
 */
const Window = ({ displayWindow, getAllProjects, displayProjects, windowLevel, displayWindowItem, displayImageItem, displaySpecsItem, displayAllItems, windowItemId, displayResume, displayArtquiz, position, windowPosition, openWindow, openWindowItem, isOpen, fileSystem, activeId, view }) => {


  const boxRef = useRef(null);
  const [defaultPos, setDefaultPos] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    // if (!boxRef.current) return; 

    if (displayWindow && boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
  
      const centerX = window.innerWidth / 2 - rect.width / 2;
      const centerY = window.innerHeight / 2 - rect.height / 2;
  
      setDefaultPos({ x: centerX, y: centerY });
    }
  }, [displayWindow]);

  // useEffect(() => {
  //   const fetchData = async()=> {
  //     if(displayProjects) {
  //       const data = await getAllProjects();
  //       return data;
  //     }
  //   }
  //   fetchData();
  // }, []);

  function handleZIndex(e) {
    let windows = document.querySelectorAll('.window');
    windows.forEach((el) => {
      el.style.zIndex = '0';
    });
    if (e.target.closest('.window')) {
      e.target.closest('.window').style.zIndex = '1';
    }
  }

  const [isMinified, minify] = useState(false);
  const [showStyle, setShowStyle] = useState(true);

  useEffect(() => {
    if (displayWindow) {
      // setShowStyle(true);
      setTimeout(() => setShowStyle(false), 1000);
      // return () => clearTimeout(timeout);
    }
  }, [displayWindow]);

  const divStyleStart = {
    // position: 'absolute',
    top: windowPosition.top,
    left: windowPosition.left,
    transform: 'scale(0.1)',
    opacity: '0',
    // transition: 'left 0.7s, top 0.7s, transform 0.7s, opacity 0.7s',
  };

  const divStyleEnd = {
    // position: 'absolute',
    top: '90px',
    opacity: '1',
    left: '140px',
    transform: 'scale(1)',
    transition: 'left 0.7s, top 0.7s, transform 0.7s, opacity 0.7s',
  };

  useEffect(() => {
    const projectOpen = displayProjects.find(
      (item) => item?.projectOpen && item.projectOpen !== 0
    );
    if (projectOpen) {
      setHeaderlabel('/' + projectOpen.attributes.title);
    }
  }, [fileSystem])

  const [headerLabel, setHeaderlabel] = useState('');

  const node = useSelector(getCurrentNode);
  const activeProject = useSelector(getProjectById);
  console.log('CURRENT NODE IN WINDOW ', node, view, activeProject);


    return (
      <>

        {/* Show projects window */}
        {isOpen && fileSystem && 
          <>
          {/* <div className={`window-container`} style={showStyle ? divStyleStart : divStyleEnd}> */}
            <Draggable
              bounds={'.desktop'}
              handle={'.window-header-container'}
              onDrag={(e) => handleZIndex(e)}
              key={Math.random()}
              defaultPosition={defaultPos}
              // positionOffset={showStyle ? {x: -windowPosition.width, y: -windowPosition.top} : ''}
              // scale={1}
              // style={showStyle ? divStyleStart: divStyleEnd}
            >
              <div
                className={`window ${isMinified ? "minified" : ""}`}
                onClick={(e) => handleZIndex(e)}
                origin={position}
                ref={boxRef}
                // style={showStyle ? divStyle : ''}
              >
                <WindowHeader label={windowItemId + headerLabel}
                  minify={minify}
                  isMinified={isMinified}               
                  closeAnimState={showStyle}
                  closeAnim={setShowStyle}
                  itemId={windowItemId}
                  />

                <div className="window-item-container">
                    <SidebarTree />
                    {/* {displayProjects.map((item, id) => {
                      const currentType = item.attributes.type;
                      const previousType = id > 0 ? displayProjects[id - 1].attributes.type : null;
                      const showType = currentType !== previousType;
                        return (
                          <>
                            {showType &&
                              <li
                                key={Math.random()}
                                className="window-left-nav-type"
                                onClick={(e => openWindow(currentType))}>
                                  {currentType}
                              </li>
                            }
                            <li
                              key={Math.random()}
                              className='window-left-nav-item'
                              onClick={(e => openWindowItem(id))}>
                                {item.attributes.title}
                            </li>
                          </>
                        )
                    })} */}

                  <div className="window-right-items">
                    {/* {displayProjects.map((item, id) => {
                          return (
                            <>
                              {item.attributes.type ===  windowItemId && !displayWindowItem &&
                                <Item 
                                  key={Math.random()} 
                                  inWindow={true} 
                                  label={item.attributes.title} 
                                  triggerOpen='openWindowItem'
                                  // itemId={`Projets/${item.attributes.title}`}
                                  itemId={id}
                                  // projectId={id}
                                />
                              }
                             
                              {item.projectOpen !== 0 &&
                                <div className="window-item-container">
                                  <Item
                                    key={Math.random()}
                                    inWindow={true}
                                    label="Specs"
                                    triggerOpen='openSpecsItem'
                                    itemId={id}
                                  />
                                    {item.attributes.capture_desktop.data &&
                                      <Item 
                                        key={Math.random()}
                                        inWindow={true}
                                        itemId={item.id}
                                        outWindowLabel={`${item.attributes.capture_desktop.data.attributes.name}`}
                                        triggerOpen='capture_desktop'
                                        srcImg={`${backendUrl}${item.attributes.capture_desktop.data.attributes.url}`}
                                      />
                                    }
                                    {item.attributes.capture_desktop_2.data &&
                                      <Item 
                                        key={Math.random()}
                                        inWindow={true}
                                        itemId={item.id}
                                        outWindowLabel={`${item.attributes.capture_desktop_2.data.attributes.name}`}
                                        triggerOpen='capture_desktop_2'
                                        srcImg={`${backendUrl}${item.attributes.capture_desktop_2.data.attributes.url}`}
                                      />
                                    }
                                    {item.attributes.capture_mobile.data &&
                                      <Item 
                                      key={Math.random()}
                                      inWindow={true}
                                      itemId={item.id}
                                      outWindowLabel={`${item.attributes.capture_mobile.data.attributes.name}`}
                                      triggerOpen='capture_mobile'
                                      srcImg={`${backendUrl}${item.attributes.capture_mobile.data.attributes.url}`}
                                      />
                                    }
                                    {item.attributes.logo.data &&
                                      <Item 
                                      key={Math.random()}
                                      inWindow={true}
                                      itemId={item.id}
                                      outWindowLabel={`${item.attributes.logo.data.attributes.name}`}
                                      triggerOpen='logo'
                                      srcImg={`${backendUrl}${item.attributes.logo.data.attributes.url}`}
                                      />
                                    }
        
                                  <Item
                                    key={Math.random()}
                                    inWindow={true}
                                    label="Tout ouvrir"
                                    triggerOpen='openAllItems'
                                    itemId={id}
                                  />
                                </div>
                              }
                            </>
                          )
                    })} */}
                    {fileSystem && view && (view === 'explorer') &&
                      <ExplorerView view={view} node={fileSystem} />
                    }
                    {fileSystem && view && (view === 'project') &&
                      <ProjectView node={activeProject??node} />
                    }
                    {fileSystem && view && view === 'folder' &&
                      <IconGrid items={node.children || []} isIconGrid={true} />
                    }

                  </div>
                </div>

              </div>
            </Draggable>
          {/* </div> */}
          </>
        }

        {displayProjects.map((item, id) => {
          if(item.imgOpen) {
            let fullClass = item.imgExpandedWindow ? ' full' : '';
            const image = item.attributes?.[displayImageItem]?.data?.attributes;
            return (
                <Draggable bounds={'.App'} onDrag={(e) => handleZIndex(e)}>
                <div
                  className={`window level-class-third img ${fullClass}`}
                  key={Math.random()}
                  onClick={(e) => handleZIndex(e)}
                >
                  <WindowHeader
                    label={`Projets`+ headerLabel + '/${image?.name ??'}
                    itemId={[id, 'img']}
                  />
                  <div className="window-item-container img">
                    <img src={image?.url ? `${backendUrl}${image.url}` : ''} alt="capture"/>
                  </div>
                </div>
                  </Draggable>
            )
          }
        })}

        {displayProjects.map((item, id) => {
          if(item.specsOpen) {
            return (
              <Draggable bounds={'.App'} onDrag={(e) => handleZIndex(e)}>
                <div
                  className={`window level-class-fourth`}
                  key={Math.random()}
                  onClick={(e) => handleZIndex(e)}
                >
                  <WindowHeader
                    label={`Projets/${displayProjects[id].attributes.title}/specs`}
                    itemId={[id, 'specs']} minify={minify} isMinified={isMinified}
                  />
                  <div className="window-item-container specs">
                    <h1>{item.attributes.title}</h1>
                    {item.attributes.link && 
                      <a href={item.attributes.link} className="link-site">
                          Voir le site
                      </a>
                    }
                    {item.attributes.type && 
                      <p>{item.attributes.type}</p>
                    }
                    {item.attributes.role &&
                      <>
                        <h2>Rôle</h2>
                        <p>{item.attributes.role}</p>
                      </>
                    }
                    {item.attributes.techno &&
                      <>
                        <h2>Techno</h2>
                        <p>{item.attributes.techno}</p>
                      </>
                    }
                    {item.attributes.pitch && 
                      <>
                        <h2>Missions réalisées</h2>
                        <ReactMarkdown>
                          {item.attributes.pitch}
                        </ReactMarkdown>
                      </>
                    }
                  </div>
                </div>
              </Draggable>
            )
          }
        })}

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

        {displayArtquiz && 
          <Suspense fallback={<Loader />}>
            <RemoteQuiz/>
          </Suspense>
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
