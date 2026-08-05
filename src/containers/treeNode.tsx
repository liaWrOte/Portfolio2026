import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import TreeNode from '../components/TreeNode/TreeNode';
import { openFolder, openProject } from '../actions/main';
import type { RootState } from '../store';

const mapStateToProps = (state: RootState) => ({
  currentPath: state.main.navigation.currentPath
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openFolder: (id) => {
    dispatch(openFolder(id));
  },
  openProject: (id) => {
    dispatch(openProject(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);
