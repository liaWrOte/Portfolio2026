import React, { useEffect } from 'react';

// Import components
import { Desktop } from '../Desktop/Desktop';
import { DesktopBottomBar } from '../DesktopBottomBar/DesktopBottomBar';

const Main = ({ fetchProjects, fileSystem, loadingState }) => {

  // Fetch projects on component mount
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