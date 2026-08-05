import { connect } from 'react-redux';
import Main from '../components/Main/Main';
import { fetchProjects } from '../actions/main';

const mapStateToProps = (state) => ({
  fileSystem: state.main.fileSystem,
  loading: state.main.loading
});

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: () => dispatch(fetchProjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
