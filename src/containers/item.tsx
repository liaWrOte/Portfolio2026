import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Item from '../components/Item/Item';
import { openWindow, setPosition } from '../actions/main';
import type { RootState } from '../store';

const mapStateToProps = (state: RootState) => ({
  minimizedWindows: state.main.minimizedWindows
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openWindow: (newValue) => dispatch(openWindow(newValue)),
  setPosition: (windowId, newValue) => dispatch(setPosition(windowId, newValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
