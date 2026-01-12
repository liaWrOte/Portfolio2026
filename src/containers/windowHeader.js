import { connect } from 'react-redux';
import { WindowHeader } from '../components/WindowHeader/WindowHeader';

import {
  closeWindow,
  expandWindow
} from '../actions/main';


const mapStateToProps = (state) => ({
  displayWindow: state.main.displayWindow,
  displayProjects: state.main.allProjects,
  displayWindowItem: state.main.displayWindowItem,
  windowItemId: state.main.windowItemId,
  displayImageItem: state.main.displayImageItem,
  displaySpecsItem: state.main.displaySpecsItem,
  displayAllItems: state.main.displayAllItems,
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
