import React from 'react';
import PropTypes from 'prop-types';
import './desktop.scss';
import Item from '../../containers/item';
import Window from '../../containers/window';
import cv from '../assets/img/icons/cv.svg';
import animations from '../assets/img/icons/animations.svg';
import resume from '../assets/img/cv/Sandrine_MZE_CV.jpg';

const RemoteQuiz = React.lazy(
  async () => (await import('remote/Quiz'))
);
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
        itemId="Pro"
        outWindowLabel="Pro"
        triggerOpen="openWindow"
      />

      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="Brand Design"
        outWindowLabel="Brand Design"
        triggerOpen="openWindow"
      />

      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="cv"
        outWindowLabel="cv.pdf"
        triggerOpen="cv"
        srcImg={resume}
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
        itemId="contact_me"
        outWindowLabel="contact.me"
        triggerOpen="openWindow"
        srcImg={animations}
      />

      {/* <RemoteQuiz /> */}

      {/* {displayWindowItem &&
          <Window windowLevel="second"/>
      }  */}
      {/* <Window/> */}

      {/* Exemple intégration CodePen */}
      {/* <div id="integration">
        <iframe height="400" style={{width: 40 + '%'}} scrolling="no" title="Nom du Pen"
          src="https://codepen.io/liaWO/embed/mdNOqKJ?default-tab=html%2Cresult"
          frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
        </iframe>
      </div> */}

      {props.displayArtquiz &&
        <RemoteQuiz />
      }

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
