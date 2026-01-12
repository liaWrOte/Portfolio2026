import { connect } from 'react-redux';
import ExplorerView from '../components/ExplorerView/ExplorerView';

import {
  openFolder,
  openProject,
} from '../actions/main';

const mapStateToProps = (state) => ({
  view: state.main.window.view,
  node: state.main.navigation.currentNode
});

const mapDispatchToProps = (dispatch) => ({
  openFolder: (newValue) => {
    dispatch(openFolder(newValue));
  },
  openProject: (newValue) => {
    dispatch(openProject(newValue));
  }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExplorerView);
