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

      case 'stolify':
        console.log('Clic sur Stolify - comportement spécifique');
        
        let stolify = document.getElementById('stolify');
        console.log('Élément stolify trouvé:', stolify);
        
        if (stolify) {
          console.log('Toggle classe hide sur stolify');
          stolify.classList.toggle('hide');
          console.log('Classe hide après toggle:', stolify.className);
        } else {
          console.log('Élément stolify non trouvé!');
        }

        let stolifySvg = document.getElementById('stolify-svg');
        console.log('Élément stolify-svg trouvé:', stolifySvg);
        
        if (stolifySvg) {
          console.log('Toggle classe start sur stolify-svg');
          stolifySvg.classList.toggle('start');
          console.log('Classe start après toggle:', stolifySvg.className);
        } else {
          console.log('Élément stolify-svg non trouvé!');
        }
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
