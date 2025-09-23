import { connect } from 'react-redux';
import Main from '../stories/Main/Main';

const mapStateToProps = (state) => ({
  displayWindow: state.main.windowItemId, 
  displayWindowItem: state.main.displayWindowItem,
  displayImageItem: state.main.displayImageItem,
  windowItemId: state.main.windowItemId,
  displayArtquiz: state.main.displayArtquiz,
});

export default connect(
  mapStateToProps,
)(Main);
