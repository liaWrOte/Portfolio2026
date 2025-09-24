import React from 'react';
import { Desktop } from '../Desktop/Desktop';
import { DesktopBottomBar } from '../DesktopBottomBar/DesktopBottomBar';

/**
 * Primary UI component for user interaction
 */
const Main = ({...props }) => {
  return (
    <div>
      <Desktop />
      <DesktopBottomBar />  
    </div>
  );
};


export default Main;