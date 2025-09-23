import { connect } from 'react-redux';
import Window from '../stories/Window/Window';

import {
  getAllProjects,
} from '../actions/main';


const mapStateToProps = (state) => ({
  displayWindow: state.main.displayWindow,
  displayProjects: state.main.allProjects,
  displayWindowItem: state.main.displayWindowItem,
  windowItemId: state.main.windowItemId,
  displayImageItem: state.main.displayImageItem,
  displaySpecsItem: state.main.displaySpecsItem,
  displayAllItems: state.main.displayAllItems,
  displayCv: state.main.displayCv,
  windowPosition: state.main.windowPosition,
  displayArtquiz: state.main.displayArtquiz,
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
