import { connect } from 'react-redux';
import Desktop from '../stories/Desktop/Desktop';

const mapStateToProps = (state) => ({
  displayWindow: state.desktop.windowItemId, 
  displayWindowItem: state.desktop.displayWindowItem,
  displayImageItem: state.desktop.displayImageItem,
  windowItemId: state.desktop.windowItemId,
});

export default connect(
  mapStateToProps,
)(Desktop);
