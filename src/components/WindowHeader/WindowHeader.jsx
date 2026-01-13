import React, { useState } from 'react';
import './window-header.scss';
import file from '../assets/img/file.png';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

// Import images 
import arrowLeft from '../assets/img/arrow_left.svg';
import arrowRight from '../assets/img/arrow_right.svg';

export const WindowHeader = ({
  primary,
  backgroundColor,
  size,
  label,
  closeWindow,
  itemId,
  expandWindow,
  minify,
  isMinified,
  closeAnimState,
  closeAnim,
  currentPath,
  fileSystem,
  openFolder
}) => {

  
  function minifyWindow(e) {
    const window = e.target.closest('.window');
    window.classList.toggle('minified');
  }
  
  function expandedWindow(e) {
    const window = e.target.closest('.window');
    window.classList.toggle('full');
  }

  function handleClose(itemId) {
    // closeAnim(true);
    console.log(itemId);
    closeWindow(itemId);
  }


  return (
    <div className='window-header'>
      <div className="window-header-container">
        <div className="window-header-nav">
        </div>
        <div className="window-header-label">
          {currentPath && fileSystem ? (
            <Breadcrumb 
              currentPath={currentPath}
              fileSystem={fileSystem}
              openFolder={openFolder}
            />
          ) : (
            <span>{label}</span>
          )}
        </div>
        <div className="toggle-window-container">
          <span
            className="toggle-window red"
            onClick={() => handleClose(itemId)}
          ></span>
          {/* <span
            className="toggle-window yellow"
            onClick={(e) => minifyWindow(e)}
          ></span> */}
          <span
            className="toggle-window yellow"
            onClick={() => minify(!isMinified)}
          ></span>
          {itemId !== undefined && itemId[1] === 'img' &&
            <span
              className="toggle-window green"
              onClick={(e) => expandedWindow(e)}
              // onClick={() => expandWindow(itemId)}
            ></span>
          }
        </div>

      </div>
    </div>
  );
};
