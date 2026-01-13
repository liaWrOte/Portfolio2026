import React from 'react';

// Import styles 
import './desktop.scss';

// Import components 
import Item from '../../containers/item';
import Window from '../../containers/window';
import animations from '../assets/img/icons/animations.svg';
import cloud from '../assets/img/cloud.svg';

import fileImg from '../assets/img/file.png';
import resumeImg from '../assets/img/icons/resume.svg';

// Import React Quiz extern app
const RemoteQuiz = React.lazy(
  async () => (await import('remote/Quiz'))
);


export const Desktop = ({
  displayWindowItem,
  displayImageItem,
  displayWindow,
  ...props
}) => {
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
        srcImg={fileImg}
      />

      {/* Item resume */}
      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="resume"
        outWindowLabel="resume.pdf"
        triggerOpen="resume"
        srcImg={resumeImg}
      />

      {/* Item contact me */}
      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="contact_me"
        outWindowLabel="contact.me"
        triggerOpen="openWindow"
        srcImg={animations}
      />

      {/* Item Window to open all items */}
      <Window/>

      {/* Remote React ArtQuiz app */}  
      {props.displayArtquiz &&
        <RemoteQuiz />
      }

    </div>
  );
};
