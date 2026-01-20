import { connect } from 'react-redux';
import Window from '../components/Window/Window';

import {
  getAllProjects,
  openWindow,
  openWindowItem,
  openFolder
} from '../actions/main';


const mapStateToProps = (state) => ({
  displayWindow: state.main.displayWindow,
  displayProjects: state.main.allProjects,
  displayWindowItem: state.main.displayWindowItem,
  windowItemId: state.main.windowItemId,
  displayImageItem: state.main.displayImageItem,
  displaySpecsItem: state.main.displaySpecsItem,
  displayAllItems: state.main.displayAllItems,
  displayResume: state.main.displayResume,
  windowPosition: state.main.windowPosition,
  displayArtquiz: state.main.displayArtquiz,
  isOpen: state.main.window.isOpen,
  fileSystem: state.main.fileSystem,
  activeId: state.main.window.activeId,
  view: state.main.window.view,
  currentPath: state.main.navigation.currentPath,
  minimizedWindows: state.main.minimizedWindows,
  openWindows: state.main.openWindows
});

const mapDispatchToProps = (dispatch) => ({
  getAllProjects: (newValue) => {
    dispatch(getAllProjects(newValue));
  },
  openWindow: (newValue) => {
    dispatch(openWindow(newValue));
  },
  openWindowItem: (newValue) => {
    dispatch(openWindowItem(newValue));
  },
  openFolder: (newValue) => {
    dispatch(openFolder(newValue));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);
