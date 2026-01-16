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
        openWindow(itemId);
        setPosition(ref.current.getBoundingClientRect());
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

      case 'stolify':
        let stolify = document.getElementById('stolify');
        stolify.classList.toggle('hide');

        let stolifySvg = document.getElementById('stolify-svg');
        stolifySvg.classList.toggle('start');
        break;

      case 'resume':
        openWindow(itemId);
        break;

      case 'artquiz':
        openArtquiz(itemId);
        break;

      case 'projets':
        openWindow(itemId);
      break;

      default:
        openImageItem({itemId, triggerOpen});
        break;
    }
  }


  return (

    
      <div
        className={`item${desktopClass} ${triggerOpen}-class`}
        ref={ref}
      >

        {clickTrigger === "simple" && 
          <div onClick={() => openWindowFunc(triggerOpen)}>
            {animated &&
                <StolifySvg />
            }
            {!animated &&
              <img 
                src={srcImg} 
                alt="Logo" 
                />
            }
            {inWindow ? <span>{label}</span> : <span>{outWindowLabel}</span> }
          </div>
        }

        {clickTrigger === undefined && 
          <>
            <img 
              src={srcImg} 
              alt="Logo" 
              onClick={() => openWindowFunc(triggerOpen)}
              />
            {inWindow ? <span>{label}</span> : <span>{outWindowLabel}</span> }
          </>
        }

        {triggerOpen === "stolify" &&
          <Stolify />
        }

      </div>

  );
};

export default Item;
