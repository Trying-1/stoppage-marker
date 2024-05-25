import React, { useState } from 'react';
import MapView from './components/MapView';
import './App.css';

const App = () => {
  const [threshold, setThreshold] = useState(5);  // Default threshold of 5 minutes

  return (
    <div className="App">
      <h1>Vehicle Stoppage Identification and Visualization</h1>
      <label>
        Stoppage Threshold (minutes):
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </label>
      <MapView threshold={threshold} />
    </div>
  );
};

export default App;
