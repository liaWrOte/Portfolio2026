import React from 'react';
import PropTypes from 'prop-types';
import './desktop.scss';
import Item from '../../containers/item';
import Window from '../../containers/window';
import cv from '../assets/img/icons/cv.svg';
import animations from '../assets/img/icons/animations.svg';

// const RemoteQuiz = React.lazy(
//   async () => (await import('remote/Quiz'))
// );
// const RemoteQuiz = React.lazy(() => import("remote/Quiz"));
// svg

/**
 * Primary UI component for user interaction
 */
export const Desktop = ({ displayWindowItem, displayImageItem, displayWindow, ...props}) => {

  return (
    <div className="desktop">
      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="projets"
        triggerOpen="openWindow"
      />

      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="cv"
        outWindowLabel="CV"
        triggerOpen="cv"
        srcImg={cv}
      />

      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="animations"
        outWindowLabel="Animations"
        triggerOpen="openWindow"
        srcImg={animations}
      />

      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="readme"
        outWindowLabel="Read.me"
        triggerOpen="openWindow"
        srcImg={animations}
      />

      {/* <RemoteQuiz /> */}

      {/* {displayWindowItem &&
          <Window windowLevel="second"/>
      }  */}
      <Window/>

    </div>
  );
};

Desktop.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  displayWindowItem: PropTypes.bool,


};

Desktop.defaultProps = {
  displayWindowItem: false,
};
