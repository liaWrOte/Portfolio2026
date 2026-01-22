import React, { useState } from 'react';
import './window-header.scss';
import file from '../assets/img/file.png';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { FileSystemNode } from '../../types';

// Import images 
import arrowLeft from '../assets/img/arrow_left.svg';
import arrowRight from '../assets/img/arrow_right.svg';

interface WindowHeaderProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: string;
  label: string;
  closeWindow: (id: string) => void;
  itemId?: string;
  expandWindow: (e: React.MouseEvent) => void;
  minify: (minified: boolean) => void;
  isMinified: boolean;
  closeAnimState?: boolean;
  closeAnim?: () => void;
  currentPath?: string;
  fileSystem?: FileSystemNode;
  openFolder: (path: string) => void;
  useOnlyLabel?: boolean;
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({
  primary,
  backgroundColor,
  size,
  label,
  closeWindow,
  itemId,
  expandWindow,
  minify,
  isMinified,
  closeAnimState,
  closeAnim,
  currentPath,
  fileSystem,
  openFolder,
  useOnlyLabel = false
}) => {

  
  function minifyWindow(e: React.MouseEvent) {
    const window = (e.target as HTMLElement).closest('.window');
    window?.classList.toggle('minified');
  }
  
  function expandedWindow(e: React.MouseEvent) {
    const window = (e.target as HTMLElement).closest('.window');
    window?.classList.toggle('full');
  }

  function handleClose(itemId: string) {
    // closeAnim(true);
    console.log(itemId);
    closeWindow(itemId);
  }


  return (
    <div className='window-header'>
      <div className="window-header-container">
        <div className="window-header-nav">
        </div>
        <div className="window-header-label">
          {useOnlyLabel || !currentPath || !fileSystem ? (
            <span>{label}</span>
          ) : (
            <Breadcrumb 
              currentPath={currentPath}
              fileSystem={fileSystem}
              openFolder={openFolder}
            />
          )}
        </div>
        <div className="toggle-window-container">
          <span
            className="toggle-window red"
            onClick={() => itemId && handleClose(itemId)}
          ></span>
          {/* <span
            className="toggle-window yellow"
            onClick={(e) => minifyWindow(e)}
          ></span> */}
          <span
            className="toggle-window yellow"
            onClick={() => minify(!isMinified)}
          ></span>
          {itemId !== undefined &&
            <span
              className="toggle-window green"
              onClick={(e) => expandedWindow(e)}
              // onClick={() => expandWindow(itemId)}
            ></span>
          }
        </div>

      </div>
    </div>
  );
};
