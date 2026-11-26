import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './item.scss';
import ScrambleText from '../ScrambleText/ScrambleText';

const Item = ({
  inWindow,
  outWindowLabel,
  label,
  srcImg,
  triggerOpen,
  openWindow,
  itemId,
  clickTrigger,
  setPosition,
  minimizedWindows,
  'data-taskbar-id': dataTaskbarId
}) => {
  const desktopClass = !inWindow ? ' on-desktop' : '';
  const ref = useRef();

  function openWindowFunc(triggerOpen) {
    switch (triggerOpen) {
      case 'openWindow':
      case 'projets':
      case 'resume':
        setPosition(itemId, ref.current.getBoundingClientRect());
        openWindow(itemId);
        break;
      case 'artquiz':
        setPosition('artquiz', ref.current.getBoundingClientRect());
        openWindow('artquiz');
        break;
      case 'stolify':
        if (minimizedWindows && minimizedWindows.includes('stolify')) {
          document.dispatchEvent(new CustomEvent('window-restore', { detail: { windowId: 'stolify' } }));
        } else {
          setPosition('stolify', ref.current.getBoundingClientRect());
          openWindow('stolify');
        }
        break;
      default:
        break;
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openWindowFunc(triggerOpen);
    }
  };

  return (
    <div
      className={`item${desktopClass} ${triggerOpen}-class`}
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={outWindowLabel || label}
      onClick={() => openWindowFunc(triggerOpen)}
      onKeyDown={handleKeyDown}
      {...(dataTaskbarId ? { 'data-taskbar-id': dataTaskbarId } : {})}
    >
      {clickTrigger === 'simple' && (
        <div>
          <img src={srcImg} alt="" aria-hidden="true" />
          {inWindow ? <span>{label}</span> : <ScrambleText text={outWindowLabel} />}
        </div>
      )}
      {clickTrigger === undefined && (
        <>
          <img src={srcImg} alt="" aria-hidden="true" />
          {inWindow ? <span>{label}</span> : <ScrambleText text={outWindowLabel} />}
        </>
      )}
    </div>
  );
};

export default Item;
