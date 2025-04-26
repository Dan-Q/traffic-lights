import { useEffect, useState, useCallback } from 'react';

import { Bulb } from './bulb';

export default function TrafficLights({ showTimer, showControls, durations }) {
  const DEFAULT_DURATIONS = { red: 3, yellow: 1, green: 12 };
  let lightDurations = Object.assign(DEFAULT_DURATIONS, durations);

  const [light, setLight] = useState('green');
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [phaseChangeTime, setPhaseChangeTime] = useState(lightDurations.green);

  const advanceSequence = useCallback(()=>{
    switch (light) {
      case 'green':
        setLight('red');
        setPhaseChangeTime(lightDurations.red);
        return;
      case 'red':
        setLight('yellow');
        setPhaseChangeTime(lightDurations.yellow);
        return;
      default:
        setLight('green');
        setPhaseChangeTime(lightDurations.green);
    }
  }, [light, lightDurations]);

  useEffect(() => {
    const ticker = setInterval(() => {
      if(!timerEnabled) return;
      const newPhaseChangeTime = phaseChangeTime - 1;
      setPhaseChangeTime(newPhaseChangeTime);
      if(newPhaseChangeTime <= 0) advanceSequence();
    }, 1000);

    return () => clearInterval(ticker);
  }, [timerEnabled, phaseChangeTime, advanceSequence]);

  return (
    <>
      <div className="traffic-lights">
        <Bulb color="red" on={ 'red' === light } />
        <Bulb color="yellow" on={ 'yellow' === light } />
        <Bulb color="green" on={ 'green' === light } />
      </div>
      {showTimer && (
        <div className="traffic-lights__timer">
          Timer: {phaseChangeTime}
          {timerEnabled ? ' (running)' : ' (paused)'}
        </div>
      )}
      {showControls && (
        <ul className="traffic-lights__controls">
          <li><button onClick={ () => advanceSequence() }>Advance to next light</button></li>
          <li><button onClick={ () => setTimerEnabled(!timerEnabled) }>Toggle timer</button></li>
        </ul>
      )}
    </>
  );
}
