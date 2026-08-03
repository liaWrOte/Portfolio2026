import React, { useEffect, useState } from 'react';
import { FileSystemNode } from '../../types';
// Import components
import { Desktop } from '../Desktop/Desktop';
import DesktopBottomBar from '../DesktopBottomBar/DesktopBottomBar';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
interface MainProps {
  fetchProjects: () => void;
  fileSystem: FileSystemNode | null;
  loadingState: boolean;
  displayArtquiz: boolean;
}
const Main: React.FC<MainProps> = ({ fetchProjects, fileSystem, loadingState, displayArtquiz }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  if (showLoader) return <LoadingScreen onComplete={() => setShowLoader(false)} />;
  if (loadingState) return null;
  if (fileSystem === null) return null;

  return (
    <div>
      <Desktop displayArtquiz={displayArtquiz} />
      <DesktopBottomBar />
    </div>
  );
};
export default Main;
