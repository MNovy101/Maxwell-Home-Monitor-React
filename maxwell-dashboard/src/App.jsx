// src/App.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue } from 'firebase/database';
import './App.css';

function App() {
  // State for energy readings and alerts
  const [readings, setReadings] = useState({});
  const [alerts, setAlerts]     = useState({});

  useEffect(() => {
    // Subscribe to /energy_data
    const energyRef = ref(db, 'energy_data');
    const unsubscribeEnergy = onValue(
      energyRef,
      snapshot => {
        setReadings(snapshot.val() || {});
      },
      error => {
        console.error('Failed to read energy_data:', error);
      }
    );

    // Subscribe to /alerts
    const alertsRef = ref(db, 'alerts');
    const unsubscribeAlerts = onValue(
      alertsRef,
      snapshot => {
        setAlerts(snapshot.val() || {});
      },
      error => {
        console.error('Failed to read alerts:', error);
      }
    );

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeEnergy();
      unsubscribeAlerts();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Maxwell Home Energy Monitor</h1>
      </header>

      <main>
        <section className="readings-section">
          <h2>Live Readings</h2>
          <ul>
            {Object.entries(readings).map(([ts, data]) => (
              <li key={ts}>
                <strong>{new Date(parseInt(ts, 10) * 1000).toLocaleTimeString()}</strong>:&nbsp;
                {data.power.toFixed(1)} W&nbsp;
                (V: {data.voltage.toFixed(1)} V, I: {data.current.toFixed(2)} A)
              </li>
            ))}
          </ul>
          {Object.keys(readings).length === 0 && <p>No readings yet.</p>}
        </section>

        <section className="alerts-section">
          <h2>Alerts</h2>
          <ul>
            {Object.entries(alerts).map(([id, alert]) => (
              <li key={id}>
                <strong>{new Date(alert.timestamp * 1000).toLocaleTimeString()}</strong>:&nbsp;
                {alert.state.charAt(0).toUpperCase() + alert.state.slice(1)}
              </li>
            ))}
          </ul>
          {Object.keys(alerts).length === 0 && <p>No alerts.</p>}
        </section>
      </main>
    </div>
  );
}

export default App;
