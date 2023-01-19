import React from 'react';
import PropTypes from 'prop-types';
import './desktop-top-bar.scss';

/**
 * Primary UI component for user interaction
 */
export const DesktopTopBar = ({ primary, backgroundColor, size, label, srcImg, ...props }) => {
  return (
    <div className="desktop-top-bar">
      <span className="identity">Sandrine M'ZE</span>
      <span className="time">18:25</span>
    </div>
  );
};

DesktopTopBar.propTypes = {
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
   * DesktopTopBar contents
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

DesktopTopBar.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
  label: 'Projets'
};
