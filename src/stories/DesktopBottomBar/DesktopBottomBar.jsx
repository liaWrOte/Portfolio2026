import React from 'react';
import PropTypes from 'prop-types';
import './desktop-bottom-bar.scss';
import { Item } from '../Item/Item';

/**
 * Primary UI component for user interaction
 */
export const DesktopBottomBar = ({ primary, backgroundColor, size, label, srcImg, ...props }) => {
  return (
    <div className="desktop-bar">
      <Item />
      <Item />
      <Item />
    </div>
  );
};

DesktopBottomBar.propTypes = {
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
   * DesktopBottomBar contents
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

DesktopBottomBar.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
  label: 'Projets'
};
