import { connect } from 'react-redux';
import TreeNode from '../components/TreeNode/TreeNode';
import { openFolder, openProject } from '../actions/main';
const mapStateToProps = (state) => ({
  currentPath: state.main.navigation.currentPath
});
const mapDispatchToProps = (dispatch) => ({
  openFolder: (id) => {
    dispatch(openFolder(id));
  },
  openProject: (id) => {
    dispatch(openProject(id));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(TreeNode);
