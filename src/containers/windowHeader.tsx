import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { WindowHeader } from '../components/WindowHeader/WindowHeader';
import { closeWindow, openFolder, goBack, goForward } from '../actions/main';
import type { RootState } from '../store';

const mapStateToProps = (state: RootState) => ({
  currentPath: state.main.navigation.currentPath,
  fileSystem: state.main.language === 'en' ? (state.main.fileSystemEn ?? state.main.fileSystem) : state.main.fileSystem,
  canGoBack: state.main.navigation.historyIndex > 0,
  canGoForward: state.main.navigation.historyIndex < state.main.navigation.history.length - 1
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeWindow: (newValue) => dispatch(closeWindow(newValue)),
  openFolder: (newValue) => dispatch(openFolder(newValue)),
  goBack: () => dispatch(goBack()),
  goForward: () => dispatch(goForward())
});

export default connect(mapStateToProps, mapDispatchToProps)(WindowHeader);
