import React from 'react';
import PropTypes from 'prop-types';
import './task-bar.scss';

const TaskBar = ({ openWindows, onWindowClick, onCloseWindow }) => {
  
  // Ne pas afficher la TaskBar si aucune fenêtre n'est ouverte
  if (!openWindows || openWindows.length === 0) {
    return null;
  }

  const getIconForWindow = (windowId) => {
    switch(windowId) {
      case 'projets':
        return '📁';
      case 'resume':
        return '📄';
      case 'contact_me':
        return '✉️';
      case 'artquiz':
        return '🎨';
      case 'stolify':
        return '🎮';
      default:
        return '📄';
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
      {openWindows.map((windowId) => (
        <div
          key={windowId}
          className="task-bar-item"
          onClick={() => onWindowClick(windowId)}
        >
          <span className="task-bar-icon">{getIconForWindow(windowId)}</span>
          <span className="task-bar-label">{getLabelForWindow(windowId)}</span>
          <button 
            className="task-bar-close"
            onClick={(e) => {
              e.stopPropagation();
              onCloseWindow(windowId);
            }}
          >
            ✕
          </button>
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
