import React, { useEffect, useState, Suspense, useRef} from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ReactMarkdown from "react-markdown";

import { backendUrl } from '../../middlewares/env';
import './window.scss';

import Loader from '../Loader/Loader';
import WindowHeader from '../../containers/windowHeader';
import Item from '../../containers/item';
import cv from '../assets/img/cv/Sandrine_MZE_CV.jpg';

const RemoteQuiz = React.lazy(
  async () => (await import('remote/Quiz'))
);


/**
 * Primary UI component for user interaction
 */
const Window = ({ displayWindow, getAllProjects, displayProjects, windowLevel, displayWindowItem, displayImageItem, displaySpecsItem, displayAllItems, windowItemId, displayCv, displayArtquiz, position, windowPosition }) => {

  useEffect(() => {
    const fetchData = async()=> {
      if(displayProjects) {
        const data = await getAllProjects();
        return data;
      }
    }
    fetchData();
  }, []);

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

    return (
      <>

        {displayWindow && displayProjects && 
          <>
          {/* <div className={`window-container`} style={showStyle ? divStyleStart : divStyleEnd}> */}
            <Draggable
              bounds={'.App'}
              onDrag={(e) => handleZIndex(e)}
              key={Math.random()}
              // positionOffset={showStyle ? {x: -windowPosition.width, y: -windowPosition.top} : ''}
              // scale={1}
              // style={showStyle ? divStyleStart: divStyleEnd}
            >
              <div
                className={`window ${isMinified ? "minified" : ""}`}
                onClick={(e) => handleZIndex(e)}
                origin={position}
                // style={showStyle ? divStyle : ''}
              >
                <WindowHeader label="Projets" minify={minify} isMinified={isMinified}               
                closeAnimState={showStyle}
                closeAnim={setShowStyle}/>
                <div className="window-item-container">
                  {displayProjects.map((item, id) => {
                    return (
                      <Item 
                        key={Math.random()} 
                        inWindow={true} 
                        label={item.attributes.title} 
                        triggerOpen='openWindowItem'
                        // itemId={`Projets/${item.attributes.title}`}
                        itemId={id}
                        projectId={id}
                      />
                    )
                  })}
                </div>
              </div>
            </Draggable>
          {/* </div> */}
          </>
        }

        {displayProjects.map((item, id) => {
          if(item.projectOpen) {
            return (
              <div className={`window-container`} style={showStyle ? divStyleStart : divStyleEnd}>
              <Draggable bounds={'.App'} onDrag={(e) => handleZIndex(e)}>
                <div
                  className={`window level-class-second`}
                  key={Math.random()}
                  onClick={(e) => handleZIndex(e)}
                >
                <WindowHeader
                  label={`Projets/${displayProjects[id].attributes.title}`}
                  itemId={[id]} minify={minify} isMinified={isMinified}
                  closeAnimState={showStyle}
                  closeAnim={setShowStyle}
                />
                  <div className="window-item-container">
                    <Item
                      key={Math.random()}
                      inWindow={true}
                      label="Specs"
                      triggerOpen='openSpecsItem'
                      itemId={id}
                    />
                    <Item
                      key={Math.random()}
                      inWindow={true}
                      label="Images"
                      triggerOpen='openImageItem'
                      itemId={id}
                      />
                      {item.attributes.capture_desktop.data &&
                        <Item 
                          key={Math.random()}
                          inWindow={true}
                          itemId={`${item.attributes.capture_desktop.data.attributes.name}`}
                          outWindowLabel={`${item.attributes.capture_desktop.data.attributes.name}`}
                          triggerOpen="ouest-france"
                          srcImg={`${backendUrl}${item.attributes.capture_desktop.data.attributes.url}`}
                        />
                      }
                      {item.attributes.capture_desktop_2.data &&
                        <Item 
                          key={Math.random()}
                          inWindow={true}
                          itemId={`${item.attributes.capture_desktop_2.data.attributes.name}`}
                          outWindowLabel={`${item.attributes.capture_desktop_2.data.attributes.name}`}
                          triggerOpen="ouest-france"
                          srcImg={`${backendUrl}${item.attributes.capture_desktop_2.data.attributes.url}`}
                        />
                      }
                      {item.attributes.capture_mobile.data &&
                        <Item 
                        key={Math.random()}
                        inWindow={true}
                        itemId={`${item.attributes.capture_mobile.data.attributes.name}`}
                        outWindowLabel={`${item.attributes.capture_mobile.data.attributes.name}`}
                        triggerOpen="ouest-france"
                        srcImg={`${backendUrl}${item.attributes.capture_mobile.data.attributes.url}`}
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
                </div>
              </Draggable>
              
              </div>
            )
          }
        })}

        {displayProjects.map((item, id) => {
            // console.error('IMG OPEN', item.imgOpen );
            // console.error('IMG attributes', item.attributes.capture_desktop);
            if (item.attributes.capture_desktop) {
              if(item.imgOpen) {
                let fullClass = item.imgExpandedWindow ? ' full' : '';
                return (
                    <Draggable bounds={'.App'} onDrag={(e) => handleZIndex(e)}>
                    <div
                      className={`window level-class-third img ${fullClass}`}
                      key={Math.random()}
                      onClick={(e) => handleZIndex(e)}
                    >
                      <WindowHeader
                        label={`Projets/${item.attributes.title}/images`}
                        itemId={[id, 'img']}
                      />
                      <div className="window-item-container img">
                        {item.attributes.capture_desktop.data &&
                          <img src={`${backendUrl}${item.attributes.capture_desktop.data.attributes.url}`} alt="capture"/>
                        }
                        {item.attributes.capture_desktop_2.data &&
                          <img src={`${backendUrl}${item.attributes.capture_desktop_2.data.attributes.url}`} alt="capture"/>
                        }
                      </div>
                    </div>
                     </Draggable>
                )
              }
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

        {displayCv && 
            <Draggable bounds={'.App'} onDrag={(e) => handleZIndex(e)}>
              <div
                className={`window level-class-fourth`}
                key={Math.random()}
                onClick={(e) => handleZIndex(e)}
              >
                <WindowHeader
                  label={`Projets/CV`}
                  itemId={['cv', 'img']}
                  minify={minify} isMinified={isMinified}
                />
                <div className="window-item-container img">
                  <img src={cv} alt="cv" />
                </div>
              </div>
            </Draggable>
        }

        {displayArtquiz && 
          <Suspense fallback={<Loader />}>
            <RemoteQuiz/>
          </Suspense>
              // <span>YOYOYO</span>
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
