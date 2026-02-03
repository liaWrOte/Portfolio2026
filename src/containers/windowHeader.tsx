import { connect } from 'react-redux';
import { WindowHeader } from '../components/WindowHeader/WindowHeader';

import {
  closeWindow,
  expandWindow,
  openFolder,
  minimizeWindow
} from '../actions/main';


const mapStateToProps = (state) => ({
  displayWindow: state.main.displayWindow,
  displayProjects: state.main.allProjects,
  displayWindowItem: state.main.displayWindowItem,
  windowItemId: state.main.windowItemId,
  displayImageItem: state.main.displayImageItem,
  displaySpecsItem: state.main.displaySpecsItem,
  displayAllItems: state.main.displayAllItems,
  currentPath: state.main.navigation.currentPath,
  fileSystem: state.main.fileSystem,
});

const mapDispatchToProps = (dispatch) => ({
  closeWindow: (newValue) => {
    dispatch(closeWindow(newValue));
  },
  expandWindow: (newValue) => {
    dispatch(expandWindow(newValue));
  },
  openFolder: (newValue) => {
    dispatch(openFolder(newValue));
  },
  minimizeWindow: (windowId) => {
    dispatch(minimizeWindow(windowId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowHeader);
