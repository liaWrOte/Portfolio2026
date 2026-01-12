import React, { useEffect } from 'react';
import { Desktop } from '../Desktop/Desktop';
import { DesktopBottomBar } from '../DesktopBottomBar/DesktopBottomBar';

/**
 * Primary UI component for user interaction
 */
const Main = ({ fetchProjects, fileSystem, loadingState }) => {

  useEffect(() => {
    fetchProjects()
  }, []);
  
  
  if (loadingState) return <div>loadingState...</div>;
  
  if (fileSystem === null) return null;

  return (
    <div>
      <Desktop />
      <DesktopBottomBar />  
    </div>
  );
};


export default Main;