import { connect } from 'react-redux';
import SidebarTree from '../components/SidebarTree/SidebarTree';

import { openFolder, openProject, openWindow } from '../actions/main';

const mapStateToProps = (state) => ({
  fileSystem: state.main.language === 'en' ? (state.main.fileSystemEn ?? state.main.fileSystem) : state.main.fileSystem,
  currentPath: state.main.navigation.currentPath
});

const mapDispatchToProps = (dispatch) => ({
  openFolder: (newValue) => {
    dispatch(openFolder(newValue));
  },
  openProject: (newValue) => {
    dispatch(openProject(newValue));
  },
  openWindow: (id) => {
    dispatch(openWindow(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTree);
