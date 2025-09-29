import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './item.scss';

import file from '../assets/img/file.png';
import Stolify from '../Stolify/Stolify';
import StolifySvg from '../animated/stolify/StolifySvg';

/**
 * Primary UI component for user interaction
 */
const Item = ({ inWindow, outWindowLabel, label, srcImg, triggerOpen, openSingleItem, openWindowItem, openImageItem, openSpecsItem, openAllItems, openWindow, itemId, app, clickTrigger, setPosition, animated, openArtquiz, openCv, ...props }) => {

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

      case 'cv':
        openCv();
        break;

      case 'artquiz':
        openArtquiz(itemId);
        break;

      default:
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

Item.propTypes = {
  /**
   * Is this in a desktop window ?
   */
  inWindow: PropTypes.bool,
  /**
   * Item label if is not in a window
   */
  outWindowLabel: PropTypes.string,
  /**
   * Item contents
   */
  label: PropTypes.string,
  /**
   * Open a window with items
   */
  openWindow: PropTypes.func,
  /**
   * Open a window with items
   */
  openWindowItem: PropTypes.func,
  /**
   * Open a window with items
   */
  openImageItem: PropTypes.func,
  /**
   * Open a window with items
   */
  openSpecsItem: PropTypes.func,
  /**
   * Open a window with items
   */
  openAllItems: PropTypes.func,
  /**
   * Url of image
   */
  srcImg: PropTypes.string,
  /**
   * Url of image
   */
  openSingleItem: PropTypes.bool,

};

Item.defaultProps = {
  inWindow: false,
  outWindowLabel: 'Projets',
  srcImg: file,
  openSingleItem: false
};


export default Item;
