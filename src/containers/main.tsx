import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Main from '../components/Main/Main';
import { fetchProjects } from '../actions/main';
import type { RootState } from '../store';

const mapStateToProps = (state: RootState) => ({
  fileSystem: state.main.fileSystem,
  loading: state.main.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchProjects: () => dispatch(fetchProjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
