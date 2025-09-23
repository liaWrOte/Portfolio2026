import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './window-header.scss';
import file from '../assets/img/file.png';
import arrowLeft from '../assets/img/arrow_left.svg';
import arrowRight from '../assets/img/arrow_right.svg';

/**
 * Primary UI component for user interaction
 */
export const WindowHeader = ({ primary, backgroundColor, size, label, closeWindow, itemId, expandWindow, minify, isMinified, closeAnimState, closeAnim,  ...props }) => {

  function minifyWindow(e) {
    let window = e.target.closest('.window');
    window.classList.toggle('minified');
  }
  
  function expandedWindow(e) {
    console.log('expanded');
  }

  function handleClose(itemId) {
    // closeAnim(true);
    closeWindow(itemId);
  }


  return (
    <div className='window-header'>
      <div className="window-header-container">
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
        <span className="window-header-label">{label}</span>
        <div className="window-header-nav">
        </div>
      </div>
    </div>
  );
};

WindowHeader.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * WindowHeader contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * image
   */
  srcImg: PropTypes.string

};

WindowHeader.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
  srcImg: file,
  label: 'Projets'
};
