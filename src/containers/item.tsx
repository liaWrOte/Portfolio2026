import { connect } from 'react-redux';
import Item from '../components/Item/Item';
import { openWindow, setPosition } from '../actions/main';

const mapStateToProps = (state) => ({
  minimizedWindows: state.main.minimizedWindows
});

const mapDispatchToProps = (dispatch) => ({
  openWindow: (newValue) => dispatch(openWindow(newValue)),
  setPosition: (windowId, newValue) => dispatch(setPosition(windowId, newValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
