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
import { useTranslation } from '../../contexts/LanguageContext';
export const Desktop = ({ displayWindowItem, displayImageItem, displayWindow, ...props }) => {
  const { t } = useTranslation();
  return (
    <div className="desktop">
      <img className="cloud" src={cloud} alt="background" />
      {/* Item projets */}
      <Item
        key={Math.random()}
        inWindow={false}
        itemId="projets"
        outWindowLabel={t('projects')}
        triggerOpen="projets"
        srcImg={folderClosed2Icon}
      />
      {/* Item resume */}
      <Item
        key={Math.random()}
        inWindow={false}
        itemId="resume"
        outWindowLabel={t('resume')}
        triggerOpen="resume"
        srcImg={fileIcon}
      />
      {/* Item contact me */}
      <Item
        key={Math.random()}
        inWindow={false}
        itemId="contact_me"
        outWindowLabel={t('contact')}
        triggerOpen="openWindow"
        srcImg={emailIcon}
      />
      {/* Item Window to open all items */}
      <Window />
    </div>
  );
};
