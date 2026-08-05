import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SidebarTree from '../components/SidebarTree/SidebarTree';
import { openFolder, openProject, openWindow } from '../actions/main';
import type { RootState } from '../store';

const mapStateToProps = (state: RootState) => ({
  fileSystem: state.main.language === 'en' ? (state.main.fileSystemEn ?? state.main.fileSystem) : state.main.fileSystem,
  currentPath: state.main.navigation.currentPath
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
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
