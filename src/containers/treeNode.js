import { connect } from 'react-redux';
import TreeNode from '../stories/TreeNode/TreeNode';

const mapStateToProps = (state) => ({
  currentPath: state.main.navigation.currentPath
});


export default connect(
    mapStateToProps,
    null
)(TreeNode);
