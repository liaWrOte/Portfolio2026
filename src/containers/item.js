import { connect } from 'react-redux';
import Item from '../stories/Item/Item';
import {
  getProject,
  openWindow,
  openWindowItem,
  openImageItem,
  openSpecsItem,
  openAllItems,
  closeWindow,
  openStolify,
  openCv,
  setPosition
} from '../actions/desktop';

const mapStateToProps = (state) => ({
  displayWindow: state.desktop.displayImageItem,
  displayProjects: state.desktop.displaySpecsItem,
  displayWindowItem: state.desktop.displayWindowItem,
  windowItemId: state.desktop.windowItemId
});

const mapDispatchToProps = (dispatch) => ({
  getProject: (newValue) => {
    dispatch(getProject(newValue));
  },
  openWindow: (newValue) => {
    console.log(dispatch);
    dispatch(openWindow(newValue));
  },
  closeWindow: (newValue) => {
    dispatch(closeWindow(newValue));
  },
  openWindowItem: (newValue) => {
    dispatch(openWindowItem(newValue));
  },
  openImageItem: (newValue) => {
    dispatch(openImageItem(newValue));
  },
  openSpecsItem: (newValue) => {
    dispatch(openSpecsItem(newValue));
  },
  openAllItems: (newValue) => {
    dispatch(openAllItems(newValue));
  },
  openCv: (newValue) => {
    dispatch(openCv(newValue));
  },
  setPosition: (newValue) => {
    dispatch(setPosition(newValue));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item);
