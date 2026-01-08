import { connect } from 'react-redux';
import IconGrid from '../stories/IconGrid/IconGrid';

import {
  openFolder,
  openProject,
} from '../actions/main';

const mapDispatchToProps = (dispatch) => ({
  openFolder: (newValue) => {
    dispatch(openFolder(newValue));
  },
  openProject: (newValue) => {
    dispatch(openProject(newValue));
  }
});

export default connect(
    null,
    mapDispatchToProps
)(IconGrid);
