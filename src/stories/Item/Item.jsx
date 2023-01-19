import React from 'react';
import PropTypes from 'prop-types';
import './item.scss';
import file from '../assets/img/file.png';
import Draggable, {DraggableCore} from 'react-draggable';

/**
 * Primary UI component for user interaction
 */
export const Item = ({ primary, backgroundColor, size, label, srcImg, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const handleStart = () => console.log('here');
  

  return (
    <Draggable
      onStart={handleStart}
    >
    <div className="item">
      <img 
        src={srcImg} 
        alt="Logo" 
      />
      <span>{label}</span>
    </div>
    </Draggable>
  );
};

Item.propTypes = {
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
   * Item contents
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

Item.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
  srcImg: file,
  label: 'Projets'
};
