import React from 'react';
import PropTypes from 'prop-types';
import './desktop.scss';
import { Item } from '../Item/Item';


/**
 * Primary UI component for user interaction
 */
export const Desktop = ({ primary, backgroundColor, size, label, srcImg, ...props}) => {
  // let eventLogger = (e: MouseEvent, data: Object) => {
  //   console.log('Event: ', e);
  //   console.log('Data: ', data);
  // };
  // console.log(handleStart);

  return (
    <div className="desktop">
      {/* <Draggable>
      </Draggable> */}
      {/* <Draggable>
        <div>SALUT</div>
      </Draggable> */}


          <Item />
        </div>
  );
};

Desktop.propTypes = {
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
   * Desktop contents
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

Desktop.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
  label: 'Projets'
};
