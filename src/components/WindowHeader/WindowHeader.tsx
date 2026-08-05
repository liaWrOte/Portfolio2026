import React from 'react';
import './window-header.scss';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { FileSystemNode } from '../../types';
import arrowLeft from '../assets/img/arrow_left.svg';
import arrowRight from '../assets/img/arrow_right.svg';
import ScrambleText from '../ScrambleText/ScrambleText';

interface WindowHeaderProps {
  label: string;
  closeWindow?: (id: string) => void;
  itemId?: string;
  currentPath?: string;
  fileSystem?: FileSystemNode;
  openFolder?: (path: string) => void;
  useOnlyLabel?: boolean;
  canGoBack?: boolean;
  canGoForward?: boolean;
  goBack?: () => void;
  goForward?: () => void;
  hideExpandButton?: boolean;
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({
  label,
  closeWindow,
  itemId,
  currentPath,
  fileSystem,
  openFolder,
  useOnlyLabel = false,
  canGoBack = false,
  canGoForward = false,
  goBack,
  goForward,
  hideExpandButton = false,
}) => {
  function expandedWindow(e: React.MouseEvent) {
    const win = (e.target as HTMLElement).closest('.window');
    win?.classList.toggle('full');
  }

  return (
    <div className="window-header">
      <div className="window-header-container">
        <div className="window-header-nav">
          {!useOnlyLabel && (
            <>
              <button
                className={`nav-btn${canGoBack ? '' : ' disabled'}`}
                onClick={() => canGoBack && goBack?.()}
                disabled={!canGoBack}
              >
                <img src={arrowRight} alt="Back" />
              </button>
              <button
                className={`nav-btn${canGoForward ? '' : ' disabled'}`}
                onClick={() => canGoForward && goForward?.()}
                disabled={!canGoForward}
              >
                <img src={arrowLeft} alt="Forward" />
              </button>
            </>
          )}
        </div>
        <div className="window-header-label">
          {useOnlyLabel || !currentPath || !fileSystem ? (
            <ScrambleText text={label} />
          ) : (
            <Breadcrumb
              currentPath={currentPath}
              fileSystem={fileSystem}
              openFolder={openFolder!}
            />
          )}
        </div>
        <div className="toggle-window-container">
          <span
            className="toggle-window yellow"
            onClick={() => {
              if (itemId) {
                document.dispatchEvent(
                  new CustomEvent('window-minimize', { detail: { windowId: itemId } })
                );
              }
            }}
          />
          {!hideExpandButton && itemId !== undefined && (
            <span className="toggle-window green" onClick={(e) => expandedWindow(e)} />
          )}
          <span
            className="toggle-window red"
            onClick={() => itemId && closeWindow?.(itemId)}
          />
        </div>
      </div>
    </div>
  );
};
