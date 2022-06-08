import Map from './features/map/Map';
import Timeline from './features/timeline/Timeline';
import Toolbox from './features/toolbox/Toolbox';
import Tooltip from './features/tooltip/Tooltip';

import './App.css';

function App() {
  return (
    <div className="App">
      <Toolbox />
      <div className="main">
        <Timeline />
        <Map />
      </div>
      <Tooltip />
    </div>
  );
}

export default App;
