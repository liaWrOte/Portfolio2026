import React, { useEffect } from 'react';
import { FileSystemNode } from '../../types';
// Import components
import { Desktop } from '../Desktop/Desktop';
import DesktopBottomBar from '../DesktopBottomBar/DesktopBottomBar';
interface MainProps {
  fetchProjects: () => void;
  fileSystem: FileSystemNode | null;
  loadingState: boolean;
  displayArtquiz: boolean;
}
const Main: React.FC<MainProps> = ({ fetchProjects, fileSystem, loadingState, displayArtquiz }) => {
  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);
  if (loadingState) return <div>loadingState...</div>;
  if (fileSystem === null) return null;
  return (
    <div>
      <Desktop displayArtquiz={displayArtquiz} />
      <DesktopBottomBar />
    </div>
  );
};
export default Main;
