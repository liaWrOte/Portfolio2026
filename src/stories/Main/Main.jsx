import React from 'react';
import { DesktopTopBar } from '../DesktopTopBar/DesktopTopBar';
import { Desktop } from '../Desktop/Desktop';
import { DesktopBottomBar } from '../DesktopBottomBar/DesktopBottomBar';

/**
 * Primary UI component for user interaction
 */
const Main = ({...props }) => {
  return (
    <div>
      <DesktopTopBar />
      <Desktop />
      <DesktopBottomBar />  
    </div>
  );
};


export default Main;