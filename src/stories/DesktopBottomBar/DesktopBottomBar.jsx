import React from 'react';
import PropTypes from 'prop-types';
import './desktop-bottom-bar.scss';
import Item from '../Item/Item';

// svg
import stolify from '../assets/img/icons/stolify.svg';
import artquiz from '../assets/img/icons/artquiz.svg';

/**
 * Primary UI component for user interaction
 */
export const DesktopBottomBar = ({ primary, backgroundColor, size, label, srcImg, ...props }) => {

  
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

  return (
    <div className="desktop-bar">
      <Item
        key={Math.random()}
        inWindow={false}
        outWindowLabel="Artquiz"
        triggerOpen="openWindow"
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
      <Item
        key={Math.random()}
        inWindow={false}
        outWindowLabel="ToDo"
        clickTrigger={"simple"}
      />
    </div>
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
