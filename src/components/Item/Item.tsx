import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './item.scss';
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
  openResume
}) => {
  let desktopClass = !inWindow ? ' on-desktop' : '';
  const ref = useRef();
  function openWindowFunc(triggerOpen) {
    switch (triggerOpen) {
      case 'openWindow':
      case 'projets':
      case 'resume':
        openWindow(itemId);
        if (triggerOpen === 'openWindow' || triggerOpen === 'projets') {
          setPosition(ref.current.getBoundingClientRect());
        }
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
        openWindow('artquiz');
        break;
      case 'stolify':
        openWindow('stolify');
        break;
      default:
        openImageItem({ itemId, triggerOpen });
        break;
    }
  }
  return (
    <div className={`item${desktopClass} ${triggerOpen}-class`} ref={ref}>
      {clickTrigger === 'simple' && (
        <div onClick={() => openWindowFunc(triggerOpen)}>
          <img src={srcImg} alt="Logo" onClick={() => openWindowFunc(triggerOpen)} />
          {inWindow ? <span>{label}</span> : <span>{outWindowLabel}</span>}
        </div>
      )}
      {clickTrigger === undefined && (
        <>
          <img src={srcImg} alt="Logo" onClick={() => openWindowFunc(triggerOpen)} />
          {inWindow ? <span>{label}</span> : <span>{outWindowLabel}</span>}
        </>
      )}
    </div>
  );
};
export default Item;
