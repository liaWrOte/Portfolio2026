import React from 'react';

// Import styles 
import './desktop.scss';

// Import components 
import Item from '../../containers/item';
import Window from '../../containers/window';
import DesktopBottomBar from '../DesktopBottomBar/DesktopBottomBar';
import cloud from '../assets/img/cloud.svg';

import folderClosed2Icon from '../assets/img/icons/folder_closed_2_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';
import emailIcon from '../assets/img/icons/email_icon.svg';

// Import React Quiz local app
import ArtQuizApp from '../ArtQuiz/App';


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
        itemId="projets"
        outWindowLabel="Projets"
        triggerOpen="projets"
        srcImg={folderClosed2Icon}
      />

      {/* Item resume */}
      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="resume"
        outWindowLabel="resume.pdf"
        triggerOpen="resume"
        srcImg={fileIcon}
      />

      {/* Item contact me */}
      <Item 
        key={Math.random()}
        inWindow={false} 
        itemId="contact_me"
        outWindowLabel="contact.me"
        triggerOpen="openWindow"
        srcImg={emailIcon}
      />

      {/* Item Window to open all items */}
      <Window/>

      {/* Local React ArtQuiz app */}  
      {props.displayArtquiz &&
        <ArtQuizApp />
      }

    </div>
  );
};
