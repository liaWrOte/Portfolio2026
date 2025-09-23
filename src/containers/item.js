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
  openCv,
  setPosition,
  openArtquiz,
} from '../actions/main';

const mapStateToProps = (state) => ({
  displayWindow: state.main.displayImageItem,
  displayProjects: state.main.displaySpecsItem,
  displayWindowItem: state.main.displayWindowItem,
  windowItemId: state.main.windowItemId
});

const mapDispatchToProps = (dispatch) => ({
  getProject: (newValue) => {
    dispatch(getProject(newValue));
  },
  openWindow: (newValue) => {
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
  },
  openArtquiz: (newValue) => {
    dispatch(openArtquiz(newValue));
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Item);
