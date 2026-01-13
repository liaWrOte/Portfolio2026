import React from 'react';
import PropTypes from 'prop-types';
import './desktop.scss';
import Item from '../../containers/item';
import Window from '../../containers/window';
import animations from '../assets/img/icons/animations.svg';
import cloud from '../assets/img/cloud.svg';

// Import React Quiz extrn app
const RemoteQuiz = React.lazy(
  async () => (await import('remote/Quiz'))
);

/**
 * Primary UI component for user interaction
 */
export const Desktop = ({ displayWindowItem, displayImageItem, displayWindow, ...props}) => {
  return (
    <div className="desktop">
      <img
        className='cloud'
        src={cloud}
        alt="background" />

      {/* Item projets */}
      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="Projets"
        outWindowLabel="Projets"
        triggerOpen="openWindow"
      />

      Item resume
      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="resume"
        outWindowLabel="resume.pdf"
        triggerOpen="resume"
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
      <Window/>

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
