import { connect } from 'react-redux';
import TreeNode from '../stories/TreeNode/TreeNode';

import {
  openFolder,
  openProject,
} from '../actions/main';

const mapStateToProps = (state) => ({
  // node: state.main.fileSystem
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
    null
)(TreeNode);
