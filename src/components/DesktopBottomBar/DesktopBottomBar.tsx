import React from 'react';
import { useEffect, useState } from 'react';
import './desktop-bottom-bar.scss';
import Item from '../../containers/item';
import TaskBar from '../TaskBar/TaskBar';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import { connect } from 'react-redux';
import { openWindow, closeWindow } from '../../actions/main';
import LogoSvg from '../Logo/LogoSvg';
import ScrambleText from '../ScrambleText/ScrambleText';
import { useTranslation } from '../../contexts/LanguageContext';

import stolifyIcon from '../assets/img/icons/stolify_icon.svg';

const DesktopBottomBar = ({ openWindows, minimizedWindows, onOpenWindow, onCloseWindow }) => {
  const { t, language } = useTranslation();

  const locale = language === 'en' ? 'en-US' : 'fr-FR';
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = today.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  const date = today.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <aside className="desktop-bar">
      <div className="identity">
        <LogoSvg className="identity-logo" />
        <div>
          <p>Sandrine M'ZE</p>
          <ScrambleText text={t('developer')} tag="p" />
        </div>
      </div>

      <div className="desktop-bar-center">
        <Item
          key="stolify"
          inWindow={false}
          outWindowLabel="Stolify"
          triggerOpen="stolify"
          itemId="stolify"
          srcImg={stolifyIcon}
          clickTrigger={'simple'}
          data-taskbar-id="stolify"
        />
        <TaskBar
          openWindows={openWindows || []}
          minimizedWindows={minimizedWindows || []}
          onWindowClick={onOpenWindow}
          onCloseWindow={onCloseWindow}
        />
      </div>

      <div className="datetime-container">
        <div className="datetime-text">
          <span className="time"><ScrambleText text={hour} /></span>
          <span className="date"><ScrambleText text={date} /></span>
        </div>
        <LanguageSwitch />
      </div>
    </aside>
  );
};

const mapStateToProps = (state) => ({
  openWindows: state.main.openWindows,
  minimizedWindows: state.main.minimizedWindows
});

const mapDispatchToProps = (dispatch) => ({
  onOpenWindow: (windowId) => dispatch(openWindow(windowId)),
  onCloseWindow: (windowId) => dispatch(closeWindow(windowId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DesktopBottomBar);
