import { connect } from 'react-redux';
import IconGrid from '../stories/IconGrid/IconGrid';

import {
  openFolder,
  openProject,
} from '../actions/main';

const mapDispatchToProps = (dispatch) => ({
  openFolder: (id) => {
    dispatch(openFolder(id));
  },
  openProject: (id) => {
    dispatch(openProject(id));
  }
});

export default connect(
    null,
    mapDispatchToProps
)(IconGrid);
