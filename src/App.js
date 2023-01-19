import './App.scss';
import { DesktopTopBar } from './stories/DesktopTopBar/DesktopTopBar';
import { Desktop } from './stories/Desktop/Desktop';
import { DesktopBottomBar } from './stories/DesktopBottomBar/DesktopBottomBar';

function App() {
  return (
    <div className="App">
      <DesktopTopBar/>
      <Desktop />
      <DesktopBottomBar/>  
    </div>
  );
}

export default App;
