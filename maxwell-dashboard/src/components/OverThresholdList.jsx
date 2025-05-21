// src/components/OverThresholdList.jsx
import { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild, startAt } from 'firebase/database';
import { database } from '../firebase';
import GraphCard from './GraphCard';
import useCumalativeMetrics from '../hooks/useCumalativeMetrics';
import './GraphView.module.css';

export default function GraphView() {
  const [readings, setReadings] = useState([]);
  const [error, setError] = useState(null);
  const allMetrics = useCumalativeMetrics('/energy_data');
  const dataRef = ref(database, 'energy_data');
  const dataQuery = query(
    dataRef,
    orderByChild('current'),
    startAt(7.5)
  );
  const THRESHOLD = 7.5;  // Will need to update when more data is obtained to get an idea of what we want to set it at


  useEffect(() => {
    const unsubscribe = onValue(
      dataQuery,
      snapshot => {
        const raw = snapshot.val() || {};
        const list = Object.entries(raw).map(([key, entry]) => ({
          timestamp: entry.timestamp,
          id: key,
          voltage:   entry.voltage,
          current:   entry.current,
          power:     entry.power
        })).filter(r => r.current >= THRESHOLD).sort((a, b) => a.timestamp - b.timestamp);
        setReadings(list);
      },
      err => {
        console.error('Firebase read error:', err);
        setError('Could not fetch readings');
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="graph-view-container">
      <section className="section">
        <h2 className="section-title">All Measurements</h2>
        <GraphCard metrics={allMetrics} />
      </section>

      <section className="section">
        <h2 className="section-title">High Readings</h2>
        {error && <p className="error">{error}</p>}
        {readings.length === 0 ? (
          <p className="no-readings">No data available.</p>
        ) : (
          <table className="readings-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Current</th>
                <th>Power</th>
              </tr>
            </thead>
            <tbody>
              {readings.map(({ timestamp, id, current, power }) => (
                <tr key={`${timestamp}-${id}`}>
                  <td>{new Date(timestamp).toLocaleString()}</td>
                  <td>{current.toFixed(2)}</td>
                  <td>{power.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
