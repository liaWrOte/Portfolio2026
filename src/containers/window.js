import { connect } from 'react-redux';
import Window from '../stories/Window/Window';

import {
  getAllProjects,
} from '../actions/desktop';


const mapStateToProps = (state) => ({
  displayWindow: state.desktop.displayWindow,
  displayProjects: state.desktop.allProjects,
  displayWindowItem: state.desktop.displayWindowItem,
  windowItemId: state.desktop.windowItemId,
  displayImageItem: state.desktop.displayImageItem,
  displaySpecsItem: state.desktop.displaySpecsItem,
  displayAllItems: state.desktop.displayAllItems,
  displayCv: state.desktop.displayCv,
  windowPosition: state.desktop.windowPosition
});

const mapDispatchToProps = (dispatch) => ({
  getAllProjects: (newValue) => {
    dispatch(getAllProjects(newValue));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Window);
