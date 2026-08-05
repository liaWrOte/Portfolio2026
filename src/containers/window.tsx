import { connect } from 'react-redux';
import Window from '../components/Window/Window';
import { openFolder } from '../actions/main';

const mapStateToProps = (state) => ({
  windowItemId: state.main.windowItemId,
  isOpen: state.main.window.isOpen,
  fileSystem: state.main.language === 'en' ? (state.main.fileSystemEn ?? state.main.fileSystem) : state.main.fileSystem,
  view: state.main.window.view,
  currentPath: state.main.navigation.currentPath,
  minimizedWindows: state.main.minimizedWindows,
  openWindows: state.main.openWindows
});

const mapDispatchToProps = (dispatch) => ({
  openFolder: (newValue) => dispatch(openFolder(newValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);
