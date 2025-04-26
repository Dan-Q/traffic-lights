import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TrafficLights from './traffic-lights';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TrafficLights showTimer={true} showControls={true} durations={{ green: 10 }} />
  </React.StrictMode>
);
