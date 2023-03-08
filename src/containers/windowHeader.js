import { connect } from 'react-redux';
import { WindowHeader } from '../stories/WindowHeader/WindowHeader';

import {
  closeWindow,
  expandWindow
} from '../actions/desktop';


const mapStateToProps = (state) => ({
  displayWindow: state.desktop.displayWindow,
  displayProjects: state.desktop.allProjects,
  displayWindowItem: state.desktop.displayWindowItem,
  windowItemId: state.desktop.windowItemId,
  displayImageItem: state.desktop.displayImageItem,
  displaySpecsItem: state.desktop.displaySpecsItem,
  displayAllItems: state.desktop.displayAllItems,
});

const mapDispatchToProps = (dispatch) => ({
  closeWindow: (newValue) => {
    dispatch(closeWindow(newValue));
  },
  expandWindow: (newValue) => {
    dispatch(expandWindow(newValue));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowHeader);
