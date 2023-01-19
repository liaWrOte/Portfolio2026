import React from 'react';
import PropTypes from 'prop-types';
import './window-header.scss';
import file from '../assets/img/file.png';
import arrowLeft from '../assets/img/arrow_left.svg';
import arrowRight from '../assets/img/arrow_right.svg';

/**
 * Primary UI component for user interaction
 */
export const WindowHeader = ({ primary, backgroundColor, size, label, srcImg, ...props }) => {
  return (
    <div className='window-header'>
      <div className="toggle-window-container">
        <span class="toggle-window red"></span>
        <span class="toggle-window yellow"></span>
        <span class="toggle-window green"></span>
      </div>
      <span className="window-header-label">Projets</span>
      <div className="window-header-nav">
          <span className="nav nav-right">
            <img src={arrowRight} alt="" />
          </span>
          <span className="nav nav-left">
            <img src={arrowLeft} alt="" />
          </span>
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
