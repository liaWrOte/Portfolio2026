import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './item.scss';
import ScrambleText from '../ScrambleText/ScrambleText';
// Imports images
import file from '../assets/img/file.png';
import Stolify from '../Stolify/Stolify';
import StolifySvg from '../animated/stolify/StolifySvg';
const Item = ({
  inWindow,
  outWindowLabel,
  label,
  srcImg,
  triggerOpen,
  openWindowItem,
  openImageItem,
  openSpecsItem,
  openAllItems,
  openWindow,
  itemId,
  clickTrigger,
  setPosition,
  animated,
  openArtquiz,
  openResume,
  minimizedWindows,
  'data-taskbar-id': dataTaskbarId
}) => {
  let desktopClass = !inWindow ? ' on-desktop' : '';
  const ref = useRef();
  function openWindowFunc(triggerOpen) {
    switch (triggerOpen) {
      case 'openWindow':
      case 'projets':
      case 'resume':
        setPosition(itemId, ref.current.getBoundingClientRect());
        openWindow(itemId);
        break;
      case 'openWindowItem':
        openWindowItem(itemId);
        break;
      case 'openImageItem':
        openImageItem(itemId);
        break;
      case 'openSpecsItem':
        openSpecsItem(itemId);
        break;
      case 'openAllItems':
        openAllItems(itemId);
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
        openImageItem({ itemId, triggerOpen });
        break;
    }
  }
  return (
    <div
      className={`item${desktopClass} ${triggerOpen}-class`}
      ref={ref}
      {...(dataTaskbarId ? { 'data-taskbar-id': dataTaskbarId } : {})}
    >
      {clickTrigger === 'simple' && (
        <div onClick={() => openWindowFunc(triggerOpen)}>
          <img src={srcImg} alt="Logo" onClick={() => openWindowFunc(triggerOpen)} />
          {inWindow ? <span>{label}</span> : <ScrambleText text={outWindowLabel} />}
        </div>
      )}
      {clickTrigger === undefined && (
        <>
          <img src={srcImg} alt="Logo" onClick={() => openWindowFunc(triggerOpen)} />
          {inWindow ? <span>{label}</span> : <ScrambleText text={outWindowLabel} />}
        </>
      )}
    </div>
  );
};
export default Item;
