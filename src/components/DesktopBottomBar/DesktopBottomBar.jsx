import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './desktop-bottom-bar.scss';
import Item from '../../containers/item';

// svg
import stolify from '../assets/img/icons/stolify.svg';
import artquiz from '../assets/img/icons/artquiz.svg';


export const DesktopBottomBar = ({ primary, backgroundColor, size, label, srcImg, openArtquiz, ...props }) => {

  // START Date and time display
  const locale = 'fr-FR';
  const [today, setDate] = useState(new Date());

  useEffect(() => {
      const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    }
  }, []);

  const hour = today.toLocaleTimeString(locale, {hour: '2-digit', minute:'2-digit'});

  let controlAppContainer = setInterval(function(){
    let appContainer = document.querySelectorAll('.App');
    if (appContainer.length > 0) {
      appContainer[0].addEventListener('click', (e) => {
        if (e.target.closest('.stolify-class') === null) {
          let stolifyContainer = document.getElementById('stolify');
            if (stolifyContainer) {
              if (!stolifyContainer.classList.contains('hide')) {
                stolifyContainer.classList.add('hide');
              }
            }
          }
        })
      clearInterval(controlAppContainer);
    }
  }, 100)

  // END Date and time display

  return (
    <aside className="desktop-bar">

      <div className="identity">
        <p>Sandrine M'ZE</p>
        <p>Développeuse front-end WordPress | React créative</p>
      </div>

      <div className="desktop-bar-center">
        <Item
          key={Math.random()}
          inWindow={false}
          outWindowLabel="Artquiz"
          triggerOpen="artquiz"
          itemId="artquiz"
          srcImg={artquiz}
          clickTrigger={"simple"}
        />
        <Item
          key={Math.random()}
          inWindow={false}
          outWindowLabel="Stolify"
          triggerOpen="stolify"
          // srcImg={stolify}
          animated={true}
          clickTrigger={"simple"}
        />
      </div>

      <span className="time">{hour}</span>


    </aside>
  );
};

DesktopBottomBar.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * DesktopBottomBar contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * image
   */
  srcImg: PropTypes.string

};

DesktopBottomBar.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
  label: 'Projets'
};
