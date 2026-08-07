import React from 'react';
import PropTypes from 'prop-types';
import ScrambleText from '../ScrambleText/ScrambleText';
import { useTranslation } from '../../contexts/LanguageContext';
import './task-bar.scss';

import folderIcon from '../assets/img/icons/folder_closed_2_icon.svg';
import folderOpenIcon from '../assets/img/icons/folder_open_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';
import emailIcon from '../assets/img/icons/email_icon.svg';

const TaskBar = ({ openWindows, minimizedWindows, onWindowClick, onCloseWindow }) => {
  const { t } = useTranslation();
  const handleWindowClick = (windowId: string) => {
    if (minimizedWindows && minimizedWindows.includes(windowId)) {
      document.dispatchEvent(new CustomEvent('window-restore', { detail: { windowId } }));
    } else {
      onWindowClick(windowId);
    }
  };

  if (!openWindows || openWindows.length === 0) return null;

  const filteredWindows = openWindows.filter(
    (windowId) => windowId !== 'stolify'
  );

  if (filteredWindows.length === 0) return null;

  const getIconForWindow = (windowId) => {
    switch (windowId) {
      case 'projets':
        return openWindows.includes('projets') ? folderOpenIcon : folderIcon;
      case 'resume':
        return fileIcon;
      case 'contact_me':
        return emailIcon;
      default:
        return fileIcon;
    }
  };

  const getLabelForWindow = (windowId) => {
    switch (windowId) {
      case 'projets': return t('projects');
      case 'resume': return t('resume');
      case 'contact_me': return t('contact');
      default: return windowId;
    }
  };

  return (
    <div className="task-bar">
      {filteredWindows.map((windowId) => (
        <div
          key={windowId}
          className="task-bar-item"
          data-taskbar-id={windowId}
          onClick={() => handleWindowClick(windowId)}
        >
          <img
            src={getIconForWindow(windowId)}
            alt={`${getLabelForWindow(windowId)} icon`}
            className="task-bar-icon"
          />
          <span className="task-bar-label">
            <ScrambleText text={getLabelForWindow(windowId)} />
          </span>
        </div>
      ))}
    </div>
  );
};

TaskBar.propTypes = {
  openWindows: PropTypes.array.isRequired,
  minimizedWindows: PropTypes.array,
  onWindowClick: PropTypes.func.isRequired,
  onCloseWindow: PropTypes.func.isRequired
};

export default TaskBar;
