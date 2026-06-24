import { connect } from 'react-redux';
import SidebarTree from '../components/SidebarTree/SidebarTree';

import { openFolder, openProject } from '../actions/main';

const mapStateToProps = (state) => ({
  fileSystem: state.main.fileSystem,
  currentPath: state.main.navigation.currentPath
});

const mapDispatchToProps = (dispatch) => ({
  openFolder: (newValue) => {
    dispatch(openFolder(newValue));
  },
  openProject: (newValue) => {
    dispatch(openProject(newValue));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarTree);
