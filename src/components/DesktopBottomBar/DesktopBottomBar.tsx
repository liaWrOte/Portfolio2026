import React from 'react';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import './desktop-bottom-bar.scss';

import Item from '../../containers/item';

import TaskBar from '../TaskBar/TaskBar';

import { connect } from 'react-redux';

import { toggleWindow, closeWindow } from '../../actions/main';



// Import images

import stolifyIcon from '../assets/img/icons/stolify_icon.svg';

import artquizIcon from '../assets/img/icons/artquiz_icon.svg';



const DesktopBottomBar = ({

  primary,

  backgroundColor,

  size,

  label,

  srcImg,

  openArtquiz,

  openWindows,

  minimizedWindows,

  onToggleWindow,

  onCloseWindow

}) => {



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

  const date = today.toLocaleDateString(locale, {day: '2-digit', month: '2-digit', year: 'numeric'});



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

          srcImg={artquizIcon}

          clickTrigger={"simple"}

        />

        <Item

          key={Math.random()}

          inWindow={false}

          outWindowLabel="Stolify"

          triggerOpen="stolify"

          srcImg={stolifyIcon}

          animated={true}

          clickTrigger={"simple"}

        />

        <TaskBar 

          openWindows={openWindows || []}

          onWindowClick={onToggleWindow}

          onCloseWindow={onCloseWindow}

        />



      </div>



      <div className="datetime-container">

        <span className="time">{hour}</span>

        <span className="date">{date}</span>

      </div>





    </aside>

  );

};



DesktopBottomBar.propTypes = {

  primary: PropTypes.string,

  backgroundColor: PropTypes.string,

  size: PropTypes.string,

  label: PropTypes.string,

  srcImg: PropTypes.string,

  openArtquiz: PropTypes.func,

  openWindows: PropTypes.array,

  minimizedWindows: PropTypes.array,

  onToggleWindow: PropTypes.func,

  onCloseWindow: PropTypes.func,

};



const mapStateToProps = (state) => ({

  openWindows: state.main.openWindows,

  minimizedWindows: state.main.minimizedWindows,

});



const mapDispatchToProps = (dispatch) => ({

  onToggleWindow: (windowId) => dispatch(toggleWindow(windowId)),

  onCloseWindow: (windowId) => dispatch(closeWindow(windowId)),

});



export default connect(mapStateToProps, mapDispatchToProps)(DesktopBottomBar);

