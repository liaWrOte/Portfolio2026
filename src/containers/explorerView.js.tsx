import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ExplorerView from '../components/ExplorerView/ExplorerView';
import { openFolder, openProject } from '../actions/main';
import type { RootState } from '../store';

const mapStateToProps = (state: RootState) => ({
  view: state.main.window.view,
  // currentNode is not tracked in the reducer; accessing via cast (pre-existing issue)
  node: (state.main.navigation as any).currentNode
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openFolder: (newValue) => {
    dispatch(openFolder(newValue));
  },
  openProject: (newValue) => {
    dispatch(openProject(newValue));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorerView);
