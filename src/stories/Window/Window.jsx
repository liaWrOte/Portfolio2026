import React from 'react';
import PropTypes from 'prop-types';
import './window.scss';
import file from '../assets/img/file.png';
import { WindowHeader } from '../WindowHeader/WindowHeader';
import { Item } from '../Item/Item';

/**
 * Primary UI component for user interaction
 */
export const Window = ({ primary, backgroundColor, size, label, srcImg, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <div className='window'>
      <WindowHeader />
      <div className="window-item-container">
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
};

Window.propTypes = {
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
   * Window contents
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

Window.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
  srcImg: file,
  label: 'Projets'
};
