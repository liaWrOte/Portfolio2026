import React from 'react';
import PropTypes from 'prop-types';
import './task-bar.scss';

// Import des mêmes icônes que les items
import folderClosed2Icon from '../assets/img/icons/folder_closed_2_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';
import emailIcon from '../assets/img/icons/email_icon.svg';

const TaskBar = ({ openWindows, onWindowClick, onCloseWindow }) => {
  
  // Ne pas afficher la TaskBar si aucune fenêtre n'est ouverte
  if (!openWindows || openWindows.length === 0) {
    return null;
  }

  // Filtrer artquiz et stolify car ils sont déjà dans DesktopBottomBar
  const filteredWindows = openWindows.filter(windowId => 
    windowId !== 'artquiz' && windowId !== 'stolify'
  );

  // Ne pas afficher la TaskBar si aucune fenêtre restante après filtrage
  if (filteredWindows.length === 0) {
    return null;
  }

  const getIconForWindow = (windowId) => {
    switch(windowId) {
      case 'projets':
        return folderClosed2Icon;
      case 'resume':
        return fileIcon;
      case 'contact_me':
        return emailIcon;
      default:
        return fileIcon;
    }
  };

  const getLabelForWindow = (windowId) => {
    switch(windowId) {
      case 'projets':
        return 'Projets';
      case 'resume':
        return 'resume.pdf';
      case 'contact_me':
        return 'contact.me';
      default:
        return windowId;
    }
  };

  return (
    <div className="task-bar">
      {filteredWindows.map((windowId) => (
        <div
          key={windowId}
          className="task-bar-item"
          onClick={() => onWindowClick(windowId)}
        >
          <div className="task-bar-content">
            <img 
              src={getIconForWindow(windowId)} 
              alt={getLabelForWindow(windowId)}
              className="task-bar-icon"
            />
            <span className="task-bar-label">{getLabelForWindow(windowId)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

TaskBar.propTypes = {
  openWindows: PropTypes.array.isRequired,
  onWindowClick: PropTypes.func.isRequired,
  onCloseWindow: PropTypes.func.isRequired,
};

export default TaskBar;
