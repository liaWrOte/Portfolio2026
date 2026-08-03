import React from 'react';
import PropTypes from 'prop-types';
import './task-bar.scss';

// Importer les mêmes icônes que les items
import stolifyIcon from '../assets/img/icons/stolify_icon.svg';
import artquizIcon from '../assets/img/icons/artquiz_icon.svg';
import folderIcon from '../assets/img/icons/folder_closed_2_icon.svg';
import folderOpenIcon from '../assets/img/icons/folder_open_icon.svg';
import fileIcon from '../assets/img/icons/file_icon.svg';
import emailIcon from '../assets/img/icons/email_icon.svg';

const TaskBar = ({ openWindows, onWindowClick, onCloseWindow }) => {
  // Ne pas afficher la TaskBar si aucune fenêtre n'est ouverte
  if (!openWindows || openWindows.length === 0) {
    return null;
  }

  // Filtrer artquiz et stolify car ils sont déjà dans DesktopBottomBar
  const filteredWindows = openWindows.filter(
    (windowId) => windowId !== 'artquiz' && windowId !== 'stolify'
  );

  // Ne pas afficher la TaskBar si aucune fenêtre restante après filtrage
  if (filteredWindows.length === 0) {
    return null;
  }

  const getIconForWindow = (windowId) => {
    switch (windowId) {
      case 'projets':
        // Vérifier si la fenêtre projets est ouverte
        return openWindows && openWindows.includes('projets') ? folderOpenIcon : folderIcon;
      case 'resume':
        return fileIcon; // Icône fichier
      case 'contact_me':
        return emailIcon; // Icône email
      case 'artquiz':
        return artquizIcon; // Utiliser la vraie icône artquiz
      case 'stolify':
        return stolifyIcon; // Utiliser la vraie icône stolify
      default:
        return fileIcon; // Icône fichier par défaut
    }
  };

  const getLabelForWindow = (windowId) => {
    switch (windowId) {
      case 'projets':
        return 'Projets';
      case 'resume':
        return 'resume.pdf';
      case 'contact_me':
        return 'contact.me';
      case 'artquiz':
        return 'Artquiz';
      case 'stolify':
        return 'Stolify';
      default:
        return windowId;
    }
  };

  return (
    <div className="task-bar">
      {filteredWindows.map((windowId) => (
        <div key={windowId} className="task-bar-item" data-taskbar-id={windowId} onClick={() => onWindowClick(windowId)}>
          <img
            src={getIconForWindow(windowId)}
            alt={`${getLabelForWindow(windowId)} icon`}
            className="task-bar-icon"
          />
          <span className="task-bar-label">{getLabelForWindow(windowId)}</span>
        </div>
      ))}
    </div>
  );
};

TaskBar.propTypes = {
  openWindows: PropTypes.array.isRequired,
  onWindowClick: PropTypes.func.isRequired,
  onCloseWindow: PropTypes.func.isRequired
};

export default TaskBar;
