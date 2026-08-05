import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import IconGrid from '../components/IconGrid/IconGrid';
import { openFolder, openProject } from '../actions/main';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openFolder: (id) => {
    dispatch(openFolder(id));
  },
  openProject: (id) => {
    dispatch(openProject(id));
  }
});

export default connect(null, mapDispatchToProps)(IconGrid);
